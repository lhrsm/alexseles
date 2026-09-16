import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  Layers, 
  Award, 
  ChevronRight,
  Shield,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { getCaseBySlug, getNextCase, getAllCases } from '../data/casesData';
import { MetaTags } from '../components/seo/MetaTags';

export const CasoDeSucesso = () => {
  const { slug } = useParams();

  const currentCase = getCaseBySlug(slug);

  if (!currentCase) {
    return <Navigate to="/para-empresas#solucoes-empresas" replace />;
  }

  const nextCase = getNextCase(currentCase.slug);

  return (
    <main id="main-content" className="bg-white text-[#163758]">
      <MetaTags
        title={`${currentCase.client}: ${currentCase.title} | Casos de Sucesso • Alex Seles`}
        description={currentCase.summary}
        keywords={[
          currentCase.client.toLowerCase(),
          'caso de sucesso alex seles',
          'transformacao digital',
          'engenharia de software',
          'consultoria ti empresas',
          currentCase.industry.toLowerCase()
        ]}
        canonicalPath={`/casos-de-sucesso/${currentCase.slug}`}
      />

      {/* 1. Barra de Navegação Superior / Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F8FAFC] border-b border-slate-200/80 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#1A73E8] transition-colors">
                Início
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link to="/para-empresas" className="hover:text-[#1A73E8] transition-colors">
                Para Empresas
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link to="/para-empresas#solucoes-empresas" className="hover:text-[#1A73E8] transition-colors">
                Casos de Sucesso
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-[#163758] font-bold truncate max-w-[220px] sm:max-w-none" aria-current="page">
              {currentCase.client}
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Hero Editorial do Caso de Sucesso */}
      <header className="pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-4 max-w-4xl text-left">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#1A73E8] border border-blue-100">
                <Award className="w-3.5 h-3.5" aria-hidden="true" />
                História de Sucesso • {currentCase.client}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#163758] leading-[1.15] font-sans">
              {currentCase.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#475569] leading-relaxed font-sans text-pretty">
              {currentCase.summary}
            </p>
          </div>

          {/* Ficha Técnica / Metadados do Projeto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 pb-2 border-t border-b border-slate-200/80 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Cliente
              </span>
              <p className="text-sm sm:text-base font-bold text-[#163758]">
                {currentCase.clientFullName || currentCase.client}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Setor
              </span>
              <p className="text-sm sm:text-base font-bold text-[#163758]">
                {currentCase.industry}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Serviços
              </span>
              <p className="text-sm sm:text-base font-bold text-[#163758]">
                {currentCase.services}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Âmbito
              </span>
              <p className="text-sm sm:text-base font-bold text-[#163758]">
                {currentCase.scope}
              </p>
            </div>
          </div>

          {/* Referências de Autoridade e Reconhecimento Oficial (Medium & AMA) - Layout Clean sem caixa */}
          {(currentCase.mediumUrl || currentCase.amaUrl) && (
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-1 text-left">
              {currentCase.mediumUrl && (
                <a
                  href={currentCase.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#1A73E8] transition-colors group cursor-pointer"
                  title="Ler publicação oficial no Medium"
                >
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 text-slate-900 group-hover:text-[#1A73E8] transition-colors">
                    <svg viewBox="0 0 1043.63 592.71" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                      <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.18-124.94-147.18-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"/>
                    </svg>
                  </span>
                  <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#1A73E8]">
                    Ler artigo no Medium
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1A73E8] transition-colors shrink-0" aria-hidden="true" />
                </a>
              )}

              {currentCase.amaUrl && (
                <a
                  href={currentCase.amaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#1A73E8] transition-colors group cursor-pointer"
                  title="Consultar validação oficial da AMA"
                >
                  <span className="h-5 px-1.5 rounded bg-[#163758] group-hover:bg-[#1A73E8] text-white text-[10px] font-black tracking-wider uppercase flex items-center justify-center transition-colors shrink-0">
                    AMA
                  </span>
                  <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#1A73E8]">
                    {currentCase.amaLabel || 'Reconhecimento Oficial AMA'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1A73E8] transition-colors shrink-0" aria-hidden="true" />
                </a>
              )}
            </div>
          )}

          {/* Imagem de Destaque Editorial com Logótipo Integrado */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[16/9] sm:aspect-[21/9] bg-slate-900 group">
            <img 
              src={currentCase.image} 
              alt={currentCase.title}
              className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Box do Logótipo Flutuante */}
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/40 shadow-lg flex items-center gap-3">
              <img 
                src={currentCase.logo} 
                alt={currentCase.client} 
                className="h-9 sm:h-12 w-auto max-w-[140px] sm:max-w-[170px] object-contain"
              />
            </div>
          </div>

        </div>
      </header>

      {/* 3. Corpo Editorial do Artigo / Case Study */}
      <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 text-left">
        
        {/* Secção: O Desafio */}
        <section aria-labelledby="seccao-desafio" className="space-y-6">
          <div className="space-y-2 border-l-4 border-[#1A73E8] pl-4 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              01 • Contexto & Necessidades
            </span>
            <h2 id="seccao-desafio" className="text-2xl sm:text-3xl font-extrabold text-[#163758] tracking-tight">
              O desafio
            </h2>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#163758] leading-snug">
            {currentCase.challenge.headline}
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-[#475569] leading-relaxed font-sans">
            {currentCase.challenge.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        {/* Secção: A Solução */}
        <section aria-labelledby="seccao-solucao" className="space-y-8 pt-8 border-t border-slate-200">
          <div className="space-y-2 border-l-4 border-[#1A73E8] pl-4 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              02 • Estratégia de Engenharia
            </span>
            <h2 id="seccao-solucao" className="text-2xl sm:text-3xl font-extrabold text-[#163758] tracking-tight">
              A solução
            </h2>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#163758] leading-snug">
            {currentCase.solution.headline}
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-[#475569] leading-relaxed font-sans">
            {currentCase.solution.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Pilares Estruturais da Solução */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            {currentCase.solution.pillars.map((pillar, pIdx) => (
              <div 
                key={pIdx}
                className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#1A73E8]/40 hover:shadow-md transition-all duration-300 space-y-2 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A73E8] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {pIdx + 1}
                  </span>
                  <h4 className="text-base font-bold text-[#163758]">
                    {pillar.name}
                  </h4>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed pt-1">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Secção: As Tecnologias */}
        <section aria-labelledby="seccao-tecnologias" className="space-y-6 pt-8 border-t border-slate-200">
          <div className="space-y-2 border-l-4 border-[#1A73E8] pl-4 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              03 • Stack & Ferramentas
            </span>
            <h2 id="seccao-tecnologias" className="text-2xl sm:text-3xl font-extrabold text-[#163758] tracking-tight">
              As tecnologias
            </h2>
          </div>

          <p className="text-base text-[#475569] leading-relaxed font-sans">
            Soluções de classe empresarial selecionadas com critério para garantir escalabilidade, segurança e observabilidade contínua:
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {currentCase.technologies.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-[#163758] shadow-2xs hover:border-[#1A73E8] hover:text-[#1A73E8] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" aria-hidden="true" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Secção: Os Resultados */}
        <section aria-labelledby="seccao-resultados" className="space-y-8 pt-8 border-t border-slate-200">
          <div className="space-y-2 border-l-4 border-[#1A73E8] pl-4 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              04 • Impacto Mensurável
            </span>
            <h2 id="seccao-resultados" className="text-2xl sm:text-3xl font-extrabold text-[#163758] tracking-tight">
              Os resultados
            </h2>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#163758] leading-snug">
            {currentCase.results.headline}
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-[#475569] leading-relaxed font-sans">
            {currentCase.results.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Destaques Numéricos e de Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {currentCase.results.metrics.map((metric, mIdx) => (
              <div 
                key={mIdx}
                className="p-6 rounded-xl bg-gradient-to-b from-[#F8FAFC] to-white border border-slate-200/90 text-center space-y-2 shadow-2xs"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A73E8] font-sans tracking-tight">
                  {metric.value}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Secção: O Processo */}
        <section aria-labelledby="seccao-processo" className="space-y-8 pt-8 border-t border-slate-200">
          <div className="space-y-2 border-l-4 border-[#1A73E8] pl-4 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A73E8]">
              05 • Metodologia & Governação
            </span>
            <h2 id="seccao-processo" className="text-2xl sm:text-3xl font-extrabold text-[#163758] tracking-tight">
              O processo
            </h2>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#163758] leading-snug">
            {currentCase.process.headline}
          </h3>

          {/* Etapas do Processo */}
          <div className="space-y-4 pt-2">
            {currentCase.process.steps.map((step, sIdx) => (
              <div 
                key={sIdx}
                className="flex items-start gap-4 p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#163758] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{sIdx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#163758]">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Próxima História de Sucesso */}
        {nextCase && (
          <section className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Próxima História de Sucesso
              </span>
              <Link 
                to="/para-empresas#solucoes-empresas"
                className="text-xs font-bold uppercase tracking-wider text-[#1A73E8] hover:underline flex items-center gap-1"
              >
                <span>Ver Todos os Casos</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <Link
              to={`/casos-de-sucesso/${nextCase.slug}`}
              className="block p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#1A73E8]/60 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-16 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                    <img 
                      src={nextCase.logo} 
                      alt={nextCase.client} 
                      className="max-h-10 max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8] block mb-1">
                      {nextCase.client} • {nextCase.industry}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                      {nextCase.title}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-sm font-bold text-[#1A73E8] group-hover:translate-x-1.5 transition-transform">
                  <span>Explorar Caso</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </section>
        )}

      </div>
    </main>
  );
};

export default CasoDeSucesso;
