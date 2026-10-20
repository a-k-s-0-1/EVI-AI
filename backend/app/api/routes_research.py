from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.models.schemas import ResearchRunRequest, ResearchRunResult
from app.services.agent_runner import agent_runner
from app.database import get_all_runs, get_run_details

router = APIRouter(prefix="/api/research", tags=["research"])

@router.post("/run", response_model=ResearchRunResult)
async def execute_research(request: ResearchRunRequest):
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Research query cannot be empty.")
    if len(request.query) > 2000:
        raise HTTPException(status_code=400, detail="Research query exceeds 2000 characters limit.")
    
    result = await agent_runner.run(request)
    return result

@router.get("/runs", response_model=List[Dict[str, Any]])
async def list_runs():
    return await get_all_runs(limit=30)

@router.get("/runs/{run_id}")
async def get_run(run_id: str):
    run = await get_run_details(run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    return run
