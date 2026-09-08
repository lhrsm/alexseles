import React from 'react';
import { Link } from 'react-router-dom';

export const CtaSection = () => {
  return (
    <section id="contato" className="py-20 sm:py-28 bg-white text-[#163758] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Cabeçalho da Seção */}
          <div className="lg:col-span-6 space-y-4">
            <span className="eyebrow">
              Dê o Próximo Passo
            </span>
            <h2 className="section-title">
              Preparado para acelerar a sua transição e transformar a sua carreira em TI?
            </h2>
          </div>

          {/* Lado Direito: Descrição e CTA Único */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans">
              Agende uma sessão diagnóstica com <strong>Alex Seles</strong>. Vamos traçar em conjunto o caminho mais rápido e seguro para desbloquear a sua evolução, conquistar cargos de liderança e alcançar o patamar salarial correspondente ao seu valor.
            </p>
            
            <div>
              <Link
                to="/contato?tipo=sessao"
                className="btn-copper inline-flex"
              >
                <span>Vamos Conversar?</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
