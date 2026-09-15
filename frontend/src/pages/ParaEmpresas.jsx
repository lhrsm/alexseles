import React, { useState } from 'react';
import { CorporateTransitionsSection } from '../components/corporate/CorporateTransitionsSection';
import { CorporateHero } from '../components/corporate/CorporateHero';
import { CorporatePillars } from '../components/corporate/CorporatePillars';
import { CorporateAboutSplit } from '../components/corporate/CorporateAboutSplit';
import { CorporateCtaSection } from '../components/corporate/CorporateCtaSection';
import { ArticlesFeed } from '../components/home/ArticlesFeed';
import { CorporateDiagnosisModal } from '../components/corporate/CorporateDiagnosisModal';
import { MetaTags } from '../components/seo/MetaTags';

export const ParaEmpresas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main id="main-content">
      <MetaTags
        title="Alex Seles • Soluções Corporativas | Transformação Digital, Automação, IA & Governação de TI"
        description="Acelere a maturidade tecnológica da sua empresa. Transformação digital, automação de processos, integração segura de IA e capacitação estratégica de equipas de TI com Alex Seles."
        keywords={[
          "alex seles empresas",
          "transformacao digital empresas portugal",
          "automacao de processos e ia",
          "inteligencia artificial empresas",
          "capacitacao equipas ti",
          "up-skilling programadores",
          "sdlc e engenharia de software",
          "governanca de ti pmp safe itil",
          "mentoria tech leads",
          "consultoria ti empresas"
        ]}
        canonicalPath="/para-empresas"
      />

      {/* 1ª Secção: Carrossel de Soluções Corporativas (com as frases de impacto e imagens exclusivas para empresas) */}
      <CorporateTransitionsSection onOpenModal={() => setIsModalOpen(true)} />

      {/* 2ª Secção: Hero com Dores Corporativas & Citação Oficial de Alex Seles */}
      <CorporateHero isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* 3ª Secção: Pilares Estratégicos de Intervenção B2B */}
      <CorporatePillars onOpenModal={() => setIsModalOpen(true)} />

      {/* 4ª Secção: Artigos & Insights Técnicos para Lideranças de Tecnologia */}
      <ArticlesFeed />

      {/* 5ª Secção: Sobre Alex Seles (Trajetória Corporativa & Grandes Contas) */}
      <CorporateAboutSplit />

      {/* 6ª Secção: Briefing Executivo & Formulário B2B */}
      <CorporateCtaSection />

      {/* Modal Corporativa de Diagnóstico Global */}
      <CorporateDiagnosisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default ParaEmpresas;
