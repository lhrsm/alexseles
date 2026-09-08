from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health", summary="Health Check do Backend")
async def health_check():
    return {
        "status": "healthy",
        "service": "Alex Seles Mentoria de Carreira & TI API",
        "timestamp": datetime.now().isoformat()
    }
