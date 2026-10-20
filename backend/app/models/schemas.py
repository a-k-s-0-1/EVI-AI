from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class EvidenceStatus(str, Enum):
    SUPPORTED = "supported"
    UNSUPPORTED = "unsupported"
    CONTRADICTED = "potentially_contradicted"
    UNRESOLVED = "unresolved"

class RunMode(str, Enum):
    BASELINE = "baseline"
    RECOVERY = "recovery"

class PassageRecord(BaseModel):
    url: str
    title: str
    excerpt: str
    relevance_score: Optional[float] = None
    is_conflicting: bool = False

class ClaimRecord(BaseModel):
    id: str
    text: str
    status: EvidenceStatus = EvidenceStatus.UNRESOLVED
    rationale: str
    passages: List[PassageRecord] = Field(default_factory=list)
    recovery_attempted: bool = False

class RecoveryActionRecord(BaseModel):
    step: int
    action_type: str  # targeted_search, passage_re_eval, stop_budget, stop_resolved
    target_claim_id: Optional[str] = None
    query: Optional[str] = None
    outcome: str
    tool_calls_used: int

class ResearchRunRequest(BaseModel):
    query: str
    mode: RunMode = RunMode.RECOVERY
    max_tool_budget: Optional[int] = 6
    use_fixed_corpus: bool = False
    custom_sources: Optional[List[Dict[str, str]]] = None

class ResearchRunResult(BaseModel):
    run_id: str
    query: str
    mode: RunMode
    final_report: str
    claims: List[ClaimRecord]
    recovery_actions: List[RecoveryActionRecord]
    tool_calls_count: int
    duration_seconds: float
    total_claims: int
    supported_claims: int
    unsupported_claims: int
    contradicted_claims: int
    unresolved_claims: int
    citation_correctness_pct: float
    stop_reason: Optional[str] = None
    created_at: str

class BreakTestRunRequest(BaseModel):
    test_id: str  # BT01, BT02, BT03, BT04, BT05, BT06

class BreakTestRunResult(BaseModel):
    test_id: str
    name: str
    input_used: str
    expected_behavior: str
    actual_behavior: str
    passed: bool
    details: Dict[str, Any] = Field(default_factory=dict)
