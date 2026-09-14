import React, { useState } from 'react';
import { addContact } from '../../services/backofficeService';

export const CtaSection = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanNome = nome.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Por favor, introduza um endereço de e-mail válido.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // 1. Registo na Base de Dados (Supabase / Local)
      await addContact({
        tipo: 'email',
        nome: cleanNome || 'Subscritor',
        contato: cleanEmail,
        origem: 'Lista de Envio de Conteúdos',
        modulo: 'Dicas, Vagas & Eventos em TI',
        investimento: 'Gratuito',
        horas: 'Newsletter & Comunidade',
        tipoSolicitacao: 'Lista de Envio de Conteúdos',
        mensagem: `Inscrição na lista de envio de conteúdos (dicas, vagas e eventos).\nNome: ${cleanNome || 'Não informado'}\nE-mail: ${cleanEmail}`,
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
            'Tipo': 'Inscrição na Lista de Conteúdos',
            'Nome': cleanNome || 'Não informado',
            'E-mail': cleanEmail,
            'Canal': 'Secção Fique Atento às Dicas (Home)',
            '_subject': `Novo Inscrito na Lista de Conteúdos: ${cleanEmail}`,
            '_template': 'table',
            '_captcha': 'false'
          })
        });
      } catch (formErr) {
        console.warn('Falha no envio do FormSubmit:', formErr);
      }

      // 3. Disparo para o n8n para registo no Trello (Community) e Excel (community gid=1968227202)
      try {
        const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: cleanNome || 'Subscritor',
            email: cleanEmail,
            telefone: 'Não informado',
            cidade: 'Não informada',
            tipoSolicitacao: 'Lista de Envio de Conteúdos / Newsletter',
            modulo: 'Dicas, Vagas & Eventos em TI',
            investimento: 'Gratuito',
            horas: 'Newsletter',
            objetivo: 'Subscrição na lista de envio de conteúdos e novidades em TI',
            desafio: 'Acompanhar tendências, vagas e eventos',
            slotAgendamento: 'Subscrição Ativa',
            canal: 'Newsletter',
            isNewsletter: true,
            status: 'Community'
          })
        });
      } catch (n8nErr) {
        console.warn('Falha no envio ao n8n:', n8nErr);
      }

      setIsSubmitted(true);
      setEmail('');
      setNome('');
    } catch (err) {
      console.error('Erro ao registar subscrição:', err);
      setErrorMsg('Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 sm:py-28 bg-white text-[#163758] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Cabeçalho da Seção */}
          <div className="lg:col-span-6 space-y-4">
            <span className="eyebrow">
              Lista de Envio de Conteúdos
            </span>
            <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl">
              Fique atento às dicas, vagas, eventos e muito mais.
            </h2>
            <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans">
              Receba orientações práticas de transição de carreira, análises sobre o ecossistema de software, alertas antecipados de vagas e convites para eventos exclusivos com <strong>Alex Seles</strong>.
            </p>
          </div>

          {/* Lado Direito: Formulário de Inscrição na Lista */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-[#163758]">
                    Inscrição Confirmada!
                  </h3>
                  <p className="text-sm text-[#536773] max-w-md mx-auto leading-relaxed font-sans">
                    Obrigado por se juntar à lista. Passará a receber as nossas dicas estratégicas, informações sobre vagas e novidades diretamente no seu e-mail.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-[#1557B0] hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Adicionar outro e-mail
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="newsletter-nome" className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                      Nome (opcional)
                    </label>
                    <input
                      id="newsletter-nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="O seu primeiro nome"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-[#163758] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="newsletter-email" className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                      E-mail Profissional <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="o-seu-email@dominio.com"
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
                        <span>A registar inscrição...</span>
                      ) : (
                        <>
                          <span>Receber Conteúdos, Dicas & Vagas</span>
                          <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#63717C] text-center pt-1">
                    Sem spam. Os seus dados são tratados com confidencialidade nos termos da{' '}
                    <a href="/politica-de-privacidade" className="underline hover:text-[#163758] font-medium">
                      Política de Privacidade (RGPD & LGPD)
                    </a>
                    . Pode cancelar o envio a qualquer momento.
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
