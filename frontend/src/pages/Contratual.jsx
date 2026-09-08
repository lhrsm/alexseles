import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Contratual = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const areas = [
    {
      icon: "fa-file-signature",
      title: "Elaboração e Redação Estratégica de Contratos",
      desc: "Desenvolvimento de instrumentos jurídicos personalizados para pessoas físicas e empresas, prevendo garantias sólidas e evitando ambiguidades."
    },
    {
      icon: "fa-magnifying-glass-chart",
      title: "Auditoria e Análise Preventiva de Riscos",
      desc: "Revisão minuciosa de minutas antes da assinatura, identificando cláusulas abusivas, desequilíbrios contratuais e contingências financeiras."
    },
    {
      icon: "fa-handshake-slash",
      title: "Rescisão, Distrato e Resolução por Inadimplemento",
      desc: "Assessoria no rompimento motivado ou consensual de contratos, cálculo de multas rescisórias devidas e cobrança de perdas e danos."
    },
    {
      icon: "fa-scale-balanced",
      title: "Ações Revisionais de Contratos e Cláusulas Leoninas",
      desc: "Ajuizamento de demandas para reequilibrar contratos com onerosidade excessiva, afastar juros abusivos ou anular cláusulas leoninas."
    },
    {
      icon: "fa-building-shield",
      title: "Contratos Comerciais e Societários",
      desc: "Assessoria em contratos de prestação de serviços, fornecimento, representação comercial, sigilo (NDA) e acordos de sócios."
    },
    {
      icon: "fa-comments-dollar",
      title: "Execução de Títulos e Cobrança Contratual",
      desc: "Cobrança extrajudicial e judicial de valores inadimplidos, execução de títulos executivos e recuperação de ativos contratuais."
    }
  ];

  const faqs = [
    {
      question: "Por que não é recomendado utilizar modelos prontos de contratos da internet?",
      answer: "Modelos genéricos desconsideram as especificidades da negociação, utilizam legislação desatualizada ou cláusulas nulas de pleno direito. Um contrato customizado assegura garantias executórias válidas e previne litígios judiciais custosos."
    },
    {
      question: "O que é a teoria da imprevisão e quando um contrato pode ser revisto judicialmente?",
      answer: "Conforme os arts. 317 e 478 do Código Civil, quando eventos extraordinários e imprevisíveis tornam a obrigação de uma das partes excessivamente onerosa com extrema vantagem para a outra, o juiz pode intervir para reequilibrar as bases do negócio."
    },
    {
      question: "O que caracteriza uma cláusula contratual abusiva ou leonina?",
      answer: "É aquela que coloca uma das partes em desvantagem exagerada, suprime direitos essenciais ou impõe penalidades desproporcionais. Cláusulas abusivas podem ser declaradas nulas judicialmente, preservando-se o restante do contrato."
    },
    {
      question: "Quais cuidados devem ser tomados ao assinar um termo de rescisão ou distrato?",
      answer: "É fundamental verificar a quitação ampla, a liberação recíproca de obrigações, a destinação de garantias anteriores e a ausência de renúncias tácitas a indenizações por eventuais prejuízos pretéritos."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito Contratual | Alex Seles"
        description="Consultoria e contencioso em Direito Contratual: elaboração de contratos, análise de riscos, rescisões e ações revisionais."
        keywords={["advogado de contratos", "direito contratual", "elaboracao de contratos", "revisao de contrato", "rescisao contratual"]}
        canonicalPath="/direito-contratual"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito Contratual</li>
          </ol>
        </nav>

        {/* Header da Página */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Área de Atuação
          </span>
          <h1 className="section-title">
            Direito Contratual com precisão técnica, blindagem de riscos e equilíbrio negocial.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Cada cláusula importa. Redigimos e revisamos contratos para prevenir litígios, proteger seus interesses patrimoniais e garantir que os compromissos assumidos tenham plena validade e força executiva.
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
            <h2 className="section-title">Perguntas sobre Direito Contratual</h2>
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
            Precisa revisar ou elaborar um contrato com segurança?
          </h2>
          <p className="text-sm text-[#536773] mb-6 max-w-xl mx-auto leading-relaxed">
            Envie a minuta ou descreva a negociação para uma auditoria contratual criteriosa.
          </p>
          <Link to="/contato" className="btn-copper inline-flex">
            <span>Solicitar revisão contratual</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};
export default Contratual;
