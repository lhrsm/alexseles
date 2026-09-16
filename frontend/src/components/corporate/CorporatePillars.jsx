import React from 'react';
import { ArrowRight } from 'lucide-react';
import iefpLogo from '../../assets/clients/iefp.png';
import arteLogo from '../../assets/clients/arte.svg';
import netforceLogo from '../../assets/clients/netforce.svg';
import tivitLogo from '../../assets/clients/tivit.svg';

export const CorporatePillars = ({ onOpenModal }) => {
  const loremText = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  ];

  const pillars = [
    {
      id: 'iefp',
      logo: iefpLogo,
      title: 'IEFP',
      paragraphs: loremText
    },
    {
      id: 'arte',
      logo: arteLogo,
      title: 'ARTE',
      paragraphs: loremText
    },
    {
      id: 'netforce',
      logo: netforceLogo,
      title: 'Netforce',
      paragraphs: loremText
    },
    {
      id: 'tivit',
      logo: tivitLogo,
      title: 'TIVIT',
      paragraphs: loremText
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

        {/* Lista Vertical de Soluções (Um abaixo do outro, sem imagens, sem badges e sem numeração) */}
        <div className="flex flex-col gap-6">
          {pillars.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#1A73E8]/50 transition-all duration-300 p-6 sm:p-8 text-left group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
                  
                  {/* Bloco Principal: Logótipo + Título + Descrição Lorem Ipsum */}
                  <div className="flex items-start gap-4 sm:gap-5 flex-1">
                    {/* Logótipo do Cliente / Case */}
                    <div className="w-16 h-16 sm:w-20 sm:h-16 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 shrink-0 group-hover:border-[#1A73E8]/40 transition-all duration-300 mt-1">
                      <img 
                        src={item.logo} 
                        alt={item.title} 
                        className="max-h-10 sm:max-h-11 max-w-full object-contain" 
                        loading="lazy"
                      />
                    </div>

                    <div className="space-y-3 flex-1">
                      {/* Título com Nome do Cliente */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Descrição em Lorem Ipsum */}
                      <div className="space-y-2.5 text-sm sm:text-base text-[#475569] leading-relaxed font-sans text-pretty max-w-4xl">
                        {item.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ação: Botão Outline para Solicitar Diagnóstico */}
                  <div className="lg:self-center shrink-0 pt-3 lg:pt-0 border-t border-slate-100 lg:border-t-0">
                    <button
                      type="button"
                      onClick={() => onOpenModal && onOpenModal(item)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs group/btn"
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

