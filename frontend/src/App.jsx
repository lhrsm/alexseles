import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/layout/FloatingContact';
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

import { getUsers } from './services/backofficeService';

// Guarda de segurança de autenticação do Backoffice
function ProtectedRoute({ children }) {
  const session = sessionStorage.getItem('mc_admin_session');
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  try {
    const parsed = JSON.parse(session);
    if (!parsed.token || !parsed.expiresAt || parsed.expiresAt < Date.now()) {
      sessionStorage.removeItem('mc_admin_session');
      return <Navigate to="/login" replace />;
    }

    const activeUsers = getUsers();
    const sessionEmail = (parsed.user || '').trim().toLowerCase();

    if (activeUsers && activeUsers.length > 0) {
      const found = activeUsers.find(
        (u) => (u.email || '').trim().toLowerCase() === sessionEmail
      );
      if (found && found.status === 'Inativo') {
        sessionStorage.removeItem('mc_admin_session');
        return <Navigate to="/login" replace />;
      }
    }
  } catch (e) {
    sessionStorage.removeItem('mc_admin_session');
    return <Navigate to="/login" replace />;
  }
  return children;
}

import { Home } from './pages/Home';
import { Trabalhista } from './pages/Trabalhista';
import { Previdenciario } from './pages/Previdenciario';
import { Civil } from './pages/Civil';
import { Familia } from './pages/Familia';
import { Sucessoes } from './pages/Sucessoes';
import { Propriedade } from './pages/Propriedade';
import { Contratual } from './pages/Contratual';
import { Parcerias } from './pages/Parcerias';
import { Estagios } from './pages/Estagios';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contato } from './pages/Contato';
import { TransicaoCarreira } from './pages/TransicaoCarreira';
import { TransicaoEstrategicaFundamentos } from './pages/TransicaoEstrategicaFundamentos';
import { GovernancaProdutoMetodos } from './pages/GovernancaProdutoMetodos';
import { LinkedinMarcaAts } from './pages/LinkedinMarcaAts';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Backoffice } from './pages/Backoffice';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';
import { TermosUso } from './pages/TermosUso';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageViewTracker />
      <div className="flex flex-col min-h-screen bg-white text-[#163758] font-sans antialiased selection:bg-[#1A73E8] selection:text-white">
        <Navbar />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transicao-de-carreira" element={<TransicaoCarreira />} />
            <Route path="/transicao" element={<TransicaoCarreira />} />
            <Route path="/servicos" element={<TransicaoCarreira />} />
            <Route path="/transicao-estrategica-fundamentos-tecnicos" element={<TransicaoEstrategicaFundamentos />} />
            <Route path="/fundamentos-tecnicos" element={<TransicaoEstrategicaFundamentos />} />
            <Route path="/fase-01" element={<TransicaoEstrategicaFundamentos />} />
            <Route path="/governanca-produto-metodos-entrega" element={<GovernancaProdutoMetodos />} />
            <Route path="/fase-02" element={<GovernancaProdutoMetodos />} />
            <Route path="/governanca" element={<GovernancaProdutoMetodos />} />
            <Route path="/mentoria-carreira-lideranca" element={<Navigate to="/transicao-de-carreira" replace />} />
            <Route path="/lideranca" element={<Navigate to="/governanca-produto-metodos-entrega" replace />} />
            <Route path="/gestao-projetos-agil-preditivos" element={<Navigate to="/governanca-produto-metodos-entrega" replace />} />
            <Route path="/gestao-de-projetos" element={<Navigate to="/governanca-produto-metodos-entrega" replace />} />
            <Route path="/linkedin-marca-pessoal-ats" element={<LinkedinMarcaAts />} />
            <Route path="/linkedin" element={<LinkedinMarcaAts />} />
            <Route path="/fase-03" element={<LinkedinMarcaAts />} />
            <Route path="/o-escritorio" element={<Navigate to="/#sobre-alex" replace />} />
            <Route path="/sobre" element={<Navigate to="/#sobre-alex" replace />} />
            <Route path="/sobre-alex" element={<Navigate to="/#sobre-alex" replace />} />
            <Route path="/direito-do-trabalho" element={<Trabalhista />} />
            <Route path="/direito-previdenciario" element={<Previdenciario />} />
            <Route path="/direito-civil" element={<Civil />} />
            <Route path="/direito-de-familia" element={<Familia />} />
            <Route path="/familia" element={<Familia />} />
            <Route path="/direito-das-sucessoes" element={<Sucessoes />} />
            <Route path="/sucessoes" element={<Sucessoes />} />
            <Route path="/direito-de-propriedade" element={<Propriedade />} />
            <Route path="/propriedade" element={<Propriedade />} />
            <Route path="/direito-contratual" element={<Contratual />} />
            <Route path="/contratual" element={<Contratual />} />
            <Route path="/parcerias" element={<Parcerias />} />
            <Route path="/estagios" element={<Estagios />} />
            <Route path="/central-de-conhecimento" element={<Blog />} />
            <Route path="/central-de-conhecimento/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
            
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <FloatingContact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
