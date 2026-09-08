import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const PoliticaPrivacidade = () => {
  return (
    <main id="main-content" className="py-16 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Política de Privacidade | Alex Seles"
        description="Termos de privacidade e tratamento de dados pessoais de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a LGPD."
        keywords={["politica de privacidade", "rgpd", "lgpd", "protecao de dados", "alex seles"]}
        canonicalPath="/politica-de-privacidade"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Política de Privacidade</li>
          </ol>
        </nav>

        <article className="space-y-6 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
          <span className="eyebrow">Institucional</span>
          <h1 className="section-title">
            Política de Privacidade e Proteção de Dados
          </h1>

          <p className="text-xs text-slate-500 border-b border-[#CCD4DA] pb-4">
            Em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a Lei Geral de Proteção de Dados Pessoais (LGPD).
          </p>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">1. Finalidade do Tratamento de Dados</h2>
            <p>
              A plataforma de <strong>Alex Seles</strong> recolhe e utiliza informações facultadas voluntariamente nos formulários de contacto e canais de WhatsApp estritamente para viabilizar a resposta e o acompanhamento de mentoria solicitado pelo utilizador.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">2. Confidencialidade e Sigilo</h2>
            <p>
              Todas as informações transmitidas gozam de proteção e de um rigoroso dever de confidencialidade profissional. Os seus dados e o seu percurso de carreira nunca serão partilhados com terceiros.
            </p>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#163758]">3. Direitos do Titular</h2>
            <p>
              O titular dos dados poderá, a qualquer momento, solicitar a confirmação, retificação ou eliminação das suas informações através dos canais de contacto oficiais.
            </p>
          </section>
        </article>

      </div>
    </main>
  );
};
