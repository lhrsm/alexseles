import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number; // 1, 2, 3, 4
  totalSteps?: number;
}

const STEP_LABELS = [
  '1. Identificação',
  '2. Perfil / Carreira',
  '3. Elegibilidade',
  '4. Finalização'
];

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps = 4
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-2 px-2 sm:px-6">
      <div className="flex items-center justify-between relative">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <React.Fragment key={stepNumber}>
              {/* Conector de linha horizontal */}
              {index > 0 && (
                <div className="flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 relative">
                  <div
                    className={`h-full w-full ${
                      stepNumber <= currentStep
                        ? 'bg-emerald-600'
                        : 'bg-slate-200'
                    }`}
                  />
                </div>
              )}

              {/* Bolinha do Passo */}
              <div className="flex flex-col items-center relative z-10 select-none">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isActive
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-105'
                      : 'bg-slate-100 border-2 border-slate-300 text-slate-400'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white stroke-[2.5]" aria-hidden="true" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>

                {/* Rotulo discreto abaixo */}
                <span
                  className={`mt-2 text-[10px] sm:text-xs tracking-tight text-center font-medium transition-colors ${
                    isActive
                      ? 'text-blue-700 font-bold'
                      : isCompleted
                      ? 'text-slate-700 font-medium'
                      : 'text-slate-400'
                  }`}
                >
                  {STEP_LABELS[index]}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
