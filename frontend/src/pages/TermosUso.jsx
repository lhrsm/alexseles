import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const TermosUso = () => {
  return (
    <main id="main-content" className="py-16 sm:py-24 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Termos de Utilização | Alex Seles - Mentoria de Carreira & TI"
        description="Termos de utilização, diretrizes de conduta e condições gerais de prestação dos serviços de mentoria executiva em tecnologia de Alex Seles."
        keywords={["termos de utilizacao", "mentoria ti", "condicoes gerais", "alex seles"]}
        canonicalPath="/termos-de-uso"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Navegação Estrutural" className="text-xs text-[#536773] mb-8">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-[#1A73E8]">Início</Link></li>
            <li><span className="text-slate-400" aria-hidden="true">/</span></li>
            <li className="text-[#1A73E8] font-medium" aria-current="page">Termos de Utilização</li>
          </ol>
        </nav>

        <article className="space-y-8 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
          
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <span className="eyebrow">Institucional & Condições Gerais</span>
            <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]">
              Termos e Condições Gerais de Utilização
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Última atualização: 14 de setembro de 2026 • Lisboa, Portugal
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              1. Âmbito e Objeto dos Serviços
            </h2>
            <p>
              Os presentes Termos de Utilização regem o acesso a esta plataforma digital e o relacionamento profissional estabelecido entre os visitantes/mentorandos e <strong>Alex Seles</strong> no âmbito de diagnósticos de carreira, programas de aceleração profissional e mentorias executivas em Engenharia de Software, Governação e Liderança em TI.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              2. Natureza da Mentoria e Compromisso de Meios
            </h2>
            <p>
              A mentoria prestada constitui uma obrigação de meios e orientação estratégica de alto nível, fundamentada em práticas de gestão de projetos (PMP®), frameworks ágeis (SAFe®, Scrum), engenharia de software e posicionamento no mercado de trabalho.
            </p>
            <p>
              O êxito na transição ou aceleração de carreira depende intrinsecamente do compromisso individual do mentorando, da execução prática do plano de ação acordado e das dinâmicas conjunturais do mercado de tecnologia.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              3. Propriedade Intelectual e Direitos de Autor
            </h2>
            <p>
              Todos os artigos, metodologias, roteiros de transição, materiais de apoio, análises de ATS e conteúdos publicados nesta plataforma são propriedade intelectual exclusiva de <strong>Alex Seles</strong>, estando protegidos pela legislação nacional e comunitária de direitos de autor.
            </p>
            <p>
              É expressamente proibida a reprodução, comercialização, distribuição ou exploração não autorizada destes conteúdos sem autorização prévia por escrito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              4. Confidencialidade e Sigilo Mútuo
            </h2>
            <p>
              Ambas as partes comprometem-se a guardar rigoroso sigilo profissional sobre todas as informações estratégicas, projetos técnicos, remunerações, propostas de emprego e dados corporativos partilhados durante as sessões de diagnóstico ou acompanhamento individual.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              5. Proteção de Dados Pessoais
            </h2>
            <p>
              O tratamento dos dados recolhidos através deste sítio e das sessões segue rigorosamente o Regulamento Geral sobre a Proteção de Dados (RGPD) e a Lei Geral de Proteção de Dados (LGPD). Para detalhes integrais sobre direitos de acesso, retificação e apagamento, consulte a nossa{' '}
              <Link to="/politica-de-privacidade" className="text-[#1A73E8] underline font-semibold">
                Política de Privacidade
              </Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              6. Lei Aplicável e Foro Competente
            </h2>
            <p>
              Os presentes Termos de Utilização são regidos e interpretados em conformidade com a legislação portuguesa e da União Europeia. Para dirimir qualquer litígio emergente da interpretação ou execução deste instrumento, é competente o Foro da Comarca de Lisboa, com expressa renúncia a qualquer outro.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
};
