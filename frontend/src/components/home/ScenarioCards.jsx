import React from 'react';
import { Link } from 'react-router-dom';

export const ScenarioCards = ({ showCta = false, cardBg = 'bg-white' }) => {
  const phases = [
    {
      phaseName: "Fase 01",
      phaseTitle: "Transição Estratégica & Fundamentos Técnicos",
      phaseHours: "8 Horas",
      modules: [
        {
          num: "01",
          hours: "1h",
          badge: "Módulo 01",
          title: "Power Skills: A Tua História Importa",
          description: "Como migrar para TI: primeiros passos, escolhas certeiras e valorização da tua bagagem profissional prévia para ingressares com segurança no mercado."
        },
        {
          num: "02",
          hours: "2h",
          badge: "Módulo 02",
          title: "Fundamentos de Inteligência Artificial no Desenvolvimento de Software e Gestão de Projetos",
          description: "Aplicação prática de ferramentas e fundamentos de IA na condução, estimativas, automação e ganho de produtividade executiva no desenvolvimento de software e projetos de TI."
        },
        {
          num: "03",
          hours: "5h",
          badge: "Módulo 03",
          title: "Fundamentos de Programação e Engenharia de Software",
          description: "Visão técnica abrangente do ciclo de desenvolvimento: UX Design, Engenharia de Requisitos, Frontend, Backend e Testes de Qualidade (QA)."
        }
      ]
    },
    {
      phaseName: "Fase 02",
      phaseTitle: "Governação, Produto & Métodos de Entrega",
      phaseHours: "10 Horas",
      modules: [
        {
          num: "04",
          hours: "3h",
          badge: "Módulo 04",
          title: "Segurança da Informação, Engenharia Social, DPO & RGPD/LGPD",
          description: "Proteção contra ameaças digitais e engenharia social, atribuições do DPO (Data Protection Officer) e conformidade regulatória com o RGPD e a LGPD."
        },
        {
          num: "05",
          hours: "2h",
          badge: "Módulo 05",
          title: "Design Thinking Aplicado ao Desenvolvimento de Software",
          description: "Abordagem prática centrada no utilizador para ideação ágil, prototipagem rápida e resolução criativa de problemas complexos de tecnologia."
        },
        {
          num: "06",
          hours: "2h",
          badge: "Módulo 06",
          title: "Metodologias Preditivas (Waterfall)",
          description: "Gestão estruturada de projetos: planeamento de âmbito e escopo, elaboração de cronogramas, custos, gestão de riscos e marcos de entrega."
        },
        {
          num: "07",
          hours: "3h",
          badge: "Módulo 07",
          title: "Metodologias Ágeis (Scrum & Kanban)",
          description: "Frameworks modernos de agilidade: papéis, cerimónias ágeis, gestão de sprints, visibilidade de fluxo contínuo com Kanban e liderança de equipas de TI."
        }
      ]
    },
    {
      phaseName: "Fase 03",
      phaseTitle: "Posicionamento no Mercado - Seja Encontrado por Recrutadores",
      phaseHours: "4 Horas",
      modules: [
        {
          num: "08",
          hours: "2h",
          badge: "Módulo 08",
          title: "Criação de Currículo Otimizado para ATS",
          description: "Formatação estratégica e mapeamento de palavras-chave direcionadas para aprovação nos algoritmos dos sistemas de triagem das empresas."
        },
        {
          num: "09",
          hours: "2h",
          badge: "Módulo 09",
          title: "LinkedIn Estratégico & 1.ª Oportunidade em Gestão de TI",
          description: "Posicionamento de perfil para ser encontrado por recrutadores e plano de ação tático para conquistar a sua primeira vaga em gestão de tecnologia."
        }
      ]
    }
  ];

  return (
    <div className="relative">
      {/* Linha Guia Vertical Sobria */}
      <div 
        className="absolute left-4 sm:left-5 top-4 bottom-24 w-[2px] bg-slate-200"
        aria-hidden="true"
      />

          {phases.map((phase, pIdx) => (
            <div key={pIdx} className="mb-12 relative">
              
              {/* Marcador de Fase */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 relative z-10">
                <div className="w-8 sm:w-10 flex justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#1A73E8] ring-4 ring-blue-100" />
                </div>
                
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-bold text-[#1557B0] uppercase tracking-wider">
                    {phase.phaseName}
                  </span>
                  <span className="text-slate-300 font-light">•</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#163758] font-sans">
                    {phase.phaseTitle}
                  </h3>
                  <span className="text-xs font-medium text-slate-400">
                    ({phase.phaseHours})
                  </span>
                </div>
              </div>

              {/* Módulos da Fase */}
              <div className="space-y-4">
                {phase.modules.map((mod) => (
                  <div 
                    key={mod.num}
                    className="relative flex items-start group"
                  >
                    {/* Nó Numérico na Linha */}
                    <div className="w-8 sm:w-10 flex justify-center shrink-0 pt-4 z-10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center shadow-xs group-hover:border-[#1A73E8] group-hover:text-[#1A73E8] group-hover:bg-blue-50/50 transition-colors">
                        {mod.num}
                      </div>
                    </div>

                    {/* Card do Módulo */}
                    <div className="flex-1 ml-3 sm:ml-4">
                      <div className={`${cardBg} rounded-lg border border-slate-200 p-5 sm:p-6 hover:border-[#1A73E8]/60 hover:shadow-xs transition-all duration-150`}>
                        
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            {mod.badge}
                          </span>
                          <span className="text-xs font-bold text-[#1557B0] bg-blue-50 px-2.5 py-0.5 rounded">
                            {mod.hours}
                          </span>
                        </div>

                        <h4 className="font-sans text-base sm:text-lg font-bold text-[#163758] mb-2 leading-snug">
                          {mod.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">
                          {mod.description}
                        </p>

                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

          {/* MARCO FINAL / BÓNUS EXCLUSIVO */}
          <div className="relative pt-2">
            
            <div className="flex items-center gap-3 sm:gap-4 mb-4 relative z-10">
              <div className="w-8 sm:w-10 flex justify-center shrink-0">
                <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Etapa de Conclusão
                </span>
                <span className="text-slate-300 font-light">•</span>
                <span className="text-xs font-medium text-slate-400">
                  Bónus Incluído
                </span>
              </div>
            </div>

            <div className="ml-11 sm:ml-14">
              <div className={`${cardBg} rounded-lg border-2 border-slate-200 p-6 sm:p-7 relative`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded">
                    Bónus Exclusivo
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Certificação Internacional
                  </span>
                </div>

                <h4 className="font-sans text-lg sm:text-xl font-bold text-[#163758] mb-2">
                  Simulado para Certificação Scrum Master & Product Owner
                </h4>

                <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans mb-5">
                  Preparação direcionada com questões práticas comentadas e simulações de cenários reais para aprovação nos exames de certificação mais requisitados pelo mercado (PSM I / PSPO I).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs font-medium text-[#163758]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Questões Reais Comentadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Estratégia de Aprovação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Feedback do Alex Seles</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Chamada para Ação Final */}
          {showCta && (
            <div className="mt-14 pt-8 border-t border-slate-200/80 text-center">
              <Link
                to="/contato?tipo=modulo&modulo=trilha_completa"
                className="btn-copper py-3.5 px-8 text-sm font-semibold shadow-md inline-flex items-center gap-2"
              >
                <span>Garantir a Minha Vaga na Mentoria</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
  );
};
