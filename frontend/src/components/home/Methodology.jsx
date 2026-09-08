import React from 'react';

export const Methodology = () => {
  const steps = [
    {
      step: "01",
      icon: "fa-comments",
      title: "Triagem e Escuta Atenta",
      desc: "Compreensão detalhada do histórico de trabalho ou das contribuições previdenciárias através de atendimento individualizado."
    },
    {
      step: "02",
      icon: "fa-file-invoice",
      title: "Auditoria Documental e Cálculos",
      desc: "Exame minucioso da CTPS, contracheques, laudos periciais ou extrato do CNIS para mapear direitos e inconsistências."
    },
    {
      step: "03",
      icon: "fa-compass-drafting",
      title: "Definição da Estratégia Jurídica",
      desc: "Apresentação clara dos caminhos possíveis — acordo, requerimento administrativo no INSS ou ação judicial fundamentada."
    },
    {
      step: "04",
      icon: "fa-gavel",
      title: "Acompanhamento Processual Contínuo",
      desc: "Atuação combativa em todas as instâncias recursais, com relatórios periódicos e linguagem transparente sobre o andamento."
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D12] text-white border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1A73E8] mb-3">
            Método de Atuação
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Como Estruturamos a Sua Defesa Jurídica
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Processo transparente e metodológico desenvolvido para garantir segurança em todas as etapas de sua demanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#131722] border border-[#262E3D] rounded-xl p-6 relative hover:border-[#1A73E8]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#181E2E] flex items-center justify-center text-[#1A73E8] text-base">
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <span className="text-2xl font-serif font-bold text-[#1A73E8]/30">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#262E3D]/50 flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                <i className="fa-solid fa-check text-[#1A73E8]" aria-hidden="true"></i>
                <span>Etapa {item.step}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
