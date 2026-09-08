import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const Parcerias = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    oab: '',
    email: '',
    telefone: '',
    cidade: '',
    mensagem: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const pillars = [
    {
      icon: "fa-handshake",
      title: "Atuação Conjunta Estratégica",
      desc: "Cooperação técnica em demandas complexas de Direito do Trabalho, Direito Previdenciário e Direito Civil, unindo forças em benefício do cliente."
    },
    {
      icon: "fa-scale-balanced",
      title: "Compliance e Ética OAB",
      desc: "Contratos de parceria transparentes, com regras claras de divisão de honorários e rigorosa observância ao Código de Ética e Disciplina da OAB."
    },
    {
      icon: "fa-map-location-dot",
      title: "Correspondência e Apoio em SP",
      desc: "Suporte para advogados de outros estados que necessitam de representação em audiências, diligências presenciais ou despachos em São Paulo."
    },
    {
      icon: "fa-shield-halved",
      title: "Sigilo e Segurança Documental",
      desc: "Garantia irrestrita de confidencialidade e tratamento seguro de dados em conformidade com as diretrizes da LGPD."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Programa de Parcerias | Alex Seles"
        description="Parcerias profissionais e institucionais para inovação e desenvolvimento corporativo."
        keywords={["parcerias", "consultoria ti", "mentoria corporativa", "alex seles"]}
        canonicalPath="/parcerias"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-slate-400">Oportunidades</li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Parcerias</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Rede de Cooperação
          </span>
          <h1 className="section-title">
            Programa de Parceria: cooperação jurídica sólida e transparente.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Construímos relações de mútua confiança com colegas de profissão em todo o país, somando especialidades para atender demandas trabalhistas, previdenciárias e cíveis com máxima excelência.
          </p>
        </div>

        {/* Pilares do Programa */}
        <section aria-labelledby="parcerias-pilares-title" className="mb-20">
          <h2 id="parcerias-pilares-title" className="sr-only">
            Diretrizes e Pilares da Parceria Institucional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F3F5F7] border border-[#CCD4DA] rounded p-6 flex flex-col justify-between hover:border-[#1A73E8] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded text-[#1A73E8] text-xl flex items-center justify-start mb-4">
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-sans text-base font-bold text-[#163758] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#536773] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formulário de Contato para Parcerias */}
        <div className="max-w-3xl mx-auto bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-8">
            <span className="eyebrow">Vamos conversar?</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
              Proponha uma parceria profissional
            </h2>
            <p className="text-sm text-[#536773] mt-2">
              Preencha os dados abaixo. Nossa equipe entrará em contato para alinhar os termos de colaboração.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#EBF7EE] border border-[#96DC96] rounded p-6 text-center text-[#1C6826]">
              <i className="fa-solid fa-circle-check text-2xl mb-2" aria-hidden="true"></i>
              <p className="font-bold text-base">Mensagem recebida com sucesso!</p>
              <p className="text-sm mt-1">Retornaremos o contato institucional em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                    placeholder="Dr(a). Seu Nome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    Inscrição OAB (UF e Número) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.oab}
                    onChange={(e) => setFormData({ ...formData, oab: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                    placeholder="Ex: OAB/SP 123.456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    E-mail Profissional *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                    placeholder="email@seuescritorio.adv.br"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                  Cidade / Estado *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                  placeholder="São Paulo, SP"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                  Proposta ou Informações da Demanda *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                  placeholder="Descreva a área de atuação de interesse, tipo de demanda ou objetivo da parceria..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-copper justify-center text-sm font-semibold py-3 rounded cursor-pointer"
                >
                  <span>Enviar proposta de parceria</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
};
