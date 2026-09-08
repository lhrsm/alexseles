import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WhatsAppSimulatedChat } from '../chat/WhatsAppSimulatedChat';
import mafaldaImg from '../../assets/mafalda.png';

export const FloatingContact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/backoffice' || location.pathname === '/admin') {
    return null;
  }

  return (
    <>
      {/* Widget Interativo de Chat WhatsApp Simulado */}
      <WhatsAppSimulatedChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Botão Flutuante Circular de Mafalda Silva no Canto Inferior Direito (Substituindo o Voltar ao Topo) */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="relative flex items-center justify-center group focus:outline-none select-none"
            aria-label="Falar com Mafalda, atendente virtual"
            title="Falar com Mafalda, atendente virtual"
          >
            {/* Tooltip ao passar o rato (hover) */}
            <div className="hidden sm:flex items-center gap-2 absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-lg shadow-2xl whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>Falar com Mafalda, atendente virtual</span>
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900/95" aria-hidden="true" />
            </div>

            {/* Avatar Circular de Mafalda Silva */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-white shadow-2xl ring-2 ring-[#1A73E8]/40 group-hover:ring-[#1A73E8] group-hover:scale-105 active:scale-95 transition-all duration-200">
              <img
                src={mafaldaImg}
                alt="Mafalda Silva - Atendente Virtual"
                className="w-full h-full rounded-full object-cover"
              />
              {/* Indicador de Disponibilidade Online */}
              <span
                className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      )}
    </>
  );
};
