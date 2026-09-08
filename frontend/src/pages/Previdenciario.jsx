import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articlesData } from '../data/articlesData';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Previdenciario = () => {
  const pensionArticles = articlesData.filter(a => a.categorySlug === 'direito-previdenciario');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Qual é o objetivo do Planejamento Previdenciário?",
      answer: "O Planejamento Previdenciário é um diagnóstico minucioso do extrato do CNIS para corrigir pendências, reconhecer períodos especiais e simular as regras de transição da Reforma (EC 103/2019), permitindo ao segurado requerer o benefício com o maior valor financeiro possível."
    },
    {
      question: "Como proceder quando o benefício por incapacidade for negado pelo INSS?",
      answer: "Diante do indeferimento na perícia administrativa, é possível apresentar recurso administrativo à Junta de Recursos ou ajuizar Ação Previdenciária na Justiça Federal, ocasião em que será nomeado perito médico judicial independente para novo exame."
    },
    {
      question: "Quem tem direito a receber o benefício assistencial BPC/LOAS?",
      answer: "O BPC é concedido a idosos com 65 anos ou mais e pessoas com deficiência de qualquer faixa etária em condição de vulnerabilidade econômica, mediante comprovação dos critérios legais de renda e impedimentos de longo prazo."
    },
    {
      question: "O que é necessário para comprovar tempo de serviço sob condições especiais?",
      answer: "A comprovação de atividade nociva à saúde é realizada mediante o PPP (Perfil Profissiográfico Previdenciário) e LTCAT emitidos pela empresa, sendo essencial para a concessão de aposentadoria especial ou conversão em tempo comum."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito Previdenciário (INSS) | Alex Seles"
        description="Planejamento de aposentadorias, benefícios por incapacidade, BPC/LOAS, pensão por morte e recursos perante o INSS."
        keywords={["advogado previdenciario inss", "planejamento aposentadoria", "bpc loas", "pericia negada inss", "aposentadoria especial"]}
        canonicalPath="/direito-previdenciario"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito Previdenciário</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Seguridade Social
          </span>
          <h1 className="section-title">
            Direito Previdenciário: planejamento, concessão e revisão de benefícios.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Auditoria detalhada do histórico de contribuições e representação técnica em aposentadorias, benefícios por incapacidade e assistência social perante o INSS e a Justiça Federal.
          </p>
        </div>

        {/* Grid dos 20 Artigos / Guias Previdenciários */}
        <div className="mb-20 pb-16 border-b border-[#CCD4DA]/60">
          <div className="mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
              Benefícios e situações previdenciárias
            </h2>
            <p className="text-sm text-[#536773] mt-1">
              Consulte nossos artigos com análises jurídicas baseadas nas regras atuais da Emenda Constitucional 103/2019.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pensionArticles.map((art) => (
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
            <h2 className="section-title">Perguntas comuns sobre Benefícios do INSS</h2>
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
            Deseja realizar o cálculo do seu tempo de contribuição?
          </h3>
          <p className="text-sm text-[#C6D1DA] max-w-xl mx-auto mb-6">
            Converse com nossa equipe para planejar sua aposentadoria e esclarecer dúvidas sobre o seu extrato do CNIS.
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
