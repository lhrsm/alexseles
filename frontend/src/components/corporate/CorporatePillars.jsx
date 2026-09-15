import React, { useState } from 'react';
import { 
  Cpu, 
  Bot, 
  GitMerge, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Workflow
} from 'lucide-react';

export const CorporatePillars = ({ onOpenModal }) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillars = [
    {
      id: 'modernizacao-sistemas',
      icon: Cpu,
      title: 'Transformação Digital & Modernização de Sistemas',
      subtitle: 'Expansão de Mercado, Arquitetura & SDLC',
      tag: 'Aumento de Quota de Mercado',
      deliveryFormat: 'Projetos Turnkey & Modernização de Engenharia',
      pain: 'Organizações reféns de sistemas obsoletos, processos analógicos ou plataformas web estáticas que não convertem, perdendo quota de mercado (market share) e relevância comercial para concorrentes digitalmente ágeis.',
      solution: 'Estruturação de raiz do ciclo de vida de desenvolvimento de software (SDLC) e modernização de arquitetura e código. Desenvolvemos ecossistemas digitais de alto rendimento — desde websites institucionais e portais corporativos até aplicações móveis e plataformas SaaS escaláveis — concebidos para expandir a presença digital, aumentar o market share e alinhar diretamente a capacidade técnica às metas de faturação.',
      technologies: ['Plataformas SaaS', 'Web & Mobile Apps', 'Arquitetura Cloud & APIs', 'Modernização de Legados', 'SDLC Ágil', 'DevOps'],
      deliverables: [
        'Diagnóstico e mapeamento do débito técnico e arquitetura',
        'Desenvolvimento de aplicações web, SaaS e mobile de alta escala',
        'Alinhamento direto entre capacidade de entrega e metas de faturação',
        'Documentação técnica, segurança e padrões modernos de código'
      ],
      impactMetric: 'Expansão mensurável de market share e aceleração contínua do ciclo de entrega.',
      badgeColor: 'bg-blue-50 text-[#1557B0] border-blue-200'
    },
    {
      id: 'automacao-processos-ia',
      icon: Bot,
      title: 'Automação de Processos & Inteligência Artificial',
      subtitle: 'Eficiência Operacional & Integração n8n',
      tag: 'Eliminação de Tarefas Manuais',
      deliveryFormat: 'Auditoria de Processos, Pipelines n8n & Rollout de IA',
      pain: 'Equipas afogadas em tarefas manuais, operacionais e repetitivas (passagem manual de dados, relatórios dispersos, atendimento lento e validações manuais), gerando desperdício orçamental, atrasos e erros humanos recorrentes.',
      solution: 'Orquestração avançada de fluxos operacionais com a ferramenta líder de automação n8n, webhooks e integrações de APIs, ligando sistemas legados a ferramentas modernas sem fricção. Incorporamos IA generativa e agentes inteligentes de forma segura na operação e na engenharia (revisões de código assistidas, testes automatizados, triagem inteligente e relatórios preditivos), libertando a sua equipa para atividades estratégicas.',
      technologies: ['n8n Workflow Automation', 'Agentes Autónomos & LLMs', 'OpenAI & Anthropic APIs', 'Webhooks & APIs REST', 'Automação de Testes & CI/CD', 'Python Scripting'],
      deliverables: [
        'Mapeamento detalhado e eliminação de tarefas manuais repetitivas',
        'Desenvolvimento e implementação de esteiras de automação com n8n',
        'Integração segura de agentes de IA generativa em fluxos de trabalho',
        'Monitorização de execução em tempo real e dashboards de desempenho'
      ],
      impactMetric: 'Redução de até 70% no tempo despendido em rotinas manuais e operacionais.',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'governanca-agil',
      icon: GitMerge,
      title: 'Governação Ágil & Métodos de Entrega (SAFe / Scrum / ITIL)',
      subtitle: 'Auditoria, Implementação & Ritos de Engenharia',
      tag: 'Previsibilidade Operacional',
      deliveryFormat: 'Auditoria, Configuração de Ferramentas & Treino',
      pain: 'Prazos de entrega cronicamente violados, falta de visibilidade do progresso real para a administração executiva, atrito constante entre o departamento de negócio e a engenharia, e ausência de processos preditivos padronizados.',
      solution: 'Intervenção estruturada assente em três etapas integradas: Auditoria de Maturidade (identificação de estrangulamentos), Implementação Prática de Ferramentas (configuração de Jira, Azure DevOps e automação de fluxos) e Treino Intensivo de Equipas. Implementamos metodologias consolidadas (SAFe, Scrum e ITIL) suportadas por métricas reais de produtividade (Lead Time, Cycle Time e Throughput), assegurando previsibilidade nas entregas e transparência total para a gestão.',
      technologies: ['SAFe (Scaled Agile)', 'Scrum & Kanban', 'ITIL 4 Framework', 'Jira Software & DevOps', 'Métricas de Fluxo & CFD', 'Gestão de Dependências'],
      deliverables: [
        'Auditoria completa aos processos de entrega e maturidade técnica',
        'Configuração e parametrização profissional de ferramentas (Jira / Azure DevOps)',
        'Treino prático das equipas e líderes em ritos ágeis funcionais',
        'Dashboards executivos com métricas preditivas de produtividade'
      ],
      impactMetric: 'Mais de 90% de previsibilidade nas sprints e transparência executiva total.',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      id: 'capacitacao-lideranca',
      icon: GraduationCap,
      title: 'Capacitação In-Company & Mentoria de Liderança Técnica',
      subtitle: 'In-Company (Presencial) ou Online Executivo',
      tag: 'Up-skilling & Liderança',
      deliveryFormat: 'In-Company (Presencial) ou 100% Online Remoto',
      pain: 'Elevada rotatividade de engenheiros, carência de profissionais seniores no mercado, estagnação técnica de elementos juniores/plenos e líderes técnicos (Tech Leads e Engineering Managers) promovidos sem formação estratégica em gestão, arquitetura e tomada de decisão.',
      solution: 'Programas corporativos intensivos disponíveis em formato In-Company (presencial nas instalações da empresa) ou Online Executivo (sessões remotas síncronas). Desenvolvemos programas práticos de up-skilling para equipas de desenvolvimento (boas práticas, padrões de arquitetura, testes e adoção de IA) e mentoria individual/grupal para lideranças técnicas sobre tomada de decisão arquitetural, gestão de engenharia e interlocução com o conselho de administração.',
      technologies: ['Formato In-Company', 'Formato Online Remoto', 'Up-skilling de Equipas', 'Mentoria Executiva 1:1', 'Engenharia de Software', 'Tomada de Decisão Técnica'],
      deliverables: [
        'Programas de up-skilling técnico desenhados à medida da stack da empresa',
        'Formações presenciais In-Company ou em formato digital remoto',
        'Sessões de mentoria individual para Tech Leads e gestores de engenharia',
        'Avaliação contínua de evolução técnica e planos de carreira de TI'
      ],
      impactMetric: 'Retenção de talento crítico e autonomização das lideranças técnicas.',
      badgeColor: 'bg-purple-50 text-purple-900 border-purple-200'
    }
  ];

  const currentPillar = pillars[activePillarIndex];
  const CurrentIcon = currentPillar.icon;

  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="max-w-3xl space-y-4 mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 text-[#1A73E8] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Portfólio de Soluções Corporativas</span>
          </div>
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left">
            Pilares estratégicos para acelerar a engenharia e os resultados da sua organização.
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Intervenções práticas desenhadas para empresas que necessitam de elevar a maturidade técnica das suas equipas, automatizar fluxos críticos e obter previsibilidade no desenvolvimento de produtos digitais.
          </p>
        </div>

        {/* Barra de Navegação em Abas (Estilo Portfólio de Soluções) */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 bg-slate-200/60 rounded-2xl mb-8 border border-slate-300/70"
          role="tablist"
          aria-label="Selecionar Pilar de Solução Corporativa"
        >
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            const isSelected = activePillarIndex === idx;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarIndex(idx)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#163758] shadow-sm font-bold border border-slate-200 ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-[#163758] hover:bg-white/50 font-medium'
                }`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`pillar-panel-${pillar.id}`}
                id={`pillar-tab-${pillar.id}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-[#1A73E8] text-white' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  <IconComp className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider font-semibold opacity-75">
                    Pilar 0{idx + 1}
                  </span>
                  <span className="block text-xs sm:text-sm truncate font-bold">
                    {pillar.title.split('&')[0].trim()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Painel Central de Apresentação da Solução Ativa (UI Executiva & Portfólio) */}
        <div 
          id={`pillar-panel-${currentPillar.id}`}
          role="tabpanel"
          aria-labelledby={`pillar-tab-${currentPillar.id}`}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-14 transition-all"
        >
          {/* Topo do Painel */}
          <div className="bg-gradient-to-r from-slate-900 to-[#163758] text-white px-6 sm:px-10 py-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#60A5FA] shrink-0">
                <CurrentIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                  {currentPillar.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {currentPillar.title}
                </h3>
              </div>
            </div>

            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-xs">
              {currentPillar.tag}
            </span>
          </div>

          {/* Corpo do Painel: Duas Colunas Estruturadas (Dor vs Solução & Blueprint) */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Coluna Esquerda: Diagnóstico da Dor e Solução Estruturada (7 colunas) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Bloco 1: A Dor do Negócio */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 sm:p-6 text-left">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                  <span>O Desafio do Negócio (A Dor Operacional)</span>
                </div>
                <p className="text-sm sm:text-base text-amber-950 leading-relaxed font-sans text-pretty">
                  {currentPillar.pain}
                </p>
              </div>

              {/* Bloco 2: A Solução de Engenharia */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1557B0] font-bold text-xs uppercase tracking-wider">
                  <Workflow className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>A Engenharia Aplicada (O que Resolvemos)</span>
                </div>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans text-pretty">
                  {currentPillar.solution}
                </p>
              </div>

              {/* Bloco 3: Tecnologias & Ferramentas em Ação */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Tecnologias, Padrões & Ferramentas
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentPillar.technologies.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Coluna Direita: Ficha Técnica, Entregáveis e Diagnóstico (5 colunas) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 text-left">
              
              <div className="space-y-5">
                {/* Formato de Entrega */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Formato de Intervenção
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#163758] border border-slate-200 shadow-2xs">
                    <Building2 className="w-3.5 h-3.5 text-[#1A73E8]" aria-hidden="true" />
                    <span>{currentPillar.deliveryFormat}</span>
                  </div>
                </div>

                {/* Lista de Entregáveis */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Entregáveis Chave
                  </span>
                  <ul className="space-y-2.5">
                    {currentPillar.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155] leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Métrica de Impacto / ROI */}
                <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80 text-left">
                  <div className="flex items-center gap-2 text-[#1557B0] font-bold text-xs uppercase tracking-wider mb-1">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Impacto Estimado</span>
                  </div>
                  <p className="text-xs text-sky-950 font-medium leading-relaxed">
                    {currentPillar.impactMetric}
                  </p>
                </div>
              </div>

              {/* Botão de Diagnóstico Desta Solução */}
              <div className="pt-6 mt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Diagnóstico desta solução</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2 font-sans">
                  Sessão estratégica de avaliação com Alex Seles sem compromisso comercial.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Secção de Acesso Direto aos 4 Pilares (Grelha de Resumo) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-left">
            <h3 className="text-base sm:text-lg font-bold text-[#163758] tracking-tight">
              Visão Geral dos 4 Pilares de Engenharia
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Clique em qualquer pilar para abrir o blueprint completo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              const isCurrent = activePillarIndex === idx;

              return (
                <div 
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between text-left group ${
                    isCurrent 
                      ? 'border-[#1A73E8] shadow-md ring-2 ring-[#1A73E8]/20 bg-blue-50/20' 
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isCurrent ? 'bg-[#1A73E8] text-white' : 'bg-slate-100 text-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white'
                      }`}>
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Pilar 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {pillar.pain}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1557B0]">
                    <span>{isCurrent ? 'Pilar selecionado' : 'Explorar pilar'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

