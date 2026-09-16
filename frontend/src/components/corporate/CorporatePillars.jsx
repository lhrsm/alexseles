import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Bot, 
  GitMerge, 
  GraduationCap 
} from 'lucide-react';

export const CorporatePillars = ({ onOpenModal }) => {
  const pillars = [
    {
      id: 'transformacao-digital-sdlc',
      icon: Cpu,
      title: 'Transformação Digital, Design UX/UI & Modernização de Sistemas',
      summary: 'Product Discovery e Design UX/UI centrado no utilizador, prototipagem ágil (PoC/MVP), acessibilidade (normas WCAG) e modernização de arquiteturas legadas para escalar a presença digital e a faturação.',
      tags: ['Design UX/UI', 'Product Discovery & MVP', 'Modernização de Legados', 'Acessibilidade WCAG']
    },
    {
      id: 'automacao-processos-ia',
      icon: Bot,
      title: 'Automação de Processos & Inteligência Artificial',
      summary: 'Eliminação de rotinas manuais com orquestração avançada n8n, webhooks e integração prática de agentes inteligentes e IA generativa na engenharia e operações.',
      tags: ['Orquestração n8n', 'Agentes Autónomos & LLMs', 'Integração de APIs', 'Automação CI/CD']
    },
    {
      id: 'governanca-agil-metodos',
      icon: GitMerge,
      title: 'Governação de Entregas & Metodologias (Ágil, Híbrido e Preditivo)',
      summary: 'Auditoria completa à maturidade técnica, implementação e treino em metodologias ágeis, híbridas ou preditivas (SAFe, Scrum, ITIL) e aplicação prática de ferramentas (Jira, Azure DevOps).',
      tags: ['Auditoria de Maturidade', 'Metodologias Ágeis, Híbridas & Preditivas', 'Jira & Azure DevOps', 'Treino de Metodologias']
    },
    {
      id: 'capacitacao-lideranca',
      icon: GraduationCap,
      title: 'Skill-Up Técnico In-Company & Mentoria de Liderança',
      summary: 'Programa intensivo In-Company de Skill-Up e aceleração técnica para equipas de desenvolvimento e mentoria executiva 1:1 para Tech Leads sobre arquitetura e tomada de decisão.',
      tags: ['Skill-Up Técnico', 'Programa Intensivo In-Company', 'Mentoria 1:1 Tech Leads', 'Presencial ou Remoto']
    }
  ];

  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Cabeçalho da Secção de Soluções */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans block">
            Áreas de Atuação
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left font-sans">
            Soluções e Serviços de Engenharia
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Intervenções especializadas para empresas que necessitam de elevar a maturidade técnica das suas equipas, automatizar fluxos críticos e obter previsibilidade no desenvolvimento de software.
          </p>
        </div>

        {/* Lista Vertical de Soluções (Um abaixo do outro, sem imagens, sem badges) */}
        <div className="flex flex-col gap-6">
          {pillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#1A73E8]/50 transition-all duration-300 p-6 sm:p-8 text-left group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  
                  {/* Bloco Principal: Ícone + Título com Índice + Descrição + Tags */}
                  <div className="flex items-start gap-4 sm:gap-5 flex-1">
                    {/* Ícone da Solução */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A73E8] shrink-0 group-hover:bg-[#1A73E8] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <div className="space-y-2 flex-1">
                      {/* Índice Numérico e Título */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#1A73E8] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded-md shrink-0">
                          {`0${index + 1}`}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      {/* Descrição Executiva */}
                      <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans text-pretty max-w-4xl">
                        {item.summary}
                      </p>

                      {/* Pills de Especialidade */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ação: Botão / Link para Solicitar Diagnóstico */}
                  <div className="lg:self-center shrink-0 pt-3 lg:pt-0 border-t border-slate-100 lg:border-t-0">
                    <button
                      type="button"
                      onClick={() => onOpenModal && onOpenModal(item)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-50 hover:bg-[#1A73E8] text-[#1A73E8] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-100 shadow-2xs hover:shadow-md group/btn"
                    >
                      <span>Solicitar Diagnóstico</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

