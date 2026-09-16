import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { casesData } from '../../data/casesData';

export const CorporatePillars = () => {
  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção (Padrão Branco & Cinzento Corporativo) */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans block">
            Casos de Sucesso
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left font-sans">
            Histórias de sucesso
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Dos desafios dos clientes aos resultados excecionais.
          </p>
        </div>

        {/* Grelha de 2 em 2: Cartões Lado a Lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {casesData.map((item) => (
            <Link
              key={item.id}
              to={`/casos-de-sucesso/${item.slug}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#1A73E8]/50 transition-all duration-300 p-6 sm:p-8 flex flex-col sm:flex-row items-stretch justify-between gap-6 sm:gap-8 group block text-inherit hover:no-underline cursor-pointer"
              aria-label={`Saber mais sobre o caso de sucesso de ${item.client}`}
            >
              {/* Coluna Esquerda: Logótipo, Chamada de Impacto e Botão Outline */}
              <div className="flex-1 flex flex-col justify-between text-left space-y-4">
                <div>
                  {/* Logótipo ao invés do nome em texto */}
                  <div className="h-10 sm:h-12 flex items-center mb-3">
                    <img 
                      src={item.logo} 
                      alt={item.client} 
                      className="max-h-9 sm:max-h-11 max-w-[160px] w-auto object-contain object-left transition-transform duration-300 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>

                  {/* Chamada de Alto Impacto */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug font-sans text-pretty">
                    {item.cardHeadline}
                  </h3>
                </div>

                {/* Botão Saber mais em estilo Outline com Seta */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1A73E8] text-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs group/btn">
                    <span>Saber mais</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Coluna Direita: Moldura Limpa para Imagem (Sem Telemóvel) */}
              <div className="w-full sm:w-[200px] md:w-[230px] shrink-0 flex items-center justify-center">
                <div className="w-full aspect-[4/3] sm:aspect-square rounded-xl border border-slate-200/90 bg-slate-50 overflow-hidden shadow-2xs group-hover:border-[#1A73E8]/40 transition-all flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};


