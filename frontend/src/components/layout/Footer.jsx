import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';
import { SOCIAL_LINKS } from '../../config/social';
import { SOCIAL_ICONS } from '../ui/SocialIcons';

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
                  {SOCIAL_ICONS[s.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
