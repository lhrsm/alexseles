import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, AlertCircle, Shield, Building2, Users, Calendar, Briefcase, Mail, Phone, ChevronDown } from 'lucide-react';
import { addContact } from '../../services/backofficeService';

export interface CorporateFormData {
  fullName: string;
  role: string;
  companyName: string;
  email: string;
  phone: string;
  teamSize: string;
  mainChallenge: string;
  workModel: string;
  timeframe: string;
  notes: string;
  consentLgpd: boolean;
  botHoneypot: string;
}

interface CorporateDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  executiveWhatsappNumber?: string;
}

const INITIAL_FORM_DATA: CorporateFormData = {
  fullName: '',
  role: '',
  companyName: '',
  email: '',
  phone: '',
  teamSize: '',
  mainChallenge: '',
  workModel: '',
  timeframe: '',
  notes: '',
  consentLgpd: false,
  botHoneypot: ''
};

export const CorporateDiagnosisModal: React.FC<CorporateDiagnosisModalProps> = ({
  isOpen,
  onClose,
  executiveWhatsappNumber = '351912405814'
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<CorporateFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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

  const updateFormData = (fields: Partial<CorporateFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    if (Object.keys(errors).length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        Object.keys(fields).forEach((key) => delete next[key]);
        return next;
      });
    }
    if (globalError) setGlobalError(null);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (formData.botHoneypot && formData.botHoneypot.trim().length > 0) {
        return false;
      }
      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Introduza o seu nome completo.';
      }
      if (!formData.role.trim()) {
        newErrors.role = 'Selecione o seu cargo ou função.';
      }
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Introduza a denominação da empresa.';
      }
      if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
        newErrors.email = 'Introduza um e-mail corporativo válido.';
      }
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length < 8) {
        newErrors.phone = 'Introduza um número de telefone corporativo com indicativo.';
      }
    }

    if (step === 2) {
      if (!formData.teamSize) {
        newErrors.teamSize = 'Selecione a dimensão aproximada da equipa.';
      }
      if (!formData.mainChallenge) {
        newErrors.mainChallenge = 'Indique a principal prioridade da organização.';
      }
      if (!formData.workModel) {
        newErrors.workModel = 'Selecione o modelo de trabalho da equipa.';
      }
    }

    if (step === 3) {
      if (!formData.timeframe) {
        newErrors.timeframe = 'Selecione a estimativa temporal para início da intervenção.';
      }
      if (!formData.consentLgpd) {
        newErrors.consentLgpd = 'É necessário autorizar o tratamento confidencial dos dados da solicitação.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setGlobalError('Por favor, corrija os campos assinalados antes de prosseguir.');
      return;
    }
    setGlobalError(null);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setGlobalError(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(3)) {
      setGlobalError('Por favor, verifique todos os campos obrigatórios antes de submeter.');
      return;
    }

    setIsSubmitting(true);
    setGlobalError(null);

    const submissionNotes = `Empresa: ${formData.companyName}\nCargo: ${formData.role}\nTelefone: ${formData.phone}\nDimensão da Equipa: ${formData.teamSize}\nDesafio Principal: ${formData.mainChallenge}\nModelo de Trabalho: ${formData.workModel}\nPrazo de Início: ${formData.timeframe}\nObservações: ${formData.notes || 'Nenhuma'}`;

    try {
      // 1. Registo na Base de Dados (Backoffice / Supabase)
      await addContact({
        tipo: 'empresa',
        nome: formData.fullName.trim(),
        contato: formData.email.trim().toLowerCase(),
        origem: 'Empresas B2B',
        modulo: formData.mainChallenge,
        investimento: formData.timeframe,
        horas: formData.teamSize,
        tipoSolicitacao: 'Diagnóstico Corporativo / B2B',
        mensagem: submissionNotes,
        status: 'Qualificado'
      });
    } catch (err) {
      console.warn('Aviso: falha ao gravar no backoffice:', err);
    }

    try {
      // 2. Disparo para o e-mail oficial via FormSubmit
      await fetch('https://formsubmit.co/ajax/contato@alexseles.online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Tipo': 'Diagnóstico Corporativo (B2B)',
          'Nome do Responsável': formData.fullName,
          'Cargo': formData.role,
          'Empresa': formData.companyName,
          'E-mail Corporativo': formData.email,
          'Telefone': formData.phone,
          'Dimensão da Equipa': formData.teamSize,
          'Principal Desafio': formData.mainChallenge,
          'Modelo de Trabalho': formData.workModel,
          'Prazo Pretendido': formData.timeframe,
          'Observações': formData.notes || 'Sem observações adicionais',
          '_subject': `Novo Pedido de Diagnóstico Corporativo: ${formData.companyName} (${formData.fullName})`,
          '_template': 'table',
          '_captcha': 'false'
        })
      });
    } catch (emailErr) {
      console.warn('Aviso ao enviar e-mail via FormSubmit:', emailErr);
    }

    try {
      // 3. Webhook n8n para automação executiva
      const n8nWebhookUrl = import.meta.env.VITE_N8N_CALENDAR_WEBHOOK_URL || 'https://n8n.srv1469659.hstgr.cloud/webhook/agendar-google-calendar';
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.fullName,
          email: formData.email,
          telefone: formData.phone,
          empresa: formData.companyName,
          cargo: formData.role,
          dimensaoEquipa: formData.teamSize,
          desafio: formData.mainChallenge,
          modeloTrabalho: formData.workModel,
          prazo: formData.timeframe,
          observacoes: formData.notes,
          tipoSolicitacao: 'Diagnóstico Corporativo / B2B',
          isEmpresa: true,
          status: 'Qualificado'
        })
      });
    } catch (n8nErr) {
      console.warn('Aviso ao disparar n8n webhook:', n8nErr);
    }

    setIsSubmitting(false);
    setCurrentStep(4);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Olá Alex Seles, realizei a solicitação de Diagnóstico Corporativo através do portal oficial.\n\n*Empresa:* ${formData.companyName}\n*Responsável:* ${formData.fullName} (${formData.role})\n*Dimensão da Equipa:* ${formData.teamSize}\n*Prioridade:* ${formData.mainChallenge}\n\nGostaria de alinhar uma reunião de diagnóstico executivo.`
    );
    window.open(`https://wa.me/${executiveWhatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="corporate-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Cabeçalho */}
        <header className="p-4 sm:p-6 border-b border-slate-100 bg-white sticky top-0 z-20">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200/60">
                  <Shield className="w-3 h-3 text-sky-700" aria-hidden="true" />
                  Diagnóstico Confidencial • B2B
                </span>
              </div>
              <h2
                id="corporate-modal-title"
                className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight"
              >
                Diagnóstico Estratégico para Empresas & Equipas de TI
              </h2>
              <p className="text-xs text-slate-500">
                Avaliação técnica com Alex Seles sobre modernização, automação, IA e capacitação de equipas.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Fechar formulário"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Stepper (visível nos passos 1 a 3) */}
          {currentStep <= 3 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 1 ? 'bg-[#1A73E8] text-white' : currentStep > 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {currentStep > 1 ? '✓' : '1'}
                  </span>
                  <span className={`text-xs font-semibold ${currentStep === 1 ? 'text-[#163758]' : 'text-slate-500'}`}>Contacto</span>
                </div>
                <div className={`h-0.5 flex-1 mx-3 ${currentStep > 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 2 ? 'bg-[#1A73E8] text-white' : currentStep > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {currentStep > 2 ? '✓' : '2'}
                  </span>
                  <span className={`text-xs font-semibold ${currentStep === 2 ? 'text-[#163758]' : 'text-slate-500'}`}>Equipa & Desafio</span>
                </div>
                <div className={`h-0.5 flex-1 mx-3 ${currentStep > 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 3 ? 'bg-[#1A73E8] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    3
                  </span>
                  <span className={`text-xs font-semibold ${currentStep === 3 ? 'text-[#163758]' : 'text-slate-500'}`}>Finalização</span>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Corpo da Modal */}
        <main className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 bg-white space-y-4">
          {globalError && (
            <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-2.5 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
              <span>{globalError}</span>
            </div>
          )}

          {/* Passo 1: Informações do Responsável e Empresa */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                value={formData.botHoneypot}
                onChange={(e) => updateFormData({ botHoneypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                    Nome do Responsável <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ex.: Carlos Mendes"
                      value={formData.fullName}
                      onChange={(e) => updateFormData({ fullName: e.target.value })}
                      className={`w-full py-2.5 sm:py-3 pl-10 pr-3.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                      }`}
                    />
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-600">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                    Cargo / Função na Empresa <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.role}
                      onChange={(e) => updateFormData({ role: e.target.value })}
                      className={`w-full appearance-none py-2.5 sm:py-3 pl-3.5 pr-10 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 transition-all truncate ${
                        errors.role ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                      }`}
                    >
                      <option value="">Selecione o seu cargo...</option>
                      <option value="CTO / Diretor de Tecnologia">CTO / Diretor de Tecnologia</option>
                      <option value="Tech Lead / Engineering Manager">Tech Lead / Engineering Manager</option>
                      <option value="Product Manager / Head de Produto">Product Manager / Head de Produto</option>
                      <option value="CEO / Fundador / Diretor Geral">CEO / Fundador / Diretor Geral</option>
                      <option value="Diretor de RH / Tech Talent Lead">Diretor de RH / Tech Talent Lead</option>
                      <option value="Arquiteto de Software / Engenheiro Sénior">Arquiteto de Software / Engenheiro Sénior</option>
                      <option value="Outro Cargo de Decisão">Outro Cargo de Decisão</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.role && <p className="text-xs text-rose-600">{errors.role}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                  Nome da Empresa / Organização <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ex.: Nexus Tech Solutions, Lda."
                    value={formData.companyName}
                    onChange={(e) => updateFormData({ companyName: e.target.value })}
                    className={`w-full py-2.5 sm:py-3 pl-10 pr-3.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.companyName ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                    }`}
                  />
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.companyName && <p className="text-xs text-rose-600">{errors.companyName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                    E-mail Corporativo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="nome@empresa.com"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      className={`w-full py-2.5 sm:py-3 pl-10 pr-3.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                    Telefone / WhatsApp Corporativo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+351 912 345 678"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                      className={`w-full py-2.5 sm:py-3 pl-10 pr-3.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-600">{errors.phone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Passo 2: Contexto da Equipa e Desafio Tecnológico */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                  Dimensão da Equipa de Tecnologia / TI <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.teamSize}
                    onChange={(e) => updateFormData({ teamSize: e.target.value })}
                    className={`w-full appearance-none py-2.5 sm:py-3 pl-3.5 pr-10 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 transition-all truncate ${
                      errors.teamSize ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                    }`}
                  >
                    <option value="">Selecione a dimensão da equipa...</option>
                    <option value="1 a 5 engenheiros / especialistas">1 a 5 engenheiros / especialistas</option>
                    <option value="6 a 15 engenheiros / especialistas">6 a 15 engenheiros / especialistas</option>
                    <option value="16 a 40 engenheiros / especialistas">16 a 40 engenheiros / especialistas</option>
                    <option value="Mais de 40 engenheiros / estrutura multidisciplinar">Mais de 40 engenheiros / estrutura multidisciplinar</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.teamSize && <p className="text-xs text-rose-600">{errors.teamSize}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                  Principal Desafio ou Objetivo Corporativo <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.mainChallenge}
                    onChange={(e) => updateFormData({ mainChallenge: e.target.value })}
                    className={`w-full appearance-none py-2.5 sm:py-3 pl-3.5 pr-10 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 transition-all truncate ${
                      errors.mainChallenge ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                    }`}
                  >
                    <option value="">Selecione a prioridade principal...</option>
                    <option value="Transformação Digital & Modernização de Sistemas">Transformação Digital & Modernização de Sistemas</option>
                    <option value="Automação de Processos & Integração de Inteligência Artificial">Automação de Processos & Integração de Inteligência Artificial</option>
                    <option value="Governação Ágil & Métodos de Entrega (SAFe / Scrum / Kanban)">Governação Ágil & Métodos de Entrega (SAFe / Scrum / Kanban)</option>
                    <option value="Up-skilling & Onboarding Acelerado de Desenvolvedores">Up-skilling & Onboarding Acelerado de Desenvolvedores</option>
                    <option value="Mentoria Executiva para Tech Leads & Engineering Managers">Mentoria Executiva para Tech Leads & Engineering Managers</option>
                    <option value="Consultoria Arquitetural & Redução de Débito Técnico">Consultoria Arquitetural & Redução de Débito Técnico</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.mainChallenge && <p className="text-xs text-rose-600">{errors.mainChallenge}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                  Modelo de Trabalho da Equipa <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.workModel}
                    onChange={(e) => updateFormData({ workModel: e.target.value })}
                    className={`w-full appearance-none py-2.5 sm:py-3 pl-3.5 pr-10 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 transition-all truncate ${
                      errors.workModel ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                    }`}
                  >
                    <option value="">Selecione o modelo de trabalho...</option>
                    <option value="100% Remoto">100% Remoto</option>
                    <option value="Híbrido (remoto e presencial)">Híbrido (remoto e presencial)</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.workModel && <p className="text-xs text-rose-600">{errors.workModel}</p>}
              </div>
            </div>
          )}

          {/* Passo 3: Prazos, Observações e Consentimento */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                  Estimativa Temporal para Início <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.timeframe}
                    onChange={(e) => updateFormData({ timeframe: e.target.value })}
                    className={`w-full appearance-none py-2.5 sm:py-3 pl-3.5 pr-10 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 transition-all truncate ${
                      errors.timeframe ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-[#1A73E8]'
                    }`}
                  >
                    <option value="">Selecione o prazo de início...</option>
                    <option value="Imediato (próximos 15 a 30 dias)">Imediato (próximos 15 a 30 dias)</option>
                    <option value="Curto Prazo (próximo trimestre)">Curto Prazo (próximo trimestre)</option>
                    <option value="Planeamento Estratégico e Orçamentação">Planeamento Estratégico e Orçamentação</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.timeframe && <p className="text-xs text-rose-600">{errors.timeframe}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#163758]">
                  Contexto Adicional / Objetivos Específicos (opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva brevemente os sistemas em utilização, tecnologias principais ou desafios concretos que a organização pretende solucionar..."
                  value={formData.notes}
                  onChange={(e) => updateFormData({ notes: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentLgpd}
                    onChange={(e) => updateFormData({ consentLgpd: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    Autorizo o contacto confidencial de Alex Seles para efeitos de diagnóstico executivo e proposta institucional, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
                  </span>
                </label>
                {errors.consentLgpd && <p className="text-xs text-rose-600 mt-1">{errors.consentLgpd}</p>}
              </div>
            </div>
          )}

          {/* Passo 4: Ecrã de Confirmação e Sucesso */}
          {currentStep === 4 && (
            <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-[#163758]">
                  Solicitação de Diagnóstico Recebida!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  Muito obrigado pelo contacto, <strong>{formData.fullName}</strong>. Os dados da <strong>{formData.companyName}</strong> foram registados com total confidencialidade.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  Alex Seles analisará as prioridades indicadas e entrará em contacto para agendamento de uma sessão de diagnóstico preliminar de 30 minutos.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all shadow-md cursor-pointer"
                >
                  <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" />
                  <span>Avisar Alex Seles no WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-all cursor-pointer"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Rodapé da Modal com Navegação */}
        {currentStep <= 3 && (
          <footer className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-copper inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
              >
                <span>Avançar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="btn-copper inline-flex items-center gap-2 px-7 py-2.5 rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-60 transition-all"
              >
                {isSubmitting ? (
                  <span>A submeter diagnóstico...</span>
                ) : (
                  <>
                    <span>Submeter Solicitação Corporativa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </footer>
        )}

      </div>
    </div>
  );
};
