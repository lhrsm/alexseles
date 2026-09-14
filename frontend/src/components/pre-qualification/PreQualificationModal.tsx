import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import {
  PreQualificationFormData,
  PreQualificationModalProps,
  LeadClassification
} from './types';
import { Stepper } from './Stepper';
import { Step1Contact } from './Step1Contact';
import { Step2Career } from './Step2Career';
import { Step3Eligibility } from './Step3Eligibility';
import { Step4Finalization } from './Step4Finalization';
import { ResultScreen } from './ResultScreen';
import { classifyLead } from './leadScorer';
import { saveLead } from './leadStorage';
import { addContact } from '../../services/backofficeService';

const INITIAL_FORM_DATA: PreQualificationFormData = {
  fullName: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  currentCountry: '',
  currentRole: '',
  professionalArea: '',
  experienceYears: '',
  seniority: '',
  workStatus: '',
  mainChallenge: '',
  targetMarkets: [],
  citizenship: '',
  rightToWork: '',
  migrationDocType: '',
  processForecast: '',
  englishLevel: '',
  workPreference: '',
  availability: '',
  salaryExpectation: '',
  cvFileName: '',
  cvFileSize: 0,
  commercialReadiness: '',
  consentLgpd: false
};

export const PreQualificationModal: React.FC<PreQualificationModalProps> = ({
  isOpen,
  onClose,
  companyName = 'Alex Seles • Mentoria Executiva & Carreira TI',
  executiveWhatsappNumber = '351912405814',
  onLeadSubmitted
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PreQualificationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [classification, setClassification] = useState<LeadClassification | null>(null);

  // Bloqueio de rolagem do body quando a modal estiver aberta
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Fechamento ao pressionar a tecla ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const updateFormData = (fields: Partial<PreQualificationFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Limpar erros de campos que foram alterados
    if (Object.keys(errors).length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        Object.keys(fields).forEach((key) => delete next[key]);
        return next;
      });
    }
    if (globalError) setGlobalError(null);
  };

  // Validacao por Etapa
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Bloqueio silencioso se o honeypot tiver sido preenchido por um bot
      if (formData.botHoneypot && formData.botHoneypot.trim().length > 0) {
        return false;
      }

      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Introduza o seu nome completo.';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Introduza um endereço de e-mail válido.';
      }
      const phoneClean = formData.phone.replace(/\D/g, '');
      if (!formData.phone.trim() || phoneClean.length < 8) {
        newErrors.phone = 'Introduza o WhatsApp com DDI (mínimo 8 dígitos).';
      }
      const cleanUrl = formData.linkedinUrl.trim();
      const isUnsafeProtocol = /^(javascript|data|vbscript|file):/i.test(cleanUrl);
      const isLinkedIn = /linkedin\.com/i.test(cleanUrl);
      if (!cleanUrl || isUnsafeProtocol || !isLinkedIn) {
        newErrors.linkedinUrl = 'Introduza uma ligação HTTPS válida para o seu perfil no LinkedIn.';
      }
      if (!formData.currentCountry) {
        newErrors.currentCountry = 'Selecione o seu país atual de residência.';
      }
    }

    if (step === 2) {
      if (!formData.currentRole.trim()) {
        newErrors.currentRole = 'Introduza o seu cargo atual ou último cargo.';
      }
      if (!formData.professionalArea) {
        newErrors.professionalArea = 'Selecione a sua área profissional principal.';
      }
      if (!formData.experienceYears) {
        newErrors.experienceYears = 'Selecione o seu tempo total de experiência.';
      }
      if (!formData.seniority) {
        newErrors.seniority = 'Selecione a sua senioridade atual.';
      }
      if (!formData.workStatus) {
        newErrors.workStatus = 'Selecione a sua situação profissional atual.';
      }
      if (!formData.mainChallenge.trim() || formData.mainChallenge.trim().length < 15) {
        newErrors.mainChallenge =
          'Descreva o seu principal desafio com pelo menos 15 caracteres.';
      }
    }

    if (step === 3) {
      if (formData.targetMarkets.length === 0) {
        newErrors.targetMarkets = 'Selecione pelo menos um mercado de interesse.';
      }
      if (!formData.citizenship) {
        newErrors.citizenship = 'Selecione a sua cidadania.';
      }
      if (!formData.rightToWork) {
        newErrors.rightToWork = 'Indique se possui autorização de trabalho.';
      }
      if (!formData.migrationDocType) {
        newErrors.migrationDocType = 'Selecione o seu tipo de documentação migratória.';
      }
      if (
        (formData.rightToWork === 'Em processo' ||
          formData.migrationDocType === 'Em processo') &&
        (!formData.processForecast.trim() || formData.processForecast.trim().length < 3)
      ) {
        newErrors.processForecast =
          'Indique a estimativa de conclusão do processo documental.';
      }
      if (!formData.englishLevel) {
        newErrors.englishLevel = 'Selecione o seu nível de proficiência em inglês.';
      }
    }

    if (step === 4) {
      if (!formData.workPreference) {
        newErrors.workPreference = 'Selecione a modalidade de trabalho desejada.';
      }
      if (!formData.availability) {
        newErrors.availability = 'Selecione a sua disponibilidade para início ou mudança.';
      }
      if (!formData.salaryExpectation.trim()) {
        newErrors.salaryExpectation = 'Indique a sua pretensão salarial mínima estimada.';
      }
      if (!formData.commercialReadiness) {
        newErrors.commercialReadiness =
          'Selecione a opção correspondente ao seu momento de decisão e investimento.';
      }
      if (!formData.consentLgpd) {
        newErrors.consentLgpd =
          'É obrigatório concordar com o tratamento confidencial dos dados.';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setGlobalError('Por favor, preencha corretamente todos os campos obrigatórios assinalados.');
      return false;
    }

    setGlobalError(null);
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      // Fazer scroll para o topo do conteudo da modal
      const modalBody = document.getElementById('pre-qual-modal-body');
      if (modalBody) modalBody.scrollTop = 0;
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setGlobalError(null);
      setCurrentStep((prev) => prev - 1);
      const modalBody = document.getElementById('pre-qual-modal-body');
      if (modalBody) modalBody.scrollTop = 0;
    }
  };

  const handleFinalSubmit = async () => {
    // Verificacao defensiva do Honeypot contra robos
    if (formData.botHoneypot && formData.botHoneypot.trim().length > 0) {
      onClose();
      return;
    }

    // Higienização e Sanitização de Caracteres Especiais (Anti-XSS e Injeção de Tags)
    const sanitizedData: PreQualificationFormData = {
      ...formData,
      fullName: formData.fullName.trim().replace(/[<>]/g, ''),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      linkedinUrl: formData.linkedinUrl.trim(),
      currentRole: formData.currentRole.trim().replace(/[<>]/g, ''),
      mainChallenge: formData.mainChallenge.trim().replace(/[<>]/g, ''),
      salaryExpectation: formData.salaryExpectation.trim().replace(/[<>]/g, ''),
      processForecast: formData.processForecast.trim().replace(/[<>]/g, '')
    };

    // Motor de Classificacao
    const result = classifyLead(sanitizedData, executiveWhatsappNumber);
    setClassification(result);

    // Persistencia Local
    const stored = saveLead(sanitizedData, result);

    if (onLeadSubmitted) {
      onLeadSubmitted(stored);
    }

    const isQualificado = result.category === 'LEAD_A' || result.category === 'LEAD_B';
    const trelloStatus = isQualificado ? 'Qualificado' : 'Leads';

    // 1. Gravação no Supabase e Backoffice
    try {
      await addContact({
        tipo: 'email',
        nome: sanitizedData.fullName.slice(0, 100),
        contato: `${sanitizedData.email.slice(0, 80)} • ${sanitizedData.phone.slice(0, 30)}`,
        origem: `Pré-Qualificação • ${result.category} (${sanitizedData.currentRole})`,
        modulo: `Mentoria Executiva (${sanitizedData.experienceYears})`,
        investimento: sanitizedData.salaryExpectation || 'A definir',
        horas: 'Diagnóstico de Carreira',
        tipoSolicitacao: 'Plano de Ação - Pré-Qualificação',
        mensagem: `[Classificação: ${result.category} - ${result.title} • Coluna: ${trelloStatus}]\nCargo: ${sanitizedData.currentRole} (${sanitizedData.seniority})\nMercados: ${sanitizedData.targetMarkets.join(', ')}\nDocumento: ${sanitizedData.migrationDocType} (${sanitizedData.rightToWork})\nInglês: ${sanitizedData.englishLevel}\nDesafio: ${sanitizedData.mainChallenge}\nLinkedIn: ${sanitizedData.linkedinUrl}`,
        status: trelloStatus
      });
    } catch (dbErr) {
      console.warn('Registo local efetuado:', dbErr);
    }

    // 2. Disparo para o Webhook n8n (Trello com checklist do Plano de Ação & Excel / Google Sheets no Drive)
    try {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: sanitizedData.fullName,
          email: sanitizedData.email,
          telefone: sanitizedData.phone,
          cidade: sanitizedData.currentCountry || 'Não informado',
          tipoSolicitacao: 'Plano de Ação - Pré-Qualificação',
          modulo: `Mentoria Executiva • ${sanitizedData.currentRole}`,
          investimento: sanitizedData.salaryExpectation || 'A definir',
          horas: 'Diagnóstico de Carreira',
          objetivo: `Plano de Ação [${trelloStatus}]: ${sanitizedData.targetMarkets.join(', ')} (${sanitizedData.seniority})`,
          desafio: sanitizedData.mainChallenge,
          slotAgendamento: 'Sessão Diagnóstica (A agendar)',
          startISO: new Date().toISOString(),
          endISO: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          canal: 'Formulário do Site (Pré-Qualificação)',
          status: trelloStatus,
          colunaTrello: trelloStatus,
          trelloList: trelloStatus,
          isQualificado: isQualificado,
          resumoPerfil: `${sanitizedData.fullName}, ${sanitizedData.currentRole} (${sanitizedData.seniority}) • Exp: ${sanitizedData.experienceYears} • Inglês: ${sanitizedData.englishLevel} • Mercados: ${sanitizedData.targetMarkets.join(', ')} • Situação: ${sanitizedData.workStatus} • Doc: ${sanitizedData.migrationDocType}`
        })
      });
    } catch (n8nErr) {
      console.warn('n8n indisponível:', n8nErr);
    }

    // 3. Disparo de e-mail formatado via FormSubmit diretamente para contato@alexseles.online
    try {
      const formSubmitPayload = {
        'Notificação': 'Há novos leads em Plano de Ação aguardando contacto executivo.',
        'Status Trello': `${trelloStatus.toUpperCase()} (Encaminhado para a coluna ${trelloStatus})`,
        'Classificação': `${result.category} - ${result.title}`,
        'Resumo Executivo': `${sanitizedData.fullName} | ${sanitizedData.currentRole} (${sanitizedData.seniority}) | ${sanitizedData.experienceYears} de exp. | Inglês: ${sanitizedData.englishLevel} | Mercados: ${sanitizedData.targetMarkets.join(', ')} | Momento: ${sanitizedData.commercialReadiness}`,
        'Nome do Candidato': sanitizedData.fullName,
        'E-mail': sanitizedData.email,
        'Telefone / WhatsApp': sanitizedData.phone,
        'LinkedIn': sanitizedData.linkedinUrl,
        'País Atual': sanitizedData.currentCountry,
        'Cargo Atual': sanitizedData.currentRole,
        'Área Profissional': sanitizedData.professionalArea,
        'Tempo de Experiência': sanitizedData.experienceYears,
        'Senioridade': sanitizedData.seniority,
        'Situação Atual': sanitizedData.workStatus,
        'Principal Desafio': sanitizedData.mainChallenge,
        'Mercados Alvo': sanitizedData.targetMarkets.join(', '),
        'Cidadania': sanitizedData.citizenship,
        'Autorização de Trabalho': sanitizedData.rightToWork,
        'Documentação Migratória': sanitizedData.migrationDocType,
        'Previsão Documental': sanitizedData.processForecast || 'N/A',
        'Nível de Inglês': sanitizedData.englishLevel,
        'Modalidade Desejada': sanitizedData.workPreference,
        'Disponibilidade': sanitizedData.availability,
        'Pretensão Salarial': sanitizedData.salaryExpectation,
        'Momento Comercial': sanitizedData.commercialReadiness,
        'Ficheiro CV': sanitizedData.cvFileName || 'Não anexado',
        '_subject': `[${trelloStatus.toUpperCase()}] Lead em Plano de Ação: ${sanitizedData.fullName} (${sanitizedData.currentRole})`,
        '_template': 'table',
        '_captcha': 'false'
      };

      await fetch('https://formsubmit.co/ajax/contato@alexseles.online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmitPayload)
      });
    } catch (emailErr) {
      console.warn('Erro ao enviar e-mail via FormSubmit:', emailErr);
    }

    // Avançar para a tela de resultado (Passo 5)
    setCurrentStep(5);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setGlobalError(null);
    setClassification(null);
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Card Central */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Cabecalho da Modal */}
        <header className="p-4 sm:p-6 border-b border-slate-100 bg-white sticky top-0 z-20">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                  <Shield className="w-3 h-3 text-slate-600" aria-hidden="true" />
                  Confidencial
                </span>
              </div>
              <h2
                id="modal-title"
                className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight"
              >
                Pré-Qualificação de Carreira & Tecnologia
              </h2>
              <p className="text-xs text-slate-500">
                4 etapas para análise do seu perfil profissional.
              </p>
            </div>

            {/* Botao de Fechar (X) */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label="Fechar formulário"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Stepper (visivel apenas durante os passos 1 a 4) */}
          {currentStep <= 4 && (
            <div className="mt-4 pt-2 border-t border-slate-100">
              <Stepper currentStep={currentStep} totalSteps={4} />
            </div>
          )}
        </header>

        {/* Corpo com Scroll Suave */}
        <main
          id="pre-qual-modal-body"
          className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white space-y-4"
        >
          {/* Banner de Erro Global */}
          {globalError && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-2.5 text-xs font-medium animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
              <span>{globalError}</span>
            </div>
          )}

          {/* Renderizacao dos Passos */}
          {currentStep === 1 && (
            <Step1Contact
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <Step2Career
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <Step3Eligibility
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <Step4Finalization
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 5 && classification && (
            <ResultScreen
              classification={classification}
              formData={formData}
              onReset={handleReset}
              onClose={onClose}
            />
          )}
        </main>

        {/* Rodape de Navegacao (Passos 1 a 4) */}
        {currentStep <= 4 && (
          <footer className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3 sticky bottom-0 z-20">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Etapa {currentStep} de 4
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                <span>{currentStep === 4 ? 'Finalizar Avaliação' : 'Avançar'}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
