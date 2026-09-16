import React from 'react';
import capgeminiLogo from '../../assets/clients/capgemini.svg';
import tivitLogo from '../../assets/clients/tivit.svg';
import actDigitalLogo from '../../assets/clients/actdigital.svg';
import fordLogo from '../../assets/clients/ford.svg';
import stellantisLogo from '../../assets/clients/stellantis.svg';
import continentalLogo from '../../assets/clients/continental.svg';
import msxiLogo from '../../assets/clients/msxi.png';
import iefpLogo from '../../assets/clients/iefp.png';
import segurancaSocialLogo from '../../assets/clients/seguranca-social.png';
import aimaLogo from '../../assets/clients/aima.png';

export const CorporateClientsSection = () => {
  const clients = [
    {
      id: 'capgemini',
      name: 'Capgemini',
      logo: capgeminiLogo,
      heightClass: 'h-6 sm:h-7',
      category: 'Consultoria Global & TI'
    },
    {
      id: 'tivit',
      name: 'TIVIT',
      logo: tivitLogo,
      heightClass: 'h-5 sm:h-6',
      category: 'Cloud & Missão Crítica'
    },
    {
      id: 'actdigital',
      name: 'ACT Digital',
      logo: actDigitalLogo,
      heightClass: 'h-6 sm:h-7',
      category: 'Transformação & Inovação Digital'
    },
    {
      id: 'ford',
      name: 'Ford Motor Company',
      logo: fordLogo,
      heightClass: 'h-7 sm:h-8',
      category: 'Indústria Automóvel Global'
    },
    {
      id: 'stellantis',
      name: 'Stellantis',
      logo: stellantisLogo,
      heightClass: 'h-4 sm:h-5',
      category: 'Grupo Automóvel Multinacional'
    },
    {
      id: 'continental',
      name: 'Continental Pneus',
      logo: continentalLogo,
      heightClass: 'h-6 sm:h-7',
      category: 'Indústria & Tecnologia Automóvel'
    },
    {
      id: 'msxi',
      name: 'MSX International',
      logo: msxiLogo,
      heightClass: 'h-7 sm:h-8',
      category: 'Consultoria & Serviços Automóveis'
    },
    {
      id: 'iefp',
      name: 'IEFP',
      logo: iefpLogo,
      heightClass: 'h-6 sm:h-7',
      category: 'Instituto do Emprego e Formação Profissional'
    },
    {
      id: 'seguranca-social',
      name: 'Segurança Social',
      logo: segurancaSocialLogo,
      heightClass: 'h-8 sm:h-9',
      category: 'Organismo de Estado & Segurança Social'
    },
    {
      id: 'aima',
      name: 'AIMA',
      logo: aimaLogo,
      heightClass: 'h-6 sm:h-7',
      category: 'Agência para a Integração, Migrações e Asilo'
    }
  ];

  return (
    <section 
      id="clientes-corporativos"
      className="w-full bg-white py-8 sm:py-10 border-b border-slate-200/80 overflow-hidden"
      aria-label="Experiência em Grandes Organizações"
    >
      {/* Título Discreto e Corporativo */}
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center mb-5 sm:mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 font-sans">
          Experiência, Projetos & Intervenções em Grandes Organizações
        </p>
      </div>

      {/* Carrossel de Uma Ponta à Outra (Edge-to-Edge sem Margem) */}
      <div className="relative w-full overflow-hidden">
        {/* Degradê Suave de Fade nas Extremidades Esquerda e Direita */}
        <div 
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 lg:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 lg:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" 
          aria-hidden="true" 
        />

        {/* Linha de Logos em Loop Contínuo Suave */}
        <div className="animate-marquee-slow flex items-center gap-12 sm:gap-16 lg:gap-20 select-none py-2">
          {/* 1ª Cópia da Lista de Logos */}
          {clients.map((client, idx) => (
            <div 
              key={`client-1-${client.id}-${idx}`}
              className="shrink-0 flex items-center justify-center group"
              title={`${client.name} — ${client.category}`}
            >
              <img
                src={client.logo}
                alt={`Logótipo oficial de ${client.name}`}
                className={`${client.heightClass} w-auto max-w-[130px] sm:max-w-[160px] object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 cursor-default`}
                loading="lazy"
              />
            </div>
          ))}

          {/* 2ª Cópia para Loop Perfeito Sem Saltos */}
          {clients.map((client, idx) => (
            <div 
              key={`client-2-${client.id}-${idx}`}
              className="shrink-0 flex items-center justify-center group"
              title={`${client.name} — ${client.category}`}
            >
              <img
                src={client.logo}
                alt={`Logótipo oficial de ${client.name}`}
                className={`${client.heightClass} w-auto max-w-[130px] sm:max-w-[160px] object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 cursor-default`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
