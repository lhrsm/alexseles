import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../../data/articlesData';

export const ArticlesFeed = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const loadArticles = () => {
      const all = getAllArticles();
      setFeatured(all.slice(0, 6));
    };

    loadArticles();
    window.addEventListener('mc_articles_updated', loadArticles);
    return () => window.removeEventListener('mc_articles_updated', loadArticles);
  }, []);

  return (
    <section id="conteudos" className="py-20 sm:py-28 bg-white text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-14">
          <span className="eyebrow">
            Central de Conhecimento
          </span>
          <h2 className="section-title">
            Artigos e orientações para impulsionar o seu desenvolvimento.
          </h2>
          <p className="text-base sm:text-lg text-[#5B6B76] mt-4 leading-relaxed font-sans">
            Artigos, análises de tendências e materiais práticos elaborados por Alex Seles para orientar profissionais e líderes nas suas decisões do dia a dia.
          </p>
        </div>

        {featured.length === 0 ? (
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-xl p-10 text-center max-w-xl mx-auto space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1A73E8] flex items-center justify-center mx-auto text-lg">
              <i className="fa-solid fa-newspaper" aria-hidden="true"></i>
            </div>
            <h3 className="font-sans text-base font-bold text-[#163758]">
              Novos artigos em breve
            </h3>
            <p className="text-xs text-[#5B6B76] leading-relaxed">
              Novas publicações e conteúdos estratégicos sobre Carreira & TI serão publicados em breve diretamente pelo painel administrativo.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((post) => (
                <article 
                  key={post.id}
                  className="bg-[#F8FAFC] border border-slate-200/90 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#1A73E8] hover:shadow-md transition-all group"
                >
                  {post.image && (
                    <Link to={`/central-de-conhecimento/${post.slug}`} className="block overflow-hidden aspect-[16/9] bg-slate-900 w-full">
                      <img
                        src={post.image}
                        alt={post.h1 || post.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#5B6B76] mb-3 pb-3 border-b border-slate-200/60">
                        <span className="font-bold text-[#1557B0]">
                          {post.category}
                        </span>
                        <span>{post.readingTime}</span>
                      </div>

                      <h3 className="font-sans text-base font-bold text-[#163758] hover:text-[#1A73E8] transition-colors leading-snug mb-3">
                        <Link to={`/central-de-conhecimento/${post.slug}`}>
                          {post.h1}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-[#63717C] line-clamp-3 leading-relaxed mb-6 font-sans">
                        {post.metaDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#CCD4DA]/40">
                      <Link
                        to={`/central-de-conhecimento/${post.slug}`}
                        className="text-xs font-semibold text-[#163758] hover:text-[#1A73E8] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Ler guia completo</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/central-de-conhecimento"
                className="btn-navy"
              >
                <span>Explorar artigos</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
};
