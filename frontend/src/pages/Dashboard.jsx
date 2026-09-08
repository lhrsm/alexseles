import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('processos'); // 'processos' | 'documentos' | 'mensagens'
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [textoMensagem, setTextoMensagem] = useState('');

  const cliente = {
    nome: "Carlos Eduardo Silva",
    cpf: "123.***.***-00",
    email: "carlos.silva@exemplo.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo - SP"
  };

  const processos = [
    {
      id: "0010482-19.2025.5.02.0042",
      titulo: "Reclamatória Trabalhista — Rescisão Indireta e Horas Extras",
      orgao: "42ª Vara do Trabalho de São Paulo / TRT da 2ª Região",
      fase: "Aguardando Sentença de Mérito",
      faseStatus: "em_andamento",
      ultimaMovimentacao: "01/09/2026 — Juntada de Laudo Pericial Contábil sem impugnações pendentes.",
      advogado: "Alex Seles (Mentor de Carreira & TI)"
    },
    {
      id: "5004128-88.2025.4.03.6100",
      titulo: "Ação de Concessão de Benefício por Incapacidade c/c Revisão",
      orgao: "3ª Vara Previdenciária Federal da Seção Judiciária de São Paulo (TRF-3)",
      fase: "Perícia Médica Judicial Favorável",
      faseStatus: "concluido",
      ultimaMovimentacao: "28/08/2026 — Conclusos para decisão interlocutória e fixação de tutela de urgência.",
      advogado: "Alex Seles (Mentor de Carreira & TI)"
    }
  ];

  const documentos = [
    { nome: "Procuração Ad Judicia e Et Extra.pdf", tipo: "Procuração", data: "12/03/2025", tamanho: "245 KB" },
    { nome: "Contrato de Prestação de Serviços Advocatícios.pdf", tipo: "Contrato", data: "12/03/2025", tamanho: "410 KB" },
    { nome: "Petição Inicial Trabalhista Protocolada.pdf", tipo: "Petição", data: "18/04/2025", tamanho: "1.8 MB" },
    { nome: "Laudo da Perícia Médica Judicial (TRF-3).pdf", tipo: "Laudo", data: "15/07/2026", tamanho: "2.4 MB" },
    { nome: "Extrato Atualizado CNIS - Auditoria Previdenciária.pdf", tipo: "Relatório", data: "22/08/2026", tamanho: "890 KB" }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleEnviarMensagem = (e) => {
    e.preventDefault();
    if (!textoMensagem.trim()) return;
    setMensagemEnviada(true);
    setTextoMensagem('');
    setTimeout(() => setMensagemEnviada(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#163758] flex flex-col font-sans">
      <MetaTags
        title="Painel do Mentorado | Alex Seles"
        description="Área exclusiva de acompanhamento e materiais de mentoria."
        canonicalPath="/dashboard"
      />

      {/* Topo do Painel */}
      <header className="bg-[#0E1620] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Página inicial">
              <span className="font-display text-2xl font-bold text-white">ALEX SELES</span>
            </Link>
            <span className="hidden sm:inline-block h-6 w-px bg-white/20"></span>
            <span className="text-xs tracking-wider uppercase font-semibold text-sky-400 hidden sm:inline-block">
              Portal do Mentorado
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right hidden sm:block">
              <span className="font-bold text-white block">{cliente.nome}</span>
              <span className="text-slate-400 text-[11px]">CPF: {cliente.cpf}</span>
            </div>

            <Link
              to="/backoffice"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/20 hover:border-[#1A73E8] text-xs font-semibold text-[#1A73E8] transition-colors"
            >
              <i className="fa-solid fa-briefcase" aria-hidden="true"></i>
              <span>Backoffice</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/20 hover:border-[#1A73E8] hover:bg-[#1A73E8] text-white transition-colors"
              title="Encerrar sessão segura"
            >
              <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo do Dashboard */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Saudação e Cards Resumo */}
          <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#CCD4DA]/60">
              <div>
                <span className="text-xs uppercase font-bold text-[#1A73E8] tracking-wider">
                  Ambiente Seguro OAB • Criptografia Ativa
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#163758] mt-1">
                  Olá, {cliente.nome}
                </h1>
                <p className="text-xs sm:text-sm text-[#536773] mt-1">
                  Seu plano de carreira é acompanhado diretamente por Alex Seles.
                </p>
              </div>

              <a
                href="https://wa.me/351912405814?text=Ol%C3%A1%20Alex%20Seles%2C%20estou%20no%20meu%20painel%20do%20mentorado%20e%20gostaria%20de%20um%20esclarecimento."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-copper inline-flex items-center gap-2 text-xs py-2.5 px-4 self-start sm:self-auto shrink-0 shadow"
              >
                <i className="fa-brands fa-whatsapp text-sm" aria-hidden="true"></i>
                <span>Falar com Alex Seles</span>
              </a>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-center">
              <div className="p-4 rounded bg-[#F8FAFC] border border-[#CCD4DA]/50">
                <span className="text-xs text-[#536773] font-semibold block">Ações em Andamento</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#163758] mt-1 block">2</span>
              </div>
              <div className="p-4 rounded bg-[#F8FAFC] border border-[#CCD4DA]/50">
                <span className="text-xs text-[#536773] font-semibold block">Movimentações no Mês</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#1A73E8] mt-1 block">4</span>
              </div>
              <div className="p-4 rounded bg-[#F8FAFC] border border-[#CCD4DA]/50">
                <span className="text-xs text-[#536773] font-semibold block">Audiência Agendada</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-700 mt-1 block">1</span>
              </div>
              <div className="p-4 rounded bg-[#F8FAFC] border border-[#CCD4DA]/50">
                <span className="text-xs text-[#536773] font-semibold block">Documentos Anexados</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#163758] mt-1 block">5</span>
              </div>
            </div>
          </div>

          {/* Navegação por Abas */}
          <div className="flex border-b border-[#CCD4DA] gap-2">
            <button
              onClick={() => setActiveTab('processos')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'processos'
                  ? 'border-[#1A73E8] text-[#1A73E8]'
                  : 'border-transparent text-[#536773] hover:text-[#163758]'
              }`}
            >
              <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
              <span>Processos Ativos (2)</span>
            </button>

            <button
              onClick={() => setActiveTab('documentos')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'documentos'
                  ? 'border-[#1A73E8] text-[#1A73E8]'
                  : 'border-transparent text-[#536773] hover:text-[#163758]'
              }`}
            >
              <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
              <span>Documentos e Peças (5)</span>
            </button>

            <button
              onClick={() => setActiveTab('mensagens')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'mensagens'
                  ? 'border-[#1A73E8] text-[#1A73E8]'
                  : 'border-transparent text-[#536773] hover:text-[#163758]'
              }`}
            >
              <i className="fa-solid fa-comment-dots" aria-hidden="true"></i>
              <span>Fale com a Secretaria</span>
            </button>
          </div>

          {/* Aba 1: Processos */}
          {activeTab === 'processos' && (
            <div className="space-y-6">
              {processos.map((proc, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#CCD4DA]/60">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-[#0E1620] text-white text-[11px] font-mono font-bold">
                          {proc.id}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold">
                          {proc.fase}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#163758] mt-2">
                        {proc.titulo}
                      </h2>
                      <p className="text-xs text-[#536773] mt-0.5 font-sans">
                        {proc.orgao}
                      </p>
                    </div>

                    <div className="text-left lg:text-right text-xs text-[#536773] shrink-0">
                      <span className="font-semibold block text-[#163758]">Patrono Responsável:</span>
                      <span>{proc.advogado}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <span className="text-xs font-bold text-[#1A73E8] uppercase tracking-wider block">
                      Último Andamento Processual:
                    </span>
                    <p className="text-xs sm:text-sm text-[#163758] bg-[#F8FAFC] border border-[#CCD4DA]/50 p-4 rounded leading-relaxed">
                      {proc.ultimaMovimentacao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aba 2: Documentos */}
          {activeTab === 'documentos' && (
            <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm">
              <h2 className="font-display text-lg font-bold text-[#163758] mb-4">
                Documentos Processuais e Comprovantes
              </h2>
              <div className="divide-y divide-[#CCD4DA]/60">
                {documentos.map((doc, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-[#1A73E8] shrink-0 mt-0.5">
                        <i className="fa-solid fa-file-pdf text-lg" aria-hidden="true"></i>
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-semibold text-[#163758] block">
                          {doc.nome}
                        </strong>
                        <span className="text-[11px] text-[#536773]">
                          {doc.tipo} • Inserido em {doc.data} • {doc.tamanho}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Download simulado do arquivo: ${doc.nome}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A73E8] hover:text-[#1557B0] px-3 py-1.5 rounded border border-[#CCD4DA] hover:bg-slate-50 transition-colors self-start sm:self-auto"
                    >
                      <i className="fa-solid fa-download" aria-hidden="true"></i>
                      <span>Baixar Cópia</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aba 3: Mensagens / Secretaria */}
          {activeTab === 'mensagens' && (
            <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm max-w-2xl">
              <h2 className="font-display text-lg font-bold text-[#163758] mb-1">
                Envie uma dúvida ou solicitação ao escritório
              </h2>
              <p className="text-xs text-[#536773] mb-6">
                Sua mensagem será direcionada diretamente à equipe jurídica encarregada do seu processo.
              </p>

              {mensagemEnviada && (
                <div className="mb-4 p-4 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                  Sua mensagem foi transmitida à secretaria do escritório. Retornaremos em horário comercial.
                </div>
              )}

              <form onSubmit={handleEnviarMensagem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#163758] mb-1">
                    Descreva sua dúvida ou solicitação de informação:
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={textoMensagem}
                    onChange={(e) => setTextoMensagem(e.target.value)}
                    placeholder="Ex: Gostaria de saber a previsão de liberação do alvará ou envio de novo documento..."
                    className="w-full px-3.5 py-2.5 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-copper text-xs py-2.5 px-5"
                >
                  <span>Enviar mensagem segura</span>
                  <span>→</span>
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
export default Dashboard;
