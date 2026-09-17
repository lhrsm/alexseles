import React from 'react';
import alexSelesImg from '../../assets/alexseles.png';

export const AboutSplit = () => {
  return (
    <section id="sobre-alex" className="py-20 sm:py-28 bg-white text-[#163758] border-b border-slate-200/80 scroll-mt-20">
      <span id="escritorio" className="sr-only" aria-hidden="true" />
      <span id="sobre" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Lado Esquerdo: Card de Perfil de Alex Seles */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#F8FAFC] border border-slate-200/90">
              <img 
                src={alexSelesImg} 
                alt="Alex Seles - Mentor de Carreira e TI"
                className="w-full h-[450px] sm:h-[480px] object-cover object-top"
                loading="lazy"
              />
              <div className="p-5 bg-[#F8FAFC] border-t border-slate-200/70 text-center space-y-1">
                <span className="font-sans text-xl font-bold text-[#163758] block">Alex Seles</span>
                <span className="text-xs font-semibold text-[#1557B0] block">
                  Engenheiro Informático e Mestre em Engenharia Informática
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Biografia Completa de Alex Seles */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="eyebrow">Sobre Alex Seles</span>
              <h2 className="section-title text-[#163758] font-sans">
                Mais de 20 anos a liderar inovação e gestão de projetos.
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
              <p>
                <strong className="text-[#163758]">Engenheiro Informático e mestre em Engenharia Informática</strong>, com mais de 20 anos de experiência em gestão de projetos em equipas multifuncionais em desenvolvimento de software. Experiência em setores automóvel, telecomunicações, banca e setor público. Possui as certificações <strong className="text-[#163758]">PMP®, SAFe® 6 Agilist, ITIL® 4, PSMII™, PSMI™, PSPOI™</strong> entre outras.
              </p>

              <p>
                Especialista em liderar <strong className="text-[#163758]">transformações digitais complexas</strong> e projetos estratégicos em multinacionais e instituições de referência como <strong className="text-[#163758]">Capgemini</strong>, <strong className="text-[#163758]">TIVIT</strong>, <strong className="text-[#163758]">ACT Digital</strong>, <strong className="text-[#163758]">Ford Motor Company</strong>, <strong className="text-[#163758]">Stellantis</strong>, <strong className="text-[#163758]">Continental Pneus</strong>, <strong className="text-[#163758]">MSX International</strong>, <strong className="text-[#163758]">IEFP</strong>, <strong className="text-[#163758]">Segurança Social</strong> e <strong className="text-[#163758]">ARTE</strong>.
              </p>

              <p>
                Em Portugal, é <strong className="text-[#163758]">membro do PMI (Project Management Institute)</strong> e <strong className="text-[#163758]">Embaixador ITIL</strong>, destaca-se também como influenciador digital, com uma rede de <strong className="text-[#163758]">mais de 62 mil seguidores no LinkedIn</strong>. Na plataforma, fomenta a empregabilidade no interior do país e a economia local, além de apoiar e orientar profissionais em transição de carreira e assessorar organizações em engenharia de software e governança de IA.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
