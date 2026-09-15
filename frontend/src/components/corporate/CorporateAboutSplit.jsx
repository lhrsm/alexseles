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
                  Engenheiro Informático, Mestre e Head de Inovação
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
                <strong className="text-[#163758]">Engenheiro Informático e mestre</strong>, com mais de duas décadas de experiência em gestão de programas estratégicos, modernização de sistemas e aceleração de equipas multidisciplinares de engenharia de software em setores de alta criticidade como telecomunicações, banca, automóvel e administração pública.
              </p>

              <p>
                Liderou transformações digitais de grande escala em instituições de referência em Portugal, com destaque para a <strong className="text-[#163758]">ARTE</strong> (Agência para a Reforma Tecnológica do Estado), o <strong className="text-[#163758]">IEFP</strong> (Instituto do Emprego e Formação Profissional) e a <strong className="text-[#163758]">Segurança Social</strong>, unificando processos de desenvolvimento, arquitetura em nuvem e métodos ágeis de alta performance.
              </p>

              <p>
                Detém certificações de classe mundial como <strong className="text-[#163758]">PMP® (Project Management Professional), SAFe® 6 Agilist, ITIL® 4 Ambassador, PSM II™ e PSPO I™</strong>. Em Portugal, é membro ativo do <strong className="text-[#163758]">PMI</strong> e Embaixador ITIL, além de influenciador com mais de <strong className="text-[#163758]">62 mil seguidores no LinkedIn</strong>, assessorando empresas na implementação de boas práticas de engenharia de software, automação inteligente e governança de Inteligência Artificial.
              </p>
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
