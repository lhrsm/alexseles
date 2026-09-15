import React from 'react';
import { Building2, Shield, Award, Landmark, Car, Cpu } from 'lucide-react';

export const CorporateHero = ({ onOpenModal }) => {
  const clientLogos = [
    {
      id: 'capgemini',
      name: 'Capgemini',
      category: 'Consultoria Global & TI',
      render: () => (
        <div className="flex items-center gap-2 font-sans font-bold text-lg tracking-tight text-slate-400 group-hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-4h2v4zm-2-8a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
          </svg>
          <span className="font-extrabold tracking-normal">Capgemini</span>
        </div>
      )
    },
    {
      id: 'tivit',
      name: 'TIVIT',
      category: 'Cloud & Missão Crítica',
      render: () => (
        <div className="flex items-center gap-1.5 font-sans font-extrabold text-lg tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
          <span className="text-xl">TIVIT</span>
        </div>
      )
    },
    {
      id: 'ford',
      name: 'Ford Company',
      category: 'Indústria Automóvel',
      render: () => (
        <div className="flex items-center gap-2 px-2 py-0.5 rounded-full border border-slate-300/80 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-400 transition-colors">
          <Car className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="font-serif italic font-bold tracking-tight text-base">Ford</span>
        </div>
      )
    },
    {
      id: 'stellantis',
      name: 'Stellantis',
      category: 'Grupo Automóvel Global',
      render: () => (
        <div className="flex items-center gap-1.5 font-sans font-extrabold text-sm tracking-[0.25em] uppercase text-slate-400 group-hover:text-slate-600 transition-colors">
          <span className="text-xs font-bold text-slate-400">✦</span>
          <span>STELLANTIS</span>
        </div>
      )
    },
    {
      id: 'msx',
      name: 'MSX International',
      category: 'Consultoria Automóvel & IT',
      render: () => (
        <div className="flex items-center gap-1.5 font-sans text-sm text-slate-400 group-hover:text-slate-600 transition-colors">
          <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded font-black text-xs">MSX</span>
          <span className="font-bold tracking-wider uppercase text-xs">INTERNATIONAL</span>
        </div>
      )
    },
    {
      id: 'acd',
      name: 'ACD Digital',
      category: 'Transformação & Automação',
      render: () => (
        <div className="flex items-center gap-1 font-sans text-sm text-slate-400 group-hover:text-slate-600 transition-colors">
          <span className="font-black text-base tracking-tight">ACD</span>
          <span className="font-light tracking-widest uppercase text-xs">DIGITAL</span>
        </div>
      )
    },
    {
      id: 'iefp',
      name: 'IEFP',
      category: 'Instituto do Emprego e Formação',
      render: () => (
        <div className="flex items-center gap-1.5 font-sans text-slate-400 group-hover:text-slate-600 transition-colors">
          <Landmark className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="font-black text-base tracking-tight">IEFP</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">, I.P.</span>
        </div>
      )
    },
    {
      id: 'seguranca-social',
      name: 'Segurança Social',
      category: 'Organismo de Estado',
      render: () => (
        <div className="flex items-center gap-1.5 font-sans text-slate-400 group-hover:text-slate-600 transition-colors">
          <Shield className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="font-bold text-xs uppercase tracking-wider">SEGURANÇA SOCIAL</span>
        </div>
      )
    },
    {
      id: 'aima',
      name: 'AIMA',
      category: 'Agência de Migrações e Asilo',
      render: () => (
        <div className="flex items-center gap-1.5 font-sans text-slate-400 group-hover:text-slate-600 transition-colors">
          <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="font-black text-base tracking-widest uppercase">AIMA</span>
        </div>
      )
    }
  ];

  return (
    <section 
      id="diagnostico-corporativo"
      className="relative bg-white text-[#163758] pt-12 sm:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-200/80"
      aria-labelledby="corporate-hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl text-left">
          
          <div className="space-y-8">
            {/* Título ao lado esquerdo com mesmo design da Home */}
            <h2 
              id="corporate-hero-title"
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight uppercase text-[#163758] leading-tight space-y-1.5 sm:space-y-2 text-left"
            >
              <span className="block">Equipas de tecnologia sobrecarregadas?</span>
              <span className="block text-[#1557B0]">Processos manuais a travar o crescimento?</span>
              <span className="block">Dificuldade em adotar IA e modernizar sistemas?</span>
            </h2>

            {/* Carrossel de Logos de Clientes (Cinzento, a rodar suave e lentamente) */}
            <div className="pt-2 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
                Experiência, Projetos & Intervenções em Grandes Organizações
              </span>

              {/* Fita Contínua com Fade Suave nas Extremidades */}
              <div className="relative w-full overflow-hidden py-3 bg-slate-50/60 rounded-xl border border-slate-200/70">
                {/* Degradê de fade à esquerda e à direita */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />

                {/* Esteira com animação lenta */}
                <div className="animate-marquee-slow flex items-center gap-10 sm:gap-14 px-4 select-none">
                  {/* Primeira cópia da lista */}
                  {clientLogos.map((client, idx) => (
                    <div 
                      key={`client-1-${client.id}-${idx}`} 
                      className="group shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity cursor-default"
                      title={`${client.name} - ${client.category}`}
                    >
                      {client.render()}
                    </div>
                  ))}

                  {/* Segunda cópia para looping infinito perfeito sem saltos */}
                  {clientLogos.map((client, idx) => (
                    <div 
                      key={`client-2-${client.id}-${idx}`} 
                      className="group shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity cursor-default"
                      title={`${client.name} - ${client.category}`}
                    >
                      {client.render()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Frase / Citação Oficial de Alex Seles para Empresas */}
            <div className="border-l-4 border-[#1A73E8] pl-5 sm:pl-6 py-4 text-left bg-slate-50 rounded-r-xl border border-l-4 border-slate-200/80 shadow-2xs">
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-sans italic">
                “O maior custo de uma organização de tecnologia não é investir em inovação, é o tempo e a faturação perdidos com processos obsoletos, débitos técnicos e equipas sem metodologia clara. Acelerar a maturidade digital e operacional da tua organização é a rota mais direta para eficiência, retenção de talentos e previsibilidade de escala.”
              </p>
              <p className="text-sm font-bold text-[#163758] mt-2.5 not-italic font-sans">
                — Alex Seles
              </p>
            </div>

            {/* CTA abaixo da citação */}
            <div className="pt-2 text-left">
              <button
                type="button"
                onClick={onOpenModal}
                className="btn-copper shadow-md hover:shadow-lg text-sm sm:text-base font-semibold py-3.5 px-8 inline-flex items-center gap-2 cursor-pointer transition-all rounded-lg"
              >
                <span>Solicitar Diagnóstico para a Minha Empresa</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
