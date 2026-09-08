import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articlesData } from '../data/articlesData';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Trabalhista = () => {
  const laborArticles = articlesData.filter(a => a.categorySlug === 'direito-do-trabalho');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "O que caracteriza a rescisão indireta e quando ela é cabível?",
      answer: "A rescisão indireta ocorre quando o empregador pratica falta grave nos termos do art. 483 da CLT (como atraso contínuo de salários, ausência de depósitos do FGTS ou assédio moral). Ao ser declarada em juízo, o empregado tem direito a todas as verbas equivalentes a uma demissão sem justa causa."
    },
    {
      question: "Qual é o tempo limite para reivindicar direitos trabalhistas na Justiça?",
      answer: "O trabalhador tem até 2 anos após a extinção do contrato para ajuizar a reclamação trabalhista, podendo requerer os direitos referentes aos últimos 5 anos anteriores à data do protocolo da ação."
    },
    {
      question: "Quem sofre acidente de trabalho ou doença ocupacional possui estabilidade?",
      answer: "Sim. O trabalhador que esteve afastado recebendo benefício por incapacidade acidentária (B91) junto ao INSS tem direito à garantia de emprego por pelo menos 12 meses após a cessação do benefício, conforme o art. 118 da Lei 8.213/91."
    },
    {
      question: "Quais elementos servem para comprovar a realização de horas extras?",
      answer: "Podem ser utilizados registros de ponto, mensagens e e-mails profissionais fora do expediente, relatórios de login em plataformas digitais, depoimentos testemunhais e extratos de localização."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito do Trabalho | Alex Seles"
        description="Atuação em causas trabalhistas complexas, rescisões indiretas, horas extras, acidentes de trabalho e assédio moral."
        keywords={["advogado trabalhista", "rescisao indireta", "horas extras", "acidente de trabalho", "insalubridade", "alex seles"]}
        canonicalPath="/direito-do-trabalho"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito do Trabalho</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Prática Especializada
          </span>
          <h1 className="section-title">
            Direito do Trabalho: equilíbrio e proteção nas relações de emprego.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Assessoria consultiva e atuação contenciosa em contratos individuais de trabalho, apuração de verbas devidas, adicionais legais e saúde do trabalhador.
          </p>
        </div>

        {/* Grid dos 20 Artigos / Guias de Trabalho */}
        <div className="mb-20 pb-16 border-b border-[#CCD4DA]/60">
          <div className="mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
              Temas trabalhistas frequentes
            </h2>
            <p className="text-sm text-[#536773] mt-1">
              Consulte nossos guias com análises fundamentadas na CLT e nos precedentes consolidados do TST.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laborArticles.map((art) => (
              <div
                key={art.id}
                className="bg-[#F3F5F7] border border-[#CCD4DA] rounded p-6 flex flex-col justify-between hover:border-[#1A73E8] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#536773] mb-3 pb-2 border-b border-[#CCD4DA]/40">
                    <span className="font-semibold text-[#1A73E8]">Guia #{art.number}</span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h3 className="font-sans text-base font-bold text-[#163758] hover:text-[#1A73E8] transition-colors mb-2 line-clamp-2">
                    <Link to={`/central-de-conhecimento/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#63717C] line-clamp-3 leading-relaxed mb-4">
                    {art.metaDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CCD4DA]/40">
                  <Link
                    to={`/central-de-conhecimento/${art.slug}`}
                    className="text-xs font-semibold text-[#163758] hover:text-[#1A73E8] inline-flex items-center gap-1"
                  >
                    <span>Ler orientação técnica</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="mb-8 text-center sm:text-left">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="section-title">Perguntas comuns sobre Direitos Trabalhistas</h2>
          </div>

          <div className="divide-y divide-[#CCD4DA]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-sans text-base font-bold text-[#163758] hover:text-[#1A73E8] py-1"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#1A73E8] text-lg font-mono shrink-0">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="pt-3 pb-2 text-sm text-[#536773] leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 bg-[#163758] text-white rounded text-center max-w-4xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Deseja examinar sua relação de trabalho?
          </h3>
          <p className="text-sm text-[#C6D1DA] max-w-xl mx-auto mb-6">
            Converse com nossa equipe para conferência de holerites, acordos e termos de rescisão contratual.
          </p>
          <Link
            to="/contato"
            className="btn-copper"
          >
            <span>Agendar atendimento</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};
