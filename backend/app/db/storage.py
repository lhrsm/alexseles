import sqlite3
import uuid
from datetime import datetime
from app.schemas.contact import ContactFormCreate

DB_FILE = "contacts.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            protocolo TEXT UNIQUE NOT NULL,
            nome_completo TEXT NOT NULL,
            email TEXT NOT NULL,
            telefone TEXT NOT NULL,
            cidade_estado TEXT NOT NULL,
            area_interesse TEXT NOT NULL,
            resumo_situacao TEXT NOT NULL,
            consentimento_lgpd INTEGER NOT NULL,
            criado_em TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def salvar_contato(dados: ContactFormCreate) -> str:
    init_db()
    protocolo = f"AS-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    criado_em = datetime.now().isoformat()

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO contatos (
            protocolo, nome_completo, email, telefone, 
            cidade_estado, area_interesse, resumo_situacao, 
            consentimento_lgpd, criado_em
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        protocolo,
        dados.nome_completo,
        dados.email,
        dados.telefone,
        dados.cidade_estado,
        dados.area_interesse.value,
        dados.resumo_situacao,
        1 if dados.consentimento_lgpd else 0,
        criado_em
    ))
    conn.commit()
    conn.close()
    return protocolo
