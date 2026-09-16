import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, X, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import iefpLogo from '../../assets/clients/iefp.png';
import arteLogo from '../../assets/clients/arte.svg';
import capgeminiLogo from '../../assets/clients/capgemini.svg';
import tivitLogo from '../../assets/clients/tivit.svg';
import caseIefp from '../../assets/cases/case-iefp.jpg';
import caseArte from '../../assets/cases/case-arte.jpg';
import caseCapgemini from '../../assets/cases/case-capgemini.jpg';
import caseTivit from '../../assets/cases/case-tivit.jpg';

export const CorporatePillars = ({ onOpenModal }) => {
  const [selectedCase, setSelectedCase] = useState(null);

  const pillars = [
    {
      id: 'iefp',
      client: 'IEFP',
      logo: iefpLogo,
      image: caseIefp,
      title: 'Acessibilidade Digital & Serviços Web',
      shortDescription: 'A solução de serviços web da IEFP é acessível a todos e recebeu o selo de acessibilidade no site da IEFP.',
      metrics: [
        'Selo Oficial de Acessibilidade Web',
        'Conformidade Integral com Normas WCAG',
        'Acesso Inclusivo para Todos os Cidadãos'
      ],
      challenge: 'Necessidade de modernizar e democratizar o acesso aos serviços web públicos para todos os cidadãos, cumprindo rigorosas diretrizes nacionais e europeias de acessibilidade digital.',
      results: 'Implementação de interfaces acessíveis e inclusivas, validadas e reconhecidas com a atribuição do selo oficial de acessibilidade digital no portal oficial do IEFP.'
    },
    {
      id: 'arte',
      client: 'ARTE',
      logo: arteLogo,
      image: caseArte,
      title: 'Otimização de Experiência & Selo de Ouro AMA',
      shortDescription: 'Redução do abandono de formulários, numa melhoria da experiência e na conquista do selo de ouro da AMA em usabilidade e acessibilidade.',
      metrics: [
        'Selo de Ouro da AMA',
        'Redução Drástica no Abandono de Formulários',
        'Excelência Comprovada em Usabilidade'
      ],
      challenge: 'Elevadas taxas de abandono em formulários digitais críticos e necessidade de reformular a jornada de utilização de acordo com os critérios mais exigentes de usabilidade e acessibilidade.',
      results: 'Redesenho centrado no utilizador com fluxo intuitivo e otimizado, culminando numa experiência de excelência e na conquista do prestigiado Selo de Ouro da AMA.'
    },
    {
      id: 'capgemini',
      client: 'Capgemini',
      logo: capgeminiLogo,
      image: caseCapgemini,
      title: 'Modernização Crítica & Engenharia Ágil',
      shortDescription: 'Modernização de arquiteturas críticas e aceleração de entregas contínuas com estabilidade e excelência técnica.',
      metrics: [
        'Modernização de Sistemas Críticos',
        'Aceleração de Entregas Contínuas',
        'Governação Ágil e Alta Estabilidade'
      ],
      challenge: 'Complexidade em sistemas legados e necessidade de acelerar os ciclos de desenvolvimento em larga escala, mantendo elevados padrões de qualidade de código e estabilidade operacional.',
      results: 'Implementação de práticas modernas de engenharia de software e processos ágeis, reduzindo lead times e elevando a fiabilidade das aplicações críticas de negócio.'
    },
    {
      id: 'tivit',
      client: 'TIVIT',
      logo: tivitLogo,
      image: caseTivit,
      title: 'Migração Cloud & Infraestrutura IoT',
      shortDescription: 'Migração de data center para cloud e sistema IoT seguro em câmaras frias: +45% no EBITDA, 0 incidentes e 100% de SLA.',
      metrics: [
        '+45% de Aumento no EBITDA',
        '0 Incidentes de Segurança',
        '100% de Conformidade de SLA'
      ],
      challenge: 'Operador de telecomunicações necessitava de migrar um data center proprietário para infraestrutura cloud e implementar um sistema IoT seguro de controlo de acessos a câmaras frias, sob prazos de go-live rigorosos, regulamentação estrita de segurança e supervisão executiva multifuncional.',
      results: 'Aumento de 45% no EBITDA através da liderança da migração para a cloud (reduzindo custos operacionais, laborais e de infraestrutura) e da implementação de um sistema robusto de controlo IoT que atingiu zero incidentes e 100% de conformidade de SLA.'
    }
  ];

  // Gestão de fecho com a tecla Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && selectedCase) {
        setSelectedCase(null);
      }
    },
    [selectedCase]
  );

  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedCase, handleKeyDown]);

  const handleOpenDiagnosisFromCase = () => {
    setSelectedCase(null);
    if (onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans block">
            Casos de Sucesso & Soluções
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left font-sans">
            Soluções e Serviços de Engenharia
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Dos desafios dos clientes nascem soluções de excelência. Intervenções especializadas para empresas que necessitam de elevar a maturidade técnica das suas equipas e obter previsibilidade no desenvolvimento de software.
          </p>
        </div>

        {/* Grelha de Cards de Sucesso (Logo grande e ao meio, título, frase de impacto curta e botão Ver) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#1A73E8]/50 transition-all duration-300 p-6 flex flex-col justify-between text-center group"
            >
              <div>
                {/* Logo grande e ao meio */}
                <div className="flex items-center justify-center h-20 sm:h-24 w-full bg-slate-50/90 rounded-lg border border-slate-100 p-4 mb-5 group-hover:border-[#1A73E8]/30 transition-all">
                  <img 
                    src={item.logo} 
                    alt={item.client} 
                    className="max-h-12 sm:max-h-14 max-w-[160px] w-auto object-contain mx-auto" 
                    loading="lazy"
                  />
                </div>

                {/* Nome do Cliente */}
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8] block mb-1.5 font-sans">
                  {item.client}
                </span>

                {/* Título da Intervenção */}
                <h3 className="text-base sm:text-lg font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug mb-3 font-sans min-h-[48px] flex items-center justify-center">
                  {item.title}
                </h3>

                {/* Frase curta de alto impacto */}
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans text-pretty mb-6">
                  {item.shortDescription}
                </p>
              </div>

              {/* Botão Ver */}
              <button
                type="button"
                onClick={() => setSelectedCase(item)}
                className="w-full py-2.5 px-4 rounded-lg border border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs group/btn mt-auto"
              >
                <span>Ver</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Executivo com Detalhes do Caso de Sucesso */}
      {selectedCase && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedCase(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho do Modal */}
            <div className="relative bg-slate-50 p-6 sm:p-8 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="h-16 w-28 sm:h-18 sm:w-32 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center shadow-2xs">
                  <img 
                    src={selectedCase.logo} 
                    alt={selectedCase.client} 
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8] block mb-1">
                    Caso de Sucesso • {selectedCase.client}
                  </span>
                  <h3 id="modal-case-title" className="text-lg sm:text-xl font-bold text-[#163758] leading-tight">
                    {selectedCase.title}
                  </h3>
                </div>
              </div>

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              
              {/* Desafio Técnico e de Negócio */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1A73E8]" aria-hidden="true" />
                  O Desafio
                </span>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
                  {selectedCase.challenge}
                </p>
              </div>

              {/* Solução & Resultados */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#1A73E8]" aria-hidden="true" />
                  Solução & Resultados
                </span>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
                  {selectedCase.results}
                </p>
              </div>

              {/* Métricas e Selos de Destaque */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Indicadores de Sucesso:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedCase.metrics.map((metric, mIdx) => (
                    <div 
                      key={mIdx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-center flex flex-col items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-bold text-[#163758] leading-snug">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Rodapé do Modal com Ação para Diagnóstico */}
            <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Interessado numa solução com este padrão de impacto para a sua empresa?
              </span>
              <button
                type="button"
                onClick={handleOpenDiagnosisFromCase}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
              >
                <span>Solicitar Diagnóstico</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

