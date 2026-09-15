import React from 'react';
import { Cpu, Bot, GitMerge, GraduationCap } from 'lucide-react';

export const CorporatePillars = ({ onOpenModal }) => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Transformação Digital & Modernização de Sistemas',
      tag: 'Arquitetura & SDLC',
      description: 'Estruturação do ciclo de vida de desenvolvimento de software (SDLC), modernização de código e arquitetura, e alinhamento direto entre equipas de tecnologia e metas de faturação.'
    },
    {
      icon: Bot,
      title: 'Automação de Processos & Inteligência Artificial',
      tag: 'Eficiência Operacional',
      description: 'Adoção segura e prática de IA generativa na engenharia (code reviews, testes automatizados e refactoring), reduzindo tarefas manuais e acelerando o time-to-market.'
    },
    {
      icon: GitMerge,
      title: 'Governação Ágil & Métodos de Entrega (SAFe / Scrum / ITIL)',
      tag: 'Previsibilidade',
      description: 'Implementação de processos ágeis e preditivos consolidados, com métricas reais de produtividade (lead time, cycle time) e transparência absoluta para a administração.'
    },
    {
      icon: GraduationCap,
      title: 'Capacitação In-Company & Mentoria de Liderança Técnica',
      tag: 'Pessoas & Retenção',
      description: 'Programas acelerados de up-skilling para juniores e plenos, e sessões individuais de mentoria para Tech Leads e Engineering Managers sobre tomada de decisão e gestão técnica.'
    }
  ];

  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-white text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="max-w-3xl space-y-4 mb-16 text-left">
          <span className="eyebrow">
            Soluções Corporativas
          </span>
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]">
            Pilares estratégicos para acelerar a engenharia e os resultados da sua organização.
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans">
            Intervenções práticas desenhadas para empresas que necessitam de elevar a maturidade técnica das suas equipas, automatizar fluxos críticos e obter previsibilidade no desenvolvimento de produtos digitais.
          </p>
        </div>

        {/* Grelha de Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-7 sm:p-8 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#1A73E8] flex items-center justify-center group-hover:bg-[#1A73E8] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-200/70 text-slate-700">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                {onOpenModal && (
                  <div className="pt-6 border-t border-slate-200/60 mt-6">
                    <button
                      type="button"
                      onClick={onOpenModal}
                      className="text-xs font-bold uppercase tracking-wider text-[#1557B0] hover:text-[#1A73E8] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Diagnóstico desta solução</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
