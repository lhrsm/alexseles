import React from 'react';

export const Pillars = () => {
  const pillars = [
    {
      icon: "fa-scale-balanced",
      title: "Rigor Técnico e Processual",
      description: "Cada consulta ou ação é precedida de minucioso estudo da documentação, alinhado à jurisprudência mais recente do TST, STJ e STF."
    },
    {
      icon: "fa-shield-halved",
      title: "Ética e Transparência Absoluta",
      description: "Orientação franca sobre os riscos e a viabilidade jurídica de cada pleito, sem promessas ilusórias e com estrita observância ao Código de Ética da OAB."
    },
    {
      icon: "fa-laptop-file",
      title: "Infraestrutura Híbrida e Segura",
      description: "Atendimento presencial e digital estruturado com assinatura eletrônica e tramitação segura sob as diretrizes da Lei Geral de Proteção de Dados (LGPD)."
    }
  ];

  return (
    <section className="py-20 bg-[#07090D] text-slate-100 border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1A73E8] mb-2">
            Pilares Institucionais
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Compromisso com a Excelência e a Responsabilidade Jurídica
          </h2>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            Uma prática jurídica estruturada na clareza de comunicação, no domínio técnico e no respeito intransigente ao cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-[#131722] border border-[#262E3D] rounded-xl p-7 flex flex-col justify-between hover:border-[#1A73E8]/40 transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#181E2E] border border-[#262E3D] flex items-center justify-center text-[#1A73E8] text-xl mb-5 group-hover:scale-105 group-hover:bg-[#1A73E8] group-hover:text-[#0B0D12] transition-all">
                  <i className={`fa-solid ${pillar.icon}`} aria-hidden="true"></i>
                </div>
                <h3 className="text-base font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#262E3D]/60 flex items-center gap-2 text-[11px] text-[#1A73E8] font-semibold tracking-wider uppercase">
                <i className="fa-solid fa-check" aria-hidden="true"></i>
                <span>Garantia de Excelência</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
