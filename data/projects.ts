export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  fit?: 'cover' | 'contain';
};

export type CaseSlide = {
  image: ProjectImage;
  title: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  summary: string;
  status: string;
  keywords: string[];
  features: string[];
  stack: string[];
  problem: string;
  solution: string;
  outcome: string;
  links: { label: string; href: string }[];
  image: ProjectImage;
  caseImage?: ProjectImage;
  caseImageTitle?: string;
  caseImageContext?: string;
  caseGallery?: CaseSlide[];
  heroImage?: ProjectImage;
};

export const crmProject: Project = {
  slug: 'edy-crm', title: 'EDY CRM', displayTitle: 'CRM',
  subtitle: 'Da pesquisa de uma empresa à prévia versionada.',
  summary: 'Workspace local para organizar empresas, fontes e materiais, revisar briefs, compor propostas visuais e construir prévias versionadas. Desenvolvido por EDY GOMES a partir do ProspectOS, com atribuição MIT preservada. O case público inclui código executável e demonstração isolada com dados fictícios.',
  status: 'Código público e demonstração local com dados fictícios.',
  keywords: ['Prospecção', 'Composição visual', 'Prévias locais'],
  features: ['Empresas, contatos, funil e tarefas no workspace', 'Briefs adaptativos com histórico de versões', 'Estúdio visual e montagem por seção', 'Prévia local com criação e refinamento por texto', 'Voz e Codex como integrações opcionais configuráveis', 'Exportação ZIP com caminhos portáteis'],
  stack: ['React', 'TypeScript', 'Flask', 'SQLite', 'Codex app-server'],
  problem: 'Pesquisa, decisões visuais, materiais e versões de uma proposta precisam manter o contexto entre etapas, sem confundir uma composição escolhida com uma página pronta.',
  solution: 'O CRM reúne revisão de brief, seleção de materiais, composição por seção, fila persistente e prévias vinculadas à empresa e à versão. Estados explícitos distinguem composição, execução e página disponível.',
  outcome: 'Código e demonstração públicos para execução local. O exemplo constrói prévias determinísticas com empresas fictícias; Codex, modelos de voz e provedores externos dependem de configuração e acesso próprios. A aplicação não publica páginas nem envia prospecção automaticamente.',
  links: [{ label: 'Ver código e demonstração', href: 'https://github.com/EDY075/EDY-CRM' }],
  image: { src: '/images/projects/covers/edy-crm-1600.webp', alt: 'Capa do EDY CRM com captura real do dashboard e dados de demonstração fictícios', width: 1600, height: 1000 },
  caseImage: { src: '/images/projects/cases/edy-crm-dashboard.webp', alt: 'Dashboard real do EDY CRM com empresas e oportunidades fictícias', width: 1295, height: 863, fit: 'contain' },
  caseImageTitle: 'Visão do trabalho',
  caseImageContext: 'Captura do aplicativo local com dados fictícios do case público. Indicadores descrevem a demonstração, sem estimar vendas ou resultados comerciais.',
  caseGallery: [{ title: 'Composição por seção', caption: 'Montagem de uma proposta na demonstração pública. Composição escolhida, prévia disponível e aprovação de publicação são etapas distintas.', image: { src: '/images/projects/cases/edy-crm-montagem.webp', alt: 'Estúdio de montagem por seção do EDY CRM com materiais fictícios', width: 1574, height: 1762, fit: 'contain' } }],
};

export const featuredProjects: Project[] = [
  {
    slug: 'andrea-tur', title: 'Andréa Tur', displayTitle: 'Andréa Tur',
    subtitle: 'Viagens e destinos em uma experiência editorial.',
    summary: 'Site responsivo de turismo com viagens, agenda, destinos, galeria e perguntas frequentes. O conteúdo é gerenciado por um painel privado; reservas são combinadas e confirmadas com Andréa pelo WhatsApp.',
    status: 'Site de turismo desenvolvido para cliente.',
    keywords: ['Turismo', 'Site de cliente', 'Design editorial'],
    features: ['Viagens e agenda públicas', 'Páginas de destinos e detalhes', 'Galeria e perguntas frequentes', 'Contato para reserva pelo WhatsApp'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Cloudflare Workers'],
    problem: 'As informações de viagens precisavam ser fáceis de explorar e atualizar, com um caminho claro para falar com a responsável.',
    solution: 'O site organiza a descoberta de viagens e destinos em páginas responsivas, enquanto um painel privado mantém o conteúdo público atualizado.',
    outcome: 'A experiência está implementada para a cliente. A reserva é combinada e confirmada diretamente com Andréa.',
    links: [{ label: 'Endereço do site', href: 'https://andrea-tur.edy-scanurl-family-worker.workers.dev/' }],
    image: { src: '/images/projects/covers/andrea-tur-1600.webp', alt: 'Capa editorial com captura real da página inicial do site Andréa Tur', width: 1600, height: 1000, position: 'center' },
    caseImage: { src: '/images/projects/covers/andrea-tur-site.webp', alt: 'Captura da página inicial do site Andréa Tur, com sua identidade visual de viagens', width: 1440, height: 480, fit: 'contain' },
    caseImageTitle: 'Página inicial',
    caseImageContext: 'Página inicial da experiência de viagens, em captura do projeto.',
    caseGallery: [{ title: 'Destinos', caption: 'Página de destinos em captura de verificação do site. A agenda e a disponibilidade devem ser consultadas com Andréa.', image: { src: '/images/projects/cases/andrea-destinos.webp', alt: 'Página de destinos do site Andréa Tur', width: 1440, height: 900, fit: 'contain' } }],
  },
  {
    slug: 'edy-scanurl-family', title: 'EDY ScanURL Family', displayTitle: 'ScanURL Family',
    subtitle: 'Sinais públicos para avaliar um link antes de comprar.',
    summary: 'Aplicação defensiva em português: analisa sinais públicos de uma loja e apresenta conclusão, motivos, recomendações e cobertura da verificação. Uma análise reduz riscos, mas não garante a segurança da compra.',
    status: 'Web/PWA publicada; confirmação física final do Android pendente.',
    keywords: ['Segurança web', 'Web/PWA', 'Análise de URLs'],
    features: ['Conclusão em linguagem simples', 'Risco separado da cobertura da análise', 'Motivos e fontes explicados', 'Histórico opcional no dispositivo'],
    stack: ['React', 'TypeScript', 'Cloudflare Pages', 'Cloudflare Workers'],
    problem: 'Sinais técnicos de risco são difíceis de interpretar antes de uma compra online.',
    solution: 'A interface separa sinais positivos, alertas, riscos e verificações sem dados suficientes, sem tratar ausência de informação como prova de risco.',
    outcome: 'A versão web pode ser acessada publicamente. O aplicativo Android ainda aguarda confirmação física final.',
    links: [
      { label: 'Acessar versão web', href: 'https://edy-scanurl-family.pages.dev/' },
      { label: 'Ver código', href: 'https://github.com/EDY075/edy-scanurl-family' },
    ],
    image: { src: '/images/projects/covers/edy-scanurl-family-1600.webp', alt: 'Capa editorial com a interface pública do EDY ScanURL Family', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/scanurl-result.jpg', alt: 'Resultado do EDY ScanURL Family com sinais encontrados, cobertura e recomendação', width: 1905, height: 946, fit: 'contain' },
    caseImageTitle: 'Resultado da análise',
    caseImageContext: 'Resultado de análise: sinais, cobertura e recomendação são apresentados separadamente.',
    caseGallery: [{ title: 'Versão web publicada', caption: 'Captura recente da página pública. A análise orienta a decisão, sem prometer segurança absoluta.', image: { src: '/images/projects/cases/scanurl-public.webp', alt: 'Página pública atual do EDY ScanURL Family', width: 1440, height: 900, fit: 'contain' } }],
  },
  {
    slug: 'edy-helpdesk', title: 'EDY HelpDesk', displayTitle: 'HelpDesk',
    subtitle: 'Service Desk local para chamados, SLA e ativos.',
    summary: 'Aplicação local para gestão de chamados, SLA, ativos e suporte a endpoints Windows. A demonstração de portfólio usa dados sintéticos e é iniciada no computador do usuário; não há demo hospedada.',
    status: 'Release pública v1.0.1; demonstração local.',
    keywords: ['Suporte de TI', 'Service Desk', 'Aplicação local'],
    features: ['Ciclo de vida e histórico de chamados', 'SLA e inventário de ativos', 'Diagnósticos Windows somente leitura', 'Base de conhecimento versionada'],
    stack: ['TypeScript', 'React', 'Node.js', 'SQLite'],
    problem: 'Chamados, ativos e contexto de atendimento exigem um histórico operacional comum.',
    solution: 'O HelpDesk reúne fluxos de atendimento, SLA, inventário, diagnósticos controlados e documentação em uma aplicação local.',
    outcome: 'Código e release v1.0.1 estão públicos; a demonstração pode ser iniciada localmente com dados sintéticos.',
    links: [{ label: 'Ver repositório e instalação', href: 'https://github.com/EDY075/EDY-HelpDesk' }],
    image: { src: '/images/projects/covers/edy-helpdesk-1600.webp', alt: 'Capa editorial do EDY HelpDesk com captura da área de atendimento', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/helpdesk-ticket-workspace.png', alt: 'Área completa de atendimento do EDY HelpDesk com dados sintéticos', width: 1425, height: 891, fit: 'contain' },
    caseImageTitle: 'Área de atendimento',
    caseImageContext: 'Área de atendimento da demonstração local, com chamados e dados sintéticos.',
    caseGallery: [{ title: 'Base de conhecimento', caption: 'Vista da base de conhecimento da demonstração local; os registros exibidos são sintéticos.', image: { src: '/images/projects/cases/helpdesk-knowledge.webp', alt: 'Base de conhecimento do EDY HelpDesk com dados de demonstração', width: 1425, height: 891, fit: 'contain' } }],
  },
  {
    slug: 'edy-shield', title: 'EDY Shield', displayTitle: 'Shield',
    subtitle: 'Integridade de arquivos e investigação local de alertas.',
    summary: 'Ferramenta defensiva local em Python para estabelecer baselines, detectar alterações em arquivos, analisar hashes e investigar alertas. A entrega de eventos ao EDY SIEM é opcional e mantém uma fila local durável.',
    status: 'Release pública v2.3.0; execução local.',
    keywords: ['Endpoint', 'Integridade', 'Blue Team'],
    features: ['Monitoramento de integridade de arquivos', 'Comparação de hashes e evidências', 'Triagem de alertas', 'Envio opcional ao EDY SIEM'],
    stack: ['Python', 'SQLite', 'HTML/CSS/JavaScript', 'REST API'],
    problem: 'Mudanças em arquivos críticos precisam de contexto e evidências para serem avaliadas sem depender de um serviço externo.',
    solution: 'O Shield mantém baseline, varredura, alertas e investigação no endpoint, com integração opcional para o SIEM.',
    outcome: 'Ferramenta e release públicas para execução local, com fluxo de integridade e investigação documentado.',
    links: [{ label: 'Ver repositório e release', href: 'https://github.com/EDY075/edy-shield' }],
    image: { src: '/images/projects/covers/edy-shield-1600.webp', alt: 'Capa editorial do EDY Shield com captura do centro de integridade', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/shield-endpoint-integrity.png', alt: 'Centro de integridade de endpoint do EDY Shield em captura da release', width: 1920, height: 820, fit: 'contain' },
    caseImageTitle: 'Integridade do endpoint',
    caseImageContext: 'Centro de integridade de arquivos na release pública do aplicativo local.',
    caseGallery: [{ title: 'Fluxo com o SIEM', caption: 'Captura do fluxo de entrega opcional de eventos ao EDY SIEM, com fila local durável.', image: { src: '/images/projects/cases/shield-siem-handoff.webp', alt: 'Fluxo de entrega de eventos do EDY Shield ao EDY SIEM', width: 1600, height: 900, fit: 'contain' } }],
  },
  {
    slug: 'edy-siem', title: 'EDY SIEM', displayTitle: 'SIEM',
    subtitle: 'Detecção, investigação e resposta para operações SOC.',
    summary: 'Workspace SOC com backend Python e interface React. A versão documentada organiza eventos, fila de decisões, investigação com evidências, responsáveis, SLA e casos; pode ser iniciada localmente com dados de demonstração.',
    status: 'Release pública v0.3.0; aplicação local.',
    keywords: ['SOC', 'SIEM', 'Investigação'],
    features: ['Fila de decisões operacionais', 'Investigação com evidências', 'Alertas, incidentes e casos', 'Recebimento de eventos do EDY Shield'],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite'],
    problem: 'Eventos e alertas isolados não mostram com clareza o que exige decisão, quem é responsável e quais evidências sustentam a ação.',
    solution: 'O workspace conecta ingestão, priorização, investigação e casos em um fluxo SOC com estado persistido.',
    outcome: 'A release v0.3.0 documenta o fluxo Shield → SIEM; não há demo pública hospedada.',
    links: [{ label: 'Ver repositório e release', href: 'https://github.com/EDY075/EDYSIEM' }],
    image: { src: '/images/projects/covers/edy-siem-1600.webp', alt: 'Capa editorial do EDY SIEM com captura do centro de decisões SOC', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/siem-decision-center.png', alt: 'SOC Decision Center do EDY SIEM em captura da release', width: 1920, height: 1080, fit: 'contain' },
    caseImageTitle: 'Decisões SOC',
    caseImageContext: 'Fila de decisões operacionais da release, com prioridades e responsáveis.',
    caseGallery: [{ title: 'Casos em investigação', caption: 'Espaço de casos da release pública. A aplicação é iniciada localmente, sem demo hospedada.', image: { src: '/images/projects/cases/siem-case-center.webp', alt: 'Centro de casos do EDY SIEM', width: 1600, height: 1066, fit: 'contain' } }],
  },
  {
    slug: 'edy-soc-analytics', title: 'EDY SOC Analytics', displayTitle: 'SOC Analytics',
    subtitle: 'Análise de operações de segurança em Power BI.',
    summary: 'Relatório Power BI de dez páginas com dados inteiramente sintéticos. Organiza a jornada de evento, alerta e incidente com backlog, SLA, contexto MITRE ATT&CK e qualidade das fontes.',
    status: 'Release pública v1.1.0; sem publicação no Power BI Service.',
    keywords: ['Power BI', 'Blue Team', 'Dados sintéticos'],
    features: ['Command Center e fila de prioridade', 'Backlog e indicadores de SLA', 'Contexto MITRE ATT&CK', 'Experiência mobile do relatório'],
    stack: ['Power BI', 'DAX', 'Power Query', 'Python'],
    problem: 'Um SOC precisa enxergar prioridades e limites dos dados, além de contar eventos e alertas.',
    solution: 'O relatório usa um modelo dimensional e páginas analíticas para dar contexto a incidentes, tempos de resposta e qualidade das fontes.',
    outcome: 'Projeto e release disponíveis no GitHub para reprodução no Power BI Desktop; a versão não foi publicada no Power BI Service.',
    links: [{ label: 'Ver projeto e release', href: 'https://github.com/EDY075/EDY-SOC-Analytics' }],
    image: { src: '/images/projects/covers/edy-soc-analytics-1600.webp', alt: 'Arte conceitual identificada do EDY SOC Analytics; o relatório real está no case', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/soc-operations.png', alt: 'Visão de operações do EDY SOC Analytics com dados sintéticos', width: 2672, height: 1640, fit: 'contain' },
    caseImageTitle: 'Visão de operações',
    caseImageContext: 'Visão de operações do relatório Power BI com dados inteiramente sintéticos.',
    caseGallery: [{ title: 'Detalhe de incidente', caption: 'Página de investigação do relatório. Valores e ocorrências exibidos são exemplos sintéticos.', image: { src: '/images/projects/cases/soc-incident.webp', alt: 'Página de detalhe de incidente do EDY SOC Analytics com dados sintéticos', width: 1600, height: 1201, fit: 'contain' } }],
  },
  crmProject,
];

export const technicalProjects: Project[] = [
  {
    slug: 'war-room', title: 'WAR ROOM', displayTitle: 'WAR ROOM',
    subtitle: 'Investigação histórica em uma experiência documental.',
    summary: 'Experiência cinematográfica sobre incidentes e conflitos cibernéticos. Reúne 17 dossiês em seis capítulos cada, cartografia, análise, referências públicas e cerca de 42 minutos de narração baseada na voz do autor, com síntese autorizada.',
    status: 'Publicado no GitHub Pages; 17 dossiês e 102 capítulos com leitura e áudio.',
    keywords: ['Documentário', 'Threat Intelligence', 'Web'],
    features: ['17 dossiês e 102 capítulos documentais', 'Abas de resumo, história, análise, mídia e fontes', 'Busca, filtros, mapa e cronologia sincronizados', 'Links diretos e contexto restaurado no histórico', 'Narração autorizada por episódio ou capítulo', 'Leitura independente de áudio e efeitos reduzidos'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'GitHub Pages'],
    problem: 'Uma coleção de incidentes precisa conectar contexto, fontes e consequências sem fragmentar a leitura ou perder a clareza sobre atribuições e estimativas.',
    solution: 'Um dossiê com cinco abas organiza a investigação. Os seis capítulos têm avanço manual, imagens creditadas e mapas de contexto; a navegação preserva seleção, filtros e histórico.',
    outcome: 'Os 17 casos têm leitura completa e narração prolongada com síntese autorizada da voz do autor. A mídia carrega por escolha, e efeitos reduzidos interrompem os loops decorativos. É um arquivo histórico e educacional, sem telemetria ao vivo.',
    links: [
      { label: 'Explorar WAR ROOM', href: 'https://edy075.github.io/WAR_ROOM/' },
      { label: 'Ouvir os 17 casos', href: 'https://edy075.github.io/WAR_ROOM/assets/media/narrations/' },
      { label: 'Ver código', href: 'https://github.com/EDY075/WAR_ROOM' },
    ],
    image: { src: '/images/projects/covers/war-room-galaxy-1600.webp', alt: 'Hero real do WAR ROOM com galáxia ilustrativa e rede de investigação interativa', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/cases/war-room-map.webp', alt: 'Mapa investigativo do WAR ROOM com cartografia e seleção de dossiês', width: 1440, height: 900, fit: 'contain' },
    caseImageTitle: 'Cartografia e investigação',
    caseImageContext: 'Captura da interface. Os pontos situam o contexto geográfico dos casos; não representam telemetria nem rotas comprovadas de propagação.',
    caseGallery: [{ title: 'Episódios narrados', caption: 'Player real do dossiê NotPetya. Todos os 17 casos têm áudio prolongado e por capítulo, com síntese autorizada baseada na voz do autor e referências para leitura.', image: { src: '/images/projects/cases/war-room-narration.webp', alt: 'Player de narração prolongada do NotPetya na aba Mídia', width: 1440, height: 900, fit: 'contain' } }],
  },
  {
    slug: 'edy-verdict', title: 'EDY VERDICT', displayTitle: 'VERDICT',
    subtitle: 'Verificação de segurança local para Windows.',
    summary: 'Workbench local para verificar repositórios, arquivos, binários, aplicativos instalados e URLs de forma passiva. Os resultados registram evidência, cobertura, risco, confiança e proveniência.',
    status: 'Código público em release candidate 1.0.0-rc.1; sem instalador distribuído.',
    keywords: ['Verificação', 'Windows', 'Release candidate'],
    features: ['Verificação de repositórios e arquivos', 'Inventário de aplicativos instalados', 'Análise passiva de URLs', 'Relatórios locais com evidências'],
    stack: ['Rust', 'Tauri', 'React', 'SQLite'],
    problem: 'Uma análise perde confiabilidade quando ausência de verificação é confundida com ausência de risco.',
    solution: 'O VERDICT registra a cobertura e proveniência de cada evidência antes de apresentar uma conclusão.',
    outcome: 'O candidato atual é distribuído como código-fonte para build local; não há instalador público da RC.',
    links: [{ label: 'Ver código e instruções', href: 'https://github.com/EDY075/EDY-VERDICT' }],
    image: { src: '/images/projects/covers/edy-verdict-1600.webp', alt: 'Capa oficial do EDY VERDICT com recorte da interface real', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/verdict-investigations.png', alt: 'Área completa de investigações do EDY VERDICT com dados sintéticos', width: 1920, height: 1080, fit: 'contain' },
    caseImageTitle: 'Investigações',
    caseImageContext: 'Área de investigações do candidato de release, com registros de demonstração.',
    caseGallery: [{ title: 'Verificação de URL', caption: 'Interface de verificação passiva de URL. O candidato é distribuído como código-fonte para build local.', image: { src: '/images/projects/cases/verdict-url.webp', alt: 'Verificação passiva de URL no EDY VERDICT', width: 1600, height: 900, fit: 'contain' } }],
  },
  {
    slug: 'edy-recon', title: 'EDY RECON', displayTitle: 'RECON',
    subtitle: 'OSINT e reconhecimento para uso autorizado.',
    summary: 'Ferramenta Python de OSINT e reconhecimento para profissionais com escopo e autorização formal. A release pública valida inicialização e fluxos offline; integrações externas e operações de rede ainda aguardam validação real.',
    status: 'Release pública v1.1.0; validação pública offline.',
    keywords: ['OSINT', 'Python', 'Uso autorizado'],
    features: ['Menu de fluxos OSINT', 'Relatórios TXT e HTML com sessão sintética', 'Inicialização local no Windows', 'Módulos externos sujeitos a validação real'],
    stack: ['Python', 'CLI', 'HTML'],
    problem: 'Fontes abertas e saídas de reconhecimento ficam dispersas e exigem controle de escopo e proveniência.',
    solution: 'A ferramenta reúne fluxos de consulta e relatórios em uma interface de terminal, com orientação explícita para uso autorizado.',
    outcome: 'A versão pública tem testes offline; não atribui resultados reais a integrações externas ou módulos de rede.',
    links: [{ label: 'Ver repositório e limites', href: 'https://github.com/EDY075/EDY-RECON' }],
    image: { src: '/images/projects/covers/edy-recon-1600.webp', alt: 'Terminal verde do EDY RECON na captura fornecida pelo criador', width: 1600, height: 1000, fit: 'contain' },
    caseImage: { src: '/images/projects/recon-menu.png', alt: 'Menu principal do EDY RECON em demonstração offline', width: 1400, height: 820, fit: 'contain' },
    caseImageTitle: 'Menu offline',
    caseImageContext: 'Menu principal demonstrado offline. Módulos externos ainda aguardam validação real.',
    caseGallery: [{ title: 'Terminal do projeto', caption: 'Captura fornecida pelo criador. Os números exibidos pertencem ao ambiente capturado e não representam métricas da release pública.', image: { src: '/images/projects/cases/recon-terminal.webp', alt: 'Terminal verde do EDY RECON na captura fornecida pelo criador', width: 964, height: 848, fit: 'contain' } }],
  },
  {
    slug: 'edy-shadowcat', title: 'EDY SHADOWCAT', displayTitle: 'SHADOWCAT',
    subtitle: 'Investigação autorizada com evidências e contexto.',
    summary: 'Plataforma local de investigação autorizada. Organiza um pipeline de 13 etapas, preserva a origem das evidências, correlaciona entidades e reúne descobertas em relatórios locais. O repositório e a aplicação não são públicos.',
    status: 'Projeto local e privado; sem demonstração pública.',
    keywords: ['Investigação', 'Evidências', 'Projeto privado'],
    features: ['Pipeline de investigação com 13 etapas', 'Evidências com hash e proveniência', 'Correlação de entidades', 'Relatórios locais TXT e HTML', 'Consultas de IA ancoradas nas evidências disponíveis'],
    stack: ['Python', 'FastAPI', 'Streamlit', 'SQLite'],
    problem: 'Descobertas de diferentes fontes exigem escopo, origem verificável e uma forma de relacionar evidências sem perder contexto.',
    solution: 'O SHADOWCAT coordena etapas de investigação local, registra evidências e entidades e oferece um espaço para revisão e relatório.',
    outcome: 'Funciona localmente em contextos autorizados. Os resultados dependem das ferramentas, credenciais e fontes disponíveis; não há acesso público à aplicação.',
    links: [],
    image: { src: '/images/projects/covers/edy-shadowcat-1600.webp', alt: 'Capa aprovada do EDY SHADOWCAT com a identidade do projeto e as gatas Lilith e Zarah', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/covers/shadowcat-dashboard.webp', alt: 'Interface real do SHADOWCAT com investigação de demonstração e dados sintéticos', width: 1800, height: 942, fit: 'contain' },
    caseImageTitle: 'Ambiente de investigação',
    caseImageContext: 'Interface de demonstração com banco e dados sintéticos; a aplicação permanece privada.',
    caseGallery: [{ title: 'Etapas da investigação', caption: 'Arte de divulgação aprovada com uma investigação de demonstração. Não representa acesso público à aplicação.', image: { src: '/images/projects/cases/shadowcat-pipeline.webp', alt: 'Etapas do pipeline do EDY SHADOWCAT em demonstração sintética', width: 1600, height: 837, fit: 'contain' } }],
  },
];

export const privateProjects: Project[] = [
  {
    slug: 'cr-fitness', title: 'CR Fitness', displayTitle: 'CR Fitness',
    subtitle: 'Site institucional responsivo para uma academia.',
    summary: 'Site institucional que apresenta a unidade, modalidades, planos, horários e localização em uma experiência responsiva.',
    status: 'Site de cliente publicado em Cloudflare Pages.',
    keywords: ['Site institucional', 'Academia', 'Projeto de cliente'],
    features: ['Identidade visual preto e amarelo', 'Navegação desktop e celular', 'Seções de modalidades, planos e localização'],
    stack: ['React', 'TypeScript', 'Vite', 'CSS'],
    problem: 'Reunir informações essenciais da academia em uma apresentação clara para quem está conhecendo a unidade.',
    solution: 'Página institucional responsiva com navegação por seções e identidade visual consistente.',
    outcome: 'Site institucional publicado para acesso público. A capa mostra a versão online verificada em 29/09/2026.',
    links: [{ label: 'Acessar site da academia', href: 'https://cr-fitness-academia.pages.dev/' }],
    image: { src: '/images/projects/covers/cr-fitness-1600.webp', alt: 'Captura da versão atual do site CR Fitness com a mensagem Disciplina transforma', width: 1600, height: 1000 },
    caseImage: { src: '/images/projects/covers/cr-fitness-mobile.webp', alt: 'Captura da versão atual do site CR Fitness no celular', width: 390, height: 844, fit: 'contain' },
    caseImageTitle: 'Site no celular',
    caseImageContext: 'Versão para celular do site público verificada em 29/09/2026.',
    caseGallery: [{ title: 'Página inicial no desktop', caption: 'Captura do site publicado em 29/09/2026, com a identidade visual atual da academia.', image: { src: '/images/projects/cases/cr-fitness-public.webp', alt: 'Página inicial da versão atual do site CR Fitness no desktop', width: 1440, height: 900, fit: 'contain' } }],
  },
  {
    slug: 'assistente-personalizado', title: 'Assistente Personalizado', displayTitle: 'Assistente Personalizado',
    subtitle: 'Assistente privada para rotinas de uma personal trainer.',
    summary: 'Caso real de assistente privado pelo Telegram para uma profissional de treinos. Consulta fichas e o último treino registrado, gera documentos a partir de dados autorizados e organiza lembretes confirmados. O PostgreSQL é a fonte dos registros.',
    status: 'Em uso privado; sem demonstração pública.',
    keywords: ['Caso real', 'Assistente privado', 'Telegram'],
    features: ['Consulta controlada de fichas', 'Último treino registrado', 'Documentos PDF, XLSX e DOCX', 'Lembretes com confirmação', 'Acesso restrito à profissional'],
    stack: ['Python', 'Telegram', 'PostgreSQL', 'Docker'],
    problem: 'Encontrar registros e documentos autorizados com contexto sem depender apenas de texto livre.',
    solution: 'Canal privado no Telegram ligado a consultas e geração de documentos com regras de acesso.',
    outcome: 'Assistente em uso privado pelo Telegram; não há demonstração pública para visitantes. As interfaces ilustrativas das postagens usam somente dados fictícios.',
    links: [],
    image: { src: '/images/projects/assistente-personalizado-gallery.webp', alt: 'Ilustração editorial de uma profissional de treinos e informações organizadas; não é captura do aplicativo', width: 941, height: 650, position: 'center' },
    heroImage: { src: '/images/projects/assistente-personalizado-editorial.png', alt: 'Ilustração editorial do Assistente Personalizado; não é captura do aplicativo', width: 941, height: 1672, fit: 'cover', position: 'center 43%' },
    caseGallery: [
      { title: 'Consulta de fichas', caption: 'Interface fictícia para explicar a consulta controlada de fichas. Nenhum registro real da profissional aparece nesta imagem.', image: { src: '/images/projects/cases/assistant-fichas-illustration.webp', alt: 'Ilustração fictícia de uma consulta de ficha no Assistente Personalizado', width: 900, height: 1125, fit: 'contain' } },
      { title: 'Geração de documentos', caption: 'Visualização ilustrativa da preparação de documentos a partir de dados autorizados; não é captura da conversa privada.', image: { src: '/images/projects/cases/assistant-documents-illustration.webp', alt: 'Ilustração fictícia de geração de documentos no Assistente Personalizado', width: 900, height: 1125, fit: 'contain' } },
    ],
  },
];

export const projects: Project[] = [...featuredProjects, ...technicalProjects, ...privateProjects];
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
