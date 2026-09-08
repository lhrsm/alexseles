from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Alex Seles API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS Origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]
    
    # Database
    DATABASE_URL: str = "sqlite:///./contacts.db"
    
    # Email notifications
    OFFICE_EMAIL: str = "alexseles40@gmail.com"
    
    class Config:
        case_sensitive = True

settings = Settings()
