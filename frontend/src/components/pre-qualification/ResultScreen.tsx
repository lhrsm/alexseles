import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { LeadClassification, PreQualificationFormData } from './types';

interface ResultScreenProps {
  classification: LeadClassification;
  formData: PreQualificationFormData;
  onReset: () => void;
  onClose: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  classification,
  formData,
  onReset,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const copyWhatsAppLink = () => {
    if (classification.whatsappUrl) {
      navigator.clipboard.writeText(classification.whatsappUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="py-2 sm:py-4 space-y-6">
      {/* ----------------------------------------------------------- */}
      {/* CASO 1: LEAD A — PRIORITÁRIO (VIP)                         */}
      {/* ----------------------------------------------------------- */}
      {classification.category === 'LEAD_A' && (
        <div className="text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 border-4 border-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" aria-hidden="true" />
          </div>

          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              {classification.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              {classification.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {classification.summary}
            </p>
          </div>

          {/* Destaque dos Motivos da Qualificacao */}
          <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Destaques da Triagem Executiva
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {classification.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botao de Acao WhatsApp VIP */}
          <div className="max-w-md mx-auto pt-2 space-y-2.5">
            {classification.whatsappUrl && (
              <a
                href={classification.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i>
                <span>Conversar com Alex Seles no WhatsApp</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={copyWhatsAppLink}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 font-medium py-1 px-2 rounded hover:bg-slate-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span className="text-emerald-700">Ligação copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copiar ligação do WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* CASO 2: LEAD B — AVALIAÇÃO MANUAL                         */}
      {/* ----------------------------------------------------------- */}
      {classification.category === 'LEAD_B' && (
        <div className="text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-blue-100 border-4 border-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" aria-hidden="true" />
          </div>

          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              {classification.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              {classification.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {classification.summary}
            </p>
          </div>

          {/* Destaque da Triagem */}
          <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Próximos Passos
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">•</span>
                <span>Análise individual do seu perfil e experiência por Alex Seles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">•</span>
                <span>Contacto direto pelo WhatsApp ({formData.phone || 'indicado'}) em até 48 horas úteis.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 max-w-sm mx-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              Concluir e Aguardar Contacto
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* CASO 3: LEAD C — CONTEÚDO / VAGAS PÚBLICAS                */}
      {/* ----------------------------------------------------------- */}
      {classification.category === 'LEAD_C' && (
        <div className="text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-slate-100 border-4 border-slate-50 flex items-center justify-center text-slate-600 shadow-sm">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" aria-hidden="true" />
          </div>

          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              {classification.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              {classification.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {classification.summary}
            </p>
          </div>

          {/* Links e Conteudos Gratuitos Recomendados */}
          <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recursos Recomendados para Evolução Imediata
            </h4>
            <div className="space-y-2">
              <a
                href="/central-de-conhecimento"
                className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-colors group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                    Central de Conhecimento & Artigos
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Guias sobre ATS, transição de carreira e governança técnica.
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </a>

              <a
                href="/transicao-de-carreira"
                className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-colors group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                    Visão Geral dos Fundamentos de TI
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Trilha metodológica passo a passo para consolidação técnica.
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </a>
            </div>
          </div>

          <div className="pt-2 max-w-sm mx-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              Explorar Materiais Gratuitos
            </button>
          </div>
        </div>
      )}

      {/* Rodape de Reinicio / Nova Avaliacao */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Realizar nova avaliação</span>
        </button>
      </div>
    </div>
  );
};
