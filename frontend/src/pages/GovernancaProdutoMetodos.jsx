import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const GovernancaProdutoMetodos = () => {
  return (
    <main id="main-content" className="bg-[#FFFFFF] text-[#163758] min-h-screen">
      <MetaTags
        title="Governação, Produto & Métodos de Entrega em TI | Alex Seles"
        description="Mentoria individual em tecnologia com Alex Seles cobrindo Segurança da Informação, DPO & RGPD/LGPD, Design Thinking e Metodologias Preditivas (Waterfall) e Ágeis (Scrum & Kanban)."
        keywords={[
          "governanca ti alex seles",
          "seguranca da informacao corporativa",
          "dpo rgpd lgpd compliance ti",
          "design thinking para software",
          "metodologias preditivas pmbok waterfall",
          "scrum e kanban na pratica",
          "gestao agil de projetos software",
          "lideranca tecnica scrum master product owner",
          "itil 4 governanca servicos ti",
          "mentoria executiva tecnologia"
        ]}
        canonicalPath="/governanca-produto-metodos-entrega"
      />

      {/* SEÇÃO 1: HERO & CITAÇÃO (BRANCO) */}
      <section className="bg-white pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-[#1557B0]">Início</Link></li>
              <li><span className="text-slate-400" aria-hidden="true">/</span></li>
              <li className="text-[#1557B0] font-semibold" aria-current="page">Governação, Produto & Métodos de Entrega</li>
            </ol>
          </nav>

          {/* Hero da Página */}
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">
              Governação, Produto & Métodos de Entrega
            </span>
            <h1 className="section-title">
              Governação, Produto & Métodos de Entrega em TI: Segurança da Informação, DPO, Design Thinking & Agilidade (Scrum & Kanban).
            </h1>
            <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
              Domina a blindagem da informação, conformidade com o RGPD/LGPD, conceção de produtos centrada no utilizador e a condução de projetos com metodologias preditivas (Waterfall) e ágeis (Scrum & Kanban) para liderar com autoridade executiva em tecnologia.
            </p>
          </div>

          {/* Bloco de Mensagem Oficial do Alex Seles */}
          <div className="p-8 sm:p-10 bg-[#F8FAFC] border border-slate-200/90 border-l-4 border-l-[#1A73E8] rounded-r-xl shadow-xs space-y-4">
            <p className="text-base sm:text-lg font-medium text-[#163758] leading-relaxed font-sans italic">
              "Liderar produtos e equipas tecnológicas exige muito mais do que gerir tarefas num quadro: requer governança sólida de dados e segurança, clareza absoluta sobre o valor entregue ao utilizador e a maturidade de orquestrar métodos preditivos e ágeis para garantir previsibilidade e excelência de negócio."
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
              O Que Vai Trabalhar nas 9 Horas de Mentoria
            </h2>
          </div>

          <div className="max-w-4xl relative">
            <div className="absolute left-4 sm:left-5 top-2 bottom-6 w-[2px] bg-slate-200" aria-hidden="true" />

            <div className="flex items-center gap-3 sm:gap-4 mb-6 relative z-10">
              <div className="w-8 sm:w-10 flex justify-center shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#1A73E8] ring-4 ring-blue-100" />
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs font-bold text-[#1557B0] uppercase tracking-wider">Fase 02</span>
                <span className="text-slate-300 font-light">•</span>
                <h3 className="text-base sm:text-lg font-bold text-[#163758] font-sans">Governação, Produto & Métodos de Entrega</h3>
                <span className="text-xs font-medium text-slate-400">(11 Horas)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative flex items-start group">
                <div className="w-8 sm:w-10 flex justify-center shrink-0 pt-4 z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center shadow-xs group-hover:border-[#1A73E8] group-hover:text-[#1A73E8] group-hover:bg-blue-50/50 transition-colors">01</div>
                </div>
                <div className="flex-1 ml-3 sm:ml-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 hover:border-[#1A73E8]/60 hover:shadow-xs transition-all duration-150">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Módulo 01</span>
                      <span className="text-xs font-bold text-[#1557B0] bg-blue-50 px-2.5 py-0.5 rounded">1h</span>
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-[#163758] mb-2 leading-snug">Power Skills: A Tua História Importa</h4>
                    <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">Como migrar para TI: primeiros passos, escolhas certeiras e valorização da tua bagagem profissional prévia para ingressares com segurança no mercado.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="w-8 sm:w-10 flex justify-center shrink-0 pt-4 z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center shadow-xs group-hover:border-[#1A73E8] group-hover:text-[#1A73E8] group-hover:bg-blue-50/50 transition-colors">02</div>
                </div>
                <div className="flex-1 ml-3 sm:ml-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 hover:border-[#1A73E8]/60 hover:shadow-xs transition-all duration-150">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Módulo 02</span>
                      <span className="text-xs font-bold text-[#1557B0] bg-blue-50 px-2.5 py-0.5 rounded">3h</span>
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-[#163758] mb-2 leading-snug">Segurança da Informação, Engenharia Social, DPO & RGPD/LGPD</h4>
                    <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">Proteção contra ameaças digitais e engenharia social, atribuições do DPO (Data Protection Officer) e conformidade regulatória com o RGPD e a LGPD.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="w-8 sm:w-10 flex justify-center shrink-0 pt-4 z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center shadow-xs group-hover:border-[#1A73E8] group-hover:text-[#1A73E8] group-hover:bg-blue-50/50 transition-colors">03</div>
                </div>
                <div className="flex-1 ml-3 sm:ml-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 hover:border-[#1A73E8]/60 hover:shadow-xs transition-all duration-150">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Módulo 03</span>
                      <span className="text-xs font-bold text-[#1557B0] bg-blue-50 px-2.5 py-0.5 rounded">2h</span>
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-[#163758] mb-2 leading-snug">Design Thinking Aplicado ao Desenvolvimento de Software</h4>
                    <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">Abordagem prática centrada no utilizador para ideação ágil, prototipagem rápida e resolução criativa de problemas complexos de tecnologia.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="w-8 sm:w-10 flex justify-center shrink-0 pt-4 z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center shadow-xs group-hover:border-[#1A73E8] group-hover:text-[#1A73E8] group-hover:bg-blue-50/50 transition-colors">04</div>
                </div>
                <div className="flex-1 ml-3 sm:ml-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 hover:border-[#1A73E8]/60 hover:shadow-xs transition-all duration-150">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Módulo 04</span>
                      <span className="text-xs font-bold text-[#1557B0] bg-blue-50 px-2.5 py-0.5 rounded">2h</span>
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-[#163758] mb-2 leading-snug">Metodologias Preditivas (Waterfall)</h4>
                    <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">Gestão estruturada de projetos: planeamento de âmbito e escopo, elaboração de cronogramas, custos, gestão de riscos e marcos de entrega.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="w-8 sm:w-10 flex justify-center shrink-0 pt-4 z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center shadow-xs group-hover:border-[#1A73E8] group-hover:text-[#1A73E8] group-hover:bg-blue-50/50 transition-colors">05</div>
                </div>
                <div className="flex-1 ml-3 sm:ml-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 hover:border-[#1A73E8]/60 hover:shadow-xs transition-all duration-150">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Módulo 05</span>
                      <span className="text-xs font-bold text-[#1557B0] bg-blue-50 px-2.5 py-0.5 rounded">3h</span>
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-[#163758] mb-2 leading-snug">Metodologias Ágeis (Scrum & Kanban)</h4>
                    <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">Frameworks modernos de agilidade: papéis, cerimónias ágeis, gestão de sprints, visibilidade de fluxo contínuo com Kanban e liderança de equipas de TI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO 4: BLOCO FINAL DE CTA (AZUL COMPLETO) */}
      <section className="bg-[#163758] text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug text-white">
            Lidere projetos e produtos de tecnologia com governação sólida e métodos de entrega ágeis.
          </h2>

          <p className="text-base sm:text-lg text-[#C6D1DA] max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
            Agende uma sessão individual com Alex Seles. Vamos calibrar os teus conhecimentos em governação, segurança da informação, conformidade regulatória e gestão ágil para acelerar a tua liderança em tecnologia.
          </p>

          {/* Bloco Integrado de Investimento & Ação (UI/UX Executiva) */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-2">
            <div className="text-center sm:text-right">
              <span className="text-[11px] font-bold text-[#93B4D7] uppercase tracking-wider block">
                Investimento
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-0.5">
                R$ 3.950
              </div>
              <span className="text-xs text-[#C6D1DA] mt-0.5 block font-medium">
                11 Horas de Mentoria Individual
              </span>
            </div>

            <div className="hidden sm:block h-12 w-px bg-white/20" aria-hidden="true" />

            <div>
              <Link
                to="/contato?tipo=modulo&modulo=governanca_produto"
                className="btn-copper py-4 px-8 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
              >
                <span>Agendar Mentoria de Governação & Produto</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
