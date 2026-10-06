import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { recordPageView } from './services/analyticsService';

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    recordPageView(location.pathname);

    // Envio automático para o Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-Q3LQEJL9G7', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location.pathname, location.search]);

  return null;
}

import { getAdminSession, clearAdminCache } from './services/backofficeService';
import { supabase } from './lib/supabase';

// Guarda do Backoffice: exige sessão do Supabase Auth de um administrador ativo (verificado na base de dados).
// Os dados continuam protegidos pelas regras RLS mesmo que alguém contorne este ecrã.
function ProtectedRoute({ children }) {
  const [state, setState] = useState('checking'); // 'checking' | 'ok' | 'denied'

  useEffect(() => {
    let alive = true;
    getAdminSession()
      .then((s) => { if (alive) setState(s ? 'ok' : 'denied'); })
      .catch(() => { if (alive) setState('denied'); });
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && alive) {
        clearAdminCache();
        setState('denied');
      }
    });
    return () => { alive = false; data?.subscription?.unsubscribe(); };
  }, []);

  if (state === 'checking') {
    return <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500" role="status">A verificar acesso…</div>;
  }
  if (state === 'denied') return <Navigate to="/login" replace />;
  return children;
}

import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Login } from './pages/Login';
import { Backoffice } from './pages/Backoffice';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';
import { TermosUso } from './pages/TermosUso';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { BeatrizButton } from './components/layout/BeatrizButton';
import { ChatApp } from './pages/chat/ChatApp';

export function App() {
  // O chat da RP1 é uma página à parte: ecrã inteiro, sem menu, rodapé nem aviso de cookies
  if (window.location.pathname.replace(/\/$/, '') === '/chat') return <ChatApp />;

  return (
    <Router>
      <ScrollToTop />
      <PageViewTracker />
      <div className="flex flex-col min-h-screen bg-white text-[#163758] font-sans antialiased selection:bg-[#1A73E8] selection:text-white">
        <Navbar />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Páginas do site antigo: o Vercel já responde com 301; isto é a rede de segurança no navegador */}
            <Route path="/sobre" element={<Navigate to="/#sobre" replace />} />
            <Route path="/sobre-alex" element={<Navigate to="/#sobre" replace />} />
            <Route path="/central-de-conhecimento" element={<Blog />} />
            <Route path="/central-de-conhecimento/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/backoffice" 
              element={
                <ProtectedRoute>
                  <Backoffice />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Backoffice />
                </ProtectedRoute>
              } 
            />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            
            {/* Qualquer outro endereço (incluindo as páginas antigas) volta à página inicial */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
        <BeatrizButton />
        <CookieConsentBanner />
      </div>
    </Router>
  );
}

export default App;
