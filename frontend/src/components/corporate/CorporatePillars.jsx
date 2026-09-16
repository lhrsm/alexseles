import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { casesData } from '../../data/casesData';

export const CorporatePillars = () => {
  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans block">
            Casos de Sucesso & Soluções
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left font-sans">
            Soluções e Serviços de Engenharia
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Dos desafios dos clientes nascem soluções de excelência. Intervenções especializadas para empresas que necessitam de elevar a maturidade técnica das suas equipas e obter previsibilidade no desenvolvimento de software.
          </p>
        </div>

        {/* Grelha de Cards de Sucesso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {casesData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#1A73E8]/50 transition-all duration-300 p-6 flex flex-col justify-between text-center group"
            >
              <Link 
                to={`/casos-de-sucesso/${item.slug}`}
                className="block text-inherit hover:no-underline focus:outline-none focus:ring-2 focus:ring-[#1A73E8] rounded-lg"
                aria-label={`Saber mais sobre o caso de sucesso de ${item.client}`}
              >
                {/* Logo grande e ao meio, sem background cinzento */}
                <div className="flex items-center justify-center h-20 sm:h-24 w-full p-2 mb-4">
                  <img 
                    src={item.logo} 
                    alt={item.client} 
                    className="max-h-12 sm:max-h-14 max-w-[170px] w-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>

                {/* Nome do Cliente */}
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8] block mb-2 font-sans">
                  {item.client}
                </span>

                {/* Chamada única de impacto no lugar do título (sem subtítulo) */}
                <h3 className="text-sm sm:text-base font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-relaxed mb-6 font-sans text-pretty min-h-[72px] flex items-center justify-center">
                  {item.cardHeadline}
                </h3>
              </Link>

              {/* Botão Saber mais */}
              <Link
                to={`/casos-de-sucesso/${item.slug}`}
                className="w-full py-2.5 px-4 rounded-lg border border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs group/btn mt-auto text-center"
              >
                <span>Saber mais</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


