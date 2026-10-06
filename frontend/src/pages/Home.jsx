import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ArticlesFeed } from '../components/home/ArticlesFeed';
import { LandingHero, Belief, CommunitySection, AboutAlex, Manifesto, ClosingCta } from '../components/landing/Landing';
import { PreQualificationModal } from '../components/pre-qualification';
import { LegalServiceJsonLd } from '../components/seo/JsonLd';
import { MetaTags } from '../components/seo/MetaTags';

export const Home = () => {
  const location = useLocation();
  const [preQualOpen, setPreQualOpen] = useState(false);
  const openPreQual = () => setPreQualOpen(true);

  // Link direto para a Pré-Qualificação (por exemplo o que a Beatriz envia no chat): www.alexseles.online/?pre-qualificacao
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('pre-qualificacao')) setPreQualOpen(true);
  }, []);

  // Chegada a partir de outra página com /#comunidade, /#sobre, /#manifesto: vai à secção
  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id) return undefined;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main id="main-content" className="landing">
      <MetaTags
        title="Alex Seles | Comunidade PM Unlocked, Mentoria de Carreira e Gestão de Projetos em TI"
        description="Comunidade gratuita de gestão de projetos com Alex Seles: vagas, certificações PSM, PMP e SAFe, transição para TI e migrar para Portugal. Mentoria individual para acelerar a carreira."
        keywords={[
          "alex seles",
          "pm unlocked",
          "comunidade gestão de projetos",
          "vagas project manager portugal",
          "certificação psm pspo pmp safe",
          "mentoria de carreira ti",
          "transicao de carreira tecnologia",
          "migrar para portugal ti",
          "gestao de projetos pmp",
          "metodologias ageis scrum kanban",
          "itil 4",
          "mentoria alex seles"
        ]}
        canonicalPath="/"
      />
      <LegalServiceJsonLd />

      <LandingHero onPreQual={openPreQual} />
      <Belief />
      <CommunitySection />
      <AboutAlex onPreQual={openPreQual} />
      <Manifesto />
      <div id="artigos" className="scroll-mt-20">
        <ArticlesFeed />
      </div>
      <TestimonialsSection />
      <ClosingCta onPreQual={openPreQual} />

      <PreQualificationModal isOpen={preQualOpen} onClose={() => setPreQualOpen(false)} />
    </main>
  );
};
