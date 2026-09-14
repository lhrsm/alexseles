import React from 'react';
import { Briefcase, Layers, Award, Clock, HelpCircle } from 'lucide-react';
import {
  CurrentWorkStatus,
  ExperienceRange,
  PreQualificationFormData,
  ProfessionalArea,
  SeniorityLevel
} from './types';

interface Step2CareerProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const PROFESSIONAL_AREAS: ProfessionalArea[] = [
  'Engenharia de Software',
  'Produto',
  'Dados/IA',
  'Design',
  'Liderança Técnica',
  'Outra'
];

const EXPERIENCE_RANGES: ExperienceRange[] = [
  '0-2 anos',
  '3-5 anos',
  '5-7 anos',
  '8-10 anos',
  '10+ anos'
];

const SENIORITY_LEVELS: SeniorityLevel[] = [
  'Júnior',
  'Pleno',
  'Sênior',
  'Especialista/Tech Lead',
  'Gestão/Diretoria'
];

const WORK_STATUSES: CurrentWorkStatus[] = [
  'Empregado no Brasil',
  'Empregado no Exterior',
  'Prestador PJ Internacional',
  'Em transição'
];

export const Step2Career: React.FC<Step2CareerProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Trajetória, Nível Técnico & Desafios
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Permite calibrar as expectativas de liderança e os requisitos para posições internacionais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Cargo Atual ou Ultimo */}
        <div>
          <label
            htmlFor="currentRole"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Cargo Atual ou Último Cargo <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              placeholder="Ex: Senior Software Engineer / Tech Lead"
              value={formData.currentRole}
              onChange={(e) => updateFormData({ currentRole: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.currentRole ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            />
          </div>
          {errors.currentRole && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.currentRole}</p>
          )}
        </div>

        {/* Area Profissional */}
        <div>
          <label
            htmlFor="professionalArea"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Área Profissional <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="professionalArea"
              name="professionalArea"
              value={formData.professionalArea}
              onChange={(e) =>
                updateFormData({
                  professionalArea: e.target.value as ProfessionalArea
                })
              }
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.professionalArea ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione a sua principal área</option>
              {PROFESSIONAL_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          {errors.professionalArea && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.professionalArea}</p>
          )}
        </div>

        {/* Anos de Experiencia Total */}
        <div>
          <label
            htmlFor="experienceYears"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Anos de Experiência Total <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="experienceYears"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={(e) =>
                updateFormData({
                  experienceYears: e.target.value as ExperienceRange
                })
              }
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.experienceYears ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione o tempo de experiência</option>
              {EXPERIENCE_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          {errors.experienceYears && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.experienceYears}</p>
          )}
        </div>

        {/* Senioridade Atual */}
        <div>
          <label
            htmlFor="seniority"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Senioridade Atual <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Award className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="seniority"
              name="seniority"
              value={formData.seniority}
              onChange={(e) =>
                updateFormData({
                  seniority: e.target.value as SeniorityLevel
                })
              }
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.seniority ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione a senioridade</option>
              {SENIORITY_LEVELS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {errors.seniority && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.seniority}</p>
          )}
        </div>

        {/* Situacao Profissional Atual */}
        <div className="sm:col-span-2">
          <label
            htmlFor="workStatus"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Situação Profissional Atual <span className="text-red-500">*</span>
          </label>
          <select
            id="workStatus"
            name="workStatus"
            value={formData.workStatus}
            onChange={(e) =>
              updateFormData({
                workStatus: e.target.value as CurrentWorkStatus
              })
            }
            className={`w-full px-3 py-2.5 bg-white border ${
              errors.workStatus ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
            } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
            required
          >
            <option value="">Selecione o seu enquadramento atual</option>
            {WORK_STATUSES.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.workStatus && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.workStatus}</p>
          )}
        </div>

        {/* Principal Desafio / Objetivo */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="mainChallenge"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Principal Desafio / Objetivo <span className="text-red-500">*</span>
            </label>
            <span
              className={`text-[11px] ${
                formData.mainChallenge.length >= 15
                  ? 'text-emerald-600 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              {formData.mainChallenge.length}/15 caracteres mín.
            </span>
          </div>
          <div className="relative rounded-lg shadow-sm">
            <textarea
              id="mainChallenge"
              name="mainChallenge"
              rows={3}
              placeholder="Descreva o seu maior obstáculo na busca internacional (ex: aprovação em triagens de ATS, posicionamento salarial em Euros/Dólares, entrevistas em inglês ou obtenção de patrocínio de visto)."
              value={formData.mainChallenge}
              onChange={(e) => updateFormData({ mainChallenge: e.target.value })}
              className={`w-full p-3 bg-white border ${
                errors.mainChallenge ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none`}
              required
            />
          </div>
          {errors.mainChallenge && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.mainChallenge}</p>
          )}
        </div>
      </div>
    </div>
  );
};
