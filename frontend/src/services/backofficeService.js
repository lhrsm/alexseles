// Serviço Central do Backoffice e Acervo de Conteúdo
// Alex Seles • Mentoria de Carreira & TI
import { supabase } from '../lib/supabase';

export const computeSHA256 = async (str) => {
  if (!str) return '';
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return str;
};

const STORAGE_KEYS = {
  ARTICLES: 'mc_custom_articles',
  USERS: 'mc_users',
  METRICS: 'mc_metrics',
  CONTACTS: 'mc_contacts',
};

// Utilizador padrão do sistema
const DEFAULT_USERS = [
  {
    id: 'user-admin',
    nome: 'Alex Seles',
    email: import.meta.env.VITE_ADMIN_USER || 'contato@alexseles.online',
    senha: import.meta.env.VITE_ADMIN_PASSWORD || '+7U.hhrTjnrv&hD',
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

// --- GESTÃO DE UTILIZADORES (SINCRONIZAÇÃO TOTAL COM SUPABASE ADMIN_USERS) ---
export const getUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const fetchSupabaseUsers = async () => {
  if (!supabase) return getUsers();
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped = data.map((u) => ({
        id: u.id,
        nome: u.nome || 'Administrador',
        email: u.email,
        senha_hash: u.senha_hash,
        perfil: u.perfil || 'Administrador',
        status: u.status || 'Ativo',
        dataCadastro: u.created_at ? new Date(u.created_at).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')
      }));

      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mapped));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mc_users_updated'));
      }
      return mapped;
    }
  } catch (err) {
    console.warn('Fallback para utilizadores locais:', err);
  }
  return getUsers();
};

export const saveUser = async (user) => {
  const users = getUsers();
  const trimmedEmail = (user.email || '').trim().toLowerCase();
  const rawSenha = (user.senha || '').trim();
  const senhaHash = rawSenha ? await computeSHA256(rawSenha) : user.senha_hash;

  // 1. Grava / Atualiza no Supabase (tabela admin_users)
  if (supabase) {
    try {
      const { data: existing } = await supabase
        .from('admin_users')
        .select('id, email')
        .ilike('email', trimmedEmail);

      if (existing && existing.length > 0) {
        const updatePayload = {
          nome: user.nome,
          perfil: user.perfil || 'Administrador',
          status: user.status || 'Ativo'
        };
        if (senhaHash) {
          updatePayload.senha_hash = senhaHash;
        }
        await supabase
          .from('admin_users')
          .update(updatePayload)
          .eq('id', existing[0].id);
      } else {
        await supabase
          .from('admin_users')
          .insert([{
            nome: user.nome,
            email: (user.email || '').trim(),
            senha_hash: senhaHash,
            perfil: user.perfil || 'Administrador',
            status: user.status || 'Ativo'
          }]);
      }
    } catch (err) {
      console.warn('Erro ao persistir utilizador no Supabase:', err);
    }
  }

  // 2. Grava no cache local
  const existingIndex = users.findIndex(
    (u) => (u.email || '').trim().toLowerCase() === trimmedEmail
  );

  let updated;
  if (existingIndex >= 0) {
    updated = [...users];
    updated[existingIndex] = {
      ...updated[existingIndex],
      ...user,
      email: (user.email || '').trim(),
      senha: rawSenha || updated[existingIndex].senha,
      senha_hash: senhaHash || updated[existingIndex].senha_hash,
      status: user.status || 'Ativo'
    };
  } else {
    const newUser = {
      ...user,
      email: (user.email || '').trim(),
      senha: rawSenha,
      senha_hash: senhaHash,
      id: user.id || `user-${Date.now()}`,
      dataCadastro: new Date().toLocaleDateString('pt-BR'),
      status: user.status || 'Ativo'
    };
    updated = [newUser, ...users];
  }

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_users_updated'));
  }
  return updated;
};

export const deleteUser = async (userId) => {
  const users = getUsers();
  const userToDelete = users.find((u) => u.id === userId);

  // 1. Remove do Supabase
  if (supabase && userToDelete) {
    try {
      if (userId && !userId.toString().startsWith('user-')) {
        await supabase.from('admin_users').delete().eq('id', userId);
      }
      if (userToDelete.email) {
        await supabase.from('admin_users').delete().ilike('email', userToDelete.email.trim());
      }
    } catch (err) {
      console.warn('Erro ao remover utilizador do Supabase:', err);
    }
  }

  // 2. Remove do cache local
  const filtered = users.filter((u) => {
    if (u.id === userId) return false;
    if (userToDelete?.email && (u.email || '').trim().toLowerCase() === userToDelete.email.trim().toLowerCase()) return false;
    return true;
  });

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('mc_users_updated'));
  }
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

// --- GESTÃO E NORMALIZAÇÃO DO ACERVO DE ARTIGOS ---
export const normalizeCustomArticle = (art) => {
  if (!art) return null;
  const rawSections = Array.isArray(art.sections) && art.sections.length > 0
    ? art.sections
    : [
        {
          subtitle: 'Visão Geral e Contexto Estratégico',
          paragraphs: [art.content || art.metaDescription || '']
        }
      ];

  const sections = rawSections.map((s, idx) => ({
    subtitle: s.subtitle || s.title || `Tópico ${idx + 1}`,
    paragraphs: Array.isArray(s.paragraphs)
      ? s.paragraphs
      : (typeof s.content === 'string' ? s.content.split('\n').filter(Boolean) : [s.paragraphs || s.content || ''])
  }));

  const h2Subtitles = Array.isArray(art.h2Subtitles) && art.h2Subtitles.length > 0
    ? art.h2Subtitles
    : sections.map((s) => s.subtitle).filter(Boolean);

  const keywords = Array.isArray(art.keywords) && art.keywords.length > 0
    ? art.keywords
    : (typeof art.keywords === 'string'
        ? art.keywords.split(',').map((k) => k.trim()).filter(Boolean)
        : [art.category || 'Carreira & TI', 'Mentoria', 'Tecnologia']);

  return {
    ...art,
    title: art.title || art.h1 || 'Artigo de Mentoria',
    h1: art.h1 || art.title || 'Artigo de Mentoria',
    category: art.category || 'Carreira & TI',
    categorySlug: art.categorySlug || 'carreira-ti',
    metaDescription: art.metaDescription || art.summary || 'Artigo e orientação profissional de Alex Seles.',
    readingTime: art.readingTime || '5 min de leitura',
    practicalTip: art.practicalTip || 'Para transformar seu plano de carreira em resultados consistentes, estabeleça metas claras e conte com orientação especializada.',
    sections,
    h2Subtitles: h2Subtitles.length > 0 ? h2Subtitles : ['Visão Geral e Contexto Estratégico'],
    keywords
  };
};

export const getCustomArticles = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.map(normalizeCustomArticle) : [];
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
      const mapped = data.map((item, idx) => {
        const rawSections = Array.isArray(item.sections) ? item.sections : [];
        const sections = rawSections.map((s, sIdx) => ({
          subtitle: s.subtitle || s.title || `Tópico ${sIdx + 1}`,
          paragraphs: Array.isArray(s.paragraphs)
            ? s.paragraphs
            : (typeof s.content === 'string' ? s.content.split('\n').filter(Boolean) : [s.paragraphs || s.content || ''])
        }));
        const h2Subtitles = sections.map((s) => s.subtitle).filter(Boolean);
        const image = (Array.isArray(rawSections) && rawSections[0] && rawSections[0].image) || item.image || null;

        return {
          id: item.id,
          number: 40 + idx + 1,
          title: item.title,
          h1: item.title,
          slug: item.slug,
          category: item.category || 'Carreira & TI',
          categorySlug: item.category_slug || 'carreira-ti',
          metaDescription: item.meta_description || 'Artigo e orientação profissional desenvolvida por Alex Seles.',
          readingTime: item.reading_time || '5 min de leitura',
          publishedAt: new Date(item.created_at).toISOString().split('T')[0],
          isCustom: true,
          author: {
            name: 'Alex Seles',
            role: 'Head de Inovação & Tecnologia | Embaixador ITIL'
          },
          image: image,
          h2Subtitles: h2Subtitles.length > 0 ? h2Subtitles : ['Visão Geral e Contexto Estratégico'],
          sections: sections.length > 0 ? sections : [
            {
              subtitle: 'Visão Geral e Contexto Estratégico',
              paragraphs: [item.meta_description || 'Conteúdo do artigo de mentoria.']
            }
          ],
          keywords: [item.category || 'Carreira & TI', 'Tecnologia', 'Mentoria', 'Alex Seles'],
          practicalTip: item.practical_tip || 'Para transformar seu plano de carreira em resultados consistentes, estabeleça metas claras e conte com orientação especializada.'
        };
      });

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

  const rawSections = Array.isArray(articleData.sections) && articleData.sections.length > 0
    ? articleData.sections
    : [
        {
          subtitle: 'Visão Geral e Contexto Estratégico',
          paragraphs: [articleData.content || 'Conteúdo do artigo de mentoria.']
        }
      ];

  const sections = rawSections.map((s, idx) => ({
    subtitle: s.subtitle || s.title || `Tópico ${idx + 1}`,
    paragraphs: Array.isArray(s.paragraphs)
      ? s.paragraphs
      : (typeof s.content === 'string' ? s.content.split('\n').filter(Boolean) : [s.paragraphs || s.content || ''])
  }));

  if (articleData.image && sections.length > 0) {
    sections[0].image = articleData.image;
  }

  const h2Subtitles = sections.map((s) => s.subtitle).filter(Boolean);

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
    keywords: Array.isArray(articleData.keywords) ? articleData.keywords : [articleData.category || 'Carreira & TI', 'carreira', 'alex seles'],
    h2Subtitles: h2Subtitles.length > 0 ? h2Subtitles : ['Visão Geral e Contexto Estratégico'],
    readingTime: articleData.readingTime || '5 min de leitura',
    publishedAt: new Date().toISOString().split('T')[0],
    isCustom: true,
    author: {
      name: 'Alex Seles',
      role: 'Head de Inovação & Tecnologia'
    },
    sections: sections,
    practicalTip: articleData.practicalTip || 'Para transformar seu plano de carreira em resultados consistentes, estabeleça metas claras e conte com orientação especializada.'
  };

  // 1. Grava no Supabase (omitindo a coluna "image" que não existe no esquema da tabela "artigos")
  if (supabase) {
    try {
      await supabase.from('artigos').insert([{
        title: newArticle.title,
        slug: newArticle.slug,
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
    const rawSections = Array.isArray(articleData.sections) ? articleData.sections : custom[existingIdx].sections;
    const sections = (rawSections || []).map((s, idx) => ({
      subtitle: s.subtitle || s.title || `Tópico ${idx + 1}`,
      paragraphs: Array.isArray(s.paragraphs)
        ? s.paragraphs
        : (typeof s.content === 'string' ? s.content.split('\n').filter(Boolean) : [s.paragraphs || s.content || ''])
    }));

    if (articleData.image && sections.length > 0) {
      sections[0].image = articleData.image;
    }

    const h2Subtitles = sections.map((s) => s.subtitle).filter(Boolean);

    updatedArticle = {
      ...custom[existingIdx],
      ...articleData,
      h1: articleData.title || custom[existingIdx].h1,
      image: articleData.image !== undefined ? articleData.image : custom[existingIdx].image,
      sections,
      h2Subtitles: h2Subtitles.length > 0 ? h2Subtitles : ['Visão Geral e Contexto Estratégico'],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    custom[existingIdx] = updatedArticle;
  } else {
    updatedArticle = normalizeCustomArticle({
      ...articleData,
      id: articleId,
      h1: articleData.title,
      image: articleData.image || null,
      updatedAt: new Date().toISOString().split('T')[0]
    });
    custom.unshift(updatedArticle);
  }

  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(custom));

  if (supabase) {
    try {
      await supabase.from('artigos').upsert([{
        title: updatedArticle.title,
        slug: updatedArticle.slug,
        category: updatedArticle.category,
        category_slug: updatedArticle.categorySlug,
        reading_time: updatedArticle.readingTime,
        meta_description: updatedArticle.metaDescription,
        practical_tip: updatedArticle.practicalTip,
        sections: updatedArticle.sections,
        status: 'Publicado'
      }], { onConflict: 'slug' });
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
  const articles = getCustomArticles();
  const articleToDelete = articles.find((a) => a.id === articleId);

  if (supabase) {
    try {
      if (articleId && !articleId.toString().startsWith('custom-art-')) {
        await supabase.from('artigos').delete().eq('id', articleId);
      }
      if (articleToDelete?.slug) {
        await supabase.from('artigos').delete().eq('slug', articleToDelete.slug);
      }
    } catch (err) {
      console.warn('Erro ao eliminar no Supabase:', err);
    }
  }

  const filtered = articles.filter((a) => a.id !== articleId && (!articleToDelete?.slug || a.slug !== articleToDelete.slug));
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(filtered));

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
