import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const TopBar = () => {
  const location = useLocation();
  const isEmpresas = location.pathname.startsWith('/para-empresas') || location.pathname.startsWith('/empresas');

  return (
    <div className="bg-[#080A0E] text-slate-400 text-xs border-b border-[#262E3D] py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        
        {/* Credenciais & Autoridade */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-slate-300">
            <i className="fa-solid fa-laptop-code text-sky-400" aria-hidden="true"></i>
            <strong>Alex Seles</strong> | Head de Inovação & Tecnologia
          </span>
          <a
            href="https://www.linkedin.com/in/alex-seles/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-sky-300 transition-colors"
            aria-label="Perfil oficial de Alex Seles no LinkedIn"
          >
            <i className="fa-brands fa-linkedin text-sky-400" aria-hidden="true"></i>
            <span>+62k seguidores no LinkedIn • Inovação & TI</span>
          </a>
        </div>

        {/* Certificações & Acesso Rápido */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-slate-400">
            <i className="fa-solid fa-certificate text-sky-400" aria-hidden="true"></i>
            <span>Embaixador ITIL • Membro PMI</span>
          </span>

          <span className="text-slate-700 hidden lg:inline">|</span>

          {isEmpresas ? (
            <Link
              to="/"
              className="hidden lg:flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <i className="fa-solid fa-user-graduate" aria-hidden="true"></i>
              <span>Ver Mentoria para Profissionais</span>
            </Link>
          ) : (
            <Link
              to="/para-empresas"
              className="hidden lg:flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <i className="fa-solid fa-building" aria-hidden="true"></i>
              <span>Soluções para Empresas & B2B</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};
