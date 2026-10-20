from typing import List, Tuple
from app.models.schemas import ClaimRecord, PassageRecord, EvidenceStatus, RecoveryActionRecord
from app.services.search_service import search_service
from app.services.verifier_service import verifier_service
from app.services.llm_service import llm_service

class RecoveryEngine:
    async def execute_recovery(
        self,
        claims: List[ClaimRecord],
        tool_calls_used: int,
        max_budget: int = 6
    ) -> Tuple[List[ClaimRecord], List[RecoveryActionRecord], int, str]:
        """
        Executes bounded, targeted recovery for gaps (unsupported / contradicted claims)
        until resolved or tool budget runs out.
        """
        recovery_actions: List[RecoveryActionRecord] = []
        step = 1

        unresolved_claims = [c for c in claims if c.status in [EvidenceStatus.UNSUPPORTED, EvidenceStatus.CONTRADICTED, EvidenceStatus.UNRESOLVED]]

        if not unresolved_claims:
            recovery_actions.append(RecoveryActionRecord(
                step=step,
                action_type="stop_resolved",
                outcome="All claims are verified as supported. No recovery required.",
                tool_calls_used=tool_calls_used
            ))
            return claims, recovery_actions, tool_calls_used, "All claims supported"

        for claim in unresolved_claims:
            if tool_calls_used >= max_budget:
                recovery_actions.append(RecoveryActionRecord(
                    step=step,
                    action_type="stop_budget",
                    target_claim_id=claim.id,
                    outcome=f"Tool call budget limit ({max_budget}) reached. Stopping recovery.",
                    tool_calls_used=tool_calls_used
                ))
                return claims, recovery_actions, tool_calls_used, f"Budget limit of {max_budget} calls exhausted"

            # Formulate targeted recovery search query specifically for this claim
            targeted_query_prompt = (
                f"You are a research query specialist. A claim was marked '{claim.status}'.\n"
                f"Claim: '{claim.text}'\nCurrent issue: '{claim.rationale}'\n"
                "Generate a single, precise web search query to confirm or refute this exact fact.\n"
                'Output JSON format: {"query": "exact search keywords"}'
            )
            query_res = await llm_service.generate_json("Generate search query JSON", targeted_query_prompt)
            targeted_query = query_res.get("query", claim.text[:80])

            # Execute targeted search tool
            tool_calls_used += 1
            search_sources = await search_service.retrieve_sources(targeted_query, max_results=2)

            claim.recovery_attempted = True
            new_passages = []
            for s in search_sources:
                if s.get("content"):
                    new_passages.append(PassageRecord(
                        url=s["url"],
                        title=s["title"],
                        excerpt=s["content"][:400]
                    ))

            if new_passages:
                claim.passages.extend(new_passages)
                # Re-verify claim with new evidence
                await verifier_service.verify_claim_evidence(claim, search_sources)
                outcome = f"Targeted search executed ('{targeted_query}'). Updated status to {claim.status}."
            else:
                outcome = f"Targeted search found no new accessible evidence for '{targeted_query}'."

            recovery_actions.append(RecoveryActionRecord(
                step=step,
                action_type="targeted_search",
                target_claim_id=claim.id,
                query=targeted_query,
                outcome=outcome,
                tool_calls_used=tool_calls_used
            ))
            step += 1

        stop_reason = "Recovery completed for all flagged gaps"
        return claims, recovery_actions, tool_calls_used, stop_reason

recovery_engine = RecoveryEngine()
