from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.db.articles_data import get_all_articles, get_article_by_slug, filter_articles

router = APIRouter()

@router.get(
    "/artigos",
    summary="Lista artigos técnicos da Central de Conhecimento",
    description="Retorna os 40 artigos com suporte a filtro por categoria e busca textual."
)
async def listar_artigos(
    categoria: Optional[str] = Query(None, description="Slug da categoria: direito-do-trabalho ou direito-previdenciario"),
    busca: Optional[str] = Query(None, description="Termo de pesquisa")
):
    artigos = filter_articles(category=categoria, search=busca)
    return {
        "total": len(artigos),
        "artigos": artigos
    }

@router.get(
    "/artigos/{slug}",
    summary="Retorna um artigo específico pelo slug",
    description="Retorna os dados completos do artigo, incluindo H2s, sumário e seções técnicas."
)
async def obter_artigo(slug: str):
    artigo = get_article_by_slug(slug)
    if not artigo:
        raise HTTPException(status_code=404, detail="Artigo não encontrado.")
    return artigo
