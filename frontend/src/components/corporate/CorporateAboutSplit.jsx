import React from 'react';
import alexSelesImg from '../../assets/alexseles.png';

export const CorporateAboutSplit = () => {
  return (
    <section id="sobre-alex" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Lado Esquerdo: Card de Perfil Executivo de Alex Seles */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200/90">
              <img 
                src={alexSelesImg} 
                alt="Alex Seles - Consultor e Mentor de Tecnologia para Empresas"
                className="w-full h-[450px] sm:h-[480px] object-cover object-top"
                loading="lazy"
              />
              <div className="p-5 bg-white border-t border-slate-100 text-center space-y-1">
                <span className="font-sans text-xl font-bold text-[#163758] block">Alex Seles</span>
                <span className="text-xs font-semibold text-[#1557B0] block">
                  Engenheiro Informático e Mestre em Engenharia Informática
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Credenciais Corporativas e Experiência */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="eyebrow">Sobre Alex Seles</span>
              <h2 className="section-title text-[#163758] font-sans">
                Mais de 20 anos a liderar inovação, programas de transformação digital e governança de TI.
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
              <p>
                <strong className="text-[#163758]">Engenheiro Informático e mestre em Engenharia Informática</strong>, com mais de 20 anos de experiência em gestão de programas estratégicos e projetos em equipas multifuncionais de desenvolvimento de software em setores de alta criticidade como telecomunicações, banca, automóvel e setor público. Possui as certificações <strong className="text-[#163758]">PMP®, SAFe® 6 Agilist, ITIL® 4, PSMII™, PSMI™, PSPOI™</strong> entre outras.
              </p>

              <p>
                Especialista em liderar <strong className="text-[#163758]">transformações digitais complexas</strong> e projetos estratégicos em multinacionais e instituições de referência como <strong className="text-[#163758]">Capgemini</strong>, <strong className="text-[#163758]">TIVIT</strong>, <strong className="text-[#163758]">ACT Digital</strong>, <strong className="text-[#163758]">Ford Motor Company</strong>, <strong className="text-[#163758]">Stellantis</strong>, <strong className="text-[#163758]">Continental Pneus</strong>, <strong className="text-[#163758]">MSX International</strong>, <strong className="text-[#163758]">IEFP</strong>, <strong className="text-[#163758]">Segurança Social</strong> e <strong className="text-[#163758]">AIMA</strong>.
              </p>

              <p>
                Em Portugal, é <strong className="text-[#163758]">membro do PMI (Project Management Institute)</strong> e <strong className="text-[#163758]">Embaixador ITIL</strong>, destaca-se também como influenciador digital, com uma rede de <strong className="text-[#163758]">mais de 62 mil seguidores no LinkedIn</strong>. Na plataforma, fomenta a empregabilidade no interior do país e a economia local, além de apoiar e orientar profissionais em transição de carreira e assessorar organizações em engenharia de software e governança de IA.
              </p>
            </div>

            {/* Credibilidade Corporativa: Empresas e Organismos com Intervenção */}
            <div className="pt-2 pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Organizações e multinacionais com intervenção técnica:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Capgemini',
                  'TIVIT',
                  'ACT Digital',
                  'Ford Motor Company',
                  'Stellantis',
                  'Continental Pneus',
                  'MSX International',
                  'IEFP',
                  'Segurança Social',
                  'AIMA'
                ].map((empresa) => (
                  <span 
                    key={empresa}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-200 text-[#163758] shadow-2xs"
                  >
                    {empresa}
                  </span>
                ))}
              </div>
            </div>

            {/* Selos de Garantia e Certificações */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200/70">
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                <span className="block text-xs font-bold text-[#163758]">PMP® Certified</span>
                <span className="text-[10px] text-slate-500">Gestão PMI</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                <span className="block text-xs font-bold text-[#163758]">SAFe® 6 Agilist</span>
                <span className="text-[10px] text-slate-500">Agile em Escala</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                <span className="block text-xs font-bold text-[#163758]">ITIL® 4 Ambassador</span>
                <span className="text-[10px] text-slate-500">Governação TI</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                <span className="block text-xs font-bold text-[#163758]">PSM II™ / PSPO™</span>
                <span className="text-[10px] text-slate-500">Scrum.org</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
