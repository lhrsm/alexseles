import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSobreClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('sobre-alex');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '/#sobre-alex');
      }
    }
  };

  const solutionLinks = [
    { name: 'TRANSIÇÃO DE CARREIRA PARA TI (TRILHA COMPLETA)', path: '/transicao-de-carreira' },
    { name: 'TRANSIÇÃO ESTRATÉGICA & FUNDAMENTOS TÉCNICOS (MÓDULO)', path: '/transicao-estrategica-fundamentos-tecnicos' },
    { name: 'GOVERNAÇÃO, PRODUTO & MÉTODOS DE ENTREGA (MÓDULO)', path: '/governanca-produto-metodos-entrega' },
    { name: 'POSICIONAMENTO NO MERCADO - SEJA ENCONTRADO POR RECRUTADORES (MÓDULO)', path: '/linkedin-marca-pessoal-ats' },
  ];

  const isSolucoesActive = solutionLinks.some(
    (link) => location.pathname === link.path
  );

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
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Oficial Alex Seles */}
          <Link 
            to="/" 
            className="flex items-center group focus:outline-none py-1"
            aria-label="Alex Seles — Mentoria de Carreira & Tecnologia"
          >
            <img 
              src={logoImg} 
              alt="Alex Seles • Mentoria de Carreira & TI" 
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
            />
          </Link>

          {/* Navegação Desktop */}
          <nav ref={navRef} className="hidden md:flex items-center gap-7 h-full" aria-label="Navegação principal">
            
            {/* Dropdown: Soluções */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('solucoes')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'solucoes' ? null : 'solucoes')}
                className={`flex items-center gap-1.5 text-xs tracking-wider uppercase font-bold transition-all focus:outline-none py-2 border-b-2 ${
                  isSolucoesActive || activeDropdown === 'solucoes'
                    ? 'text-white border-[#1A73E8]'
                    : 'text-slate-200 hover:text-white border-transparent'
                }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'solucoes'}
              >
                <span>MENTORIA</span>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${activeDropdown === 'solucoes' ? 'rotate-180' : ''}`} aria-hidden="true"></i>
              </button>

              {activeDropdown === 'solucoes' && (
                <div 
                  className="absolute left-0 top-[calc(100%-8px)] w-80 md:w-96 bg-white rounded-md shadow-2xl border border-slate-200/80 divide-y divide-slate-100 z-50 animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {solutionLinks.map((link) => {
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                        className="block px-5 py-3.5 text-xs font-bold tracking-wider text-[#163758] hover:text-[#1A73E8] hover:bg-slate-50 transition-colors leading-snug"
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Link: Sobre Alex */}
            <Link
              to="/#sobre-alex"
              onClick={handleSobreClick}
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                location.pathname === '/' && location.hash === '#sobre-alex'
                  ? 'text-white border-[#1A73E8]'
                  : 'text-slate-200 hover:text-white border-transparent'
              }`}
            >
              SOBRE ALEX SELES
            </Link>

            {/* Link: Artigos */}
            <Link
              to="/central-de-conhecimento"
              className={`text-xs tracking-wider uppercase font-bold transition-all py-2 border-b-2 ${
                location.pathname === '/central-de-conhecimento'
                  ? 'text-white border-[#1A73E8]'
                  : 'text-slate-200 hover:text-white border-transparent'
              }`}
            >
              ARTIGOS
            </Link>
          </nav>

          {/* Botão de Login */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-[#1A73E8] text-white hover:bg-[#1A73E8] hover:text-white text-sm font-semibold px-5 py-2.5 rounded transition-all"
            >
              <span>Login</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2 focus:ring-offset-[#0E1620]"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} aria-hidden="true"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#121C28] border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-sky-400 px-3 pb-1 border-b border-white/10">
              Mentoria
            </div>
            <div className="space-y-1 pl-2 pt-1">
              {solutionLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded text-sm font-medium text-slate-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-white/10">
            <Link
              to="/#sobre-alex"
              onClick={(e) => {
                setIsOpen(false);
                handleSobreClick(e);
              }}
              className="block px-3 py-2 rounded text-sm font-medium text-slate-200 hover:text-white"
            >
              Sobre Alex Seles
            </Link>
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
              className="w-full inline-flex justify-center items-center gap-2 border border-[#1A73E8] text-white hover:bg-[#1A73E8] text-sm font-semibold py-3 rounded transition-all"
            >
              <span>Login</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
