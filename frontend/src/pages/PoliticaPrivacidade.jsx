import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';

export const PoliticaPrivacidade = () => {
  return (
    <main id="main-content" className="py-16 sm:py-24 bg-white text-[#163758] min-h-screen">
      <MetaTags
        title="Política de Privacidade e Proteção de Dados (RGPD & LGPD) | Alex Seles"
        description="Termos formais de privacidade, tratamento confidencial e proteção de dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD - UE 2016/679) e a LGPD."
        keywords={[
          "politica de privacidade",
          "rgpd",
          "gdpr",
          "lgpd",
          "protecao de dados",
          "dpo",
          "seguranca da informacao",
          "alex seles"
        ]}
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

        <article className="space-y-8 text-sm sm:text-base text-[#536773] leading-relaxed font-sans">
          
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <span className="eyebrow">Conformidade Legal & Segurança da Informação</span>
            <h1 className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]">
              Política de Privacidade e Proteção de Dados Pessoais
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Última atualização: 14 de setembro de 2026 • Em conformidade estrita com o Regulamento (UE) 2016/679 (RGPD) e a Lei n.º 13.709/2018 (LGPD).
            </p>
          </div>

          {/* 1. Responsável pelo Tratamento */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              1. Responsável pelo Tratamento e Contacto Oficial (DPO)
            </h2>
            <p>
              O responsável pelo tratamento dos seus dados pessoais no âmbito da presente plataforma digital e dos serviços de mentoria executiva em tecnologia é <strong>Alex Seles</strong>, Head de Inovação & Tecnologia, com sede operacional em Lisboa, Portugal.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm space-y-1">
              <p><strong>Canal Exclusivo para Privacidade & DPO:</strong> <a href="mailto:contato@alexseles.online" className="text-[#1A73E8] underline font-semibold">contato@alexseles.online</a></p>
              <p><strong>Contacto Direto / WhatsApp Executivo:</strong> +351 912 405 814</p>
              <p><strong>Localização:</strong> Lisboa, Portugal (Atendimento Remoto Internacional)</p>
            </div>
          </section>

          {/* 2. Princípios de Governação de Dados */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              2. Princípios Fundamentais do Tratamento
            </h2>
            <p>
              Todas as operações de recolha e tratamento de dados respeitam escrupulosamente os princípios fundamentais enunciados no Artigo 5.º do RGPD:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Licitude, Lealdade e Transparência:</strong> O tratamento é suportado por bases legais legítimas e comunicado ao titular de forma compreensível.</li>
              <li><strong>Minimização dos Dados:</strong> Apenas são solicitadas as informações estritamente necessárias para a avaliação, triagem e execução da mentoria solicitada.</li>
              <li><strong>Limitação das Finalidades:</strong> Os dados nunca serão utilizados para finalidades incompatíveis com as declaradas neste instrumento.</li>
              <li><strong>Integridade e Confidencialidade:</strong> Salvaguarda rigorosa contra acessos não autorizados, extravio, destruição ou divulgação indevida.</li>
            </ul>
          </section>

          {/* 3. Dados Recolhidos e Finalidades */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              3. Categorias de Dados Recolhidos e Respetivas Finalidades
            </h2>
            <p>Os dados facultados voluntariamente pelo titular através dos nossos formulários dividem-se em:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-[#163758] text-white">
                  <tr>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Dados Recolhidos</th>
                    <th className="p-3">Finalidade & Base Legal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-3 font-semibold text-[#163758]">Identificação e Contacto</td>
                    <td className="p-3">Nome completo, endereço de e-mail, número de telemóvel/WhatsApp e país/cidade.</td>
                    <td className="p-3">Comunicação e agendamento da sessão diagnóstica ou prestação de mentoria (Art. 6.º, n.º 1, al. b do RGPD).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#163758]">Perfil e Carreira</td>
                    <td className="p-3">Cargo atual, anos de experiência, senioridade, link de perfil LinkedIn e pretensão profissional.</td>
                    <td className="p-3">Triagem de maturidade técnica, elaboração do dossiê estratégico e alinhamento do plano de ação (Art. 6.º, n.º 1, al. b do RGPD).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#163758]">Lista de Envio de Conteúdos</td>
                    <td className="p-3">Nome e e-mail para subscrição voluntária de vagas, eventos e artigos técnicos.</td>
                    <td className="p-3">Consentimento explícito do titular (Art. 6.º, n.º 1, al. a do RGPD). Revogável a qualquer instante.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Medidas Técnicas e Organizativas de Segurança (TOMs) */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              4. Medidas Técnicas e Organizativas de Segurança da Informação (TOMs)
            </h2>
            <p>
              Implementamos salvaguardas tecnológicas alinhadas com o estado da arte e com as normas ISO/IEC 27001 e OWASP Top 10 para assegurar a inviolabilidade dos seus dados:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cifra de Ponta a Ponta em Trânsito:</strong> Todos os canais de transmissão operam sob protocolo seguro TLS 1.3 (HTTPS) com HSTS estrito forçado por cabeçalhos HTTP.</li>
              <li><strong>Cifra de Credenciais e Hashing:</strong> Palavras-passe e chaves sensíveis são protegidas por funções de hash unidirecionais SHA-256 e tokens de sessão isolados.</li>
              <li><strong>Cabeçalhos HTTP de Proteção no Navegador:</strong> Aplicação ativa de <em>Content-Security-Policy</em> (CSP), <em>X-Frame-Options: DENY</em> (prevenção absoluta contra clickjacking), <em>X-Content-Type-Options: nosniff</em> e <em>Permissions-Policy</em> restritiva.</li>
              <li><strong>Sanitização e Blindagem Anti-Injeção:</strong> Todas as entradas de dados passam por filtros automatizados contra Cross-Site Scripting (XSS) e injeção de fórmulas/CSV antes do envio para bases de dados ou folhas de cálculo.</li>
              <li><strong>Controlo de Acesso e Menor Privilégio:</strong> Apenas Alex Seles possui credenciais de acesso aos registos confidenciais de mentorados.</li>
            </ul>
          </section>

          {/* 5. Subprocessadores Confiáveis */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              5. Subprocessadores e Transferências Internacionais
            </h2>
            <p>
              Para assegurar a excelência operacional, utilizamos fornecedores de infraestrutura líderes de mercado, vinculados a acordos de tratamento de dados (DPA) e Cláusulas Contratuais Tipo (SCCs) aprovadas pela Comissão Europeia:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Hostinger VPS (Alemanha/União Europeia):</strong> Hospedagem do servidor privado de orquestração n8n.</li>
              <li><strong>Supabase Inc. (Base de Dados em Nuvem):</strong> Armazenamento estruturado e encriptado em repouso.</li>
              <li><strong>Atlassian / Trello (Kanban de Atendimento):</strong> Gestão do fluxo operacional de triagem com permissões restritas.</li>
              <li><strong>Google Workspace / Google Meet:</strong> Realização de videoconferências seguras e envio de comunicações institucionais.</li>
            </ul>
          </section>

          {/* 6. Retenção de Dados */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              6. Prazos de Retenção e Conservação
            </h2>
            <p>
              Os dados pessoais são conservados apenas durante o período estritamente necessário para o cumprimento das finalidades descritas:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Contactos e Diagnósticos de Candidatos:</strong> Conservados durante o processo de avaliação e eventual vigência da mentoria. Após a conclusão, são anonimizados ou eliminados com segurança no prazo máximo de 12 meses, salvo obrigação legal em contrário.</li>
              <li><strong>Subscritores de Conteúdos:</strong> Mantidos até que o titular exerça o seu direito de descadastramento (opt-out), momento em que os dados são imediatamente removidos da lista de envio ativa.</li>
            </ul>
          </section>

          {/* 7. Direitos dos Titulares */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              7. Direitos Fundamentais do Titular dos Dados
            </h2>
            <p>
              Nos termos dos Artigos 15.º a 22.º do RGPD e do Artigo 18.º da LGPD, o utilizador pode exercer a qualquer momento os seguintes direitos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#163758]">Acesso & Informação</h3>
                <p className="text-xs text-slate-600 mt-1">Saber que dados estão a ser tratados e obter cópia dos mesmos.</p>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#163758]">Retificação</h3>
                <p className="text-xs text-slate-600 mt-1">Solicitar a correção imediata de informações inexatas ou desatualizadas.</p>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#163758]">Apagamento / Esquecimento</h3>
                <p className="text-xs text-slate-600 mt-1">Exigir a eliminação permanente dos seus dados de todos os nossos registos.</p>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#163758]">Limitação & Oposição</h3>
                <p className="text-xs text-slate-600 mt-1">Contestar o tratamento ou requerer a restrição temporária das operações.</p>
              </div>
            </div>
            <p className="pt-2 text-xs sm:text-sm">
              Para exercer qualquer um destes direitos, basta enviar um pedido formal para o endereço de correio eletrónico <strong>contato@alexseles.online</strong>. As solicitações são respondidas sem custos no prazo máximo de 15 dias úteis.
            </p>
            <p className="text-xs text-slate-500">
              O titular tem igualmente o direito de apresentar reclamação junto da autoridade de controlo competente: em Portugal, a <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong> através de <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] underline">cnpd.pt</a>; no Brasil, a <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>.
            </p>
          </section>

          {/* 8. Cookies */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#163758]">
              8. Gestão de Cookies e Armazenamento Local
            </h2>
            <p>
              A nossa plataforma utiliza unicamente cookies e entradas de armazenamento local de cariz estritamente técnico e funcional, destinados a:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Memorizar o consentimento de privacidade e preferências do visitante.</li>
              <li>Manter a segurança e integridade de sessões autenticadas no painel de administração.</li>
              <li>Garantir a proteção contra submissões robotizadas e ataques de força bruta.</li>
            </ul>
            <p>
              Não comercializamos os seus dados com plataformas publicitárias de terceiros nem realizamos rastreamento intrusivo entre sítios web.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
};
