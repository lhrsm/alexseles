// Grupos da comunidade PM Unlocked: usados na página inicial, nos dados estruturados (JSON-LD) e no llms.txt.
// Para mudar um texto, hora ou convite, altere só aqui.
// Na página inicial, cada grupo aparece pela dor (pain) e pela frase "No grupo <nome>, <lead>"; o podcast (sem pain) vai para a faixa de canais.
import { PODCAST_URL } from './social.js';

export const COMMUNITY_TOTAL = 'mais de 400';

export const COMMUNITY_GROUPS = [
  { name: 'PM Unlocked Hub', pain: 'Gerir projetos melhor', lead: 'falamos de gestão de projetos no dia a dia: métodos, liderança e boas práticas.', what: 'Gestão de projetos no dia a dia: métodos, liderança e boas práticas.', when: 'Seg. a sex., 10h', url: 'https://chat.whatsapp.com/HVCrMHci5hm6IO5SoC3y6S', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Vagas PM', pain: 'Encontrar vaga de PM', lead: 'partilhamos vagas de Project Manager, PMO, Scrum Master e Product Owner em Portugal e remoto.', what: 'Vagas de Project Manager, PMO, Scrum Master e Product Owner em Portugal e remoto.', when: 'Seg. a sex., 11h30 e 16h30', url: 'https://chat.whatsapp.com/I5SbQ22zGQvCfBuNEUM9gM', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Certificação PM', pain: 'Tirar a certificação', lead: 'partilhamos dicas para preparar os exames PSM, PSPO, CAPM, PMP e SAFe.', what: 'Dicas para preparar os exames PSM, PSPO, CAPM, PMP e SAFe.', when: 'Seg. a sex., 13h', url: 'https://chat.whatsapp.com/EzMny9VBJPdKdjIRxF8Jfk', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Migrar para Portugal', pain: 'Mudar para Portugal', lead: 'falamos de vistos, arrendamento e da vida em Portugal, sempre com fontes.', what: 'Vistos, arrendamento e a vida em Portugal, sempre com fontes.', when: 'Seg. a sex., 15h', url: 'https://chat.whatsapp.com/HF5xGDnuBtl0aTGCWPA2JC', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Career Tips', pain: 'Entrar em TI', lead: 'há dicas práticas para quem quer mudar para TI e o que esperar do caminho.', what: 'Para quem quer mudar para TI: dicas práticas e o que esperar do caminho.', when: 'Seg. a sex., 18h', url: 'https://chat.whatsapp.com/LlIthRC5cnmDLkNxDwjJw5', action: 'Entrar no grupo', where: 'o WhatsApp' },
  { name: 'Podcast PM Unlocked', what: 'Episódios de até 3 minutos sobre carreira e migrar para Portugal.', when: 'Novos episódios durante a semana', url: PODCAST_URL, action: 'Ouvir no Spotify', where: 'o Spotify' },
];
