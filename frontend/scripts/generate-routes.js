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
    path: 'transicao-de-carreira',
    title: 'Transição de Carreira para TI | Mentoria Estratégica com Alex Seles',
    description: 'Recomeçar na tecnologia é perfeitamente possível. Encurta a tua rota e migra com segurança com a mentoria individual de Alex Seles.'
  },
  {
    path: 'transicao-estrategica-fundamentos-tecnicos',
    title: 'Transição Estratégica & Fundamentos Técnicos em TI | Alex Seles',
    description: 'Mentoria individual para acelerar a sua transição para TI, dominar Inteligência Artificial aplicada na gestão de projetos e dominar os fundamentos da engenharia de software.'
  },
  {
    path: 'governanca-produto-metodos-entrega',
    title: 'Governação, Produto & Métodos de Entrega em TI | Alex Seles',
    description: 'Mentoria individual em tecnologia com Alex Seles cobrindo Segurança da Informação, DPO & RGPD/LGPD, Design Thinking e Metodologias Preditivas (Waterfall) e Ágeis (Scrum & Kanban).'
  },
  {
    path: 'linkedin-marca-pessoal-ats',
    title: 'Transforme o LinkedIn num Íman para Recrutadores e Tenha o Currículo Aprovado em ATS | Alex Seles',
    description: 'Transforme o seu perfil do LinkedIn num íman para recrutadores e crie um currículo calibrado para superar os filtros automatizados de IA dos sistemas ATS.'
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
    path: 'central-de-conhecimento/artigo-7134-migrando-de-carreira-em-software-dicas-para-um-sucesso-estrategico',
    title: 'Migrando de Carreira em Software: Dicas para um Sucesso Estratégico! | Alex Seles',
    description: 'Dicas práticas e estratégicas para profissionais que desejam migrar para o desenvolvimento de software e tecnologia com segurança, método e aceleração por mentoria.'
  },
  {
    path: 'contato',
    title: 'Contacto & Agendamento de Mentoria | Alex Seles',
    description: 'Agende a sua sessão individual de diagnóstico de carreira com Alex Seles. Transição para tecnologia, liderança executiva em TI e aceleração profissional.'
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
