import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Exibe o botão quando o utilizador rolar mais de 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Não renderiza em páginas administrativas/backoffice
  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B0D12]/90 hover:bg-[#1A73E8] border border-[#262E3D] hover:border-[#1A73E8] text-slate-300 hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2 focus:ring-offset-[#0B0D12] backdrop-blur-sm group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <i
        className="fa-solid fa-arrow-up text-sm sm:text-base group-hover:-translate-y-0.5 transition-transform duration-200"
        aria-hidden="true"
      ></i>

      {/* Tooltip elegante em ecrãs médios/grandes */}
      <span className="hidden sm:block absolute right-full mr-2.5 px-2.5 py-1 text-xs font-medium text-white bg-slate-900/95 border border-slate-700/80 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Voltar ao topo
      </span>
    </button>
  );
};
