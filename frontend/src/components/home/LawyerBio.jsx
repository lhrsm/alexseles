import React from 'react';
import { Link } from 'react-router-dom';

export const LawyerBio = () => {
  return (
    <section className="py-24 bg-[#07090D] text-white border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Foto e Card Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#1A73E8]/30 to-transparent blur-lg opacity-40"></div>
              
              <div className="relative rounded-2xl bg-[#131722] border border-[#262E3D] p-4 shadow-2xl">
                <img 
                  src="/assets/alexseles.png" 
                  alt="Alex Seles - Mentor de Carreira & TI" 
                  className="w-full h-96 object-cover object-top rounded-xl border border-[#262E3D]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-96 rounded-xl bg-[#181E2E] border border-[#262E3D] hidden items-center justify-center text-[#1A73E8] text-6xl"
                  aria-hidden="true"
                >
                  <i className="fa-solid fa-laptop-code"></i>
                </div>

                <div className="mt-4 p-3 bg-[#0B0D12] rounded-lg border border-[#262E3D] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Alex Seles</p>
                    <p className="text-xs text-[#1A73E8] font-semibold">Head de Inovação & Tecnologia</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Comunidade</span>
                    <span className="text-xs font-semibold text-emerald-400">+62k LinkedIn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biografia e Filosofia de Trabalho */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Mentoria de Carreira Pautada na Prática, na Inovação e em Resultados Reais.
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Engenheiro Informático e mestre, com mais de 20 anos de experiência em gestão de projetos em equipas multifuncionais em desenvolvimento de software. Experiência em setores automóvel, telecomunicações, banca e setor público. Possui as certificações PMP®, SAFe® 6 Agilist, ITIL® 4, PSMII™, PSMI™, PSPOI™ entre outras.
              </p>
              <p>
                Especialista em liderar transformações digitais complexas em instituições de referência em Portugal, como a ARTE (Agência para a Reforma Tecnológica do Estado), o IEFP (Instituto do Emprego e Formação Profissional) e a Segurança Social.
              </p>
              <p>
                Em Portugal, é membro do PMI (Project Management Institute) e Embaixador ITIL, destaca-se também como influenciador digital, com uma rede de mais de 62 mil seguidores no LinkedIn.
              </p>
            </div>

            {/* Grid de Diferenciais de Conduta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#131722] border border-[#262E3D]">
                <i className="fa-solid fa-bullseye text-[#4285F4] text-base mt-0.5" aria-hidden="true"></i>
                <div>
                  <h3 className="text-xs font-bold text-white">Diagnóstico Individualizado</h3>
                  <p className="text-[11px] text-slate-400">Mapeamento de competências e plano de ação estruturado.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#131722] border border-[#262E3D]">
                <i className="fa-solid fa-comments text-[#34A853] text-base mt-0.5" aria-hidden="true"></i>
                <div>
                  <h3 className="text-xs font-bold text-white">Comunicação Estratégica</h3>
                  <p className="text-[11px] text-slate-400">Orientação executiva transparente, sem teorias desnecessárias.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/#sobre-alex"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1A73E8] hover:text-[#1557B0] uppercase tracking-wider"
              >
                <span>Conhecer a trajetória profissional completa</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
