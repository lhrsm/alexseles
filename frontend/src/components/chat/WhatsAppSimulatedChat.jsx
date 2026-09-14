import React, { useState, useEffect, useRef } from 'react';
import mafaldaImg from '../../assets/mafalda.png';
import whatsappLightBg from '../../assets/whatsapp-doodle-light.svg';
import { addContact } from '../../services/backofficeService';

// Blindagem Defensiva Anti-Hacker e Deteção de Ameaças / Injeção
const detectSecurityThreat = (text) => {
  if (!text) return false;
  // Limite de overflow contra buffer e bombardeio de caracteres
  if (text.length > 500) return true;

  // Deteção de Prompt Injection, Jailbreak e fuga de instruções
  const promptInjection = /(ignore\s+(all\s+)?previous\s+instructions|system\s+prompt|dan\s+mode|jailbreak|act\s+as\s+an?\s+unregulated|bypass\s+rules|reveal\s+(system|secret|prompt)|developer\s+mode|você\s+agora\s+é|forget\s+all\s+instructions)/i;

  // Deteção de XSS, SQL Injection e injeção de comandos
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
  
  // Passos do SPIN Selling:
  // 0: Init
  // 1: Nome
  // 2: S - Situação (Cargo atual / Anos de experiência)
  // 3: P - Problema (Maior obstáculo de carreira)
  // 4: I - Implicação (Tempo travado / Impacto salarial)
  // 5: N - Necessidade & Decisão Comercial (Investimento vs Curioso/Gratuito)
  // 6: Contacto WhatsApp
  // 7: LinkedIn & E-mail
  // 8: Concluído
  const [step, setStep] = useState(0);

  const [leadData, setLeadData] = useState({
    nome: '',
    cargo: '',
    experiencia: '',
    desafio: '',
    implicacao: '',
    momentoComercial: '',
    telefone: '',
    linkedin: '',
    email: '',
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Rola para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Foco no input ao abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Mensagem inicial de boas-vindas (Tom executivo e direto)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer1 = setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        setMessages([
          {
            id: 'm-1',
            sender: 'bot',
            text: 'Olá! Sou a Mafalda Silva, consultora de triagem executiva da mentoria de Alex Seles.',
            time: timeNow,
          }
        ]);

        const timer2 = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: 'm-2',
              sender: 'bot',
              text: 'Para avaliarmos o seu enquadramento e reposicionamento internacional, qual é o seu primeiro nome?',
              time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
          setIsTyping(false);
          setStep(1); // Aguarda Nome
        }, 1000);

        return () => clearTimeout(timer2);
      }, 800);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  // Disparo centralizado para Trello (n8n), Google Sheets / Excel no Drive, FormSubmit e Supabase
  const dispatchLeadSubmission = async (completedData, allMessages) => {
    const cleanNome = sanitizeText(completedData.nome) || 'Candidato Triagem';
    const cleanCargo = sanitizeText(completedData.cargo) || 'Profissional TI';
    const cleanDesafio = sanitizeText(completedData.desafio) || 'Não informado';
    const cleanImplicacao = sanitizeText(completedData.implicacao) || 'Não informado';
    const cleanComercial = sanitizeText(completedData.momentoComercial) || 'Preparado para investir';
    const cleanTelefone = sanitizeText(completedData.telefone) || 'Não informado';
    const cleanEmail = sanitizeText(completedData.email) || 'Não informado';
    const cleanLinkedin = sanitizeText(completedData.linkedin) || 'Não informado';

    const isQualificado = !cleanComercial.toLowerCase().includes('curioso') && !cleanComercial.toLowerCase().includes('apenas') && (cleanComercial.toLowerCase().includes('investir') || cleanComercial.toLowerCase().includes('avaliar') || cleanComercial.toLowerCase().includes('imediatamente'));
    const trelloStatus = isQualificado ? 'Qualificado' : 'Leads';

    // 1. Gravação no Supabase e Backoffice
    try {
      await addContact({
        tipo: 'whatsapp_web',
        nome: cleanNome.slice(0, 100),
        contato: `${cleanEmail.slice(0, 80)} • ${cleanTelefone.slice(0, 30)}`,
        origem: `Chat Mafalda • SPIN Selling (${cleanCargo})`,
        modulo: `Mentoria Executiva (${cleanCargo})`,
        investimento: cleanComercial,
        horas: 'Diagnóstico de Carreira',
        tipoSolicitacao: 'Plano de Ação - Chat Mafalda',
        mensagem: `[SPIN SELLING - PRÉ-QUALIFICAÇÃO EXECUTIVA • Coluna: ${trelloStatus}]\nNome: ${cleanNome}\nCargo: ${cleanCargo}\nExperiência: ${completedData.experiencia || 'TI'}\nProblema/Desafio: ${cleanDesafio}\nImplicação: ${cleanImplicacao}\nDecisão Comercial: ${cleanComercial}\nLinkedIn: ${cleanLinkedin}\nWhatsApp: ${cleanTelefone}\nE-mail: ${cleanEmail}\n\n[TRANSCRIÇÃO CHAT]:\n${allMessages.map(m => `${m.sender.toUpperCase()} (${m.time}): ${m.text}`).join('\n')}`,
        status: trelloStatus
      });
    } catch (e) {
      console.warn('Registo local no Backoffice efetuado:', e);
    }

    // 2. Disparo para o Webhook n8n (Criação de Cartão no Trello com Checklist do Plano de Ação & Registo em Google Sheets / Excel no Drive)
    try {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: cleanNome,
          email: cleanEmail,
          telefone: cleanTelefone,
          cidade: 'Não informado',
          tipoSolicitacao: 'Plano de Ação - Chat Mafalda',
          modulo: `Mentoria Executiva • ${cleanCargo}`,
          investimento: cleanComercial,
          horas: 'Diagnóstico de Carreira',
          objetivo: `Plano de Ação [${trelloStatus}]: SPIN Selling (${cleanCargo})`,
          desafio: `${cleanDesafio} | Implicação: ${cleanImplicacao}`,
          slotAgendamento: 'Sessão Diagnóstica (A agendar)',
          startISO: new Date().toISOString(),
          endISO: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          canal: 'Chat Mafalda (SPIN Selling)',
          status: trelloStatus,
          colunaTrello: trelloStatus,
          trelloList: trelloStatus,
          isQualificado: isQualificado,
          resumoPerfil: `${cleanNome}, ${cleanCargo} • Exp: ${completedData.experiencia || 'TI'} • Momento: ${cleanComercial} • Desafio: ${cleanDesafio}`
        })
      });
    } catch (n8nErr) {
      console.warn('n8n indisponível:', n8nErr);
    }

    // 3. Disparo de e-mail via FormSubmit diretamente para contato@alexseles.online
    try {
      const payload = {
        'Notificação': 'Há novos leads em Plano de Ação aguardando contacto executivo.',
        'Status Trello': `${trelloStatus.toUpperCase()} (Encaminhado para a coluna ${trelloStatus})`,
        'Resumo Executivo': `${cleanNome} | ${cleanCargo} | Exp: ${completedData.experiencia || 'TI'} | Decisão: ${cleanComercial}`,
        'Nome do Candidato': cleanNome,
        'Cargo e Área': cleanCargo,
        'Tempo de Experiência': completedData.experiencia || 'Não informado',
        'Maior Desafio / Dor': cleanDesafio,
        'Impacto / Implicação': cleanImplicacao,
        'Momento Comercial & Investimento': cleanComercial,
        'Telemóvel (WhatsApp)': cleanTelefone,
        'LinkedIn': cleanLinkedin,
        'E-mail': cleanEmail,
        'Canal de Origem': 'Chat Mafalda (SPIN Selling • Pré-Qualificação)',
        'Data e Hora': new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' }),
        '_subject': `[${trelloStatus.toUpperCase()}] Lead em Plano de Ação (Chat): ${cleanNome} (${cleanCargo})`,
        '_template': 'table',
        '_captcha': 'false'
      };

      await fetch('https://formsubmit.co/ajax/contato@alexseles.online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Erro no FormSubmit:', err);
    }
  };

  // Processa as respostas do utilizador
  const handleSend = (customText = null) => {
    const rawText = (customText || inputText).trim();
    if (!rawText) return;

    // Blindagem Anti-Hacker
    if (detectSecurityThreat(rawText)) {
      const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
      const userSecurityMsg = {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: rawText.slice(0, 80) + '...',
        time: timeNow,
      };
      const botDefenseMsg = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: 'Aviso de Segurança: Entrada inválida ou potencialmente maliciosa detetada pelo sistema de conformidade. Por favor, utilize informações profissionais válidas para dar seguimento à triagem executiva.',
        time: timeNow,
      };
      setMessages((prev) => [...prev, userSecurityMsg, botDefenseMsg]);
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

      // Intercalações informativas sóbrias
      if (lower.includes('quem é o alex') || lower.includes('quem e alex') || lower.includes('sobre o alex')) {
        botResponse = 'Alex Seles é Engenheiro Informático com mais de 20 anos de experiência internacional e certificações executivas (PMP®, SAFe®, ITIL®, PSM II™), mentorando líderes e especialistas de TI em reposicionamento.';
        nextStep = step;
      } else if (lower.includes('quanto custa') || lower.includes('qual o preço') || lower.includes('valor')) {
        botResponse = 'A mentoria é individual e personalizada. O investimento depende do diagnóstico das suas metas. Vamos concluir a sua qualificação para verificar se há vaga disponível no seu perfil?';
        nextStep = step;
      } else if (step === 1) {
        // Recebeu Nome -> Pergunta Situação (Cargo & Experiência)
        const cleanName = textToSend.replace(/^(eu sou o|meu nome é|sou o|sou a|eu sou a)\s*/i, '').trim();
        updatedLead.nome = cleanName;
        setLeadData(updatedLead);
        botResponse = `Prazer, ${cleanName}! Qual é o seu cargo atual ou área de atuação, e quantos anos de experiência tem no mercado?`;
        nextStep = 2; // Aguarda Situação
      } else if (step === 2) {
        // Recebeu Situação -> Pergunta Problema (Maior Desafio)
        updatedLead.cargo = textToSend;
        updatedLead.experiencia = textToSend;
        setLeadData(updatedLead);
        botResponse = 'Entendido. E qual tem sido o seu principal obstáculo ou dor para atingir o seu próximo patamar profissional ou internacional?';
        nextStep = 3; // Aguarda Problema
      } else if (step === 3) {
        // Recebeu Problema -> Pergunta Implicação
        updatedLead.desafio = textToSend;
        setLeadData(updatedLead);
        botResponse = `Compreendo, ${updatedLead.nome || 'caro colega'}. E há quanto tempo tem enfrentado essa dificuldade sozinho, e qual o impacto disso na sua renda e evolução de carreira?`;
        nextStep = 4; // Aguarda Implicação
      } else if (step === 4) {
        // Recebeu Implicação -> Pergunta Necessidade & Decisão Comercial (Filtro Anti-Curiosos)
        updatedLead.implicacao = textToSend;
        setLeadData(updatedLead);
        botResponse = 'Para destravar esse patamar com o método individual de Alex Seles, as vagas são limitadas e exigem dedicação mútua. Qual é a sua disponibilidade de investimento hoje?';
        nextStep = 5; // Aguarda Momento Comercial
      } else if (step === 5) {
        // Recebeu Momento Comercial: Triagem de Curiosos
        updatedLead.momentoComercial = textToSend;
        setLeadData(updatedLead);

        const isCurious =
          lower.includes('gratuito') ||
          lower.includes('grátis') ||
          lower.includes('gratis') ||
          lower.includes('apenas') ||
          lower.includes('sem dinheiro') ||
          lower.includes('não quero pagar') ||
          lower.includes('nao quero pagar') ||
          lower.includes('livre');

        if (isCurious) {
          // Curioso / Sem disponibilidade financeira -> Direcionar respeitosamente para a Central de Conhecimento
          botResponse = `Compreendo perfeitamente, ${updatedLead.nome || 'caro colega'}.\n\nA mentoria de Alex Seles é um programa executivo individual e com investimento dedicado.\n\nPara o seu momento atual, recomendo consultar os artigos e guias práticos gratuitos na nossa Central de Conhecimento oficial:\n• https://www.alexseles.online/central-de-conhecimento\n\nDesejo-lhe muito sucesso na sua trajetória profissional!`;
          nextStep = 8; // Encerra educadamente sem agendar nem poluir agenda/Trello
        } else {
          // Perfil qualificado para mentoria -> Solicita WhatsApp
          botResponse = `Perfeito, ${updatedLead.nome || 'caro colega'}. O seu perfil enquadra-se nos critérios para análise direta com Alex Seles.\n\nQual é o seu número de telemóvel com WhatsApp (com indicativo do país, ex.: +351 ou +55)?`;
          nextStep = 6; // Aguarda WhatsApp
        }
      } else if (step === 6) {
        // Recebeu WhatsApp -> Solicita LinkedIn e E-mail
        updatedLead.telefone = textToSend;
        setLeadData(updatedLead);
        botResponse = 'Excelente. Por fim, qual é o seu e-mail e o link do seu perfil no LinkedIn para envio do diagnóstico?';
        nextStep = 7; // Aguarda LinkedIn e E-mail
      } else if (step === 7) {
        // Recebeu LinkedIn e E-mail -> Conclui qualificação e dispara integrações
        const emailMatch = textToSend.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        updatedLead.email = emailMatch ? emailMatch[0] : textToSend;
        updatedLead.linkedin = textToSend;
        setLeadData(updatedLead);

        botResponse = `Tudo registado com sucesso, ${updatedLead.nome || 'caro colega'}!\n\nA sua pré-qualificação executiva foi enviada diretamente para Alex Seles. As suas informações serão avaliadas e entraremos em contacto consigo pelo WhatsApp em até 48 horas úteis.\n\nObrigada pelo seu tempo e confiança!`;
        nextStep = 8; // Concluído

        // Dispara integrações (Trello via n8n, Google Sheets no Drive, FormSubmit e Supabase)
        dispatchLeadSubmission(updatedLead, [...updatedMessages, { id: `b-${Date.now()}`, sender: 'bot', text: botResponse, time: timeNow }]);
      } else {
        // Passo 8 ou mensagens subsequentes
        botResponse = 'As suas informações já se encontram em análise. Alex Seles entrará em contacto direto consigo pelo WhatsApp indicado em breve. Desejamos-lhe um excelente dia!';
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
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getInputPlaceholder = () => {
    switch (step) {
      case 1:
        return 'Escreva o seu primeiro nome...';
      case 2:
        return 'Ex: Desenvolvedor Sênior (8 anos)...';
      case 3:
        return 'Selecione ou descreva o seu maior desafio...';
      case 4:
        return 'Descreva o impacto ou selecione acima...';
      case 5:
        return 'Selecione a sua opção acima...';
      case 6:
        return 'Ex: +351 912 345 678 (WhatsApp)...';
      case 7:
        return 'Ex: linkedin.com/in/perfil e seu e-mail...';
      default:
        return 'Escrever mensagem...';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[410px] h-[610px] max-h-[88vh] bg-[#EFEAE2] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#D1D7DB] animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans"
      role="dialog"
      aria-label="Chat Mafalda Silva - Triagem Executiva"
    >
      {/* Cabeçalho Oficial Estilo WhatsApp Web (Tema Claro) */}
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
            ></span>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#111B21] leading-tight flex items-center gap-1.5">
              <span>Mafalda Silva</span>
              <i className="fa-solid fa-circle-check text-[11px] text-[#00A884]" title="Verificada"></i>
            </h3>
            <p className="text-[12px] text-[#667781] font-normal leading-none mt-0.5">
              {isTyping ? (
                <span className="text-[#008069] font-medium animate-pulse">a escrever...</span>
              ) : (
                'Triagem Executiva • Alex Seles'
              )}
            </p>
          </div>
        </div>

        {/* Ações do Cabeçalho */}
        <div className="flex items-center gap-1 text-[#54656F]">
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none ml-0.5"
            title="Fechar chat"
            aria-label="Fechar"
          >
            <i className="fa-solid fa-xmark text-lg text-[#54656F]"></i>
          </button>
        </div>
      </div>

      {/* Corpo da Conversa com Fundo do WhatsApp */}
      <div 
        className="flex-1 overflow-y-auto p-3.5 space-y-2.5 relative"
        style={{
          backgroundColor: '#EFEAE2',
          backgroundImage: `url(${whatsappLightBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '380px 380px',
        }}
      >
        {/* Pílula de Data "Hoje" */}
        <div className="flex justify-center my-1.5">
          <span className="bg-white text-[#54656F] text-[11.5px] font-medium px-3.5 py-1 rounded-lg shadow-xs border border-black/5 select-none">
            Hoje
          </span>
        </div>

        {/* Caixa de Conformidade & Confidencialidade */}
        <div className="flex justify-center my-1.5">
          <div className="bg-[#FFEECD] border border-[#FFE082]/40 text-[#54656F] text-[11px] leading-relaxed text-center px-4 py-2 rounded-lg max-w-[94%] shadow-xs flex items-center justify-center gap-1.5 select-none">
            <i className="fa-solid fa-lock text-[10px] text-[#54656F] shrink-0"></i>
            <span>Canal confidencial de pré-qualificação profissional com proteção de dados (RGPD).</span>
          </div>
        </div>

        {/* Lista de Mensagens */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-xs break-words ${
                m.sender === 'user'
                  ? 'bg-[#D9FDD3] text-[#111B21] rounded-lg rounded-tr-none'
                  : 'bg-white text-[#111B21] rounded-lg rounded-tl-none border border-black/5'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              
              <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-[#667781] select-none">
                <span>{m.time}</span>
                {m.sender === 'user' && (
                  <i className="fa-solid fa-check-double text-[11px] text-[#53BDEB]" aria-label="Lido"></i>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Indicador de Digitação */}
        {isTyping && (
          <div className="flex items-start">
            <div className="bg-white text-[#111B21] rounded-lg rounded-tl-none px-4 py-3 shadow-xs border border-black/5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce"></span>
            </div>
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 2 (Situação / Cargo) */}
        {!isTyping && step === 2 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              'Engenharia / Dev (+5 anos)',
              'Gestão de Projetos / Scrum',
              'Transição para TI',
              'Liderança Executiva de TI'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all shadow-xs font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 3 (Problema / Desafio) */}
        {!isTyping && step === 3 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              'Currículo barrado por robôs ATS',
              'Falta de propostas internacionais',
              'Transição de área sem direção',
              'Salário estagnado no mercado'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all shadow-xs font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 4 (Implicação) */}
        {!isTyping && step === 4 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              'Mais de 6 meses sem evolução',
              'Tentando há 1 ano sozinho',
              'Iniciando agora a busca'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#25D366] rounded-full px-3 py-1.5 transition-all shadow-xs font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 5 (Momento Comercial & Filtro Anti-Curiosos) */}
        {!isTyping && step === 5 && (
          <div className="flex flex-col gap-1.5 pt-1">
            {[
              'Preparado para investir na mentoria',
              'Quero conhecer formatos e condições',
              'Apenas conteúdos gratuitos no momento'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className={`text-xs text-left px-3.5 py-2 rounded-xl transition-all shadow-xs font-medium border ${
                  chip.includes('conteúdos gratuitos')
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-white hover:bg-[#D9FDD3] text-[#111B21] border-[#D1D7DB] hover:border-[#00A884]'
                }`}
              >
                {chip}
              </button>
            ))}
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
            className="w-9 h-9 rounded-full bg-[#00A884] hover:bg-[#008069] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shrink-0 focus:outline-none shadow-xs disabled:opacity-50"
            title="Enviar mensagem"
            aria-label="Enviar"
          >
            <i className="fa-solid fa-paper-plane text-xs translate-x-0.5"></i>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSend('Olá')}
            disabled={step === 8}
            className="text-[#54656F] hover:text-[#111B21] p-1.5 transition-colors focus:outline-none shrink-0 disabled:opacity-50"
            title="Iniciar"
            aria-label="Iniciar"
          >
            <i className="fa-solid fa-paper-plane text-base"></i>
          </button>
        )}
      </div>
    </div>
  );
};
