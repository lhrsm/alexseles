# www.alexseles.online

Site de Alex Seles e da comunidade PM Unlocked (RP1 Academy). Frontend React + Vite + Tailwind em `frontend/`, publicado no Vercel a cada push para o GitHub. Tudo em português europeu.

## Executar

```bash
cd frontend
npm install
npm run dev          # desenvolvimento
npm run build        # construção: vite build + scripts/generate-routes.js (SEO estático)
npm run audit:seo    # auditoria do SEO do site construído (dist/)
```

## Estrutura principal

- `src/pages/Home.jsx` e `src/components/landing/`: página inicial (abertura, comunidade, sobre Alex, manifesto, artigos, depoimentos).
- `src/data/articlesData.js`: artigos escritos no código; os publicados no Supabase (tabela `artigos`) juntam-se a estes.
- `src/pages/chat/`: chat com a Beatriz e a equipa RP1 (`/chat`, `/chat?com=beatriz`).
- `src/config/`: configuração central (SEO, comunidade, redes sociais).

## SEO e ficheiros para IA

Tudo o que o Google e as IAs leem sai já escrito no HTML de cada página na construção (sem depender de JavaScript).

### Onde se edita

| Ficheiro | O que tem |
|---|---|
| `frontend/src/config/seo.js` | Domínio, nome do site, posicionamento, **palavras-chave**, título e descrição de cada página, imagem de partilha (Open Graph) e dados estruturados (Organization, Person, WebSite, artigos). |
| `frontend/src/config/community.js` | Grupos da comunidade (nome, tema, hora, convite). Usado na página inicial, no JSON-LD e no `llms.txt`. |
| `frontend/src/config/social.js` | Redes sociais (rodapé e `sameAs` do JSON-LD). |
| `frontend/src/data/articlesData.js` | Artigos do código. Cada artigo pode ter `seoTitle` quando o título for longo (o `<title>` deve ter até 60 caracteres). |
| `frontend/public/robots.txt` | Regras para robôs de pesquisa e de IA. |
| `frontend/public/og/rp1-academy-og.jpg` | Imagem de partilha (1200×630) usada quando a página não tem imagem própria. |

### Gerado na construção (`frontend/scripts/generate-routes.js`)

Corre depois do `vite build` e lê os artigos do código e os publicados no Supabase (se o Supabase falhar, a construção continua):

- **HTML de cada rota** com `<title>`, `description`, `robots`, `canonical` absoluto, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale` pt_PT, `og:site_name` RP1 Academy), Twitter Card `summary_large_image` e JSON-LD:
  - página inicial: WebSite, Organization (RP1 Academy), Person (Alex Seles), WebPage e ItemList com os grupos da comunidade;
  - `/central-de-conhecimento`: CollectionPage com a lista de artigos e BreadcrumbList;
  - cada artigo: BlogPosting (título, descrição, data, autor, imagem) e BreadcrumbList;
  - páginas legais: WebPage e BreadcrumbList;
  - `/chat` e `/login`: `noindex, nofollow` e sem JSON-LD. `/backoffice` e `/admin` também ficam com `noindex` (definido no React).
  O bloco entre `<!--SEO:START-->` e `<!--SEO:END-->` do `index.html` é o que é substituído; não apague os marcadores.
- **`sitemap.xml`**: só páginas indexáveis (início, artigos, páginas legais), sem repetidos, com a data real de cada artigo e a imagem do artigo (`image:image`).
- **`llms.txt`** (padrão [llmstxt.org](https://llmstxt.org)): H1, resumo em citação, páginas principais, artigos com descrição e grupos da comunidade.
- **`llms-full.txt`**: conteúdo completo em Markdown (sobre o site, sobre Alex, comunidade, os 8 princípios do manifesto, texto integral dos artigos, contactos, palavras-chave). Os princípios são lidos de `src/components/landing/Manifesto.jsx`.

Como são gerados a cada construção, estes ficheiros nunca ficam desatualizados: não os edite à mão em `dist/`, nem os volte a pôr em `public/`.

No React, `src/components/seo/MetaTags.jsx` mantém os mesmos valores ao navegar entre páginas, e `JsonLd.jsx` só acrescenta o JSON-LD de um artigo quando a página não o trouxe (por exemplo, um artigo publicado no Supabase depois da última construção).

### Palavras-chave do negócio

Definidas em `KEYWORDS` (`src/config/seo.js`) e usadas de forma natural em títulos, descrições e conteúdo (sem repetição forçada; a etiqueta `meta keywords` não é usada, porque o Google a ignora):

- **Primárias:** comunidade de gestão de projetos, PM Unlocked, mentoria de carreira em TI, transição de carreira para TI, vagas de project manager em Portugal, Alex Seles.
- **Secundárias:** certificação PMP, PSM I, PSPO e SAFe, CAPM, Scrum Master, Product Owner, PMO, migrar para Portugal, carreira em tecnologia, podcast de carreira, RP1 Academy.

### Títulos e descrições atuais

| Página | Título |
|---|---|
| `/` | PM Unlocked: comunidade de gestão de projetos \| Alex Seles |
| `/central-de-conhecimento` | Artigos: carreira em TI e gestão de projetos \| Alex Seles |
| artigos | título do artigo (ou `seoTitle`) + " \| Alex Seles" quando couber em 60 caracteres |
| `/politica-de-privacidade` | Política de Privacidade (RGPD) \| Alex Seles |
| `/termos-de-uso` | Termos de Utilização \| Alex Seles |

Regras: título até 60 caracteres, descrição até 160, ambos únicos por página.

### Política para robôs de IA (`public/robots.txt`)

- **Permitidos, pesquisa e resposta com citação da fonte:** OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Google-Extended, Applebot-Extended. Trazem visitas e citam o site.
- **Permitidos, treino de modelos:** GPTBot, ClaudeBot, CCBot, meta-externalagent. É uma opção de visibilidade da marca nas respostas das IAs; para bloquear o treino, troque `Allow: /` por `Disallow: /` nesse bloco.
- **Bloqueado:** Bytespider (recolha agressiva sem benefício para o site).
- Todos os robôs ficam fora de `/chat`, `/login`, `/backoffice`, `/admin` e `/dashboard`.

O `ai.txt` não foi criado: não é uma norma reconhecida pelos principais motores nem pelas empresas de IA; a política fica no `robots.txt` e o conteúdo no `llms.txt`.

### Outros ficheiros

- `public/site.webmanifest`: nome, cores e ícones (ligado no `index.html`, com `theme-color`).
- `public/humans.txt` (humanstxt.org) e `public/.well-known/security.txt` + `public/security.txt` (RFC 9116, válido até 2027-10-06; renove o `Expires` antes dessa data).
- `vercel.json` (raiz e `frontend/`): `Content-Type` com UTF-8 para `robots.txt`, `llms.txt`, `llms-full.txt`, `sitemap.xml`, `site.webmanifest` e `security.txt`. A CSP do site aceita o JSON-LD (blocos `application/ld+json` não são executados).

### Como validar

1. `npm run build` e depois `npm run audit:seo` (verifica robots, sitemap, llms, security.txt, manifest e, em cada página, título, descrição, canonical, Open Graph e JSON-LD).
2. Depois do deploy:
   - [Teste de resultados avançados do Google](https://search.google.com/test/rich-results) com a página inicial e um artigo;
   - [Validador Schema.org](https://validator.schema.org/);
   - Google Search Console: enviar `https://www.alexseles.online/sitemap.xml` e inspecionar URLs;
   - pré-visualização de partilha: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
