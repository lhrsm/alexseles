import React, { useState } from 'react';
import { PreQualificationModal } from '../pre-qualification';

export const CtaSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          {/* Lado Direito: Descrição e Botão de Pré-Qualificação */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans">
              Submeta a sua pré-qualificação confidencial com <strong>Alex Seles</strong>. Avaliamos a sua trajetória profissional, maturidade técnica e metas para direcionar os passos práticos do seu reposicionamento.
            </p>
            
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn-copper inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Acelerar a Minha Carreira</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <PreQualificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
