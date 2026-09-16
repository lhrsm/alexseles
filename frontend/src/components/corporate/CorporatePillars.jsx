import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Bot, 
  GitMerge, 
  GraduationCap 
} from 'lucide-react';

export const CorporatePillars = ({ onOpenModal }) => {
  const pillars = [
    {
      id: 'transformacao-digital-sdlc',
      icon: Cpu,
      title: 'Transformação Digital, Design UX/UI & Modernização de Sistemas',
      paragraphs: [
        'Iniciamos com Product Discovery aprofundado e Design UX/UI centrado nas necessidades reais do utilizador, mapeando jornadas e validando hipóteses críticas através de protótipos de alta fidelidade, Provas de Conceito (PoC) e MVPs ágeis. Esta abordagem mitiga os riscos de investimento e assegura que a solução digital possui validação prática de mercado antes do desenvolvimento em grande escala.',
        'Desenvolvemos e modernizamos ecossistemas digitais com conformidade rigorosa com normas de Acessibilidade Digital (WCAG / a11y), transacionando sistemas legados e arquiteturas monolíticas obsoletas para ambientes Cloud modernos, modulares e seguros. Estruturamos todo o ciclo de vida do desenvolvimento de software (SDLC) para expandir a presença digital, o market share e a faturação da organização.'
      ]
    },
    {
      id: 'automacao-processos-ia',
      icon: Bot,
      title: 'Automação de Processos & Inteligência Artificial',
      paragraphs: [
        'Mapeamos gargalos operacionais e eliminamos tarefas manuais e repetitivas orquestrando esteiras avançadas de automação com n8n, webhooks e integrações robustas de APIs REST, interligando de forma transparente sistemas legados, bases de dados e plataformas modernas sem fricção.',
        'Incorporamos Inteligência Artificial generativa e agentes autónomos de forma segura e governada nos fluxos de trabalho da organização — seja no suporte inteligente, na análise avançada de dados corporativos ou nas esteiras de engenharia de software (revisão de código, automação de testes e monitorização preditiva) —, acelerando o time-to-market e reduzindo até 70% o tempo despendido em rotinas manuais.'
      ]
    },
    {
      id: 'governanca-agil-metodos',
      icon: GitMerge,
      title: 'Governação de Entregas & Metodologias (Ágil, Híbrido e Preditivo)',
      paragraphs: [
        'Realizamos uma auditoria minuciosa à maturidade técnica e aos fluxos de entrega da organização, identificando as causas raiz de atritos, desvios e atrasos sistemáticos. Desenhamos e implementamos o modelo metodológico ideal para o contexto da empresa — seja Ágil (Scrum, Kanban, SAFe), Preditivo/Tradicional (PMI/PMP) ou modelos Híbridos —, garantindo total alinhamento entre a engenharia de software e os objetivos de negócio.',
        'Capacitamos as equipas nos ritos, papéis e cerimónias funcionais, auditamos e parametrizamos ferramentas de mercado (Jira Software, Azure DevOps) sob as melhores práticas de governança ITIL 4, e estabelecemos dashboards executivos com métricas preditivas de fluxo (Lead Time, Cycle Time, Throughput e CFD) para assegurar mais de 90% de previsibilidade nas entregas e transparência absoluta para a administração.'
      ]
    },
    {
      id: 'capacitacao-lideranca',
      icon: GraduationCap,
      title: 'Skill-Up Técnico In-Company & Mentoria de Liderança',
      paragraphs: [
        'Desenvolvemos programas intensivos de aceleração técnica (Skill-Up) desenhados sob medida para a stack e os desafios operacionais da sua equipa de desenvolvimento. Formamos os programadores em engenharia de software moderna, código limpo (clean code), arquitetura escalável, automação de testes e aplicação prática e ética de Inteligência Artificial no dia a dia da engenharia.',
        'Conduzimos programas de mentoria executiva individual 1:1 para Tech Leads, coordenadores técnicos e gestores de engenharia, preparando-os para a tomada de decisão técnica complexa, liderança de equipas multidisciplinares e governança estratégica de produtos digitais. As capacitações estão disponíveis em formato presencial In-Company ou 100% online remoto, maximizando a retenção de talentos críticos e consolidando a autonomia técnica interna.'
      ]
    }
  ];

  return (
    <section id="solucoes-empresas" className="py-20 sm:py-28 bg-[#F8FAFC] text-[#163758] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção de Soluções */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-14 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans block">
            Áreas de Atuação
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#163758] font-extrabold tracking-tight text-left font-sans">
            Soluções e Serviços de Engenharia
          </h2>
          <p className="text-base sm:text-lg text-[#536773] leading-relaxed font-sans text-pretty text-left">
            Intervenções especializadas para empresas que necessitam de elevar a maturidade técnica das suas equipas, automatizar fluxos críticos e obter previsibilidade no desenvolvimento de software.
          </p>
        </div>

        {/* Lista Vertical de Soluções (Um abaixo do outro, sem imagens, sem badges e sem numeração) */}
        <div className="flex flex-col gap-6">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#1A73E8]/50 transition-all duration-300 p-6 sm:p-8 text-left group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8">
                  
                  {/* Bloco Principal: Ícone + Título + Descrição Expandida */}
                  <div className="flex items-start gap-4 sm:gap-5 flex-1">
                    {/* Ícone da Solução */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A73E8] shrink-0 group-hover:bg-[#1A73E8] group-hover:text-white transition-all duration-300 mt-1">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <div className="space-y-3 flex-1">
                      {/* Título sem numeração */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#163758] group-hover:text-[#1A73E8] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Descrição Executiva Expandida */}
                      <div className="space-y-2.5 text-sm sm:text-base text-[#475569] leading-relaxed font-sans text-pretty max-w-4xl">
                        {item.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ação: Botão / Link para Solicitar Diagnóstico */}
                  <div className="lg:self-center shrink-0 pt-3 lg:pt-0 border-t border-slate-100 lg:border-t-0">
                    <button
                      type="button"
                      onClick={() => onOpenModal && onOpenModal(item)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-50 hover:bg-[#1A73E8] text-[#1A73E8] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-100 shadow-2xs hover:shadow-md group/btn"
                    >
                      <span>Solicitar Diagnóstico</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

