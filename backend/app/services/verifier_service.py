import json
from typing import List, Dict, Any, Tuple
from app.models.schemas import ClaimRecord, PassageRecord, EvidenceStatus
from app.services.llm_service import llm_service

class VerifierService:
    async def extract_claims_and_synthesize(self, query: str, sources: List[Dict[str, Any]]) -> Tuple[str, List[ClaimRecord]]:
        """Synthesize a research report and decompose it into distinct verifiable claim units with initial passage mapping."""
        context_blocks = []
        for i, s in enumerate(sources):
            context_blocks.append(f"[Source {i+1}] Title: {s['title']}\nURL: {s['url']}\nContent: {s['content'][:1200]}")
        context_str = "\n\n".join(context_blocks)

        system_prompt = (
            "You are an evidence-aware research agent. Your task is to generate a well-researched, substantive summary "
            "for the user's question based strictly on the provided sources, and decompose the summary into atomic verifiable claims.\n"
            "Output JSON with this schema:\n"
            "{\n"
            '  "final_report": "Comprehensive markdown response text...",\n'
            '  "claims": [\n'
            "    {\n"
            '      "id": "C1",\n'
            '      "text": "Exact substantive factual claim made in the report",\n'
            '      "source_url": "URL of source from context that relates to this claim",\n'
            '      "source_title": "Title of source",\n'
            '      "excerpt": "Verbatim quote or tight passage from the source"\n'
            "    }\n"
            "  ]\n"
            "}"
        )

        user_prompt = f"Research Query: {query}\n\nRetrieved Sources:\n{context_str}"
        resp_json = await llm_service.generate_json(system_prompt, user_prompt)

        final_report = resp_json.get("final_report", "Summary completed.")
        raw_claims = resp_json.get("claims", [])

        claim_records = []
        for i, c in enumerate(raw_claims):
            cid = c.get("id", f"C{i+1}")
            text = c.get("text", "")
            passages = []
            if c.get("source_url") and c.get("excerpt"):
                passages.append(PassageRecord(
                    url=c["source_url"],
                    title=c.get("source_title", "Source"),
                    excerpt=c["excerpt"]
                ))
            claim_records.append(ClaimRecord(
                id=cid,
                text=text,
                status=EvidenceStatus.UNRESOLVED,
                rationale="Pending verification check",
                passages=passages
            ))

        return final_report, claim_records

    async def verify_claim_evidence(self, claim: ClaimRecord, sources: List[Dict[str, Any]]) -> ClaimRecord:
        """Evaluate if the associated passages truly entail the claim, or if there is contradiction or a gap."""
        if not claim.passages:
            claim.status = EvidenceStatus.UNSUPPORTED
            claim.rationale = "No source passages were linked to this claim."
            return claim

        passages_text = "\n\n".join([f"Passage {idx+1} (from {p.url}):\n\"{p.excerpt}\"" for idx, p in enumerate(claim.passages)])

        system_prompt = (
            "You are an objective evidence verification evaluator. Analyze whether the provided source passages "
            "semantically entail (fully support) the claim, contradict the claim, or if the passages are merely "
            "topically related without proving the claim.\n"
            "Strict Rules:\n"
            "1. Do NOT mark supported merely because a passage talks about the same topic. It must directly entail the specific fact.\n"
            "2. If the passage actively contradicts the claim, label as 'potentially_contradicted'.\n"
            "3. If insufficient or absent proof, label as 'unsupported'.\n"
            "4. Only if explicitly and clearly verified by passage text, label as 'supported'.\n"
            "Output JSON:\n"
            "{\n"
            '  "status": "supported" | "unsupported" | "potentially_contradicted" | "unresolved",\n'
            '  "rationale": "Clear 1-2 sentence explanation of why the evidence supports, fails, or contradicts."\n'
            "}"
        )

        user_prompt = f"Claim: {claim.text}\n\nEvidence Passages:\n{passages_text}"
        res = await llm_service.generate_json(system_prompt, user_prompt)

        status_str = res.get("status", "unsupported")
        if status_str == "supported":
            claim.status = EvidenceStatus.SUPPORTED
        elif status_str == "potentially_contradicted":
            claim.status = EvidenceStatus.CONTRADICTED
            for p in claim.passages:
                p.is_conflicting = True
        elif status_str == "unresolved":
            claim.status = EvidenceStatus.UNRESOLVED
        else:
            claim.status = EvidenceStatus.UNSUPPORTED

        claim.rationale = res.get("rationale", "Evidence verification complete.")
        return claim

verifier_service = VerifierService()
