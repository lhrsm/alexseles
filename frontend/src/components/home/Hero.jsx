import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section 
      id="acelerar-carreira"
      className="relative bg-[#F8FAFC] text-[#163758] pt-8 sm:pt-10 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-200/80"
      aria-labelledby="hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          
          <div className="space-y-6">
            {/* Título ao lado esquerdo */}
            <h2 
              id="hero-title"
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight uppercase text-[#163758] leading-tight space-y-1.5 sm:space-y-2 text-left"
            >
              <span className="block">Estagnado na carreira?</span>
              <span className="block text-[#1557B0]">Perdido na transição para TI?</span>
              <span className="block">Acumula cursos sem concluir?</span>
            </h2>

            {/* Frase / Citação Oficial de Alex Seles ao lado esquerdo */}
            <div className="border-l-4 border-[#1A73E8] pl-5 sm:pl-6 py-3 my-6 text-left bg-white/80 rounded-r-xl border border-l-4 border-slate-200/70 shadow-xs">
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-sans italic">
                “Recomeçar é sempre um desafio, mas não é impossível. Se fores para uma área diferente da tua formação, o esforço será maior, mas é perfeitamente possível migrar para qualquer área que queiras. Com a minha mentoria, a tua transição será acelerada.”
              </p>
              <p className="text-sm font-bold text-[#163758] mt-2.5 not-italic font-sans">
                — Alex Seles
              </p>
            </div>

            {/* CTA abaixo do título e frase */}
            <div className="pt-2 text-left">
              <Link
                to="/contato?tipo=sessao"
                className="btn-copper shadow-md hover:shadow-lg text-sm sm:text-base font-semibold py-3.5 px-8 inline-flex items-center gap-2"
              >
                <span>Acelerar a Minha Carreira</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
