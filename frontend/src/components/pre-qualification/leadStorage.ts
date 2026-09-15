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
  // Higienizacao de Seguranca: nao armazenar ficheiro binario pesado em localStorage para evitar QuotaExceededError
  const sanitizedFormData: PreQualificationFormData = {
    ...formData,
    cvFileBase64: undefined // Mantem em memoria durante a sessao, protegendo o storage local
  };

  const newLead: StoredLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    formData: sanitizedFormData,
    classification,
    status: 'Novo'
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getStoredLeads();
      // Limite defensivo de 100 registos FIFO para prevenir esgotamento de memoria do cliente
      const updated = [newLead, ...current].slice(0, 100);
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

  // Prevenção de Injeção de Fórmulas em Folhas de Cálculo (CSV Injection / CWE-1236)
  const escapeCSV = (val: unknown): string => {
    if (val === null || val === undefined) return '""';
    let str = String(val).replace(/"/g, '""');

    // Se o valor comecar por caracteres que o Excel interpreta como fórmula (=, +, -, @, tab, retorno),
    // neutraliza adicionando uma apóstrofe de texto seguro no início.
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }

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
    'Cidade e Pais',
    'Area de Origem',
    'Cargo Atual',
    'Tempo Total Carreira',
    'Familiaridade com TI',
    'Trilha Pretendida em TI',
    'Maior Desafio na Transicao',
    'Dedicacao Semanal',
    'Nivel Ingles',
    'Momento Decisao',
    'Notas Adicionais',
    'Nome Ficheiro CV',
    'Tamanho Ficheiro CV (KB)',
    'Consentimento RGPD/LGPD'
  ];

  const rows = leads.map((item) => {
    const f = item.formData;
    const dateFormatted = new Date(item.createdAt).toLocaleString('pt-PT');
    const cvSizeKb = f.cvFileSize ? (f.cvFileSize / 1024).toFixed(1) : '0';

    return [
      escapeCSV(item.id),
      escapeCSV(dateFormatted),
      escapeCSV(item.classification.category),
      escapeCSV(item.classification.title),
      escapeCSV(f.fullName),
      escapeCSV(f.email),
      escapeCSV(f.phone),
      escapeCSV(f.linkedinUrl),
      escapeCSV(f.currentCityCountry),
      escapeCSV(f.originArea),
      escapeCSV(f.currentRole),
      escapeCSV(f.totalCareerExperience),
      escapeCSV(f.techFamiliarity),
      escapeCSV(f.targetTechTrack),
      escapeCSV(f.mainTransitionChallenge),
      escapeCSV(f.weeklyStudyTime),
      escapeCSV(f.englishLevel),
      escapeCSV(f.commercialReadiness),
      escapeCSV(f.additionalNotes || 'N/A'),
      escapeCSV(f.cvFileName || 'Nao anexado'),
      escapeCSV(cvSizeKb),
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
