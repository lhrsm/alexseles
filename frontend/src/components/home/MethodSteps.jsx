import React from 'react';

export const MethodSteps = () => {
  const steps = [
    {
      num: "01",
      title: "Diagnóstico de Perfil e Análise de Bagagem",
      description: "Mapeamos suas competências, histórico e formação anterior para identificar seus pontos fortes e as oportunidades mais promissoras no ecossistema de tecnologia."
    },
    {
      num: "02",
      title: "Roadmap Estratégico de Aprendizado e Transição",
      description: "Eliminamos a perda de tempo com acúmulo de cursos sem foco. Criamos um plano de estudo direcionado para certificações e habilidades que os recrutadores de fato buscam."
    },
    {
      num: "03",
      title: "Posicionamento no LinkedIn e Marca Pessoal",
      description: "Aplicamos estratégias testadas de visibilidade profissional de quem tem mais de 62 mil seguidores e é top voice em inovação, atraindo recrutadores e oportunidades qualificadas."
    },
    {
      num: "04",
      title: "Preparação Executiva, Entrevistas e Liderança",
      description: "Simulações práticas de entrevistas técnicas e comportamentais, negociação de remuneração compatível com seu potencial e postura de liderança em equipas ágeis."
    }
  ];

  return (
    <section id="metodo" className="py-20 sm:py-28 bg-[#163758] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Lado Esquerdo: Título da Seção */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="eyebrow eyebrow-dark">
              Metodologia de Mentoria
            </span>
            <h2 className="section-title section-title-dark">
              Como aceleramos a sua transição e crescimento em TI
            </h2>
            <p className="text-sm sm:text-base text-[#C6D1DA] mt-4 leading-relaxed font-sans">
              Um fluxo estruturado em 4 etapas objetivas, garantindo clareza, foco prático e acompanhamento estratégico em cada fase da sua trajetória.
            </p>
          </div>

          {/* Lado Direito: 4 Etapas Numeradas */}
          <div className="lg:col-span-7 divide-y divide-white/15">
            {steps.map((step, idx) => (
              <article key={idx} className="step-item">
                <span className="step-number">{step.num}</span>
                <div className="space-y-1.5">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C6D1DA] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
