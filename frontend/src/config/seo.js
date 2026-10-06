// SEO do site www.alexseles.online: fonte única para títulos, descrições, palavras-chave e dados estruturados.
// Usado pelo React (MetaTags) e pela construção (scripts/generate-routes.js gera o HTML de cada rota, o sitemap e o llms.txt).
// Regras: título até 60 caracteres e descrição até 160, únicos por página, em português europeu, sem repetir palavras-chave à força.
import { SOCIAL_LINKS } from './social.js';

export const SITE_URL = 'https://www.alexseles.online';
export const SITE_NAME = 'RP1 Academy';
export const AUTHOR = 'Alex Seles';
export const LOCALE = 'pt_PT';
export const LANG = 'pt-PT';
export const OG_IMAGE = `${SITE_URL}/og/rp1-academy-og.jpg`; // 1200×630
export const OG_IMAGE_ALT = 'Astronauta de capacete com o texto: A sua próxima experiência interativa. Comunidade PM Unlocked com Alex Seles.';
export const LOGO_URL = `${SITE_URL}/favicon-192x192.png`;
export const CONTACT_EMAIL = 'contato@alexseles.online';

// Posicionamento numa frase (usado no llms.txt e no JSON-LD do site)
export const POSITIONING = 'Comunidade PM Unlocked e mentoria de Alex Seles: gestão de projetos, carreira em TI, certificações e a vida em Portugal.';

// Palavras-chave do negócio. As primárias guiam títulos e descrições; as secundárias aparecem no conteúdo e nos artigos.
export const KEYWORDS = {
  primary: [
    'comunidade de gestão de projetos',
    'PM Unlocked',
    'mentoria de carreira em TI',
    'transição de carreira para TI',
    'vagas de project manager em Portugal',
    'Alex Seles',
  ],
  secondary: [
    'certificação PMP',
    'certificação PSM I',
    'certificação PSPO',
    'certificação SAFe',
    'CAPM',
    'Scrum Master',
    'Product Owner',
    'PMO',
    'migrar para Portugal',
    'carreira em tecnologia',
    'podcast de carreira',
    'RP1 Academy',
  ],
};

// Metadados por rota (caminho sem barra inicial; '' é a página inicial)
export const PAGES = {
  '': {
    title: 'PM Unlocked: comunidade de gestão de projetos | Alex Seles',
    description: 'Comunidade gratuita de gestão de projetos com Alex Seles: vagas de project manager, certificações PMP, PSM e SAFe, carreira em TI e migrar para Portugal.',
    changefreq: 'weekly',
    priority: '1.0',
  },
  'central-de-conhecimento': {
    title: 'Artigos: carreira em TI e gestão de projetos | Alex Seles',
    description: 'Central de Conhecimento de Alex Seles: artigos práticos sobre transição de carreira para TI, certificações e gestão de projetos.',
    changefreq: 'weekly',
    priority: '0.8',
  },
  'politica-de-privacidade': {
    title: 'Política de Privacidade (RGPD) | Alex Seles',
    description: 'Como são tratados os dados pessoais no site e na comunidade PM Unlocked, em conformidade com o RGPD e a LGPD.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  'termos-de-uso': {
    title: 'Termos de Utilização | Alex Seles',
    description: 'Condições de utilização do site www.alexseles.online, da comunidade PM Unlocked e dos pedidos de mentoria.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  // Não indexáveis: têm HTML próprio com noindex, mas ficam fora do sitemap
  chat: {
    title: 'Fale com a Beatriz | RP1 Academy',
    description: 'Chat com a Beatriz, assistente digital da comunidade PM Unlocked.',
    noindex: true,
  },
  login: {
    title: 'Área reservada | RP1 Academy',
    description: 'Acesso reservado à equipa.',
    noindex: true,
  },
};

export const NOINDEX_PATHS = ['/chat', '/login', '/backoffice', '/admin', '/dashboard'];

/** Título de um artigo: com " | Alex Seles" se couber em 60 caracteres; senão só o título (o Google corta o resto). */
export const articleTitle = (title, seoTitle) => {
  const t = String(seoTitle || title || '').trim();
  return t.length + 13 <= 60 ? `${t} | Alex Seles` : t;
};

/** Descrição até 160 caracteres, cortada numa palavra. */
export const clampDescription = (text, max = 160) => {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
};

export const absoluteUrl = (path = '') => {
  const clean = String(path || '').replace(/^\/+/, '');
  return clean ? `${SITE_URL}/${clean}` : `${SITE_URL}/`;
};

// ─── Dados estruturados (Schema.org, JSON-LD) ───

export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#alexseles`,
  name: 'Alex Seles',
  url: `${SITE_URL}/#sobre`,
  image: `${SITE_URL}/assets/alexseles.png`,
  jobTitle: 'Head de Inovação & Tecnologia | Mentor de Carreira TI',
  description: 'Engenheiro Informático e mestre em Engenharia Informática, com mais de 20 anos de experiência em gestão de projetos de software. Membro do PMI e Embaixador ITIL em Portugal.',
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: SOCIAL_LINKS.filter((s) => s.id === 'linkedin').map((s) => s.url),
  memberOf: { '@type': 'Organization', name: 'Project Management Institute (PMI)' },
  knowsAbout: [
    'Gestão de projetos', 'Metodologias ágeis', 'Scrum', 'SAFe', 'ITIL 4', 'PMO',
    'Transição de carreira para TI', 'Transformação digital', 'Engenharia de software',
  ],
  hasCredential: ['PMP®', 'SAFe® 6 Agilist', 'ITIL® 4', 'PSM II™', 'PSM I™', 'PSPO I™'].map((name) => ({
    '@type': 'EducationalOccupationalCredential', name, credentialCategory: 'certification',
  })),
};

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#rp1academy`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 192, height: 192 },
  email: `mailto:${CONTACT_EMAIL}`,
  founder: { '@id': `${SITE_URL}/#alexseles` },
  sameAs: SOCIAL_LINKS.map((s) => s.url),
  description: 'RP1 é um acrónimo de Refined Petroleum 1, o combustível usado nos motores dos foguetões espaciais. A missão é desenhar experiências transformadoras que envolvem a comunidade de tecnologia através da educação.',
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: 'Alex Seles · Comunidade PM Unlocked',
  alternateName: SITE_NAME,
  description: POSITIONING,
  inLanguage: LANG,
  publisher: { '@id': `${SITE_URL}/#rp1academy` },
  author: { '@id': `${SITE_URL}/#alexseles` },
};

/** Data AAAA-MM-DD de um artigo (estático: publishedAt; Supabase: created_at). */
export const articleDate = (a) => String(a.publishedAt || a.created_at || '').slice(0, 10) || null;

/** JSON-LD de um artigo: BlogPosting + BreadcrumbList (o mesmo no HTML pré-gerado e no React). */
export const articleJsonLd = (article, imageUrl) => {
  const url = absoluteUrl(`central-de-conhecimento/${article.slug}`);
  const date = articleDate(article);
  const headline = String(article.h1 || article.title || '').slice(0, 110);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#artigo`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        headline,
        description: clampDescription(article.metaDescription || article.meta_description || ''),
        image: imageUrl ? [imageUrl] : [OG_IMAGE],
        ...(date ? { datePublished: date, dateModified: date } : {}),
        inLanguage: LANG,
        articleSection: article.category || 'Carreira & TI',
        ...(Array.isArray(article.keywords) && article.keywords.length ? { keywords: article.keywords.join(', ') } : {}),
        author: { '@type': 'Person', '@id': `${SITE_URL}/#alexseles`, name: 'Alex Seles', url: `${SITE_URL}/#sobre` },
        publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#rp1academy`, name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Artigos', item: absoluteUrl('central-de-conhecimento') },
          { '@type': 'ListItem', position: 3, name: headline, item: url },
        ],
      },
    ],
  };
};
