export type Project = {
  slug: string;
  number: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  summary: string;
  keywords: string[];
  features: string[];
  stack: string[];
  problem: string;
  solution: string;
  outcome: string;
  image: ProjectImage;
  caseImage?: ProjectImage;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  fit?: 'cover' | 'contain';
};

export const projects: Project[] = [
  {
    slug: 'edy-shadowcat', number: '01', title: 'EDY SHADOWCAT', displayTitle: 'SHADOWCAT',
    subtitle: 'Orquestração de reconhecimento para análises mais profundas.',
    summary: 'Uma ferramenta modular de automação de reconnaissance que integra múltiplas ferramentas open source em um fluxo único, com coleta estruturada de evidências e relatórios HTML.',
    keywords: ['Automação', 'Reconhecimento', 'OSINT', 'Relatórios'],
    features: ['13 tools em um só fluxo', 'Coleta de evidências', 'Workflows automatizados', 'Relatórios HTML', 'Modos NORMAL e FULL POWER'],
    stack: ['Python', 'Open source tooling', 'HTML reporting', 'Automation'],
    problem: 'Reconnaissance costuma fragmentar evidências, ferramentas e decisões em muitas etapas desconectadas.',
    solution: 'Um orquestrador modular reúne execução, evidências e reporting em uma experiência consistente e auditável.',
    outcome: 'Menos atrito operacional, resultados organizados e uma base clara para investigações mais profundas.',
    image: {
      src: '/images/projects/shadowcat-dashboard.webp',
      alt: 'Dashboard real do EDY SHADOWCAT com investigações, evidências, IA e resultados',
      width: 1920,
      height: 1080,
      position: 'center top',
    },
  },
  {
    slug: 'edy-verdict', number: '02', title: 'EDY VERDICT', displayTitle: 'VERDICT',
    subtitle: 'Fluxo de avaliação para decisões mais inteligentes.',
    summary: 'Projeto focado em avaliação estruturada, organização de evidências e lógica de decisão para apoiar conclusões mais consistentes.',
    keywords: ['Avaliação', 'Evidências', 'Decisões', 'Fluxo de trabalho'],
    features: ['Avaliação estruturada', 'Fluxo baseado em evidências', 'Apoio à decisão', 'Conclusões claras'],
    stack: ['TypeScript', 'Structured data', 'Decision logic', 'Reporting'],
    problem: 'Avaliações perdem qualidade quando critérios, evidências e conclusões vivem em lugares diferentes.',
    solution: 'Um fluxo guiado organiza sinais, critérios e justificativas antes da decisão final.',
    outcome: 'Análises mais legíveis, repetíveis e fáceis de comunicar.',
    image: {
      src: '/images/projects/verdict-home.png',
      alt: 'Tela inicial real do EDY VERDICT com visão geral do centro local de segurança',
      width: 1920,
      height: 1080,
      position: 'center top',
    },
    caseImage: {
      src: '/images/projects/verdict-investigations.png',
      alt: 'Área de investigações do EDY VERDICT com métricas, casos correlacionados e menu completo',
      width: 1920,
      height: 1080,
      fit: 'contain',
    },
  },
  {
    slug: 'edy-recon', number: '03', title: 'EDY RECON', displayTitle: 'RECON',
    subtitle: 'Ferramentas OSINT para uma perspectiva mais ampla.',
    summary: 'Ferramenta para coleta e organização de informações OSINT, ampliando visibilidade investigativa e suporte à análise.',
    keywords: ['OSINT', 'Descoberta', 'Inteligência', 'Pesquisa'],
    features: ['Fluxos OSINT', 'Apoio à descoberta', 'Coleta de informações', 'Visibilidade ampliada'],
    stack: ['Python', 'OSINT sources', 'Data processing', 'CLI'],
    problem: 'Fontes abertas geram muito sinal disperso, difícil de reunir e interpretar com consistência.',
    solution: 'A ferramenta organiza descoberta e coleta em um fluxo focado, com saídas preparadas para análise.',
    outcome: 'Uma perspectiva investigativa mais ampla sem perder rastreabilidade.',
    image: {
      src: '/images/projects/recon-terminal.png',
      alt: 'Tela real do EDY RECON com status de memória e menu principal de fluxos OSINT',
      width: 964,
      height: 848,
      fit: 'contain',
    },
    caseImage: {
      src: '/images/projects/recon-menu.png',
      alt: 'Menu principal completo do EDY RECON com todos os fluxos OSINT disponíveis',
      width: 1400,
      height: 820,
      fit: 'contain',
    },
  },
  {
    slug: 'edy-scanurl-family', number: '04', title: 'EDY ScanURL Family', displayTitle: 'ScanURL',
    subtitle: 'Análise de sites para uma internet mais segura.',
    summary: 'Família de ferramentas voltada à análise de URLs e websites com foco em organização, legibilidade e navegação mais segura.',
    keywords: ['Segurança web', 'Análise', 'URLs', 'Proteção'],
    features: ['Análise web', 'Navegação mais segura', 'Interface clara', 'Resultados estruturados'],
    stack: ['Next.js', 'TypeScript', 'Security APIs', 'Data visualization'],
    problem: 'Sinais de risco em URLs são técnicos e pouco acessíveis para quem precisa decidir rapidamente.',
    solution: 'Resultados complexos são organizados em uma leitura direta, progressiva e acionável.',
    outcome: 'Mais clareza para reconhecer risco e navegar com confiança.',
    image: {
      src: '/images/projects/scanurl-home.png',
      alt: 'Tela inicial real do EDY ScanURL Family para verificação de links antes de uma compra',
      width: 1892,
      height: 1036,
      position: 'center top',
    },
    caseImage: {
      src: '/images/projects/scanurl-result.jpg',
      alt: 'Resultado detalhado do EDY ScanURL com sinais encontrados, cobertura e recomendação',
      width: 1905,
      height: 946,
      fit: 'contain',
    },
  },
  {
    slug: 'edy-helpdesk', number: '05', title: 'EDY HelpDesk', displayTitle: 'HelpDesk',
    subtitle: 'Fluxo de suporte de TI para maior produtividade.',
    summary: 'Projeto focado em fluxo de suporte, organização operacional e produtividade para rotinas de help desk.',
    keywords: ['Suporte de TI', 'Fluxo de trabalho', 'Produtividade', 'Operações'],
    features: ['Suporte de TI', 'Organização de fluxo', 'Produtividade', 'Operações estruturadas'],
    stack: ['TypeScript', 'Workflow design', 'Knowledge base', 'Automation'],
    problem: 'Solicitações de suporte se perdem quando prioridade, histórico e resolução não seguem um fluxo comum.',
    solution: 'Uma operação estruturada conecta entrada, acompanhamento, documentação e fechamento.',
    outcome: 'Atendimento mais previsível e conhecimento que permanece depois de cada chamado.',
    image: {
      src: '/images/projects/helpdesk-operations.png',
      alt: 'Centro de operações real do EDY HelpDesk',
      width: 1905,
      height: 890,
      position: 'center top',
    },
    caseImage: {
      src: '/images/projects/helpdesk-ticket-workspace.png',
      alt: 'Área completa de atendimento do EDY HelpDesk com menu, chamado, histórico e ações',
      width: 1425,
      height: 891,
      fit: 'contain',
    },
  },
  {
    slug: 'edy-soc-analytics', number: '06', title: 'EDY SOC Analytics', displayTitle: 'SOC Analytics',
    subtitle: 'Visualização de dados SOC para clareza em tempo real.',
    summary: 'Visualização e organização de dados de segurança com foco em leitura clara, insights e suporte analítico.',
    keywords: ['Segurança', 'Análise', 'Visibilidade', 'Insights'],
    features: ['Analytics de segurança', 'Visualização operacional', 'Visibilidade', 'Geração de insights'],
    stack: ['Data pipelines', 'Analytics', 'Visualization', 'Security operations'],
    problem: 'Grandes volumes de eventos escondem o que realmente merece atenção operacional.',
    solution: 'Camadas de visualização priorizam contexto, tendência e anomalia sem transformar tudo em ruído.',
    outcome: 'Leitura mais rápida do cenário e suporte objetivo à investigação.',
    image: {
      src: '/images/projects/soc-command-center.png',
      alt: 'Command Center real do EDY SOC Analytics com indicadores de segurança',
      width: 2672,
      height: 1640,
      position: 'center top',
    },
    caseImage: {
      src: '/images/projects/soc-operations.png',
      alt: 'Visão de operações do EDY SOC Analytics com indicadores, gráficos e navegação completa',
      width: 2672,
      height: 1640,
      fit: 'contain',
    },
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
