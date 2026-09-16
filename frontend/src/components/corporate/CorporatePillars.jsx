import React from 'react';
import { Link } from 'react-router-dom';
import { casesData } from '../../data/casesData';

export const CorporatePillars = () => {
  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#0B131E] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção (Inspirado no Benchmarking) */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight text-left font-sans">
            As nossas histórias de sucesso
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans text-pretty text-left">
            Dos desafios dos nossos clientes nascem soluções de excelência.
          </p>
        </div>

        {/* Grelha de 2 em 2 com frases grandes e espaço dedicado para imagem/mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {casesData.map((item) => (
            <Link
              key={item.id}
              to={`/casos-de-sucesso/${item.slug}`}
              className={`relative overflow-hidden rounded-3xl p-8 sm:p-10 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl group block text-inherit hover:no-underline cursor-pointer ${item.cardBg} ${item.textContrast}`}
              aria-label={`Saber mais sobre o caso de sucesso de ${item.client}`}
            >
              {/* Coluna de Conteúdo (Lado Esquerdo) */}
              <div className="w-full sm:w-[58%] z-10 flex flex-col justify-between h-full space-y-6 text-left">
                <div className="space-y-4">
                  {/* Nome do Cliente */}
                  <span className="text-base sm:text-lg font-bold tracking-tight block opacity-95 font-sans">
                    {item.client}
                  </span>

                  {/* Frase / Chamada Grande de Alto Impacto */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold leading-[1.18] tracking-tight font-sans text-pretty">
                    {item.cardHeadline}
                  </h3>
                </div>

                {/* Botão Sabe mais (Pílula Branca arredondada como no benchmarking) */}
                <div className="pt-2">
                  <span 
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                    style={{ color: item.cardTextColor || '#163758' }}
                  >
                    Sabe mais
                  </span>
                </div>
              </div>

              {/* Espaço para a Imagem / Mockup de Smartphone (Lado Direito) */}
              <div className="absolute right-2 sm:right-6 -bottom-6 sm:-bottom-8 w-[44%] sm:w-[45%] max-w-[240px] sm:max-w-[280px] pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
                <div className="relative rounded-t-[34px] rounded-b-xl border-[6px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden aspect-[9/16]">
                  {/* Barra de Status do Telefone */}
                  <div className="absolute top-0 inset-x-0 h-5 bg-slate-900/90 z-20 flex items-center justify-between px-3 text-[9px] text-white">
                    <span className="font-semibold">12:04</span>
                    <div className="w-12 h-3 bg-black rounded-full" />
                    <span className="text-[8px] opacity-80">5G</span>
                  </div>

                  {/* Imagem do Case no ecrã do telemóvel */}
                  <img 
                    src={item.image} 
                    alt={item.client}
                    className="w-full h-full object-cover pt-4" 
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


