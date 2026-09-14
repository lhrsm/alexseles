export type ProfessionalArea =
  | 'Engenharia de Software'
  | 'Produto'
  | 'Dados/IA'
  | 'Design'
  | 'Liderança Técnica'
  | 'Outra';

export type ExperienceRange =
  | '0-2 anos'
  | '3-5 anos'
  | '5-7 anos'
  | '8-10 anos'
  | '10+ anos';

export type SeniorityLevel =
  | 'Júnior'
  | 'Pleno'
  | 'Sênior'
  | 'Especialista/Tech Lead'
  | 'Gestão/Diretoria';

export type CurrentWorkStatus =
  | 'Empregado no Brasil'
  | 'Empregado no Exterior'
  | 'Prestador PJ Internacional'
  | 'Em transição';

export type MarketOption =
  | 'Portugal'
  | 'Espanha'
  | 'Reino Unido'
  | 'Europa Geral'
  | 'EUA/Canadá'
  | 'Remoto Global';

export type Citizenship =
  | 'Brasileira'
  | 'Europeia/Dupla'
  | 'Outra';

export type RightToWork =
  | 'Sim'
  | 'Não'
  | 'Em processo';

export type MigrationDocType =
  | 'Cidadania Europeia'
  | 'Visto de Trabalho'
  | 'Cartão de Residência'
  | 'Nômade Digital'
  | 'Em processo'
  | 'Não possuo';

export type EnglishLevel =
  | 'A1/A2 Básico'
  | 'B1 Intermediário'
  | 'B2 Independente/Fluente para Trabalho'
  | 'C1 Avançado'
  | 'C2 Nativo/Bilíngue';

export type WorkPreference =
  | '100% Remoto'
  | 'Híbrido'
  | 'Presencial com Relocação';

export type Availability =
  | 'Imediata'
  | '30 dias'
  | '60 dias'
  | '90+ dias';

export type CommercialReadiness =
  | 'ready_to_invest'
  | 'want_conditions_first'
  | 'no_financial_availability';

export type LeadCategory = 'LEAD_A' | 'LEAD_B' | 'LEAD_C';

export interface PreQualificationFormData {
  // Etapa 1: Identificacao e Contato
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  currentCountry: string;

  // Etapa 2: Carreira e Momento Profissional
  currentRole: string;
  professionalArea: ProfessionalArea | '';
  experienceYears: ExperienceRange | '';
  seniority: SeniorityLevel | '';
  workStatus: CurrentWorkStatus | '';
  mainChallenge: string;

  // Etapa 3: Mercados e Elegibilidade / Documentacao
  targetMarkets: MarketOption[];
  citizenship: Citizenship | '';
  rightToWork: RightToWork | '';
  migrationDocType: MigrationDocType | '';
  processForecast: string;
  englishLevel: EnglishLevel | '';

  // Etapa 4: Remuneracao, CV e Finalizacao
  workPreference: WorkPreference | '';
  availability: Availability | '';
  salaryExpectation: string;
  cvFileName: string;
  cvFileSize: number;
  cvFileBase64?: string;
  commercialReadiness: CommercialReadiness | '';
  consentLgpd: boolean;

  // Campo de Segurança Anti-Spam / Anti-Bot (Honeypot)
  botHoneypot?: string;
}

export interface LeadClassification {
  category: LeadCategory;
  title: string;
  badge: string;
  summary: string;
  whatsappUrl?: string;
  reasons: string[];
}

export interface StoredLead {
  id: string;
  createdAt: string;
  category: LeadCategory;
  classificationTitle: string;
  formData: PreQualificationFormData;
  whatsappUrl?: string;
}

export interface PreQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
  executiveWhatsappNumber?: string;
  onLeadSubmitted?: (lead: StoredLead) => void;
}
