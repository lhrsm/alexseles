import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { supabase } from '../lib/supabase';

// Hashes criptográficos unidirecionais para redundância local (SHA-256)
const AUTH_HASHES = [
  '53b8c393d55e9f20d846a06793c54b8c1e0f1f55da0465cb9359f65e81be7531', // Senha oficial do cliente (+7U.hhrTjnrv&hD)
  'c8b8dabf8bc5a075fd46b7bde70727e87be7d0e09617c2a9ea6a1782d45331ff', // Senha anterior
  'c9c0d8eca0c4096606f905a65116997d12a17bd07c53002c48b6c6030c8146df', // Senha padrão
];

async function computeSHA256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    identificador: '',
    senha: '',
    lembrar: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const emailInput = loginData.identificador.trim();
    const senhaInput = loginData.senha.trim();

    // 0. Proteção Anti-Força Bruta: Bloqueio progressivo de tentativas excessivas
    const now = Date.now();
    const lockUntil = parseInt(localStorage.getItem('mc_login_lock') || '0', 10);
    if (now < lockUntil) {
      const remainingSeconds = Math.ceil((lockUntil - now) / 1000);
      setLoading(false);
      setMessage({
        type: 'error',
        text: `Múltiplas tentativas incorretas detetadas. Por segurança, o formulário está bloqueado preventivamente por mais ${remainingSeconds} segundos.`
      });
      return;
    }

    try {
      let authSuccessful = false;
      let sessionToken = null;
      let expiresAt = Date.now() + 8 * 60 * 60 * 1000;

      // 1. Autenticação prioritária no Banco de Dados (PostgreSQL / Supabase RPC)
      if (supabase) {
        try {
          const { data: rpcRes, error: rpcErr } = await supabase.rpc('autenticar_admin', {
            p_email: emailInput,
            p_senha: senhaInput
          });

          if (!rpcErr && rpcRes && rpcRes.success) {
            authSuccessful = true;
            sessionToken = rpcRes.token;
            expiresAt = rpcRes.expires_at || expiresAt;
          }
        } catch (serverErr) {
          console.warn('Servidor Supabase indisponível, avaliando fallback...', serverErr);
        }
      }

      // 2. Validação direta pelo .env ou fallback criptográfico SHA-256
      if (!authSuccessful) {
        const inputHash = await computeSHA256(senhaInput);
        const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (AUTH_HASHES.includes(inputHash) || (envPassword && senhaInput === envPassword)) {
          authSuccessful = true;
          sessionToken = `mc_sec_fallback_${Date.now()}`;
        }
      }

      if (authSuccessful && sessionToken) {
        // Limpa tentativas após sucesso
        localStorage.removeItem('mc_login_attempts');
        localStorage.removeItem('mc_login_lock');

        sessionStorage.setItem('mc_admin_session', JSON.stringify({
          user: emailInput,
          token: sessionToken,
          expiresAt: expiresAt
        }));

        setTimeout(() => {
          setLoading(false);
          navigate('/backoffice');
        }, 300);
      } else {
        // Registra tentativa falha e calcula bloqueio se exceder 5 tentativas
        const attempts = JSON.parse(localStorage.getItem('mc_login_attempts') || '[]');
        const recentAttempts = attempts.filter(t => now - t < 5 * 60 * 1000);
        recentAttempts.push(now);
        localStorage.setItem('mc_login_attempts', JSON.stringify(recentAttempts));

        setTimeout(() => {
          setLoading(false);
          if (recentAttempts.length >= 5) {
            localStorage.setItem('mc_login_lock', (now + 5 * 60 * 1000).toString());
            setMessage({
              type: 'error',
              text: 'Limite de 5 tentativas incorretas atingido. Acesso bloqueado preventivamente por 5 minutos para proteção da plataforma.'
            });
          } else {
            setMessage({
              type: 'error',
              text: `Utilizador ou palavra-passe inválidos. Tentativas restantes antes do bloqueio temporário: ${5 - recentAttempts.length}.`
            });
          }
        }, 400);
      }
    } catch (err) {
      setLoading(false);
      setMessage({
        type: 'error',
        text: 'Erro ao validar credenciais. Tente novamente.'
      });
    }
  };

  return (
    <main id="main-content" className="min-h-[85vh] py-16 sm:py-24 bg-[#F8FAFC] flex items-center justify-center">
      <MetaTags
        title="Acesso ao Sistema • Alex Seles"
        description="Acesso restrito ao sistema de gestão e backoffice de Alex Seles."
        canonicalPath="/login"
      />

      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        
        {/* Card Principal de Autenticação */}
        <div className="bg-white rounded-lg border border-[#CCD4DA] shadow-xl overflow-hidden">
          
          {/* Topo Institucional do Card */}
          <div className="bg-[#0E1620] p-6 text-center border-b border-white/10">
            <Link to="/" className="inline-block" aria-label="Retornar à página inicial">
              <span className="font-display text-2xl font-bold text-white block">ALEX SELES</span>
            </Link>
            <h1 className="text-xs text-sky-400 uppercase tracking-widest font-semibold mt-1">
              Painel de Gestão & Mentoria
            </h1>
          </div>

          {/* Formulário de Login */}
          <div className="p-6 sm:p-8">
            {message && (
              <div 
                role="alert" 
                aria-live="assertive"
                className="mb-6 p-3.5 rounded bg-rose-50 border border-rose-300 text-rose-950 text-xs leading-relaxed"
              >
                <p className="font-bold mb-0.5">Aviso de Acesso:</p>
                <p>{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label 
                  htmlFor="login-identificador" 
                  className="block text-xs font-semibold text-[#163758] mb-1"
                >
                  Utilizador ou E-mail
                </label>
                <input
                  id="login-identificador"
                  name="identificador"
                  type="text"
                  autoComplete="username"
                  required
                  value={loginData.identificador}
                  onChange={(e) => setLoginData({ ...loginData, identificador: e.target.value })}
                  placeholder="O seu utilizador ou e-mail"
                  className="w-full px-3.5 py-2.5 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label 
                    htmlFor="login-senha" 
                    className="block text-xs font-semibold text-[#163758]"
                  >
                    Palavra-passe
                  </label>
                  <a 
                    href="https://wa.me/351912405814?text=Ol%C3%A1%2C%20solicito%20redefini%C3%A7%C3%A3o%20de%20palavra-passe%20de%20acesso." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#1A73E8] hover:underline font-semibold"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <input
                  id="login-senha"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginData.senha}
                  onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs border border-[#CCD4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label 
                  htmlFor="login-lembrar" 
                  className="flex items-center gap-2 cursor-pointer text-xs text-[#536773]"
                >
                  <input
                    id="login-lembrar"
                    name="lembrar"
                    type="checkbox"
                    checked={loginData.lembrar}
                    onChange={(e) => setLoginData({ ...loginData, lembrar: e.target.checked })}
                    className="rounded border-[#CCD4DA] text-[#1A73E8] focus:ring-[#1A73E8]"
                  />
                  <span>Lembrar neste navegador</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
              >
                {loading ? (
                  <span>Acessando...</span>
                ) : (
                  <>
                    <span>Entrar no Sistema</span>
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#CCD4DA] text-center">
              <p className="text-xs text-[#63717C]">
                Precisa de autorização de acesso?
              </p>
              <Link 
                to="/contato" 
                className="inline-block mt-2 text-xs font-semibold text-[#1A73E8] hover:underline"
              >
                Solicitar à administração do escritório →
              </Link>
            </div>
          </div>

        </div>

        {/* Informações de Segurança e LGPD */}
        <div className="mt-6 text-center text-[11px] text-[#63717C] space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <i className="fa-solid fa-lock text-[#1A73E8]" aria-hidden="true"></i>
            <span>Conexão segura com criptografia de ponta a ponta (SSL/TLS).</span>
          </p>
          <p>
            Em conformidade com a LGPD e o Código de Ética e Disciplina da OAB.
          </p>
        </div>

      </div>
    </main>
  );
};
export default Login;
