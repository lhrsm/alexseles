import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isEmpresas = location.pathname.startsWith('/para-empresas') || location.pathname.startsWith('/empresas');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSobreClick = (e) => {
    const targetPath = isEmpresas ? '/para-empresas' : '/';
    if (location.pathname === targetPath) {
      e.preventDefault();
      const el = document.getElementById('sobre-alex');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `${targetPath}#sobre-alex`);
      }
    }
  };

  // Não renderizar a Navbar pública dentro do Backoffice
  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 bg-[#0E1620] border-b ${
        scrolled ? 'border-white/10 shadow-lg' : 'border-white/5'
      }`}
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#1A73E8] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Saltar para o conteúdo
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
          
          {/* Logo Oficial Alex Seles */}
          <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">
            <Link 
              to={isEmpresas ? "/para-empresas" : "/"} 
              className="flex items-center group focus:outline-none py-1"
              aria-label="Alex Seles — Mentoria de Carreira & Tecnologia"
            >
              <img 
                src={logoImg} 
                alt="Alex Seles • Mentoria de Carreira & TI" 
                className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
              />
            </Link>

            {/* Dois botões independentes lado a lado no Header (sem ícones, hover com outline azul) */}
            <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
              <Link
                to="/"
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-200 border ${
                  !isEmpresas
                    ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-md shadow-blue-500/20'
                    : 'border-slate-700/80 text-slate-300 hover:border-[#1A73E8] hover:text-white hover:bg-[#1A73E8]/10'
                }`}
              >
                Para Profissionais
              </Link>

              <Link
                to="/para-empresas"
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all duration-200 border ${
                  isEmpresas
                    ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-md shadow-blue-500/20'
                    : 'border-slate-700/80 text-slate-300 hover:border-[#1A73E8] hover:text-white hover:bg-[#1A73E8]/10'
                }`}
              >
                Para Empresas
              </Link>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full" aria-label="Navegação principal">
            
            {/* Link: Sobre Alex Seles */}
            <a
              href={isEmpresas ? "/para-empresas#sobre-alex" : "/#sobre-alex"}
              onClick={handleSobreClick}
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                (location.pathname === '/' || location.pathname === '/para-empresas') && location.hash === '#sobre-alex'
                  ? 'text-white border-[#1A73E8]'
                  : 'text-slate-200 hover:text-white border-transparent'
              }`}
            >
              SOBRE ALEX SELES
            </a>

            {/* Link: Artigos */}
            <Link
              to="/central-de-conhecimento"
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                location.pathname.startsWith('/central-de-conhecimento')
                  ? 'text-white border-[#1A73E8]'
                  : 'text-slate-200 hover:text-white border-transparent'
              }`}
            >
              ARTIGOS
            </Link>
          </nav>

          {/* Ação do Header: Login com hover outline azul */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 border border-[#1A73E8] text-white hover:bg-[#1A73E8] hover:border-[#1A73E8] text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-xs"
            >
              <span>Login</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2 focus:ring-offset-[#0E1620] cursor-pointer"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#121C28] border-b border-white/10 px-4 pt-4 pb-6 space-y-4 animate-in fade-in duration-150">
          
          {/* Dois botões independentes lado a lado no Mobile (sem ícones, hover com outline azul) */}
          <div className="flex items-center gap-2 pb-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                !isEmpresas
                  ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-sm'
                  : 'border-slate-700 text-slate-300 hover:border-[#1A73E8] hover:text-white hover:bg-[#1A73E8]/10'
              }`}
            >
              Para Profissionais
            </Link>
            <Link
              to="/para-empresas"
              onClick={() => setIsOpen(false)}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                isEmpresas
                  ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-sm'
                  : 'border-slate-700 text-slate-300 hover:border-[#1A73E8] hover:text-white hover:bg-[#1A73E8]/10'
              }`}
            >
              Para Empresas
            </Link>
          </div>

          <div className="space-y-1 pt-2 border-t border-white/10">
            <a
              href={isEmpresas ? "/para-empresas#sobre-alex" : "/#sobre-alex"}
              onClick={(e) => {
                setIsOpen(false);
                handleSobreClick(e);
              }}
              className="block px-3 py-2 rounded text-sm font-medium text-slate-200 hover:text-white"
            >
              Sobre Alex Seles
            </a>
            <Link
              to="/central-de-conhecimento"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded text-sm font-medium text-slate-200 hover:text-white"
            >
              Artigos
            </Link>
          </div>
          
          <div className="pt-2 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 border border-[#1A73E8] text-white hover:bg-[#1A73E8] text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              <span>Login</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
