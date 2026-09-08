import React, { useState, useEffect, useRef } from 'react';
import mafaldaImg from '../../assets/mafalda.png';
import whatsappLightBg from '../../assets/whatsapp-doodle-light.svg';
import { addContact } from '../../services/backofficeService';

// Gera slots de 30 minutos disponíveis exclusivamente nas janelas oficiais de Alex Seles (hora de Lisboa):
// - Segundas, Quartas e Sextas: das 18:00 às 22:00
// - Sábados: das 10:00 às 12:00
const generateAvailableSlots = () => {
  const bookedSlots = (() => {
    try {
      return JSON.parse(localStorage.getItem('mc_scheduled_calendar_slots') || '[]');
    } catch (e) {
      return [];
    }
  })();

  const slots = [];
  const now = new Date();
  
  // Começa a partir de amanhã
  let currentDay = new Date(now);
  currentDay.setDate(currentDay.getDate() + 1);

  let daysChecked = 0;
  while (slots.length < 6 && daysChecked < 14) {
    const dayOfWeek = currentDay.getDay(); // 0 = Dom, 1 = Seg, 2 = Ter, 3 = Qua, 4 = Qui, 5 = Sex, 6 = Sáb

    let dayWindows = [];
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      // Segundas, Quartas e Sextas (18:00 às 22:00)
      dayWindows = [
        { hour: 18, minute: 0, labelTime: '18:00' },
        { hour: 19, minute: 0, labelTime: '19:00' },
        { hour: 20, minute: 0, labelTime: '20:00' },
        { hour: 21, minute: 0, labelTime: '21:00' },
      ];
    } else if (dayOfWeek === 6) {
      // Sábados (10:00 às 12:00)
      dayWindows = [
        { hour: 10, minute: 0, labelTime: '10:00' },
        { hour: 10, minute: 30, labelTime: '10:30' },
        { hour: 11, minute: 0, labelTime: '11:00' },
        { hour: 11, minute: 30, labelTime: '11:30' },
      ];
    }

    for (const tw of dayWindows) {
      if (slots.length >= 6) break;

      const slotStart = new Date(currentDay);
      slotStart.setHours(tw.hour, tw.minute, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      const slotId = `${slotStart.getFullYear()}-${String(slotStart.getMonth() + 1).padStart(2, '0')}-${String(slotStart.getDate()).padStart(2, '0')}_${String(tw.hour).padStart(2, '0')}${String(tw.minute).padStart(2, '0')}`;

      // Ignora se já estiver reservado para não encavalar
      if (!bookedSlots.includes(slotId)) {
        const dayName = slotStart.toLocaleDateString('pt-PT', { weekday: 'short' });
        const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', '');
        const dayMonth = slotStart.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }).replace('.', '');

        slots.push({
          id: slotId,
          display: `${capitalizedDay}, ${dayMonth} às ${tw.labelTime}`,
          fullLabel: `${capitalizedDay}, ${dayMonth} de ${slotStart.getFullYear()} às ${tw.labelTime} (Horário de Lisboa)`,
          startDate: slotStart,
          endDate: slotEnd,
        });
      }
    }

    currentDay.setDate(currentDay.getDate() + 1);
    daysChecked++;
  }

  return slots;
};

// Formata data no padrão do Google Calendar (YYYYMMDDTHHmmss)
const formatGCalDate = (d) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
};

// Constrói o link oficial do Google Calendar com participantes automáticos (Alex Seles e Candidato)
const buildGoogleCalendarUrl = (lead, slot) => {
  const title = `Sessão Diagnóstica de Mentoria • Alex Seles & ${lead.nome || 'Candidato'}`;
  const details = [
    `Sessão Diagnóstica Individual de 30 minutos com Alex Seles.`,
    ``,
    `CANDIDATO: ${lead.nome || 'Não informado'}`,
    `OBJETIVO: ${lead.objetivo || 'Não especificado'}`,
    `MAIOR DESAFIO: ${lead.desafio || 'Não especificado'}`,
    `TELEMOVEL: ${lead.telefone || 'Não informado'}`,
    `E-MAIL: ${lead.email || 'Não informado'}`,
    `HORÁRIO: ${slot.fullLabel}`,
    ``,
    `LOCAL: Reunião online via Google Meet (o link direto será enviado por e-mail antes da sessão).`,
    ``,
    `Alex Seles | Head de Inovação & Mentoria de Carreira em TI`,
    `alexseles40@gmail.com`
  ].join('\n');

  const location = 'Google Meet (Link enviado por e-mail)';
  const startStr = formatGCalDate(slot.startDate);
  const endStr = formatGCalDate(slot.endDate);

  // Adiciona Alex Seles e o candidato como convidados formais no evento do Google Calendar
  const attendees = ['alexseles40@gmail.com', lead.email].filter(Boolean).join(',');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&add=${encodeURIComponent(attendees)}&ctz=Europe/Lisbon`;
};

// Gera e descarrega o ficheiro .ics de convite oficial
const downloadICSFile = (lead, slot) => {
  const pad = (n) => String(n).padStart(2, '0');
  const formatICSDate = (d) => {
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };

  const startStr = formatICSDate(slot.startDate);
  const endStr = formatICSDate(slot.endDate);
  const nowStr = formatICSDate(new Date());

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Alex Seles//Mentoria Executiva//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:diag-${Date.now()}@alexseles.com`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:Sessão Diagnóstica de Mentoria: ${lead.nome || 'Candidato'} com Alex Seles`,
    `DESCRIPTION:Sessão Diagnóstica Individual de 30 minutos com Alex Seles.\\n\\nCandidato: ${lead.nome || 'Não informado'}\\nObjetivo: ${lead.objetivo || 'Não especificado'}\\nDesafio: ${lead.desafio || 'Não especificado'}\\nTelemóvel: ${lead.telefone || 'Não informado'}\\nE-mail: ${lead.email || 'Não informado'}\\n\\nReunião online via Google Meet.`,
    `LOCATION:Google Meet (Link por e-mail)`,
    `ORGANIZER;CN=Alex Seles:mailto:alexseles40@gmail.com`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Alex Seles:mailto:alexseles40@gmail.com`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${lead.nome || 'Candidato'}:mailto:${lead.email || 'alexseles40@gmail.com'}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete de Sessão Diagnóstica com Alex Seles',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `sessao-diagnostica-${lead.nome ? lead.nome.toLowerCase().replace(/\s+/g, '-') : 'alex-seles'}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const WhatsAppSimulatedChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Passos: 0: Init, 1: Nome, 2: Objetivo, 3: Desafio, 4: Telefone, 5: E-mail, 6: Slot, 7: Finalizado
  const [step, setStep] = useState(0);
  const [leadData, setLeadData] = useState({
    nome: '',
    objetivo: '',
    desafio: '',
    telefone: '',
    email: '',
    slotAgendamento: '',
    calendarUrl: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Rola para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, availableSlots]);

  // Foco no input ao abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Mensagem inicial de boas-vindas ao abrir o chat pela primeira vez
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer1 = setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        setMessages([
          {
            id: 'm-1',
            sender: 'bot',
            text: 'Olá! Sou a Mafalda Silva, consultora de admissão da mentoria de Alex Seles. Bem-vindo(a) ao canal direto de mentoria executiva e carreira em TI.',
            time: timeNow,
          }
        ]);

        // Segunda mensagem a pedir o nome
        const timer2 = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: 'm-2',
              sender: 'bot',
              text: 'Para percebermos se o método prático de Alex Seles se encaixa no seu momento, qual é o seu primeiro nome?',
              time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
          setIsTyping(false);
          setStep(1); // Aguarda Nome
        }, 1200);

        return () => clearTimeout(timer2);
      }, 1000);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  // Disparo de e-mail ao concluir o agendamento completo
  const dispatchBriefingEmail = async (completedData, allMessages) => {
    try {
      // 1. Registo no Backoffice local e Supabase
      addContact({
        tipo: 'whatsapp_web',
        nome: completedData.nome || 'Visitante Web WhatsApp',
        contato: `${completedData.telefone || 'Sem telefone'} | ${completedData.email || 'Sem e-mail'}`,
        origem: `Chat Mafalda • ${completedData.objetivo || 'Diagnóstico'}`,
        mensagem: `[AGENDAMENTO GOOGLE CALENDAR]: ${completedData.slotAgendamento || 'A definir'}\n[LINK CALENDAR]: ${completedData.calendarUrl || 'N/A'}\n[OBJETIVO]: ${completedData.objetivo || 'N/A'}\n[DESAFIO/DOR]: ${completedData.desafio || 'N/A'}\n\n[TRANSCRIÇÃO]:\n${allMessages.map(m => `${m.sender.toUpperCase()} (${m.time}): ${m.text}`).join('\n')}`,
        status: 'Novo'
      });
    } catch (e) {
      console.warn('Erro ao registar no Backoffice:', e);
    }

    try {
      // 2. Disparo formatado via FormSubmit diretamente para alexseles40@gmail.com
      const payload = {
        'Nome do Candidato': completedData.nome,
        'Objetivo Principal': completedData.objetivo,
        'Maior Desafio / Dor': completedData.desafio,
        'Telemóvel (WhatsApp)': completedData.telefone,
        'E-mail (Contingência e Confirmação)': completedData.email,
        'Sessão Diagnóstica Agendada': completedData.slotAgendamento || 'A definir',
        'Link do Google Calendar': completedData.calendarUrl || 'Não gerado',
        'Canal de Origem': 'Chat Interativo Mafalda Silva (WhatsApp Web)',
        'Data e Hora do Registo': new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' }),
        '_subject': `Novo Agendamento via Mafalda: ${completedData.nome} (${completedData.slotAgendamento || completedData.objetivo})`,
        '_template': 'table',
        '_captcha': 'false'
      };

      await fetch('https://formsubmit.co/ajax/c95d84248d5d06d3ca2a075a347c71b9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Erro ao enviar e-mail via FormSubmit:', err);
    }

    try {
      // 3. Disparo em tempo real para o n8n (Criação automática no Google Calendar & Envio do Convite com Google Meet)
      const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: completedData.nome,
          email: completedData.email,
          telefone: completedData.telefone,
          objetivo: completedData.objetivo,
          desafio: completedData.desafio,
          slotAgendamento: completedData.slotAgendamento,
          startISO: completedData.startISO,
          endISO: completedData.endISO
        })
      });
    } catch (n8nErr) {
      console.warn('n8n indisponível ou aguardando credencial (fallback mantido):', n8nErr);
    }
  };

  // Trata a seleção de um slot de agendamento específico (garantindo que não encavale)
  const handleSelectSlot = (chosenSlot) => {
    // 1. Bloqueia o slot no localStorage para nunca encavalar
    try {
      const booked = JSON.parse(localStorage.getItem('mc_scheduled_calendar_slots') || '[]');
      if (!booked.includes(chosenSlot.id)) {
        localStorage.setItem('mc_scheduled_calendar_slots', JSON.stringify([...booked, chosenSlot.id]));
      }
    } catch (e) {
      console.warn('Erro ao gravar slot no localStorage:', e);
    }

    const timeNow = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

    // 2. Mensagem do utilizador a confirmar o slot
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: chosenSlot.display,
      time: timeNow,
    };

    const gcalUrl = buildGoogleCalendarUrl(leadData, chosenSlot);
    const updatedLead = {
      ...leadData,
      slotAgendamento: chosenSlot.fullLabel,
      calendarUrl: gcalUrl,
      startISO: chosenSlot.startDate.toISOString(),
      endISO: chosenSlot.endDate.toISOString(),
    };

    setLeadData(updatedLead);
    setAvailableSlots([]);

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = `Sessão Diagnóstica agendada com sucesso para ${chosenSlot.fullLabel}!\n\nEnviei os detalhes da sua situação diretamente ao Alex Seles e acabámos de enviar o convite formal da sessão para o seu e-mail:\n• ${updatedLead.email}\n\nPor favor, verifique a sua caixa de entrada. O e-mail contém o link direto da videochamada (Google Meet) e o botão para confirmar a sua presença com 1 clique.`;

      const finalBotMsg = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        inviteEmailSentTo: updatedLead.email,
        time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, finalBotMsg]);
      setIsTyping(false);
      setStep(7); // Finalizado

      // Dispara o e-mail completo com todos os dados recolhidos
      dispatchBriefingEmail(updatedLead, [...updatedMessages, finalBotMsg]);
    }, 1200);
  };

  // Processa as respostas do utilizador
  const handleSend = (customText = null) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend) return;

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

    // Lógica conversacional do bot
    setTimeout(() => {
      let botResponse = '';
      let nextStep = step;
      let updatedLead = { ...leadData };
      const lower = textToSend.toLowerCase();

      // Dúvidas frequentes intercaladas
      if (lower.includes('quem é o alex') || lower.includes('quem e alex') || lower.includes('sobre o alex')) {
        botResponse = 'Alex Seles é Engenheiro Informático, Mestre e mentor internacional com mais de 20 anos de experiência. Possui as certificações PMP®, SAFe® 6, ITIL® 4 e PSM II™, atuando na aceleração e transição de carreira para tecnologia.';
        nextStep = step; // Mantém o passo atual
      } else if (lower.includes('quanto custa') || lower.includes('qual o preço') || lower.includes('valor')) {
        botResponse = 'A mentoria é individual e personalizada. O investimento depende das metas desenhadas para si. Por isso, Alex realiza uma Sessão Diagnóstica de 30 min com candidatos selecionados. Vamos prosseguir com o seu agendamento?';
        nextStep = step;
      } else if (step === 1) {
        // Recebeu Nome
        const cleanName = textToSend.replace(/^(eu sou o|meu nome é|sou o|sou a|eu sou a)\s*/i, '').trim();
        updatedLead.nome = cleanName;
        setLeadData(updatedLead);
        botResponse = `Prazer, ${cleanName}! Em que área atua atualmente e qual o seu grande objetivo em tecnologia ou liderança?`;
        nextStep = 2;
      } else if (step === 2) {
        // Recebeu Objetivo
        updatedLead.objetivo = textToSend;
        setLeadData(updatedLead);
        botResponse = 'Excelente meta. E o que tem sido o seu maior obstáculo ou dor para atingir esse patamar hoje? (Ex: currículo sem resposta por robôs ATS, falta de direção prática, transição insegura...)';
        nextStep = 3;
      } else if (step === 3) {
        // Recebeu Desafio / Dor -> Solicita Telemóvel
        updatedLead.desafio = textToSend;
        setLeadData(updatedLead);
        botResponse = `Compreendo perfeitamente, ${updatedLead.nome || 'caro colega'}. Esse é precisamente o ponto crítico que o método de Alex Seles destrava com acompanhamento prático individual.\n\nPara alinharmos a sua Sessão Diagnóstica de 30 minutos com o Alex Seles, qual é o seu número de telemóvel com WhatsApp (com indicativo do país, ex.: +351)?`;
        nextStep = 4;
      } else if (step === 4) {
        // Recebeu Telemóvel -> Solicita E-mail de contingência
        updatedLead.telefone = textToSend;
        setLeadData(updatedLead);
        botResponse = `Muito obrigada! E qual é o seu melhor e-mail? É essencial caso haja algum dígito trocado no número de telemóvel, para garantir que não perde o contacto e também para o envio do convite formal da sessão.`;
        nextStep = 5;
      } else if (step === 5) {
        // Recebeu E-mail -> Apresenta slots disponíveis no Google Calendar sem sobreposição
        updatedLead.email = textToSend;
        setLeadData(updatedLead);

        const slots = generateAvailableSlots();
        setAvailableSlots(slots);

        botResponse = `Perfeito, ${updatedLead.nome || 'caro colega'}! Para que os horários não encavalem na agenda do Alex Seles e assegurarmos a sua vaga exclusiva, selecione abaixo um dos horários disponíveis para a sua Sessão Diagnóstica de 30 minutos:`;
        nextStep = 6;
      } else if (step === 6) {
        // Se o utilizador digitou texto em vez de clicar num chip de slot
        const slots = generateAvailableSlots();
        const chosenSlot = slots[0] || {
          id: `custom-${Date.now()}`,
          display: 'Horário sugerido',
          fullLabel: `${textToSend} (A confirmar com Alex Seles)`,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 60 * 1000)
        };
        handleSelectSlot(chosenSlot);
        return;
      } else {
        // Passo 7 ou mensagens subsequentes
        botResponse = 'Informação adicional registada com sucesso! O Alex Seles terá este apontamento em consideração antes da sessão diagnóstica. Desejamos-lhe um excelente dia!';
        nextStep = 7;
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
    }, 1200);
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
        return 'Escreva ou selecione o seu objetivo...';
      case 3:
        return 'Escreva ou selecione o seu maior desafio...';
      case 4:
        return 'Ex: +351 912 345 678 (WhatsApp)...';
      case 5:
        return 'Ex: seu.nome@email.com (E-mail)...';
      case 6:
        return 'Selecione um horário acima ou escreva...';
      default:
        return 'Escrever mensagem...';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[410px] h-[610px] max-h-[88vh] bg-[#EFEAE2] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#D1D7DB] animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans"
      role="dialog"
      aria-label="Chat Mafalda Silva - Atendente Virtual"
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
                'Atendente Virtual'
              )}
            </p>
          </div>
        </div>

        {/* Ações do Cabeçalho (Idênticas ao Screenshot) */}
        <div className="flex items-center gap-1 text-[#54656F]">
          <button
            type="button"
            className="p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none"
            title="Chamada de vídeo"
            aria-label="Chamada de vídeo"
          >
            <i className="fa-solid fa-video text-[15px]"></i>
          </button>
          <button
            type="button"
            className="p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none"
            title="Chamada de voz"
            aria-label="Chamada de voz"
          >
            <i className="fa-solid fa-phone text-[14px]"></i>
          </button>
          <button
            type="button"
            className="p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none"
            title="Pesquisar na conversa"
            aria-label="Pesquisar"
          >
            <i className="fa-solid fa-magnifying-glass text-[15px]"></i>
          </button>
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

      {/* Corpo da Conversa com Fundo Bege Autêntico do WhatsApp */}
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

        {/* Caixa Amarela de Encriptação & Segurança (Idêntica ao Screenshot) */}
        <div className="flex justify-center my-1.5">
          <div className="bg-[#FFEECD] border border-[#FFE082]/40 text-[#54656F] text-[11.5px] leading-relaxed text-center px-4 py-2 rounded-lg max-w-[94%] shadow-xs flex items-center justify-center gap-1.5 select-none">
            <i className="fa-solid fa-lock text-[10px] text-[#54656F] shrink-0"></i>
            <span>As mensagens e as chamadas são encriptadas ponto a ponto. Só as pessoas nesta conversa as podem ler, ouvir ou partilhar.</span>
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
              
              {/* Confirmação de Envio do Convite por E-mail */}
              {m.inviteEmailSentTo && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] rounded-lg p-3 text-xs flex items-start gap-2.5 shadow-2xs">
                    <i className="fa-solid fa-envelope-circle-check text-base text-[#16A34A] shrink-0 mt-0.5" aria-hidden="true"></i>
                    <div>
                      <span className="font-bold text-[#15803D] block">Convite oficial enviado por e-mail</span>
                      <p className="text-[11.5px] text-[#166534] mt-0.5 leading-snug">
                        O link exclusivo do Google Meet e os detalhes da sessão foram encaminhados para <strong>{m.inviteEmailSentTo}</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-[#667781] select-none">
                <span>{m.time}</span>
                {m.sender === 'user' && (
                  <i className="fa-solid fa-check-double text-[11px] text-[#53BDEB]" aria-label="Lido"></i>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Indicador de "A escrever..." com 3 pontinhos animados */}
        {isTyping && (
          <div className="flex items-start">
            <div className="bg-white text-[#111B21] rounded-lg rounded-tl-none px-4 py-3 shadow-xs border border-black/5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce"></span>
            </div>
          </div>
        )}

        {/* Chips de Resposta Rápida: Passo 2 (Objetivo) */}
        {!isTyping && step === 2 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Transição para TI', 'Scrum Master / PO', 'Liderança & Gestão Ágil', 'Preparar Certificação PMP/ITIL'].map((chip) => (
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

        {/* Chips de Resposta Rápida: Passo 3 (Maior Desafio) */}
        {!isTyping && step === 3 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Currículo rejeitado por robôs ATS', 'LinkedIn sem visibilidade', 'Insegurança para mudar de área', 'Estagnação de cargo/salário'].map((chip) => (
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

        {/* Slots de Agendamento no Google Calendar: Passo 6 (Horários sem encavalamento) */}
        {!isTyping && step === 6 && availableSlots.length > 0 && (
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#54656F] px-1 select-none">
              <i className="fa-regular fa-clock text-[#00A884]"></i>
              <span>Selecione um horário disponível (30 min):</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {availableSlots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSlot(s)}
                  className="text-left text-xs bg-white hover:bg-[#D9FDD3] text-[#111B21] border border-[#D1D7DB] hover:border-[#00A884] rounded-lg px-3.5 py-2.5 transition-all shadow-xs font-medium flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar-check text-[#00A884] text-sm"></i>
                    <span>{s.display}</span>
                  </span>
                  <span className="text-[10px] text-[#667781] group-hover:text-[#008069] flex items-center gap-1 font-semibold">
                    <span>Confirmar</span>
                    <i className="fa-solid fa-chevron-right text-[9px]"></i>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Barra Inferior de Entrada de Texto (Idêntica ao Screenshot) */}
      <div className="bg-[#F0F2F5] px-3 py-2 flex items-center gap-2 border-t border-[#E9EDEF] shrink-0">
        <button
          type="button"
          className="text-[#54656F] hover:text-[#111B21] p-1.5 transition-colors focus:outline-none"
          title="Anexar"
          aria-label="Anexar"
        >
          <i className="fa-solid fa-plus text-lg"></i>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getInputPlaceholder()}
          className="flex-1 bg-white text-[#111B21] placeholder-[#8696A0] text-sm px-4 py-2.5 rounded-lg border border-transparent focus:outline-none focus:ring-1 focus:ring-[#00A884] shadow-xs"
        />

        {inputText.trim() ? (
          <button
            type="button"
            onClick={() => handleSend()}
            className="w-9 h-9 rounded-full bg-[#00A884] hover:bg-[#008069] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shrink-0 focus:outline-none shadow-xs"
            title="Enviar mensagem"
            aria-label="Enviar"
          >
            <i className="fa-solid fa-paper-plane text-xs translate-x-0.5"></i>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSend('Olá')}
            className="text-[#54656F] hover:text-[#111B21] p-1.5 transition-colors focus:outline-none shrink-0"
            title="Mensagem de voz"
            aria-label="Mensagem de voz"
          >
            <i className="fa-solid fa-microphone text-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
};
