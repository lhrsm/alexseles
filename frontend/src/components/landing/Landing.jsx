import React from 'react';
import { SOCIAL_LINKS } from '../../config/social';
import { SOCIAL_ICONS } from '../ui/SocialIcons';
import { COMMUNITY_GROUPS, COMMUNITY_TOTAL } from '../../config/community';
import heroPng from '../../assets/landing/introduction-visual.png';
import heroWebp from '../../assets/landing/introduction-visual.webp';
import aboutPng from '../../assets/landing/about-visual.png';
import aboutWebp from '../../assets/landing/about-visual.webp';
import closingPng from '../../assets/landing/contact-visual.png';
import alexJpg from '../../assets/landing/alex-seles.jpg';
import alexWebp from '../../assets/landing/alex-seles.webp';
import closingWebp from '../../assets/landing/contact-visual.webp';

/*
 * Página inicial: comunidade PM Unlocked e Alex Seles.
 * Uma ação principal por secção, texto do corpo a 18px em computador (17px no telemóvel), linhas até ~65 caracteres,
 * botões com 48px, foco visível, contraste AA e sem animações obrigatórias.
 */

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]';
const focusRingLight = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5300]';
const btnBase = 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 text-[1.0625rem] font-semibold transition-colors';
const btnPrimary = `${btnBase} bg-[#FFB627] text-[#0C0E12] hover:bg-[#FFC857] ${focusRing}`;
const btnGhostDark = `${btnBase} border border-white/30 text-[#F4F2EE] hover:border-white/60 hover:bg-white/5 ${focusRing}`;
const btnDarkOnLight = `${btnBase} bg-[#14161A] text-white hover:bg-black ${focusRingLight}`;

// Escala comum: contentor até 1280px, secções com 6rem (telemóvel) a 10rem (computador) de espaço vertical
const container = 'mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-10';
const sectionY = 'py-24 md:py-32 lg:py-40';
const h2 = 'font-display text-[clamp(2.25rem,4.6vw,4rem)] font-extrabold leading-[1.08] tracking-tight';
const eyebrow = 'mb-4 text-[0.9375rem] font-semibold uppercase tracking-[0.14em]';
const body = 'text-[1.0625rem] leading-[1.6] md:text-lg';

// Os grupos vêm de config/community.js (mesma fonte do JSON-LD e do llms.txt); só os de WhatsApp têm dor (pain)
export { COMMUNITY_TOTAL };
const CARDS = COMMUNITY_GROUPS.filter((g) => g.pain);
// Outros canais, do mais útil para quem chega (o podcast) ao menos
// Ícones na cor de cada marca (reconhecimento imediato); o nome fica escuro para manter o contraste do texto
const CHANNEL_COLORS = { spotify: '#1DB954', youtube: '#FF0000', instagram: '#E4405F', linkedin: '#0A66C2', facebook: '#1877F2' };
const CHANNELS = Object.keys(CHANNEL_COLORS).map((id) => SOCIAL_LINKS.find((s) => s.id === id))
  .map((s) => ({ ...s, color: CHANNEL_COLORS[s.id], label: s.id === 'spotify' ? 'Podcast no Spotify' : s.label }));

const Picture = ({ webp, png, alt, size, width, height, eager = false, className = '', frameClassName = '' }) => (
  <picture className={`block ${frameClassName}`}>
    <source srcSet={webp} type="image/webp" />
    <img src={png} alt={alt} width={width || size} height={height || size} loading={eager ? 'eager' : 'lazy'} decoding="async"
      fetchPriority={eager ? 'high' : undefined} className={className} />
  </picture>
);

/* 1. Hero: uma frase, duas ações e a prova social. O <title> e a meta descrição continuam a descrever o site para o Google. */
export const LandingHero = ({ onPreQual }) => (
  <section id="inicio" className="overflow-hidden bg-[#0C0E12] pt-20 text-[#F4F2EE]" aria-labelledby="hero-titulo">
    {/* Em computador: H1 em 2 linhas fixas e o topo do capacete alinhado com o topo do H1 (classes hero-grid/hero-art no index.css) */}
    <div className={`${container} hero-grid grid gap-12 pt-12 md:pt-16 lg:pt-24`}>
      <div className="lg:pb-24">
        <h1 id="hero-titulo" className="hero-title font-display font-extrabold leading-[1.05] tracking-tight text-[#FFB627]">
          <span className="lg:block lg:whitespace-nowrap">A sua próxima</span>{' '}
          <span className="lg:block lg:whitespace-nowrap">experiência interativa</span>
        </h1>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#grupos" className={btnPrimary}>Entrar na comunidade</a>
          <button type="button" onClick={onPreQual} className={btnGhostDark}>Pedir mentoria</button>
        </div>
        <p className="mt-6 text-base text-[#A9AFB8] md:text-[1.0625rem]">
          <strong className="font-semibold text-[#F4F2EE]">Mais de 400 membros</strong> em 5 grupos. Gratuito.
        </p>
      </div>
      <div className="hero-art flex justify-center self-end lg:justify-end">
        <Picture webp={heroWebp} png={heroPng} size={511} eager
          alt="Pessoa com capacete de astronauta, de perfil, a olhar em frente"
          frameClassName="w-full max-w-[511px] lg:max-w-none" className="block h-auto w-full" />
      </div>
    </div>
  </section>
);

/*
 * 2. Comunidade: título, subtítulo e os 5 grupos + podcast numa só secção.
 * O texto assenta no fundo da coluna, junto aos cartões; a imagem assenta numa linha de chão para não flutuar.
 * Os botões "Entrar na comunidade" levam a #grupos (título + cartões); o menu e o scroll-spy usam #comunidade.
 */
export const CommunitySection = () => (
  <section id="comunidade" tabIndex={-1} className={`scroll-mt-20 bg-[#F5F3EF] ${sectionY} text-[#14161A] outline-none`} aria-labelledby="comunidade-titulo">
    <div className={container}>
      <div className="grid gap-12 md:grid-cols-2 md:items-end lg:gap-20">
        <div className="flex justify-center border-b border-[#D9D4CA] md:justify-start">
          <Picture webp={aboutWebp} png={aboutPng} size={511}
            alt="Pessoa de perfil a segurar um capacete de astronauta com as duas mãos"
            frameClassName="w-full max-w-[360px] md:max-w-[640px]" className="block h-auto w-full" />
        </div>
        <div id="grupos" tabIndex={-1} className="scroll-mt-24 outline-none md:pb-4">
          <p className={`${eyebrow} text-[#8A5300]`}>Comunidade</p>
          <h2 id="comunidade-titulo" className={h2}>Acreditamos em comunidades envolvidas</h2>
          <p className={`mt-6 max-w-[65ch] text-[#4A5059] ${body}`}>
            <strong className="font-semibold text-[#14161A]">Escolha o grupo do seu momento.</strong>{' '}
            Cada grupo tem um tema e uma hora fixa. Pode entrar e sair quando quiser.
          </p>
        </div>
      </div>

      {/* 5 grupos em 3 + 2 centrados (grelha de 6 colunas, cada cartão ocupa 2) */}
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-6 lg:gap-8" role="list" aria-label="Grupos de WhatsApp da comunidade">
        {CARDS.map((c) => (
          <li key={c.name} style={{ containerType: 'inline-size' }} className="flex flex-col rounded-3xl border border-[#E2DED6] bg-white p-8 lg:col-span-2 lg:p-9 lg:[&:nth-child(4)]:col-start-2">
            <h3 className="font-display text-[clamp(1.25rem,9cqi,1.75rem)] font-bold leading-tight tracking-tight">{c.pain}</h3>
            <p className="mt-3 flex-1 text-base leading-[1.6] text-[#4A5059]">
              No grupo <strong className="font-semibold text-[#14161A]">{c.name}</strong>, {c.lead}
            </p>
            <a href={c.url} target="_blank" rel="noopener noreferrer"
              className={`mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-[#15803D] px-6 text-base font-semibold text-[#15803D] transition-colors hover:bg-[#15803D] hover:text-white ${focusRingLight}`}>
              {SOCIAL_ICONS.whatsapp}{c.action} <span className="sr-only">{c.name} (abre {c.where} numa nova janela)</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Ação secundária: os mesmos conteúdos noutros canais, com ícone e nome (o logótipo sozinho não chega) */}
      <div className="mt-12 flex flex-col gap-4 border-t border-[#D9D4CA] pt-10 md:mt-16 md:flex-row md:items-center md:gap-8">
        <p id="canais-titulo" className="text-base font-semibold text-[#14161A] md:shrink-0">Acompanhe também em</p>
        <ul className="flex flex-wrap gap-3" role="list" aria-labelledby="canais-titulo">
          {CHANNELS.map((ch) => (
            <li key={ch.id}>
              <a href={ch.url} target="_blank" rel="noopener noreferrer"
                style={{ '--brand': ch.color }}
                className={`inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#D9D4CA] bg-white px-5 text-base font-semibold text-[#14161A] transition-colors hover:border-[var(--brand)] ${focusRingLight}`}>
                <span className="inline-flex text-[var(--brand)]">{SOCIAL_ICONS[ch.id]}</span>{ch.label}<span className="sr-only"> (abre numa nova janela)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* 3. Sobre Alex (texto do perfil que já estava no site) */
export const AboutAlex = ({ onPreQual }) => (
  <section id="sobre" tabIndex={-1} className={`scroll-mt-20 bg-white ${sectionY} text-[#14161A] outline-none`} aria-labelledby="sobre-titulo">
    <span id="sobre-alex" aria-hidden="true" />
    <div className={`${container} grid items-center gap-14 md:grid-cols-2 lg:gap-20`}>
      <div className="order-2 flex justify-center md:order-1 md:justify-start">
        <Picture webp={alexWebp} png={alexJpg} width={720} height={900} alt="Alex Seles"
          frameClassName="w-full max-w-[560px]" className="block aspect-[4/5] h-auto w-full rounded-3xl object-cover object-top" />
      </div>
      <div className="order-1 md:order-2">
        <p className={`${eyebrow} text-[#8A5300]`}>Sobre Alex Seles</p>
        <h2 id="sobre-titulo" className={h2}>Mais de 20 anos a liderar projetos de tecnologia.</h2>
        <div className={`mt-8 max-w-[65ch] space-y-5 text-[#4A5059] ${body}`}>
          <p>
            Engenheiro Informático e mestre em Engenharia Informática, com mais de 20 anos de experiência em gestão de projetos em
            equipas multifuncionais em desenvolvimento de software. Experiência nos setores automóvel, telecomunicações, banca e setor
            público. Possui as certificações PMP®, SAFe® 6 Agilist, ITIL® 4, PSM II™, PSM I™ e PSPO I™, entre outras.
          </p>
          <p>
            Especialista em liderar transformações digitais complexas e projetos estratégicos em multinacionais e instituições de
            referência como Capgemini, TIVIT, ACT Digital, Ford Motor Company, Stellantis, Continental Pneus, MSX International, IEFP,
            Segurança Social e ARTE.
          </p>
          <p>
            Em Portugal, é membro do PMI (<span lang="en">Project Management Institute</span>) e Embaixador ITIL, e destaca-se também
            como influenciador digital, com uma rede de mais de 62 mil seguidores no LinkedIn.
          </p>
        </div>
        <div className="mt-10">
          <button type="button" onClick={onPreQual} className={btnDarkOnLight}>Pedir mentoria</button>
          <p className="mt-3 text-base text-[#4A5059]">Um formulário curto. Sem compromisso.</p>
        </div>
      </div>
    </div>
  </section>
);

/* 4. Manifesto: interativo, em components/landing/Manifesto.jsx */
export { Manifesto } from './Manifesto';

/* 7. Fecho (a Beatriz tem o seu próprio botão fixo no canto) */
export const ClosingCta = ({ onPreQual }) => (
  <section id="fecho" className="bg-[#15181E] text-[#F4F2EE]" aria-labelledby="fecho-titulo">
    <div className={`${container} grid gap-12 pt-24 md:grid-cols-2 md:items-end md:pt-32 lg:pt-40`}>
      <div className="md:self-center md:pb-32 lg:pb-40">
        <h2 id="fecho-titulo" className={h2}>O próximo passo é pequeno.</h2>
        <p className={`mt-6 max-w-[65ch] text-[#A9AFB8] ${body}`}>Entre num grupo e faça a primeira pergunta.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#grupos" className={btnPrimary}>Entrar na comunidade</a>
          <button type="button" onClick={onPreQual} className={btnGhostDark}>Pedir mentoria</button>
        </div>
      </div>
      <div className="flex justify-center md:justify-end md:self-end">
        <Picture webp={closingWebp} png={closingPng} size={500}
          alt="Pessoa com fato e capacete de astronauta, de frente, num fundo escuro"
          frameClassName="w-full max-w-[640px]" className="block h-auto w-full" />
      </div>
    </div>
  </section>
);
