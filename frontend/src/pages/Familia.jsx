import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { FaqJsonLd } from '../components/seo/JsonLd';

export const Familia = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const areas = [
    {
      icon: "fa-heart-circle-check",
      title: "Divórcio Consensual e Litigioso",
      desc: "Condução célere de divórcios judiciais e em cartório (extrajudiciais), partilha equilibrada de bens e tutela preventiva dos interesses das partes."
    },
    {
      icon: "fa-children",
      title: "Guarda, Convivência e Alimentos",
      desc: "Fixação, revisão e execução de pensão alimentícia, regulamentação de guarda compartilhada ou unilateral e plano de convivência parental."
    },
    {
      icon: "fa-ring",
      title: "Reconhecimento e Dissolução de União Estável",
      desc: "Formalização e extinção de união estável com definição patrimonial, regime de bens e salvaguarda dos direitos sucessórios e previdenciários."
    },
    {
      icon: "fa-file-shield",
      title: "Pactos Antinupciais e Planejamento Familiar",
      desc: "Assessoria consultiva na escolha do melhor regime de bens para o casamento ou união, visando proteção patrimonial e segurança para as famílias."
    },
    {
      icon: "fa-hand-holding-heart",
      title: "Investigação e Negatória de Paternidade",
      desc: "Ações de reconhecimento de filiação biológica ou socioafetiva, retificação de registro civil e regularização de direitos parentais."
    },
    {
      icon: "fa-user-shield",
      title: "Interdição e Curatela",
      desc: "Medidas judiciais protetivas para resguardar pessoas incapazes de gerir a própria vida civil e seus bens patrimoniais."
    }
  ];

  const faqs = [
    {
      question: "Qual a diferença entre o divórcio extrajudicial (em cartório) e o judicial?",
      answer: "O divórcio em cartório é cabível quando há consenso total entre o casal e ausência de filhos menores ou incapazes (salvo prévia resolução judicial sobre guarda/alimentos). É rápido e realizado por escritura pública. Havendo litígio ou menores, o processo deve tramitar no Judiciário."
    },
    {
      question: "Como é calculado o valor da pensão alimentícia?",
      answer: "Não existe um percentual fixo em lei (como os populares 30%). O juiz avalia o binômio necessidade de quem recebe versus possibilidade econômico-financeira de quem paga, buscando a máxima proporcionalidade."
    },
    {
      question: "A guarda compartilhada dispensa o pagamento de pensão alimentícia?",
      answer: "Não. A guarda compartilhada divide as decisões sobre a vida do filho (educação, saúde, rotina), mas os gastos do menor continuam sendo rateados proporcionalmente aos rendimentos dos pais."
    },
    {
      question: "O que acontece com os bens adquiridos durante a união estável?",
      answer: "Na falta de contrato escrito prevendo regime diferente, aplica-se a Comunhão Parcial de Bens: todo o patrimônio adquirido onerosamente durante a convivência é partilhado meio a meio, independentemente de quem registrou o bem."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Direito de Família | Alex Seles"
        description="Assessoria técnica e humanizada em Direito de Família: divórcio, pensão alimentícia, guarda, união estável e partilha de bens."
        keywords={["advogado direito de familia", "divorcio em cartorio", "pensao alimenticia", "guarda compartilhada", "uniao estavel"]}
        canonicalPath="/direito-de-familia"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Direito de Família</li>
          </ol>
        </nav>

        {/* Header da Página */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Área de Atuação
          </span>
          <h1 className="section-title">
            Direito de Família com serenidade, rigor técnico e foco na proteção patrimonial e pessoal.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Compreendemos a delicadeza dos conflitos familiares. Atuamos com discrição e firmeza para resolver questões de divórcio, guarda, pensão e partilha de bens, priorizando sempre a segurança jurídica e o bem-estar dos envolvidos.
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
            <h2 className="section-title">Perguntas sobre Direito de Família</h2>
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
            Necessita de orientação em Direito de Família?
          </h2>
          <p className="text-sm text-[#536773] mb-6 max-w-xl mx-auto leading-relaxed">
            Consulte nossa equipe para uma avaliação preliminar ética, sigilosa e orientada à melhor solução jurídica.
          </p>
          <Link to="/contato" className="btn-copper inline-flex">
            <span>Agendar avaliação do caso</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
};
export default Familia;
