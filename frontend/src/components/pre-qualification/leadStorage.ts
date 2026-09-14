import {
  LeadClassification,
  PreQualificationFormData,
  StoredLead
} from './types';

const STORAGE_KEY = 'alexseles_prequalification_leads';

export const getStoredLeads = (): StoredLead[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Erro ao ler leads do localStorage:', error);
    return [];
  }
};

export const saveLead = (
  formData: PreQualificationFormData,
  classification: LeadClassification
): StoredLead => {
  const newLead: StoredLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    category: classification.category,
    classificationTitle: classification.title,
    formData: { ...formData },
    whatsappUrl: classification.whatsappUrl
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getStoredLeads();
      const updated = [newLead, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Erro ao persistir lead no localStorage:', error);
    }
  }

  return newLead;
};

export const clearStoredLeads = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const exportLeadsToCSV = (customLeads?: StoredLead[]): void => {
  const leads = customLeads || getStoredLeads();
  if (!leads || leads.length === 0) {
    alert('Nenhum lead registado para exportacao.');
    return;
  }

  const escapeCSV = (val: unknown): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = [
    'ID',
    'Data/Hora',
    'Classificacao',
    'Titulo Classificacao',
    'Nome Completo',
    'E-mail',
    'WhatsApp',
    'LinkedIn',
    'Pais Atual',
    'Cargo Atual',
    'Area Profissional',
    'Anos Experiencia',
    'Senioridade',
    'Situacao Atual',
    'Desafio Principal',
    'Mercados de Interesse',
    'Cidadania',
    'Direito de Trabalho',
    'Tipo Documentacao',
    'Previsao Conclusao Doc',
    'Nivel Ingles',
    'Modalidade Trabalho',
    'Disponibilidade',
    'Pretensao Salarial',
    'Nome Ficheiro CV',
    'Tamanho Ficheiro CV (KB)',
    'Momento Decisao',
    'Consentimento LGPD'
  ];

  const rows = leads.map((item) => {
    const f = item.formData;
    const dateFormatted = new Date(item.createdAt).toLocaleString('pt-PT');
    const marketsStr = f.targetMarkets ? f.targetMarkets.join(', ') : '';
    const cvSizeKb = f.cvFileSize ? (f.cvFileSize / 1024).toFixed(1) : '0';

    return [
      escapeCSV(item.id),
      escapeCSV(dateFormatted),
      escapeCSV(item.category),
      escapeCSV(item.classificationTitle),
      escapeCSV(f.fullName),
      escapeCSV(f.email),
      escapeCSV(f.phone),
      escapeCSV(f.linkedinUrl),
      escapeCSV(f.currentCountry),
      escapeCSV(f.currentRole),
      escapeCSV(f.professionalArea),
      escapeCSV(f.experienceYears),
      escapeCSV(f.seniority),
      escapeCSV(f.workStatus),
      escapeCSV(f.mainChallenge),
      escapeCSV(marketsStr),
      escapeCSV(f.citizenship),
      escapeCSV(f.rightToWork),
      escapeCSV(f.migrationDocType),
      escapeCSV(f.processForecast || 'N/A'),
      escapeCSV(f.englishLevel),
      escapeCSV(f.workPreference),
      escapeCSV(f.availability),
      escapeCSV(f.salaryExpectation),
      escapeCSV(f.cvFileName || 'Nao anexado'),
      escapeCSV(cvSizeKb),
      escapeCSV(f.commercialReadiness),
      escapeCSV(f.consentLgpd ? 'Sim' : 'Nao')
    ].join(';');
  });

  const csvContent =
    '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const nowStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `Alex_Seles_Leads_PreQualificacao_${nowStr}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
