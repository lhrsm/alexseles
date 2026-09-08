from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from app.schemas.contact import ContactFormCreate, ContactResponse
from app.db.storage import salvar_contato
from datetime import datetime
import html
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def enviar_notificacao_escritorio(protocolo: str, dados: ContactFormCreate):
    """
    Simula / despacha envio de e-mail seguro para Alex Seles
    """
    logger.info(f"==> [NOTIFICAÇÃO INTERNA] Novo contato registrado: {protocolo} - Área: {dados.area_interesse}")

@router.post(
    "/contato",
    response_model=ContactResponse,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Recebe formulário de contato do site",
    description="Endpoint seguro para registro de contatos e solicitações de mentoria."
)
async def receber_contato(
    formulario: ContactFormCreate,
    background_tasks: BackgroundTasks
):
    try:
        # Higienização contra XSS
        sanitized_nome = html.escape(formulario.nome_completo.strip())
        sanitized_resumo = html.escape(formulario.resumo_situacao.strip())
        sanitized_cidade = html.escape(formulario.cidade_estado.strip())

        dados_limpos = formulario.model_copy(update={
            "nome_completo": sanitized_nome,
            "resumo_situacao": sanitized_resumo,
            "cidade_estado": sanitized_cidade
        })

        # Persistência com protocolo
        protocolo = salvar_contato(dados_limpos)

        # Envio assíncrono em background
        background_tasks.add_task(enviar_notificacao_escritorio, protocolo, dados_limpos)

        return ContactResponse(
            status="sucesso",
            mensagem="Sua solicitação foi registrada com sucesso. Alex Seles retornará o contato.",
            protocolo=protocolo,
            timestamp=datetime.now().isoformat()
        )

    except Exception as e:
        logger.error(f"Erro ao processar formulário: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao registrar contato. Por favor utilize nosso canal direto de WhatsApp ou telefone."
        )
