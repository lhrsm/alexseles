import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_STORAGE_KEY = 'alexseles_cookie_consent_v1';

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Exibe o banner apos 1 segundo para transição suave
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignora erro de storage desativado
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          status: 'all',
          timestamp: new Date().toISOString(),
          version: '1.0'
        })
      );
    } catch (e) {}
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          status: 'necessary',
          timestamp: new Date().toISOString(),
          version: '1.0'
        })
      );
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Consentimento de Cookies e Privacidade"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#163758] text-white shadow-2xl border-t border-slate-700/60 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1.5 flex-1 pr-0 md:pr-4">
          <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
            Privacidade e Proteção de Dados (RGPD & LGPD)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Utilizamos tecnologias de armazenamento e cookies estritamente necessários para assegurar a integridade da navegação, prevenir fraudes e viabilizar o processamento das suas solicitações de mentoria. Os seus dados são tratados com total confidencialidade e nunca serão comercializados com terceiros.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
          <Link
            to="/politica-de-privacidade"
            className="text-xs sm:text-sm text-slate-300 hover:text-white underline underline-offset-4 py-2 px-3 transition-colors"
          >
            Ler Política
          </Link>
          <button
            type="button"
            onClick={handleAcceptNecessary}
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-600 px-4 py-2.5 rounded-lg transition-all"
          >
            Apenas Necessários
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="text-xs sm:text-sm font-semibold text-[#163758] bg-[#F1B814] hover:bg-[#E0A800] px-5 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </aside>
  );
};
