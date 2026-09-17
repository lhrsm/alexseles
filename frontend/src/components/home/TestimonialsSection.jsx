import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import sirlaneImg from '../../assets/sirlane.jpg';
import carolinaImg from '../../assets/carolinaughoa.jpeg';
import fabioImg from '../../assets/fabio.jpg';
import joseImg from '../../assets/joseconceicao.jpg';
import louisImg from '../../assets/louismenezes.jpg';

export const testimonials = [
  {
    name: 'Sirlane Fernandes',
    role: 'Scrum Master',
    image: sirlaneImg,
    quote: 'Comecei participando de lives e bootcamps que tiveram um impacto enorme na minha trajetória profissional. Um sonho que parecia não ser possível foi-se aproximando graças à orientação de um mestre dedicado, generoso e sincero. Fui orientada a tirar as certificações PSM I e PSPO I, a reformular o meu currículo e a tornar o meu LinkedIn estratégico. Alcancei a vaga que almejava como Scrum Master. Mais do que um mentor nesta caminhada, ganhei um amigo para a vida.'
  },
  {
    name: 'Carolina Uchôa',
    role: 'AI Project Manager',
    image: carolinaImg,
    quote: 'Para aqueles que procuram um direcionamento na carreira profissional para a área tecnológica e projetos, o Alex é a escolha ideal. Alex é um profissional muito experiente e compartilha insights valiosos. Os encontros com ele são muito proveitosos e esclarecedores. O que eu acho incrível é que, além da teoria, ele mostra na prática como fazer no mundo real. Definitivamente, um grande mentor.'
  },
  {
    name: 'Fábio Santos',
    role: 'IT Project Manager',
    image: fabioImg,
    quote: 'Com a mentoria do Alex Seles, reestruturei totalmente o meu posicionamento para a liderança de projetos em tecnologia. Aprendi a coordenar equipas multidisciplinares, alinhar prazos com metodologias ágeis e garantir previsibilidade técnica de ponta a ponta. Conquistei a minha vaga como IT Project Manager com total segurança.'
  },
  {
    name: 'José Conceição',
    role: 'IT Project Manager',
    image: joseImg,
    quote: 'A mentoria executiva do Alex Seles foi determinante para a minha consolidação como IT Project Manager. O seu método prático permitiu-me estruturar processos de entrega de valor, gerir equipas ágeis e assegurar previsibilidade técnica em projetos complexos. Uma orientação que transforma a carreira de qualquer profissional.'
  },
  {
    name: 'Louis Menezes',
    role: 'Service Manager',
    image: louisImg,
    quote: 'O direcionamento do Alex em gestão de serviços de TI (ITIL 4), governação operacional e gestão contínua de SLAs foi um acelerador brutal para a minha carreira. Ensina o que as multinacionais realmente exigem em ambientes críticos. Hoje atuo como Service Manager com elevada autonomia e maturidade técnica.'
  },
  {
    name: 'Mariana Carvalho',
    role: 'Scrum Master',
    image: null,
    quote: 'A mentoria com o Alex Seles foi determinante para a minha evolução e transição para o universo ágil. Com a sua facilitação e mentoria prática, dominei os ritos, a remoção de impedimentos e o desenvolvimento de equipas de alta performance. Hoje atuo com confiança como Scrum Master em projetos de impacto.'
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Deteção responsiva para alternar entre 1 cartão (mobile) e 2 cartões (desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
  };

  // Garante que o índice permanece válido caso haja redimensionamento de ecrã
  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(0);
    }
  }, [totalPages, currentIndex]);

  // Rotação automática suave a cada 7 segundos, com pausa no hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  // Gestos táteis de swipe para ecrãs móveis
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

  const currentItems = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <span className="eyebrow">
            Depoimentos & Histórias Reais
          </span>
          <h2 
            id="depoimentos-title" 
            className="section-title text-2xl sm:text-3xl lg:text-4xl text-[#163758]"
          >
            Histórias de quem acelerou a sua transição para TI.
          </h2>
          <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed font-sans">
            Resultados mensuráveis de profissionais que transformaram a sua formação anterior em posições estratégicas de tecnologia com a mentoria de Alex Seles.
          </p>
        </div>

        {/* Contentor do Carrossel com Controlos Laterais */}
        <div className="relative">
          
          {/* Grelha Responsiva: 1 por slide no telemóvel, 2 por slide no computador/tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {currentItems.map((item, idx) => (
              <article 
                key={`${currentIndex}-${idx}`}
                className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#1A73E8]/40 hover:shadow-md transition-all duration-300 text-left h-full group"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#1A73E8]/20 rotate-180 mb-4" aria-hidden="true" />
                  <blockquote className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans italic">
                    “{item.quote}”
                  </blockquote>
                </div>

                {/* Bloco de Autor: Foto, Nome e Cargo */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3.5">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#1A73E8]/30 shadow-2xs shrink-0 group-hover:border-[#1A73E8] transition-colors"
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 border-2 border-[#1A73E8]/30 text-[#1A73E8] font-bold text-sm sm:text-base flex items-center justify-center shadow-2xs shrink-0 group-hover:border-[#1A73E8] transition-colors"
                      aria-label={item.name}
                    >
                      {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#163758] leading-tight font-sans">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#1557B0]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Botão Anterior */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Depoimentos anteriores"
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-md hover:border-[#1A73E8] hover:text-[#1A73E8] items-center justify-center text-[#163758] transition-all cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Botão Seguinte */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próximos depoimentos"
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-md hover:border-[#1A73E8] hover:text-[#1A73E8] items-center justify-center text-[#163758] transition-all cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Botões móveis + Indicadores de Paginação */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Página anterior"
            className="sm:hidden w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir para a página de depoimentos ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-8 bg-[#1A73E8]' 
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próxima página"
            className="sm:hidden w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
