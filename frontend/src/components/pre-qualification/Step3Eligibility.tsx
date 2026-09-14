import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import {
  Citizenship,
  EnglishLevel,
  MarketOption,
  MigrationDocType,
  PreQualificationFormData,
  RightToWork
} from './types';

interface Step3EligibilityProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const MARKET_OPTIONS: MarketOption[] = [
  'Portugal',
  'Espanha',
  'Reino Unido',
  'Europa Geral',
  'EUA/Canadá',
  'Remoto Global'
];

const CITIZENSHIP_OPTIONS: Citizenship[] = [
  'Brasileira',
  'Europeia/Dupla',
  'Outra'
];

const RIGHT_TO_WORK_OPTIONS: RightToWork[] = ['Sim', 'Não', 'Em processo'];

const MIGRATION_DOC_TYPES: MigrationDocType[] = [
  'Cidadania Europeia',
  'Visto de Trabalho',
  'Cartão de Residência',
  'Nômade Digital',
  'Em processo',
  'Não possuo'
];

const ENGLISH_LEVELS: { value: EnglishLevel; description: string }[] = [
  {
    value: 'A1/A2 Básico',
    description: 'Compreensão de frases simples, conversação muito limitada.'
  },
  {
    value: 'B1 Intermediário',
    description: 'Comunicação direta para tarefas diárias, vocabulário em desenvolvimento.'
  },
  {
    value: 'B2 Independente/Fluente para Trabalho',
    description: 'Capacidade de participar em reuniões técnicas e articular decisões com fluidez.'
  },
  {
    value: 'C1 Avançado',
    description: 'Negociação executiva, apresentações estratégicas e escrita complexa.'
  },
  {
    value: 'C2 Nativo/Bilíngue',
    description: 'Domínio idiomático equivalente a falante nativo.'
  }
];

export const Step3Eligibility: React.FC<Step3EligibilityProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  const toggleMarket = (market: MarketOption) => {
    const current = [...formData.targetMarkets];
    const index = current.indexOf(market);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(market);
    }
    updateFormData({ targetMarkets: current });
  };

  const isDocumentationInProcess =
    formData.rightToWork === 'Em processo' ||
    formData.migrationDocType === 'Em processo';

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Elegibilidade, Documentação & Idiomas
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Critérios legais e linguísticos essenciais para a validação das vagas e patrocínios internacionais.
        </p>
      </div>

      <div className="space-y-5">
        {/* Mercados / Paises de Interesse (Pills/Tags) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Mercados de Interesse <span className="text-red-500">*</span>
            <span className="font-normal text-slate-400 lowercase ml-1">
              (selecione pelo menos um)
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {MARKET_OPTIONS.map((market) => {
              const isSelected = formData.targetMarkets.includes(market);
              return (
                <button
                  type="button"
                  key={market}
                  onClick={() => toggleMarket(market)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm ring-1 ring-blue-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" aria-hidden="true" />
                  )}
                  <span>{market}</span>
                </button>
              );
            })}
          </div>
          {errors.targetMarkets && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.targetMarkets}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Cidadania Atual */}
          <div>
            <label
              htmlFor="citizenship"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Cidadania Atual <span className="text-red-500">*</span>
            </label>
            <select
              id="citizenship"
              name="citizenship"
              value={formData.citizenship}
              onChange={(e) =>
                updateFormData({
                  citizenship: e.target.value as Citizenship
                })
              }
              className={`w-full px-3 py-2.5 bg-white border ${
                errors.citizenship ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione a sua cidadania principal</option>
              {CITIZENSHIP_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.citizenship && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.citizenship}</p>
            )}
          </div>

          {/* Direito de Trabalho */}
          <div>
            <label
              htmlFor="rightToWork"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Direito de Trabalho no Mercado Alvo <span className="text-red-500">*</span>
            </label>
            <select
              id="rightToWork"
              name="rightToWork"
              value={formData.rightToWork}
              onChange={(e) =>
                updateFormData({
                  rightToWork: e.target.value as RightToWork
                })
              }
              className={`w-full px-3 py-2.5 bg-white border ${
                errors.rightToWork ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Possui visto ou autorização de trabalho?</option>
              {RIGHT_TO_WORK_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.rightToWork && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.rightToWork}</p>
            )}
          </div>

          {/* Tipo de Documentacao */}
          <div className="sm:col-span-2">
            <label
              htmlFor="migrationDocType"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Tipo de Documentação Migratória <span className="text-red-500">*</span>
            </label>
            <select
              id="migrationDocType"
              name="migrationDocType"
              value={formData.migrationDocType}
              onChange={(e) =>
                updateFormData({
                  migrationDocType: e.target.value as MigrationDocType
                })
              }
              className={`w-full px-3 py-2.5 bg-white border ${
                errors.migrationDocType
                  ? 'border-red-500 ring-1 ring-red-500'
                  : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione a sua condição documental</option>
              {MIGRATION_DOC_TYPES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {errors.migrationDocType && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.migrationDocType}</p>
            )}
          </div>

          {/* CAMPO CONDICIONAL: Previsao de Conclusao de Documentacao */}
          {isDocumentationInProcess && (
            <div className="sm:col-span-2 bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>Previsão Estimada de Conclusão da Documentação *</span>
              </div>
              <p className="text-xs text-blue-800">
                Como indicou que o processo está em andamento, informe a estimativa de emissão ou agendamento oficial.
              </p>
              <input
                type="text"
                id="processForecast"
                name="processForecast"
                placeholder="Ex: Em análise no consulado, conclusão prevista para 3 meses"
                value={formData.processForecast}
                onChange={(e) => updateFormData({ processForecast: e.target.value })}
                className={`w-full px-3 py-2.5 bg-white border ${
                  errors.processForecast
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-blue-300'
                } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
                required
              />
              {errors.processForecast && (
                <p className="text-xs text-red-600 font-medium">{errors.processForecast}</p>
              )}
            </div>
          )}

          {/* Nivel de Ingles */}
          <div className="sm:col-span-2">
            <label
              htmlFor="englishLevel"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Nível de Proficiência em Inglês <span className="text-red-500">*</span>
            </label>
            <select
              id="englishLevel"
              name="englishLevel"
              value={formData.englishLevel}
              onChange={(e) =>
                updateFormData({
                  englishLevel: e.target.value as EnglishLevel
                })
              }
              className={`w-full px-3 py-2.5 bg-white border ${
                errors.englishLevel ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione o seu nível de inglês</option>
              {ENGLISH_LEVELS.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.value} — {lvl.description}
                </option>
              ))}
            </select>
            {errors.englishLevel && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.englishLevel}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
