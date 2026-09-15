import { LeadClassification, PreQualificationFormData } from './types';

export const classifyLead = (
  formData: PreQualificationFormData,
  executiveWhatsappNumber: string = '351912405814'
): LeadClassification => {
  const reasons: string[] = [];

  const isReadyToInvest = formData.commercialReadiness === 'ready_to_invest';
  const wantsConditionsFirst = formData.commercialReadiness === 'want_conditions_first';
  const hasNoFinancialAvailability = formData.commercialReadiness === 'no_financial_availability';

  // -------------------------------------------------------------
  // CASO 1: LEAD C (Orientação & Conteúdos Gratuitos)
  // -------------------------------------------------------------
  if (hasNoFinancialAvailability) {
    reasons.push('Foco atual em conteúdos gratuitos e materiais da comunidade');
    reasons.push(`Área de interesse identificada: ${formData.targetTechTrack || 'Tecnologia Geral'}`);
    reasons.push(`Desafio apontado: ${formData.mainTransitionChallenge || 'Início da transição'}`);

    return {
      category: 'LEAD_C',
      title: 'Plano de Acesso à Central de Conhecimento & Guias de TI',
      badge: 'Orientação & Conteúdos',
      summary:
        'Agradecemos a sua submissão. Para o seu momento atual, o roteiro mais recomendado é o estudo prático através dos artigos técnicos da nossa Central de Conhecimento e da nossa comunidade de conteúdos.',
      reasons
    };
  }

  // -------------------------------------------------------------
  // CASO 2: LEAD A (Prioritário VIP • Aceleração Imediata)
  // -------------------------------------------------------------
  if (isReadyToInvest) {
    reasons.push('Decisão e prontidão imediata para investir na mentoria individual');
    reasons.push(`Bagagem de carreira aproveitável: ${formData.originArea || 'Área prévia'} (${formData.totalCareerExperience || 'Experiência prévia'})`);
    reasons.push(`Trilha tecnológica selecionada: ${formData.targetTechTrack}`);
    reasons.push(`Comprometimento semanal: ${formData.weeklyStudyTime}`);
    reasons.push(`Nível de familiaridade técnica: ${formData.techFamiliarity}`);

    const cleanPhone = executiveWhatsappNumber.replace(/\D/g, '');
    const candidateName = formData.fullName || 'Candidato';
    const message = encodeURIComponent(
      `Olá Alex Seles, realizei a minha pré-qualificação no site para transição de carreira para TI. ` +
      `Venho da área de ${formData.originArea || 'minha área profissional'} e o meu foco é migrar para ${formData.targetTechTrack || 'TI'}. ` +
      `Estou preparado(a) para investir na mentoria individual e gostaria de alinhar os próximos passos com a sua orientação direta. ` +
      `[Nome: ${candidateName}]`
    );

    return {
      category: 'LEAD_A',
      title: 'Perfil Selecionado para Aceleração Individual de Carreira em TI',
      badge: 'Prioridade Alta • Aceleração Imediata',
      summary:
        'Parabéns! A sua bagagem profissional de origem e o seu compromisso para migrar para tecnologia reúnem as condições perfeitas para a nossa mentoria individual com Alex Seles. Poderá iniciar o alinhamento imediato via WhatsApp executivo.',
      reasons,
      whatsappUrl: `https://wa.me/${cleanPhone}?text=${message}`
    };
  }

  // -------------------------------------------------------------
  // CASO 3: LEAD B (Pré-Qualificado • Avaliação de Condições)
  // -------------------------------------------------------------
  reasons.push('Interesse em avaliar os formatos, cronogramas e condições de investimento');
  reasons.push(`Bagagem profissional de origem: ${formData.originArea || 'Área prévia'}`);
  reasons.push(`Trilha de interesse em tecnologia: ${formData.targetTechTrack || 'TI'}`);
  reasons.push(`Familiaridade atual: ${formData.techFamiliarity || 'Iniciante'}`);

  const cleanPhone = executiveWhatsappNumber.replace(/\D/g, '');
  const candidateName = formData.fullName || 'Candidato';
  const message = encodeURIComponent(
    `Olá Alex Seles, submeti a minha pré-qualificação no site para transição de carreira para TI. ` +
    `Tenho interesse na trilha de ${formData.targetTechTrack || 'TI'} e gostaria de conhecer as opções de formato, cronograma e condições de investimento da sua mentoria. ` +
    `[Nome: ${candidateName}]`
  );

  return {
    category: 'LEAD_B',
    title: 'Perfil Pré-Qualificado para Avaliação de Formato e Condições',
    badge: 'Pré-Qualificado • Transição de Carreira',
    summary:
      'O seu perfil possui excelente potencial para reaproveitamento de competências em tecnologia. Entraremos em contacto para apresentar a estrutura da mentoria, carga horária e condições de investimento personalizadas.',
    reasons,
    whatsappUrl: `https://wa.me/${cleanPhone}?text=${message}`
  };
};
