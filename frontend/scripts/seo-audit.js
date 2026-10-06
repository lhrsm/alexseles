/**
 * Auditoria de SEO do site construído (corre depois de `npm run build`): `npm run audit:seo`.
 * Verifica o que o Google e as IAs recebem: robots.txt, sitemap.xml, llms.txt, security.txt, humans.txt,
 * site.webmanifest e, em cada HTML pré-gerado, título, descrição, canonical, Open Graph e JSON-LD.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
let pass = 0, warn = 0, fail = 0;
const ok = (m) => { pass += 1; console.log(`[OK]     ${m}`); };
const aviso = (m) => { warn += 1; console.log(`[AVISO]  ${m}`); };
const falha = (m) => { fail += 1; console.log(`[FALHA]  ${m}`); };
const check = (cond, m) => (cond ? ok(m) : falha(m));
const read = (rel) => { const f = path.join(dist, rel); return fs.existsSync(f) ? fs.readFileSync(f, 'utf-8') : null; };

if (!fs.existsSync(dist)) { console.error('Corra primeiro npm run build.'); process.exit(1); }

// robots.txt
const robots = read('robots.txt');
check(!!robots, 'robots.txt presente');
if (robots) {
  check(/Sitemap: https:\/\/www\.alexseles\.online\/sitemap\.xml/.test(robots), 'robots.txt indica o sitemap absoluto');
  for (const p of ['/chat', '/login', '/backoffice', '/admin']) check(robots.includes(`Disallow: ${p}`), `robots.txt bloqueia ${p}`);
}

// sitemap.xml
const sitemap = read('sitemap.xml');
check(!!sitemap, 'sitemap.xml presente');
if (sitemap) {
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  check(locs.length > 0, `sitemap.xml com ${locs.length} URL(s)`);
  check(new Set(locs).size === locs.length, 'sitemap.xml sem URLs repetidas');
  check(locs.every((l) => l.startsWith('https://www.alexseles.online/')), 'sitemap.xml só com URLs absolutas do domínio');
  check(!locs.some((l) => /\/(chat|login|backoffice|admin)(\/|$)/.test(l)), 'sitemap.xml sem páginas noindex');
}

// llms.txt
const llms = read('llms.txt');
const llmsFull = read('llms-full.txt');
check(!!llms && /^# /.test(llms) && /\n> /.test(llms), 'llms.txt com título (H1) e resumo (blockquote)');
check(!!llmsFull && llmsFull.length > 2000, 'llms-full.txt com o conteúdo completo');

// security.txt, humans.txt, manifest
const sec = read('.well-known/security.txt');
const exp = sec && sec.match(/Expires: (\S+)/);
check(!!exp && new Date(exp[1]) > new Date(), 'security.txt com Expires no futuro (RFC 9116)');
if (read('humans.txt')) ok('humans.txt presente'); else aviso('humans.txt em falta');
try { JSON.parse(read('site.webmanifest') || ''); ok('site.webmanifest válido'); } catch { falha('site.webmanifest em falta ou inválido'); }

// HTML de cada rota (as pastas de recursos não têm páginas)
const htmlFiles = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory() && !['assets', 'media', 'og'].includes(e.name)) walk(f);
    else if (e.name === 'index.html') htmlFiles.push(f);
  }
};
walk(dist);
const titles = new Map();
for (const f of htmlFiles) {
  const rel = path.relative(dist, f).replace(/\\/g, '/');
  const h = fs.readFileSync(f, 'utf-8');
  const title = (h.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const desc = (h.match(/name="description" content="(.*?)"/) || [])[1] || '';
  const noindex = /name="robots" content="noindex/.test(h);
  if (!title) { falha(`${rel}: sem <title>`); continue; }
  if (title.length > 60) aviso(`${rel}: título com ${title.length} caracteres (máx. 60)`);
  if (!noindex && (desc.length < 50 || desc.length > 160)) aviso(`${rel}: descrição com ${desc.length} caracteres (50 a 160)`);
  if (!/rel="canonical" href="https:\/\//.test(h)) falha(`${rel}: sem canonical absoluto`);
  if (!['og:title', 'og:description', 'og:image', 'og:url'].every((k) => h.includes(`property="${k}"`))) falha(`${rel}: Open Graph incompleto`);
  if (noindex) continue;
  const ld = h.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  if (!ld) falha(`${rel}: sem JSON-LD`);
  else { try { JSON.parse(ld[1]); } catch { falha(`${rel}: JSON-LD inválido`); } }
  if (titles.has(title)) falha(`${rel}: título igual a ${titles.get(title)}`);
  titles.set(title, rel);
}
ok(`${htmlFiles.length} páginas HTML verificadas`);

console.log(`\nResumo: ${pass} OK, ${warn} aviso(s), ${fail} falha(s).`);
process.exit(fail ? 1 : 0);
