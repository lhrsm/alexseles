import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { LandingHero, Belief, CommunitySection, AboutAlex, Manifesto, ClosingCta } from '../components/landing/Landing';
import { PreQualificationModal } from '../components/pre-qualification';
import { MetaTags } from '../components/seo/MetaTags';
import { PAGES } from '../config/seo';

export const Home = () => {
  const location = useLocation();
  const [preQualOpen, setPreQualOpen] = useState(false);
  const openPreQual = () => setPreQualOpen(true);

  // Link direto para a Pré-Qualificação (por exemplo o que a Beatriz envia no chat): www.alexseles.online/?pre-qualificacao
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('pre-qualificacao')) setPreQualOpen(true);
  }, []);

  // Chegada a partir de outra página com /#comunidade, /#sobre, /#manifesto: vai à secção (os artigos ficam só em /central-de-conhecimento)
  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id) return undefined;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main id="main-content" className="landing">
      <MetaTags title={PAGES[''].title} description={PAGES[''].description} canonicalPath="/" />

      <LandingHero onPreQual={openPreQual} />
      <Belief />
      <CommunitySection />
      <AboutAlex onPreQual={openPreQual} />
      <Manifesto />
      <TestimonialsSection />
      <ClosingCta onPreQual={openPreQual} />

      <PreQualificationModal isOpen={preQualOpen} onClose={() => setPreQualOpen(false)} />
    </main>
  );
};
