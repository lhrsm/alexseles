import React, { useState, useEffect, useRef } from 'react';
import mafaldaImg from '../../assets/mafalda.png';
import whatsappLightBg from '../../assets/whatsapp-doodle-light.svg';
import { addContact } from '../../services/backofficeService';

// Blindagem Defensiva Anti-Hacker e Deteção de Ameaças / Injeção
const detectSecurityThreat = (text) => {
  if (!text) return false;
  if (text.length > 500) return true;

  const promptInjection = /(ignore\s+(all\s+)?previous\s+instructions|system\s+prompt|dan\s+mode|jailbreak|act\s+as\s+an?\s+unregulated|bypass\s+rules|reveal\s+(system|secret|prompt)|developer\s+mode|você\s+agora\s+é|forget\s+all\s+instructions)/i;
  const maliciousCode = /(<script|javascript:|onerror\s*=|onload\s*=|union\s+select|drop\s+table|--\s*$|;\s*drop|eval\(|document\.cookie|<img\s+src|<iframe)/i;

  return promptInjection.test(text) || maliciousCode.test(text);
};

// Higienização de strings contra caracteres de controle e tags
const sanitizeText = (str) => {
  if (!str) return '';
  return str.replace(/[<>]/g, '').trim();
};

export const WhatsAppSimulatedChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Passos do SPIN Selling (Profissionais ou Empresas):
  // 0: Escolha de Perfil (Profissionais vs Empresas)
  // 1: Nome (e Denominação da Empresa se B2B)
  // 2: S - Situação (Cargo / Dimensão da Equipa)
  // 3: P - Problema (Maior Desafio / Dor Técnica)
  // 4: I - Implicação (Tempo / Impacto Operacional / Financeiro)
  // 5: N - Necessidade & Decisão Comercial (Investimento vs Curioso)
  // 6: Contacto WhatsApp
  // 7: LinkedIn & E-mail
  // 8: Concluído com Diagnóstico Final Bem Tratado
  const [step, setStep] = useState(0);

  const [leadData, setLeadData] = useState({
    perfil: 'profissional', // 'profissional' ou 'empresa'
    nome: '',
    empresa: '',
    cargo: '',
    dimensaoEquipa: '',
    experiencia: '',
    desafio: '',
    implicacao: '',
    momentoComercial: '',
    telefone: '',
    linkedin: '',
    email: '',
    diagnosticoSugerido: '',
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Mensagem inicial de boas-vindas com pergunta de triagem (Profissional vs Empresa)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer1 = setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        setMessages([
          {
            id: 'm-1',
            sender: 'bot',
            text: 'Olá! Sou a Mafalda Silva, consultora de triagem executiva de Alex Seles.',
            time: timeNow,
          }
        ]);

        const timer2 = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: 'm-2',
              sender: 'bot',
              text: 'Para realizarmos o diagnóstico com método SPIN Selling, procura mentoria individual de carreira ou soluções corporativas para a sua empresa?',
              time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
          setIsTyping(false);
          setStep(0); // Aguarda escolha: Profissionais vs Empresas
        }, 900);

        return () => clearTimeout(timer2);
      }, 700);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  // Disparo centralizado para Backoffice, n8n (Trello & Excel) e FormSubmit
  const dispatchLeadSubmission = async (completedData, allMessages, diagnosticoTexto) => {
    const isEmpresa = completedData.perfil === 'empresa';
    const cleanNome = sanitizeText(completedData.nome) || (isEmpresa ? 'Representante Corporativo' : 'Candidato Triagem');
    const cleanEmpresa = sanitizeText(completedData.empresa) || (isEmpresa ? 'Empresa Não Informada' : 'N/A');
    const cleanCargo = sanitizeText(completedData.cargo) || (isEmpresa ? 'Gestor de Tecnologia' : 'Profissional TI');
    const cleanDesafio = sanitizeText(completedData.desafio) || 'Não informado';
    const cleanImplicacao = sanitizeText(completedData.implicacao) || 'Não informado';
    const cleanComercial = sanitizeText(completedData.momentoComercial) || 'Preparado para investir';
    const cleanTelefone = sanitizeText(completedData.telefone) || 'Não informado';
    const cleanEmail = sanitizeText(completedData.email) || 'Não informado';
    const cleanLinkedin = sanitizeText(completedData.linkedin) || 'Não informado';
    const cleanDiagnostico = sanitizeText(completedData.diagnosticoSugerido) || diagnosticoTexto || 'Diagnóstico Estratégico';

    const isCurioso = cleanComercial.toLowerCase().includes('curioso') || cleanComercial.toLowerCase().includes('gratuito') || cleanComercial.toLowerCase().includes('preliminar');
    const trelloStatus = !isCurioso ? 'Qualificado' : 'Leads';

    // 1. Gravação no Supabase / Backoffice
    try {
      await addContact({
        tipo: isEmpresa ? 'empresa' : 'whatsapp_web',
        nome: isEmpresa ? `${cleanNome} (${cleanEmpresa})`.slice(0, 100) : cleanNome.slice(0, 100),
        contato: `${cleanEmail.slice(0, 80)} • ${cleanTelefone.slice(0, 30)}`,
        origem: `Chat Mafalda • SPIN Selling ${isEmpresa ? 'B2B (Empresas)' : 'Profissionais'}`,
        modulo: cleanDiagnostico.slice(0, 120),
        investimento: cleanComercial,
        horas: isEmpresa ? `Equipa: ${completedData.dimensaoEquipa || 'B2B'}` : 'Mentoria Individual',
        tipoSolicitacao: isEmpresa ? 'Diagnóstico Corporativo - Chat Mafalda' : 'Plano de Ação - Chat Mafalda',
        mensagem: `[SPIN SELLING • ${isEmpresa ? 'DIAGNÓSTICO B2B' : 'PRÉ-QUALIFICAÇÃO PROFISSIONAL'} • Coluna: ${trelloStatus}]\n` +
          `Perfil: ${isEmpresa ? 'Empresas & B2B' : 'Profissionais'}\n` +
          `Nome: ${cleanNome}\n` +
          `${isEmpresa ? `Empresa: ${cleanEmpresa}\nDimensão da Equipa: ${completedData.dimensaoEquipa || 'N/A'}\n` : `Experiência: ${completedData.experiencia || 'N/A'}\n`}` +
          `Cargo/Função: ${cleanCargo}\n` +
          `Problema/Dor: ${cleanDesafio}\n` +
          `Impacto/Implicação: ${cleanImplicacao}\n` +
          `Decisão Comercial: ${cleanComercial}\n` +
          `Diagnóstico Recomendado: ${cleanDiagnostico}\n` +
          `WhatsApp: ${cleanTelefone}\n` +
          `E-mail: ${cleanEmail}\n` +
          `LinkedIn/Site: ${cleanLinkedin}\n\n` +
          `[TRANSCRIÇÃO]:\n${allMessages.map(m => `${m.sender.toUpperCase()} (${m.time}): ${m.text}`).join('\n')}`,
        status: trelloStatus
      });
    } catch (e) {
      console.warn('Registo no Backoffice:', e);
    }

    // 2. Disparo para o Webhook n8n (Trello, Google Sheets / Excel no Drive)
    try {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          nome: cleanNome,
          empresa: cleanEmpresa,
          cargo: cleanCargo,
          email: cleanEmail,
          telefone: cleanTelefone,
          perfil: completedData.perfil,
          isEmpresa: isEmpresa,
          tipoSolicitacao: isEmpresa ? 'Diagnóstico Corporativo B2B - Chat Mafalda' : 'Plano de Ação - Chat Mafalda',
          modulo: cleanDiagnostico,
          investimento: cleanComercial,
          horas: isEmpresa ? `Equipa: ${completedData.dimensaoEquipa || 'B2B'}` : 'Mentoria Individual',
          objetivo: `SPIN Selling [${trelloStatus}]: ${cleanDiagnostico}`,
          desafio: `${cleanDesafio} | Implicação: ${cleanImplicacao}`,
          slotAgendamento: isEmpresa ? 'Reunião Diagnóstica B2B (30 min)' : 'Sessão Diagnóstica Individual',
          canal: `Chat Mafalda (${isEmpresa ? 'Empresas' : 'Profissionais'})`,
          status: trelloStatus,
          colunaTrello: trelloStatus,
          trelloList: trelloStatus,
          isQualificado: trelloStatus === 'Qualificado'
        })
      });
    } catch (n8nErr) {
      console.warn('Falha no webhook n8n:', n8nErr);
    }

    // 3. Disparo de e-mail via FormSubmit para contato@alexseles.online
    try {
      const payload = {
        'Tipo': isEmpresa ? 'Diagnóstico Corporativo B2B (Chat Mafalda)' : 'Pré-Qualificação de Carreira (Chat Mafalda)',
        'Status': trelloStatus.toUpperCase(),
        'Nome do Responsável': cleanNome,
        'Perfil': isEmpresa ? 'Empresa / B2B' : 'Profissional / Carreira Individual',
        'Empresa': isEmpresa ? cleanEmpresa : 'N/A',
        'Cargo / Função': cleanCargo,
        'Dimensão da Equipa / Exp': isEmpresa ? completedData.dimensaoEquipa : completedData.experiencia,
        'Principal Desafio (P)': cleanDesafio,
        'Impacto / Implicação (I)': cleanImplicacao,
        'Prontidão Orçamental / Momento (N)': cleanComercial,
        'Diagnóstico Recomendado': cleanDiagnostico,
        'WhatsApp': cleanTelefone,
        'E-mail': cleanEmail,
        'LinkedIn / Web': cleanLinkedin,
        '_subject': `[${trelloStatus.toUpperCase()}] ${isEmpresa ? 'Diagnóstico B2B' : 'Lead Mentoria'} (Chat Mafalda): ${cleanNome} ${isEmpresa ? `(${cleanEmpresa})` : `(${cleanCargo})`}`,
        '_template': 'table',
        '_captcha': 'false'
      };

      await fetch('https://formsubmit.co/ajax/contato@alexseles.online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Falha no FormSubmit:', err);
    }
  };

  // Gerador do Diagnóstico Final Estratégico Bem Tratado
  const calcularDiagnostico = (data) => {
    const isEmpresa = data.perfil === 'empresa';
    const desafio = (data.desafio || '').toLowerCase();

    if (isEmpresa) {
      if (desafio.includes('onboarding') || desafio.includes('junior') || desafio.includes('formação')) {
        return 'Programa In-Company de Aceleração Técnica & Up-skilling de Desenvolvedores';
      } else if (desafio.includes('ia') || desafio.includes('inteligência') || desafio.includes('automação') || desafio.includes('sdlc')) {
        return 'Consultoria de Engenharia Assistida por IA & Modernização do Ciclo SDLC';
      } else if (desafio.includes('previsibilidade') || desafio.includes('atras') || desafio.includes('agile') || desafio.includes('scrum')) {
        return 'Governação Ágil, Previsibilidade de Entregas & Métricas DORA (SAFe / Scrum / ITIL)';
      } else {
        return 'Mentoria Executiva para Tech Leads & Estruturação de Equipas de TI';
      }
    } else {
      if (desafio.includes('transição') || desafio.includes('rumo') || desafio.includes('iniciando')) {
        return 'Trilha Completa de Transição de Carreira para TI (SDLC & IA Aplicada)';
      } else if (desafio.includes('ats') || desafio.includes('currículo') || desafio.includes('mercado')) {
        return 'Posicionamento Estratégico no Mercado — ATS, LinkedIn & Autoridade Profissional';
      } else if (desafio.includes('internacional') || desafio.includes('propostas')) {
        return 'Mentoria de Carreira Internacional em Tecnologia & Certificações Executivas';
      } else {
        return 'Governação, Produto & Métodos de Entrega em TI (Módulo Especializado)';
      }
    }
  };

  const handleSend = (customText = null) => {
    const rawText = (customText || inputText).trim();
    if (!rawText) return;

    if (detectSecurityThreat(rawText)) {
      const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, sender: 'user', text: rawText.slice(0, 80) + '...', time: timeNow },
        { id: `b-${Date.now()}`, sender: 'bot', text: 'Aviso de Segurança: Entrada inválida detetada. Por favor, forneça informações profissionais válidas.', time: timeNow }
      ]);
      setInputText('');
      return;
    }

    const textToSend = sanitizeText(rawText);
    const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: timeNow,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let nextStep = step;
      let updatedLead = { ...leadData };
      const lower = textToSend.toLowerCase();

      // Intercalações de perguntas frequentes
      if (lower.includes('quem é o alex') || lower.includes('quem e alex') || lower.includes('sobre o alex')) {
        botResponse = 'Alex Seles é Engenheiro Informático e Mestre, com mais de 20 anos de experiência internacional em inovação e governança (PMP®, SAFe® 6, ITIL® 4, PSM II™), tendo liderado grandes programas em multinacionais e entidades públicas (ARTE, IEFP, Segurança Social).';
        nextStep = step;
      } else if (lower.includes('quanto custa') || lower.includes('preço') || lower.includes('valor')) {
        botResponse = 'O investimento é calibrado de acordo com as necessidades específicas, sejam para mentoria individual ou capacitação de equipas empresariais. Vamos concluir o diagnóstico para identificar o plano ideal?';
        nextStep = step;
      } else if (step === 0) {
        // Passo 0: Escolha de Perfil (Profissionais vs Empresas)
        const isEmp = lower.includes('empresa') || lower.includes('corporativ') || lower.includes('minha empresa') || lower.includes('b2b') || lower.includes('equipa');
        updatedLead.perfil = isEmp ? 'empresa' : 'profissional';
        setLeadData(updatedLead);

        if (isEmp) {
          botResponse = 'Excelente! Atendemos organizações que procuram acelerar o ciclo SDLC, capacitar equipas e implementar IA com segurança.\n\nPara iniciarmos o diagnóstico corporativo, qual é o seu nome e a denominação da sua empresa?';
        } else {
          botResponse = 'Excelente! A mentoria individual de Alex Seles é desenhada para acelerar transições seguras para TI e posicionamento em cargos seniores.\n\nPara iniciarmos o seu diagnóstico individual, qual é o seu primeiro nome?';
        }
        nextStep = 1; // Aguarda Nome / Empresa
      } else if (step === 1) {
        // Passo 1: Recebe Nome (e Empresa se B2B)
        const cleanVal = textToSend.replace(/^(eu sou o|meu nome é|sou o|sou a|eu sou a)\s*/i, '').trim();
        if (updatedLead.perfil === 'empresa') {
          updatedLead.nome = cleanVal;
          updatedLead.empresa = cleanVal;
          botResponse = `Prazer, ${cleanVal}! Qual é o seu cargo atual e a dimensão aproximada da sua equipa de tecnologia?`;
        } else {
          updatedLead.nome = cleanVal;
          botResponse = `Prazer, ${cleanVal}! Qual é o seu cargo atual ou área de formação, e quantos anos de experiência tem no mercado?`;
        }
        setLeadData(updatedLead);
        nextStep = 2; // Aguarda Situação
      } else if (step === 2) {
        // Passo 2: S - Situação
        if (updatedLead.perfil === 'empresa') {
          updatedLead.dimensaoEquipa = textToSend;
          updatedLead.cargo = textToSend;
          botResponse = 'Perfeito. E qual é o principal gargalo técnico ou desafio operacional que a sua organização pretende solucionar prioritariamente?';
        } else {
          updatedLead.cargo = textToSend;
          updatedLead.experiencia = textToSend;
          botResponse = 'Entendido. E qual tem sido o seu principal obstáculo ou dor para atingir o seu próximo patamar profissional ou realizar a sua transição para TI?';
        }
        setLeadData(updatedLead);
        nextStep = 3; // Aguarda Problema
      } else if (step === 3) {
        // Passo 3: P - Problema
        updatedLead.desafio = textToSend;
        setLeadData(updatedLead);

        if (updatedLead.perfil === 'empresa') {
          botResponse = `Compreendo perfeitamente, ${updatedLead.nome || 'gestor'}.\n\nQual tem sido a implicação desse desafio nos prazos de entrega de projetos, no time-to-market e na sobrecarga dos profissionais seniores da sua equipa?`;
        } else {
          botResponse = `Compreendo perfeitamente, ${updatedLead.nome || 'caro colega'}.\n\nHá quanto tempo tem enfrentado essa dificuldade sozinho, e qual o impacto disso na sua evolução salarial e crescimento profissional?`;
        }
        nextStep = 4; // Aguarda Implicação
      } else if (step === 4) {
        // Passo 4: I - Implicação
        updatedLead.implicacao = textToSend;
        setLeadData(updatedLead);

        if (updatedLead.perfil === 'empresa') {
          botResponse = 'As soluções corporativas de Alex Seles são personalizadas para a realidade da organização. Qual é o momento orçamental da empresa para iniciar a intervenção estratégica?';
        } else {
          botResponse = 'A mentoria de Alex Seles é individual, estratégica e com vagas limitadas por trimestre. Qual é a sua disponibilidade de investimento hoje?';
        }
        nextStep = 5; // Aguarda Momento Comercial / Orçamento
      } else if (step === 5) {
        // Passo 5: N - Necessidade & Decisão Comercial
        updatedLead.momentoComercial = textToSend;
        setLeadData(updatedLead);

        const isCurious = lower.includes('gratuito') || lower.includes('grátis') || lower.includes('apenas') || lower.includes('sem dinheiro') || lower.includes('não quero pagar');

        if (isCurious && updatedLead.perfil === 'profissional') {
          botResponse = `Compreendo, ${updatedLead.nome || 'caro colega'}.\n\nA mentoria de Alex Seles é um programa individual com acompanhamento exclusivo e investimento dedicado.\n\nPara o seu momento atual, recomendamos consultar os artigos e tutoriais gratuitos na nossa Central de Conhecimento oficial:\n• https://www.alexseles.online/central-de-conhecimento\n\nDesejamos-lhe muito sucesso!`;
          nextStep = 8;
        } else {
          botResponse = `Excelente, ${updatedLead.nome || 'caro colega'}. O perfil reúne os critérios para análise e enquadramento direto com Alex Seles.\n\nQual é o seu número de telemóvel com WhatsApp (com indicativo do país, ex.: +351 ou +55) para envio das orientações preliminares?`;
          nextStep = 6; // Aguarda WhatsApp
        }
      } else if (step === 6) {
        // Passo 6: Contacto WhatsApp
        updatedLead.telefone = textToSend;
        setLeadData(updatedLead);

        if (updatedLead.perfil === 'empresa') {
          botResponse = 'Muito bem. Por fim, qual é o seu e-mail corporativo e o website ou LinkedIn da sua empresa para envio do diagnóstico preliminar?';
        } else {
          botResponse = 'Muito bem. Por fim, qual é o seu e-mail profissional e o link do seu perfil no LinkedIn para validação do seu perfil?';
        }
        nextStep = 7; // Aguarda LinkedIn & E-mail
      } else if (step === 7) {
        // Passo 7: Finalização com Diagnóstico Final Bem Tratado
        const emailMatch = textToSend.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        updatedLead.email = emailMatch ? emailMatch[0] : textToSend;
        updatedLead.linkedin = textToSend;

        const diagnosticoCalculado = calcularDiagnostico(updatedLead);
        updatedLead.diagnosticoSugerido = diagnosticoCalculado;
        setLeadData(updatedLead);

        if (updatedLead.perfil === 'empresa') {
          botResponse = `✅ DIAGNÓSTICO CORPORATIVO B2B CONCLUÍDO!\n\n` +
            `• Responsável: ${updatedLead.nome}\n` +
            `• Desafio Identificado: ${updatedLead.desafio}\n` +
            `• Implicação Mitigada: ${updatedLead.implicacao}\n` +
            `• ROTA CORPORATIVA RECOMENDADA: ${diagnosticoCalculado}\n\n` +
            `Os dados foram submetidos diretamente a Alex Seles com total confidencialidade nos termos do RGPD. Entraremos em contacto pelo WhatsApp indicado para agendamento de uma sessão executiva de 30 minutos.\n\n` +
            `Muito obrigada pela confiança!`;
        } else {
          botResponse = `✅ DIAGNÓSTICO EXECUTIVO DE CARREIRA CONCLUÍDO!\n\n` +
            `• Profissional: ${updatedLead.nome}\n` +
            `• Perfil Analisado: ${updatedLead.cargo}\n` +
            `• Dor Identificada: ${updatedLead.desafio}\n` +
            `• TRILHA DE MENTORIA RECOMENDADA: ${diagnosticoCalculado}\n\n` +
            `As suas metas foram enviadas diretamente a Alex Seles. A sua pré-qualificação confidencial foi validada e entraremos em contacto consigo pelo WhatsApp em até 48 horas úteis.\n\n` +
            `Obrigada pelo seu tempo e dedicação!`;
        }

        nextStep = 8; // Concluído

        // Dispara integrações completas (Backoffice, n8n webhook e FormSubmit)
        dispatchLeadSubmission(
          updatedLead,
          [...updatedMessages, { id: `b-${Date.now()}`, sender: 'bot', text: botResponse, time: timeNow }],
          diagnosticoCalculado
        );
      } else {
        botResponse = 'As suas informações já se encontram em análise com Alex Seles. Em breve receberá o contacto direto pelo WhatsApp indicado. Tenha um excelente dia!';
        nextStep = 8;
      }

      setStep(nextStep);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getInputPlaceholder = () => {
    switch (step) {
      case 0:
        return 'Selecione uma opção acima...';
      case 1:
        return leadData.perfil === 'empresa' ? 'O seu nome e nome da empresa...' : 'O seu primeiro nome...';
      case 2:
        return leadData.perfil === 'empresa' ? 'Ex: Tech Lead (12 engenheiros)...' : 'Ex: Desenvolvedor Pleno (4 anos)...';
      case 3:
        return 'Selecione ou descreva o principal desafio...';
      case 4:
        return 'Descreva o impacto ou selecione acima...';
      case 5:
        return 'Selecione o momento comercial acima...';
      case 6:
        return 'Ex: +351 912 345 678 (WhatsApp)...';
      case 7:
        return 'O seu e-mail e LinkedIn...';
      default:
        return 'Escrever mensagem...';
    }
  };

  // Botão direto para o WhatsApp oficial com Alex Seles ao concluir o diagnóstico
  const getWhatsAppDirectLink = () => {
    const isEmpresa = leadData.perfil === 'empresa';
    const text = encodeURIComponent(
      isEmpresa
        ? `Olá Alex Seles, realizei o diagnóstico corporativo com a Mafalda para a minha empresa.\n\n*Nome:* ${leadData.nome}\n*Solução Recomendada:* ${leadData.diagnosticoSugerido}\n*WhatsApp:* ${leadData.telefone}\n\nGostaria de agendar a sessão diagnóstica de 30 minutos.`
        : `Olá Alex Seles, concluí o meu diagnóstico de carreira com a Mafalda.\n\n*Nome:* ${leadData.nome}\n*Trilha Recomendada:* ${leadData.diagnosticoSugerido}\n*WhatsApp:* ${leadData.telefone}\n\nGostaria de agendar a sessão individual.`
    );
    return `https://wa.me/351912405814?text=${text}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[620px] max-h-[88vh] bg-[#EFEAE2] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#D1D7DB] animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans"
      role="dialog"
      aria-label="Chat Mafalda Silva - Triagem Executiva SPIN Selling"
    >
      {/* Cabeçalho Oficial WhatsApp Web */}
      <div className="bg-[#F0F2F5] text-[#111B21] px-4 py-2.5 flex items-center justify-between border-b border-[#E9EDEF] shadow-xs select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={mafaldaImg} 
              alt="Mafalda Silva" 
              className="w-10 h-10 rounded-full object-cover border border-black/10" 
            />
            <span 
              className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"
              title="Online"
            />
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#111B21] leading-tight flex items-center gap-1.5">
              <span>Mafalda Silva</span>
              <i className="fa-solid fa-circle-check text-[11px] text-[#00A884]" title="Verificada" />
            </h3>
            <p className="text-[12px] text-[#667781] font-normal leading-none mt-0.5">
              {isTyping ? (
                <span className="text-[#008069] font-medium animate-pulse">a escrever...</span>
              ) : (
                'Consultora de Triagem • Alex Seles'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#54656F]">
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none ml-0.5 cursor-pointer"
            title="Fechar chat"
            aria-label="Fechar"
          >
            <i className="fa-solid fa-xmark text-lg text-[#54656F]" />
          </button>
        </div>
      </div>

      {/* Corpo da Conversa */}
      <div 
        className="flex-1 overflow-y-auto p-3.5 space-y-2.5 relative"
        style={{
          backgroundColor: '#EFEAE2',
          backgroundImage: `url(${whatsappLightBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '380px 380px',
        }}
      >
        <div className="flex justify-center my-1.5">
          <span className="bg-white text-[#54656F] text-[11.5px] font-medium px-3.5 py-1 rounded-lg shadow-xs border border-black/5 select-none">
            Hoje • SPIN Selling & Diagnóstico
          </span>
        </div>

        <div className="flex justify-center my-1.5">
          <div className="bg-[#FFEECD] border border-[#FFE082]/40 text-[#54656F] text-[11px] leading-relaxed text-center px-4 py-2 rounded-lg max-w-[94%] shadow-xs flex items-center justify-center gap-1.5 select-none">
            <i className="fa-solid fa-shield-halved text-[10px] text-[#54656F] shrink-0" />
            <span>Diagnóstico confidencial para Profissionais e Empresas com proteção de dados (RGPD).</span>
          </div>
        </div>

        {/* Lista de Mensagens */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-xs break-words ${
                m.sender === 'user'
                  ? 'bg-[#D9FDD3] text-[#111B21] rounded-lg rounded-tr-none'
                  : 'bg-white text-[#111B21] rounded-lg rounded-tl-none border border-black/5'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              
              <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-[#667781] select-none">
                <span>{m.time}</span>
                {m.sender === 'user' && (
                  <i className="fa-solid fa-check-double text-[11px] text-[#53BDEB]" aria-label="Lido" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start">
            <div className="bg-white text-[#111B21] rounded-lg rounded-tl-none px-4 py-3 shadow-xs border border-black/5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce" />
            </div>
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 0 (Profissionais vs Empresas) */}
        {!isTyping && step === 0 && (
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => handleSend('Para Mim (Profissional)')}
              className="text-xs text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#00A884] transition-all shadow-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <span>Para Mim (Profissional — Mentoria Individual)</span>
              <span>→</span>
            </button>
            <button
              onClick={() => handleSend('Para a Minha Empresa')}
              className="text-xs text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#00A884] transition-all shadow-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <span>Para a Minha Empresa (Capacitação, SDLC & IA)</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 2 (Situação) */}
        {!isTyping && step === 2 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(leadData.perfil === 'empresa'
              ? [
                  'Equipa até 5 engenheiros',
                  '6 a 15 engenheiros',
                  '16 a 40 engenheiros',
                  'Mais de 40 engenheiros'
                ]
              : [
                  'Engenharia / Dev (+5 anos)',
                  'Gestão de Projetos / Scrum',
                  'Transição para TI (Outra área)',
                  'Liderança / Tech Lead'
                ]
            ).map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all shadow-xs font-medium cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 3 (Problema / Desafio) */}
        {!isTyping && step === 3 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(leadData.perfil === 'empresa'
              ? [
                  'Onboarding lento de juniores',
                  'Adoção de IA no SDLC sem método',
                  'Entregas sem previsibilidade (Agile)',
                  'Formação e retenção de Tech Leads'
                ]
              : [
                  'Currículo barrado por robôs ATS',
                  'Falta de propostas internacionais',
                  'Transição de carreira sem rumo claro',
                  'Salário estagnado no mercado'
                ]
            ).map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all shadow-xs font-medium cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 4 (Implicação) */}
        {!isTyping && step === 4 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(leadData.perfil === 'empresa'
              ? [
                  'Atrasos constantes em lançamentos',
                  'Seniores sobrecarregados com dúvidas',
                  'Défice de inovação frente ao mercado',
                  'Elevado custo com rotatividade (turnover)'
                ]
              : [
                  'Mais de 6 meses sem evolução',
                  'Tentando há mais de 1 ano sozinho',
                  'Iniciando agora a busca'
                ]
            ).map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all shadow-xs font-medium cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 5 (Necessidade & Decisão Comercial) */}
        {!isTyping && step === 5 && (
          <div className="flex flex-col gap-1.5 pt-1">
            {(leadData.perfil === 'empresa'
              ? [
                  'Orçamento aprovado para este trimestre',
                  'A validar proposta executiva',
                  'Apenas pesquisa preliminar de mercado'
                ]
              : [
                  'Preparado para investir na aceleração individual',
                  'Quero conhecer formatos e condições',
                  'Apenas conteúdos gratuitos no momento'
                ]
            ).map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className={`text-xs text-left px-3.5 py-2 rounded-xl transition-all shadow-xs font-medium border cursor-pointer ${
                  chip.includes('conteúdos gratuitos') || chip.includes('preliminar')
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-white hover:bg-[#D9FDD3] text-[#111B21] border-[#D1D7DB] hover:border-[#00A884]'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Botão de Ação Direta no WhatsApp no Passo 8 (Concluído) */}
        {step === 8 && (
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={getWhatsAppDirectLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-base" />
              <span>Avisar Alex Seles no WhatsApp Agora</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-medium py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Fechar Janela
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Barra Inferior de Entrada de Texto */}
      <div className="bg-[#F0F2F5] px-3 py-2 flex items-center gap-2 border-t border-[#E9EDEF] shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getInputPlaceholder()}
          disabled={step === 8}
          className="flex-1 bg-white text-[#111B21] placeholder-[#8696A0] text-sm px-4 py-2.5 rounded-lg border border-transparent focus:outline-none focus:ring-1 focus:ring-[#00A884] shadow-xs disabled:opacity-50"
        />

        {inputText.trim() ? (
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={step === 8}
            className="w-9 h-9 rounded-full bg-[#00A884] hover:bg-[#008069] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shrink-0 focus:outline-none shadow-xs disabled:opacity-50 cursor-pointer"
            title="Enviar mensagem"
            aria-label="Enviar"
          >
            <i className="fa-solid fa-paper-plane text-xs translate-x-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSend(step === 0 ? 'Para Mim (Profissional)' : 'Olá')}
            disabled={step === 8}
            className="text-[#54656F] hover:text-[#111B21] p-1.5 transition-colors focus:outline-none shrink-0 disabled:opacity-50 cursor-pointer"
            title="Avançar"
            aria-label="Avançar"
          >
            <i className="fa-solid fa-paper-plane text-base" />
          </button>
        )}
      </div>
    </div>
  );
};
