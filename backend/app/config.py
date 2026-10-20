from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    GROQ_API_KEY: Optional[str] = None
    GEMINI_API_KEY: Optional[str] = None
    
    PRIMARY_MODEL: str = "llama-3.3-70b-versatile"
    MAX_INITIAL_SEARCH_RESULTS: int = 4
    MAX_RECOVERY_ATTEMPTS: int = 2
    MAX_TOOL_CALLS_BUDGET: int = 6
    
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    DATABASE_FILE: str = "research_agent.db"
    
    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
