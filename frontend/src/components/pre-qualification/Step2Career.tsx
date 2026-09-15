import React from 'react';
import { Briefcase, Layers, Clock, Terminal } from 'lucide-react';
import {
  OriginArea,
  PreQualificationFormData,
  TechFamiliarity,
  TotalCareerExperience
} from './types';

interface Step2CareerProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const ORIGIN_AREAS: OriginArea[] = [
  'Direito / Jurídico',
  'Engenharia Tradicional (Civil, Mecânica, etc.)',
  'Administração, Gestão & Finanças',
  'Contabilidade & Controladoria',
  'Educação & Formação',
  'Saúde & Biológicas',
  'Vendas, Comercial & Atendimento',
  'Comunicação, Marketing & Design',
  'Outra Área Profissional'
];

const TOTAL_EXPERIENCE_OPTIONS: TotalCareerExperience[] = [
  '1 a 2 anos (Início de carreira)',
  '3 a 5 anos (Profissional consolidado)',
  '6 a 10 anos (Sénior na área atual)',
  '10+ anos (Liderança / Gestão prévia)'
];

const TECH_FAMILIARITY_OPTIONS: { id: TechFamiliarity; label: string; desc: string }[] = [
  {
    id: 'Iniciante absoluto (começar do zero)',
    label: 'Iniciante absoluto',
    desc: 'Sem experiência prévia com código, quero começar do zero com método.'
  },
  {
    id: 'Estudo autodidata (cursos online, lógica básica)',
    label: 'Estudo autodidata',
    desc: 'Já fiz cursos online, li tutoriais ou estudei lógica de programação básica.'
  },
  {
    id: 'Praticante (já criei pequenos scripts ou projetos)',
    label: 'Praticante',
    desc: 'Já criei pequenos scripts, automações ou projetos práticos simples.'
  },
  {
    id: 'Contacto profissional (trabalho próximo de devs/TI)',
    label: 'Contacto profissional',
    desc: 'Trabalho ou já trabalhei próximo a equipas de desenvolvimento e tecnologia.'
  }
];

export const Step2Career: React.FC<Step2CareerProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Bagagem Profissional de Origem
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          A sua trajetória anterior possui competências transferíveis de alto valor para tecnologia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Área Profissional de Origem */}
        <div>
          <label
            htmlFor="originArea"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Área de Origem / Formação <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="originArea"
              name="originArea"
              value={formData.originArea}
              onChange={(e) =>
                updateFormData({
                  originArea: e.target.value as OriginArea
                })
              }
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.originArea ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            >
              <option value="">Selecione a sua área profissional</option>
              {ORIGIN_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          {errors.originArea && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.originArea}</p>
          )}
        </div>

        {/* Cargo Atual ou Mais Recente */}
        <div>
          <label
            htmlFor="currentRole"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Cargo Atual ou Mais Recente <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              placeholder="Ex: Advogado, Engenheiro Civil, Gerente de Vendas..."
              value={formData.currentRole}
              onChange={(e) => updateFormData({ currentRole: e.target.value })}
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.currentRole ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            />
          </div>
          {errors.currentRole && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.currentRole}</p>
          )}
        </div>

        {/* Tempo Total de Carreira */}
        <div className="sm:col-span-2">
          <label
            htmlFor="totalCareerExperience"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Tempo Total de Carreira Profissional <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="totalCareerExperience"
              name="totalCareerExperience"
              value={formData.totalCareerExperience}
              onChange={(e) =>
                updateFormData({
                  totalCareerExperience: e.target.value as TotalCareerExperience
                })
              }
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.totalCareerExperience ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            >
              <option value="">Selecione o tempo total de carreira</option>
              {TOTAL_EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {errors.totalCareerExperience && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.totalCareerExperience}</p>
          )}
        </div>

        {/* Familiaridade com TI / Programação */}
        <div className="sm:col-span-2 space-y-2 pt-1">
          <div className="flex items-center gap-1.5 mb-1">
            <Terminal className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nível de Familiaridade com Tecnologia & Programação <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TECH_FAMILIARITY_OPTIONS.map((item) => {
              const isSelected = formData.techFamiliarity === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => updateFormData({ techFamiliarity: item.id })}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.label}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
          {errors.techFamiliarity && (
            <p className="text-xs text-red-600 font-medium">{errors.techFamiliarity}</p>
          )}
        </div>
      </div>
    </div>
  );
};
