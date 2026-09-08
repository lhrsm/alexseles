import React, { useState, useEffect, useRef } from 'react';

import advogadoImg from '../../assets/advogado.png';
import professorImg from '../../assets/professor.png';
import contabilistaImg from '../../assets/contabilista.png';
import administradorImg from '../../assets/administrador.png';
import psicologaImg from '../../assets/psicologa.png';
import engenheiroImg from '../../assets/engenheiro.png';
import matematicoImg from '../../assets/matematico.png';
import designImg from '../../assets/design.png';

export const CareerTransitionsSection = () => {
  const careerTransitions = [
    {
      id: 'juridico',
      badge: 'Direito & Jurídico',
      question: 'És Advogado ou do Setor Jurídico?',
      role: 'Podes ser um DPO (Data Protection Officer)',
      description: 'Conhecimento jurídico convertido em segurança da informação, conformidade regulatória com o RGPD/LGPD e privacidade de dados.',
      image: advogadoImg
    },
    {
      id: 'comunicacao',
      badge: 'Letras & Comunicação',
      question: 'És Formado em Letras ou Comunicação?',
      role: 'Podes ser um UX Writer & Conteúdo para IA',
      description: 'Design conversacional de chatbots de inteligência artificial, microcópia de sistemas digitais e documentação técnica estratégica.',
      image: professorImg
    },
    {
      id: 'economia',
      badge: 'Economia & Contabilidade',
      question: 'És Economista ou Contabilista?',
      role: 'Podes ser um Analista de Business Intelligence (BI)',
      description: 'Métricas de negócio, dashboards estratégicos e inteligência quantitativa para apoio direto a decisões de administração.',
      image: contabilistaImg
    },
    {
      id: 'gestao',
      badge: 'Administração & Gestão',
      question: 'És Administrador ou Gestor?',
      role: 'Podes ser um Product Owner, PM ou Scrum Master',
      description: 'Visão estratégica de negócios, liderança de processos, priorização ágil de equipas e comunicação direta com a engenharia.',
      image: administradorImg
    },
    {
      id: 'rh',
      badge: 'Psicologia & RH',
      question: 'És Psicólogo ou de Recursos Humanos?',
      role: 'Podes ser um UX Researcher ou Tech Recruiter',
      description: 'Compreensão profunda de comportamento humano aplicada a pesquisas de utilizadores em produtos digitais ou atração de talentos de TI.',
      image: psicologaImg
    },
    {
      id: 'engenharia',
      badge: 'Engenharias',
      question: 'És Engenheiro de outra especialidade?',
      role: 'Podes ser um Engenheiro de Software & Arquitetura Cloud',
      description: 'Raciocínio lógico estruturado e modelagem técnica aplicados ao desenvolvimento de sistemas, automações e infraestruturas em nuvem.',
      image: engenheiroImg
    },
    {
      id: 'matematica',
      badge: 'Matemática & Física',
      question: 'És Matemático ou Físico?',
      role: 'Podes ser um Data Scientist (Cientista de Dados)',
      description: 'Raciocínio lógico e estatística aplicados a modelos de Machine Learning, algoritmos preditivos e análise avançada de dados.',
      image: matematicoImg
    },
    {
      id: 'design',
      badge: 'Design & Artes',
      question: 'És Designer, Arquiteto ou de Artes?',
      role: 'Podes ser um Product Designer (UI/UX)',
      description: 'Sensibilidade estética, empatia e arquitetura visual aplicadas na criação de interfaces digitais, protótipos interativos e experiência do utilizador.',
      image: designImg
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? careerTransitions.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === careerTransitions.length - 1 ? 0 : prev + 1));
  };

  // Rotação suave a cada 6 segundos (pausa quando o utilizador passa o rato)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === careerTransitions.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, careerTransitions.length]);

  // Gestos táticos de swipe em ecrãs táteis
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentItem = careerTransitions[activeIndex];

  return (
    <section 
      id="inicio" 
      className="relative w-full bg-slate-950 text-white overflow-hidden select-none border-b border-slate-200/80 pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrossel de Mapeamento por Formação para TI"
    >
      {/* Contentor do Slide: 100% da largura do ecrã com altura calculada para scroll peek da secção seguinte */}
      <div className="relative w-full h-[calc(100vh-180px)] min-h-[480px] max-h-[740px] overflow-hidden">
        {careerTransitions.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={item.image}
                alt={item.role}
                className="w-full h-full object-cover object-top"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Degradê escuro profundo no lado esquerdo para contraste e legibilidade impecáveis */}
              <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 md:w-3/4 lg:w-3/5 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>
          );
        })}

        {/* Seta de Navegação: Esquerda [ < ] */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all hover:scale-105"
          aria-label="Slide anterior"
        >
          <i className="fa-solid fa-chevron-left text-base sm:text-lg" aria-hidden="true" />
        </button>

        {/* Seta de Navegação: Direita [ > ] */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all hover:scale-105"
          aria-label="Próximo slide"
        >
          <i className="fa-solid fa-chevron-right text-base sm:text-lg" aria-hidden="true" />
        </button>

        {/* Bloco Textual: Posicionado à esquerda com margem arejada e segura em relação às setas */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left pointer-events-auto pl-16 sm:pl-20 md:pl-24 lg:pl-28 xl:pl-32">
              {/* Título Maior com sombra de alto contraste */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] leading-tight text-left">
                {currentItem.question}{' '}
                <span className="text-[#60A5FA] font-extrabold block sm:inline mt-1 sm:mt-0">
                  {currentItem.role}
                </span>
              </h2>

              {/* Subtítulo / Frase descritiva */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-100 mt-4 sm:mt-5 font-sans leading-relaxed text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-2xl">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>

        {/* Indicadores de Paginação (Bolinhas): Centralizados ao meio na base */}
        <div 
          className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex items-center justify-center gap-2.5" 
          role="tablist" 
          aria-label="Navegação por slides"
        >
          {careerTransitions.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-[#1A73E8] shadow-md ring-2 ring-white/30'
                  : 'w-2.5 bg-white/50 hover:bg-white/90'
              }`}
              aria-label={`Slide ${idx + 1}: ${item.badge}`}
              aria-selected={activeIndex === idx}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
