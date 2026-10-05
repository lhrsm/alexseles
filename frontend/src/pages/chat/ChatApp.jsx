import './chat.css';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const API = (import.meta.env.VITE_RP1_CHAT_API || 'https://unpurified-braiden-hazy.ngrok-free.dev').replace(/\/$/, '');
// ?com=beatriz abre o chat da comunidade PM Unlocked (link no fim das publicações dos grupos); sem nada, atende a Inês
const ENTRY = new URLSearchParams(window.location.search).get('com') === 'beatriz' ? 'beatriz' : 'ines';
const TOKEN_KEY = ENTRY === 'beatriz' ? 'rp1_chat_token_beatriz' : 'rp1_chat_token';
const WELCOME = ENTRY === 'beatriz'
  ? { title: 'Fale com a Beatriz', text: 'Comunidade PM Unlocked: artigos, certificações, carreira em TI e migrar para Portugal.', team: ['beatriz'],
      consent: 'a Beatriz, assistente digital (inteligência artificial) da comunidade PM Unlocked, que pode passar a conversa a uma pessoa da equipa,' }
  : { title: 'Fale com a equipa da RP1', text: 'Informações, propostas, apoio ou uma reunião. Respondemos em segundos.', team: ['ines', 'joao', 'rita'],
      consent: 'assistentes digitais (inteligência artificial) da RP1, que podem passar a conversa a uma pessoa da equipa,' };
// O domínio gratuito do ngrok mostra uma página de aviso a quem abre no navegador; este cabeçalho evita-a nos pedidos
const HEADERS = { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '1' };

async function call(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API}${path}`, { ...options, headers: { ...HEADERS, ...(options.headers || {}) } });
  } catch {
    throw new Error('Sem ligação. Verifique a internet e tente de novo.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || 'Não foi possível enviar. Tente de novo.');
  return data;
}

const time = (iso) => (iso ? new Date(iso).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }) : '');
const dayLabel = (iso) => {
  const d = new Date(iso);
  const today = new Date();
  const y = new Date(); y.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Hoje';
  if (d.toDateString() === y.toDateString()) return 'Ontem';
  return d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' });
};

function tokenFromUrl() {
  const m = window.location.hash.match(/#\/c\/([A-Za-z0-9_-]{20,64})/);
  return m ? m[1] : null;
}

function readToken() {
  const fromUrl = tokenFromUrl();
  if (fromUrl) return fromUrl;
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function keepToken(token) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch { /* sem armazenamento */ }
  if (tokenFromUrl() !== token) window.history.replaceState(null, '', `#/c/${token}`);
}

/* ─── Ícones (SVG simples, para não depender de bibliotecas) ─── */
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.3 10l12.6 2-12.6 2z" /></svg>
);
const Ticks = ({ read }) => (
  <svg viewBox="0 0 16 11" width="16" height="11" aria-label={read ? 'Lida' : 'Enviada'} className={`ticks${read ? ' is-read' : ''}`}>
    <path fill="currentColor" d="M11.07.65 4.6 7.1 1.94 4.47.53 5.88 4.6 9.94l7.88-7.88zM15.07.65 8.6 7.1l-.71-.7-1.41 1.41 2.12 2.13 7.88-7.88z" />
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M10.6 13.4a1 1 0 0 0 1.4 1.4l4.2-4.2a3 3 0 1 0-4.2-4.2l-1.1 1.1 1.4 1.4 1.1-1.1a1 1 0 1 1 1.4 1.4zM13.4 10.6a1 1 0 0 0-1.4-1.4l-4.2 4.2a3 3 0 1 0 4.2 4.2l1.1-1.1-1.4-1.4-1.1 1.1a1 1 0 1 1-1.4-1.4z" /></svg>
);

function Avatar({ agent, size = 40 }) {
  if (!agent) return <span className="avatar avatar-team" style={{ width: size, height: size }}>RP1</span>;
  return <img className="avatar" src={`/chat/avatars/${agent.avatar}`} alt="" width={size} height={size} />;
}

/* ─── Entrada: aviso de privacidade e nome ─── */
function Welcome({ onStart, busy, error }) {
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  return (
    <main className="welcome">
      <div className="welcome-card">
        <img src="/chat/rp1.svg" alt="RP1" className="welcome-logo" />
        <h1>{WELCOME.title}</h1>
        <p className="muted">{WELCOME.text}</p>
        <div className="team-row" aria-hidden="true">
          {WELCOME.team.map(a => <img key={a} src={`/chat/avatars/${a}.jpg`} alt="" />)}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (agree) onStart(name.trim()); }}>
          <label htmlFor="w-name">Como se chama? <span className="muted">(opcional)</span></label>
          <input id="w-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" maxLength={60} placeholder="O seu nome" />
          <label className="check">
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
            <span>Percebo que vou falar com {WELCOME.consent} e aceito que as mensagens fiquem guardadas para me responderem.</span>
          </label>
          {error && <div className="error" role="alert">{error}</div>}
          <button type="submit" className="btn-start" disabled={!agree || busy}>{busy ? 'A abrir…' : 'Começar conversa'}</button>
        </form>
      </div>
    </main>
  );
}

/* ─── Conversa ─── */
function Chat({ initial, onLost }) {
  const [conv, setConv] = useState(initial);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const token = conv.token;
  const agents = conv.agents || {};
  const owner = conv.owner === 'human' ? null : agents[conv.owner] || agents.ines;
  const typingAgent = conv.typing ? agents[conv.typing] : null;

  const refresh = useCallback(async () => {
    try { setConv(await call(`/api/public/chat/${token}`)); } catch (e) { if (/não encontrada/i.test(e.message)) onLost(); }
  }, [token, onLost]);

  // Atualiza depressa enquanto alguém escreve, devagar no resto do tempo, e para quando a página está escondida
  useEffect(() => {
    const ms = conv.typing ? 1200 : 4000;
    const t = setInterval(() => { if (!document.hidden) refresh(); }, ms);
    return () => clearInterval(t);
  }, [conv.typing, refresh]);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conv.messages.length, conv.typing]);

  const send = async (value) => {
    const body = (value ?? text).trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    setText('');
    // Mostra já a mensagem, como no WhatsApp; o servidor confirma a seguir
    setConv(c => ({ ...c, messages: [...c.messages, { id: `tmp-${Date.now()}`, role: 'visitor', text: body, kind: 'text', at: new Date().toISOString(), pending: true }], quick_replies: [] }));
    try {
      setConv(await call(`/api/public/chat/${token}/messages`, { method: 'POST', body: JSON.stringify({ text: body }) }));
    } catch (e) {
      setError(e.message);
      setText(body);
      setConv(c => ({ ...c, messages: c.messages.filter(m => !m.pending) }));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* sem área de transferência */ }
  };

  // A última mensagem do visitante conta como lida quando alguém da equipa já respondeu depois dela
  const lastReplyAt = useMemo(() => {
    const r = [...conv.messages].reverse().find(m => m.role !== 'visitor' && m.kind !== 'system');
    return r ? r.at : '';
  }, [conv.messages]);

  let lastDay = '';
  return (
    <div className="chat">
      <header className="chat-header">
        <Avatar agent={owner} />
        <div className="who">
          <div className="who-name">{owner ? `${owner.full}` : conv.human_name || 'Equipa RP1'}</div>
          <div className="who-status" aria-live="polite">
            {typingAgent ? 'a escrever…' : owner ? `${owner.role} · assistente digital` : 'pessoa da equipa'}
          </div>
        </div>
        <button type="button" className="icon-btn" onClick={copyLink} title="Copiar o link desta conversa" aria-label="Copiar o link desta conversa">
          <LinkIcon />
        </button>
        {copied && <span className="copied" role="status">Link copiado</span>}
      </header>

      <div className="chat-body" ref={listRef} role="log" aria-label="Mensagens">
        <div className="notice">As mensagens são respondidas por assistentes digitais da RP1. Pode pedir para falar com uma pessoa a qualquer momento.</div>
        {conv.messages.map(m => {
          const day = dayLabel(m.at);
          const showDay = day !== lastDay;
          lastDay = day;
          const a = agents[m.role];
          return (
            <React.Fragment key={m.id}>
              {showDay && <div className="day-pill">{day}</div>}
              {m.kind === 'system' ? (
                <div className="system-pill">{m.text}</div>
              ) : (
                <div className={`row ${m.role === 'visitor' ? 'out' : 'in'}`}>
                  <div className={`bubble ${m.role === 'visitor' ? 'bubble-out' : 'bubble-in'}`}>
                    {m.role !== 'visitor' && <div className={`sender sender-${m.role}`}>{a ? a.name : conv.human_name || 'Equipa'}</div>}
                    <span className="text">{m.text}</span>
                    <span className="meta">
                      {time(m.at)}
                      {m.role === 'visitor' && <Ticks read={!m.pending && lastReplyAt > m.at} />}
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        {typingAgent && (
          <div className="row in">
            <div className="bubble bubble-in typing" aria-label={`${typingAgent.name} está a escrever`}>
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
      </div>

      {conv.quick_replies?.length > 0 && (
        <div className="quick" role="group" aria-label="Respostas rápidas">
          {conv.quick_replies.map(q => <button key={q} type="button" onClick={() => send(q)} disabled={sending}>{q}</button>)}
        </div>
      )}
      {error && <div className="send-error" role="alert">{error}</div>}
      <form className="composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <textarea ref={inputRef} rows={1} value={text} placeholder="Escreva uma mensagem" aria-label="Mensagem" maxLength={1000}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <button type="submit" className="send" disabled={!text.trim() || sending} aria-label="Enviar"><SendIcon /></button>
      </form>
    </div>
  );
}

/** Chat da RP1 com o aspeto do WhatsApp, em /chat (sem o menu e o rodapé do site). */
export function ChatApp() {
  const [conv, setConv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const lose = useCallback(() => {
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* sem armazenamento */ }
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setConv(null);
  }, []);

  useEffect(() => {
    document.title = WELCOME.title;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    const token = readToken();
    if (!token) { setLoading(false); return; }
    call(`/api/public/chat/${token}`).then(c => { setConv(c); keepToken(c.token); }).catch(lose).finally(() => setLoading(false));
  }, [lose]);

  const start = async (name) => {
    setBusy(true);
    setError(null);
    try {
      const c = await call('/api/public/chat/start', { method: 'POST', body: JSON.stringify({ name, consent: true, agent: ENTRY }) });
      keepToken(c.token);
      setConv(c);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="wa">
      {loading ? <main className="welcome"><div className="spinner" aria-label="A carregar" /></main>
        : !conv ? <Welcome onStart={start} busy={busy} error={error} />
        : <Chat initial={conv} onLost={lose} />}
    </div>
  );
}
