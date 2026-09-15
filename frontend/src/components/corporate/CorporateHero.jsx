import React from 'react';

export const CorporateHero = ({ onOpenModal }) => {
  return (
    <section 
      id="diagnostico-corporativo"
      className="relative bg-[#F8FAFC] text-[#163758] pt-8 sm:pt-10 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-200/80"
      aria-labelledby="corporate-hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          
          <div className="space-y-6">
            {/* Título ao lado esquerdo com mesmo design da Home */}
            <h2 
              id="corporate-hero-title"
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight uppercase text-[#163758] leading-tight space-y-1.5 sm:space-y-2 text-left"
            >
              <span className="block">Equipas de tecnologia sobrecarregadas?</span>
              <span className="block text-[#1557B0]">Processos manuais a travar o crescimento?</span>
              <span className="block">Dificuldade em adotar IA e modernizar sistemas?</span>
            </h2>

            {/* Frase / Citação Oficial de Alex Seles para Empresas */}
            <div className="border-l-4 border-[#1A73E8] pl-5 sm:pl-6 py-3 my-6 text-left bg-white/80 rounded-r-xl border border-l-4 border-slate-200/70 shadow-xs">
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-sans italic">
                “O maior custo de uma organização de tecnologia não é investir em inovação, é o tempo e a faturação perdidos com processos obsoletos, débitos técnicos e equipas sem metodologia clara. Acelerar a maturidade digital e operacional da tua organização é a rota mais direta para eficiência, retenção de talentos e previsibilidade de escala.”
              </p>
              <p className="text-sm font-bold text-[#163758] mt-2.5 not-italic font-sans">
                — Alex Seles
              </p>
            </div>

            {/* CTA abaixo do título e frase */}
            <div className="pt-2 text-left">
              <button
                type="button"
                onClick={onOpenModal}
                className="btn-copper shadow-md hover:shadow-lg text-sm sm:text-base font-semibold py-3.5 px-8 inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Solicitar Diagnóstico para a Minha Empresa</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
