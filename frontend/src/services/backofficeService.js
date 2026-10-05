// Serviço Central do Backoffice e Acervo de Conteúdo
// Alex Seles • Mentoria de Carreira & TI
import { supabase } from '../lib/supabase';

const STORAGE_KEYS = {
  ARTICLES: 'mc_custom_articles',
  USERS: 'mc_users',
  METRICS: 'mc_metrics',
  CONTACTS: 'mc_contacts',
};

// Sem utilizadores embutidos no código: a lista vem da tabela admin_users (só visível a administradores autenticados)
const DEFAULT_USERS = [];

// Métricas iniciais
const DEFAULT_METRICS = {
  emailsRecebidos: 0,
  whatsappRecebidos: 0,
  artigosPublicados: 0,
  casosEmAndamento: 0
};

const DEFAULT_CONTACTS = [];

// --- SESSÃO DE ADMINISTRADOR (SUPABASE AUTH) ---
// A senha é verificada pelo Supabase Auth; o acesso aos dados é garantido pelas regras RLS da base de dados
// (função is_admin), e não por este código, que corre no navegador.

export const signInAdmin = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { ok: false, reason: 'credenciais' };
  const { data: isAdmin, error: rpcError } = await supabase.rpc('is_admin');
  if (rpcError || !isAdmin) {
    await supabase.auth.signOut();
    return { ok: false, reason: 'sem_permissao' };
  }
  return { ok: true };
};

export const clearAdminCache = () => {
  try {
    [STORAGE_KEYS.USERS, STORAGE_KEYS.CONTACTS].forEach((k) => localStorage.removeItem(k));
    sessionStorage.removeItem('mc_admin_session');
  } catch (e) {
    // sem armazenamento
  }
};

export const signOutAdmin = async () => {
  clearAdminCache();
  try {
    await supabase.auth.signOut();
  } catch (e) {
    // a sessão local é limpa de qualquer forma
  }
};

/** Email do administrador com sessão válida, ou null (sem sessão, expirada ou sem permissão). */
export const getAdminSession = async () => {
  const { data } = await supabase.auth.getSession();
  const session = data?.session;
  if (!session) return null;
  const { data: isAdmin, error } = await supabase.rpc('is_admin');
  if (error || !isAdmin) return null;
  return { email: session.user?.email || '' };
};

export const sendPasswordSetupEmail = async (email) => {
  const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined;
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
  return !error;
};

// --- GESTÃO DE UTILIZADORES (LISTA ADMIN_USERS; AS SENHAS FICAM NO SUPABASE AUTH) ---
export const getUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!data) return DEFAULT_USERS;
    const parsed = JSON.parse(data);
    // Blindagem de Segurança: expurgar qualquer senha em texto puro legada
    return parsed.map((u) => {
      const { senha, senha_hash, ...safeUser } = u;
      return safeUser;
    });
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const fetchSupabaseUsers = async () => {
  if (!supabase) return getUsers();
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, nome, perfil, status, created_at')
      .order('created_at', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped = data.map((u) => ({
        id: u.id,
        nome: u.nome || 'Administrador',
        email: u.email,
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
  const row = {
    nome: user.nome,
    perfil: user.perfil || 'Administrador',
    status: user.status || 'Ativo'
  };

  // 1. Grava / Atualiza no Supabase (tabela admin_users)
  if (supabase) {
    try {
      const { data: existing } = await supabase
        .from('admin_users')
        .select('id, email')
        .ilike('email', trimmedEmail);

      if (existing && existing.length > 0) {
        await supabase.from('admin_users').update(row).eq('id', existing[0].id);
      } else {
        await supabase.from('admin_users').insert([{ ...row, email: (user.email || '').trim() }]);
      }
    } catch (err) {
      console.warn('Erro ao persistir utilizador no Supabase:', err);
    }
  }

  // 2. Grava no cache local
  const { senha: _s, senha_hash: _h, ...clean } = user;
  const existingIndex = users.findIndex(
    (u) => (u.email || '').trim().toLowerCase() === trimmedEmail
  );

  let updated;
  if (existingIndex >= 0) {
    updated = [...users];
    updated[existingIndex] = { ...updated[existingIndex], ...clean, email: (user.email || '').trim(), status: user.status || 'Ativo' };
  } else {
    updated = [{
      ...clean,
      email: (user.email || '').trim(),
      id: user.id || `user-${Date.now()}`,
      dataCadastro: new Date().toLocaleDateString('pt-BR'),
      status: user.status || 'Ativo'
    }, ...users];
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
    // Só um administrador autenticado consegue ler (regras RLS da tabela contatos)
    const { data, error } = await supabase.from('contatos').select('*').order('created_at', { ascending: false });

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
