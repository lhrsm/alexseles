import React from 'react';
import { Compass, AlertCircle, Clock, Globe2, Check } from 'lucide-react';
import {
  EnglishLevel,
  MainTransitionChallenge,
  PreQualificationFormData,
  TargetTechTrack,
  WeeklyStudyTime
} from './types';

interface Step3EligibilityProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const TARGET_TECH_TRACKS: { id: TargetTechTrack; title: string; subtitle: string }[] = [
  {
    id: 'Ciclo de Desenvolvimento de Software (SDLC & Programação)',
    title: 'Ciclo de Desenvolvimento de Software (SDLC & Programação)',
    subtitle: 'Arquitetura, desenvolvimento web moderno, boas práticas de código e deploy.'
  },
  {
    id: 'Inteligência Artificial Aplicada & Prompt Engineering',
    title: 'Inteligência Artificial Aplicada & Prompt Engineering',
    subtitle: 'Automação inteligente, agentes de IA, engenharia de contexto e LLMs.'
  },
  {
    id: 'Gestão de Projetos de TI & Métodos Ágeis (Scrum/Kanban)',
    title: 'Gestão de Projetos de TI & Métodos Ágeis (Scrum/Kanban)',
    subtitle: 'Liderança ágil, gestão de entregas, facilitação técnica e governança de equipas.'
  },
  {
    id: 'Governação de TI, Produto & Qualidade',
    title: 'Governação de TI, Produto & Qualidade',
    subtitle: 'Gestão de produto tech, padrões de qualidade, requisitos e segurança.'
  },
  {
    id: 'Quero orientação do Alex Seles para escolher a trilha ideal',
    title: 'Orientação personalizada com Alex Seles',
    subtitle: 'Avaliar a minha bagagem de origem e definir o nicho mais promissor e rentável.'
  }
];

const MAIN_CHALLENGES: MainTransitionChallenge[] = [
  'Excesso de informação dispersa e falta de método',
  'Insegurança em recomeçar ou síndrome do impostor',
  'Falta de projetos práticos e portfólio no GitHub',
  'Currículo e LinkedIn sem destaque para vagas de TI',
  'Dificuldade em conquistar as primeiras entrevistas técnicas'
];

const WEEKLY_STUDY_TIMES: WeeklyStudyTime[] = [
  '5 a 10 horas semanais',
  '10 a 20 horas semanais',
  '20+ horas semanais (dedicação intensiva)'
];

const ENGLISH_LEVELS: { id: EnglishLevel; label: string; desc: string }[] = [
  {
    id: 'Básico (em aprendizagem)',
    label: 'Básico',
    desc: 'Compreensão introdutória, vocabulário inicial em desenvolvimento.'
  },
  {
    id: 'Intermediário (leitura técnica confortável)',
    label: 'Intermediário',
    desc: 'Leitura confortável de documentação técnica, manuais e enunciados.'
  },
  {
    id: 'Avançado / Fluente para Trabalho',
    label: 'Avançado / Fluente',
    desc: 'Comunicação fluida para reuniões de equipa e entrevistas internacionais.'
  }
];

export const Step3Eligibility: React.FC<Step3EligibilityProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Metas de Transição & Desafios
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Defina o foco pretendido em tecnologia e a sua disponibilidade de dedicação.
        </p>
      </div>

      {/* Trilha Tecnológica Pretendida */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Trilha Tecnológica Pretendida <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="space-y-2">
          {TARGET_TECH_TRACKS.map((track) => {
            const isSelected = formData.targetTechTrack === track.id;
            return (
              <button
                type="button"
                key={track.id}
                onClick={() => updateFormData({ targetTechTrack: track.id })}
                className={`w-full p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {track.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {track.subtitle}
                  </p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
        {errors.targetTechTrack && (
          <p className="text-xs text-red-600 font-medium">{errors.targetTechTrack}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Maior Desafio na Transição */}
        <div className="sm:col-span-2">
          <label
            htmlFor="mainTransitionChallenge"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Maior Obstáculo ou Desafio na Transição <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="mainTransitionChallenge"
              name="mainTransitionChallenge"
              value={formData.mainTransitionChallenge}
              onChange={(e) =>
                updateFormData({
                  mainTransitionChallenge: e.target.value as MainTransitionChallenge
                })
              }
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.mainTransitionChallenge ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            >
              <option value="">Selecione o seu maior desafio atual</option>
              {MAIN_CHALLENGES.map((challenge) => (
                <option key={challenge} value={challenge}>
                  {challenge}
                </option>
              ))}
            </select>
          </div>
          {errors.mainTransitionChallenge && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.mainTransitionChallenge}</p>
          )}
        </div>

        {/* Dedicação Semanal */}
        <div>
          <label
            htmlFor="weeklyStudyTime"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Dedicação Semanal para Estudo <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="weeklyStudyTime"
              name="weeklyStudyTime"
              value={formData.weeklyStudyTime}
              onChange={(e) =>
                updateFormData({
                  weeklyStudyTime: e.target.value as WeeklyStudyTime
                })
              }
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.weeklyStudyTime ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            >
              <option value="">Horas semanais disponíveis</option>
              {WEEKLY_STUDY_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          {errors.weeklyStudyTime && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.weeklyStudyTime}</p>
          )}
        </div>

        {/* Nível de Inglês */}
        <div>
          <label
            htmlFor="englishLevel"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Nível de Inglês <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="englishLevel"
              name="englishLevel"
              value={formData.englishLevel}
              onChange={(e) =>
                updateFormData({
                  englishLevel: e.target.value as EnglishLevel
                })
              }
              className={`w-full pl-9 pr-3 py-2 bg-white border ${
                errors.englishLevel ? 'border-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              required
            >
              <option value="">Selecione a proficiência</option>
              {ENGLISH_LEVELS.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label} — {lvl.desc}
                </option>
              ))}
            </select>
          </div>
          {errors.englishLevel && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.englishLevel}</p>
          )}
        </div>
      </div>
    </div>
  );
};
