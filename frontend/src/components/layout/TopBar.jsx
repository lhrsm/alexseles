import React from 'react';
import { Link } from 'react-router-dom';

export const TopBar = () => {
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

        {/* Certificações e Contato Rápido */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-slate-400">
            <i className="fa-solid fa-certificate text-sky-400" aria-hidden="true"></i>
            <span>Embaixador ITIL • Membro PMI</span>
          </span>
          <Link
            to="/contato?tipo=sessao"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            aria-label="Vamos Conversar?"
          >
            <i className="fa-solid fa-calendar-check text-emerald-400" aria-hidden="true"></i>
            <span>Vamos Conversar?</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
