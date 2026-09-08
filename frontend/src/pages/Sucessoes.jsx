import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Sucessoes = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const areas = [
    {
      icon: "fa-book-bookmark",
      title: "Inventário Extrajudicial em Cartório",
      desc: "Procedimento rápido e desburocratizado para transmissão patrimonial aos herdeiros por escritura pública, reduzindo custos e prazos."
    },
    {
      icon: "fa-gavel",
      title: "Inventário Judicial e Partilha de Bens",
      desc: "Atuação estratégica e firme em inventários com herdeiros menores, divergências na partilha ou presença de testamento com necessidade de homologação."
    },
    {
      icon: "fa-chess",
      title: "Planejamento Sucessório e Holding Familiar",
      desc: "Estruturação preventiva da sucessão com doação de bens com reserva de usufruto, criação de estruturas societárias e otimização do ITCMD."
    },
    {
      icon: "fa-scroll",
      title: "Elaboração e Abertura de Testamentos",
      desc: "Consultoria e confecção de testamentos públicos, cerrados ou particulares, respeitando a legítima dos herdeiros necessários e a vontade do testador."
    },
    {
      icon: "fa-handshake",
      title: "Cessão de Direitos Hereditários",
      desc: "Formalização e análise de contratos de cessão de direitos sobre quinhão hereditário com segurança para alienantes e adquirentes."
    },
    {
      icon: "fa-shield-halved",
      title: "Defesa dos Herdeiros e Colação de Bens",
      desc: "Ações de sonegados, anulação de partilhas viciadas e equalização de adiantamentos de herança feitos em vida pelo autor da herança."
    }
  ];

  const faqs = [
    {
      question: "Qual o prazo legal para abertura do processo de inventário?",
      answer: "O prazo estabelecido pelo Código de Processo Civil é de 60 (sessenta) dias a contar da data do falecimento. Ultrapassado esse prazo, pode incidir multa sobre o imposto de transmissão (ITCMD), cuja alíquota varia conforme o Estado."
    },
    {
      question: "Quando o inventário pode ser realizado diretamente em cartório?",
      answer: "O inventário extrajudicial é possível quando todos os herdeiros forem maiores, capazes e estiverem em pleno acordo quanto à divisão dos bens, além de estarem devidamente assistidos por advogado habilitado."
    },
    {
      question: "Como funciona o ITCMD e quem deve arcar com os custos?",
      answer: "O ITCMD (Imposto sobre Transmissão Causa Mortis e Doação) é um tributo estadual cobrado sobre o valor venal dos bens transmitidos. A responsabilidade pelo pagamento recai sobre os herdeiros beneficiados pela partilha."
    },
    {
      question: "O que é planejamento sucessório e quais são as suas vantagens?",
      answer: "É o conjunto de medidas jurídicas tomadas ainda em vida para organizar a transferência do patrimônio aos sucessores. Evita litígios familiares, preserva a continuidade de empresas familiares e reduz significativamente o impacto tributário e as custas de inventário."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito das Sucessões | Alex Seles"
        description="Especialização em Direito das Sucessões: inventário em cartório e judicial, partilha de bens, testamentos e planejamento sucessório."
        keywords={["advogado de inventario", "inventario em cartorio", "partilha de bens heranca", "planejamento sucessorio", "testamento"]}
        canonicalPath="/direito-das-sucessoes"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito das Sucessões</li>
          </ol>
        </nav>

        {/* Header da Página */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Área de Atuação
          </span>
          <h1 className="section-title">
            Direito das Sucessões com segurança patrimonial, agilidade processual e harmonia familiar.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Orientamos herdeiros e famílias na transmissão patrimonial com o menor atrito possível, conduzindo inventários com eficiência documental e planejamento estratégico para mitigar custos tributários e burocráticos.
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
            <h2 className="section-title">Perguntas sobre Inventário e Sucessões</h2>
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
            Precisa abrir inventário ou planejar a partilha de bens?
          </h2>
          <p className="text-sm text-[#536773] mb-6 max-w-xl mx-auto leading-relaxed">
            Nossa equipe analisa os documentos e aponta a via mais rápida e econômica para a sua família.
          </p>
          <Link to="/contato" className="btn-copper inline-flex">
            <span>Consultar sobre inventário</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};
export default Sucessoes;
