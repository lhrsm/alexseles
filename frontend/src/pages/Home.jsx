import React from 'react';
import { Hero } from '../components/home/Hero';
import { CareerTransitionsSection } from '../components/home/CareerTransitionsSection';
import { AboutSplit } from '../components/home/AboutSplit';
import { ArticlesFeed } from '../components/home/ArticlesFeed';
import { CtaSection } from '../components/home/CtaSection';
import { LegalServiceJsonLd } from '../components/seo/JsonLd';
import { MetaTags } from '../components/seo/MetaTags';

export const Home = () => {
  return (
    <main id="main-content">
      <MetaTags
        title="Alex Seles | Mentoria de Carreira e Tecnologia em TI"
        description="Acelere a sua transição para tecnologia e alcance cargos de liderança em TI com a mentoria estratégica de Alex Seles. Mais de 20 anos de experiência internacional."
        keywords={[
          "alex seles",
          "mentoria de carreira ti",
          "transicao de carreira tecnologia",
          "inteligencia artificial na gestao de projetos",
          "ia aplicada a ti",
          "lideranca executiva em ti",
          "ceo ti",
          "cto",
          "head de tecnologia",
          "head de inovacao",
          "gestao de projetos pmp",
          "metodologias ageis scrum kanban",
          "certificacao psm pspo",
          "itil 4",
          "engenheiro informatico alex seles",
          "mentoria alex seles",
          "curriculo ats",
          "linkedin estrategico ti"
        ]}
        canonicalPath="/"
      />
      <LegalServiceJsonLd />
      
      {/* 1ª Secção: Carrossel de Mapeamento por Formação (ecrã grande, 1 imagem por vez) */}
      <CareerTransitionsSection />

      {/* 2ª Secção: Estagnado na carreira? Perdido na transição para TI? (Cinza) */}
      <Hero />

      {/* 3ª Secção: Artigos e orientações (Branco) */}
      <ArticlesFeed />

      {/* 4ª Secção: Sobre Alex Seles (Cinza - por último, antes do CTA) */}
      <AboutSplit />

      {/* 5ª Secção: Preparado para acelerar a sua transição? (Branco - CTA Final) */}
      <CtaSection />
    </main>
  );
};
