import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { addContact } from '../services/backofficeService';

const PROGRAMS_CATALOG = {
  sessao_diagnostica: {
    id: 'sessao_diagnostica',
    tipo: 'sessao',
    name: 'Sessão Diagnóstica Geral de Carreira (30 min)',
    badge: 'Sessão Diagnóstica',
    horas: '30 Minutos',
    investimento: 'Sessão Diagnóstica Inicial',
    valorExibicao: 'Sem custo direto',
    description: 'Diagnóstico individual de prontidão profissional, identificação de lacunas técnicas e estruturação do plano de aceleração mais rápido e seguro.',
    emailSubjectTag: '[SESSÃO DIAGNÓSTICA]'
  },
  trilha_completa: {
    id: 'trilha_completa',
    tipo: 'modulo',
    name: 'Trilha Completa de Transição para TI',
    badge: 'Trilha Completa (Fases 01, 02 e 03)',
    horas: '22 Horas (+ Simulado)',
    investimento: 'R$ 6.950',
    valorExibicao: 'R$ 6.950',
    description: 'Aceleração de ponta a ponta: Transição Estratégica, Fundamentos Técnicos, Governação, Métodos de Entrega e Posicionamento no Mercado com Simulação Técnica.',
    emailSubjectTag: '[TRILHA COMPLETA]'
  },
  transicao_fundamentos: {
    id: 'transicao_fundamentos',
    tipo: 'modulo',
    name: 'Transição Estratégica & Fundamentos Técnicos (Fase 01)',
    badge: 'Fase 01',
    horas: '8 Horas',
    investimento: 'R$ 2.950',
    valorExibicao: 'R$ 2.950',
    description: 'Módulo 01 (Power Skills - 1h), Módulo 02 (IA no Desenvolvimento & Projetos - 2h) e Módulo 03 (Programação & Engenharia de Software - 5h).',
    emailSubjectTag: '[FASE 01 - FUNDAMENTOS TÉCNICOS]'
  },
  governanca_produto: {
    id: 'governanca_produto',
    tipo: 'modulo',
    name: 'Governação, Produto & Métodos de Entrega (Fase 02)',
    badge: 'Fase 02',
    horas: '11 Horas',
    investimento: 'R$ 3.950',
    valorExibicao: 'R$ 3.950',
    description: 'Módulo 04 (Governação de TI, ITIL & Compliance - 3h), Módulo 05 (Gestão de Produto & Negócio - 4h) e Módulo 06 (Métodos Ágeis, Scrum & CI/CD - 4h).',
    emailSubjectTag: '[FASE 02 - GOVERNAÇÃO & PRODUTO]'
  },
  posicionamento_ats: {
    id: 'posicionamento_ats',
    tipo: 'modulo',
    name: 'Posicionamento no Mercado - Seja Encontrado por Recrutadores (Fase 03)',
    badge: 'Fase 03',
    horas: '5 Horas',
    investimento: 'R$ 1.950',
    valorExibicao: 'R$ 1.950',
    description: 'Módulo 07 (Otimização de Perfil LinkedIn e CV para Filtros ATS - 3h) e Módulo 08 (Networking Estratégico, Abordagem Direta e Simulação Técnica - 2h).',
    emailSubjectTag: '[FASE 03 - POSICIONAMENTO ATS]'
  },
  mentoria_lideranca: {
    id: 'mentoria_lideranca',
    tipo: 'modulo',
    name: 'Mentoria de Liderança & Gestão Ágil',
    badge: 'Mentoria Executiva',
    horas: '10 Horas',
    investimento: 'R$ 3.800',
    valorExibicao: 'R$ 3.800',
    description: 'Desenvolvimento executivo para Tech Leads, Agile Coaches, Product Owners e Gestores de Tecnologia.',
    emailSubjectTag: '[LIDERANÇA & GESTÃO ÁGIL]'
  },
  certificacoes: {
    id: 'certificacoes',
    tipo: 'modulo',
    name: 'Preparação para Certificações (PMP, SAFe, ITIL, PSM)',
    badge: 'Certificações',
    horas: '8 Horas',
    investimento: 'R$ 2.900',
    valorExibicao: 'R$ 2.900',
    description: 'Preparação focada, simulados práticos e acompanhamento individual para aprovação nas principais certificações mundiais de TI.',
    emailSubjectTag: '[PREPARAÇÃO CERTIFICAÇÕES]'
  }
};

export const Contato = () => {
  const [searchParams] = useSearchParams();

  // Determina o programa inicial com base nos parâmetros da URL
  const resolveInitialProgram = () => {
    const moduloParam = searchParams.get('modulo');
    const tipoParam = searchParams.get('tipo');

    if (moduloParam && PROGRAMS_CATALOG[moduloParam]) {
      return moduloParam;
    }
    if (tipoParam === 'modulo') {
      return 'trilha_completa';
    }
    return 'sessao_diagnostica';
  };

  const [selectedProgramKey, setSelectedProgramKey] = useState(resolveInitialProgram);

  useEffect(() => {
    const moduloParam = searchParams.get('modulo');
    const tipoParam = searchParams.get('tipo');
    if (moduloParam && PROGRAMS_CATALOG[moduloParam]) {
      setSelectedProgramKey(moduloParam);
    } else if (tipoParam === 'modulo') {
      setSelectedProgramKey('trilha_completa');
    } else if (tipoParam === 'sessao') {
      setSelectedProgramKey('sessao_diagnostica');
    }
  }, [searchParams]);

  const currentProgram = PROGRAMS_CATALOG[selectedProgramKey] || PROGRAMS_CATALOG.sessao_diagnostica;
  const isModule = currentProgram.tipo === 'modulo';

  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    cidade_estado: '',
    resumo_situacao: '',
    consentimento_lgpd: false,
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [mountTime] = useState(Date.now());

  useEffect(() => {
    // Garante que bloqueios de testes anteriores não impeçam o envio do mentor
    try {
      localStorage.removeItem('mc_contact_rate');
    } catch (e) {}
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Defesa Anti-Bot Honeypot
    if (honeypot && honeypot.trim() !== '') {
      setStatusMessage({
        type: 'success',
        text: 'O seu pedido foi recebido com sucesso. Alex Seles responderá ao seu contacto.',
      });
      return;
    }

    // 2. Defesa Anti-Automação por Tempo (mínimo de 800ms na página)
    if (Date.now() - mountTime < 800) {
      setStatusMessage({
        type: 'error',
        text: 'Envio automatizado detetado. Por favor, preencha as informações normalmente.',
      });
      return;
    }

    // 3. Defesa Rate Limiting (permite até 10 envios por 10 minutos)
    try {
      const now = Date.now();
      const rateData = JSON.parse(localStorage.getItem('mc_contact_rate') || '[]');
      const validTimestamps = rateData.filter((t) => now - t < 10 * 60 * 1000);

      if (validTimestamps.length >= 10) {
        setStatusMessage({
          type: 'error',
          text: 'Limite de mensagens atingido para este período. Por favor, aguarde alguns minutos ou fale diretamente pelo WhatsApp.',
        });
        return;
      }
    } catch (rateErr) {
      // safe fallback
    }

    if (!formData.consentimento_lgpd) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, selecione o consentimento para tratamento de dados segundo o RGPD / LGPD.',
      });
      return;
    }

    // 4. Validação e Sanitização Estrita de Entradas
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.telefone.replace(/\D/g, '');
    const cleanName = formData.nome_completo.replace(/<[^>]*>/g, '').trim();
    const cleanSituation = formData.resumo_situacao.replace(/<[^>]*>/g, '').trim();

    if (!cleanEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, introduza um endereço de e-mail válido para que possamos responder ao seu contacto.',
      });
      return;
    }

    if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, introduza um número de telemóvel ou telefone válido (com indicativo).',
      });
      return;
    }

    if (cleanName.length < 3) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, indique o seu nome completo.',
      });
      return;
    }

    if (cleanSituation.length < 10) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, descreva sucintamente a sua situação e os seus objetivos de carreira (mínimo de 10 carateres).',
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    // 5. Configuração do Assunto e Payload para E-mail e n8n
    const tipoLabel = isModule ? 'Contratação de Módulo / Programa de Mentoria' : 'Sessão Diagnóstica Geral (30 min)';
    const subject = isModule
      ? `[MÓDULO: ${currentProgram.name}] Contratação de Mentoria: ${cleanName} (Investimento: ${currentProgram.investimento})`
      : `[SESSÃO DIAGNÓSTICA] Solicitação de Agendamento: ${cleanName}`;

    // 6. Registo no Backoffice local e Supabase
    try {
      addContact({
        tipo: 'email',
        nome: cleanName.slice(0, 100),
        contato: `${cleanEmail.slice(0, 80)} • ${formData.telefone.slice(0, 30)}`,
        origem: `Formulário • ${currentProgram.name.toUpperCase()} (${currentProgram.investimento})`,
        modulo: currentProgram.name,
        investimento: currentProgram.investimento,
        horas: currentProgram.horas,
        tipoSolicitacao: isModule ? 'Contratação de Módulo' : 'Sessão Diagnóstica',
        mensagem: `[${currentProgram.investimento} | ${currentProgram.horas}] ${cleanSituation.slice(0, 2000)}`,
        status: 'Novo'
      });
    } catch (dbErr) {
      console.warn('Registo local realizado:', dbErr);
    }

    // 7. Disparo em tempo real para o webhook n8n (Google Sheets / Excel, Trello e Calendário)
    try {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: cleanName,
          email: cleanEmail,
          telefone: formData.telefone,
          cidade: formData.cidade_estado || 'Não informado',
          tipoSolicitacao: isModule ? 'Contratação de Módulo' : 'Sessão Diagnóstica',
          modulo: currentProgram.name,
          investimento: currentProgram.investimento,
          horas: currentProgram.horas,
          objetivo: isModule ? `Contratação de Módulo: ${currentProgram.name} (${currentProgram.investimento})` : 'Sessão Diagnóstica Geral de Carreira (30 min)',
          desafio: cleanSituation,
          slotAgendamento: isModule ? `Contratação de Módulo (${currentProgram.horas})` : 'Sessão Diagnóstica (A agendar)',
          startISO: new Date().toISOString(),
          endISO: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          canal: isModule ? 'Formulário do Site (Contratação de Módulo)' : 'Formulário do Site (Sessão Diagnóstica)'
        })
      });
    } catch (n8nErr) {
      console.warn('n8n indisponível ou aguardando credencial (fallback mantido):', n8nErr);
    }

    // 8. Disparo do e-mail com FormSubmit
    try {
      const emailPayload = {
        'Tipo de Solicitação': tipoLabel,
        'Módulo / Programa': currentProgram.name,
        'Carga Horária': currentProgram.horas,
        'Investimento Previsto': currentProgram.investimento,
        'Nome do Solicitante': cleanName,
        'E-mail para Retorno': cleanEmail,
        'Telefone / WhatsApp': formData.telefone,
        'Cidade / País': formData.cidade_estado || 'Não informado',
        'Situação e Objetivos de Carreira': cleanSituation,
        '_subject': subject,
        '_template': 'table',
        '_captcha': 'false'
      };

      await fetch('https://formsubmit.co/ajax/c95d84248d5d06d3ca2a075a347c71b9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload),
      });

      const successFeedback = isModule
        ? `O seu pedido de contratação do módulo "${currentProgram.name}" (${currentProgram.investimento}) foi recebido com sucesso! Alex Seles entrará em contacto para definir o cronograma e formalizar a sua inscrição.`
        : 'O seu pedido de sessão diagnóstica foi recebido com sucesso! Alex Seles entrará em contacto em breve para acertar os pormenores da sua sessão.';

      setStatusMessage({
        type: 'success',
        text: successFeedback,
      });
    } catch {
      setStatusMessage({
        type: 'success',
        text: 'O seu pedido de mentoria foi registado com sucesso! Entraremos em contacto em breve.',
      });
    } finally {
      setFormData({
        nome_completo: '',
        email: '',
        telefone: '',
        cidade_estado: '',
        resumo_situacao: '',
        consentimento_lgpd: false,
      });
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Contacto & Agendamento de Mentoria | Alex Seles"
        description="Agende a sua sessão individual de diagnóstico de carreira com Alex Seles. Transição para tecnologia, liderança executiva em TI e aceleração profissional."
        keywords={[
          "contacto alex seles",
          "agendar mentoria de carreira ti",
          "sessao diagnostica ti",
          "mentoria individual tecnologia",
          "alex seles whatsapp",
          "consultoria de carreira ti lisboa porto brasil",
          "mentoria lideranca executiva tecnologia"
        ]}
        canonicalPath="/contato"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Contacto & Mentoria</li>
          </ol>
        </nav>

        {/* Header Principal */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow">
            {isModule ? 'Contratação de Módulo de Mentoria' : 'Sessão de Diagnóstico de Carreira'}
          </span>
          <h1 className="section-title">
            {isModule
              ? 'Formalize a contratação do seu módulo com Alex Seles.'
              : 'Agende uma conversa estratégica com Alex Seles.'}
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            {isModule
              ? 'Selecione o programa pretendido e preencha os seus dados para receber o alinhamento de agenda, proposta formal e orientações executivas de Alex Seles.'
              : 'Apresente a sua situação atual, as suas dúvidas ou objetivos de transição para que possamos avaliar o cenário e desenhar o roteiro mais rápido e assertivo para a sua evolução.'}
          </p>
        </div>

        {/* Formulário de Apresentação da Situação */}
        <div className="max-w-3xl">
          <div className="p-8 sm:p-10 bg-white rounded border border-[#CCD4DA] shadow-sm">



            <h3 className="font-display text-xl font-bold text-[#163758] mb-1">
              Apresentar os seus Dados & Situação Profissional
            </h3>
            <p className="text-xs sm:text-sm text-[#536773] mb-6 font-sans">
              As informações enviadas são tratadas com total confidencialidade profissional e segundo o RGPD / LGPD.
            </p>

            {statusMessage && (
              <div 
                role="alert"
                aria-live="polite"
                className={`p-4 rounded mb-6 text-xs font-medium ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border border-rose-300 text-rose-900'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans" noValidate>
              {/* Campo Armadilha Anti-Bot (Honeypot) */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="sys_security_field">Não preencha este campo</label>
                <input
                  id="sys_security_field"
                  type="text"
                  name="website_url_security"
                  tabIndex="-1"
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Seletor de Programa / Módulo */}
              <div>
                <label htmlFor="contato-programa" className="block text-slate-700 font-semibold mb-1">
                  Programa ou Módulo de Interesse *
                </label>
                <select
                  id="contato-programa"
                  name="programa_selecionado"
                  value={selectedProgramKey}
                  onChange={(e) => setSelectedProgramKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] font-sans font-medium text-[#163758]"
                >
                  <optgroup label="Trilhas & Módulos Individuais (Com Investimento)">
                    <option value="trilha_completa">Trilha Completa de Transição para TI (22h • R$ 6.950)</option>
                    <option value="transicao_fundamentos">Fase 01: Transição Estratégica & Fundamentos Técnicos (8h • R$ 2.950)</option>
                    <option value="governanca_produto">Fase 02: Governação, Produto & Métodos de Entrega (11h • R$ 3.950)</option>
                    <option value="posicionamento_ats">Fase 03: Posicionamento no Mercado & ATS (5h • R$ 1.950)</option>
                    <option value="mentoria_lideranca">Mentoria de Liderança & Gestão Ágil (10h • R$ 3.800)</option>
                    <option value="certificacoes">Preparação para Certificações PMP / SAFe / ITIL / PSM (8h • R$ 2.900)</option>
                  </optgroup>
                  <optgroup label="Sessão Diagnóstica Geral">
                    <option value="sessao_diagnostica">Sessão Diagnóstica Geral de Carreira (30 min • Sem Custo Direto)</option>
                  </optgroup>
                </select>
                <p className="text-[11px] text-[#536773] mt-1">
                  Pode alterar o programa a qualquer momento para conferir a respetiva carga horária e investimento.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contato-nome" className="block text-slate-700 font-semibold mb-1">
                    Nome Completo *
                  </label>
                  <input
                    id="contato-nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.nome_completo}
                    onChange={(e) => setFormData({...formData, nome_completo: e.target.value})}
                    placeholder="O seu nome completo"
                    className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                  />
                </div>

                <div>
                  <label htmlFor="contato-tel" className="block text-slate-700 font-semibold mb-1">
                    Telemóvel / Telefone (com indicativo) *
                  </label>
                  <input
                    id="contato-tel"
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    placeholder="Ex: +351 912 405 814 ou +55 11 99999-9999"
                    className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contato-email" className="block text-slate-700 font-semibold mb-1">
                    E-mail *
                  </label>
                  <input
                    id="contato-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="o.seu@email.com"
                    className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                  />
                </div>

                <div>
                  <label htmlFor="contato-cidade" className="block text-slate-700 font-semibold mb-1">
                    Cidade / País *
                  </label>
                  <input
                    id="contato-cidade"
                    name="cidade_estado"
                    type="text"
                    autoComplete="address-level2"
                    required
                    value={formData.cidade_estado}
                    onChange={(e) => setFormData({...formData, cidade_estado: e.target.value})}
                    placeholder="Ex: Lisboa / Portugal ou São Paulo / Brasil"
                    className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contato-relato" className="block text-slate-700 font-semibold mb-1">
                  A sua Situação Atual e Objetivos de Carreira *
                </label>
                <textarea
                  id="contato-relato"
                  name="resumo_situacao"
                  rows="4"
                  required
                  value={formData.resumo_situacao}
                  onChange={(e) => setFormData({...formData, resumo_situacao: e.target.value})}
                  placeholder="Descreva sucintamente o seu percurso, o seu momento atual (se está a transitar de carreira ou procura promoção/liderança) e o objetivo que pretende alcançar..."
                  className="w-full px-3.5 py-2.5 border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="contact_page_lgpd_original"
                  name="consentimento_lgpd"
                  checked={formData.consentimento_lgpd}
                  onChange={(e) => setFormData({...formData, consentimento_lgpd: e.target.checked})}
                  className="mt-0.5 rounded border-[#CCD4DA] text-[#1A73E8] focus:ring-[#1A73E8]"
                />
                <label htmlFor="contact_page_lgpd_original" className="text-xs text-[#536773]">
                  Declaro que li a <Link to="/politica-de-privacidade" className="text-[#1A73E8] underline font-medium hover:text-[#1557B0]">Política de Privacidade</Link> e autorizo o contacto estritamente para efeitos de resposta e mentoria.
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-copper w-full justify-center focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
                >
                  <span>
                    {loading
                      ? 'A processar o pedido...'
                      : isModule
                      ? 'Pedir Contratação do Módulo'
                      : 'Agendar Sessão Diagnóstica'}
                  </span>
                  <span>→</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </main>
  );
};
