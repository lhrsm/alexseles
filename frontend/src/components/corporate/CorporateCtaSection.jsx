import React, { useState } from 'react';
import { addContact } from '../../services/backofficeService';

export const CorporateCtaSection = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanNome = nome.trim();
    const cleanEmpresa = empresa.trim();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Por favor, introduza um endereço de e-mail corporativo válido.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // 1. Registo na Base de Dados (Backoffice / Supabase)
      await addContact({
        tipo: 'email',
        nome: cleanNome || (cleanEmpresa ? `Representante ${cleanEmpresa}` : 'Líder Corporativo'),
        contato: cleanEmail,
        origem: 'Briefing Executivo Corporativo',
        modulo: 'Inovação & IA para Empresas',
        investimento: 'Corporativo',
        horas: 'Briefing & Tendências',
        tipoSolicitacao: 'Subscrição no Briefing Executivo',
        mensagem: `Inscrição no Briefing Executivo Corporativo.\nNome: ${cleanNome || 'Não informado'}\nEmpresa: ${cleanEmpresa || 'Não informada'}\nE-mail: ${cleanEmail}`,
        status: 'Leads'
      });

      // 2. Disparo para o e-mail oficial via FormSubmit
      try {
        await fetch('https://formsubmit.co/ajax/contato@alexseles.online', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'Tipo': 'Subscrição no Briefing Executivo Corporativo',
            'Nome': cleanNome || 'Não informado',
            'Empresa': cleanEmpresa || 'Não informada',
            'E-mail Corporativo': cleanEmail,
            'Canal': 'Secção Briefing Executivo (Para Empresas)',
            '_subject': `Novo Inscrito no Briefing Corporativo: ${cleanEmail}`,
            '_template': 'table',
            '_captcha': 'false'
          })
        });
      } catch (formErr) {
        console.warn('Falha no envio do FormSubmit:', formErr);
      }

      // 3. Disparo para o n8n
      try {
        const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: cleanNome || 'Líder Corporativo',
            email: cleanEmail,
            empresa: cleanEmpresa,
            tipoSolicitacao: 'Briefing Executivo Corporativo',
            modulo: 'Inovação & IA para Empresas',
            isNewsletter: true,
            isEmpresa: true,
            status: 'Leads'
          })
        });
      } catch (n8nErr) {
        console.warn('Falha no envio ao n8n:', n8nErr);
      }

      setIsSubmitted(true);
      setEmail('');
      setNome('');
      setEmpresa('');
    } catch (err) {
      console.error('Erro ao registar subscrição corporativa:', err);
      setErrorMsg('Ocorreu um erro ao processar o pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato-corporativo" className="py-20 sm:py-28 bg-white text-[#163758] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Lado Esquerdo */}
          <div className="lg:col-span-6 space-y-4">
            <span className="eyebrow">
              Briefing Executivo & Inovação
            </span>
            <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]">
              Mantenha a sua empresa na vanguarda da engenharia e da Inteligência Artificial.
            </h2>
            <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans">
              Receba análises estratégicas sobre o ciclo de desenvolvimento de software, benchmarks de produtividade em TI, boas práticas de adoção de IA generativa nas organizações e convites para mesas-redondas com <strong>Alex Seles</strong>.
            </p>
          </div>

          {/* Lado Direito */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-[#163758]">
                    Subscrição Corporativa Confirmada!
                  </h3>
                  <p className="text-sm text-[#536773] max-w-md mx-auto leading-relaxed font-sans">
                    Obrigado pelo seu interesse. Passará a receber os relatórios executivos de tecnologia e tendências diretamente no seu endereço corporativo.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-[#1557B0] hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Registar outro endereço corporativo
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="corp-nome" className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                        Nome do Responsável
                      </label>
                      <input
                        id="corp-nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex.: Marta Ribeiro"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-[#163758] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="corp-empresa" className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                        Empresa / Organização
                      </label>
                      <input
                        id="corp-empresa"
                        type="text"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Ex.: Enterprise SA"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-[#163758] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="corp-email" className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                      E-mail Corporativo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="corp-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@empresa.com"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-[#163758] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent transition-all"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-600 font-medium">
                      {errorMsg}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-copper inline-flex items-center justify-center gap-2 py-3.5 px-6 font-semibold text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <span>A registar solicitação...</span>
                      ) : (
                        <>
                          <span>Receber Briefings Executivos & Tendências</span>
                          <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#63717C] text-center pt-1">
                    Comunicação corporativa estrita, sem spam. Tratamento confidencial nos termos da{' '}
                    <a href="/politica-de-privacidade" className="underline hover:text-[#163758] font-medium">
                      Política de Privacidade (RGPD)
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
