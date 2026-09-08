import React from 'react';
import { Link } from 'react-router-dom';
import { articlesData } from '../../data/articlesData';

export const KnowledgeFeed = () => {
  // Pega 3 artigos estratégicos (ex: Rescisão Indireta, Planejamento Previdenciário, Acidente de Trabalho)
  const featuredArticles = [
    articlesData.find(a => a.id === 'direito-trabalhista-1') || articlesData[20],
    articlesData.find(a => a.id === 'direito-previdenciario-1') || articlesData[0],
    articlesData.find(a => a.id === 'direito-trabalhista-16') || articlesData[35]
  ];

  return (
    <section className="py-24 bg-[#07090D] text-white border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1A73E8] mb-2">
              Central de Conhecimento Jurídico
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Artigos e Orientações Técnicas
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-xl">
              Conteúdos aprofundados sobre direitos trabalhistas e previdenciários, preparados com responsabilidade técnica e fundamentação legal.
            </p>
          </div>

          <Link
            to="/central-de-conhecimento"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#262E3D] bg-[#131722] hover:bg-[#181E2E] text-slate-200 text-xs font-semibold transition-all shrink-0"
          >
            <span>Acessar Todos os 40 Artigos</span>
            <i className="fa-solid fa-arrow-right text-xs text-[#1A73E8]" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-[#131722] border border-[#262E3D] rounded-xl p-6 flex flex-col justify-between hover:border-[#1A73E8]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4 pb-3 border-b border-[#262E3D]">
                  <span className="px-2.5 py-1 rounded-full bg-[#181E2E] border border-[#262E3D] text-[#1A73E8] font-medium">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <i className="fa-regular fa-clock" aria-hidden="true"></i>
                    {art.readingTime}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#1A73E8] transition-colors line-clamp-2 mb-3">
                  <Link to={`/central-de-conhecimento/${art.slug}`}>
                    {art.h1}
                  </Link>
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {art.metaDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-[#262E3D] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <i className="fa-solid fa-user-pen text-[#1A73E8]" aria-hidden="true"></i>
                  <span>Alex Seles</span>
                </div>

                <Link
                  to={`/central-de-conhecimento/${art.slug}`}
                  className="text-xs font-bold text-[#1A73E8] group-hover:text-[#1557B0] flex items-center gap-1.5 transition-colors"
                  aria-label={`Ler o artigo completo sobre ${art.title}`}
                >
                  <span>Ler Artigo</span>
                  <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
