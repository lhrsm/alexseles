import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Workflow, 
  Cpu, 
  Bot, 
  GitMerge, 
  GraduationCap 
} from 'lucide-react';
import modernizacaoImg from '../../assets/corporate/solucao-modernizacao.jpg';
import automacaoIaImg from '../../assets/corporate/solucao-automacao-ia.jpg';
import governancaAgilImg from '../../assets/corporate/solucao-governanca-agil.jpg';
import capacitacaoLiderancaImg from '../../assets/corporate/solucao-capacitacao-lideranca.jpg';

export const CorporatePillars = ({ onOpenModal }) => {
  const [selectedPillar, setSelectedPillar] = useState(null);

  const pillars = [
    {
      id: 'transformacao-digital-sdlc',
      image: modernizacaoImg,
      icon: Cpu,
      badge: 'Discovery & Modernização',
      title: 'Transformação Digital & Modernização de Sistemas',
      summary: 'Modernização de arquiteturas legadas, acessibilidade digital (normas WCAG) e aceleração do SDLC para expansão de quota de mercado.',
      comment: 'Iniciamos com Product Discovery e Design Thinking para mapear necessidades reais e validamos hipóteses com Protótipos, PoC e MVP ágil. Desenvolvemos ecossistemas acessíveis (normas WCAG), modernizamos sistemas legados e estruturamos o SDLC para expandir a sua presença digital, market share e faturação.',
      pain: 'Organizações reféns de sistemas obsoletos, processos analógicos ou plataformas web estáticas que não convertem, desenvolvendo software sem pesquisa prévia de utilizadores, sem acessibilidade digital e sem prototipagem, resultando em desperdício orçamental, baixa adoção e perda diária de quota de mercado.',
      solution: 'Abordagem ponta a ponta: Product Discovery e Design Thinking; Protótipos navegáveis, PoCs técnicas e MVPs ágeis para mitigação de risco; Acessibilidade Digital plena (WCAG / a11y), arquitetura moderna de software e estruturação do SDLC, conectando a capacidade técnica a metas de faturação.',
      technologies: ['Design Thinking & Discovery', 'Protótipos Navegáveis', 'PoC & MVP Ágil', 'Acessibilidade (WCAG / a11y)', 'Plataformas SaaS & Apps', 'Modernização de Legados & SDLC'],
      deliverables: [
        'Imersão em Design Thinking, Product Discovery e pesquisa com utilizadores',
        'Construção de Protótipos navegáveis, PoCs de viabilidade e MVPs ágeis',
        'Desenvolvimento inclusivo com conformidade de Acessibilidade (normas WCAG)',
        'Estruturação moderna de SDLC, arquitetura escalável e alinhamento a metas de faturação'
      ],
      impact: 'Mitigação total de risco com MVP/PoC, conformidade de acessibilidade e expansão de market share.'
    },
    {
      id: 'automacao-processos-ia',
      image: automacaoIaImg,
      icon: Bot,
      badge: 'Automação & IA',
      title: 'Automação de Processos & Inteligência Artificial',
      summary: 'Eliminação de rotinas manuais com n8n, webhooks e integração prática de agentes inteligentes e IA generativa na engenharia e operações.',
      comment: 'Eliminamos rotinas manuais e operacionais repetitivas orquestrando fluxos avançados com n8n, webhooks e integrações de APIs. Incorporamos Inteligência Artificial generativa e agentes inteligentes de forma segura no atendimento, na análise de dados e na engenharia, acelerando o seu time-to-market.',
      pain: 'Equipas afogadas em tarefas manuais, operacionais e repetitivas (passagem manual de dados, relatórios dispersos, atendimento lento e validações manuais), gerando custos excessivos, lentidão e erros humanos recorrentes.',
      solution: 'Orquestração avançada de processos com n8n, webhooks e integrações de APIs conectando sistemas legados a ferramentas modernas sem atrito. Adoção prática de IA generativa e agentes inteligentes na operação e na engenharia (code reviews, testes automatizados, triagem e relatórios), eliminando tarefas manuais.',
      technologies: ['n8n Workflow Automation', 'Agentes Autónomos & LLMs', 'OpenAI & Anthropic APIs', 'Webhooks & APIs REST', 'Automação de Testes & CI/CD', 'Python Scripting'],
      deliverables: [
        'Mapeamento detalhado e eliminação de tarefas manuais repetitivas',
        'Desenvolvimento e implementação de esteiras de automação com n8n',
        'Integração segura de agentes de IA generativa em fluxos de trabalho',
        'Monitorização de execução em tempo real e dashboards de desempenho'
      ],
      impact: 'Redução de até 70% no tempo despendido em tarefas operacionais e rotinas manuais.'
    },
    {
      id: 'governanca-agil-metodos',
      image: governancaAgilImg,
      icon: GitMerge,
      badge: 'Governação & Agilidade',
      title: 'Governação Ágil & Métodos de Entrega (SAFe / Scrum / ITIL)',
      summary: 'Auditoria de maturidade técnica, implementação de Jira/DevOps e treino prático em métodos ágeis com métricas reais de produtividade.',
      comment: 'Auditoria completa à maturidade técnica, implementação prática de ferramentas (Jira / Azure DevOps) e treino intensivo das equipas em métodos ágeis consolidados (SAFe, Scrum e ITIL). Métricas reais de produtividade (Lead Time, Cycle Time) e transparência absoluta para a administração.',
      pain: 'Prazos de entrega sistematicamente ultrapassados, ausência de visibilidade para a administração executiva, atrito constante entre o negócio e a engenharia, e falta de processos padronizados.',
      solution: 'Intervenção estruturada em três etapas: Auditoria de Maturidade (estrangulamentos), Implementação Prática de Ferramentas (Jira, Azure DevOps e automação de fluxos) e Treino Intensivo de Equipas (SAFe, Scrum e ITIL), com métricas reais de produtividade e transparência para a gestão.',
      technologies: ['SAFe (Scaled Agile)', 'Scrum & Kanban', 'ITIL 4 Framework', 'Jira Software & DevOps', 'Métricas de Fluxo & CFD', 'Gestão de Dependências'],
      deliverables: [
        'Auditoria completa aos processos de entrega e maturidade técnica',
        'Configuração e parametrização profissional de ferramentas (Jira / Azure DevOps)',
        'Treino prático das equipas e líderes em ritos ágeis funcionais',
        'Dashboards executivos com métricas preditivas de produtividade'
      ],
      impact: 'Mais de 90% de previsibilidade nas sprints e transparência executiva total.'
    },
    {
      id: 'capacitacao-lideranca',
      image: capacitacaoLiderancaImg,
      icon: GraduationCap,
      badge: 'In-Company & Mentoria',
      title: 'Capacitação In-Company & Mentoria de Liderança Técnica',
      summary: 'Programas intensivos de up-skilling técnico para equipas e mentoria executiva 1:1 para líderes sobre arquitetura e tomada de decisão.',
      comment: 'Programas acelerados de up-skilling técnico para equipas de desenvolvimento e sessões de mentoria executiva 1:1 para Tech Leads e gestores sobre arquitetura, governança e tomada de decisão. Formações disponíveis em formato presencial In-Company ou 100% online remoto.',
      pain: 'Elevada rotatividade de engenheiros, carência de profissionais seniores no mercado, estagnação técnica de programadores juniores/plenos e líderes técnicos promovidos sem formação estratégica em gestão e tomada de decisão.',
      solution: 'Programas corporativos intensivos em formato In-Company (presencial) ou Online Executivo (remoto). Programas práticos de up-skilling técnico para equipas (código limpo, arquitetura, testes e IA) e mentoria individual/grupal para lideranças sobre tomada de decisão técnica e gestão de engenharia.',
      technologies: ['Formato In-Company', 'Formato Online Remoto', 'Up-skilling de Equipas', 'Mentoria Executiva 1:1', 'Engenharia de Software', 'Tomada de Decisão Técnica'],
      deliverables: [
        'Programas de up-skilling técnico desenhados à medida da stack da empresa',
        'Formações presenciais In-Company ou em formato digital remoto',
        'Sessões de mentoria individual para Tech Leads e gestores de engenharia',
        'Avaliação contínua de evolução técnica e planos de carreira de TI'
      ],
      impact: 'Retenção de talento crítico e autonomização das lideranças técnicas.'
    }
  ];

  const handleOpenDiagnosis = (pillar) => {
    setSelectedPillar(null);
    if (onOpenModal) {
      onOpenModal(pillar);
    }
  };

  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção: Estilo Editorial & Consultoria Executiva */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-14 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left font-sans">
            Soluções e Serviços
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Intervenções estratégicas para modernizar sistemas, automatizar operações com IA e garantir previsibilidade na engenharia de software.
          </p>
        </div>

        {/* Grelha de Soluções Estilo Capgemini (4 Cartões com Imagem e Hierarquia Limpa) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {pillars.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPillar(item)}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer hover:-translate-y-1 text-left"
            >
              <div>
                {/* Imagem Temática no Topo com Zoom Suave */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#163758]/50 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
                </div>

                {/* Corpo do Cartão: Título Forte + Resumo */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Rodapé do Cartão com Link Elegante e Seta Animada */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#1A73E8] group-hover:text-[#1557B0]">
                  <span>Explorar solução</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Limpa de Detalhes da Solução (Estilo Mais Quadrado e Corporativo) */}
        {selectedPillar && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pillar-modal-title"
          >
            <div className="bg-white w-full max-w-2xl rounded-xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-left">
              
              {/* Header da Modal com Ícone e Título */}
              <div className="bg-slate-900 text-white p-6 sm:p-7 flex items-start justify-between gap-4 shrink-0 border-b border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 text-[#60A5FA] border border-white/20 flex items-center justify-center shrink-0">
                    {React.createElement(selectedPillar.icon, { className: "w-6 h-6", "aria-hidden": "true" })}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#93C5FD]">
                      {selectedPillar.badge}
                    </span>
                    <h3 id="pillar-modal-title" className="text-xl sm:text-2xl font-extrabold leading-tight text-white mt-1">
                      {selectedPillar.title}
                    </h3>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setSelectedPillar(null)}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shrink-0"
                  aria-label="Fechar detalhes"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Conteúdo com Scroll Suave */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 font-sans">
                
                {/* Desafio / A Dor */}
                <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>O Desafio do Negócio (A Dor)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    {selectedPillar.pain}
                  </p>
                </div>

                {/* A Solução */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#1557B0] font-bold text-xs uppercase tracking-wider">
                    <Workflow className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>A Engenharia Aplicada (O que Resolvemos)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {selectedPillar.solution}
                  </p>
                </div>

                {/* Tecnologias */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Tecnologias & Metodologias
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPillar.technologies.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Entregáveis */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Entregáveis Chave
                  </span>
                  <ul className="space-y-2">
                    {selectedPillar.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                        <CheckCircle2 className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Rodapé da Modal com Botão para Diagnóstico */}
              <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedPillar(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase text-slate-600 hover:text-slate-900 transition-colors cursor-pointer rounded-lg border border-slate-300 bg-white"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenDiagnosis(selectedPillar)}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Solicitar Diagnóstico Desta Solução</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

