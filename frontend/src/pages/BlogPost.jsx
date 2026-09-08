import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getArticleBySlug, getAllArticles } from '../data/articlesData';
import { MetaTags } from '../components/seo/MetaTags';
import { ArticleJsonLd } from '../components/seo/JsonLd';
import DOMPurify from 'dompurify';

export const BlogPost = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/central-de-conhecimento" replace />;
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.categorySlug === article.categorySlug && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title={article.h1 || article.title}
        description={article.metaDescription}
        keywords={article.keywords}
        image={article.image}
        type="article"
        canonicalPath={`/central-de-conhecimento/${article.slug}`}
      />
      <ArticleJsonLd article={article} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li><Link to="/central-de-conhecimento" className="hover:text-[#1A73E8]">Conhecimento</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium truncate max-w-xs">{article.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Artigo Principal */}
          <article className="lg:col-span-8 space-y-8">
            
            {/* Metadados Topo */}
            <div>
              <span className="eyebrow">
                {article.category}
              </span>
              <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl font-display">
                {article.h1}
              </h1>
              <div className="flex items-center gap-4 text-xs text-[#536773] mt-4 pt-4 border-t border-[#CCD4DA]">
                <span>Tempo de leitura estimado: {article.readingTime}</span>
                <span aria-hidden="true">•</span>
                <span>Alex Seles - Carreira & TI</span>
              </div>
            </div>

            {/* Imagem de Destaque do Artigo */}
            {article.image && (
              <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/90 bg-slate-900 w-full flex items-center justify-center">
                <img
                  src={article.image}
                  alt={article.h1 || article.title}
                  className="w-full h-auto max-h-[460px] object-cover object-center"
                  loading="eager"
                />
              </div>
            )}

            {/* Lead */}
            <div className="p-5 bg-[#F3F5F7] rounded border-l-4 border-[#1A73E8] text-[#536773] text-sm sm:text-base leading-relaxed font-sans">
              {article.metaDescription}
            </div>

            {/* Sumário */}
            <div className="p-6 bg-[#F3F5F7] rounded border border-[#CCD4DA]">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1A73E8] mb-3">
                Tópicos abordados neste artigo:
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#163758]">
                {article.h2Subtitles.map((sub, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1A73E8] font-mono" aria-hidden="true">→</span>
                    <a href={`#secao-${idx}`} className="hover:text-[#1A73E8] hover:underline transition-colors">
                      {sub}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seções de Texto */}
            <div className="space-y-8 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
              {article.sections.map((sec, idx) => (
                <section key={idx} id={`secao-${idx}`} className="scroll-mt-24 space-y-3 pt-4 border-t border-[#CCD4DA]/40">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
                    {idx + 1}. {sec.subtitle}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {DOMPurify.sanitize(p)}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[#CCD4DA]">
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded bg-[#F3F5F7] border border-[#CCD4DA] text-xs text-[#536773]"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Autor */}
            <div className="p-6 bg-[#F3F5F7] rounded border border-[#CCD4DA] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#163758] flex items-center justify-center text-white text-lg shrink-0">
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
              </div>
              <div>
                <strong className="text-sm font-bold text-[#163758] block">Alex Seles</strong>
                <p className="text-xs text-[#536773]">Head de Inovação & Tecnologia | Mentor de Carreira TI | Embaixador ITIL</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Mestre em Engenharia Informática • Membro PMI • +62k no LinkedIn</p>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Box CTA Lateral */}
            <div className="bg-[#F3F5F7] border border-[#CCD4DA] rounded p-6 space-y-4">
              <span className="eyebrow">Mentoria Executiva</span>
              <h3 className="font-display text-xl font-bold text-[#163758] leading-tight">
                Precisa de orientação prática para a sua carreira em TI?
              </h3>
              <p className="text-xs sm:text-sm text-[#536773] leading-relaxed font-sans">
                Agende uma sessão diagnóstica com Alex Seles e acelere a sua evolução em tecnologia, metodologias ágeis e liderança.
              </p>
              <Link
                to="/contato?tipo=sessao"
                className="btn-copper w-full justify-center"
              >
                <span>Vamos Conversar?</span>
                <span>→</span>
              </Link>
            </div>

            {/* Artigos Relacionados */}
            <div className="bg-white border border-[#CCD4DA] rounded p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-[#163758] uppercase tracking-wide border-b border-[#CCD4DA] pb-2">
                Outros artigos em {article.category}
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <div key={rel.id}>
                    <h4 className="font-sans text-xs font-bold text-[#163758] hover:text-[#1A73E8] transition-colors line-clamp-2">
                      <Link to={`/central-de-conhecimento/${rel.slug}`}>
                        {rel.h1}
                      </Link>
                    </h4>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {rel.readingTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </main>
  );
};
