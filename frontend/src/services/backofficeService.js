// Serviço Central do Backoffice e Acervo de Conteúdo
// Alex Seles • Mentoria de Carreira & TI
import { supabase } from '../lib/supabase';

const STORAGE_KEYS = {
  ARTICLES: 'mc_custom_articles',
  USERS: 'mc_users',
  METRICS: 'mc_metrics',
  CONTACTS: 'mc_contacts',
};

// Usuário padrão do sistema
const DEFAULT_USERS = [
  {
    id: 'user-admin',
    nome: 'Alex Seles',
    email: import.meta.env.VITE_ADMIN_USER || 'alexseles40@gmail.com',
    perfil: 'Head de Inovação & Mentoria',
    status: 'Ativo',
    dataCadastro: new Date().toLocaleDateString('pt-BR')
  }
];

// Métricas iniciais
const DEFAULT_METRICS = {
  emailsRecebidos: 0,
  whatsappRecebidos: 0,
  artigosPublicados: 0,
  casosEmAndamento: 0
};

const DEFAULT_CONTACTS = [];

// --- GESTÃO DE USUÁRIOS ---
export const getUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const saveUser = (user) => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: `user-${Date.now()}`,
    dataCadastro: new Date().toLocaleDateString('pt-BR'),
    status: user.status || 'Ativo'
  };
  const updated = [newUser, ...users];
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
  return updated;
};

export const deleteUser = (userId) => {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
  return filtered;
};

// --- GESTÃO DE MÉTRICAS & CONTATOS (COM SUPABASE) ---
export const getContacts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (!data) return DEFAULT_CONTACTS;
    const parsed = JSON.parse(data);
    const cleaned = parsed.filter(
      (c) => c.id !== 'ct-1' && c.id !== 'ct-2' && c.id !== 'ct-3' && c.id !== 'ct-4' && c.id !== 'ct-5'
    );
    return cleaned;
  } catch (e) {
    return DEFAULT_CONTACTS;
  }
};

export const fetchSupabaseContacts = async () => {
  if (!supabase) return getContacts();

  try {
    const sessionStr = sessionStorage.getItem('mc_admin_session');
    let sessionToken = null;
    if (sessionStr) {
      try {
        sessionToken = JSON.parse(sessionStr).token;
      } catch (e) {}
    }

    let data = null;
    let error = null;

    // Se possui token de sessão ativa, requisita via RPC autenticada no banco
    if (sessionToken) {
      const rpcRes = await supabase.rpc('obter_contatos_admin', { p_token: sessionToken });
      data = rpcRes.data;
      error = rpcRes.error;
    } else {
      const queryRes = await supabase.from('contatos').select('*').order('created_at', { ascending: false });
      data = queryRes.data;
      error = queryRes.error;
    }

    if (!error && Array.isArray(data)) {
      const mapped = data.map((item) => ({
        id: item.id,
        tipo: item.tipo,
        nome: item.nome,
        contato: item.contato,
        origem: item.origem,
        data: new Date(item.created_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
        status: item.status || 'Novo'
      }));

      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(mapped));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mc_contacts_updated'));
      }
      return mapped;
    }
  } catch (err) {
    console.warn('Fallback para contatos locais:', err);
  }

  return getContacts();
};

export const getMetrics = () => {
  try {
    const contacts = getContacts();
    const emailsCount = contacts.filter((c) => c.tipo === 'email').length;
    const whatsCount = contacts.filter((c) => c.tipo === 'whatsapp').length;
    const customCount = getCustomArticles().length;

    return {
      emailsRecebidos: emailsCount,
      whatsappRecebidos: whatsCount,
      artigosPublicados: DEFAULT_METRICS.artigosPublicados + customCount,
      casosEmAndamento: 0
    };
  } catch (e) {
    return DEFAULT_METRICS;
  }
};

export const addContact = async (contact) => {
  const newContact = {
    ...contact,
    id: `ct-${Date.now()}`,
    data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
  };

  // 1. Grava no banco de dados Supabase
  if (supabase) {
    try {
      await supabase.from('contatos').insert([{
        tipo: contact.tipo,
        nome: contact.nome || 'Interessado',
        contato: contact.contato || 'Sem contato',
        origem: contact.origem || 'Site Oficial',
        status: contact.status || 'Novo',
        mensagem: contact.mensagem || null
      }]);
    } catch (err) {
      console.warn('Erro ao inserir no Supabase:', err);
    }
  }

  // 2. Grava no cache local para resposta imediata da interface
  const contacts = getContacts();
  const updated = [newContact, ...contacts];
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updated));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_contacts_updated'));
  }

  return updated;
};

// --- GESTÃO DO ACERVO DE ORIENTAÇÕES (COM SUPABASE) ---
export const getCustomArticles = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const fetchSupabaseArticles = async () => {
  if (!supabase) return getCustomArticles();

  try {
    const { data, error } = await supabase
      .from('artigos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped = data.map((item, idx) => ({
        id: item.id,
        number: 40 + idx + 1,
        title: item.title,
        h1: item.title,
        slug: item.slug,
        category: item.category,
        categorySlug: item.category_slug,
        metaDescription: item.meta_description,
        readingTime: item.reading_time,
        publishedAt: new Date(item.created_at).toISOString().split('T')[0],
        isCustom: true,
        author: {
          name: 'Alex Seles',
          role: 'Head de Inovação & Tecnologia | Embaixador ITIL'
        },
        image: item.image || item.image_url || null,
        sections: item.sections || [],
        practicalTip: item.practical_tip
      }));

      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(mapped));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mc_articles_updated'));
      }
      return mapped;
    }
  } catch (err) {
    console.warn('Fallback para artigos locais:', err);
  }

  return getCustomArticles();
};

export const saveCustomArticle = async (articleData) => {
  const articles = getCustomArticles();
  
  const baseSlug = articleData.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const slug = `artigo-${Date.now().toString().slice(-4)}-${baseSlug}`;

  const newArticle = {
    id: `custom-art-${Date.now()}`,
    number: 40 + articles.length + 1,
    title: articleData.title,
    h1: articleData.title,
    slug: slug,
    image: articleData.image || null,
    category: articleData.category || 'Carreira & TI',
    categorySlug: articleData.categorySlug || 'carreira-ti',
    metaDescription: articleData.metaDescription || articleData.summary || 'Artigo e orientação profissional desenvolvida por Alex Seles.',
    keywords: articleData.keywords || [articleData.category, 'carreira', 'alex seles'],
    readingTime: articleData.readingTime || '5 min de leitura',
    publishedAt: new Date().toISOString().split('T')[0],
    isCustom: true,
    author: {
      name: 'Alex Seles',
      role: 'Head de Inovação & Tecnologia'
    },
    sections: articleData.sections || [
      {
        subtitle: 'Visão Geral e Contexto Estratégico',
        paragraphs: [articleData.content || 'Conteúdo do artigo de mentoria.']
      }
    ],
    practicalTip: articleData.practicalTip || 'Para transformar seu plano de carreira em resultados consistentes, estabeleça metas claras e conte com orientação especializada.'
  };

  // 1. Grava no Supabase
  if (supabase) {
    try {
      await supabase.from('artigos').insert([{
        title: newArticle.title,
        slug: newArticle.slug,
        image: newArticle.image,
        category: newArticle.category,
        category_slug: newArticle.categorySlug,
        reading_time: newArticle.readingTime,
        meta_description: newArticle.metaDescription,
        practical_tip: newArticle.practicalTip,
        sections: newArticle.sections,
        status: 'Publicado'
      }]);
    } catch (err) {
      console.warn('Erro ao gravar artigo no Supabase:', err);
    }
  }

  // 2. Grava no cache local
  const updated = [newArticle, ...articles];
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_articles_updated'));
  }
  
  return newArticle;
};

export const updateCustomArticle = async (articleId, articleData) => {
  const custom = getCustomArticles();
  const existingIdx = custom.findIndex((a) => a.id === articleId);

  let updatedArticle;
  if (existingIdx >= 0) {
    updatedArticle = {
      ...custom[existingIdx],
      ...articleData,
      h1: articleData.title || custom[existingIdx].h1,
      image: articleData.image !== undefined ? articleData.image : custom[existingIdx].image,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    custom[existingIdx] = updatedArticle;
  } else {
    // Sobrescrever artigo padrão da base
    updatedArticle = {
      ...articleData,
      id: articleId,
      h1: articleData.title,
      image: articleData.image || null,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    custom.unshift(updatedArticle);
  }

  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(custom));

  if (supabase) {
    try {
      await supabase.from('artigos').upsert([{
        title: updatedArticle.title,
        slug: updatedArticle.slug,
        image: updatedArticle.image,
        category: updatedArticle.category,
        category_slug: updatedArticle.categorySlug,
        reading_time: updatedArticle.readingTime,
        meta_description: updatedArticle.metaDescription,
        practical_tip: updatedArticle.practicalTip,
        sections: updatedArticle.sections,
        status: 'Publicado'
      }]);
    } catch (err) {
      console.warn('Erro ao atualizar artigo no Supabase:', err);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_articles_updated'));
  }

  return updatedArticle;
};

export const deleteCustomArticle = async (articleId) => {
  if (supabase) {
    try {
      await supabase.from('artigos').delete().eq('id', articleId);
    } catch (err) {
      console.warn('Erro ao deletar no Supabase:', err);
    }
  }

  const articles = getCustomArticles();
  const filtered = articles.filter((a) => a.id !== articleId);
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(filtered));

  // Registar na lista de excluídos para ocultar também se for artigo nativo
  try {
    const deleted = JSON.parse(localStorage.getItem('mc_deleted_articles') || '[]');
    if (!deleted.includes(articleId)) {
      deleted.push(articleId);
      localStorage.setItem('mc_deleted_articles', JSON.stringify(deleted));
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_articles_updated'));
  }
  return filtered;
};
