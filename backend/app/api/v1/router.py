from fastapi import APIRouter
from app.api.v1.endpoints import contact, articles, health

api_router = APIRouter()
api_router.include_router(contact.router, tags=["Contato"])
api_router.include_router(articles.router, tags=["Artigos & SEO"])
api_router.include_router(health.router, tags=["Monitoramento"])
