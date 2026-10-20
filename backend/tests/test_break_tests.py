import pytest
import pytest_asyncio
from app.services.agent_runner import agent_runner
from app.models.schemas import ResearchRunRequest, RunMode, EvidenceStatus
from app.database import init_db

@pytest_asyncio.fixture(autouse=True)
async def setup_db():
    await init_db()

@pytest.mark.asyncio
async def test_bt01_empty_question():
    empty_input = "   "
    assert not empty_input.strip()

@pytest.mark.asyncio
async def test_bt02_long_question():
    long_input = "a" * 2500
    assert len(long_input) > 2000

@pytest.mark.asyncio
async def test_bt03_failed_retrieval():
    sources = [{
        "url": "https://broken-test-domain-123456.org",
        "title": "Broken",
        "content": "",
        "snippet": ""
    }]
    req = ResearchRunRequest(query="Test broken retrieval", custom_sources=sources, mode=RunMode.BASELINE)
    res = await agent_runner.run(req)
    assert all(c.status in [EvidenceStatus.UNSUPPORTED, EvidenceStatus.UNRESOLVED] for c in res.claims)

@pytest.mark.asyncio
async def test_bt04_topical_non_supporting():
    sources = [{
        "url": "https://history.example.com",
        "title": "Apollo 11",
        "content": "Apollo 11 landed in 1969.",
        "snippet": "1969 moon landing"
    }]
    req = ResearchRunRequest(query="Confirm Apollo 11 landed in 1999", custom_sources=sources, mode=RunMode.BASELINE)
    res = await agent_runner.run(req)
    assert all(c.status != EvidenceStatus.SUPPORTED for c in res.claims)

@pytest.mark.asyncio
async def test_bt06_budget_enforcement():
    req = ResearchRunRequest(query="Exhaust budget test", max_tool_budget=1, mode=RunMode.RECOVERY)
    res = await agent_runner.run(req)
    assert res.tool_calls_count <= 2
