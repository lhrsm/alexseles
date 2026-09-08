from pydantic import BaseModel, EmailStr, Field, field_validator
from enum import Enum
from typing import Optional
from datetime import datetime

class AreaInteresse(str, Enum):
    TRABALHISTA = "direito_trabalhista"
    PREVIDENCIARIO = "direito_previdenciario"
    OUTROS = "consulta_geral"

class ContactFormCreate(BaseModel):
    nome_completo: str = Field(
        ..., 
        min_length=3, 
        max_length=120, 
        description="Nome civil do solicitante"
    )
    email: EmailStr = Field(
        ..., 
        description="E-mail principal para retorno institucional"
    )
    telefone: str = Field(
        ..., 
        min_length=10, 
        max_length=20, 
        description="Telefone com DDD / WhatsApp"
    )
    cidade_estado: str = Field(
        ..., 
        min_length=2, 
        max_length=80, 
        description="Cidade e Estado de residência"
    )
    area_interesse: AreaInteresse = Field(
        ..., 
        description="Área jurídica de interesse"
    )
    resumo_situacao: str = Field(
        ..., 
        min_length=10, 
        max_length=2000, 
        description="Breve relato factual da dúvida"
    )
    consentimento_lgpd: bool = Field(
        ..., 
        description="Consentimento explícito nos termos da LGPD"
    )

    @field_validator("consentimento_lgpd")
    def validate_lgpd(cls, v: bool) -> bool:
        if not v:
            raise ValueError("O consentimento para tratamento de dados pessoais conforme a LGPD é obrigatório.")
        return v

class ContactResponse(BaseModel):
    status: str
    mensagem: str
    protocolo: str
    timestamp: str
