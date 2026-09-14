import { LeadClassification, PreQualificationFormData } from './types';

export const classifyLead = (
  formData: PreQualificationFormData,
  executiveWhatsappNumber: string = '351912405814'
): LeadClassification => {
  const reasons: string[] = [];

  // Verificacoes de Experiencia e Senioridade
  const isHighExperience = ['5-7 anos', '8-10 anos', '10+ anos'].includes(
    formData.experienceYears
  );
  const isMidOrSenior = [
    'Pleno',
    'Sênior',
    'Especialista/Tech Lead',
    'Gestão/Diretoria'
  ].includes(formData.seniority);

  // Verificacao de Direito de Trabalho / Cidadania
  const hasWorkRight =
    formData.rightToWork === 'Sim' ||
    formData.citizenship === 'Europeia/Dupla' ||
    [
      'Cidadania Europeia',
      'Visto de Trabalho',
      'Cartão de Residência'
    ].includes(formData.migrationDocType);

  // Verificacao de Documentacao em Andamento
  const isDocumentationInProcess =
    formData.rightToWork === 'Em processo' ||
    formData.migrationDocType === 'Em processo';

  // Verificacao de Idioma
  const hasProficientEnglish = [
    'B2 Independente/Fluente para Trabalho',
    'C1 Avançado',
    'C2 Nativo/Bilíngue'
  ].includes(formData.englishLevel);

  // Verificacao de Decisao Comercial
  const isReadyToInvest =
    formData.commercialReadiness === 'ready_to_invest';
  const wantsConditionsFirst =
    formData.commercialReadiness === 'want_conditions_first';
  const hasNoFinancialAvailability =
    formData.commercialReadiness === 'no_financial_availability';

  // -------------------------------------------------------------
  // REGRA 1: LEAD C (Conteudo / Vagas Publicas)
  // -------------------------------------------------------------
  if (
    hasNoFinancialAvailability ||
    formData.experienceYears === '0-2 anos' ||
    (formData.rightToWork === 'Não' &&
      (formData.migrationDocType === 'Não possuo' ||
        !formData.migrationDocType))
  ) {
    if (hasNoFinancialAvailability) {
      reasons.push('Foco atual em conteudos e vagas publicas');
    }
    if (formData.experienceYears === '0-2 anos') {
      reasons.push('Experiencia profissional inicial (0 a 2 anos)');
    }
    if (
      formData.rightToWork === 'Não' &&
      (formData.migrationDocType === 'Não possuo' ||
        !formData.migrationDocType)
    ) {
      reasons.push('Ausencia de autorizacao de trabalho ou plano migratorio ativo');
    }

    return {
      category: 'LEAD_C',
      title: 'Acesso a Materiais & Comunidade Publica',
      badge: 'Orientacao e Conteudo',
      summary:
        'Agradecemos a sua disponibilidade. No momento, o roteiro mais recomendado para o seu perfil e o acesso aos nossos artigos tecnicos, biblioteca de conhecimentos e painel de oportunidades publicas.',
      reasons
    };
  }

  // -------------------------------------------------------------
  // REGRA 2: LEAD A (Prioritario / VIP)
  // -------------------------------------------------------------
  if (
    isHighExperience &&
    isMidOrSenior &&
    hasWorkRight &&
    hasProficientEnglish &&
    isReadyToInvest
  ) {
    reasons.push('Experiencia tecnica solida de 5+ anos');
    reasons.push(`Senioridade confirmada (${formData.seniority})`);
    reasons.push('Elegibilidade documental e direito de trabalho garantido');
    reasons.push(`Nivel de ingles fluente/avancado (${formData.englishLevel})`);
    reasons.push('Decisao e disponibilidade imediata para mentoria executiva');

    const cleanPhone = executiveWhatsappNumber.replace(/\D/g, '');
    const targetMarketsStr =
      formData.targetMarkets.length > 0
        ? formData.targetMarkets.join(', ')
        : 'Internacional';
    const docStr =
      formData.migrationDocType ||
      (formData.rightToWork === 'Sim'
        ? 'Direito de trabalho confirmado'
        : 'Cidadania Europeia/Dupla');

    const message = [
      `Ola Alex e Equipa Executiva,`,
      ``,
      `Conclui a Avaliacao Confidencial de Pre-Qualificacao com classificacao PRIORITARIA (Lead VIP).`,
      ``,
      `Nome: ${formData.fullName}`,
      `Cargo Atual: ${formData.currentRole}`,
      `Area: ${formData.professionalArea || 'Tecnologia'} (${formData.seniority})`,
      `Experiencia: ${formData.experienceYears}`,
      `Mercados de Interesse: ${targetMarketsStr}`,
      `Documentacao / Visto: ${docStr}`,
      `Ingles: ${formData.englishLevel}`,
      `Pretensao Salarial: ${formData.salaryExpectation}`,
      `LinkedIn: ${formData.linkedinUrl}`,
      ``,
      `Gostaria de agendar a sessao diagnostica estrategica com a lideranca.`
    ].join('\n');

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      message
    )}`;

    return {
      category: 'LEAD_A',
      title: 'Aprovacao Prioritaria (Lead VIP)',
      badge: 'Candidato VIP Prioritario',
      summary:
        'O seu perfil preenche todos os requisitos estrategicos de alta performance para reposicionamento internacional imediato.',
      whatsappUrl,
      reasons
    };
  }

  // -------------------------------------------------------------
  // REGRA 3: LEAD B (Avaliacao Manual)
  // -------------------------------------------------------------
  if (isDocumentationInProcess) {
    reasons.push('Documentacao migratoria em tramitacao');
  }
  if (wantsConditionsFirst) {
    reasons.push('Interesse em analise prévia de condicoes de investimento');
  }
  if (!isHighExperience) {
    reasons.push(`Experiencia consolidada (${formData.experienceYears})`);
  }
  if (reasons.length === 0) {
    reasons.push('Perfil tecnico qualificado para triagem estrategica');
  }

  return {
    category: 'LEAD_B',
    title: 'Perfil Selecionado para Triagem Estrategica',
    badge: 'Analise Manual em Andamento',
    summary:
      'O seu perfil possui elevado potencial. A nossa equipa executiva realizara uma analise tecnica personalizada e entrara em contacto no prazo maximo de 48 horas.',
    reasons
  };
};
