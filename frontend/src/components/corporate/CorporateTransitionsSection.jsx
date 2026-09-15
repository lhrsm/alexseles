import React, { useState, useEffect, useRef } from 'react';

import digitalImg from '../../assets/digital.png';
import businessImg from '../../assets/business.png';
import projectImg from '../../assets/project.png';
import empresaImg from '../../assets/empresa.png';

export const CorporateTransitionsSection = ({ onOpenModal }) => {
  const corporateSlides = [
    {
      id: 'transformacao-digital',
      badge: 'Transformação Digital & SDLC',
      question: 'O desenvolvimento de software da sua empresa está\u00A0lento?',
      action: 'Modernize o seu\u00A0SDLC.',
      description: 'Acelere o ciclo de desenvolvimento de software (SDLC), redesenhe a arquitetura dos seus sistemas e converta desafios técnicos complexos em vantagem competitiva e\u00A0escalável.',
      image: digitalImg
    },
    {
      id: 'automacao-ia',
      badge: 'Automação & Inteligência Artificial',
      question: 'A sua equipa está\u00A0sobrecarregada?',
      action: 'Automatize\u00A0tarefas.',
      description: 'Use Inteligência Artificial para criar conteúdos, atender clientes, analisar dados e muito mais, combinando um Assistente de IA com o toque\u00A0humano.',
      image: businessImg
    },
    {
      id: 'posicionamento-digital',
      badge: 'Estratégia & Presença Corporativa',
      question: 'A sua empresa tem soluções inovadoras mas pouca\u00A0visibilidade?',
      action: 'Posicione a sua\u00A0marca.',
      description: 'Estruture a proposta de valor técnica da sua organização, eleve a visibilidade das suas soluções no mercado e transforme presença digital em novos\u00A0clientes.',
      image: projectImg
    },
    {
      id: 'capacitacao-in-company',
      badge: 'Capacitação In-Company & Mentoria',
      question: 'A sua equipa de TI precisa de evoluir competências?',
      action: 'Capacite In-Company ou\u00A0Online.',
      description: 'Programas práticos de up-skilling técnico para equipas de engenharia e mentoria executiva para líderes e Tech Leads, no formato presencial ou 100%\u00A0remoto.',
      image: empresaImg
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? corporateSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === corporateSlides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === corporateSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, corporateSlides.length]);

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

  const currentItem = corporateSlides[activeIndex];

  return (
    <section 
      id="inicio" 
      className="relative w-full bg-slate-950 text-white overflow-hidden select-none border-b border-slate-200/80 pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrossel de Soluções Corporativas & Transformação Digital"
    >
      <div className="relative w-full h-[calc(100vh-180px)] min-h-[480px] max-h-[740px] overflow-hidden">
        {corporateSlides.map((item, idx) => {
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
                alt={item.badge}
                className="w-full h-full object-cover object-center"
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
          className="absolute left-3 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
          aria-label="Slide anterior"
        >
          <i className="fa-solid fa-chevron-left text-base sm:text-lg" aria-hidden="true" />
        </button>

        {/* Seta de Navegação: Direita [ > ] */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
          aria-label="Próximo slide"
        >
          <i className="fa-solid fa-chevron-right text-base sm:text-lg" aria-hidden="true" />
        </button>

        {/* Bloco Textual: Posicionado à esquerda com margem arejada e segura em relação às setas */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left pointer-events-auto pl-16 sm:pl-20 md:pl-24 lg:pl-28 xl:pl-32">
              
              {/* Título com destaque de alto contraste e alinhamento à esquerda sem palavras soltas */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] leading-tight text-left text-pretty max-w-2xl">
                {currentItem.question}{' '}
                <span className="text-[#60A5FA] font-extrabold inline">
                  {currentItem.action}
                </span>
              </h2>

              {/* Subtítulo / Frase descritiva */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-100 mt-4 sm:mt-5 font-sans leading-relaxed text-left text-pretty drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-2xl">
                {currentItem.description}
              </p>

            </div>
          </div>
        </div>

        {/* Indicadores de Paginação */}
        <div 
          className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex items-center justify-center gap-2.5" 
          role="tablist" 
          aria-label="Navegação por slides corporativos"
        >
          {corporateSlides.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
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
