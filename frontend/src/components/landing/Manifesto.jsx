import React, { useEffect, useRef, useState } from 'react';

/*
 * Manifesto da PM Unlocked: um vídeo numa caixa (os 8 pilares com animações de interface) e, por baixo,
 * os mesmos 8 pilares em texto (alternativa ao vídeo, leitores de ecrã e Google).
 * - O vídeo só arranca quando a caixa está no ecrã e pára quando sai; arranca sempre sem som.
 * - Botões: Ativar/Desativar som (narração para pessoas cegas e música; ao ativar recomeça do início) e Pausar/Reproduzir.
 * - Sem legendas: a narração diz exatamente o texto que está escrito em cada cena e na lista por baixo
 *   (WCAG 1.2.2, exceção "alternativa multimédia a texto"; a nota visível por baixo da caixa identifica-o).
 * - Com "reduzir movimento" não arranca sozinho: fica o poster e o botão Reproduzir.
 * - Botão Pausar/Reproduzir sempre disponível (WCAG 2.2.2).
 * O vídeo é gerado a partir de tools/manifesto-video (composição em HTML gravada com o playwright e o ffmpeg).
 */

export const MANIFESTO = [
  ['Participar', 'Quem aparece, pergunta e responde é lembrado quando surgem oportunidades.'],
  ['Partilhar', 'Uma vaga, um link ou um erro que já cometeu podem poupar meses a outra pessoa.'],
  ['Ajudar primeiro', 'Ajudar sem esperar retorno é a forma mais rápida de construir uma rede que responde.'],
  ['Aprender em público', 'Mostrar o que está a estudar cria confiança e atrai quem está no mesmo caminho.'],
  ['Conexões genuínas', 'Dez relações reais valem mais do que mil contactos que não se lembram de si.'],
  ['Celebrar conquistas', 'Uma certificação, uma entrevista, um primeiro emprego: tudo conta e merece ser dito.'],
  ['Consistência', 'Um pouco todos os dias vence o esforço intenso de uma semana só.'],
  ['Ética', 'Respeito, verdade e confidencialidade, dentro e fora do grupo.'],
];

const VIDEO = { mp4: '/media/manifesto.mp4', poster: '/media/manifesto-poster.jpg' };
const SOUND_KEY = 'mf_som';
const pad = (n) => String(n).padStart(2, '0');

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

const readSound = () => { try { return sessionStorage.getItem(SOUND_KEY) === '1'; } catch { return false; } };
const saveSound = (on) => { try { sessionStorage.setItem(SOUND_KEY, on ? '1' : '0'); } catch { /* sem armazenamento */ } };

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l11-6.5z" /></svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
);
const SoundOnIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const SoundOffIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const CONTROL = 'inline-flex h-12 min-w-[3rem] items-center justify-center gap-2 rounded-full border border-white/25 bg-[#0C0E12]/80 px-3.5 text-sm font-semibold text-[#F4F2EE] backdrop-blur-sm transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] sm:px-4';

export const Manifesto = () => {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const boxRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  // Escolha da pessoa: null = automático (sempre sem som); true/false = carregou em Reproduzir/Pausar (e passa a mandar)
  const [choice, setChoice] = useState(null);
  // Som: começa sempre desligado (WCAG 1.4.2); a escolha fica guardada só nesta sessão e só vale depois de um clique
  const [soundOn, setSoundOn] = useState(false);
  const soundPref = useRef(readSound());
  const narratedOnce = useRef(false);
  const [announce, setAnnounce] = useState('');

  // Só está "no ecrã" quando pelo menos 40% da caixa se vê
  useEffect(() => {
    const box = boxRef.current;
    if (!box || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(box);
    return () => io.disconnect();
  }, []);

  // Reproduz só com a caixa visível; automático apenas sem "reduzir movimento", sempre sem som, e se a pessoa não pausou
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const wants = visible && (choice === true || (choice === null && !reduced));
    // O React nem sempre aplica o atributo muted: sem ele, o navegador bloqueia a reprodução automática
    v.defaultMuted = true;
    v.muted = choice === null ? true : !soundOn;
    if (wants) {
      v.play().catch(() => {
        // o navegador recusou o som sem interação: continua sem som
        v.muted = true;
        v.play().catch(() => setPlaying(false));
      });
    } else v.pause();
  }, [visible, choice, reduced, soundOn]);

  const toggle = () => {
    if (!playing && soundPref.current && !soundOn) setSoundOn(true);
    setChoice(!playing);
  };

  // Com som pela primeira vez: recomeça do início para a narração acompanhar as cenas desde a abertura
  const startNarrated = (message) => {
    const v = videoRef.current;
    if (v && !narratedOnce.current) {
      narratedOnce.current = true;
      v.currentTime = 0;
      setAnnounce(message);
    }
    setSoundOn(true);
    saveSound(true);
    soundPref.current = true;
    setChoice(true);
  };

  const toggleSound = () => {
    if (soundOn) {
      setSoundOn(false);
      saveSound(false);
      soundPref.current = false;
      setAnnounce('Som desligado.');
      return;
    }
    startNarrated('A reproduzir com narração desde o início.');
  };

  const listenNarrated = (e) => {
    e.preventDefault();
    narratedOnce.current = false;
    boxRef.current?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
    startNarrated('A reproduzir o manifesto com narração desde o início.');
  };

  const Controls = () => (
    <>
          <button type="button" onClick={toggleSound} aria-pressed={soundOn}
            aria-label={soundOn ? 'Desativar som' : 'Ativar som (narração e música)'} className={CONTROL}>
            {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
            <span className="hidden sm:inline">{soundOn ? 'Desativar som' : 'Ativar som'}</span>
          </button>
          <button type="button" onClick={toggle}
            aria-label={playing ? 'Pausar o vídeo do manifesto' : 'Reproduzir o vídeo do manifesto'} className={CONTROL}>
            {playing ? <PauseIcon /> : <PlayIcon />}
            <span className="hidden sm:inline">{playing ? 'Pausar' : 'Reproduzir'}</span>
          </button>
    </>
  );

  return (
    <section id="manifesto" tabIndex={-1} aria-labelledby="manifesto-titulo"
      className="relative scroll-mt-20 bg-[#0C0E12] text-[#F4F2EE] outline-none">
      <div className="mx-auto w-full max-w-[80rem] px-5 pb-20 pt-8 sm:px-8 md:pb-28 md:pt-10 lg:px-10 lg:pb-32">
        {/* Só uma linha de título, alinhada com a caixa: ao carregar em "Manifesto" no menu, o título e o vídeo cabem inteiros no ecrã */}
        <div className="mf-fit mx-auto">
          <h2 id="manifesto-titulo" className="font-display text-[clamp(1.375rem,2.4vw,2.125rem)] font-extrabold leading-tight tracking-tight lg:whitespace-nowrap">
            Oito princípios da <span className="text-[#FFB627]">PM Unlocked</span> para crescer em comunidade.
          </h2>
          {/* Atalho para quem usa leitor de ecrã ou teclado: aparece ao receber foco */}
          <a href="#manifesto-video" onClick={listenNarrated}
            className="sr-only focus:not-sr-only focus:mt-4 focus:inline-flex focus:h-12 focus:items-center focus:rounded-full focus:bg-[#FFB627] focus:px-5 focus:font-semibold focus:text-[#0C0E12] focus:outline-none">
            Ouvir o manifesto com narração
          </a>
        </div>

        {/* A caixa com o vídeo: toda a largura do conteúdo; em ecrãs muito largos alarga até ~1440px; no telemóvel de margem a margem */}
        <figure id="manifesto-video" ref={boxRef} className="mf-fit relative mx-auto -mx-5 mt-5 sm:mx-auto md:mt-6">
          <div className="mf-box relative aspect-video overflow-hidden rounded-[14px] border border-white/10 bg-[#0C0E12] sm:rounded-[24px]">
            <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover"
              poster={VIDEO.poster} muted loop playsInline preload="metadata"
              aria-label="Vídeo do manifesto: os oito princípios da PM Unlocked, com narração e música (começa sem som). Os mesmos princípios estão escritos a seguir."
              aria-describedby="manifesto-lista"
              onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
              <source src={VIDEO.mp4} type="video/mp4" />
            </video>
            {/* Botões sobre o vídeo (a partir de 640px) */}
            <div className="absolute bottom-5 right-5 hidden gap-2 sm:flex">
              <Controls />
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2 px-5 sm:hidden">
            <Controls />
          </div>
          <figcaption className="mt-3 px-5 text-[0.9375rem] leading-[1.6] text-[#A9AFB8] sm:px-0">
            O vídeo narra os oito princípios escritos abaixo.
          </figcaption>
          <p className="sr-only" role="status" aria-live="polite">{announce}</p>
        </figure>

        {/* Os mesmos 8 pilares em texto */}
        <ol id="manifesto-lista" className="mx-auto mt-14 grid gap-x-14 gap-y-8 md:mt-20 md:grid-cols-2" role="list">
          {MANIFESTO.map(([title, text], i) => (
            <li key={title} className="flex gap-5 border-t border-white/10 pt-6">
              <span aria-hidden="true" className="font-display text-2xl font-extrabold tabular-nums leading-none text-[#FFB627]">{pad(i + 1)}</span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  <span className="sr-only">{i + 1}. </span>{title}
                </h3>
                <p className="mt-2 max-w-[48ch] text-[1.0625rem] leading-[1.6] text-[#A9AFB8]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
