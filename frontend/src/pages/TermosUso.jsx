import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const TermosUso = () => {
  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Termos de Utilização | Alex Seles - Carreira & TI"
        description="Termos de utilização e diretrizes dos serviços de mentoria de carreira e tecnologia de Alex Seles."
        keywords={["termos de utilizacao", "mentoria ti", "alex seles"]}
        canonicalPath="/termos-de-uso"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Termos de Utilização</li>
          </ol>
        </nav>

        <article className="space-y-6 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
          <span className="eyebrow">Institucional</span>
          <h1 className="section-title">
            Termos de Utilização e Diretrizes da Mentoria
          </h1>

          <p className="text-xs text-slate-500 border-b border-[#CCD4DA] pb-4">
            Diretrizes de utilização da plataforma e termos gerais dos serviços de orientação e aceleração profissional.
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">1. Finalidade Formativa e de Desenvolvimento</h2>
            <p>
              As publicações, guias e conteúdos disponibilizados neste sítio possuem caráter formativo e de desenvolvimento profissional. As mentorias individuais representam uma orientação estratégica personalizada baseada na experiência executiva de Alex Seles.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">2. Compromisso e Aceleração de Resultados</h2>
            <p>
              A aceleração de carreira depende do empenho e da dedicação prática do mentorando na execução do roteiro delineado. A mentoria fornece o método, o acompanhamento sénior e os atalhos comprovados para maximizar as hipóteses de sucesso profissional.
            </p>
          </section>
        </article>

      </div>
    </main>
  );
};
