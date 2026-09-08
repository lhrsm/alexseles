import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Propriedade = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const areas = [
    {
      icon: "fa-house-circle-check",
      title: "Regularização Registral de Imóveis",
      desc: "Adequação de escrituras, averbações, desmembramentos e retificação de áreas junto ao Cartório de Registro de Imóveis (CRI)."
    },
    {
      icon: "fa-landmark",
      title: "Usucapião Judicial e Extrajudicial",
      desc: "Reconhecimento originário de propriedade por meio de usucapião urbana, rural ou familiar, inclusive via procedimento direto em cartório."
    },
    {
      icon: "fa-shield-halved",
      title: "Ações Possessórias e Reivindicatórias",
      desc: "Reintegração de posse, manutenção de posse, interdito proibitório e defesa intransigente contra esbulhos e turbações ilegítimas."
    },
    {
      icon: "fa-file-signature",
      title: "Contratos Imobiliários e Due Diligence",
      desc: "Auditoria jurídica completa na compra e venda de imóveis, elaboração de promessas de compra e venda, permuta, dação em pagamento e locação."
    },
    {
      icon: "fa-building",
      title: "Direito Condominial e Vizinhança",
      desc: "Assessoria preventiva a síndicos e condôminos, cobrança de inadimplências, ações de nunciação de obra nova e controvérsias construtivas."
    },
    {
      icon: "fa-key",
      title: "Despejos e Rescisões Locatícias",
      desc: "Ajuizamento e defesa em ações de despejo por falta de pagamento, revisão de aluguel e desocupação de imóveis comerciais e residenciais."
    }
  ];

  const faqs = [
    {
      question: "Qual a diferença entre a posse de um imóvel e a propriedade legal?",
      answer: "A posse é o exercício de fato de poderes inerentes à propriedade (morar, cuidar, usar). A propriedade plena e definitiva, por sua vez, só é garantida pelo registro formal da escritura pública no Cartório de Registro de Imóveis competente ('quem não registra não é dono')."
    },
    {
      question: "Quanto tempo de ocupação é necessário para ter direito à usucapião?",
      answer: "O prazo varia conforme a modalidade de usucapião prevista no Código Civil e na Constituição: de 2 anos (abandono do lar/familiar), 5 anos (especial urbana e rural), até 10 ou 15 anos (ordinária e extraordinária), dependendo de justo título e boa-fé."
    },
    {
      question: "O que é due diligence imobiliária e por que ela é indispensável?",
      answer: "É uma auditoria jurídica prévia de riscos. Analisa certidões do imóvel e dos vendedores, processos judiciais pendentes, passivos fiscais e regularidade urbanística para evitar que o comprador perca o bem por fraude contra credores ou penhoras ocultas."
    },
    {
      question: "É possível regularizar um imóvel que possui apenas contrato de gaveta?",
      answer: "Sim. O contrato particular ('de gaveta') serve como justo título e comprovação de posse contínua. A depender do caso, a regularização é viabilizada por Ação de Adjudicação Compulsória ou Usucapião Extrajudicial."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito de Propriedade & Imobiliário | Alex Seles"
        description="Assessoria técnica em Direito de Propriedade: regularização de imóveis, usucapião, reintegração de posse e contratos imobiliários."
        keywords={["advogado de propriedade", "usucapiao cartorio", "regularizacao de imovel", "reintegracao de posse", "direito imobiliario"]}
        canonicalPath="/direito-de-propriedade"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito de Propriedade</li>
          </ol>
        </nav>

        {/* Header da Página */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Área de Atuação
          </span>
          <h1 className="section-title">
            Direito de Propriedade com segurança registral, defesa possessória e valorização patrimonial.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Protegemos o patrimônio imobiliário de particulares e empresas. Conduzimos regularizações de títulos, ações de usucapião e defesas possessórias com precisão técnica e rigor documental.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {areas.map((item, idx) => (
            <div key={idx} className="content-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 text-[#1A73E8] text-xl flex items-center mb-5">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                </div>
                <h2 className="font-sans text-lg font-bold text-[#163758] mb-3">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ da Área */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <span className="eyebrow">Dúvidas Frequentes</span>
            <h2 className="section-title">Perguntas sobre Direito de Propriedade</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-[#CCD4DA] rounded bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center text-sm font-bold text-[#163758] hover:text-[#1A73E8] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="text-base text-[#1A73E8] ml-4">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#536773] leading-relaxed border-t border-[#CCD4DA]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Institucional */}
        <div className="bg-[#F3F5F7] border border-[#CCD4DA] rounded-lg p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758] mb-4">
            Possui pendências de propriedade ou dúvidas sobre posse?
          </h2>
          <p className="text-sm text-[#536773] mb-6 max-w-xl mx-auto leading-relaxed">
            Consulte nossos especialistas para analisar a matrícula, títulos e viabilidade da regularização.
          </p>
          <Link to="/contato" className="btn-copper inline-flex">
            <span>Avaliar regularização do imóvel</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};
export default Propriedade;
