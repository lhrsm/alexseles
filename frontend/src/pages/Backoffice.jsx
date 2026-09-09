import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { supabase } from '../lib/supabase';
import { 
  getMetrics, 
  getContacts, 
  getUsers, 
  saveUser, 
  deleteUser, 
  getCustomArticles, 
  saveCustomArticle, 
  updateCustomArticle,
  deleteCustomArticle,
  fetchSupabaseContacts,
  fetchSupabaseArticles,
  fetchSupabaseUsers
} from '../services/backofficeService';
import { getAllArticles } from '../data/articlesData';
import { 
  getAnalytics, 
  getCurrentMonthVisits, 
  getYearTotalVisits 
} from '../services/analyticsService';

export const Backoffice = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('metricas'); // 'metricas' | 'acervo' | 'usuarios'

  // Estados de Métricas, Contatos e Analytics
  const [metrics, setMetrics] = useState(getMetrics());
  const [contacts, setContacts] = useState(getContacts());
  const [analytics, setAnalytics] = useState(getAnalytics());

  // Estados de Usuários
  const [users, setUsers] = useState(getUsers());
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil: 'Administrador'
  });
  const [userSuccessMsg, setUserSuccessMsg] = useState(null);

  // Estados do Criador de Acervo / Artigo
  const [customArticles, setCustomArticles] = useState(getCustomArticles());
  const [allPublishedArticles, setAllPublishedArticles] = useState(getAllArticles());
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    image: '',
    category: 'Carreira & TI',
    categorySlug: 'carreira-ti',
    readingTime: '5 min de leitura',
    metaDescription: '',
    practicalTip: '',
    sections: [
      {
        subtitle: '1. Contexto e Cenário de Mercado',
        content: '',
        legalBasis: ''
      },
      {
        subtitle: '2. Estratégia Prática e Passo a Passo',
        content: '',
        legalBasis: ''
      }
    ]
  });
  const [articleSuccess, setArticleSuccess] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Sincronização inicial do Supabase
    fetchSupabaseContacts().then((data) => {
      if (data) {
        setContacts(data);
        setMetrics(getMetrics());
      }
    });

    fetchSupabaseArticles().then((data) => {
      if (data) {
        setCustomArticles(data);
        setMetrics(getMetrics());
      }
    });

    fetchSupabaseUsers().then((data) => {
      if (data) {
        setUsers(data);
      }
    });

    const handleContacts = () => {
      setContacts(getContacts());
      setMetrics(getMetrics());
    };
    const handleArticles = () => {
      setCustomArticles(getCustomArticles());
      setMetrics(getMetrics());
    };
    const handleUsers = () => {
      setUsers(getUsers());
    };
    const handleAnalytics = () => setAnalytics(getAnalytics());

    window.addEventListener('mc_contacts_updated', handleContacts);
    window.addEventListener('mc_articles_updated', handleArticles);
    window.addEventListener('mc_users_updated', handleUsers);
    window.addEventListener('mc_analytics_updated', handleAnalytics);

    return () => {
      window.removeEventListener('mc_contacts_updated', handleContacts);
      window.removeEventListener('mc_articles_updated', handleArticles);
      window.removeEventListener('mc_users_updated', handleUsers);
      window.removeEventListener('mc_analytics_updated', handleAnalytics);
    };
  }, []);

  useEffect(() => {
    const refreshData = () => {
      setMetrics(getMetrics());
      setContacts(getContacts());
      setUsers(getUsers());
      setCustomArticles(getCustomArticles());
      setAllPublishedArticles(getAllArticles());
    };
    refreshData();
    window.addEventListener('mc_articles_updated', refreshData);
    return () => window.removeEventListener('mc_articles_updated', refreshData);
  }, []);

  // Manipuladores de Usuários
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.nome || !newUser.email || !newUser.senha) return;
    try {
      const updated = await saveUser(newUser);
      setUsers(updated);
      setUserSuccessMsg(`Utilizador ${newUser.nome} gravado com sucesso no Supabase e no sistema!`);
      setNewUser({
        nome: '',
        email: '',
        senha: '',
        perfil: 'Administrador'
      });
      setTimeout(() => setUserSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Erro ao gravar utilizador:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem a certeza de que deseja remover este utilizador do sistema e do banco de dados?')) {
      const userToDelete = users.find((u) => u.id === userId);
      try {
        const updated = await deleteUser(userId);
        setUsers(updated);

        // Se o utilizador atual estiver a excluir a sua própria conta ativa, encerra a sessão imediatamente
        const sessionStr = sessionStorage.getItem('mc_admin_session');
        if (sessionStr && userToDelete) {
          try {
            const sessionObj = JSON.parse(sessionStr);
            if ((sessionObj.user || '').trim().toLowerCase() === (userToDelete.email || '').trim().toLowerCase()) {
              sessionStorage.removeItem('mc_admin_session');
              navigate('/login');
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error('Erro ao eliminar utilizador:', err);
      }
    }
  };

  // Manipuladores de Tópicos do Artigo
  const handleAddSection = () => {
    const nextNum = articleForm.sections.length + 1;
    setArticleForm({
      ...articleForm,
      sections: [
        ...articleForm.sections,
        {
          subtitle: `${nextNum}. Novo Tópico Explicativo`,
          content: '',
          legalBasis: ''
        }
      ]
    });
  };

  const handleRemoveSection = (index) => {
    if (articleForm.sections.length <= 1) return;
    const updated = articleForm.sections.filter((_, i) => i !== index);
    setArticleForm({ ...articleForm, sections: updated });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...articleForm.sections];
    updated[index][field] = value;
    setArticleForm({ ...articleForm, sections: updated });
  };

  // Upload e Conversão de Imagem para Base64
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('O ficheiro é demasiado grande. Por favor, selecione uma imagem até 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setArticleForm((prev) => ({
        ...prev,
        image: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Iniciar Edição de Artigo Existente
  const handleStartEdit = (art) => {
    setEditingArticleId(art.id);
    setArticleSuccess(null);
    setArticleForm({
      title: art.title || art.h1 || '',
      image: art.image || '',
      category: art.category || 'Carreira & TI',
      categorySlug: art.categorySlug || 'carreira-ti',
      readingTime: art.readingTime || '5 min de leitura',
      metaDescription: art.metaDescription || '',
      practicalTip: art.practicalTip || '',
      sections: (art.sections && art.sections.length > 0)
        ? art.sections.map((s, idx) => ({
            subtitle: s.subtitle || `${idx + 1}. Tópico`,
            content: Array.isArray(s.paragraphs) ? s.paragraphs.join('\n\n') : (s.content || ''),
            legalBasis: s.legalBasis || ''
          }))
        : [
            {
              subtitle: '1. Fundamentação e Contexto',
              content: '',
              legalBasis: ''
            }
          ]
    });

    const formEl = document.getElementById('form-novo-artigo');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cancelar Edição
  const handleCancelEdit = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      image: '',
      category: 'Carreira & TI',
      categorySlug: 'carreira-ti',
      readingTime: '5 min de leitura',
      metaDescription: '',
      practicalTip: '',
      sections: [
        {
          subtitle: '1. Contexto e Cenário de Mercado',
          content: '',
          legalBasis: ''
        },
        {
          subtitle: '2. Estratégia Prática e Passo a Passo',
          content: '',
          legalBasis: ''
        }
      ]
    });
  };

  // Publicar ou Atualizar Artigo no Site
  const handlePublishArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      alert('Por favor, informe o título principal da orientação.');
      return;
    }

    const payload = {
      title: articleForm.title,
      image: articleForm.image || null,
      category: articleForm.category,
      categorySlug: articleForm.categorySlug,
      readingTime: articleForm.readingTime,
      metaDescription: articleForm.metaDescription || `Guia técnico e orientações sobre ${articleForm.title}, elaborado por Alex Seles.`,
      practicalTip: articleForm.practicalTip,
      sections: articleForm.sections.map(s => ({
        subtitle: s.subtitle,
        paragraphs: s.content ? s.content.split('\n').filter(p => p.trim()) : ['Conteúdo técnico em análise.']
      }))
    };

    if (editingArticleId) {
      const updated = await updateCustomArticle(editingArticleId, payload);
      setCustomArticles(getCustomArticles());
      setAllPublishedArticles(getAllArticles());
      setMetrics(getMetrics());
      setArticleSuccess({ ...updated, isUpdated: true });
      setEditingArticleId(null);
    } else {
      const created = await saveCustomArticle(payload);
      setCustomArticles(getCustomArticles());
      setAllPublishedArticles(getAllArticles());
      setMetrics(getMetrics());
      setArticleSuccess(created);
    }

    // Resetar formulário
    setArticleForm({
      title: '',
      image: '',
      category: 'Carreira & TI',
      categorySlug: 'carreira-ti',
      readingTime: '5 min de leitura',
      metaDescription: '',
      practicalTip: '',
      sections: [
        {
          subtitle: '1. Contexto e Cenário de Mercado',
          content: '',
          legalBasis: ''
        },
        {
          subtitle: '2. Estratégia Prática e Passo a Passo',
          content: '',
          legalBasis: ''
        }
      ]
    });
  };

  const handleDeleteArticle = async (artId) => {
    if (window.confirm('Tem a certeza de que deseja excluir este artigo do acervo do site?')) {
      await deleteCustomArticle(artId);
      setCustomArticles(getCustomArticles());
      setAllPublishedArticles(getAllArticles());
      setMetrics(getMetrics());
      if (editingArticleId === artId) {
        handleCancelEdit();
      }
    }
  };

  const handleExportCSV = () => {
    if (!contacts || contacts.length === 0) {
      alert('Nenhum lead encontrado para exportar.');
      return;
    }
    const headers = [
      "Data",
      "Canal",
      "Tipo_Solicitacao",
      "Modulo_Programa",
      "Investimento",
      "Carga_Horaria",
      "Nome",
      "Contato",
      "Origem_Assunto",
      "Status",
      "Mensagem"
    ];
    const rows = contacts.map(c => [
      `"${c.data || c.created_at || ''}"`,
      `"${c.tipo || ''}"`,
      `"${(c.tipoSolicitacao || (c.modulo ? 'Contratação de Módulo' : 'Sessão Diagnóstica')).replace(/"/g, '""')}"`,
      `"${(c.modulo || (c.origem?.includes('•') ? c.origem.split('•')[1]?.trim() : '') || '').replace(/"/g, '""')}"`,
      `"${(c.investimento || '').replace(/"/g, '""')}"`,
      `"${(c.horas || '').replace(/"/g, '""')}"`,
      `"${(c.nome || '').replace(/"/g, '""')}"`,
      `"${(c.contato || '').replace(/"/g, '""')}"`,
      `"${(c.origem || '').replace(/"/g, '""')}"`,
      `"${c.status || ''}"`,
      `"${(c.mensagem || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = "\uFEFF" + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Alex_Seles_Leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#163758] flex flex-col font-sans">
      <MetaTags
        title="Backoffice & Gestão | Alex Seles"
        description="Painel administrativo de atendimento, métricas e publicação de acervo técnico."
        canonicalPath="/backoffice"
      />

      {/* Topo do Backoffice */}
      <header className="bg-[#0E1620] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Ir para a Home">
              <span className="font-display text-2xl font-bold text-white">ALEX SELES</span>
            </Link>
            <span className="hidden sm:inline-block h-6 w-px bg-white/20"></span>
            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-wider font-bold text-sky-400 block">
                Painel Administrativo
              </span>
              <span className="text-[11px] text-slate-400">
                Alex Seles • Gestão de Mentoria & Artigos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                const sessionStr = sessionStorage.getItem('mc_admin_session');
                if (sessionStr && supabase) {
                  try {
                    const token = JSON.parse(sessionStr).token;
                    if (token) await supabase.rpc('revogar_sessao_admin', { p_token: token });
                  } catch (e) {}
                }
                sessionStorage.removeItem('mc_admin_session');
                navigate('/login');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-[#1A73E8] text-xs font-semibold text-white transition-colors"
            >
              <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Navegação Estilo Pasta de Ficheiros (Folder Tabs) */}
          <div>
            <nav aria-label="Pastas do Escritório" className="flex flex-wrap items-end gap-1.5 border-b-2 border-[#CCD4DA] px-2 sm:px-4 pt-3 bg-[#EAEFF4]/80 rounded-t-xl">
              <button
                type="button"
                onClick={() => setActiveTab('metricas')}
                className={`relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x ${
                  activeTab === 'metricas'
                    ? 'bg-white text-[#163758] border-t-[#1A73E8] border-x-[#CCD4DA] -mb-[2px] z-10 shadow-sm'
                    : 'bg-[#DCE4EC] text-[#536773] border-transparent hover:bg-white/70 hover:text-[#163758]'
                }`}
              >
                <i className={`fa-solid fa-inbox text-sm ${activeTab === 'metricas' ? 'text-[#1A73E8]' : 'text-slate-400'}`} aria-hidden="true"></i>
                <span>Painel de E-mails & WhatsApp</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'metricas' ? 'bg-[#1A73E8]/10 text-[#1A73E8]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {contacts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('acervo')}
                className={`relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x ${
                  activeTab === 'acervo'
                    ? 'bg-white text-[#163758] border-t-[#1A73E8] border-x-[#CCD4DA] -mb-[2px] z-10 shadow-sm'
                    : 'bg-[#DCE4EC] text-[#536773] border-transparent hover:bg-white/70 hover:text-[#163758]'
                }`}
              >
                <i className={`fa-solid fa-folder-open text-sm ${activeTab === 'acervo' ? 'text-[#1A73E8]' : 'text-slate-400'}`} aria-hidden="true"></i>
                <span>Acervo de Orientações & Publicações</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'acervo' ? 'bg-[#1A73E8]/10 text-[#1A73E8]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {metrics.artigosPublicados}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('usuarios')}
                className={`relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all border-t-2 border-x ${
                  activeTab === 'usuarios'
                    ? 'bg-white text-[#163758] border-t-[#1A73E8] border-x-[#CCD4DA] -mb-[2px] z-10 shadow-sm'
                    : 'bg-[#DCE4EC] text-[#536773] border-transparent hover:bg-white/70 hover:text-[#163758]'
                }`}
              >
                <i className={`fa-solid fa-user-shield text-sm ${activeTab === 'usuarios' ? 'text-[#1A73E8]' : 'text-slate-400'}`} aria-hidden="true"></i>
                <span>Registrar Usuários & Senhas</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'usuarios' ? 'bg-[#1A73E8]/10 text-[#1A73E8]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {users.length}
                </span>
              </button>
            </nav>

            {/* Componente Informativo de Topo do Fichário */}
            <div className="bg-white border-x border-b border-[#CCD4DA] rounded-b-xl p-6 sm:p-7 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#163758]">
                    {activeTab === 'metricas' && 'Painel de E-mails & WhatsApp'}
                    {activeTab === 'acervo' && 'Acervo de Orientações & Publicações'}
                    {activeTab === 'usuarios' && 'Registrar Usuários & Senhas'}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#536773]">
                    {activeTab === 'metricas' && 'Acompanhe contatos recebidos em tempo real, mensagens pelo WhatsApp e métricas consolidadas de visitas.'}
                    {activeTab === 'acervo' && 'Gerencie o catálogo de orientações jurídicas e produza novos artigos com caráter estritamente educativo.'}
                    {activeTab === 'usuarios' && 'Cadastre operadores e credenciais com acesso restrito ao ambiente administrativo do escritório.'}
                  </p>
                </div>

                {/* Botão de Criação EXCLUSIVO da aba de Acervo de Orientações */}
                {activeTab === 'acervo' && (
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const formEl = document.getElementById('form-novo-artigo');
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-copper text-xs py-2.5 px-5 inline-flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-circle-plus text-sm" aria-hidden="true"></i>
                      <span>Criar Nova Orientação</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ABA 1: MÉTRICAS E CONTATOS (E-MAILS E WHATSAPP RECEBIDOS) */}
          {/* ========================================================================= */}
          {activeTab === 'metricas' && (
            <div className="space-y-6">
              {/* 4 Cards de Métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">E-mails Recebidos</span>
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#163758]">
                      {metrics.emailsRecebidos}
                    </span>
                    <span className="text-[11px] text-[#536773] font-medium">pelo formulário</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">Mensagens enviadas no site</p>
                </div>

                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">WhatsApp Recebidos</span>
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-emerald-700">
                      {metrics.whatsappRecebidos}
                    </span>
                    <span className="text-[11px] text-[#536773] font-medium">iniciados</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">Cliques no WhatsApp oficial</p>
                </div>

                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">Orientações Publicadas</span>
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-[#1A73E8] flex items-center justify-center">
                      <i className="fa-solid fa-book-bookmark" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#163758]">
                      {metrics.artigosPublicados}
                    </span>
                    <span className="text-[11px] text-[#1A73E8] font-semibold">{customArticles.length} criadas</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">Acervo disponível no site</p>
                </div>

                <div className="bg-white rounded-lg border border-[#CCD4DA] p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#536773] uppercase">Visitas ao Site (Mês)</span>
                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                      <i className="fa-solid fa-chart-line text-base" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-[#163758]">
                      {getCurrentMonthVisits(analytics).toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[11px] text-purple-700 font-semibold">acessos</span>
                  </div>
                  <p className="text-[11px] text-[#536773] mt-1">
                    {getYearTotalVisits(analytics).toLocaleString('pt-BR')} visitas em {analytics.year}
                  </p>
                </div>

              </div>

              {/* Gráfico de Visitas ao Site no Mês e no Ano */}
              <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#CCD4DA]/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-lg font-bold text-[#163758]">
                        Visitas e Tráfego do Site Oficial ({analytics.year})
                      </h2>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Rastreamento Ativo
                      </span>
                    </div>
                    <p className="text-xs text-[#536773] mt-0.5">
                      Visualizações de páginas rastreadas mensalmente e consolidadas no ano de {analytics.year}.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded bg-slate-50 border border-[#CCD4DA] text-xs">
                      <span className="text-[#536773]">Total em {analytics.year}: </span>
                      <strong className="text-[#163758]">{getYearTotalVisits(analytics).toLocaleString('pt-BR')} visitas</strong>
                    </div>
                  </div>
                </div>

                {/* Grid com Gráfico de Barras e Estatísticas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Gráfico de Barras Mensal */}
                  <div className="lg:col-span-2 bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#536773] mb-4">
                      <span>Evolução Mensal de Acessos (Jan - Dez)</span>
                      <span className="text-[#1A73E8] flex items-center gap-1.5 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1A73E8] inline-block"></span>
                        Setembro = Mês Atual
                      </span>
                    </div>

                    <div className="h-52 flex items-end justify-between gap-1.5 sm:gap-2.5 pt-6 border-b border-[#CCD4DA]">
                      {analytics.months.map((m, idx) => {
                        const max = Math.max(...analytics.months.map(item => item.visits), 1);
                        const heightPct = m.visits > 0 ? Math.max((m.visits / max) * 100, 10) : 4;
                        const isCurrent = idx === new Date().getMonth();

                        return (
                          <div key={m.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                            {/* Tooltip ao passar o mouse */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#0E1620] text-white text-[10px] font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow">
                              {m.visits.toLocaleString('pt-BR')} visitas
                            </div>

                            {/* Valor acima da barra */}
                            {m.visits > 0 && (
                              <span className="text-[10px] font-bold text-[#536773] mb-1 hidden sm:block">
                                {m.visits > 999 ? `${(m.visits / 1000).toFixed(1)}k` : m.visits}
                              </span>
                            )}

                            {/* Coluna da barra */}
                            <div
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-t transition-all duration-300 ${
                                isCurrent
                                  ? 'bg-[#1A73E8] shadow-md ring-2 ring-[#1A73E8]/30'
                                  : m.visits > 0
                                  ? 'bg-[#163758]/70 hover:bg-[#163758]'
                                  : 'bg-slate-200'
                              }`}
                            ></div>

                            {/* Rótulo do Mês */}
                            <span className={`text-[11px] mt-2 font-semibold ${
                              isCurrent ? 'text-[#1A73E8] font-bold' : 'text-[#536773]'
                            }`}>
                              {m.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detalhes de Acessos e Dispositivos */}
                  <div className="space-y-4">
                    {/* Páginas Mais Acessadas */}
                    <div className="bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-4">
                      <h3 className="text-xs font-bold text-[#163758] uppercase tracking-wider mb-3">
                        Páginas Mais Acessadas
                      </h3>
                      <div className="space-y-2.5">
                        {analytics.topPages.map((page) => (
                          <div key={page.name}>
                            <div className="flex justify-between text-xs text-[#163758] mb-1">
                              <span className="truncate pr-2 font-medium">{page.name}</span>
                              <span className="font-bold text-[#1A73E8]">{page.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#163758] h-full rounded-full"
                                style={{ width: `${page.percent}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dispositivos */}
                    <div className="bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-4">
                      <h3 className="text-xs font-bold text-[#163758] uppercase tracking-wider mb-2">
                        Acessos por Dispositivo
                      </h3>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                        <div className="p-2.5 rounded bg-white border border-[#CCD4DA]">
                          <i className="fa-solid fa-mobile-screen text-[#1A73E8] text-lg mb-1 block"></i>
                          <span className="font-bold text-sm text-[#163758]">{analytics.devices.mobilePercent ?? analytics.devices.mobile ?? 0}%</span>
                          <span className="text-[10px] text-[#536773] block">Celulares</span>
                        </div>
                        <div className="p-2.5 rounded bg-white border border-[#CCD4DA]">
                          <i className="fa-solid fa-desktop text-[#163758] text-lg mb-1 block"></i>
                          <span className="font-bold text-sm text-[#163758]">{analytics.devices.desktopPercent ?? analytics.devices.desktop ?? 0}%</span>
                          <span className="text-[10px] text-[#536773] block">Computadores</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Contatos Recentes */}
              <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#CCD4DA]/60">
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#163758]">
                      Leads, Contatos e Agendamentos em Tempo Real
                    </h2>
                    <p className="text-xs text-[#536773]">
                      Registos de candidatos e profissionais de TI que solicitaram mentoria ou agendaram sessão diagnóstica.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://n8n.srv1469659.hstgr.cloud/webhook/leads-excel"
                      download="Alex_Seles_Gestao_de_Leads.xlsx"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-sm transition-all"
                      title="Gerar e descarregar folha de cálculo Excel oficial via n8n"
                    >
                      <i className="fa-solid fa-file-excel text-sm" aria-hidden="true"></i>
                      <span>Baixar Excel (.xlsx)</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#163758] hover:bg-[#1E4A78] text-white rounded-lg font-bold text-xs shadow-sm transition-all"
                      title="Exportar todos os registos em formato CSV"
                    >
                      <i className="fa-solid fa-file-csv text-sm" aria-hidden="true"></i>
                      <span>Exportar CSV</span>
                    </button>
                  </div>
                </div>

                {contacts.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-[#CCD4DA] rounded bg-[#F8FAFC]">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#536773] mx-auto mb-3">
                      <i className="fa-regular fa-envelope-open text-xl" aria-hidden="true"></i>
                    </div>
                    <h3 className="font-bold text-sm text-[#163758]">Nenhum contato registrado ainda</h3>
                    <p className="text-xs text-[#536773] max-w-md mx-auto mt-1 leading-relaxed">
                      As solicitações de avaliação enviadas pelo formulário de contato do site e as mensagens de WhatsApp aparecerão em tempo real aqui.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#CCD4DA] text-[#163758] font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-3 px-4">Canal</th>
                          <th className="py-3 px-4">Interessado</th>
                          <th className="py-3 px-4">Contato</th>
                          <th className="py-3 px-4">Origem / Assunto</th>
                          <th className="py-3 px-4">Data/Hora</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CCD4DA]/60">
                        {contacts.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              {c.tipo?.includes('whatsapp') ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                                  WhatsApp
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold text-[11px]">
                                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                                  E-mail
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#163758]">{c.nome}</td>
                            <td className="py-3 px-4 font-mono text-[#536773]">{c.contato}</td>
                            <td className="py-3 px-4 text-[#536773] max-w-xs">
                              {c.modulo ? (
                                <div>
                                  <div className="font-semibold text-[#163758] truncate">{c.modulo}</div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    {c.investimento && (
                                      <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold">
                                        {c.investimento}
                                      </span>
                                    )}
                                    {c.horas && (
                                      <span className="text-[10px] text-slate-500">
                                        {c.horas}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <span className="truncate block">{c.origem}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-[#536773] whitespace-nowrap">{c.data}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                c.status === 'Novo'
                                  ? 'bg-amber-100 text-amber-800'
                                  : c.status === 'Em Atendimento'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {(() => {
                                const phone = c.contato ? c.contato.split('|')[0].replace(/\D/g, '') : '';
                                const linkUrl = phone.length >= 8 
                                  ? `https://wa.me/${phone}` 
                                  : (c.contato?.includes('@') ? `mailto:${c.contato.split('|')[1]?.trim() || c.contato.trim()}` : 'https://wa.me/351912405814');
                                return (
                                  <a
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1A73E8] hover:underline font-bold text-xs"
                                  >
                                    Atender →
                                  </a>
                                );
                              })()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: ACERVO DE ORIENTAÇÕES (CRIADOR DE CONTEÚDO TÉCNICO COM EXCELENTE UX) */}
          {/* ========================================================================= */}
          {activeTab === 'acervo' && (
            <div className="space-y-8">
              
              {/* Notificação de Sucesso */}
              {articleSuccess && (
                <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-in fade-in">
                  <div>
                    <span className="font-bold text-sm block">
                      ✓ {articleSuccess.isUpdated ? 'Artigo atualizado com sucesso no site oficial!' : 'Orientação publicada com sucesso no site oficial!'}
                    </span>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      O conteúdo já está visível na página inicial e na Central de Conhecimento.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/central-de-conhecimento/${articleSuccess.slug}`}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded shadow transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Ver no Site Oficial</span>
                      <span>→</span>
                    </Link>
                    <button
                      onClick={() => setArticleSuccess(null)}
                      className="text-emerald-800 hover:text-emerald-950 text-xs font-semibold"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}

              {/* Banner de Modo de Edição */}
              {editingArticleId && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A73E8] animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8]">
                      Modo de Edição Ativo
                    </span>
                    <span className="text-xs text-[#536773]">
                      • A editar o artigo: <strong className="text-[#163758]">{articleForm.title || 'Selecionado'}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded transition-colors"
                  >
                    Cancelar Edição
                  </button>
                </div>
              )}

              {/* Card do Formulário com UX Instrutivo */}
              <div id="form-novo-artigo" className="bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm scroll-mt-24">
                
                <div className="border-b border-[#CCD4DA]/60 pb-5 mb-6">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#1A73E8] tracking-wider">
                    <i className="fa-solid fa-lightbulb" aria-hidden="true"></i>
                    <span>Assistente de Criação • Acervo de Orientações</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758] mt-1">
                    {editingArticleId ? 'Editar Artigo Publicado' : 'Novo Artigo / Publicação Estratégica'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#536773] mt-1">
                    {editingArticleId
                      ? 'Atualize o título, a imagem de capa, os tópicos ou a fundamentação deste artigo.'
                      : 'Produza artigos, análises e orientações sobre Carreira, Tecnologia, Liderança Ágil e Inovação.'}
                  </p>
                </div>

                <form onSubmit={handlePublishArticle} className="space-y-6">
                  
                  {/* Passo 1: Título e Área */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                        1. Título do Artigo (H1) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        placeholder="Ex: Como migrar para a área de Inteligência Artificial e Tech Leadership"
                        className="w-full px-4 py-3 text-sm font-semibold border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
                      />
                      <span className="text-[11px] text-[#536773] mt-1 block">
                        <i className="fa-regular fa-lightbulb text-amber-500 mr-1.5" aria-hidden="true"></i>
                        <strong>Dica de UX:</strong> Títulos diretos em formato de guia ou pergunta obtêm maior engajamento e alcance.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                        Categoria / Área
                      </label>
                      <select
                        value={articleForm.category}
                        onChange={(e) => {
                          const cat = e.target.value;
                          const slugMap = {
                            'Carreira & TI': 'carreira-ti',
                            'Gestão de Projetos & Ágil': 'gestao-projetos-agil',
                            'Inteligência Artificial & Inovação': 'ia-inovacao',
                            'Liderança & Governação (ITIL)': 'lideranca-governanca-ti',
                            'Transição de Carreira': 'transicao-carreira',
                            'Engenharia de Software': 'engenharia-software',
                          };
                          setArticleForm({
                            ...articleForm,
                            category: cat,
                            categorySlug: slugMap[cat] || 'carreira-ti'
                          });
                        }}
                        className="w-full px-3.5 py-3 text-xs font-semibold border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#1A73E8]"
                      >
                        <option value="Carreira & TI">Carreira & TI</option>
                        <option value="Gestão de Projetos & Ágil">Gestão de Projetos & Ágil</option>
                        <option value="Inteligência Artificial & Inovação">Inteligência Artificial & Inovação</option>
                        <option value="Liderança & Governação (ITIL)">Liderança & Governação (ITIL)</option>
                        <option value="Transição de Carreira">Transição de Carreira</option>
                        <option value="Engenharia de Software">Engenharia de Software</option>
                      </select>
                    </div>
                  </div>

                  {/* Passo 2: Resumo para o Card da Vitrine */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                      2. Resumo da Vitrine (Meta Description / Subtítulo)
                    </label>
                    <textarea
                      rows="2"
                      value={articleForm.metaDescription}
                      onChange={(e) => setArticleForm({ ...articleForm, metaDescription: e.target.value })}
                      placeholder="Resuma em 2 a 3 linhas os principais pontos que o leitor aprenderá neste artigo..."
                      className="w-full px-3.5 py-2.5 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8]"
                    ></textarea>
                    <span className="text-[11px] text-[#536773] mt-1 block">
                      Este texto aparece na lista de artigos da página inicial e nos resultados do Google.
                    </span>
                  </div>

                  {/* Passo 3: Imagem de Destaque do Artigo (Upload ou Link) */}
                  <div className="bg-[#F8FAFC] border border-[#CCD4DA] rounded-lg p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                          3. Imagem de Destaque do Artigo
                        </label>
                        <p className="text-[11px] text-[#536773]">
                          Carregue uma imagem do seu computador ou informe um link direto.
                        </p>
                      </div>
                      {articleForm.image && (
                        <button
                          type="button"
                          onClick={() => setArticleForm({ ...articleForm, image: '' })}
                          className="text-[11px] text-red-600 hover:text-red-800 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <i className="fa-solid fa-trash-can text-[10px]" aria-hidden="true"></i>
                          <span>Remover</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-1">
                      {/* Upload de Ficheiro */}
                      <div>
                        <span className="block text-[11px] font-semibold text-[#163758] mb-1.5">
                          Carregar ficheiro de imagem:
                        </span>
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#CCD4DA] hover:border-[#1A73E8] bg-white rounded-lg p-4 cursor-pointer transition-colors group">
                          <i className="fa-solid fa-cloud-arrow-up text-2xl text-[#1A73E8] group-hover:scale-110 transition-transform mb-1.5" aria-hidden="true"></i>
                          <span className="text-xs font-bold text-[#163758]">Escolher do Computador</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WebP (até 5MB)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                          />
                        </label>
                      </div>

                      {/* URL Direto */}
                      <div>
                        <span className="block text-[11px] font-semibold text-[#163758] mb-1.5">
                          Ou inserir URL / link de imagem:
                        </span>
                        <input
                          type="url"
                          value={articleForm.image}
                          onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                          placeholder="https://exemplo.com/imagem-artigo.jpg"
                          className="w-full px-3.5 py-2.5 text-xs border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#1A73E8]"
                        />
                        <span className="text-[10px] text-[#536773] mt-1 block">
                          Pode colar links de bancos de imagens ou de um servidor externo.
                        </span>
                      </div>
                    </div>

                    {/* Preview da Imagem */}
                    {articleForm.image && (
                      <div className="mt-3 pt-3 border-t border-[#CCD4DA]/60 flex items-center gap-4">
                        <div className="w-28 h-16 rounded overflow-hidden border border-slate-300 bg-slate-900 shrink-0">
                          <img
                            src={articleForm.image}
                            alt="Pré-visualização da capa"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-emerald-700 block">
                            ✓ Imagem carregada e pronta para publicação
                          </span>
                          <span className="text-[11px] text-[#536773] block truncate">
                            {articleForm.image.startsWith('data:') ? 'Ficheiro local convertido' : articleForm.image}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Passo 4: Tópicos e Seções com UX Guiado */}
                  <div className="pt-4 border-t border-[#CCD4DA]/60">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                          4. Tópicos Estruturados do Conteúdo ({articleForm.sections.length} seções)
                        </label>
                        <p className="text-[11px] text-[#536773]">
                          Divida a explicação em tópicos claros (ex: requisitos, prazos, documentos e decisões judiciais).
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="px-3 py-1.5 rounded border border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-plus text-[10px]" aria-hidden="true"></i>
                        <span>Adicionar Tópico</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {articleForm.sections.map((section, idx) => (
                        <div key={idx} className="p-4 sm:p-5 rounded-lg border border-[#CCD4DA] bg-[#F8FAFC] relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-[#1A73E8] uppercase">
                              Tópico {idx + 1}
                            </span>
                            {articleForm.sections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(idx)}
                                className="text-red-600 hover:text-red-800 text-xs font-semibold"
                                title="Remover este tópico"
                              >
                                <i className="fa-solid fa-trash-can mr-1" aria-hidden="true"></i>
                                Remover
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <input
                                type="text"
                                value={section.subtitle}
                                onChange={(e) => handleSectionChange(idx, 'subtitle', e.target.value)}
                                placeholder="Título do tópico (ex: Competências e frameworks mais valorizados)"
                                className="w-full px-3 py-2 text-xs font-bold border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#1A73E8]"
                              />
                            </div>

                            <div>
                              <textarea
                                rows="4"
                                value={section.content}
                                onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                                placeholder="Escreva a orientação técnica e estratégica de forma clara, didática e prática..."
                                className="w-full px-3 py-2 text-xs border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#1A73E8] leading-relaxed"
                              ></textarea>
                            </div>

                            <div>
                              <input
                                type="text"
                                value={section.legalBasis}
                                onChange={(e) => handleSectionChange(idx, 'legalBasis', e.target.value)}
                                placeholder="Referência ou Framework (ex: ITIL 4 / Scrum Guide / PMBOK 7)"
                                className="w-full px-3 py-1.5 text-[11px] border border-[#CCD4DA] rounded bg-white text-[#536773] focus:outline-none focus:border-[#1A73E8]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Passo 4: Dica Prática de Alex Seles */}
                  <div className="pt-4 border-t border-[#CCD4DA]/60">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#163758] mb-1.5">
                      4. Recomendação Prática Final (Dica de Alex Seles)
                    </label>
                    <textarea
                      rows="2"
                      value={articleForm.practicalTip}
                      onChange={(e) => setArticleForm({ ...articleForm, practicalTip: e.target.value })}
                      placeholder="Ex: Antes de iniciar a transição, mapeie suas competências transferíveis e alinhe seu perfil às vagas estratégicas..."
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8]"
                    ></textarea>
                  </div>

                  {/* Botões de Ação */}
                  <div className="pt-4 border-t border-[#CCD4DA]/60 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="px-4 py-2.5 rounded border border-[#163758] text-[#163758] hover:bg-[#163758] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                    >
                      <i className="fa-solid fa-eye" aria-hidden="true"></i>
                      <span>{previewMode ? 'Ocultar Pré-visualização' : 'Pré-visualizar Como Fica no Site'}</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {editingArticleId && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
                        >
                          Cancelar Edição
                        </button>
                      )}

                      <button
                        type="submit"
                        className="btn-copper text-xs py-3 px-6 shadow-md inline-flex items-center gap-2 font-bold uppercase tracking-wider"
                      >
                        <i className={`fa-solid ${editingArticleId ? 'fa-floppy-disk' : 'fa-cloud-arrow-up'}`} aria-hidden="true"></i>
                        <span>{editingArticleId ? 'Guardar Alterações' : 'Publicar no Site Oficial'}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>

                </form>

                {/* Pré-visualização ao Vivo */}
                {previewMode && (
                  <div className="mt-8 p-6 sm:p-8 rounded-lg border-2 border-dashed border-[#1A73E8]/50 bg-slate-50">
                    <div className="flex items-center justify-between pb-4 border-b border-[#CCD4DA] mb-6">
                      <span className="text-xs uppercase font-bold text-[#1A73E8] tracking-wider">
                        Pré-visualização ao Vivo no Site Oficial
                      </span>
                      <span className="text-xs text-[#536773]">
                        {articleForm.category} • {articleForm.readingTime}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#163758] mb-3">
                      {articleForm.title || 'Título da sua publicação estratégica aparecerá aqui'}
                    </h3>

                    {articleForm.image && (
                      <div className="rounded-lg overflow-hidden my-4 max-h-64 bg-slate-900 border border-slate-200">
                        <img
                          src={articleForm.image}
                          alt="Capa do artigo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-[#536773] italic mb-6">
                      {articleForm.metaDescription || 'Resumo do artigo para a vitrine...'}
                    </p>

                    <div className="space-y-4">
                      {articleForm.sections.map((sec, i) => (
                        <div key={i} className="space-y-1">
                          <h4 className="text-sm font-bold text-[#163758]">{sec.subtitle}</h4>
                          <p className="text-xs text-[#536773] leading-relaxed whitespace-pre-line">
                            {sec.content || 'Texto da seção ainda não preenchido...'}
                          </p>
                          {sec.legalBasis && (
                            <span className="inline-block text-[11px] font-mono text-[#1A73E8] bg-[#1A73E8]/10 px-2 py-0.5 rounded">
                              {sec.legalBasis}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Lista de Artigos Publicados no Site (CRUD Completo) */}
              {allPublishedArticles.length > 0 && (
                <div className="bg-white rounded-lg border border-[#CCD4DA] p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#CCD4DA]/60">
                    <div>
                      <h2 className="font-display text-lg font-bold text-[#163758]">
                        Artigos Publicados no Site ({allPublishedArticles.length})
                      </h2>
                      <p className="text-xs text-[#536773]">
                        Gestão integral do acervo do site: edite o conteúdo, atualize capas ou remova artigos das páginas públicas.
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-[#CCD4DA]/60">
                    {allPublishedArticles.map((art) => (
                      <div key={art.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {art.image ? (
                            <img
                              src={art.image}
                              alt=""
                              className="w-16 h-12 rounded object-cover border border-slate-200 shrink-0 bg-slate-100"
                            />
                          ) : (
                            <div className="w-16 h-12 rounded border border-slate-200 shrink-0 bg-slate-100 flex items-center justify-center text-slate-400">
                              <i className="fa-regular fa-image text-sm" aria-hidden="true"></i>
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] uppercase font-bold text-[#1A73E8] bg-[#1A73E8]/10 px-2 py-0.5 rounded">
                                {art.category || 'Geral'}
                              </span>
                              <span className="text-[11px] text-[#536773]">
                                {art.publishedAt ? `Publicado em ${art.publishedAt}` : 'Publicado'}
                              </span>
                              {editingArticleId === art.id && (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                                  A Editar
                                </span>
                              )}
                            </div>
                            <h3 className="font-sans text-sm font-bold text-[#163758] truncate">
                              {art.title}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            to={`/central-de-conhecimento/${art.slug}`}
                            className="px-3 py-1.5 rounded text-xs font-bold text-[#1A73E8] hover:bg-[#1A73E8]/10 border border-[#1A73E8]/30 transition-colors inline-flex items-center gap-1"
                          >
                            <span>Ver</span>
                            <span aria-hidden="true">→</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(art)}
                            className="px-3 py-1.5 rounded text-xs font-bold text-[#163758] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors inline-flex items-center gap-1.5"
                            title="Editar este artigo"
                          >
                            <i className="fa-solid fa-pen-to-square text-[11px]" aria-hidden="true"></i>
                            <span>Editar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteArticle(art.id)}
                            className="px-3 py-1.5 rounded text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors inline-flex items-center gap-1.5"
                            title="Excluir artigo do site"
                          >
                            <i className="fa-solid fa-trash-can text-[11px]" aria-hidden="true"></i>
                            <span>Excluir</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 3: GESTÃO DE USUÁRIOS E SENHAS */}
          {/* ========================================================================= */}
          {activeTab === 'usuarios' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Formulário de Cadastro */}
              <div className="lg:col-span-5 bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm h-fit">
                <div className="border-b border-[#CCD4DA]/60 pb-4 mb-5">
                  <span className="text-xs uppercase font-bold text-[#1A73E8] tracking-wider">
                    Controle de Acessos
                  </span>
                  <h2 className="font-display text-xl font-bold text-[#163758] mt-1">
                    Registrar Novo Usuário
                  </h2>
                  <p className="text-xs text-[#536773] mt-1">
                    Cadastre advogados, assistentes jurídicos ou clientes para acesso restrito.
                  </p>
                </div>

                {userSuccessMsg && (
                  <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold">
                    {userSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newUser.nome}
                      onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                      placeholder="Ex: Dr. Lucas Nogueira"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      E-mail / Usuário de Acesso <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="alexseles40@gmail.com"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Senha Provisória ou Definitiva <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={newUser.senha}
                      onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:border-[#1A73E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#163758] mb-1">
                      Perfil de Acesso
                    </label>
                    <select
                      value={newUser.perfil}
                      onChange={(e) => setNewUser({ ...newUser, perfil: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-[#CCD4DA] rounded bg-white focus:outline-none focus:border-[#1A73E8]"
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Convidado">Convidado</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-copper text-xs py-2.5 px-4 w-full shadow mt-2 font-bold uppercase tracking-wider"
                  >
                    <span>Guardar Utilizador & Conceder Acesso</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              </div>

              {/* Lista de Usuários Cadastrados */}
              <div className="lg:col-span-7 bg-white rounded-lg border border-[#CCD4DA] p-6 sm:p-8 shadow-sm">
                <div className="border-b border-[#CCD4DA]/60 pb-4 mb-5">
                  <h2 className="font-display text-xl font-bold text-[#163758]">
                    Utilizadores Registados ({users.length})
                  </h2>
                  <p className="text-xs text-[#536773] mt-1">
                    Equipa com permissão para operar o backoffice e consultar mentorias.
                  </p>
                </div>

                <div className="divide-y divide-[#CCD4DA]/60">
                  {users.map((u) => (
                    <div key={u.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0E1620] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {u.nome.charAt(0)}
                        </div>
                        <div>
                          <strong className="text-xs sm:text-sm font-bold text-[#163758] block">
                            {u.nome}
                          </strong>
                          <span className="text-[11px] text-[#536773]">
                            {u.email} • <span className="font-semibold text-[#1A73E8]">{u.perfil}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                          {u.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setNewUser({
                              nome: u.nome,
                              email: u.email,
                              senha: '',
                              perfil: u.perfil || 'Administrador'
                            });
                          }}
                          className="text-xs text-[#1A73E8] hover:underline font-semibold"
                          title="Carregar para alterar senha ou perfil"
                        >
                          Editar / Senha
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-semibold"
                          title="Excluir este utilizador"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};
export default Backoffice;
