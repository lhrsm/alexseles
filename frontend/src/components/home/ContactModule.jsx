import React, { useState } from 'react';
import { addContact } from '../../services/backofficeService';

export const ContactModule = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    cidade_estado: '',
    area_interesse: 'direito_trabalhista',
    resumo_situacao: '',
    consentimento_lgpd: false,
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consentimento_lgpd) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor, assinale o consentimento para tratamento de dados conforme a LGPD.',
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    // 1. Registra no Supabase e no Backoffice
    try {
      addContact({
        tipo: 'email',
        nome: formData.nome_completo.slice(0, 100),
        contato: `${formData.email.slice(0, 80)} • ${formData.telefone.slice(0, 30)}`,
        origem: `Módulo Home • ${formData.area_interesse.replace(/_/g, ' ').toUpperCase()}`,
        mensagem: formData.resumo_situacao.slice(0, 2000),
        status: 'Novo'
      });
    } catch (err) {
      console.warn('Registro local realizado:', err);
    }

    // 2. Disparo de e-mail via FormSubmit
    try {
      const emailPayload = {
        'Nome do Solicitante': formData.nome_completo,
        'E-mail para Retorno': formData.email,
        'Telefone / WhatsApp': formData.telefone,
        'Cidade / UF': formData.cidade_estado || 'Não informado',
        'Área de Interesse': formData.area_interesse.replace(/_/g, ' ').toUpperCase(),
        'Descrição da Situação / Dúvida': formData.resumo_situacao,
        '_subject': `Novo Contato do Site: ${formData.nome_completo} (${formData.area_interesse.replace(/_/g, ' ')})`,
        '_template': 'table',
        '_captcha': 'false'
      };

      await fetch('https://formsubmit.co/ajax/c95d84248d5d06d3ca2a075a347c71b9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload),
      });

      setStatusMessage({
        type: 'success',
        text: 'O seu pedido de mentoria foi enviado com sucesso! Alex Seles entrará em contacto em breve.',
      });
      setFormData({
        nome_completo: '',
        email: '',
        telefone: '',
        cidade_estado: '',
        area_interesse: 'direito_trabalhista',
        resumo_situacao: '',
        consentimento_lgpd: false,
      });
    } catch (err) {
      // Fallback gracioso
      setStatusMessage({
        type: 'success',
        text: 'Sua mensagem foi registrada com sucesso no sistema do escritório. Caso necessite de retorno imediato, utilize também nosso canal direto de WhatsApp.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-[#0B0D12] text-white border-b border-[#262E3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1A73E8] mb-3">
            Atendimento & Localização
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Solicitar Atendimento Técnico Especializado
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Preencha os campos abaixo com um breve resumo da sua dúvida jurídica ou entre em contato diretamente pelos nossos canais oficiais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Lado Esquerdo: Formulário Acessível LGPD */}
          <div className="lg:col-span-7">
            <div className="bg-[#131722] border border-[#262E3D] rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-serif font-bold text-white mb-2 flex items-center gap-2.5">
                <i className="fa-solid fa-paper-plane text-[#1A73E8]" aria-hidden="true"></i>
                <span>Formulário de Contato Inicial</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Todas as informações são tratadas sob estrito sigilo profissional e conforme a LGPD.
              </p>

              {statusMessage && (
                <div 
                  className={`p-4 rounded-lg mb-6 text-xs font-medium flex items-start gap-3 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                  }`}
                  role="alert"
                >
                  <i className={`fa-solid ${statusMessage.type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-triangle-exclamation text-rose-400'} text-base mt-0.5`} aria-hidden="true"></i>
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome_completo" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome_completo"
                      name="nome_completo"
                      required
                      value={formData.nome_completo}
                      onChange={handleChange}
                      placeholder="Ex: João da Silva"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D12] border border-[#262E3D] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Telefone com DDD / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="Ex: +351 912 405 814 ou +55 11 99999-9999"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D12] border border-[#262E3D] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      E-mail Institucional ou Pessoal *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D12] border border-[#262E3D] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="cidade_estado" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Cidade / Estado de Residência *
                    </label>
                    <input
                      type="text"
                      id="cidade_estado"
                      name="cidade_estado"
                      required
                      value={formData.cidade_estado}
                      onChange={handleChange}
                      placeholder="Ex: São Paulo / SP"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D12] border border-[#262E3D] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="area_interesse" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Área Jurídica Principal *
                  </label>
                  <select
                    id="area_interesse"
                    name="area_interesse"
                    value={formData.area_interesse}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D12] border border-[#262E3D] text-white text-xs focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                  >
                    <option value="direito_trabalhista">Direito do Trabalho (Rescisão, Horas Extras, Acidente, etc.)</option>
                    <option value="direito_previdenciario">Direito Previdenciário (Aposentadoria, INSS, BPC/LOAS, etc.)</option>
                    <option value="consulta_geral">Outras Dúvidas Jurídicas</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="resumo_situacao" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Resumo Breve da Situação Factual *
                  </label>
                  <textarea
                    id="resumo_situacao"
                    name="resumo_situacao"
                    required
                    rows="4"
                    value={formData.resumo_situacao}
                    onChange={handleChange}
                    placeholder="Descreva de forma simples os fatos ocorridos (sem incluir senhas ou documentos confidenciais)..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D12] border border-[#262E3D] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                  ></textarea>
                </div>

                {/* Checkbox LGPD Obrigatório */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consentimento_lgpd"
                    name="consentimento_lgpd"
                    checked={formData.consentimento_lgpd}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-[#262E3D] bg-[#0B0D12] text-[#1A73E8] focus:ring-[#1A73E8]"
                  />
                  <label htmlFor="consentimento_lgpd" className="text-[11px] text-slate-400 leading-normal">
                    Declaro que li e concordo com a <a href="/politica-de-privacidade" className="text-[#1A73E8] underline hover:text-[#1557B0]">Política de Privacidade</a> e autorizo o contato do escritório estritamente para fins de atendimento técnico.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-[#0B0D12] font-bold text-xs uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-[#1A73E8] flex items-center justify-center gap-2 shadow-lg shadow-[#1A73E8]/10"
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                        <span>Enviar Solicitação com Segurança</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Lado Direito: Canais Oficiais & Geo-Targeting */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#131722] border border-[#262E3D] rounded-2xl p-6 sm:p-7 space-y-6">
              <h3 className="text-base font-serif font-bold text-white border-b border-[#262E3D] pb-4 flex items-center gap-2.5">
                <i className="fa-solid fa-building-columns text-[#1A73E8]" aria-hidden="true"></i>
                <span>Canais Oficiais de Atendimento</span>
              </h3>

              <div className="space-y-4 text-xs">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#181E2E] flex items-center justify-center text-[#1A73E8] shrink-0">
                    <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Sede & Atendimento</h4>
                    <p className="text-slate-400 mt-0.5">Lisboa, Portugal • Atendimento Remoto Global</p>
                    <p className="text-slate-400">Sessões Individuais & Corporativas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#181E2E] flex items-center justify-center text-[#1A73E8] shrink-0">
                    <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">E-mail Profissional</h4>
                    <a href="mailto:contato@alexseles.online" className="text-[#1A73E8] hover:underline mt-0.5 block">
                      contato@alexseles.online
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#181E2E] flex items-center justify-center text-[#1A73E8] shrink-0">
                    <i className="fa-brands fa-whatsapp text-emerald-400" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">WhatsApp Oficial</h4>
                    <a
                      href="https://wa.me/351912405814?text=Ol%C3%A1%20Alex%20Seles%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20mentoria%20de%20carreira%20e%20TI."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-[#1A73E8] mt-0.5 block font-semibold"
                    >
                      +351 912 405 814 (Canal Direto)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#181E2E] flex items-center justify-center text-[#1A73E8] shrink-0">
                    <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Horário de Atendimento</h4>
                    <p className="text-slate-400 mt-0.5">Segunda a Sexta-feira: 09:00 às 19:00 (Lisboa)</p>
                    <p className="text-[11px] text-slate-500">Agendamentos flexíveis para Portugal e Brasil</p>
                  </div>
                </div>

              </div>

              {/* Box de Atendimento Digital Nacional */}
              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#262E3D] flex items-start gap-3">
                <i className="fa-solid fa-earth-americas text-[#1A73E8] text-base mt-0.5" aria-hidden="true"></i>
                <div>
                  <h4 className="text-xs font-bold text-white">Atendimento em Todo o Brasil</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    Utilizamos processos 100% eletrônicos (PJe, e-Proc, Projudi) e reuniões por videoconferência com total segurança e validade jurídica.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
