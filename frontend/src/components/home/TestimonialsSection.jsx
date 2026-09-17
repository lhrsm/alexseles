import React, { useState } from 'react';
import { Quote, ChevronDown, ChevronUp, CheckCircle, Award, Sparkles } from 'lucide-react';
import sirlaneImg from '../../assets/sirlane.jpg';
import carolinaImg from '../../assets/carolinaughoa.jpeg';

export const TestimonialsSection = () => {
  const [sirlaneExpanded, setSirlaneExpanded] = useState(false);

  return (
    <section 
      id="depoimentos" 
      aria-labelledby="depoimentos-title"
      className="py-16 sm:py-24 bg-white text-[#163758] border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <span className="eyebrow">
            Histórias Reais de Transição
          </span>
          <h2 
            id="depoimentos-title" 
            className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]"
          >
            De outras áreas para posições de destaque em tecnologia.
          </h2>
          <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed font-sans">
            Conheça o percurso de quem decidiu acelerar a sua carreira com a orientação prática e estratégica de Alex Seles.
          </p>
        </div>

        {/* Grelha de Depoimentos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: Sirlane Fernandes */}
          <article className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#1A73E8]/40 hover:shadow-md transition-all duration-300 relative group text-left">
            <div className="space-y-6">
              
              {/* Topo: Autor e Aspas */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img 
                      src={sirlaneImg} 
                      alt="Sirlane Fernandes • Scrum Master" 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-center border-2 border-[#1A73E8]/30 shadow-xs group-hover:border-[#1A73E8] transition-colors"
                      loading="lazy"
                    />
                    <span 
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#1A73E8] text-white flex items-center justify-center text-[10px] shadow-xs" 
                      title="Transição Concluída"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#163758] leading-snug font-sans">
                      Sirlane Fernandes
                    </h3>
                    <p className="text-sm font-semibold text-[#1557B0]">
                      Scrum Master
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#1A73E8] border border-blue-200/70">
                        <Award className="w-3 h-3" />
                        PSM I & PSPO I
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        Transição para TI
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[#1A73E8]/20 shrink-0" aria-hidden="true">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 rotate-180" />
                </div>
              </div>

              {/* Corpo: Depoimento Resumido */}
              <blockquote className="space-y-3 text-sm sm:text-base text-[#475569] leading-relaxed font-sans italic border-l-2 border-[#1A73E8]/40 pl-4">
                <p>
                  “Tive a honra de acompanhar o trabalho do Alex Seles em lives e bootcamps que tiveram um impacto enorme na minha trajetória. Um sonho que parecia impossível foi-se realizando com a orientação de um mestre dedicado, generoso e sincero nos seus apontamentos.”
                </p>
                <p>
                  “Fui orientada a tirar as certificações PSM I e PSPO I, a reformular o meu currículo e a tornar o meu LinkedIn estratégico. Após dedicação e estudo direcionado, alcancei a vaga que almejava como Scrum Master. Mais do que um mentor nesta caminhada, ganhei um amigo para a vida.”
                </p>
              </blockquote>

              {/* Conteúdo Expandido com Dicas e Marcos */}
              {sirlaneExpanded && (
                <div className="pt-4 border-t border-slate-200/70 space-y-4 text-xs sm:text-sm text-[#475569] not-italic">
                  <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200/80">
                    <p className="font-bold text-[#163758] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#1A73E8]" />
                      Momentos decisivos da evolução:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
                      <li>Orientação para obtenção das certificações oficiais PSM I e PSPO I;</li>
                      <li>Participação no bootcamp de UX/UI com aplicação prática premiada no DATATHON;</li>
                      <li>Reformulação estratégica do currículo e perfil no LinkedIn para os filtros ATS;</li>
                      <li>Desenvolvimento cirúrgico das competências exigidas pelo mercado de contratação.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200/80">
                    <p className="font-bold text-[#163758]">
                      Conselhos de Sirlane para quem está a migrar:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
                      <li>Prepare-se com estudos direcionados ao perfil da vaga pretendida;</li>
                      <li>Organize com disciplina a sua vida financeira e familiar;</li>
                      <li>Mantenha a resiliência e não desista nos momentos mais exigentes;</li>
                      <li>Acredite que é viável e faça por onde, porque não basta apenas sonhar.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Botão de Expansão */}
            <div className="pt-5 mt-4 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Mentoria de Transição e Agilidade
              </span>
              <button
                type="button"
                onClick={() => setSirlaneExpanded(!sirlaneExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A73E8] hover:text-[#1557B0] transition-colors cursor-pointer"
              >
                <span>{sirlaneExpanded ? 'Recolher detalhes' : 'Ver marcos e dicas completas'}</span>
                {sirlaneExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </article>

          {/* Card 2: Carolina Uchôa */}
          <article className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#1A73E8]/40 hover:shadow-md transition-all duration-300 relative group text-left">
            <div className="space-y-6">
              
              {/* Topo: Autor e Aspas */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img 
                      src={carolinaImg} 
                      alt="Carolina Uchôa • AI Project Manager" 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-center border-2 border-[#1A73E8]/30 shadow-xs group-hover:border-[#1A73E8] transition-colors"
                      loading="lazy"
                    />
                    <span 
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#1A73E8] text-white flex items-center justify-center text-[10px] shadow-xs" 
                      title="Liderança Tecnológica"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#163758] leading-snug font-sans">
                      Carolina Uchôa
                    </h3>
                    <p className="text-sm font-semibold text-[#1557B0]">
                      AI Project Manager
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/70">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        IA & Gestão de Projetos
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        Mundo Real
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[#1A73E8]/20 shrink-0" aria-hidden="true">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 rotate-180" />
                </div>
              </div>

              {/* Corpo: Testemunho Integral */}
              <blockquote className="space-y-3 text-sm sm:text-base text-[#475569] leading-relaxed font-sans italic border-l-2 border-[#1A73E8]/40 pl-4">
                <p>
                  “Para aqueles que procuram um direcionamento na carreira profissional para a área tecnológica e projetos, o Alex é a escolha ideal. Alex é um profissional muito experiente e compartilha insights valiosos.”
                </p>
                <p>
                  “Os encontros com ele são muito proveitosos e esclarecedores. O que eu acho incrível é que, além da teoria, ele mostra na prática como fazer no mundo real. Definitivamente, um grande mentor.”
                </p>
              </blockquote>

              {/* Destaque Institucional */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1.5 not-italic">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A73E8]">
                  Diferencial Metodológico
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Orientação pragmática focada em Inteligência Artificial aplicada, frameworks ágeis e resolução de desafios reais do ecossistema corporativo.
                </p>
              </div>

            </div>

            {/* Rodapé do Card */}
            <div className="pt-5 mt-4 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Mentoria Executiva em Projetos & IA
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Testemunho Verificado
              </span>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
};
