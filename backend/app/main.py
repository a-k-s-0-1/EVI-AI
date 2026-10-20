from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import init_db
from app.api.routes_research import router as research_router
from app.api.routes_breaktests import router as breaktests_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="Evidence-Aware AI Research Agent API",
    description="Backend service with Claim-Evidence Ledger, Selective Recovery, and Break-Test validation.",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(research_router)
app.include_router(breaktests_router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Evidence-Aware AI Research Agent"}
