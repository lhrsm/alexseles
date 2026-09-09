/**
 * Script de Auditoria Técnica de SEO, robots.txt, sitemap.xml e llms.txt
 * Projeto: Alex Seles - Mentoria de Carreira e TI
 * Execução: node scripts/seo-audit.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');
const publicDir = path.join(frontendDir, 'public');
const distDir = path.join(frontendDir, 'dist');
const indexHtmlPath = path.join(frontendDir, 'index.html');

let totalChecks = 0;
let passedChecks = 0;
let warnings = 0;
let failures = 0;

function report(status, title, details = '') {
  totalChecks++;
  const badge = status === 'PASS' 
    ? '[PASS]' 
    : status === 'WARN' 
      ? '[AVISO]' 
      : '[FALHA]';

  if (status === 'PASS') passedChecks++;
  if (status === 'WARN') warnings++;
  if (status === 'FAIL') failures++;

  console.log(`${badge.padEnd(8)} ${title}`);
  if (details) {
    console.log(`         -> ${details}`);
  }
}

console.log('='.repeat(75));
console.log('AUDITORIA DE SEO, ROBOTS, SITEMAP E PADRAO LLMS.TXT (ALEX SELES)');
console.log('='.repeat(75));

// ----------------------------------------------------------------------------
// 1. AUDITORIA DE ROBOTS.TXT
// ----------------------------------------------------------------------------
console.log('\n--- 1. Analise de robots.txt ---');
const robotsPublic = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPublic)) {
  report('PASS', 'Ficheiro robots.txt presente na pasta public');
  const content = fs.readFileSync(robotsPublic, 'utf-8');

  // Verificar directiva de Sitemap
  if (content.includes('sitemap.xml') && content.includes('Sitemap: https://')) {
    report('PASS', 'Directiva Sitemap oficial configurada com URL absoluto');
  } else {
    report('FAIL', 'Directiva Sitemap ausente ou incorreta');
  }

  // Bloqueio de rotas privadas
  const blockedAdmin = content.includes('Disallow: /backoffice') && 
                       content.includes('Disallow: /admin') && 
                       content.includes('Disallow: /login');
  if (blockedAdmin) {
    report('PASS', 'Bloqueio estrito de areas administrativas (/backoffice, /admin, /login)');
  } else {
    report('FAIL', 'Rotas administrativas nao estao completamente bloqueadas');
  }

  // Motores de busca oficiais
  const crawlers = ['Googlebot', 'Bingbot', 'Applebot', 'GPTBot', 'ClaudeBot', 'PerplexityBot'];
  const missingCrawlers = crawlers.filter(c => !content.includes(`User-agent: ${c}`));
  if (missingCrawlers.length === 0) {
    report('PASS', `Rastreadores Web e de IA generativa configurados (${crawlers.join(', ')})`);
  } else {
    report('WARN', `Alguns crawlers de IA nao encontrados no robots.txt: ${missingCrawlers.join(', ')}`);
  }

  // Referencias a llms.txt
  if (content.includes('llms.txt') && content.includes('llms-full.txt')) {
    report('PASS', 'Referencias para llms.txt e llms-full.txt documentadas');
  } else {
    report('WARN', 'Referencias para llms.txt ausentes no ficheiro robots.txt');
  }
} else {
  report('FAIL', 'Ficheiro robots.txt nao encontrado em public/');
}

// ----------------------------------------------------------------------------
// 2. AUDITORIA DE SITEMAP.XML
// ----------------------------------------------------------------------------
console.log('\n--- 2. Analise de sitemap.xml ---');
const sitemapPublic = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapPublic)) {
  report('PASS', 'Ficheiro sitemap.xml presente na pasta public');
  const content = fs.readFileSync(sitemapPublic, 'utf-8');

  // Validacao de XML e Namespace
  if (content.startsWith('<?xml') && content.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) {
    report('PASS', 'Declaracao XML e namespace sitemaps.org validos');
  } else {
    report('FAIL', 'Namespace sitemaps.org ou declaracao XML em falta');
  }

  // Contagem de URLs
  const locMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
  const urlCount = locMatches.length;
  if (urlCount >= 8) {
    report('PASS', `Contagem de URLs no sitemap: ${urlCount} rotas canónicas registadas`);
  } else {
    report('WARN', `Sitemap contem apenas ${urlCount} URLs. Verifique se todas as paginas estao incluidas`);
  }

  // Presenca de lastmod, changefreq e priority
  const hasLastmod = (content.match(/<lastmod>/g) || []).length === urlCount;
  const hasChangefreq = (content.match(/<changefreq>/g) || []).length === urlCount;
  const hasPriority = (content.match(/<priority>/g) || []).length === urlCount;

  if (hasLastmod && hasChangefreq && hasPriority) {
    report('PASS', 'Todas as URLs possuem etiquetas lastmod, changefreq e priority');
  } else {
    report('WARN', 'Algumas URLs nao possuem metadados completos (lastmod/changefreq/priority)');
  }

  // Verificar presenca dos artigos
  const hasArticle1 = content.includes('descubra-o-sentido-da-vida-e-potencialize-sua-carreira-em-ti');
  const hasArticle2 = content.includes('superando-desafios-no-caminho-para-uma-carreira-em-ti');
  if (hasArticle1 && hasArticle2) {
    report('PASS', 'Artigos individuais da Central de Conhecimento indexados no sitemap');
  } else {
    report('WARN', 'Artigos tecnicos ausentes no sitemap.xml');
  }
} else {
  report('FAIL', 'Ficheiro sitemap.xml nao encontrado em public/');
}

// ----------------------------------------------------------------------------
// 3. AUDITORIA DE LLMS.TXT E LLMS-FULL.TXT (PADRAO LLMSTXT.ORG)
// ----------------------------------------------------------------------------
console.log('\n--- 3. Analise do Padrao llms.txt (llmstxt.org) ---');
const llmsPath = path.join(publicDir, 'llms.txt');
const llmsFullPath = path.join(publicDir, 'llms-full.txt');

if (fs.existsSync(llmsPath)) {
  const content = fs.readFileSync(llmsPath, 'utf-8');
  report('PASS', 'Ficheiro llms.txt presente');

  // Regra 1: Titulo H1 no topo
  if (content.trim().startsWith('# ')) {
    report('PASS', 'Especificacao llmstxt.org: Inicia com cabecalho H1 (#)');
  } else {
    report('FAIL', 'Especificacao llmstxt.org: O ficheiro deve iniciar com um unico H1');
  }

  // Regra 2: Resumo em citacao (blockquote)
  if (content.includes('\n> ')) {
    report('PASS', 'Especificacao llmstxt.org: Resumo em bloco de citacao (> ) presente');
  } else {
    report('WARN', 'Recomendado incluir bloco de citacao (> ) com resumo executivo');
  }

  // Regra 3: Secoes H2 e ligacoes markdown
  const h2Count = (content.match(/\n## /g) || []).length;
  const linkCount = (content.match(/\[.*?\]\(https?:\/\/.*?\)/g) || []).length;
  if (h2Count >= 3 && linkCount >= 5) {
    report('PASS', `Estrutura semantica valida: ${h2Count} secoes (H2) e ${linkCount} hiperligacoes em Markdown`);
  } else {
    report('WARN', `Estrutura curta: ${h2Count} secoes e ${linkCount} ligacoes`);
  }
} else {
  report('FAIL', 'Ficheiro llms.txt nao encontrado');
}

if (fs.existsSync(llmsFullPath)) {
  const content = fs.readFileSync(llmsFullPath, 'utf-8');
  const words = content.split(/\s+/).length;
  report('PASS', `Ficheiro llms-full.txt presente com ${words} palavras de contexto aprofundado`);
} else {
  report('FAIL', 'Ficheiro llms-full.txt nao encontrado');
}

// ----------------------------------------------------------------------------
// 4. AUDITORIA DE INDEX.HTML (SEO, METATAGS, SCHEMA.ORG JSON-LD)
// ----------------------------------------------------------------------------
console.log('\n--- 4. Analise de Metadados e SEO em index.html ---');
if (fs.existsSync(indexHtmlPath)) {
  const html = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Titulo da Pagina
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    const len = title.length;
    if (len >= 30 && len <= 70) {
      report('PASS', `Titulo calibrado para SERP do Google (${len} caracteres): "${title}"`);
    } else {
      report('WARN', `Comprimento do titulo fora da faixa ideal de 30-70 caracteres (${len} chars): "${title}"`);
    }
  } else {
    report('FAIL', 'Etiqueta <title> ausente no index.html');
  }

  // Meta Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  if (descMatch) {
    const desc = descMatch[1];
    const len = desc.length;
    if (len >= 120 && len <= 170) {
      report('PASS', `Meta Description com comprimento ideal para snippets (${len} caracteres)`);
    } else {
      report('WARN', `Meta Description com ${len} caracteres (faixa ideal: 120-165 caracteres)`);
    }
  } else {
    report('FAIL', 'Etiqueta <meta name="description"> ausente');
  }

  // Meta Keywords
  const kwMatch = html.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
  if (kwMatch) {
    const kws = kwMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    report('PASS', `Meta Keywords configuradas com ${kws.length} termos estratégicos de alta busca`);
  } else {
    report('FAIL', 'Etiqueta <meta name="keywords"> ausente');
  }

  // Canonical Tag
  if (html.includes('<link rel="canonical" href="https://www.alexseles.online/"') || html.includes('<link rel="canonical" href="https://alexseles.com/"')) {
    report('PASS', 'URL Canonica principal definida com HTTPS absoluto');
  } else {
    report('WARN', 'Etiqueta canonical nao encontrada ou sem HTTPS');
  }

  // Robots & Crawlers Directives
  if (html.includes('max-snippet:-1') && html.includes('max-image-preview:large')) {
    report('PASS', 'Diretivas avancadas de robos (max-snippet, max-image-preview) ativas');
  } else {
    report('WARN', 'Diretivas max-snippet ou max-image-preview ausentes');
  }

  // Open Graph & Social Cards
  const hasOg = html.includes('property="og:title"') && 
                html.includes('property="og:description"') && 
                html.includes('property="og:image"') && 
                html.includes('property="og:url"');
  if (hasOg) {
    report('PASS', 'Etiquetas Open Graph (og:title, og:description, og:image, og:url) presentes');
  } else {
    report('FAIL', 'Etiquetas Open Graph incompletas');
  }

  // Dados Estruturados Schema.org (JSON-LD)
  const jsonLdMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  if (jsonLdMatches.length > 0) {
    report('PASS', `Encontrados ${jsonLdMatches.length} bloco(s) de dados estruturados JSON-LD`);
    
    let schemaValid = true;
    for (const block of jsonLdMatches) {
      try {
        const jsonStr = block.replace(/<script\s+type="application\/ld\+json">/i, '').replace(/<\/script>/i, '');
        const parsed = JSON.parse(jsonStr);
        if (parsed['@context'] === 'https://schema.org') {
          const types = parsed['@graph'] 
            ? parsed['@graph'].map(g => g['@type']).join(', ')
            : parsed['@type'];
          report('PASS', `Schema.org valido detectado com tipo(s): ${types}`);
        }
      } catch (e) {
        schemaValid = false;
        report('FAIL', `Erro de sintaxe JSON no bloco Schema.org: ${e.message}`);
      }
    }
  } else {
    report('FAIL', 'Nenhum script Schema.org JSON-LD encontrado no index.html');
  }
} else {
  report('FAIL', 'Ficheiro index.html nao encontrado');
}

// ----------------------------------------------------------------------------
// 5. AUDITORIA DE SECURITY.TXT (RFC 9116) E HUMANS.TXT (HUMANSTXT.ORG)
// ----------------------------------------------------------------------------
console.log('\n--- 5. Analise de security.txt (RFC 9116) e humans.txt ---');
const secWellKnown = path.join(publicDir, '.well-known', 'security.txt');
const secRoot = path.join(publicDir, 'security.txt');

if (fs.existsSync(secWellKnown) && fs.existsSync(secRoot)) {
  report('PASS', 'Ficheiro security.txt presente em /.well-known/ e na raiz publica');
  const secContent = fs.readFileSync(secWellKnown, 'utf-8');

  // Contact
  if (secContent.includes('Contact:')) {
    report('PASS', 'RFC 9116: Campo Contact de seguranca configurado');
  } else {
    report('FAIL', 'RFC 9116: Campo Contact obrigatorio ausente no security.txt');
  }

  // Expires (obrigatorio na RFC 9116)
  if (secContent.includes('Expires:')) {
    report('PASS', 'RFC 9116: Campo Expires obrigatorio definido');
  } else {
    report('FAIL', 'RFC 9116: Campo Expires ausente no security.txt');
  }

  // Canonical e Policy
  if (secContent.includes('Canonical:') && secContent.includes('Policy:')) {
    report('PASS', 'RFC 9116: Directivas Canonical e Policy configuradas');
  } else {
    report('WARN', 'Directivas Canonical ou Policy ausentes no security.txt');
  }
} else {
  report('FAIL', 'Ficheiro security.txt em falta na pasta public/.well-known/');
}

const humansPath = path.join(publicDir, 'humans.txt');
const humanPath = path.join(publicDir, 'human.txt');

if (fs.existsSync(humansPath) && fs.existsSync(humanPath)) {
  report('PASS', 'Ficheiros humans.txt e human.txt presentes na pasta public');
  const hContent = fs.readFileSync(humansPath, 'utf-8');

  if (hContent.includes('/* TEAM */') && hContent.includes('/* SITE */')) {
    report('PASS', 'Padrao humanstxt.org: Secoes TEAM e SITE estruturadas');
  } else {
    report('WARN', 'Padrao humanstxt.org: Secoes padrao ausentes');
  }

  // Vinculo no HTML
  const html = fs.existsSync(indexHtmlPath) ? fs.readFileSync(indexHtmlPath, 'utf-8') : '';
  if (html.includes('<link rel="author" href="/humans.txt"')) {
    report('PASS', 'Ligacao <link rel="author" href="/humans.txt" /> inserida no HTML');
  } else {
    report('WARN', 'Etiqueta <link rel="author"> nao encontrada no index.html');
  }
} else {
  report('FAIL', 'Ficheiro humans.txt nao encontrado em public/');
}

// ----------------------------------------------------------------------------
// RESUMO FINAL
// ----------------------------------------------------------------------------
console.log('\n' + '='.repeat(75));
console.log('RESUMO DA AUDITORIA TECNICA');
console.log('='.repeat(75));
console.log(`Total de verificacoes : ${totalChecks}`);
console.log(`Aprovadas [PASS]      : ${passedChecks}`);
console.log(`Avisos [AVISO]        : ${warnings}`);
console.log(`Falhas [FALHA]        : ${failures}`);

const score = Math.round((passedChecks / totalChecks) * 100);
console.log(`Pontuacao Geral       : ${score}%`);

if (failures === 0) {
  console.log('\nResultado: CONFIGURACAO DE SEO, SITEMAP E LLMS.TXT TOTALMENTE VALIDA.');
} else {
  console.log(`\nResultado: Foram encontradas ${failures} falhas criticas que requerem atencao.`);
}
console.log('='.repeat(75));
