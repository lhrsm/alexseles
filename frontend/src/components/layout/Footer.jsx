import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';
import { SOCIAL_LINKS } from '../../config/social';

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]';

const LINKS = [
  { label: 'Comunidade', to: '/#comunidade' },
  { label: 'Sobre Alex', to: '/#sobre' },
  { label: 'Manifesto', to: '/#manifesto' },
  { label: 'Artigos', to: '/central-de-conhecimento' },
  { label: 'Política de privacidade', to: '/politica-de-privacidade' },
  { label: 'Termos de utilização', to: '/termos-de-uso' },
  { label: 'Área reservada', to: '/login' },
];

// Ícones monocromáticos (SVG simples), coerentes com o resto da página
const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4A21 21 0 0 0 14.3 4c-2.3 0-3.8 1.4-3.8 3.9v2.6H8v3h2.5V21h3Z" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M7.5 9.5c3-1 6.5-.7 9 .8M8 12.5c2.5-.7 5.3-.4 7.4.8M8.6 15.4c2-.5 4-.3 5.7.6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M5 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM3.4 8.6h3.2V20H3.4V8.6Zm5.2 0h3.1v1.6c.4-.8 1.5-1.8 3.2-1.8 3.4 0 4 2.2 4 5.1V20h-3.2v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H8.6V8.6Z" />
    </svg>
  ),
};

export const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/backoffice' || location.pathname === '/admin') return null;

  return (
    <footer className="border-t border-white/10 bg-[#0C0E12] text-[#A9AFB8]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Rodapé</h2>
      <div className="mx-auto w-full max-w-[80rem] px-5 pb-28 pt-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className={`inline-flex items-center rounded ${focusRing}`} aria-label="RP1 Academy, página inicial">
              <img src={logoImg} alt="" width="40" height="40" className="h-10 w-auto" />
              <span className="ml-3 font-display text-base font-bold tracking-tight text-white">RP1 Academy</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">Comunidade PM Unlocked: gestão de projetos, carreira em TI e a vida em Portugal.</p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-10 sm:grid-cols-3" role="list">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={`inline-flex min-h-[44px] items-center text-sm transition-colors hover:text-white ${focusRing}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">© {new Date().getFullYear()} Alex Seles</p>
          <ul className="flex flex-wrap gap-2" role="list" aria-label="Redes sociais">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (abre numa nova janela)`} title={s.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F4F2EE] transition-colors hover:border-[#FFB627] hover:text-[#FFB627] ${focusRing}`}>
                  {ICONS[s.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
