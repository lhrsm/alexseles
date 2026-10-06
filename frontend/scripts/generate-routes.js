/**
 * Script de Pré-geração de Rotas Estáticas para SPAs
 * Garante que caminhos diretos (como /central-de-conhecimento/...) existam
 * fisicamente na pasta dist, eliminando 100% dos erros 404 em qualquer servidor (Vercel, Netlify, Apache, Nginx).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[ERRO] dist/index.html nao encontrado. Execute o build do Vite primeiro.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const routes = [
  {
    path: 'chat',
    title: 'Fale com a equipa da RP1',
    description: 'Converse com a equipa da RP1: informações, propostas, apoio ou uma reunião.'
  },
  {
    path: 'central-de-conhecimento',
    title: 'Central de Conhecimento | Artigos e Orientações Técnicas de Alex Seles',
    description: 'Artigos, tendências de mercado, orientações de liderança ágil, Inteligência Artificial e gestão de carreira em TI produzidos por Alex Seles.'
  },
  {
    path: 'central-de-conhecimento/descubra-o-sentido-da-vida-e-potencialize-sua-carreira-em-ti',
    title: 'Descubra o Sentido da Vida e Potencialize sua Carreira em TI | Alex Seles',
    description: 'O sentido da vida sob a ótica de Viktor Frankl aplicado à tecnologia: por que a carreira não deve ser o único motivo da nossa existência e como o equilíbrio potencializa o crescimento profissional.'
  },
  {
    path: 'central-de-conhecimento/superando-desafios-no-caminho-para-uma-carreira-em-ti',
    title: 'Superando Desafios no Caminho para uma Carreira em TI | Alex Seles',
    description: 'Superar o medo de começar do zero em tecnologia, a barreira do inglês e a falta de experiência prévia para alcançar cargos de gestão em TI.'
  },
  {
    path: 'central-de-conhecimento/psm-pmp-ou-safe-que-certificacao-escolher-em-gestao-de-projetos',
    title: 'PSM, PMP ou SAFe: que certificação escolher para crescer em gestão de projetos? | Alex Seles',
    description: 'PSM I, PSPO, CAPM, PMP ou SAFe? Um guia prático para escolher a certificação certa em gestão de projetos e agilidade, de acordo com a sua experiência e o seu objetivo.'
  },
  {
    path: 'central-de-conhecimento/artigo-3918-bolacha-maldita',
    title: 'Bolacha maldita! | Alex Seles',
    description: 'O insucesso começou com uma simples bolacha que quase arruinou minha carreira: lições reais de processos seletivos e transição corporativa em TI.'
  },
  {
    path: 'politica-de-privacidade',
    title: 'Política de Privacidade | Alex Seles',
    description: 'Termos de privacidade e proteção de dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e LGPD.'
  },
  {
    path: 'termos-de-uso',
    title: 'Termos de Utilização | Alex Seles',
    description: 'Termos e condições gerais de utilização do sítio oficial e serviços de mentoria de Alex Seles.'
  }
];

// Artigos publicados no Supabase (backoffice e Beatriz): página estática com título e descrição próprios.
// A chave é a pública (a mesma que o site usa no navegador). Se o Supabase falhar, a construção continua.
const SUPABASE_URL = (process.env.VITE_SUPABASE_URL || 'https://olpxtxcreseibkiwvlnc.supabase.co').replace(/\/$/, '');
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jG-WP0m35Db9WvRzuCsCBQ_uTJ6oAE9';
const escapeAttr = (s) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const remoteArticles = [];

try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/artigos?select=title,slug,meta_description,created_at&status=eq.Publicado&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = await res.json();
  const known = new Set(routes.map((r) => r.path));
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!row || !row.title || !/^[a-z0-9-]+$/.test(row.slug || '')) continue;
    const routePath = `central-de-conhecimento/${row.slug}`;
    if (known.has(routePath)) continue;
    known.add(routePath);
    remoteArticles.push(row);
    routes.push({
      path: routePath,
      title: escapeAttr(`${row.title} | Alex Seles`),
      description: escapeAttr(row.meta_description || 'Artigo e orientação profissional de Alex Seles.')
    });
  }
  console.log(`[ROTAS] ${remoteArticles.length} artigo(s) novo(s) do Supabase.`);
} catch (err) {
  console.warn(`[AVISO] Não foi possível ler os artigos do Supabase (${err.message}). A construção continua sem eles.`);
}

console.log('[ROTAS] A gerar ficheiros HTML estáticos para cada rota canónica...');

routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Personalizar metatags para SEO
  let customHtml = template;
  if (route.title) {
    customHtml = customHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    customHtml = customHtml.replace(/property="og:title"\s+content=".*?"/, `property="og:title" content="${route.title}"`);
    customHtml = customHtml.replace(/name="twitter:title"\s+content=".*?"/, `name="twitter:title" content="${route.title}"`);
  }
  if (route.description) {
    customHtml = customHtml.replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/, `<meta name="description" content="${route.description}" />`);
    customHtml = customHtml.replace(/property="og:description"\s+content=".*?"/, `property="og:description" content="${route.description}"`);
    customHtml = customHtml.replace(/name="twitter:description"\s+content=".*?"/, `name="twitter:description" content="${route.description}"`);
  }
  const canonicalUrl = `https://www.alexseles.online/${route.path}`;
  customHtml = customHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  customHtml = customHtml.replace(/property="og:url"\s+content=".*?"/, `property="og:url" content="${canonicalUrl}"`);

  const outputPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(outputPath, customHtml, 'utf-8');
  console.log(`[PASS] Rota gerada: dist/${route.path}/index.html`);
});

console.log(`[SUCESSO] ${routes.length} rotas estáticas pré-geradas com sucesso no dist.`);

// Sitemap: acrescenta os artigos do Supabase que ainda não estão lá (só no dist; o ficheiro em public não muda)
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (remoteArticles.length && fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const entries = remoteArticles
    .map((row) => ({ loc: `https://www.alexseles.online/central-de-conhecimento/${row.slug}`, lastmod: String(row.created_at || '').slice(0, 10) }))
    .filter((e) => !sitemap.includes(`<loc>${e.loc}</loc>`))
    .map((e) => `  <url>
    <loc>${e.loc}</loc>
${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>
` : ''}    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`);
  if (entries.length) {
    sitemap = sitemap.replace('</urlset>', `  <!-- Artigos do Supabase -->
${entries.join(String.fromCharCode(10))}
</urlset>`);
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
    console.log(`[PASS] Sitemap: ${entries.length} artigo(s) acrescentado(s).`);
  }
}
