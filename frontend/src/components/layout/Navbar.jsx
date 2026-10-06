import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

// Navegação principal: só 4 destinos (Hick). A ação "Entrar na comunidade" fica no hero e no fecho, nunca repetida no cabeçalho.
const ITEMS = [
  { label: 'Comunidade', anchor: 'comunidade' },
  { label: 'Sobre Alex', anchor: 'sobre' },
  { label: 'Manifesto', anchor: 'manifesto' },
  { label: 'Artigos', to: '/central-de-conhecimento' },
];
const SPY_IDS = ['comunidade', 'sobre', 'manifesto'];

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Estado visível da navegação: a secção que está no ecrã fica marcada (heurística 1 de Nielsen)
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === 'undefined') { setActive(null); return undefined; }
    const seen = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      const best = [...seen.entries()].sort((a, b) => b[1] - a[1])[0];
      setActive(best && best[1] > 0 ? best[0] : null);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.5, 1] });
    const timer = setTimeout(() => SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }), 0);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [isHome]);

  const goTo = useCallback((e, anchor) => {
    setIsOpen(false);
    if (!isHome) return; // noutra página, o Link leva a /#âncora e a página inicial faz o scroll
    e.preventDefault();
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      el.focus({ preventScroll: true });
    }
    navigate(`/#${anchor}`, { replace: true });
  }, [isHome, navigate]);

  // Menu móvel: foco preso dentro do painel, Esc fecha e devolve o foco ao botão
  useEffect(() => {
    if (!isOpen) return undefined;
    const panel = panelRef.current;
    const focusables = () => [menuButtonRef.current, ...(panel ? panel.querySelectorAll('a, button') : [])].filter(Boolean);
    focusables()[1]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Não mostrar a navegação pública dentro do Backoffice
  if (location.pathname === '/backoffice' || location.pathname === '/admin') return null;

  const isCurrent = (item) => (item.to ? location.pathname.startsWith(item.to) : isHome && active === item.anchor);

  const renderItem = (item, mobile = false) => {
    const current = isCurrent(item);
    const base = mobile
      ? `block rounded-lg px-4 py-3 text-lg font-semibold ${current ? 'text-[#FFB627] bg-white/5' : 'text-[#F4F2EE] hover:bg-white/5'}`
      : `relative inline-flex items-center h-11 px-1 text-base font-medium transition-colors ${current ? 'text-white' : 'text-[#A9AFB8] hover:text-white'}`;
    const underline = !mobile && (
      <span aria-hidden="true" className={`absolute left-1 right-1 bottom-1 h-0.5 rounded-full bg-[#FFB627] transition-opacity ${current ? 'opacity-100' : 'opacity-0'}`} />
    );
    if (item.to) {
      return (
        <Link key={item.label} to={item.to} className={`${base} ${focusRing}`} aria-current={current ? 'page' : undefined}>
          {item.label}{underline}
        </Link>
      );
    }
    return (
      <Link key={item.label} to={`/#${item.anchor}`} onClick={(e) => goTo(e, item.anchor)}
        className={`${base} ${focusRing}`} aria-current={current ? 'location' : undefined}>
        {item.label}{underline}
      </Link>
    );
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b bg-[#0C0E12] transition-colors ${scrolled ? 'border-white/10' : 'border-transparent'}`}>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-[#FFB627] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#0C0E12]">
        Saltar para o conteúdo
      </a>
      <div className="mx-auto flex h-20 w-full max-w-[80rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link to="/" className={`flex items-center rounded ${focusRing}`} aria-label="RP1 Academy, página inicial">
          <img src={logoImg} alt="" width="40" height="40" className="h-10 w-auto" />
          <span className="ml-3 hidden font-display text-base font-bold tracking-tight text-white sm:inline">RP1 Academy</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navegação principal">
          {ITEMS.map((item) => renderItem(item))}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button ref={menuButtonRef} type="button" onClick={() => setIsOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden ${focusRing}`}
            aria-expanded={isOpen} aria-controls="menu-movel" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="menu-movel" ref={panelRef} className="border-t border-white/10 bg-[#0C0E12] px-4 pb-6 pt-3 md:hidden">
          <nav aria-label="Navegação principal (móvel)" className="space-y-1">
            {ITEMS.map((item) => renderItem(item, true))}
          </nav>
        </div>
      )}
    </header>
  );
};
