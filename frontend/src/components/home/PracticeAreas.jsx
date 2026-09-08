import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const laborTopics = [
  {
    icon: "fa-file-signature",
    title: "Rescisão Indireta e Verbas Rescisórias",
    desc: "Análise de faltas graves do empregador (atraso de salário, falta de FGTS), demissão sem justa causa e cálculo de todas as verbas rescisórias."
  },
  {
    icon: "fa-clock",
    title: "Jornada de Trabalho e Horas Extras",
    desc: "Apuração de horas extras habituais, horas noturnas reduzidas, intervalos intrajornada suprimidos e irregularidades no banco de horas."
  },
  {
    icon: "fa-triangle-exclamation",
    title: "Insalubridade e Periculosidade",
    desc: "Orientação e comprovação técnica quanto à exposição a agentes químicos, biológicos, ruído excessivo, inflamáveis ou alta tensão."
  },
  {
    icon: "fa-user-nurse",
    title: "Doenças Ocupacionais e Acidentes",
    desc: "Defesa dos direitos relativos a estabilidade provisória no emprego (12 meses pós-INSS), emissão de CAT e indenizações cabíveis."
  },
  {
    icon: "fa-scale-unbalanced",
    title: "Equiparação Salarial e Isonomia",
    desc: "Exigência de salário equivalente perante paradigmas da mesma localidade, mesma função e diferença temporal não superior a dois anos."
  },
  {
    icon: "fa-shield-halved",
    title: "Assédio Moral e Dano Moral Trabalhista",
    desc: "Proteção contra condutas abusivas, humilhações reiteradas e ambiente de trabalho degradante, com respaldo nas normas da CLT."
  }
];

const pensionTopics = [
  {
    icon: "fa-calculator",
    title: "Planejamento Previdenciário",
    desc: "Análise estratégica do histórico contributivo (CNIS) para projetar a data ideal e o valor mais vantajoso de aposentadoria após a EC 103/2019."
  },
  {
    icon: "fa-person-cane",
    title: "Aposentadorias por Idade e Tempo",
    desc: "Enquadramento nas regras de transição (pontos, pedágio de 50% e 100%, idade progressiva) e cálculo do benefício."
  },
  {
    icon: "fa-flask-vial",
    title: "Aposentadoria Especial",
    desc: "Comprovação de tempo especial trabalhado com agentes nocivos à saúde mediante análise do Perfil Profissiográfico Previdenciário (PPP) e LTCAT."
  },
  {
    icon: "fa-heart-pulse",
    title: "Benefícios por Incapacidade",
    desc: "Auxílio por Incapacidade Temporária (auxílio-doença) e Aposentadoria por Incapacidade Permanente (invalidez), com suporte para perícias."
  },
  {
    icon: "fa-hands-holding-child",
    title: "BPC / LOAS (Idoso e PcD)",
    desc: "Requerimento e recurso para o benefício assistencial de um salário mínimo a idosos (65+ anos) e pessoas com deficiência de baixa renda."
  },
  {
    icon: "fa-arrows-rotate",
    title: "Revisões e Recursos Administrativos",
    desc: "Ajuizamento de recursos contra indeferimentos indevidos do INSS e verificação de erros no cálculo da RMI (Renda Mensal Inicial)."
  }
];

export const PracticeAreas = () => {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <section id="areas-de-atuacao" className="py-24 bg-[#0B0D12] text-white border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1A73E8] mb-3">
            Especialidades Jurídicas
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Áreas de Atuação Técnica e Consultiva
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Assessoria estruturada para oferecer clareza, segurança jurídica e representação técnica rigorosa nas esferas administrativa e judicial.
          </p>

          {/* Filtro de Abas */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'todos'
                  ? 'bg-[#1A73E8] text-[#0B0D12]'
                  : 'bg-[#131722] text-slate-300 border border-[#262E3D] hover:bg-[#181E2E]'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('trabalhista')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'trabalhista'
                  ? 'bg-[#1A73E8] text-[#0B0D12]'
                  : 'bg-[#131722] text-slate-300 border border-[#262E3D] hover:bg-[#181E2E]'
              }`}
            >
              Direito do Trabalho
            </button>
            <button
              onClick={() => setActiveTab('previdenciario')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'previdenciario'
                  ? 'bg-[#1A73E8] text-[#0B0D12]'
                  : 'bg-[#131722] text-slate-300 border border-[#262E3D] hover:bg-[#181E2E]'
              }`}
            >
              Direito Previdenciário (INSS)
            </button>
          </div>
        </div>

        {/* Grid das Grandes Vertentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Coluna 1: Direito do Trabalho */}
          {(activeTab === 'todos' || activeTab === 'trabalhista') && (
            <div className={`bg-[#131722] border border-[#262E3D] rounded-2xl p-7 lg:p-8 flex flex-col justify-between hover:border-[#1A73E8]/40 transition-all ${activeTab === 'trabalhista' ? 'lg:col-span-2' : ''}`}>
              <div>
                <div className="flex items-center gap-3.5 mb-6 border-b border-[#262E3D] pb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#181E2E] border border-[#1A73E8]/40 flex items-center justify-center text-[#1A73E8] text-xl">
                    <i className="fa-solid fa-briefcase" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Direito do Trabalho</h3>
                    <p className="text-xs text-slate-400">Relações de emprego, normas da CLT e jurisprudência do TST</p>
                  </div>
                </div>

                <div className={`grid gap-4 mb-6 ${activeTab === 'trabalhista' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {laborTopics.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0B0D12] border border-[#262E3D] flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#181E2E] text-[#1A73E8] flex items-center justify-center text-xs mb-3">
                          <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 mb-1.5">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#262E3D] flex items-center justify-between">
                <Link
                  to="/direito-do-trabalho"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A73E8] hover:text-[#1557B0] transition-colors"
                >
                  <span>Acessar página completa de Direito do Trabalho</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          )}

          {/* Coluna 2: Direito Previdenciário */}
          {(activeTab === 'todos' || activeTab === 'previdenciario') && (
            <div className={`bg-[#131722] border border-[#262E3D] rounded-2xl p-7 lg:p-8 flex flex-col justify-between hover:border-[#1A73E8]/40 transition-all ${activeTab === 'previdenciario' ? 'lg:col-span-2' : ''}`}>
              <div>
                <div className="flex items-center gap-3.5 mb-6 border-b border-[#262E3D] pb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#181E2E] border border-[#1A73E8]/40 flex items-center justify-center text-[#1A73E8] text-xl">
                    <i className="fa-solid fa-hand-holding-hand" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Direito Previdenciário</h3>
                    <p className="text-xs text-slate-400">Seguridade social, concessão de aposentadorias e amparo ao segurado</p>
                  </div>
                </div>

                <div className={`grid gap-4 mb-6 ${activeTab === 'previdenciario' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {pensionTopics.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0B0D12] border border-[#262E3D] flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#181E2E] text-[#1A73E8] flex items-center justify-center text-xs mb-3">
                          <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 mb-1.5">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#262E3D] flex items-center justify-between">
                <Link
                  to="/direito-previdenciario"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A73E8] hover:text-[#1557B0] transition-colors"
                >
                  <span>Acessar página completa de Direito Previdenciário</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
