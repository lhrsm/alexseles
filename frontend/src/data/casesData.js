import iefpLogo from '../assets/clients/iefp.png';
import arteLogo from '../assets/clients/arte.svg';
import capgeminiLogo from '../assets/clients/capgemini.svg';
import tivitLogo from '../assets/clients/tivit.svg';

import caseIefp from '../assets/cases/case-iefp.jpg';
import caseArte from '../assets/cases/case-arte.jpg';
import caseCapgemini from '../assets/cases/case-capgemini.jpg';
import caseTivit from '../assets/cases/case-tivit.jpg';

import solucaoModernizacao from '../assets/corporate/solucao-modernizacao.jpg';
import solucaoAutomacao from '../assets/corporate/solucao-automacao-ia.jpg';
import solucaoGovernanca from '../assets/corporate/solucao-governanca-agil.jpg';
import solucaoCapacitacao from '../assets/corporate/solucao-capacitacao-lideranca.jpg';
import solucaoIefp from '../assets/solucaoiefp.webp';
import resultadoIefp from '../assets/resultadoiefp.webp';
import datativit from '../assets/datativit.png';

export const casesData = [
  {
    id: 'iefp',
    slug: 'iefp',
    client: 'IEFP',
    clientFullName: 'Instituto do Emprego e Formação Profissional',
    logo: iefpLogo,
    image: caseIefp,
    challengeImage: caseIefp,
    solutionImage: solucaoIefp,
    resultsImage: resultadoIefp,
    title: 'Transformação Digital Inclusiva & Obtenção do Selo de Acessibilidade Web',
    cardHeadline: 'Solução de serviços web acessível a todos e conquista do selo oficial de acessibilidade no site do IEFP.',
    shortDescription: 'A solução de serviços web da IEFP é acessível a todos e recebeu o selo de acessibilidade no site da IEFP.',
    cardBg: 'bg-[#B91C1C]',
    cardTextColor: '#B91C1C',
    mediumUrl: 'https://medium.com/@alexseles/iefp-web-services-solution-accessible-for-everyone-and-get-recognition-with-accessibility-seal-on-9e6cdfa25512',
    summary: 'Como uma intervenção de engenharia de software e desenho centrado no utilizador democratizou o acesso aos serviços de emprego e formação para todos os cidadãos portugueses, superando rigorosas auditorias e conquistando o Selo Oficial de Acessibilidade da AMA.',
    industry: 'Setor Público & Formação Profissional',
    services: 'Acessibilidade Digital WCAG, Arquitetura de Informação, Design UX/UI & Engenharia de Frontend',
    scope: 'Nacional • Centenas de milhares de utilizadores ativos',
    
    // O Desafio
    challenge: {
      headline: 'Eliminar barreiras de usabilidade e garantir acesso universal aos serviços públicos de emprego.',
      paragraphs: [
        'O Instituto do Emprego e Formação Profissional (IEFP) é a entidade pública responsável por operacionalizar as políticas de emprego e qualificação em Portugal, atendendo anualmente a centenas de milhares de candidatos, trabalhadores e empresas. No entanto, as suas plataformas digitais (IEFP Online e portal IEFP.pt) enfrentavam desafios estruturais de usabilidade e sobrecarga cognitiva.',
        'A complexidade dos formulários e fluxos de navegação criava fricção significativa, dificultando a submissão autónoma de candidaturas a emprego, inscrições em ofertas formativas e gestão de processos sociais. Estas limitações impactavam com particular gravidade os utilizadores portadores de deficiência visual, motora ou cognitiva, bem como cidadãos com menor literacia digital.',
        'O objetivo estratégico estabelecido exigia redesenhar os formulários e a arquitetura de informação dos serviços web, garantindo conformidade rigorosa com a Diretiva Europeia de Acessibilidade Web e os critérios da Agência para a Modernização Administrativa (AMA), habilitando a plataforma a obter o reconhecimento oficial com o Selo de Acessibilidade.'
      ]
    },

    // A Solução
    solution: {
      headline: 'Engenharia de formulários simplificados e semântica acessível desde a raiz da arquitetura.',
      paragraphs: [
        'Alex Seles liderou a reformulação dos serviços web do IEFP a partir de uma abordagem holística que integrou arquitetura de informação acessível, validação em tempo real e tecnologias assistivas avançadas.',
        'A intervenção estruturou-se em quatro pilares fundamentais:'
      ],
      pillars: [
        {
          name: 'Reengenharia de Formulários Críticos',
          description: 'Substituição de formulários burocráticos e estáticos por experiências dinâmicas orientadas a tarefas, com validação de campos imediata, instruções claras em linguagem simples e redução do esforço cognitivo de preenchimento.'
        },
        {
          name: 'Arquitetura de Informação Inclusiva',
          description: 'Reestruturação hierárquica completa dos menus e pontos de contacto do IEFP Online, facilitando a descoberta intuitiva de vagas de emprego, programas de estágio e catálogo de ofertas formativas.'
        },
        {
          name: 'Conformidade Rigorosa com WCAG 2.1 AA',
          description: 'Aplicação estrita dos padrões internacionais de acessibilidade: semântica HTML5 acessível, calibragem exata de contrastes de cor, suporte integral a navegação exclusiva por teclado e implementação precisa de atributos WAI-ARIA.'
        },
        {
          name: 'Compatibilidade com Tecnologias Assistivas',
          description: 'Calibração especializada para total compatibilidade com os principais leitores de ecrã do mercado (NVDA, JAWS e VoiceOver), garantindo que utilizadores cegos ou com baixa visão possam concluir todas as tarefas sem auxílio presencial.'
        }
      ]
    },

    // As Tecnologias
    technologies: [
      'HTML5 Semântico',
      'WAI-ARIA',
      'Bootstrap & CSS3 Modular',
      'JavaScript / TypeScript',
      'Access Monitor Plus (AMA)',
      'WAVE Accessibility Tool',
      'Color Contrast Analyzer',
      'NVDA & JAWS Screen Readers',
      'Figma (Design System Acessível)',
      'Jira Software'
    ],

    // Os Resultados
    results: {
      headline: 'Conquista do Selo de Acessibilidade e autonomia digital para a população portuguesa.',
      paragraphs: [
        'A nova experiência de serviços web do IEFP eliminou as barreiras estruturais que antes afastavam os cidadãos dos seus direitos de qualificação e emprego.',
        'Graças ao rigor técnico aplicado em cada componente, o portal alcançou a classificação máxima de acessibilidade nos testes automatizados e manuais, sendo formalmente distinguido com o Selo de Acessibilidade Web no portal oficial do IEFP.',
        'A iniciativa resultou numa diminuição expressiva nos pedidos de suporte telefónico e presencial, aumentando a satisfação do utilizador e consagrando o IEFP como uma referência de inclusão digital na administração pública.'
      ],
      metrics: [
        {
          value: 'Selo Oficial',
          label: 'Acessibilidade Web atribuído pela AMA'
        },
        {
          value: '100%',
          label: 'Conformidade WCAG 2.1 AA europeu'
        },
        {
          value: 'Universal',
          label: 'Acesso pleno em leitores de ecrã e teclado'
        }
      ]
    },

    // O Processo
    process: {
      headline: 'Diagnóstico contínuo, testes com tecnologias assistivas e validação normativa rigorosa.',
      steps: [
        {
          title: 'Auditoria & Diagnóstico Heurístico',
          description: 'Mapeamento exaustivo das não-conformidades de acessibilidade e pontos de abandono em formulários legados, com recurso ao Access Monitor e avaliações heurísticas.'
        },
        {
          title: 'Prototipagem & Arquitetura de Fluxos',
          description: 'Desenho de novos protótipos de formulários no Figma com contraste otimizado, semântica pré-definida e árvores de decisão simplificadas.'
        },
        {
          title: 'Implementação de Semântica e ARIA',
          description: 'Desenvolvimento e parametrização do código frontend respeitando à risca os requisitos técnicos da norma WCAG 2.1.'
        },
        {
          title: 'Testes Assistivos & Homologação',
          description: 'Sessões de validação prática com leitores de ecrã e submissão formal aos critérios de conformidade da AMA para atribuição do selo.'
        }
      ]
    }
  },

  {
    id: 'arte',
    slug: 'arte',
    client: 'ARTE',
    clientFullName: 'ARTE / ePortugal (AMA)',
    logo: arteLogo,
    image: caseArte,
    challengeImage: caseArte,
    solutionImage: solucaoAutomacao,
    resultsImage: solucaoModernizacao,
    title: 'Otimização de Experiência no ePortugal & Selo de Ouro AMA em Usabilidade',
    cardHeadline: 'Redução do abandono de formulários com melhoria da experiência e selo de ouro da AMA em usabilidade.',
    shortDescription: 'Redução do abandono de formulários, numa melhoria da experiência e na conquista do selo de ouro da AMA em usabilidade e acessibilidade.',
    cardBg: 'bg-[#F59E0B]',
    cardTextColor: '#B45309',
    mediumUrl: 'https://medium.com/@alexseles/improving-user-experience-and-accessibility-through-streamlined-form-design-for-eportugal-197850409b55',
    summary: 'Reengenharia inteligente da experiência de formulários e integração de APIs de serviços centrais no ecossistema ePortugal, reduzindo o abandono de processos e conquistando o Selo de Ouro da AMA.',
    industry: 'Administração Pública & Transformação Digital',
    services: 'Engenharia de Frontend, Redesenho de Formulários, Integração de APIs & Usabilidade Digital',
    scope: 'Portal Nacional ePortugal • Milhões de transações de cidadãos e empresas',
    
    // O Desafio
    challenge: {
      headline: 'Superar elevadas taxas de abandono em formulários públicos críticos e simplificar a burocracia.',
      paragraphs: [
        'No âmbito do portal ePortugal, gerido pela Agência para a Modernização Administrativa (AMA), cidadãos e empresários necessitam de preencher formulários complexos para aceder a serviços estatais essenciais, licenças e comunicações oficiais.',
        'A versão legada destes formulários registava elevadas taxas de desistência a meio do processo. As principais fricções deviam-se à excessiva quantidade de campos redundantes, necessidade de introduzir dados que o Estado já detinha, pesquisas de endereços manuais propensas a erros e menus de seleção excessivamente longos.',
        'Era imperativo conceber uma jornada de preenchimento ágil, moderna e fluida, que reduzisse o tempo de conclusão, aumentasse a taxa de sucesso da submissão e cumprisse os mais rigorosos padrões de acessibilidade e usabilidade do Estado português.'
      ]
    },

    // A Solução
    solution: {
      headline: 'Automação inteligente com APIs de moradas, autenticação segura e navegação vertical guiada.',
      paragraphs: [
        'A intervenção técnica liderada por Alex Seles concentrou-se em transformar formulários antes vistos como burocráticos em experiências interativas de elevada conveniência e precisão.',
        'A solução foi construída com base em quatro componentes de excelência:'
      ],
      pillars: [
        {
          name: 'Autopreenchimento de Moradas via API CTT',
          description: 'Integração de serviços web diretos com a base de dados dos CTT: a introdução do código postal preenche de imediato e sem erros a rua, freguesia, concelho e distrito, poupando minutos de digitação.'
        },
        {
          name: 'Autenticação e Pré-preenchimento Cadastral',
          description: 'Conexão segura com a Chave Móvel Digital e Cartão de Cidadão, permitindo que os dados pessoais do requerente sejam pré-carregados instantaneamente mediante autorização do titular.'
        },
        {
          name: 'Navegação Vertical por Etapas (Step-by-Step)',
          description: 'Substituição de páginas infinitas por um assistente vertical progressivo, indicando o tempo estimado, o progresso real e guardando o rascunho a cada passo para evitar perda de dados.'
        },
        {
          name: 'Seletores Inteligentes & Upload Acessível',
          description: 'Substituição de longas listas de rádio por seletores com pesquisa preditiva contextual (atividades cruzadas com municípios) e redesenho do upload de documentos com foco em tecnologias assistivas.'
        }
      ]
    },

    // As Tecnologias
    technologies: [
      'React & JavaScript Moderno',
      'Design System da AMA',
      'REST APIs (CTT & Autenticação Gov)',
      'WCAG 2.1 (Nível Ouro)',
      'Figma (UX Research & Prototipagem)',
      'Jira Software',
      'Miro (Service Blueprinting)'
    ],

    // Os Resultados
    results: {
      headline: 'Queda drástica no abandono, máxima satisfação e atribuição do Selo de Ouro da AMA.',
      paragraphs: [
        'A reformulação dos formulários produziu um impacto imediato na experiência de dezenas de milhares de utilizadores.',
        'O índice de desistência despencou para mínimos históricos, e a taxa de preenchimento correto à primeira tentativa aumentou expressivamente, poupando centenas de horas de trabalho aos serviços de atendimento presencial e telefónico da administração pública.',
        'O projeto foi distinguido com a mais alta honraria da modernização administrativa portuguesa: o prestigiado Selo de Ouro da AMA em usabilidade e acessibilidade.'
      ],
      metrics: [
        {
          value: 'Selo de Ouro',
          label: 'Reconhecimento máximo da AMA em Usabilidade'
        },
        {
          value: '-65%',
          label: 'Redução na taxa de abandono de formulários'
        },
        {
          value: 'Zero Erros',
          label: 'Nas moradas através da integração CTT'
        }
      ]
    },

    // O Processo
    process: {
      headline: 'Metodologia centrada no utilizador, testes de campo gravados e engenharia de integração.',
      steps: [
        {
          title: 'Mapeamento de Pontos de Fricção',
          description: 'Análise detalhada de funis de submissão e sessões de testes gravados para identificar exatamente onde os utilizadores desistiam.'
        },
        {
          title: 'Prototipagem de Formulários Assistidos',
          description: 'Criação de novos padrões de interação no Figma, validados e afinados com base no Design System oficial da AMA.'
        },
        {
          title: 'Integração de APIs Críticas',
          description: 'Desenvolvimento das camadas de ligação à API dos CTT e serviços de autenticação do Estado, garantindo resposta em frações de segundo.'
        },
        {
          title: 'Homologação e Certificação Ouro',
          description: 'Auditoria minuciosa das diretrizes de usabilidade e acessibilidade com o júri da AMA até à atribuição final do Selo de Ouro.'
        }
      ]
    }
  },

  {
    id: 'tivit',
    slug: 'tivit',
    client: 'TIVIT',
    clientFullName: 'TIVIT Multinacional de Tecnologia',
    logo: tivitLogo,
    image: datativit,
    challengeImage: datativit,
    solutionImage: solucaoAutomacao,
    resultsImage: solucaoCapacitacao,
    title: 'Migração Crítica de Data Center para Cloud & Sistema IoT Seguro em Telecomunicações',
    cardHeadline: 'Migração crítica de data center para a cloud e controlo IoT com aumento de 45% no EBITDA, zero incidentes e 100% de SLA.',
    shortDescription: 'Migração de data center para cloud e sistema IoT seguro em câmaras frias: +45% no EBITDA, 0 incidentes e 100% de SLA.',
    cardBg: 'bg-[#EA580C]',
    cardTextColor: '#C2410C',
    textContrast: 'text-white',
    summary: 'Orquestração técnica e governança da migração de infraestrutura legada para multi-cloud, associada à implementação de sistema IoT de controlo de acessos a câmaras frigoríficas de missão crítica.',
    industry: 'Telecomunicações, Cloud & Internet das Coisas (IoT)',
    services: 'Migração Multi-Cloud (Azure/AWS/Oracle), Engenharia IoT, ITSM/ITIL 4 & Governação Híbrida',
    scope: 'Infraestrutura Crítica Corporativa • Escopo Executivo Internacional',
    
    // O Desafio
    challenge: {
      headline: 'Operador de telecomunicações exigia migração acelerada de data center proprietário e segurança IoT em ambiente refrigerado.',
      paragraphs: [
        'Um importante operador internacional de telecomunicações necessitava com caráter de urgência de migrar todo o seu ecossistema de dados, alojado num data center proprietário legado, para infraestrutura moderna de computação em nuvem.',
        'Em paralelo, a operação enfrentava a necessidade mandatória de conceber e implementar uma solução segura de controlo de acessos baseada em Internet das Coisas (IoT) para câmaras frigoríficas de armazenamento crítico (cold-storage chambers), sujeitas a severas inspeções sanitárias, regulamentações rigorosas de segurança industrial e supervisão executiva multifuncional contínua.',
        'O projeto impunha prazos inegociáveis de entrada em produção (go-live), exigência de zero disrupção nos serviços de telecomunicações e conformidade incondicional com as métricas de SLA corporativo.'
      ]
    },

    // A Solução
    solution: {
      headline: 'Migração multi-cloud sem downtime aliada a engenharia IoT com túneis encriptados de telemetria.',
      paragraphs: [
        'Alex Seles assumiu a liderança técnica e estratégica da migração e do ecossistema IoT, estabelecendo uma governança rigorosa alinhada com as melhores práticas de ITSM e ITIL 4.',
        'A intervenção estruturou-se em quatro eixos de engenharia:'
      ],
      pillars: [
        {
          name: 'Migração de Data Center para Multi-Cloud',
          description: 'Condução e orquestração do plano de transição para arquiteturas cloud (Oracle Cloud Infrastructure, Microsoft Azure e AWS), reduzindo custos de licenças, suporte físico e obsolescência de hardware.'
        },
        {
          name: 'Arquitetura IoT de Controlo de Acessos',
          description: 'Conceção e desenvolvimento de um ecossistema IoT de alta segurança para controlo de portas, acessos físicos e monitorização de parâmetros térmicos nas câmaras frigoríficas, desenvolvido em C#, .NET, Java (Spring Boot), Python e React.'
        },
        {
          name: 'Túneis de Dados Cifrados e Segurança de Rede',
          description: 'Blindagem completa do tráfego IoT através de canais encriptados seguros e autenticação mútua de dispositivos, prevenindo intrusões cibernéticas e garantindo integridade regulatória.'
        },
        {
          name: 'Governação Híbrida (Ágil & Preditiva)',
          description: 'Orquestração de sprints ágeis de desenvolvimento de software (Scrum/Kanban via Jira e Azure Boards) com controlo preditivo de marcos e contingências executivas (MS Project, Confluence e apresentações de conselho).'
        }
      ]
    },

    // As Tecnologias
    technologies: [
      'Oracle Cloud Infrastructure (OCI)',
      'Microsoft Azure',
      'Amazon Web Services (AWS)',
      'C# & .NET Core',
      'Java (Spring Boot)',
      'Python',
      'React',
      'Protocolos IoT & MQTT',
      'Túneis Encriptados (TLS/VPN)',
      'ITIL 4 & ITSM Frameworks',
      'Jira Software & Azure Boards',
      'MS Project & Confluence'
    ],

    // Os Resultados
    results: {
      headline: 'Aumento de 45% no EBITDA, zero incidentes de segurança e 100% de conformidade de SLA.',
      paragraphs: [
        'A transição para a cloud e a ativação do sistema de segurança IoT superaram todas as metas operacionais e financeiras estabelecidas pelo conselho de administração.',
        'A drástica redução dos custos de infraestrutura física, associada à automação de operações e diminuição de despesas de manutenção predial, impulsionou diretamente a rentabilidade do operador.',
        'O sistema de controlo de acessos funcionou com disponibilidade ininterrupta, registando zero incidentes de segurança industrial e consolidando o projeto como um caso exemplar de retorno de investimento.'
      ],
      metrics: [
        {
          value: '+45%',
          label: 'Aumento real comprovado no EBITDA'
        },
        {
          value: '0',
          label: 'Incidentes de segurança e falhas regulatórias'
        },
        {
          value: '100%',
          label: 'Conformidade integral com métricas de SLA'
        }
      ]
    },

    // O Processo
    process: {
      headline: 'Governação executiva com equipas multiculturais e entrega em sprints coordenados.',
      steps: [
        {
          title: 'Avaliação de Riscos & Desenho da Nuvem',
          description: 'Levantamento da matriz de criticidade do data center legado e arquitetura das zonas de destino em Azure, AWS e OCI.'
        },
        {
          title: 'Desenvolvimento do Firmware e Solução IoT',
          description: 'Engenharia das aplicações em C#, .NET e Java para comunicação com os sensores das câmaras frias sob protocolos seguros.'
        },
        {
          title: 'Migração Faseada em Janelas Seguras',
          description: 'Transferência e replicação de dados em horários de baixo tráfego, validando a integridade das cargas sem qualquer disrupção nos serviços aos clientes.'
        },
        {
          title: 'Transição Operacional & Operação sob ITIL',
          description: 'Capacitação da equipa de operações de suporte contínuo (NOC/SOC) sob processos ITIL 4 com dashboards executivos de SLA em tempo real.'
        }
      ]
    }
  },

  {
    id: 'capgemini',
    slug: 'capgemini',
    client: 'Capgemini',
    clientFullName: 'Capgemini Global Consulting & Technology',
    logo: capgeminiLogo,
    image: caseCapgemini,
    challengeImage: caseCapgemini,
    solutionImage: solucaoGovernanca,
    resultsImage: solucaoModernizacao,
    title: 'Modernização de Sistemas Críticos & Engenharia Ágil em Larga Escala',
    cardHeadline: 'Modernização de arquiteturas críticas e engenharia ágil com redução de 60% no time-to-market.',
    shortDescription: 'Modernização de arquiteturas críticas e aceleração de entregas contínuas com estabilidade e excelência técnica.',
    cardBg: 'bg-[#9333EA]',
    cardTextColor: '#7E22CE',
    textContrast: 'text-white',
    summary: 'Transformação de sistemas legados de grande porte para arquitetura de microsserviços orientada a eventos e cultura DevOps, reduzindo o time-to-market em 60% e elevando a estabilidade operacional.',
    industry: 'Consultoria de TI, Banca & Serviços Corporativos Globais',
    services: 'Modernização de Legados, Microsserviços, CI/CD, Governação SAFe & Arquitetura Cloud Native',
    scope: 'Grandes Contas Corporativas • Mais de 50 engenheiros de software coordenados',
    
    // O Desafio
    challenge: {
      headline: 'Modernizar arquiteturas monolíticas complexas e eliminar estrangulamentos no ciclo de lançamentos.',
      paragraphs: [
        'Em programas estratégicos desenvolvidos com grandes contas corporativas na Capgemini, os ecossistemas centrais dependiam de monolitos com mais de uma década de desenvolvimento contínuo, altamente acoplados e com dependências técnicas opacas.',
        'Cada ciclo de lançamento para produção exigia semanas de testes manuais exaustivos, gerando recorrentes atrasos na disponibilização de novos produtos ao mercado, elevada incidência de erros de regressão e receio generalizado de efetuar alterações de código.',
        'A liderança executiva exigia uma modernização arquitetural sem descontinuidade do negócio, a redução radical do lead time de desenvolvimento e a implementação de uma disciplina de engenharia de software madura, estável e previsível.'
      ]
    },

    // A Solução
    solution: {
      headline: 'Arquitetura de microsserviços desacoplada, automação de testes e governança SAFe.',
      paragraphs: [
        'Alex Seles desenhou e liderou a transição tecnológica adotando o padrão Strangler Fig, substituindo incrementalmente as funcionalidades do monólito por serviços independentes e altamente coesos.',
        'A transformação assentou em quatro pilares estruturantes:'
      ],
      pillars: [
        {
          name: 'Microsserviços e Event-Driven Architecture',
          description: 'Decomposição de serviços críticos em microsserviços desenvolvidos em Java (Spring Boot) com orquestração assíncrona orientada a eventos via Apache Kafka, garantindo escalabilidade horizontal elástica.'
        },
        {
          name: 'Pipeline CI/CD e Controlo de Qualidade Automatizado',
          description: 'Construção de pipelines automatizados no GitLab CI com suites completas de testes unitários, testes de contrato (contract testing) e análise estática de qualidade no SonarQube com Quality Gates inegociáveis.'
        },
        {
          name: 'Orquestração com Kubernetes e Infraestrutura como Código',
          description: 'Aprovisionamento declarativo de infraestrutura com Terraform e implantação contínua em clusters de Kubernetes (K8s), permitindo rollouts e rollbacks automáticos sem downtime.'
        },
        {
          name: 'Governança Ágil em Escala com SAFe',
          description: 'Coordenação de múltiplos times ágeis através de Program Increments (PI Planning), definição de acordos de entrega previsíveis e acompanhamento sistemático de métricas DORA.'
        }
      ]
    },

    // As Tecnologias
    technologies: [
      'Java (Spring Boot)',
      'Apache Kafka',
      'Docker & Kubernetes (K8s)',
      'GitLab CI/CD',
      'Terraform (IaC)',
      'PostgreSQL & Redis',
      'Prometheus & Grafana',
      'SonarQube',
      'SAFe 6 / Scrum / Kanban',
      'REST & OpenAPI'
    ],

    // Os Resultados
    results: {
      headline: 'Redução de 60% no time-to-market e disponibilidade de 99.98% em ambiente de missão crítica.',
      paragraphs: [
        'A migração gradual eliminou por completo os estrangulamentos de lançamento, permitindo que a organização passasse de deploys trimestrais arriscados para múltiplos deploys contínuos por semana com confiança absoluta.',
        'A estabilidade operacional atingiu níveis recorde, com 99.98% de disponibilidade e redução de 85% nos incidentes relatados por utilizadores finais.',
        'Além do ganho técnico direto, a autonomia e moral das equipas de engenharia foram transformadas, consolidando um ambiente de trabalho de alto rendimento e excelência técnica.'
      ],
      metrics: [
        {
          value: '-60%',
          label: 'No time-to-market de novas funcionalidades'
        },
        {
          value: '99.98%',
          label: 'Disponibilidade e estabilidade em produção'
        },
        {
          value: '+85%',
          label: 'Redução de incidentes pós-lançamento'
        }
      ]
    },

    // O Processo
    process: {
      headline: 'Estratégia de modernização por etapas, sem interrupção de receitas e com mentoria contínua.',
      steps: [
        {
          title: 'Auditoria de Arquitetura e Domínios (DDD)',
          description: 'Mapeamento de contextos delimitados (Bounded Contexts) no código legado para definir fronteiras de microsserviços seguras.'
        },
        {
          title: 'Desenho da Malha de Eventos Kafka',
          description: 'Implementação da infraestrutura de mensageria assíncrona para garantir sincronização bidirecional entre o legado e os novos serviços.'
        },
        {
          title: 'Automação de CI/CD e Quality Gates',
          description: 'Estabelecimento de pipelines rigorosos que bloqueiam deploys com vulnerabilidades ou cobertura insuficiente de testes.'
        },
        {
          title: 'Descomissionamento Seguro do Monólito',
          description: 'Desvio gradual de tráfego de produção através de API Gateways e desligamento seguro de componentes legados obsoletos.'
        }
      ]
    }
  }
];

export const getAllCases = () => casesData;

export const getCaseBySlug = (slug) => {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  return casesData.find((c) => c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized) || null;
};

export const getNextCase = (currentSlug) => {
  const currentIndex = casesData.findIndex((c) => c.slug === currentSlug || c.id === currentSlug);
  if (currentIndex === -1) return casesData[0];
  const nextIndex = (currentIndex + 1) % casesData.length;
  return casesData[nextIndex];
};
