import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Civil = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const civilAreas = [
    {
      icon: "fa-file-signature",
      title: "Contratos e Relações Obrigacionais",
      desc: "Elaboração, análise de riscos e revisão de instrumentos contratuais civis, comerciais e de prestação de serviços, visando mitigar conflitos futuros e assegurar equilíbrio negocial."
    },
    {
      icon: "fa-scale-balanced",
      title: "Responsabilidade Civil e Indenizações",
      desc: "Atuação contenciosa e preventiva em pedidos de reparação por danos materiais, danos morais, danos estéticos e lucros cessantes decorrentes de atos ilícitos ou inadimplementos."
    },
    {
      icon: "fa-handshake-angle",
      title: "Direito das Obrigações e Cobranças",
      desc: "Execução de títulos judiciais e extrajudiciais, recuperação de créditos e condução de negociações extrajudiciais com foco na composição eficiente e célere de pendências financeiras."
    },
    {
      icon: "fa-shield-halved",
      title: "Direito do Consumidor",
      desc: "Defesa técnica e orientação em controvérsias consumeristas, abrangendo vícios de produtos ou serviços, cobranças indevidas, práticas comerciais abusivas e cláusulas leoninas."
    },
    {
      icon: "fa-building-columns",
      title: "Direito Imobiliário e Posse",
      desc: "Assessoria em transações imobiliárias, ações possessórias, despejos, rescisões de promessa de compra e venda e regularização registral de bens imóveis."
    },
    {
      icon: "fa-comments-dollar",
      title: "Mediação e Resolução de Conflitos",
      desc: "Representação estratégica em acordos extrajudiciais, mediações e arbitragens para resolução pacífica e economicamente vantajosa de impasses cíveis."
    }
  ];

  const faqs = [
    {
      question: "O que caracteriza o dever de indenizar por dano moral ou material?",
      answer: "A responsabilidade civil decorre da demonstração de conduta culposa ou dolosa (ou risco da atividade), ocorrência de dano efetivo e nexo causal entre a ação/omissão e o prejuízo experimentado pela vítima, conforme arts. 186 e 927 do Código Civil."
    },
    {
      question: "Qual a importância da revisão prévia de um contrato por um advogado?",
      answer: "A revisão preventiva identifica cláusulas ambíguas, desproporcionais ou ilegais, ajusta garantias e multas rescisórias, prevenindo litígios judiciais onerosos e garantindo segurança jurídica para ambas as partes."
    },
    {
      question: "Como funciona o processo de cobrança e recuperação judicial de créditos?",
      answer: "Inicia-se pela notificação extrajudicial e busca de conciliação amigável. Não havendo composição, ingressa-se com Ação de Execução de Título Extrajudicial ou Ação Monitória para penhora e expropriação de bens do devedor."
    },
    {
      question: "Quais são os prazos prescricionais mais comuns no Direito Civil?",
      answer: "A regra geral de prescrição do Código Civil é de 10 anos (art. 205). Contudo, pretensões de reparação civil e cobranças contratuais específicas prescrevem ordinariamente em 3 a 5 anos (art. 206), exigindo atuação diligente."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito Civil | Alex Seles"
        description="Atuação em responsabilidade civil, contratos e obrigações."
        keywords={["advogado civil", "direito civil", "contratos", "alex seles"]}
        canonicalPath="/direito-civil"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito Civil</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Prática Especializada
          </span>
          <h1 className="section-title">
            Direito Civil: segurança jurídica patrimonial, contratual e indenizatória.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Assessoria jurídica consultiva e atuação contenciosa na defesa de direitos patrimoniais, elaboração de contratos sólidos, reparação de danos e solução de litígios civis.
          </p>
        </div>

        {/* Grid de Atuações em Direito Civil */}
        <div className="mb-20 pb-16 border-b border-[#CCD4DA]/60">
          <div className="mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
              Áreas de atuação em Direito Civil
            </h2>
            <p className="text-sm text-[#536773] mt-1">
              Atendimento focado na prevenção de passivos e na defesa resolutiva dos seus interesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {civilAreas.map((area, idx) => (
              <div
                key={idx}
                className="bg-[#F3F5F7] border border-[#CCD4DA] rounded p-6 flex flex-col justify-between hover:border-[#1A73E8] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded text-[#1A73E8] text-xl flex items-center justify-start mb-4">
                    <i className={`fa-solid ${area.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-sans text-base font-bold text-[#163758] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#63717C] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="mb-8 text-center sm:text-left">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="section-title">Perguntas comuns sobre Direito Civil</h2>
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
            Precisa de orientação jurídica em Direito Civil?
          </h3>
          <p className="text-sm text-[#C6D1DA] max-w-xl mx-auto mb-6">
            Agende uma consulta com a nossa equipe jurídica para análise técnica do seu caso ou contrato.
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
