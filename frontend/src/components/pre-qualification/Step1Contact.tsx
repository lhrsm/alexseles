import React from 'react';
import { User, Mail, Phone, Globe } from 'lucide-react';
import { PreQualificationFormData } from './types';

interface Step1ContactProps {
  formData: PreQualificationFormData;
  updateFormData: (fields: Partial<PreQualificationFormData>) => void;
  errors: Record<string, string>;
}

const COMMON_COUNTRIES = [
  'Portugal',
  'Brasil',
  'Espanha',
  'Reino Unido',
  'Irlanda',
  'Alemanha',
  'Países Baixos',
  'Estados Unidos',
  'Canadá',
  'Suíça',
  'Outro'
];

export const Step1Contact: React.FC<Step1ContactProps> = ({
  formData,
  updateFormData,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Dados Pessoais e Canais Diretos
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          As informações são tratadas sob estrito sigilo executivo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Nome Completo */}
        <div className="sm:col-span-2">
          <label
            htmlFor="fullName"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Ex: Carlos Eduardo de Oliveira"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            E-mail Corporativo ou Pessoal <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu.email@empresa.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* WhatsApp com DDI */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            WhatsApp com DDI <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+351 912 345 678 ou +55 11 98765-4321"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Inclua o indicativo internacional (+351, +55, etc.).
          </span>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label
            htmlFor="linkedinUrl"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Link do Perfil no LinkedIn <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#0A66C2]">
              <i className="fa-brands fa-linkedin text-sm" aria-hidden="true"></i>
            </div>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              placeholder="https://www.linkedin.com/in/seu-perfil"
              value={formData.linkedinUrl}
              onChange={(e) => updateFormData({ linkedinUrl: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.linkedinUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            />
          </div>
          {errors.linkedinUrl && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.linkedinUrl}</p>
          )}
        </div>

        {/* País Atual de Residência */}
        <div>
          <label
            htmlFor="currentCountry"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            País Atual de Residência <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" aria-hidden="true" />
            </div>
            <select
              id="currentCountry"
              name="currentCountry"
              value={formData.currentCountry}
              onChange={(e) => updateFormData({ currentCountry: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-white border ${
                errors.currentCountry ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              } rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors`}
              required
            >
              <option value="">Selecione o país onde reside</option>
              {COMMON_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {errors.currentCountry && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.currentCountry}</p>
          )}
        </div>
      </div>
    </div>
  );
};
