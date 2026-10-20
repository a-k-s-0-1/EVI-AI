import time
import uuid
from datetime import datetime
from typing import Dict, Any, List
from app.models.schemas import ResearchRunRequest, ResearchRunResult, RunMode, EvidenceStatus
from app.services.search_service import search_service
from app.services.verifier_service import verifier_service
from app.services.recovery_engine import recovery_engine
from app.database import save_run

class AgentRunner:
    async def run(self, request: ResearchRunRequest) -> ResearchRunResult:
        start_time = time.time()
        run_id = f"run_{uuid.uuid4().hex[:8]}"
        tool_calls = 0

        # Step 1: Initial Source Retrieval
        if request.custom_sources:
            sources = request.custom_sources
        else:
            sources = await search_service.retrieve_sources(request.query, max_results=3)
            tool_calls += 1

        # Step 2: Synthesis & Claim Extraction
        final_report, claims = await verifier_service.extract_claims_and_synthesize(request.query, sources)

        # Step 3: Initial Verification of all claims
        for claim in claims:
            await verifier_service.verify_claim_evidence(claim, sources)

        recovery_actions = []
        stop_reason = "Baseline run completed without recovery"

        # Step 4: Selective Recovery (if requested mode == RECOVERY)
        if request.mode == RunMode.RECOVERY:
            claims, recovery_actions, tool_calls, stop_reason = await recovery_engine.execute_recovery(
                claims=claims,
                tool_calls_used=tool_calls,
                max_budget=request.max_tool_budget or 6
            )

        # Calculate metrics
        duration = round(time.time() - start_time, 2)
        total = len(claims)
        supported = sum(1 for c in claims if c.status == EvidenceStatus.SUPPORTED)
        unsupported = sum(1 for c in claims if c.status == EvidenceStatus.UNSUPPORTED)
        contradicted = sum(1 for c in claims if c.status == EvidenceStatus.CONTRADICTED)
        unresolved = sum(1 for c in claims if c.status == EvidenceStatus.UNRESOLVED)
        correctness_pct = round((supported / total * 100.0) if total > 0 else 0.0, 1)

        result = ResearchRunResult(
            run_id=run_id,
            query=request.query,
            mode=request.mode,
            final_report=final_report,
            claims=claims,
            recovery_actions=recovery_actions,
            tool_calls_count=tool_calls,
            duration_seconds=duration,
            total_claims=total,
            supported_claims=supported,
            unsupported_claims=unsupported,
            contradicted_claims=contradicted,
            unresolved_claims=unresolved,
            citation_correctness_pct=correctness_pct,
            stop_reason=stop_reason,
            created_at=datetime.utcnow().isoformat()
        )

        # Save to SQLite database
        await save_run(result.model_dump())
        return result

agent_runner = AgentRunner()
