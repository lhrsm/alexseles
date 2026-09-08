import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const Estagios = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    faculdade: '',
    semestre: '',
    email: '',
    telefone: '',
    modalidade: 'hibrido',
    apresentacao: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    {
      icon: "fa-graduation-cap",
      title: "Mentoria Direta",
      desc: "Acompanhamento próximo com Alex Seles, com aprendizado prático de estratégias executivas e rigor analítico."
    },
    {
      icon: "fa-solid fa-file-contract",
      title: "Análise Estruturada de Projetos",
      desc: "Elaboração de documentos de escopo, relatórios analíticos e planejamento de entregas sob supervisão sênior."
    },
    {
      icon: "fa-solid fa-laptop-code",
      title: "Ferramentas Modernas de Gestão",
      desc: "Prática com metodologias ágeis, inteligência artificial e processos digitais modernos."
    },
    {
      icon: "fa-solid fa-award",
      title: "Desenvolvimento Profissional",
      desc: "Feedback contínuo para aceleração de carreira, orientação profissional e transição para o mercado."
    }
  ];

  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Programa de Estágio | Alex Seles"
        description="Oportunidades de estágio com mentoria de Alex Seles. Aprendizado prático e desenvolvimento acelerado."
        keywords={["estagio", "estagio ti", "vagas estagio", "alex seles"]}
        canonicalPath="/estagios"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-slate-400">Oportunidades</li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Estágios</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">
            Formação e Carreira
          </span>
          <h1 className="section-title">
            Programa de Estágio: prática jurídica com rigor técnico e propósito.
          </h1>
          <p className="text-base sm:text-lg text-[#536773] mt-4 leading-relaxed font-sans">
            Buscamos estudantes de Direito motivados pelo aprendizado contínuo, pela ética e pelo rigor processual. Aqui, sua formação acadêmica é potencializada pela vivência prática em casos concretos.
          </p>
        </div>

        {/* Pilares do Estágio */}
        <section aria-labelledby="estagio-pilares-title" className="mb-20">
          <h2 id="estagio-pilares-title" className="sr-only">
            Diferenciais e Pilares do Programa de Estágio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, idx) => (
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

        {/* Formulário de Candidatura */}
        <div className="max-w-3xl mx-auto bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-8">
            <span className="eyebrow">Cadastre seu perfil</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
              Candidate-se ao Banco de Talentos
            </h2>
            <p className="text-sm text-[#536773] mt-2">
              Envie suas informações acadêmicas para avaliação em nossos processos seletivos contínuos.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#EBF7EE] border border-[#96DC96] rounded p-6 text-center text-[#1C6826]">
              <i className="fa-solid fa-circle-check text-2xl mb-2" aria-hidden="true"></i>
              <p className="font-bold text-base">Candidatura cadastrada com sucesso!</p>
              <p className="text-sm mt-1">Agradecemos pelo interesse. Havendo abertura de vaga para o seu perfil, entraremos em contato.</p>
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
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    Instituição de Ensino *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.faculdade}
                    onChange={(e) => setFormData({ ...formData, faculdade: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                    placeholder="Ex: USP, PUC, Mackenzie, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    Semestre Atual *
                  </label>
                  <select
                    value={formData.semestre}
                    onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="1º ao 3º semestre">1º ao 3º semestre</option>
                    <option value="4º ao 6º semestre">4º ao 6º semestre</option>
                    <option value="7º ao 8º semestre">7º ao 8º semestre</option>
                    <option value="9º ou 10º semestre">9º ou 10º semestre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                    placeholder="seu.email@exemplo.com"
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
                  Modalidade de Interesse *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    { id: 'presencial', label: 'Presencial (São Paulo)' },
                    { id: 'hibrido', label: 'Híbrido' },
                    { id: 'remoto', label: '100% Remoto' }
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-2 p-3 border rounded text-xs cursor-pointer transition-colors ${
                        formData.modalidade === m.id
                          ? 'border-[#1A73E8] bg-[#1A73E8]/5 font-semibold text-[#163758]'
                          : 'border-[#CCD4DA] bg-white text-[#536773]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="modalidade"
                        value={m.id}
                        checked={formData.modalidade === m.id}
                        onChange={(e) => setFormData({ ...formData, modalidade: e.target.value })}
                        className="text-[#1A73E8] focus:ring-[#1A73E8]"
                      />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#163758] mb-1">
                  Breve Apresentação ou Link do LinkedIn / Currículo *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.apresentacao}
                  onChange={(e) => setFormData({ ...formData, apresentacao: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-[#CCD4DA] rounded bg-white text-[#163758] focus:border-[#1A73E8] focus:outline-none"
                  placeholder="Conte-nos sobre seus interesses na área jurídica, experiência prévia (se houver) e inclua o link do seu LinkedIn ou currículo online..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-copper justify-center text-sm font-semibold py-3 rounded cursor-pointer"
                >
                  <span>Enviar candidatura de estágio</span>
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
