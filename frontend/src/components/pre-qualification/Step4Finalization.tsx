import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileText,
  Trash2,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import {
  CommercialReadiness,
  PreQualificationFormData
} from './types';

interface Step4FinalizationProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const COMMERCIAL_OPTIONS: {
  id: CommercialReadiness;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'ready_to_invest',
    title: 'Preparado para investir na aceleração individual',
    subtitle: 'Foco imediato na transição, dedicação e prontidão para mentoria personalizada.'
  },
  {
    id: 'want_conditions_first',
    title: 'Quero conhecer formatos, metodologia e condições',
    subtitle: 'Avaliar o cronograma, etapas da trilha e planos de investimento antes de iniciar.'
  },
  {
    id: 'no_financial_availability',
    title: 'Foco em conteúdos gratuitos no momento',
    subtitle: 'Acesso à Central de Conhecimento, artigos técnicos e materiais da comunidade.'
  }
];

export const Step4Finalization: React.FC<Step4FinalizationProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileProcess = (file: File) => {
    setFileError(null);
    const validExtensions = ['.pdf', '.docx'];
    const lowerName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => lowerName.endsWith(ext));

    if (!isValid) {
      setFileError('Apenas ficheiros com formato .pdf ou .docx são aceites.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('O ficheiro ultrapassa o limite de 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateFormData({
        cvFileName: file.name,
        cvFileSize: file.size,
        cvFileBase64: typeof reader.result === 'string' ? reader.result : undefined
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    updateFormData({
      cvFileName: '',
      cvFileSize: 0,
      cvFileBase64: undefined
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Prontidão & Envio da Avaliação
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Última etapa para submissão e análise confidencial com Alex Seles.
        </p>
      </div>

      <div className="space-y-5">
        {/* Momento de Decisão & Investimento (Commercial Readiness) */}
        <div>
          <label
            htmlFor="commercialReadiness"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Momento de Decisão & Investimento na Mentoria <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="commercialReadiness"
              name="commercialReadiness"
              value={formData.commercialReadiness}
              onChange={(e) =>
                updateFormData({
                  commercialReadiness: e.target.value as CommercialReadiness
                })
              }
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.commercialReadiness ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            >
              <option value="">Selecione o seu momento de decisão</option>
              {COMMERCIAL_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.title} — {opt.subtitle}
                </option>
              ))}
            </select>
          </div>
          {errors.commercialReadiness && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.commercialReadiness}</p>
          )}
        </div>

        {/* Observações Adicionais ou Dúvidas */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <MessageSquare className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <label
              htmlFor="additionalNotes"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Observações ou Questões para Alex Seles
              <span className="font-normal text-slate-400 lowercase ml-1">(opcional)</span>
            </label>
          </div>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={3}
            placeholder="Partilhe alguma dúvida específica sobre a transição, contexto profissional adicional ou expetativas..."
            value={formData.additionalNotes}
            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Upload do Currículo / Histórico Profissional (Opcional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Currículo ou Histórico Profissional Atual
            <span className="font-normal text-slate-400 lowercase ml-1">
              (opcional • formatos .pdf ou .docx, até 10 MB)
            </span>
          </label>
          <p className="text-[11px] text-slate-500 mb-2">
            Permite a Alex Seles mapear as suas competências transferíveis de origem para o mercado tech.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />

          {!formData.cvFileName ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-blue-600 bg-blue-50/50'
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >
              <div className="w-9 h-9 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                <UploadCloud className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                Clique para selecionar ou arraste o seu ficheiro até aqui
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ficheiros aceites: PDF ou Word (.docx)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {formData.cvFileName}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {formatBytes(formData.cvFileSize || 0)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100/60 rounded transition-colors"
                >
                  Trocar
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                  title="Remover ficheiro"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {fileError && <p className="mt-1 text-xs text-red-600 font-medium">{fileError}</p>}
        </div>

        {/* Consentimento RGPD / LGPD */}
        <div className="pt-2 border-t border-slate-100">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="consentLgpd"
              checked={formData.consentLgpd}
              onChange={(e) => updateFormData({ consentLgpd: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              Concordo com o tratamento confidencial dos meus dados para avaliação e diagnóstico profissional de transição de carreira nos termos da{' '}
              <a
                href="/politica-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 font-medium"
              >
                Política de Privacidade (RGPD & LGPD)
              </a>
              . <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consentLgpd && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.consentLgpd}</p>
          )}
        </div>
      </div>
    </div>
  );
};
