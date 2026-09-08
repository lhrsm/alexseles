import React from 'react';
import { Link } from 'react-router-dom';
import eSeImg from '../../assets/e se.png';
import imaginaImg from '../../assets/imagina.png';

export const CareerDiagnosis = () => {
  return (
    <section id="diagnostico-carreira" className="py-16 sm:py-24 bg-[#080E17] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho de Contexto */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="eyebrow">
            Diagnóstico de Carreira
          </span>
          <h2 className="section-title text-white">
            Onde Está e Onde Pode Chegar na Tecnologia
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans max-w-xl mx-auto">
            Mudar de rumo começa com a honestidade de avaliar o seu momento atual e a visão das oportunidades reais que a tecnologia oferece.
          </p>
        </div>

        {/* Grid de 2 Banners Inspirados no Design de Alto Impacto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* BANNER 1: E SE...? / RESPONDA A ESTAS 5 QUESTÕES */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#090D18] via-[#0D1526] to-[#121E36] border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[460px] sm:min-h-[480px]">
            
            {/* Linha Diagonal Sutil no Fundo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute -top-16 left-1/3 w-[1.5px] h-[160%] bg-gradient-to-b from-transparent via-amber-400/30 to-transparent transform -rotate-45" />
            </div>

            {/* Conteúdo Textual à Esquerda com Margem Segura para a Foto */}
            <div className="relative z-10 pr-24 sm:pr-36 md:pr-48 lg:pr-40">
              <span className="text-[11px] font-bold text-amber-400 tracking-widest uppercase block mb-2">
                Situação Atual • Reflexão
              </span>

              <h3 className="font-display font-black italic uppercase tracking-wide text-white text-2xl sm:text-3xl lg:text-3xl leading-tight mb-6">
                Responda a estas 5 questões...
              </h3>

              <ol className="space-y-3.5 text-sm sm:text-base text-slate-200 font-sans leading-snug">
                <li>
                  <strong className="text-amber-400 font-bold mr-1.5">1.</strong>
                  O seu salário mal paga as contas?
                </li>
                <li>
                  <strong className="text-amber-400 font-bold mr-1.5">2.</strong>
                  Tem medo de demissão?
                </li>
                <li>
                  <strong className="text-amber-400 font-bold mr-1.5">3.</strong>
                  Alguma vez já se perguntou: «Porque ainda estou neste emprego?»
                </li>
                <li>
                  <strong className="text-amber-400 font-bold mr-1.5">4.</strong>
                  O seu trabalho é reconhecido?
                </li>
                <li>
                  <strong className="text-amber-400 font-bold mr-1.5">5.</strong>
                  Está feliz com o seu trabalho?
                </li>
              </ol>
            </div>

            {/* Recorte da Foto: e se.png Ancorada na Base Direita */}
            <img 
              src={eSeImg} 
              alt="E se...? Reflexão sobre momento de carreira" 
              className="absolute bottom-0 right-0 max-h-[250px] sm:max-h-[300px] md:max-h-[340px] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-2xl z-0"
              loading="lazy"
            />
          </div>

          {/* BANNER 2: IMAGINE UMA CARREIRA EM QUE... (Estilo Fiel ao Mockup) */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#090C1A] via-[#0E152F] to-[#13224B] border border-blue-500/25 shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[460px] sm:min-h-[480px]">
            
            {/* Linha Diagonal Roxa/Azul (conforme imagem de referência do utilizador) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute -top-16 left-1/3 w-[2px] h-[160%] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transform -rotate-45" />
            </div>

            {/* Conteúdo Textual à Esquerda */}
            <div className="relative z-10 pr-24 sm:pr-36 md:pr-48 lg:pr-40">
              <span className="text-[11px] font-bold text-sky-400 tracking-widest uppercase block mb-2">
                Oportunidade em TI • O Seu Futuro
              </span>

              <h3 className="font-display font-black italic uppercase tracking-wide text-white text-2xl sm:text-3xl lg:text-3xl leading-tight mb-6">
                Imagine uma carreira em que...
              </h3>

              <ol className="space-y-3.5 text-sm sm:text-base text-slate-100 font-sans leading-snug">
                <li>
                  <strong className="text-sky-400 font-bold mr-1.5">1.</strong>
                  Possa trabalhar remotamente, de qualquer lugar do mundo.
                </li>
                <li>
                  <strong className="text-sky-400 font-bold mr-1.5">2.</strong>
                  Os salários são acima da média.
                </li>
                <li>
                  <strong className="text-sky-400 font-bold mr-1.5">3.</strong>
                  A carreira é reconhecida no mundo.
                </li>
                <li>
                  <strong className="text-sky-400 font-bold mr-1.5">4.</strong>
                  Há muitas vagas e poucos profissionais.
                </li>
              </ol>

              {/* Botão de Transição */}
              <div className="mt-8 pt-2">
                <Link
                  to="/transicao-de-carreira"
                  className="btn-copper py-3 px-6 text-xs sm:text-sm font-semibold shadow-xl inline-flex items-center gap-2"
                >
                  <span>Conhecer a Transição para TI</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Recorte da Foto: imagina.png Ancorada na Base Direita */}
            <img 
              src={imaginaImg} 
              alt="Imagine uma carreira internacional em tecnologia" 
              className="absolute bottom-0 right-0 max-h-[250px] sm:max-h-[300px] md:max-h-[340px] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-2xl z-0"
              loading="lazy"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
