import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import sirlaneImg from '../../assets/sirlane.jpg';
import carolinaImg from '../../assets/carolinaughoa.jpeg';

export const testimonials = [
  {
    name: 'Sirlane Fernandes',
    role: 'Scrum Master',
    image: sirlaneImg,
    quote: 'Tive a honra de conhecer o trabalho do Alex Seles desde o nascimento da iTRecruiter, participando de lives e bootcamps que tiveram um impacto enorme na minha trajetória profissional. Um sonho que parecia não ser possível foi-se aproximando graças à orientação de um mestre dedicado, generoso e sincero. Fui orientada a tirar as certificações PSM I e PSPO I, a reformular o meu currículo e a tornar o meu LinkedIn estratégico. Alcancei a vaga que almejava como Scrum Master. Mais do que um mentor nesta caminhada, ganhei um amigo para a vida.'
  },
  {
    name: 'Carolina Uchôa',
    role: 'AI Project Manager',
    image: carolinaImg,
    quote: 'Para aqueles que procuram um direcionamento na carreira profissional para a área tecnológica e projetos, o Alex é a escolha ideal. Alex é um profissional muito experiente e compartilha insights valiosos. Os encontros com ele são muito proveitosos e esclarecedores. O que eu acho incrível é que, além da teoria, ele mostra na prática como fazer no mundo real. Definitivamente, um grande mentor.'
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Rotação automática a cada 7 segundos com pausa no hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Gestos táticos de swipe em dispositivos móveis
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = testimonials[currentIndex];

  return (
    <section 
      id="depoimentos" 
      aria-labelledby="depoimentos-title"
      className="py-16 sm:py-24 bg-white text-[#163758] border-b border-slate-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Cabeçalho da Secção */}
        <div className="mb-10 sm:mb-12">
          <span className="eyebrow">
            Depoimentos
          </span>
          <h2 
            id="depoimentos-title" 
            className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]"
          >
            Histórias de quem acelerou a sua transição para TI.
          </h2>
        </div>

        {/* Carrossel Padrão Bootstrap / React */}
        <div className="relative bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-8 sm:p-12 shadow-xs transition-all duration-300">
          
          {/* Ícone de Aspas decorativo */}
          <div className="flex justify-center mb-6 text-[#1A73E8]/25" aria-hidden="true">
            <Quote className="w-10 h-10 rotate-180" />
          </div>

          {/* Testemunho */}
          <div className="min-h-[160px] sm:min-h-[130px] flex items-center justify-center">
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-sans italic max-w-2xl mx-auto">
              “{current.quote}”
            </p>
          </div>

          {/* Foto, Nome e Cargo */}
          <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-col items-center">
            <img 
              src={current.image} 
              alt={current.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#1A73E8]/30 shadow-xs mb-3"
              loading="lazy"
            />
            <h3 className="text-lg sm:text-xl font-bold text-[#163758]">
              {current.name}
            </h3>
            <p className="text-sm font-semibold text-[#1557B0]">
              {current.role}
            </p>
          </div>

          {/* Botões de Navegação Anterior e Seguinte */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Depoimento anterior"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:border-[#1A73E8] hover:text-[#1A73E8] flex items-center justify-center text-slate-600 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próximo depoimento"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:border-[#1A73E8] hover:text-[#1A73E8] flex items-center justify-center text-slate-600 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Indicadores de Paginação (Dots) */}
        <div className="flex justify-center items-center gap-2.5 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para o depoimento ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex 
                  ? 'w-8 bg-[#1A73E8]' 
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
