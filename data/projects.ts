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
};

export const projects: Project[] = [
  {
    slug: 'edy-shadowcat', number: '01', title: 'EDY SHADOWCAT', displayTitle: 'SHADOWCAT',
    subtitle: 'Reconnaissance orchestration for deeper insights.',
    summary: 'Uma ferramenta modular de automação de reconnaissance que integra múltiplas ferramentas open source em um fluxo único, com coleta estruturada de evidências e relatórios HTML.',
    keywords: ['Automation', 'Reconnaissance', 'OSINT', 'Reporting'],
    features: ['13 tools em um só fluxo', 'Coleta de evidências', 'Workflows automatizados', 'Relatórios HTML', 'Modos NORMAL e FULL POWER'],
    stack: ['Python', 'Open source tooling', 'HTML reporting', 'Automation'],
    problem: 'Reconnaissance costuma fragmentar evidências, ferramentas e decisões em muitas etapas desconectadas.',
    solution: 'Um orquestrador modular reúne execução, evidências e reporting em uma experiência consistente e auditável.',
    outcome: 'Menos atrito operacional, resultados organizados e uma base clara para investigações mais profundas.',
  },
  {
    slug: 'edy-verdict', number: '02', title: 'EDY VERDICT', displayTitle: 'VERDICT',
    subtitle: 'Assessment workflow for smarter decisions.',
    summary: 'Projeto focado em avaliação estruturada, organização de evidências e lógica de decisão para apoiar conclusões mais consistentes.',
    keywords: ['Assessment', 'Evidence', 'Decisions', 'Workflow'],
    features: ['Avaliação estruturada', 'Fluxo baseado em evidências', 'Apoio à decisão', 'Conclusões claras'],
    stack: ['TypeScript', 'Structured data', 'Decision logic', 'Reporting'],
    problem: 'Avaliações perdem qualidade quando critérios, evidências e conclusões vivem em lugares diferentes.',
    solution: 'Um fluxo guiado organiza sinais, critérios e justificativas antes da decisão final.',
    outcome: 'Análises mais legíveis, repetíveis e fáceis de comunicar.',
  },
  {
    slug: 'edy-recon', number: '03', title: 'EDY RECON', displayTitle: 'RECON',
    subtitle: 'OSINT toolkit for a broader perspective.',
    summary: 'Ferramenta para coleta e organização de informações OSINT, ampliando visibilidade investigativa e suporte à análise.',
    keywords: ['OSINT', 'Discovery', 'Intelligence', 'Research'],
    features: ['Fluxos OSINT', 'Apoio à descoberta', 'Coleta de informações', 'Visibilidade ampliada'],
    stack: ['Python', 'OSINT sources', 'Data processing', 'CLI'],
    problem: 'Fontes abertas geram muito sinal disperso, difícil de reunir e interpretar com consistência.',
    solution: 'A ferramenta organiza descoberta e coleta em um fluxo focado, com saídas preparadas para análise.',
    outcome: 'Uma perspectiva investigativa mais ampla sem perder rastreabilidade.',
  },
  {
    slug: 'edy-scanurl-family', number: '04', title: 'EDY ScanURL Family', displayTitle: 'ScanURL',
    subtitle: 'Website analysis for a safer internet.',
    summary: 'Família de ferramentas voltada à análise de URLs e websites com foco em organização, legibilidade e navegação mais segura.',
    keywords: ['Web security', 'Analysis', 'URLs', 'Safety'],
    features: ['Análise web', 'Navegação mais segura', 'Interface clara', 'Resultados estruturados'],
    stack: ['Next.js', 'TypeScript', 'Security APIs', 'Data visualization'],
    problem: 'Sinais de risco em URLs são técnicos e pouco acessíveis para quem precisa decidir rapidamente.',
    solution: 'Resultados complexos são organizados em uma leitura direta, progressiva e acionável.',
    outcome: 'Mais clareza para reconhecer risco e navegar com confiança.',
  },
  {
    slug: 'edy-helpdesk', number: '05', title: 'EDY HelpDesk', displayTitle: 'HelpDesk',
    subtitle: 'IT support workflow for higher productivity.',
    summary: 'Projeto focado em fluxo de suporte, organização operacional e produtividade para rotinas de help desk.',
    keywords: ['IT Support', 'Workflow', 'Productivity', 'Operations'],
    features: ['Suporte de TI', 'Organização de fluxo', 'Produtividade', 'Operações estruturadas'],
    stack: ['TypeScript', 'Workflow design', 'Knowledge base', 'Automation'],
    problem: 'Solicitações de suporte se perdem quando prioridade, histórico e resolução não seguem um fluxo comum.',
    solution: 'Uma operação estruturada conecta entrada, acompanhamento, documentação e fechamento.',
    outcome: 'Atendimento mais previsível e conhecimento que permanece depois de cada chamado.',
  },
  {
    slug: 'edy-soc-analytics', number: '06', title: 'EDY SOC Analytics', displayTitle: 'SOC Analytics',
    subtitle: 'SOC data visualization for real-time clarity.',
    summary: 'Visualização e organização de dados de segurança com foco em leitura clara, insights e suporte analítico.',
    keywords: ['Security', 'Analytics', 'Visibility', 'Insights'],
    features: ['Analytics de segurança', 'Visualização operacional', 'Visibilidade', 'Geração de insights'],
    stack: ['Data pipelines', 'Analytics', 'Visualization', 'Security operations'],
    problem: 'Grandes volumes de eventos escondem o que realmente merece atenção operacional.',
    solution: 'Camadas de visualização priorizam contexto, tendência e anomalia sem transformar tudo em ruído.',
    outcome: 'Leitura mais rápida do cenário e suporte objetivo à investigação.',
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
