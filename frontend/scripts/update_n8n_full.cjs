const https = require('https');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmI5ODc2ZC1mNjA4LTQ4ODQtOGE3Mi0xOTFlZmRlMTBhYWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMWI3ZDZhZDAtYjVjNS00NDY0LWIwMGItOGYwODBiNTYyYWRmIiwiaWF0IjoxNzg4NjIzMTQ0fQ.gXMklnPau13zkpwnyemqW_t7DTwnmptYYiYdcraAw8Q';
const WORKFLOW_ID = 'lkF8T2I0p7KFq0zz';

function req(method, path, data) {
  return new Promise((resolve, reject) => {
    const r = https.request({
      hostname: 'n8n.srv1469659.hstgr.cloud',
      path,
      method,
      headers: {
        'X-N8N-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }, resp => {
      let b = '';
      resp.on('data', d => b += d);
      resp.on('end', () => {
        try { resolve(JSON.parse(b)); } catch (e) { resolve(b); }
      });
    });
    r.on('error', reject);
    if (data) r.write(typeof data === 'string' ? data : JSON.stringify(data));
    r.end();
  });
}

async function update() {
  console.log('Obtendo workflow atual...');
  const wf = await req('GET', `/api/v1/workflows/${WORKFLOW_ID}`);

  // Remover eventuais nós temporários de probe
  wf.nodes = wf.nodes.filter(n => n.name !== 'Probe Sheets Properties');

  // 1. Atualizar Código de Formatar Dados & Dossiê1
  const formatNode = wf.nodes.find(n => n.name === 'Formatar Dados & Dossiê1');
  if (formatNode) {
    formatNode.parameters.jsCode = `// 1. Obtém os dados do Webhook
const webhookNode = $('Webhook Site (Mafalda)');
const webhookData = (webhookNode.first() && webhookNode.first().json.body) 
  ? webhookNode.first().json.body 
  : (webhookNode.item && webhookNode.item.json.body) 
  ? webhookNode.item.json.body 
  : {};

// 2. Extrai o Dossiê Executivo da IA
const aiItem = $input.item.json;
const aiOutput = 
  aiItem.output?.[0]?.content?.[0]?.text ||
  aiItem.message?.content ||
  aiItem.text ||
  'Dossiê gerado com sucesso.';

// 3. Normalização de dados
const nome = webhookData.nome || 'Candidato';
const email = webhookData.email || 'contato@alexseles.online';
let rawTelefone = webhookData.telefone || 'Não informado';
const telefone = (typeof rawTelefone === 'string' && rawTelefone.startsWith('+'))
  ? "'" + rawTelefone
  : rawTelefone;
const cidade = webhookData.cidade || 'Não informado';
const tipoSolicitacao = webhookData.tipoSolicitacao || 'Sessão Diagnóstica';
const modulo = webhookData.modulo || 'Sessão Diagnóstica Geral (30 min)';
const investimento = webhookData.investimento || 'Sob Consulta';
const horas = webhookData.horas || '30 Minutos';
const objetivo = webhookData.objetivo || 'Mentoria Executiva em TI';
const desafio = webhookData.desafio || 'Não informado';
const slotAgendamento = webhookData.slotAgendamento || 'A combinar';
const canal = webhookData.canal || 'Formulário do Site';
const startISO = webhookData.startISO || new Date().toISOString();
const endISO = webhookData.endISO || new Date(Date.now() + 30 * 60 * 1000).toISOString();

// 4. Lógica de Roteamento de Triagem (Trello & Excel)
const isNewsletter = 
  Boolean(webhookData.isNewsletter) ||
  canal.toLowerCase().includes('newsletter') || 
  canal.toLowerCase().includes('conteúdo') || 
  canal.toLowerCase().includes('conteudo') || 
  tipoSolicitacao.toLowerCase().includes('conteúdo') ||
  tipoSolicitacao.toLowerCase().includes('conteudo') ||
  tipoSolicitacao.toLowerCase().includes('newsletter') ||
  webhookData.status === 'Community' ||
  webhookData.colunaTrello === 'Community';

// Critério de Qualificação:
const isQualificado = 
  !isNewsletter && (
    webhookData.status === 'Qualificado' || 
    webhookData.colunaTrello === 'Qualificado' || 
    webhookData.isQualificado === true ||
    webhookData.trelloList === 'Qualificado' ||
    String(webhookData.qualificado).toLowerCase() === 'true'
  );

let trelloListId = '6a9d90b02395ca86e00d5eb7'; // Lista Leads (Curiosos / Não Qualificados)
let statusCategory = 'Leads';

if (isNewsletter) {
  trelloListId = '6aa8208fd65f87b2e5c2be80'; // Lista Community
  statusCategory = 'Community';
} else if (isQualificado) {
  trelloListId = '6aa814ebd45240dadecfd8d4'; // Lista Qualificado
  statusCategory = 'Qualificado';
}

const isModulo = tipoSolicitacao === 'Contratação de Módulo';
const calendarSummary = isNewsletter
  ? \`[NEWSLETTER] \${nome} (\${email})\`
  : (isModulo ? \`[\${statusCategory.toUpperCase()}: \${investimento}] \${nome} • \${modulo}\` : \`[\${statusCategory.toUpperCase()}] \${nome} com Alex Seles\`);

const calendarDescription = [
  \`SOLICITAÇÃO: \${tipoSolicitacao.toUpperCase()}\`,
  \`TRIAGEM: \${statusCategory.toUpperCase()} (Trello: Coluna \${statusCategory})\`,
  \`MÓDULO / PROGRAMA: \${modulo}\`,
  \`INVESTIMENTO: \${investimento}\`,
  \`CARGA HORÁRIA: \${horas}\`,
  \`CANAL: \${canal}\`,
  \`------------------------------------------------------------\`,
  \`CANDIDATO: \${nome}\`,
  \`CIDADE / PAÍS: \${cidade}\`,
  \`OBJETIVO: \${objetivo}\`,
  \`MAIOR DESAFIO: \${desafio}\`,
  \`TELEMOVEL: \${rawTelefone}\`,
  \`E-MAIL: \${email}\`,
  \`HORÁRIO / AGENDA: \${slotAgendamento}\`,
  \`LOCAL: Google Meet\`,
  \`\`,
  \`--- DOSSIÊ ESTRATÉGICO GERADO PELA IA (GPT-4o-mini) ---\`,
  aiOutput,
  \`\`,
  \`------------------------------------------------------------\`,
  \`MENTOR: Alex Seles | contato@alexseles.online | +351 912 405 814\`
].join('\\n');

const emailSubject = isNewsletter
  ? \`[COMMUNITY: NEWSLETTER] Novo Subscritor: \${nome} (\${email})\`
  : \`[\${statusCategory.toUpperCase()}] Novo Lead de Mentoria: \${nome} • \${modulo}\`;

const emailHtml = \`
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #163758; line-height: 1.6; border: 1px solid #DCE4EC; border-radius: 12px; overflow: hidden; background-color: #FFFFFF;">
  <div style="background-color: #163758; padding: 24px; color: #FFFFFF; text-align: left;">
    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; font-weight: 700;">Alex Seles • Sistema de Atendimento & Triagem</span>
    <h1 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">\${emailSubject}</h1>
  </div>
  
  <div style="padding: 24px;">
    <div style="display: inline-block; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 700; margin-bottom: 20px; background-color: \${statusCategory === 'Qualificado' ? '#DCFCE7; color: #15803D;' : statusCategory === 'Community' ? '#E0F2FE; color: #0369A1;' : '#FEF3C7; color: #B45309;'}">
      Status de Triagem: \${statusCategory.toUpperCase()} (Trello: Coluna \${statusCategory})
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B; width: 35%;">Nome:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${nome}</td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">E-mail:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;"><a href="mailto:\${email}" style="color: #0284C7; text-decoration: none;">\${email}</a></td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">Telemóvel / WhatsApp:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${rawTelefone}</td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">Cidade / País:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${cidade}</td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">Módulo / Programa:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${modulo}</td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">Investimento Previsto:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${investimento}</td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">Horário / Agenda:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${slotAgendamento}</td></tr>
      <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; color: #64748B;">Canal de Origem:</td><td style="padding: 8px 0; font-weight: 600; color: #163758;">\${canal}</td></tr>
    </table>

    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #163758;">Objetivo Registado:</h3>
      <p style="margin: 0 0 16px 0; font-size: 13px; color: #334155;">\${objetivo}</p>
      <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #163758;">Desafio Apresentado:</h3>
      <p style="margin: 0; font-size: 13px; color: #334155;">\${desafio}</p>
    </div>

    <div style="border-left: 4px solid #0284C7; padding-left: 16px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #163758;">Dossiê Executivo da IA (GPT-4o-mini)</h3>
      <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.6;">\${aiOutput}</div>
    </div>

    <div style="font-size: 12px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 16px;">
      Registo processado em: \${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })} • Trello: <a href="https://trello.com/b/6a9d904332b4e4bee8fd0833" style="color: #0284C7;">Quadro Alex Seles</a>
    </div>
  </div>
</div>
\`;

return [{
  json: {
    nome,
    email,
    telefone,
    cidade,
    tipoSolicitacao,
    modulo,
    investimento,
    horas,
    objetivo,
    desafio,
    slotAgendamento,
    canal,
    startISO,
    endISO,
    aiDossie: aiOutput,
    calendarSummary,
    calendarDescription,
    emailSubject,
    emailHtml,
    dataRegisto: new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' }),
    isNewsletter,
    isQualificado,
    statusCategory,
    trelloListId
  }
}];`;
  }

  // 2. Atualizar Google Calendar (remover alexseles40@gmail.com e desativar disparos invasivos)
  const calNode = wf.nodes.find(n => n.name === 'Google Calendar (Criar Evento & Meet)1');
  if (calNode) {
    calNode.parameters.additionalFields = {
      attendees: "={{ $json.isNewsletter ? [] : [$json.email] }}",
      description: "={{ $json.calendarDescription }}",
      location: "Google Meet",
      sendUpdates: "none",
      summary: "={{ $json.calendarSummary }}"
    };
  }

  // 3. Atualizar Nó Google Sheets: Leads (gid=0 / title: 'leads')
  const sheetsLeadNode = wf.nodes.find(n => n.name.includes('Google Sheets') && !n.name.includes('Community'));
  if (sheetsLeadNode) {
    sheetsLeadNode.name = 'Google Sheets (Gravar Lead & Dossiê)1';
    sheetsLeadNode.parameters = {
      operation: 'append',
      documentId: {
        __rl: true,
        mode: 'id',
        value: '1w-7VV2jfc-I24JV8KEcPyzAGdUkcIWL0GrsWlOENxQs'
      },
      sheetName: {
        __rl: true,
        value: 'leads',
        mode: 'name'
      },
      columns: {
        mappingMode: 'autoMapInputData'
      },
      options: {}
    };
  }

  // 4. Atualizar Nó Google Sheets: Community (gid=1968227202 / title: 'community')
  let sheetsCommunityNode = wf.nodes.find(n => n.name === 'Google Sheets (Gravar Community)1');
  if (!sheetsCommunityNode) {
    sheetsCommunityNode = {
      parameters: {
        operation: 'append',
        documentId: {
          __rl: true,
          mode: 'id',
          value: '1w-7VV2jfc-I24JV8KEcPyzAGdUkcIWL0GrsWlOENxQs'
        },
        sheetName: {
          __rl: true,
          mode: 'name',
          value: 'community'
        },
        columns: {
          mappingMode: 'autoMapInputData'
        },
        options: {}
      },
      id: 'sheets-community-node-real',
      name: 'Google Sheets (Gravar Community)1',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.5,
      position: [16, 440],
      credentials: {
        googleSheetsOAuth2Api: {
          id: 'Pfxd369G3ze0eD1e',
          name: 'Google Sheets account'
        }
      }
    };
    wf.nodes.push(sheetsCommunityNode);
  } else {
    sheetsCommunityNode.parameters = {
      operation: 'append',
      documentId: {
        __rl: true,
        mode: 'id',
        value: '1w-7VV2jfc-I24JV8KEcPyzAGdUkcIWL0GrsWlOENxQs'
      },
      sheetName: {
        __rl: true,
        mode: 'name',
        value: 'community'
      },
      columns: {
        mappingMode: 'autoMapInputData'
      },
      options: {}
    };
  }

  // 5. Nó de Decisão: Verificar se é Newsletter (IF)
  let ifNode = wf.nodes.find(n => n.name === 'Verificar se é Newsletter');
  if (!ifNode) {
    ifNode = {
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: '',
            typeValidation: 'strict',
            version: 2
          },
          conditions: [
            {
              id: 'cond-is-newsletter',
              leftValue: '={{ $json.isNewsletter }}',
              rightValue: true,
              operator: {
                type: 'boolean',
                operation: 'equals'
              }
            }
          ],
          combinator: 'and'
        },
        options: {}
      },
      id: 'if-newsletter-check',
      name: 'Verificar se é Newsletter',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.2,
      position: [-160, 288]
    };
    wf.nodes.push(ifNode);
  }

  // 6. Atualizar Trello: Estruturar Plano de Ação1
  const trelloPrep = wf.nodes.find(n => n.name === 'Trello: Estruturar Plano de Ação1');
  if (trelloPrep) {
    trelloPrep.position = [288, 288];
    trelloPrep.parameters.jsCode = `let lead;
try {
  lead = $('Formatar Dados & Dossiê1').item.json;
} catch (e) {
  lead = $input.item.json;
}

const nome = lead.nome || 'Candidato';
const email = lead.email || 'contato@alexseles.online';
const modulo = lead.modulo || 'Sessão Diagnóstica';
const investimento = lead.investimento || 'Sob Consulta';
const horas = lead.horas || '30 Minutos';
const objetivo = lead.objetivo || 'Mentoria Executiva em TI';
const desafio = lead.desafio || 'Não informado';
const telefone = lead.telefone || 'Não informado';
const cidade = lead.cidade || 'Não informado';
const slotAgendamento = lead.slotAgendamento || 'A combinar';
const canal = lead.canal || 'Formulário do Site';
const dataRegisto = lead.dataRegisto || new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });
const aiDossie = lead.aiDossie || 'Dossiê processado.';
const isNewsletter = lead.isNewsletter;
const isQualificado = lead.isQualificado;
const statusCategory = lead.statusCategory || 'Leads';
const trelloListId = lead.trelloListId || '6a9d90b02395ca86e00d5eb7';

let cardTitle = '';
if (isNewsletter) {
  cardTitle = \`[COMMUNITY] \${nome} • \${email}\`;
} else if (isQualificado) {
  cardTitle = \`[QUALIFICADO] \${nome} • \${modulo}\`;
} else {
  cardTitle = \`[LEAD / CURIOSO] \${nome} • \${modulo}\`;
}

const cardDescription = [
  \`TRIAGEM & STATUS: \${statusCategory.toUpperCase()}\`,
  \`COLUNA DO TRELLO: \${statusCategory}\`,
  \`TIPO DE SOLICITAÇÃO: \${lead.tipoSolicitacao || 'Diagnóstico'}\`,
  \`MÓDULO / PROGRAMA: \${modulo}\`,
  \`INVESTIMENTO PREVISTO: \${investimento}\`,
  \`CARGA HORÁRIA: \${horas}\`,
  \`CANAL DE ENTRADA: \${canal}\`,
  \`--------------------------------------------------\`,
  \`DADOS DO MENTORADO:\`,
  \`Nome: \${nome}\`,
  \`Telemóvel: \${telefone}\`,
  \`E-mail: \${email}\`,
  \`Cidade / País: \${cidade}\`,
  \`Horário / Sessão: \${slotAgendamento}\`,
  \`Data de Registo: \${dataRegisto}\`,
  \`\`,
  \`OBJETIVO REGISTADO:\`,
  objetivo,
  \`\`,
  \`SITUAÇÃO / DESAFIO APRESENTADO:\`,
  desafio,
  \`\`,
  \`--- DOSSIÊ ESTRATÉGICO GERADO PELA IA ---\`,
  aiDossie,
  \`\`,
  \`--- CHECKLIST DO PLANO DE AÇÃO ---\`,
  isNewsletter ? \`[ ] Incluir na lista VIP de envio de vagas e conteúdos\\n[ ] Enviar e-mail de boas-vindas da comunidade\` :
  (isQualificado ? \`[ ] Contacto executivo prioritário para fecho de mentoria\\n[ ] Enviar proposta executiva e alinhamento de agenda\` : \`[ ] Avaliar maturidade de transição\\n[ ] Convidar para leitura da Central de Conhecimento\`),
  \`[ ] Alinhar metas de carreira 3/6/12 meses\`,
  \`[ ] Revisão profunda de Perfil LinkedIn ATS e Currículo\`,
  \`[ ] Simulação de entrevistas executivas e negociação salarial\`
].join('\\n');

return [{
  json: {
    cardTitle,
    cardDescription,
    trelloListId,
    emailSubject: lead.emailSubject,
    emailHtml: lead.emailHtml,
    lead
  }
}];`;
  }

  // 7. Atualizar Trello Create a card
  const trelloNode = wf.nodes.find(n => n.name === 'Create a card');
  if (trelloNode) {
    trelloNode.position = [544, 288];
    trelloNode.parameters = {
      listId: "={{ $json.trelloListId || '6a9d90b02395ca86e00d5eb7' }}",
      name: "={{ $json.cardTitle }}",
      description: "={{ $json.cardDescription }}",
      additionalFields: {}
    };
  }

  // 8. Atualizar Nó Gmail com expressões robustas
  let gmailNode = wf.nodes.find(n => n.name.includes('Gmail'));
  if (gmailNode) {
    gmailNode.name = 'Gmail - Notificação Oficial contato@alexseles.online';
    gmailNode.type = 'n8n-nodes-base.gmail';
    gmailNode.typeVersion = 2.1;
    gmailNode.disabled = false;
    gmailNode.position = [800, 288];
    gmailNode.credentials = {
      gmailOAuth2: {
        id: 'u1gtNqMmxAImhvsH',
        name: 'Gmail account'
      }
    };
    gmailNode.parameters = {
      sendTo: 'contato@alexseles.online',
      subject: "={{ $('Formatar Dados & Dossiê1').item.json.emailSubject || '[MENTORIA] Novo Lead - Alex Seles' }}",
      message: "={{ $('Formatar Dados & Dossiê1').item.json.emailHtml || $('Formatar Dados & Dossiê1').item.json.calendarDescription }}",
      emailType: 'html',
      options: {}
    };
  }

  // 9. Reconstruir as conexões (Connections)
  wf.connections = {
    'Webhook Site (Mafalda)': {
      main: [
        [
          { node: 'Responder Confirmação ao Chat', type: 'main', index: 0 },
          { node: 'IA: Gerar Dossiê Executivo do Candidato', type: 'main', index: 0 }
        ]
      ]
    },
    'IA: Gerar Dossiê Executivo do Candidato': {
      main: [
        [
          { node: 'Formatar Dados & Dossiê1', type: 'main', index: 0 }
        ]
      ]
    },
    'Formatar Dados & Dossiê1': {
      main: [
        [
          { node: 'Google Calendar (Criar Evento & Meet)1', type: 'main', index: 0 },
          { node: 'Verificar se é Newsletter', type: 'main', index: 0 }
        ]
      ]
    },
    'Verificar se é Newsletter': {
      main: [
        // Output 0: True -> Newsletter (Community gid=1968227202)
        [
          { node: 'Google Sheets (Gravar Community)1', type: 'main', index: 0 }
        ],
        // Output 1: False -> Leads / Mentoria (gid=0)
        [
          { node: 'Google Sheets (Gravar Lead & Dossiê)1', type: 'main', index: 0 }
        ]
      ]
    },
    'Google Sheets (Gravar Lead & Dossiê)1': {
      main: [
        [
          { node: 'Trello: Estruturar Plano de Ação1', type: 'main', index: 0 }
        ]
      ]
    },
    'Google Sheets (Gravar Community)1': {
      main: [
        [
          { node: 'Trello: Estruturar Plano de Ação1', type: 'main', index: 0 }
        ]
      ]
    },
    'Trello: Estruturar Plano de Ação1': {
      main: [
        [
          { node: 'Create a card', type: 'main', index: 0 }
        ]
      ]
    },
    'Create a card': {
      main: [
        [
          { node: 'Gmail - Notificação Oficial contato@alexseles.online', type: 'main', index: 0 }
        ]
      ]
    },
    'Google Calendar (Criar Evento & Meet)1': {
      main: [[]]
    }
  };

  // 10. Gravar no n8n com settings limpo
  console.log('Enviando PUT para o n8n...');
  const res = await req('PUT', `/api/v1/workflows/${WORKFLOW_ID}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: 'v1' }
  });

  console.log('Workflow atualizado:', res.id);
  await req('POST', `/api/v1/workflows/${WORKFLOW_ID}/deactivate`);
  await new Promise(r => setTimeout(r, 1000));
  const act = await req('POST', `/api/v1/workflows/${WORKFLOW_ID}/activate`);
  console.log('Workflow reativado com status:', act.active);
}

update().catch(console.error);
