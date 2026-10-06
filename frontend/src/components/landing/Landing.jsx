import React from 'react';
import { PODCAST_URL } from '../../config/social';
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

export const COMMUNITY_TOTAL = 'mais de 400';

const CARDS = [
  { name: 'PM Unlocked Hub', what: 'Gestão de projetos no dia a dia: métodos, liderança e boas práticas.', when: 'Seg. a sex., 10h', url: 'https://chat.whatsapp.com/HVCrMHci5hm6IO5SoC3y6S', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Vagas PM', what: 'Vagas de Project Manager, PMO, Scrum Master e Product Owner em Portugal e remoto.', when: 'Seg. a sex., 11h30 e 16h30', url: 'https://chat.whatsapp.com/I5SbQ22zGQvCfBuNEUM9gM', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Certificação PM', what: 'Dicas para preparar os exames PSM, PSPO, CAPM, PMP e SAFe.', when: 'Seg. a sex., 13h', url: 'https://chat.whatsapp.com/EzMny9VBJPdKdjIRxF8Jfk', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Migrar para Portugal', what: 'Vistos, arrendamento e a vida em Portugal, sempre com fontes.', when: 'Seg. a sex., 15h', url: 'https://chat.whatsapp.com/HF5xGDnuBtl0aTGCWPA2JC', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Career Tips', what: 'Para quem quer mudar para TI: dicas práticas e o que esperar do caminho.', when: 'Seg. a sex., 18h', url: 'https://chat.whatsapp.com/LlIthRC5cnmDLkNxDwjJw5', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Podcast PM Unlocked', what: 'Episódios de até 3 minutos sobre carreira e migrar para Portugal.', when: 'Novos episódios durante a semana', url: PODCAST_URL, action: 'Ouvir no Spotify', where: 'o Spotify' },
];

const MANIFESTO = [
  ['Participar', 'Quem aparece, pergunta e responde é lembrado quando surgem oportunidades.'],
  ['Partilhar', 'Uma vaga, um link ou um erro que já cometeu podem poupar meses a outra pessoa.'],
  ['Ajudar primeiro', 'Ajudar sem esperar retorno é a forma mais rápida de construir uma rede que responde.'],
  ['Aprender em público', 'Mostrar o que está a estudar cria confiança e atrai quem está no mesmo caminho.'],
  ['Conexões genuínas', 'Dez relações reais valem mais do que mil contactos que não se lembram de si.'],
  ['Celebrar conquistas', 'Uma certificação, uma entrevista, um primeiro emprego: tudo conta e merece ser dito.'],
  ['Consistência', 'Um pouco todos os dias vence o esforço intenso de uma semana só.'],
  ['Ética', 'Respeito, verdade e confidencialidade, dentro e fora do grupo.'],
];

const Picture = ({ webp, png, alt, size, width, height, eager = false, className = '', frameClassName = '' }) => (
  <picture className={`block ${frameClassName}`}>
    <source srcSet={webp} type="image/webp" />
    <img src={png} alt={alt} width={width || size} height={height || size} loading={eager ? 'eager' : 'lazy'} decoding="async"
      fetchpriority={eager ? 'high' : undefined} className={className} />
  </picture>
);

const ExternalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
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
          <a href="#comunidade" className={btnPrimary}>Entrar na comunidade</a>
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

/* 1b. Propósito (RP1) */
export const Belief = () => (
  <section className="bg-white pt-24 text-[#14161A] md:pt-32 lg:pt-40" aria-labelledby="proposito-titulo">
    <div className={`${container} grid gap-12 md:grid-cols-2 md:items-end lg:gap-20`}>
      <div className="order-2 flex justify-center md:order-1 md:justify-start md:self-end">
        <Picture webp={aboutWebp} png={aboutPng} size={511}
          alt="Pessoa de perfil a segurar um capacete de astronauta com as duas mãos"
          frameClassName="w-full max-w-[640px]" className="block h-auto w-full" />
      </div>
      <div className="order-1 md:order-2 md:self-center md:pb-32 lg:pb-40">
        <h2 id="proposito-titulo" className={h2}>Acreditamos em comunidades envolvidas</h2>
        <p className={`mt-8 max-w-[65ch] text-[#4A5059] ${body}`}>
          RP1 é um acrónimo de <span lang="en">Refined Petroleum 1</span>, o combustível usado nos motores dos foguetões espaciais.
          A nossa missão é desenhar experiências transformadoras que envolvem a comunidade de tecnologia através da educação.
        </p>
      </div>
    </div>
  </section>
);

/* 2. Comunidade: 5 grupos e o podcast, todos no mesmo formato (reconhecer em vez de lembrar) */
export const CommunitySection = () => (
  <section id="comunidade" tabIndex={-1} className={`scroll-mt-20 bg-[#F5F3EF] ${sectionY} text-[#14161A] outline-none`} aria-labelledby="comunidade-titulo">
    <div className={container}>
      <div className="max-w-3xl">
        <p className={`${eyebrow} text-[#8A5300]`}>Comunidade</p>
        <h2 id="comunidade-titulo" className={h2}>Escolha o grupo do seu momento.</h2>
        <p className={`mt-6 max-w-[65ch] text-[#4A5059] ${body}`}>Cada grupo tem um tema e uma hora fixa. Pode entrar e sair quando quiser.</p>
      </div>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" role="list">
        {CARDS.map((c) => (
          <li key={c.name} className="flex flex-col rounded-3xl border border-[#E2DED6] bg-white p-8 lg:p-9">
            <h3 className="font-display text-[1.5rem] font-bold leading-tight">{c.name}</h3>
            <p className={`mt-3 flex-1 text-[#4A5059] ${body}`}>{c.what}</p>
            <p className="mt-6 text-base font-medium text-[#4A5059]">
              <span className="sr-only">{c.url === PODCAST_URL ? 'Ritmo: ' : 'Publicações: '}</span>{c.when}
            </p>
            <a href={c.url} target="_blank" rel="noopener noreferrer"
              className={`mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#14161A] px-6 text-base font-semibold text-[#14161A] transition-colors hover:bg-[#14161A] hover:text-white ${focusRingLight}`}>
              {c.action} <span className="sr-only">{c.name} (abre {c.where} numa nova janela)</span><ExternalIcon />
            </a>
          </li>
        ))}
      </ul>
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

/* 4. Manifesto */
export const Manifesto = () => (
  <section id="manifesto" tabIndex={-1} className={`scroll-mt-20 bg-[#0C0E12] ${sectionY} text-[#F4F2EE] outline-none`} aria-labelledby="manifesto-titulo">
    <div className={container}>
      <p className={`${eyebrow} text-[#FFB627]`}>Manifesto</p>
      <h2 id="manifesto-titulo" className={`max-w-4xl ${h2}`}>O que nos une na PM Unlocked.</h2>
      <ol className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2" role="list">
        {MANIFESTO.map(([title, text], i) => (
          <li key={title} className="flex gap-6 border-t border-white/10 pt-8">
            <span aria-hidden="true" className="font-display text-4xl font-extrabold tabular-nums text-[#FFB627]">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-2xl font-bold"><span className="sr-only">{i + 1}. </span>{title}</h3>
              <p className={`mt-3 max-w-[55ch] text-[#A9AFB8] ${body}`}>{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* 7. Fecho (a Beatriz tem o seu próprio botão fixo no canto) */
export const ClosingCta = ({ onPreQual }) => (
  <section id="fecho" className="bg-[#15181E] text-[#F4F2EE]" aria-labelledby="fecho-titulo">
    <div className={`${container} grid gap-12 pt-24 md:grid-cols-2 md:items-end md:pt-32 lg:pt-40`}>
      <div className="md:self-center md:pb-32 lg:pb-40">
        <h2 id="fecho-titulo" className={h2}>O próximo passo é pequeno.</h2>
        <p className={`mt-6 max-w-[65ch] text-[#A9AFB8] ${body}`}>Entre num grupo e faça a primeira pergunta.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#comunidade" className={btnPrimary}>Entrar na comunidade</a>
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
