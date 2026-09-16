import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isEmpresas = location.pathname.startsWith('/para-empresas') || location.pathname.startsWith('/empresas');
  const isArtigosActive = location.pathname.startsWith('/central-de-conhecimento');
  const isSobreActive = location.hash === '#sobre-alex';
  const isCasesActive = isEmpresas && location.hash === '#solucoes-empresas';
  const isEmpresasActive = isEmpresas && !isSobreActive && !isArtigosActive && !isCasesActive;
  const isProfissionaisActive = !isEmpresas && !isSobreActive && !isArtigosActive && !isCasesActive;

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

  const handleCasesClick = (e) => {
    if (location.pathname === '/para-empresas') {
      e.preventDefault();
      const el = document.getElementById('solucoes-empresas');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '/para-empresas#solucoes-empresas');
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
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Oficial Alex Seles */}
          <Link 
            to={isEmpresas ? "/para-empresas" : "/"} 
            className="flex items-center group focus:outline-none py-1 flex-shrink-0"
            aria-label="Alex Seles — Mentoria de Carreira & Tecnologia"
          >
            <img 
              src={logoImg} 
              alt="Alex Seles • Mentoria de Carreira & TI" 
              className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
            />
          </Link>

          {/* Navegação Desktop: todos um ao lado do outro, estilo link sem outline, hover azul e selecionado em azul */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full" aria-label="Navegação principal">
            
            {/* Link: Para Profissionais */}
            <Link
              to="/"
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                isProfissionaisActive
                  ? 'text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-200 hover:text-[#1A73E8] border-transparent'
              }`}
            >
              Para Profissionais
            </Link>

            {/* Link: Para Empresas */}
            <Link
              to="/para-empresas"
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                isEmpresasActive
                  ? 'text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-200 hover:text-[#1A73E8] border-transparent'
              }`}
            >
              Para Empresas
            </Link>

            {/* Link: Cases de Sucesso */}
            <Link
              to="/para-empresas#solucoes-empresas"
              onClick={handleCasesClick}
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                isCasesActive
                  ? 'text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-200 hover:text-[#1A73E8] border-transparent'
              }`}
            >
              Cases de Sucesso
            </Link>

            {/* Link: Sobre Alex Seles */}
            <a
              href={isEmpresas ? "/para-empresas#sobre-alex" : "/#sobre-alex"}
              onClick={handleSobreClick}
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                isSobreActive
                  ? 'text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-200 hover:text-[#1A73E8] border-transparent'
              }`}
            >
              Sobre Alex Seles
            </a>

            {/* Link: Artigos */}
            <Link
              to="/central-de-conhecimento"
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                isArtigosActive
                  ? 'text-[#1A73E8] border-[#1A73E8]'
                  : 'text-slate-200 hover:text-[#1A73E8] border-transparent'
              }`}
            >
              Artigos
            </Link>
          </nav>

          {/* Ação do Header: Login */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-[#1A73E8] text-white hover:bg-[#1A73E8] hover:text-white text-xs font-semibold px-4 py-2.5 rounded transition-all"
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
        <div className="md:hidden bg-[#121C28] border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-150">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isProfissionaisActive
                  ? 'text-[#1A73E8] bg-white/5'
                  : 'text-slate-200 hover:text-[#1A73E8]'
              }`}
            >
              Para Profissionais
            </Link>

            <Link
              to="/para-empresas"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isEmpresasActive
                  ? 'text-[#1A73E8] bg-white/5'
                  : 'text-slate-200 hover:text-[#1A73E8]'
              }`}
            >
              Para Empresas
            </Link>

            <Link
              to="/para-empresas#solucoes-empresas"
              onClick={(e) => {
                setIsOpen(false);
                handleCasesClick(e);
              }}
              className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isCasesActive
                  ? 'text-[#1A73E8] bg-white/5'
                  : 'text-slate-200 hover:text-[#1A73E8]'
              }`}
            >
              Cases de Sucesso
            </Link>

            <a
              href={isEmpresas ? "/para-empresas#sobre-alex" : "/#sobre-alex"}
              onClick={(e) => {
                setIsOpen(false);
                handleSobreClick(e);
              }}
              className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isSobreActive
                  ? 'text-[#1A73E8] bg-white/5'
                  : 'text-slate-200 hover:text-[#1A73E8]'
              }`}
            >
              Sobre Alex Seles
            </a>

            <Link
              to="/central-de-conhecimento"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isArtigosActive
                  ? 'text-[#1A73E8] bg-white/5'
                  : 'text-slate-200 hover:text-[#1A73E8]'
              }`}
            >
              Artigos
            </Link>
          </div>
          
          <div className="pt-2 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 border border-[#1A73E8] text-white hover:bg-[#1A73E8] text-sm font-semibold py-2.5 rounded transition-all"
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
