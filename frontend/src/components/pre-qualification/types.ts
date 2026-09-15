export type OriginArea =
  | 'Direito / Jurídico'
  | 'Engenharia Tradicional (Civil, Mecânica, etc.)'
  | 'Administração, Gestão & Finanças'
  | 'Contabilidade & Controladoria'
  | 'Educação & Formação'
  | 'Saúde & Biológicas'
  | 'Vendas, Comercial & Atendimento'
  | 'Comunicação, Marketing & Design'
  | 'Outra Área Profissional';

export type TotalCareerExperience =
  | '1 a 2 anos (Início de carreira)'
  | '3 a 5 anos (Profissional consolidado)'
  | '6 a 10 anos (Sénior na área atual)'
  | '10+ anos (Liderança / Gestão prévia)';

export type TechFamiliarity =
  | 'Iniciante absoluto (começar do zero)'
  | 'Estudo autodidata (cursos online, lógica básica)'
  | 'Praticante (já criei pequenos scripts ou projetos)'
  | 'Contacto profissional (trabalho próximo de devs/TI)';

export type TargetTechTrack =
  | 'Ciclo de Desenvolvimento de Software (SDLC & Programação)'
  | 'Inteligência Artificial Aplicada & Prompt Engineering'
  | 'Gestão de Projetos de TI & Métodos Ágeis (Scrum/Kanban)'
  | 'Governação de TI, Produto & Qualidade'
  | 'Quero orientação do Alex Seles para escolher a trilha ideal';

export type MainTransitionChallenge =
  | 'Excesso de informação dispersa e falta de método'
  | 'Insegurança em recomeçar ou síndrome do impostor'
  | 'Falta de projetos práticos e portfólio no GitHub'
  | 'Currículo e LinkedIn sem destaque para vagas de TI'
  | 'Dificuldade em conquistar as primeiras entrevistas técnicas';

export type WeeklyStudyTime =
  | '5 a 10 horas semanais'
  | '10 a 20 horas semanais'
  | '20+ horas semanais (dedicação intensiva)';

export type EnglishLevel =
  | 'Básico (em aprendizagem)'
  | 'Intermediário (leitura técnica confortável)'
  | 'Avançado / Fluente para Trabalho';

export type CommercialReadiness =
  | 'ready_to_invest'
  | 'want_conditions_first'
  | 'no_financial_availability';

export type LeadCategory = 'LEAD_A' | 'LEAD_B' | 'LEAD_C';

export interface PreQualificationFormData {
  // Etapa 1: Identificação & Contacto
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  currentCityCountry: string;

  // Etapa 2: Bagagem de Origem & Experiência
  originArea: OriginArea | '';
  currentRole: string;
  totalCareerExperience: TotalCareerExperience | '';
  techFamiliarity: TechFamiliarity | '';

  // Etapa 3: Metas de Transição & Desafios
  targetTechTrack: TargetTechTrack | '';
  mainTransitionChallenge: MainTransitionChallenge | '';
  weeklyStudyTime: WeeklyStudyTime | '';
  englishLevel: EnglishLevel | '';

  // Etapa 4: Prontidão & Envio
  commercialReadiness: CommercialReadiness | '';
  additionalNotes: string;
  cvFileName?: string;
  cvFileSize?: number;
  cvFileBase64?: string;
  consentLgpd: boolean;

  // Segurança Honeypot
  botHoneypot?: string;
}

export interface LeadClassification {
  category: LeadCategory;
  title: string;
  badge: string;
  summary: string;
  reasons: string[];
  whatsappUrl?: string;
}

export interface StoredLeadRecord {
  id: string;
  createdAt: string;
  formData: PreQualificationFormData;
  classification: LeadClassification;
  status: 'Novo' | 'Em Avaliação' | 'Contactado' | 'Convertido' | 'Descartado';
}

export type StoredLead = StoredLeadRecord;

export interface PreQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
  executiveWhatsappNumber?: string;
  onLeadSubmitted?: (lead: StoredLeadRecord) => void;
}

