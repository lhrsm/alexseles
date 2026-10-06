import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import avatarWebp from '../../assets/landing/beatriz-avatar.webp';
import avatarJpg from '../../assets/landing/beatriz-avatar.jpg';

const CONSENT_STORAGE_KEY = 'alexseles_cookie_consent_v1';
const HIDDEN_ON = ['/login', '/backoffice', '/admin', '/chat'];
const CHAT_API = (import.meta.env.VITE_RP1_CHAT_API || 'https://unpurified-braiden-hazy.ngrok-free.dev').replace(/\/$/, '');
// Conversa que não existe: qualquer resposta HTTP (404 incluído) prova que o chat está a responder
const PING_URL = `${CHAT_API}/api/public/chat/xxxxxxxxxxxxxxxxxxxxxxxx`;

const hasConsent = () => {
  try { return Boolean(localStorage.getItem(CONSENT_STORAGE_KEY)); } catch { return true; }
};

async function chatOnline() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    await fetch(PING_URL, { headers: { 'ngrok-skip-browser-warning': '1' }, signal: ctrl.signal, cache: 'no-store' });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/*
 * Botão fixo com a foto da Beatriz (assistente digital da comunidade, IA) e o estado do chat:
 * bolinha verde = online, cinzenta = indisponível (o estado também está no rótulo, nunca só na cor).
 * Só aparece depois de o aviso de cookies ter resposta, para nunca o tapar. Abre o chat noutra janela.
 */
export const BeatrizButton = () => {
  const location = useLocation();
  const [ready, setReady] = useState(hasConsent);
  const [online, setOnline] = useState(null); // null = a verificar

  useEffect(() => {
    const onAnswer = () => setReady(true);
    window.addEventListener('cookie-consent-answered', onAnswer);
    return () => window.removeEventListener('cookie-consent-answered', onAnswer);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    let alive = true;
    const check = async () => {
      if (document.hidden) return;
      const ok = await chatOnline();
      if (alive) setOnline(ok);
    };
    check();
    const t = setInterval(check, 60000);
    document.addEventListener('visibilitychange', check);
    return () => { alive = false; clearInterval(t); document.removeEventListener('visibilitychange', check); };
  }, [ready]);

  if (!ready || HIDDEN_ON.some((p) => location.pathname.startsWith(p))) return null;

  const state = online === false ? 'indisponível de momento' : online ? 'online' : 'a verificar ligação';
  const label = `Falar com a Beatriz, assistente digital (IA), ${state} (abre numa nova janela)`;

  return (
    <a
      href="/chat?com=beatriz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed bottom-5 right-5 z-40 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB627]"
    >
      <span className="relative block h-16 w-16 rounded-full border-[3px] border-white bg-white shadow-lg shadow-black/30 transition-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <picture>
          <source srcSet={avatarWebp} type="image/webp" />
          <img src={avatarJpg} alt="" width="58" height="58" className="block h-full w-full rounded-full object-cover" />
        </picture>
        <span
          aria-hidden="true"
          className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${online ? 'bg-[#22C55E] motion-safe:animate-pulse' : 'bg-[#9CA3AF]'}`}
        />
      </span>
      {/* Rótulo em computador, ao passar o rato ou com foco */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[#14161A] px-4 py-2 text-sm font-semibold text-[#F4F2EE] opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none md:block"
      >
        Falar com a Beatriz{online === false ? ' · indisponível' : online ? ' · online' : ''}
      </span>
    </a>
  );
};
