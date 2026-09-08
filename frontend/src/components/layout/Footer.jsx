import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

export const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }

  return (
    <footer className="bg-[#0E1620] text-slate-300 pt-16 pb-12 border-t border-white/10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Rodapé Institucional</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Coluna 1 & 2: Identidade */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none">
              <img 
                src={logoImg} 
                alt="Alex Seles • Mentoria de Carreira & TI" 
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
              />
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Aceleração de carreira, transição estratégica para tecnologia e desenvolvimento de liderança com mais de 20 anos de experiência internacional e visão executiva em Inteligência Artificial.
            </p>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/in/alex-seles/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 text-slate-300 hover:text-white bg-white/5 hover:bg-[#0A66C2] border border-white/10 hover:border-[#0A66C2] rounded-lg transition-all duration-200 group"
                aria-label="Conectar com Alex Seles no LinkedIn"
                title="LinkedIn de Alex Seles"
              >
                <i className="fa-brands fa-linkedin text-base text-[#0A66C2] group-hover:text-white transition-colors" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Coluna 3: Mentoria */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
              Mentoria
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/transicao-de-carreira" className="hover:text-white transition-colors">
                  Transição de Carreira para TI (Trilha Completa)
                </Link>
              </li>

              <li>
                <Link to="/transicao-estrategica-fundamentos-tecnicos" className="hover:text-white transition-colors">
                  Transição Estratégica & Fundamentos Técnicos (Módulo)
                </Link>
              </li>

              <li>
                <Link to="/governanca-produto-metodos-entrega" className="hover:text-white transition-colors">
                  Governação, Produto & Métodos de Entrega (Módulo)
                </Link>
              </li>

              <li>
                <Link to="/linkedin-marca-pessoal-ats" className="hover:text-white transition-colors">
                  Posicionamento no Mercado — Seja Encontrado por Recrutadores (Módulo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Institucional */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  to="/#sobre-alex"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('sobre-alex');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#sobre-alex');
                      }
                    }
                  }}
                  className="hover:text-white transition-colors"
                >
                  Sobre Alex Seles
                </Link>
              </li>
              <li>
                <Link to="/central-de-conhecimento" className="hover:text-white transition-colors">
                  Central de Artigos
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="hover:text-white transition-colors">
                  Termos de Utilização
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 5: Contacto */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-bold text-white tracking-wide uppercase">
              Atendimento
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <Link to="/contato?tipo=sessao" className="block hover:text-white transition-colors">
                Vamos Conversar?
              </Link>
              <Link to="/contato?tipo=sessao" className="block hover:text-white transition-colors">
                Sessão Diagnóstica de Carreira
              </Link>
              <p className="text-xs text-slate-500 pt-1">
                Sessões remotas individuais e corporativas com acompanhamento contínuo.
              </p>
            </div>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-300 font-medium">ALEX SELES • MENTORIA DE CARREIRA & TI © {new Date().getFullYear()}</span>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <Link to="/politica-de-privacidade" className="text-slate-300 hover:text-white underline transition-colors">
              Privacidade
            </Link>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <Link to="/termos-de-uso" className="text-slate-300 hover:text-white underline transition-colors">
              Termos de Utilização
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
