# Guia de Implantação: Agente de IA no WhatsApp com n8n & Google Calendar

Este guia explica a arquitetura e os passos práticos para colocar no ar o **Agente de IA no WhatsApp para Alex Seles**, responsável por atender o profissional, colher as suas dores de carreira através de um briefing conversacional estruturado e agendar uma sessão diagnóstica diretamente no **Google Calendar**.

---

## 🏛️ Arquitetura da Solução

```
[ Utilizador no WhatsApp ]
           │ (Mensagem de texto / áudio)
           ▼
[ Gateway WhatsApp: Evolution API / Z-API / Meta ]
           │ (Webhook HTTP POST)
           ▼
[ n8n Workflow ]
   ├── 1. Webhook de Entrada (`/webhook/whatsapp-alexseles`)
   ├── 2. Filtro & Limpeza (Ignora mensagens próprias, grupos e broadcasts)
   ├── 3. Agente de IA com LangChain (OpenAI GPT-4o-mini ou Google Gemini)
   │      ├── Memória de Janela Buffer (Session Key por telemóvel do lead)
   │      ├── System Prompt (Briefing, tom executivo e acolhedor de Alex Seles)
   │      ├── Tool 1: Consultar Disponibilidade (Google Calendar API)
   │      └── Tool 2: Agendar Reunião (Google Calendar + Envio Google Meet)
   └── 4. Disparo de Resposta WhatsApp (HTTP Request para Evolution API)
           │
           ▼
[ Convite com Google Meet enviado ao e-mail do Lead & Evento na Agenda de Alex Seles ]
```

---

## 📋 Como Funciona o Briefing Conversacional da IA

Ao contrário de formulários rígidos, a IA conduz uma conversa fluida e humana em 4 fases:

1. **Acolhimento:** Recebe o utilizador pelo nome e valida o interesse (transição de carreira, mentoria de liderança, certificações PMP/ITIL ou posicionamento no LinkedIn).
2. **Diagnóstico das Dores (Briefing):**
   - Qual é a sua formação / área atual? (Ex: Direito, Engenharia, Finanças, RH, ou se já atua em suporte/dev).
   - Qual é a sua meta principal? (Ex: migrar para TI, assumir cargo de gestão ágil, duplicar remuneração em moeda forte).
   - Qual é a maior barreira hoje? (Ex: currículo rejeitado por filtros ATS, LinkedIn sem visualizações, insegurança técnica).
3. **Apresentação da Solução & Autoridade:**
   - Breve menção à mentoria estruturada de 16 horas de Alex Seles e o seu histórico (+20 anos, Top 7 Favikon).
4. **Fecho & Agendamento:**
   - A IA pergunta o e-mail do profissional e consulta a agenda em tempo real via **Google Calendar Tool**.
   - Propõe opções reais de datas e horários (dias úteis, das 10h às 19h no fuso de Lisboa/São Paulo).
   - Ao confirmar, dispara a criação do evento no Google Calendar e envia o link do Google Meet.

---

## 🚀 Passo a Passo para Importar no n8n

### Passo 1: Importar o Workflow
1. Abra o seu painel do **n8n**.
2. No menu superior direito, clique em **Add Workflow** ➔ **Import from File...** (ou clique nos três pontos e selecione **Import from JSON**).
3. Selecione o ficheiro localizado neste repositório:
   `n8n/whatsapp-ai-agent-google-calendar.json`.
4. O fluxo completo com todos os nós, modelos de IA, ferramentas e conexões surgirá no ecrã.

---

### Passo 2: Configurar as Credenciais no n8n

O workflow necessita de duas credenciais principais:

#### 1. Credencial OpenAI (ou Gemini):
- Clique no nó **OpenAI Chat Model (GPT-4o-mini)**.
- Em *Credential to connect with*, selecione ou crie uma credencial **OpenAI API**.
- Insira a sua `API Key` da OpenAI.
*(Nota: Se preferir usar Google Gemini, basta trocar este nó por `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` e inserir a chave gratuita do Google AI Studio).*

#### 2. Credencial Google Calendar OAuth2:
- Clique nos nós **Tool: Consultar Agenda** e **Tool: Agendar no Google Calendar**.
- Em *Credential to connect with*, selecione ou crie uma credencial **Google Calendar OAuth2 API**.
- Conceda permissão à sua conta Google oficial de Alex Seles.
- O n8n terá acesso a consultar e inserir reuniões com envio automático de convite Google Meet aos participantes.

---

### Passo 3: Conectar o WhatsApp (Evolution API)

A **Evolution API** é a solução open-source mais robusta para conectar o WhatsApp ao n8n.

1. **Configurar o Webhook de Entrada:**
   - No nó **Webhook WhatsApp (Evolution API / Meta)**, copie o URL de produção gerado pelo n8n (ex: `https://seu-n8n.com/webhook/whatsapp-alexseles`).
   - Na Evolution API, configure o Webhook da sua instância com o evento `MESSAGES_UPSERT` apontando para esse URL.

2. **Configurar o Nó de Resposta:**
   - No nó **Enviar Resposta ao WhatsApp**:
     - Substitua `http://SEU_HOST_EVOLUTION_API:8080/message/sendText/alexseles` pelo URL real da sua API e instância.
     - Substitua `SUA_CHAVE_API_EVOLUTION` no cabeçalho `apikey` pela sua chave configurada.

---

## 🧪 Roteiro de Teste Real

1. No n8n, clique em **Test step** ou ative o workflow para o modo **Active** (toggle no topo direito).
2. Pelo WhatsApp de teste, envie uma mensagem:
   > *"Olá Alex, gostaria de saber mais sobre a mentoria."*
3. O robô responderá de forma acolhedora perguntando a sua área atual e o seu objetivo.
4. Responda:
   > *"Sou formado em Direito, mas quero migrar para a área de tecnologia e liderança ágil."*
5. A IA identificará a dor, fará a ponte com a rota de DPO/Scrum Master e perguntará sobre a disponibilidade para um diagnóstico gratuito:
   > *"Gostarias de agendar uma sessão diagnóstica de 30 minutos esta semana? Qual o teu e-mail e melhor dia?"*
6. Informe o e-mail e escolha um dia:
   > *"Meu e-mail é teste@exemplo.com, posso na quinta-feira às 15h."*
7. A IA consulta o **Google Calendar**, bloqueia o horário de 30 minutos, insere o resumo do briefing na descrição e adiciona o e-mail aos convidados do Google Meet.
8. Verifique o seu Google Calendar e confirme a criação imediata da reunião com link gerado!
