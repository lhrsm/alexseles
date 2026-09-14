import React from 'react';
import { Check } from 'lucide-react';
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

const ENGLISH_LEVELS: { value: EnglishLevel; label: string }[] = [
  { value: 'A1/A2 Básico', label: 'A1/A2 — Básico' },
  { value: 'B1 Intermediário', label: 'B1 — Intermediário' },
  { value: 'B2 Independente/Fluente para Trabalho', label: 'B2 — Fluente para Trabalho' },
  { value: 'C1 Avançado', label: 'C1 — Avançado' },
  { value: 'C2 Nativo/Bilíngue', label: 'C2 — Nativo / Bilíngue' }
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
    <div className="space-y-4">
      {/* Mercados de Interesse */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Mercados de Interesse <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MARKET_OPTIONS.map((market) => {
            const isSelected = formData.targetMarkets.includes(market);
            return (
              <button
                type="button"
                key={market}
                onClick={() => toggleMarket(market)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
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
          <p className="mt-1 text-xs text-red-600 font-medium">{errors.targetMarkets}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cidadania Atual */}
        <div>
          <label
            htmlFor="citizenship"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Cidadania <span className="text-red-500">*</span>
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
            className={`w-full px-3 py-2 bg-white border ${
              errors.citizenship ? 'border-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
            required
          >
            <option value="">Selecione a sua cidadania</option>
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
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
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
            className={`w-full px-3 py-2 bg-white border ${
              errors.rightToWork ? 'border-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
            required
          >
            <option value="">Possui visto ou autorização?</option>
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
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
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
            className={`w-full px-3 py-2 bg-white border ${
              errors.migrationDocType ? 'border-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
            required
          >
            <option value="">Selecione o documento</option>
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

        {/* CAMPO CONDICIONAL: Previsao de Conclusao */}
        {isDocumentationInProcess && (
          <div className="sm:col-span-2 bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <label
              htmlFor="processForecast"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Previsão Estimada de Conclusão <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="processForecast"
              name="processForecast"
              placeholder="Ex: Em análise, conclusão em 3 meses"
              value={formData.processForecast}
              onChange={(e) => updateFormData({ processForecast: e.target.value })}
              className={`w-full px-3 py-2 bg-white border ${
                errors.processForecast ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
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
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Nível de Inglês <span className="text-red-500">*</span>
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
            className={`w-full px-3 py-2 bg-white border ${
              errors.englishLevel ? 'border-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
            required
          >
            <option value="">Selecione o nível de inglês</option>
            {ENGLISH_LEVELS.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
          {errors.englishLevel && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.englishLevel}</p>
          )}
        </div>
      </div>
    </div>
  );
};
