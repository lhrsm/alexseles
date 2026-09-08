import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { ScenarioCards } from '../components/home/ScenarioCards';

export const TransicaoCarreira = () => {

  return (
    <main id="main-content" className="bg-[#FFFFFF] text-[#163758] min-h-screen">
      <MetaTags
        title="Transição de Carreira para TI | Mentoria Estratégica com Alex Seles"
        description="Recomeçar na tecnologia é perfeitamente possível. Encurta a tua rota e migra com segurança com a mentoria individual de Alex Seles. Mais de 20 anos de experiência internacional."
        keywords={[
          "transição de carreira ti",
          "migrar para tecnologia",
          "como entrar na área de ti",
          "recomeçar do zero em ti",
          "mentoria transicao de carreira ti",
          "reconversao profissional ti portugal",
          "dpo advogados ti",
          "product owner administradores",
          "data science matematicos",
          "finops contabilistas",
          "agile coach professores psicologos",
          "alex seles mentoria ti",
          "vagas tecnologia sem experiencia previa"
        ]}
        canonicalPath="/transicao-de-carreira"
      />

      {/* SEÇÃO 1: HERO & CITAÇÃO (BRANCO) */}
      <section className="bg-white pt-10 pb-14 sm:pt-14 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-[#1557B0]">Início</Link></li>
              <li><span className="text-slate-400" aria-hidden="true">/</span></li>
              <li className="text-[#1557B0] font-semibold" aria-current="page">Transição de Carreira para TI</li>
            </ol>
          </nav>

          {/* Hero da Página */}
          <div className="mb-10">
            <span className="eyebrow">
              Transição Estratégica para TI
            </span>
            <h1 className="section-title">
              Migrar para a Tecnologia é Perfeitamente Possível.
            </h1>
            <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
              Não precisas de recomeçar do zero nem de tirar outra licenciatura. A tua bagagem profissional anterior tem elevado valor no mercado digital quando direcionada para a posição certa.
            </p>
          </div>

          {/* Bloco de Citação do Alex Seles */}
          <div className="p-6 sm:p-8 bg-[#F8FAFC] border border-slate-200/90 border-l-4 border-l-[#1A73E8] rounded-r-xl shadow-xs space-y-3">
            <p className="text-base sm:text-lg font-medium text-[#163758] leading-relaxed font-sans italic">
              "Recomeçar (ou migrar de área) é sempre um desafio, mas não é um bicho de sete cabeças. Se fores para uma área totalmente diferente da tua formação, o esforço será maior, mas é perfeitamente possível migrar para qualquer área que queiras. Com uma mentoria, a tua transição será mais curta e acelerada, graças à experiência do mentor para te ajudar na tua jornada rumo ao sucesso."
            </p>
            <div className="pt-1 flex items-center gap-3">
              <span className="text-xs font-bold text-[#163758] uppercase tracking-wider">Alex Seles</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: CONTEÚDO PROGRAMÁTICO (UNIFICADO) */}
      <section className="bg-[#F8FAFC] border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">Conteúdo Programático</span>
            <h2 className="section-title text-2xl sm:text-3xl">
              O Que Vai Trabalhar nas 22 Horas de Mentoria
            </h2>
          </div>

          <div className="max-w-4xl">
            <ScenarioCards showCta={false} cardBg="bg-white" />
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: BLOCO FINAL DE CTA (AZUL COMPLETO) */}
      <section className="bg-[#163758] text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug text-white">
            Preparado para encurtar a tua rota e ingressar no mercado de TI?
          </h2>

          <p className="text-base sm:text-lg text-[#C6D1DA] max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
            Agenda uma sessão estratégica com Alex Seles. Vamos analisar o teu histórico, identificar as tuas competências transferíveis e traçar o teu plano direto de transição.
          </p>

          {/* Bloco Integrado de Investimento & Ação (UI/UX Executiva) */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-2">
            <div className="text-center sm:text-right">
              <span className="text-[11px] font-bold text-[#93B4D7] uppercase tracking-wider block">
                Investimento
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-0.5">
                R$ 6.950
              </div>
              <span className="text-xs text-[#C6D1DA] mt-0.5 block font-medium">
                22 Horas de Mentoria Individual + Simulado
              </span>
            </div>

            <div className="hidden sm:block h-12 w-px bg-white/20" aria-hidden="true" />

            <div>
              <Link
                to="/contato?tipo=modulo&modulo=trilha_completa"
                className="btn-copper py-4 px-8 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
              >
                <span>Agendar Trilha Completa de Transição</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
