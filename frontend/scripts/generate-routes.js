/**
 * Depois do `vite build`: gera o SEO estático do site a partir de src/config/seo.js e dos artigos.
 *
 * - HTML próprio para cada rota (título, descrição, canonical, Open Graph, Twitter e JSON-LD no <head>),
 *   para o Google e as IAs lerem sem JavaScript. Inclui a página inicial (dist/index.html).
 * - sitemap.xml só com as páginas indexáveis e a data real de cada uma (artigos com imagem).
 * - llms.txt e llms-full.txt (padrão llmstxt.org) com o conteúdo atual do site.
 *
 * Artigos: os do código (src/data/articlesData.js) e os publicados no Supabase. Se o Supabase falhar, a construção continua.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  SITE_URL, SITE_NAME, LOCALE, LANG, OG_IMAGE, OG_IMAGE_ALT, POSITIONING, PAGES, KEYWORDS, CONTACT_EMAIL,
  PERSON, ORGANIZATION, WEBSITE, absoluteUrl, articleTitle, clampDescription, articleDate, articleJsonLd,
} from '../src/config/seo.js';
import { COMMUNITY_GROUPS, COMMUNITY_TOTAL } from '../src/config/community.js';
import { SOCIAL_LINKS } from '../src/config/social.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[ERRO] dist/index.html não encontrado. Execute primeiro o build do Vite.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf-8');
if (!template.includes('<!--SEO:START-->') || !template.includes('<!--SEO:END-->')) {
  console.error('[ERRO] Faltam os marcadores <!--SEO:START--> e <!--SEO:END--> no index.html.');
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonForHtml = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

// ─── Artigos do código: lê articlesData.js sem o Vite (os imports das imagens passam a nomes de ficheiro) ───
async function loadStaticArticles() {
  const src = fs.readFileSync(path.join(root, 'src/data/articlesData.js'), 'utf-8');
  const code = src
    .replace(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/gm, (_m, name, file) => `const ${name} = '__IMG__${path.basename(file)}';`)
    .replace(/^import\s+.*$/gm, '');
  const tmp = path.join(__dirname, '.tmp-articles.mjs');
  fs.writeFileSync(tmp, code, 'utf-8');
  try {
    const mod = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`);
    return mod.articlesData || [];
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

// Caminho final (com hash) de uma imagem dos artigos, procurado em dist/assets
const assetFiles = fs.existsSync(path.join(distDir, 'assets')) ? fs.readdirSync(path.join(distDir, 'assets')) : [];
const builtImage = (value) => {
  if (!value) return null;
  const v = String(value);
  if (v.startsWith('http')) return v;
  if (!v.startsWith('__IMG__')) return absoluteUrl(v);
  const file = v.slice('__IMG__'.length);
  const stem = file.replace(/\.[^.]+$/, '');
  const ext = path.extname(file);
  const hit = assetFiles.find((f) => f.startsWith(`${stem}-`) && f.endsWith(ext));
  return hit ? `${SITE_URL}/assets/${hit}` : null;
};

const staticArticles = (await loadStaticArticles()).map((a) => ({
  slug: a.slug,
  title: a.h1 || a.title,
  seoTitle: a.seoTitle,
  description: a.metaDescription,
  date: articleDate(a),
  image: builtImage(a.image),
  category: a.category,
  keywords: a.keywords,
  sections: a.sections || [],
  practicalTip: a.practicalTip,
  source: a,
}));

// ─── Artigos do Supabase (backoffice e Beatriz) ───
const SUPABASE_URL = (process.env.VITE_SUPABASE_URL || 'https://olpxtxcreseibkiwvlnc.supabase.co').replace(/\/$/, '');
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jG-WP0m35Db9WvRzuCsCBQ_uTJ6oAE9';
const remoteArticles = [];
try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/artigos?select=title,slug,meta_description,category,sections,practical_tip,created_at&status=eq.Publicado&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const known = new Set(staticArticles.map((a) => a.slug));
  for (const row of (await res.json()) || []) {
    if (!row || !row.title || !/^[a-z0-9-]+$/.test(row.slug || '') || known.has(row.slug)) continue;
    known.add(row.slug);
    const sections = Array.isArray(row.sections) ? row.sections : [];
    const img = sections[0] && sections[0].image;
    remoteArticles.push({
      slug: row.slug, title: row.title, description: row.meta_description, date: articleDate(row),
      image: img && String(img).startsWith('http') ? img : null, category: row.category, keywords: [],
      sections, practicalTip: row.practical_tip, source: { ...row, metaDescription: row.meta_description },
    });
  }
  console.log(`[ROTAS] ${remoteArticles.length} artigo(s) novo(s) do Supabase.`);
} catch (err) {
  console.warn(`[AVISO] Não foi possível ler os artigos do Supabase (${err.message}). A construção continua sem eles.`);
}
const articles = [...remoteArticles, ...staticArticles].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

// ─── Manifesto: lido do componente (fonte única, sem o alterar) ───
const manifestoSrc = fs.readFileSync(path.join(root, 'src/components/landing/Manifesto.jsx'), 'utf-8');
const manifesto = [...manifestoSrc.matchAll(/\[\s*'([^']+)',\s*'([^']+)'\s*\]/g)].map((m) => ({ title: m[1], text: m[2] }));

// ─── Bloco <head> de cada rota ───
function headBlock({ title, description, url, image = OG_IMAGE, imageAlt = OG_IMAGE_ALT, type = 'website', noindex = false, jsonld = null, published = null }) {
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="${LOCALE}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    ...(image === OG_IMAGE ? ['<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />'] : []),
    ...(published ? [`<meta property="article:published_time" content="${published}" />`, '<meta property="article:author" content="Alex Seles" />'] : []),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    ...(jsonld ? [`<script type="application/ld+json" id="ld-route" data-url="${esc(url)}">${jsonForHtml(jsonld)}</script>`] : []),
  ];
  return `<!--SEO:START-->\n    ${lines.join('\n    ')}\n    <!--SEO:END-->`;
}
const render = (block) => template.replace(/<!--SEO:START-->[\s\S]*?<!--SEO:END-->/, () => block);
const writeRoute = (routePath, html) => {
  const dir = routePath ? path.join(distDir, routePath) : distDir;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
};
const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

// Página inicial
const homeUrl = absoluteUrl('');
writeRoute('', render(headBlock({
  title: PAGES[''].title, description: PAGES[''].description, url: homeUrl,
  jsonld: {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE, ORGANIZATION, PERSON,
      {
        '@type': 'WebPage', '@id': `${homeUrl}#pagina`, url: homeUrl, name: PAGES[''].title, description: PAGES[''].description,
        inLanguage: LANG, isPartOf: { '@id': WEBSITE['@id'] }, about: { '@id': ORGANIZATION['@id'] },
        primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
      },
      {
        '@type': 'ItemList', '@id': `${homeUrl}#comunidade`, name: 'Grupos da comunidade PM Unlocked',
        description: `Comunidade gratuita com ${COMMUNITY_TOTAL} membros em grupos de WhatsApp e um podcast.`,
        itemListElement: COMMUNITY_GROUPS.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.name, description: `${g.what} ${g.when}.`, url: g.url })),
      },
    ],
  },
})));

// Central de Conhecimento
const blogUrl = absoluteUrl('central-de-conhecimento');
writeRoute('central-de-conhecimento', render(headBlock({
  title: PAGES['central-de-conhecimento'].title, description: PAGES['central-de-conhecimento'].description, url: blogUrl,
  jsonld: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage', '@id': `${blogUrl}#pagina`, url: blogUrl, name: PAGES['central-de-conhecimento'].title,
        description: PAGES['central-de-conhecimento'].description, inLanguage: LANG, isPartOf: { '@id': WEBSITE['@id'] },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`central-de-conhecimento/${a.slug}`), name: a.title })),
        },
      },
      breadcrumb([['Início', homeUrl], ['Artigos', blogUrl]]),
    ],
  },
})));

// Artigos
for (const a of articles) {
  const url = absoluteUrl(`central-de-conhecimento/${a.slug}`);
  writeRoute(`central-de-conhecimento/${a.slug}`, render(headBlock({
    title: articleTitle(a.title, a.seoTitle),
    description: clampDescription(a.description || POSITIONING),
    url, image: a.image || OG_IMAGE, imageAlt: a.image ? a.title : OG_IMAGE_ALT, type: 'article', published: a.date,
    jsonld: articleJsonLd(a.source, a.image),
  })));
}

// Páginas legais
for (const key of ['politica-de-privacidade', 'termos-de-uso']) {
  const url = absoluteUrl(key);
  writeRoute(key, render(headBlock({
    title: PAGES[key].title, description: PAGES[key].description, url,
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', '@id': `${url}#pagina`, url, name: PAGES[key].title, description: PAGES[key].description, inLanguage: LANG, isPartOf: { '@id': WEBSITE['@id'] } },
        breadcrumb([['Início', homeUrl], [PAGES[key].title.split(' | ')[0], url]]),
      ],
    },
  })));
}

// Não indexáveis (HTML próprio com noindex; fora do sitemap)
for (const key of ['chat', 'login']) {
  writeRoute(key, render(headBlock({ title: PAGES[key].title, description: PAGES[key].description, url: absoluteUrl(key), noindex: true })));
}
console.log(`[SEO] HTML gerado: página inicial, artigos (${articles.length}), páginas legais e rotas noindex.`);

// ─── sitemap.xml ───
const mtime = (rel) => {
  try { return fs.statSync(path.join(root, rel)).mtime.toISOString().slice(0, 10); } catch { return today; }
};
const latestArticle = articles.map((a) => a.date).filter(Boolean).sort().pop() || today;
const urls = [
  { loc: homeUrl, lastmod: today, changefreq: PAGES[''].changefreq, priority: PAGES[''].priority },
  { loc: blogUrl, lastmod: latestArticle, changefreq: PAGES['central-de-conhecimento'].changefreq, priority: PAGES['central-de-conhecimento'].priority },
  ...articles.map((a) => ({ loc: absoluteUrl(`central-de-conhecimento/${a.slug}`), lastmod: a.date || today, changefreq: 'monthly', priority: '0.7', image: a.image, imageTitle: a.title })),
  { loc: absoluteUrl('politica-de-privacidade'), lastmod: mtime('src/pages/PoliticaPrivacidade.jsx'), changefreq: 'yearly', priority: '0.3' },
  { loc: absoluteUrl('termos-de-uso'), lastmod: mtime('src/pages/TermosUso.jsx'), changefreq: 'yearly', priority: '0.3' },
];
const seen = new Set();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.filter((u) => !seen.has(u.loc) && seen.add(u.loc)).map((u) => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.image ? `
    <image:image>
      <image:loc>${esc(u.image)}</image:loc>
      <image:title>${esc(u.imageTitle)}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`[SEO] sitemap.xml com ${seen.size} URL(s).`);

// ─── llms.txt e llms-full.txt (llmstxt.org) ───
const articleUrl = (a) => absoluteUrl(`central-de-conhecimento/${a.slug}`);
const plain = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const socialLine = SOCIAL_LINKS.map((s) => `[${s.label}](${s.url})`).join(' · ');

const llms = `# Alex Seles · Comunidade PM Unlocked (${SITE_NAME})

> ${POSITIONING} Comunidade gratuita com ${COMMUNITY_TOTAL} membros em grupos de WhatsApp, um podcast e artigos práticos. Site em português europeu.

Alex Seles é Engenheiro Informático e mestre em Engenharia Informática, com mais de 20 anos de experiência em gestão de projetos de software, certificações PMP®, SAFe® 6 Agilist, ITIL® 4, PSM II™, PSM I™ e PSPO I™, membro do PMI e Embaixador ITIL em Portugal.

## Páginas principais

- [Página inicial](${homeUrl}): comunidade PM Unlocked, sobre Alex Seles, manifesto e artigos recentes.
- [Comunidade](${homeUrl}#comunidade): os grupos gratuitos, o que se publica em cada um e a que horas.
- [Sobre Alex Seles](${homeUrl}#sobre): percurso, certificações e pedido de mentoria.
- [Manifesto](${homeUrl}#manifesto): os oito princípios da comunidade.
- [Central de Conhecimento](${blogUrl}): todos os artigos.
- [Pré-Qualificação de mentoria](${homeUrl}?pre-qualificacao): formulário curto para pedir mentoria individual.

## Artigos

${articles.map((a) => `- [${a.title}](${articleUrl(a)}): ${clampDescription(a.description, 200)}`).join('\n')}

## Comunidade

${COMMUNITY_GROUPS.map((g) => `- [${g.name}](${g.url}): ${g.what} ${g.when}.`).join('\n')}

## Optional

- [Versão completa deste ficheiro](${SITE_URL}/llms-full.txt): conteúdo integral do site e dos artigos.
- [Política de Privacidade](${absoluteUrl('politica-de-privacidade')})
- [Termos de Utilização](${absoluteUrl('termos-de-uso')})
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

const articleFull = (a) => {
  const parts = [`### ${a.title}`, '', `URL: ${articleUrl(a)}`];
  if (a.date) parts.push(`Data: ${a.date}`);
  if (a.category) parts.push(`Categoria: ${a.category}`);
  parts.push('', plain(a.description), '');
  for (const s of a.sections || []) {
    const sub = plain(s.subtitle || s.title);
    if (sub) parts.push(`#### ${sub}`, '');
    const paras = Array.isArray(s.paragraphs) ? s.paragraphs : (typeof s.content === 'string' ? s.content.split('\n') : []);
    for (const p of paras) if (plain(p)) parts.push(plain(p), '');
  }
  if (a.practicalTip) parts.push(`Dica prática: ${plain(a.practicalTip)}`, '');
  return parts.join('\n');
};

const llmsFull = `# Alex Seles · Comunidade PM Unlocked (${SITE_NAME}): conteúdo completo

> ${POSITIONING} Atualizado em ${today}.

## Sobre o site

${PAGES[''].description}

Acreditamos em comunidades envolvidas. RP1 é um acrónimo de Refined Petroleum 1, o combustível usado nos motores dos foguetões espaciais. A nossa missão é desenhar experiências transformadoras que envolvem a comunidade de tecnologia através da educação.

## Sobre Alex Seles

Engenheiro Informático e mestre em Engenharia Informática, com mais de 20 anos de experiência em gestão de projetos em equipas multifuncionais em desenvolvimento de software. Experiência nos setores automóvel, telecomunicações, banca e setor público. Possui as certificações PMP®, SAFe® 6 Agilist, ITIL® 4, PSM II™, PSM I™ e PSPO I™, entre outras.

Especialista em liderar transformações digitais complexas e projetos estratégicos em multinacionais e instituições de referência como Capgemini, TIVIT, ACT Digital, Ford Motor Company, Stellantis, Continental Pneus, MSX International, IEFP, Segurança Social e ARTE.

Em Portugal, é membro do PMI (Project Management Institute) e Embaixador ITIL, e destaca-se também como influenciador digital, com uma rede de mais de 62 mil seguidores no LinkedIn.

Mentoria individual: pedido através do formulário de Pré-Qualificação em ${homeUrl}?pre-qualificacao

## Comunidade PM Unlocked

Comunidade gratuita com ${COMMUNITY_TOTAL} membros. Cada grupo tem um tema e uma hora fixa:

${COMMUNITY_GROUPS.map((g) => `- ${g.name}: ${g.what} Quando: ${g.when}. Ligação: ${g.url}`).join('\n')}

A Beatriz, assistente digital (inteligência artificial) da comunidade, responde a dúvidas em ${SITE_URL}/chat?com=beatriz

## Manifesto: o que nos une

${manifesto.map((m, i) => `${i + 1}. ${m.title}: ${m.text}`).join('\n')}

## Artigos

${articles.map(articleFull).join('\n')}
## Contactos e redes

- Email: ${CONTACT_EMAIL}
- ${socialLine}

## Palavras-chave

${[...KEYWORDS.primary, ...KEYWORDS.secondary].join(', ')}
`;
fs.writeFileSync(path.join(distDir, 'llms.txt'), llms, 'utf-8');
fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFull, 'utf-8');
console.log(`[SEO] llms.txt e llms-full.txt gerados (${articles.length} artigos, ${manifesto.length} princípios).`);
console.log('[SUCESSO] SEO estático pronto no dist.');
