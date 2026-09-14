import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileText,
  Trash2,
  DollarSign,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  Availability,
  CommercialReadiness,
  PreQualificationFormData,
  WorkPreference
} from './types';

interface Step4FinalizationProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const WORK_PREFERENCES: WorkPreference[] = [
  '100% Remoto',
  'Híbrido',
  'Presencial com Relocação'
];

const AVAILABILITY_OPTIONS: Availability[] = [
  'Imediata',
  '30 dias',
  '60 dias',
  '90+ dias'
];

const COMMERCIAL_OPTIONS: {
  id: CommercialReadiness;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'ready_to_invest',
    title: 'Preparado para investir na mentoria',
    subtitle: 'Compromisso com o processo e decisão imediata.'
  },
  {
    id: 'want_conditions_first',
    title: 'Quero conhecer formatos e condições antes',
    subtitle: 'Avaliar propostas e metodologia antes de avançar.'
  },
  {
    id: 'no_financial_availability',
    title: 'Apenas conteúdos gratuitos no momento',
    subtitle: 'Acesso a artigos e publicações públicas.'
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
          Remuneração & Decisão
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Última etapa para envio da avaliação.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Modalidade de Trabalho */}
        <div>
          <label
            htmlFor="workPreference"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Modalidade de Trabalho Desejada <span className="text-red-500">*</span>
          </label>
          <select
            id="workPreference"
            name="workPreference"
            value={formData.workPreference}
            onChange={(e) =>
              updateFormData({
                workPreference: e.target.value as WorkPreference
              })
            }
            className={`w-full px-3 py-2.5 bg-white border ${
              errors.workPreference ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
            required
          >
            <option value="">Selecione o modelo pretendido</option>
            {WORK_PREFERENCES.map((wp) => (
              <option key={wp} value={wp}>
                {wp}
              </option>
            ))}
          </select>
          {errors.workPreference && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.workPreference}</p>
          )}
        </div>

        {/* Disponibilidade para Inicio */}
        <div>
          <label
            htmlFor="availability"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Disponibilidade para Início / Mudança <span className="text-red-500">*</span>
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={(e) =>
              updateFormData({
                availability: e.target.value as Availability
              })
            }
            className={`w-full px-3 py-2.5 bg-white border ${
              errors.availability ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
            required
          >
            <option value="">Selecione a sua disponibilidade</option>
            {AVAILABILITY_OPTIONS.map((av) => (
              <option key={av} value={av}>
                {av}
              </option>
            ))}
          </select>
          {errors.availability && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.availability}</p>
          )}
        </div>

        {/* Pretensao Salarial Minima */}
        <div className="sm:col-span-2">
          <label
            htmlFor="salaryExpectation"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Pretensão Salarial Mínima <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <DollarSign className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="salaryExpectation"
              name="salaryExpectation"
              placeholder="Ex: € 4.500 / mês ou $ 80.000 / ano"
              value={formData.salaryExpectation}
              onChange={(e) => updateFormData({ salaryExpectation: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.salaryExpectation
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            />
          </div>
          {errors.salaryExpectation && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.salaryExpectation}</p>
          )}
        </div>

        {/* Upload do Curriculo (CV) */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Currículo Atualizado (CV)
            <span className="font-normal text-slate-400 lowercase ml-1">
              (formatos .pdf ou .docx, até 10 MB)
            </span>
          </label>

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
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-blue-600 bg-blue-50/50'
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                <UploadCloud className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Clique para selecionar ou arraste o seu ficheiro até aqui
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Ficheiros suportados: PDF ou Word (.docx)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {formData.cvFileName}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    {formatBytes(formData.cvFileSize)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100/60 rounded transition-colors"
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

        {/* Momento de Decisao & Investimento (Commercial Readiness) */}
        <div className="sm:col-span-2 space-y-2.5 pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Momento de Decisão & Investimento <span className="text-red-500">*</span>
          </label>

          <div className="space-y-2.5">
            {COMMERCIAL_OPTIONS.map((opt) => {
              const isSelected = formData.commercialReadiness === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => updateFormData({ commercialReadiness: opt.id })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="pt-0.5">
                    {isSelected ? (
                      <CheckCircle2
                        className="w-4 h-4 text-blue-600 stroke-[2.5]"
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{opt.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.commercialReadiness && (
            <p className="text-xs text-red-600 font-medium">{errors.commercialReadiness}</p>
          )}
        </div>

        {/* Consentimento LGPD / GDPR */}
        <div className="sm:col-span-2 pt-2 border-t border-slate-100">
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
              Concordo com o tratamento confidencial dos meus dados para avaliação e diagnóstico profissional nos termos da{' '}
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
