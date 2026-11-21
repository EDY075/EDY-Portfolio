import type { CaseIdentity } from './case-identity';

export const technicalIdentities = {
  'edy-scanurl-family': {
    description: 'A versão web combina títulos editoriais com um fundo verde profundo. O campo do link e a recomendação ocupam cartões próprios, dando destaque à próxima ação.',
    typography: 'Georgia nos títulos. Inter e alternativas de sistema na pilha tipográfica da interface.',
    paletteNote: 'Cores do tema escuro da versão web mostrada nas capturas.',
    colors: [
      { name: 'Fundo verde profundo', value: '#0B1414' },
      { name: 'Superfície dos cartões', value: '#111E1D' },
      { name: 'Texto claro', value: '#EDF4EF' },
      { name: 'Menta das ações', value: '#89E4BC' },
      { name: 'Âmbar de atenção', value: '#EDC480' },
      { name: 'Coral de risco', value: '#FFA5A0' },
    ],
    details: [
      'Títulos serifados e espaços amplos dão ritmo de leitura à página inicial.',
      'Cartões separam sinais encontrados, alcance da análise e recomendação.',
      'Rótulos e ícones explicam os estados acompanhados por cor.',
    ],
  },
  'edy-shield': {
    description: 'Azuis escuros organizam o painel de integridade em camadas. O verde-petróleo destaca ações e o vermelho dá prioridade às alterações críticas.',
    typography: 'Inter na interface e JetBrains Mono na pilha tipográfica de dados técnicos.',
    paletteNote: 'Cores do painel de integridade da release ilustrada no case.',
    colors: [
      { name: 'Fundo azul-noite', value: '#0A0E14' },
      { name: 'Superfície dos painéis', value: '#141C2B' },
      { name: 'Texto principal', value: '#E4E7EB' },
      { name: 'Verde-petróleo das ações', value: '#1FB58A' },
      { name: 'Vermelho crítico', value: '#EF4444' },
      { name: 'Âmbar de severidade média', value: '#EAB308' },
    ],
    details: [
      'A barra lateral mantém os módulos no mesmo contexto visual.',
      'A mudança crítica ocupa o cartão principal, acima dos indicadores resumidos.',
      'Rótulos de severidade aparecem junto aos itens da lista de alterações.',
    ],
  },
  'edy-siem': {
    description: 'O painel de decisões usa superfícies compactas sobre azul-noite. O azul sinaliza seleção e ações, enquanto os alertas têm uma escala de severidade própria.',
    typography: 'Inter para navegação e rótulos. JetBrains Mono para dados técnicos.',
    paletteNote: 'Cores do tema escuro. A interface também tem tema claro.',
    colors: [
      { name: 'Fundo azul-noite', value: '#0A0F17' },
      { name: 'Superfície dos painéis', value: '#111925' },
      { name: 'Azul de interação', value: '#3B9CFF' },
      { name: 'Amarelo de severidade média', value: '#E6B64A' },
      { name: 'Laranja de severidade alta', value: '#F08A4B' },
      { name: 'Vermelho de severidade crítica', value: '#F15B68' },
    ],
    details: [
      'Faixas de estado e cartões de contagem antecedem a fila de decisões.',
      'Etiquetas de severidade ajudam a percorrer a tabela por prioridade.',
      'Painéis e tabelas usam bordas discretas para separar áreas com muita informação.',
    ],
  },
  'edy-soc-analytics': {
    description: 'O tema Signal Grid aproxima o relatório de um painel de operações. O fundo escuro realça indicadores e séries, com ciano para a leitura principal e cores semânticas para o estado dos dados.',
    typography: 'Segoe UI Semibold em títulos e indicadores. Segoe UI nos rótulos.',
    paletteNote: 'Cores do tema Signal Grid usado no relatório Power BI.',
    colors: [
      { name: 'Fundo do relatório', value: '#0D1118' },
      { name: 'Superfície dos visuais', value: '#141B25' },
      { name: 'Ciano de séries e tabelas', value: '#39C6E6' },
      { name: 'Verde de condição favorável', value: '#46C78C' },
      { name: 'Âmbar de atenção', value: '#F2B84B' },
      { name: 'Vermelho de condição desfavorável', value: '#E5484D' },
    ],
    details: [
      'Abas numeradas no topo organizam as páginas do relatório.',
      'Indicadores de volume resumem a operação antes dos gráficos.',
      'Linhas mostram variação no tempo e barras comparam volume entre fontes e regras.',
    ],
  },
  'edy-verdict': {
    description: 'O aplicativo de desktop usa uma base azul-ardósia com detalhes em menta. A seleção na barra lateral, os indicadores e a tabela de casos dão continuidade visual ao trabalho de investigação.',
    typography: 'Segoe UI Variable na interface e Consolas para trechos técnicos.',
    paletteNote: 'Cores do tema padrão mostrado na área de investigações.',
    colors: [
      { name: 'Fundo azul-ardósia', value: '#080D14' },
      { name: 'Painel principal', value: '#111A25' },
      { name: 'Painel elevado', value: '#162230' },
      { name: 'Menta das ações e métricas', value: '#5DD6C0' },
      { name: 'Amarelo de foco', value: '#F5C451' },
      { name: 'Texto principal', value: '#E9EEF5' },
    ],
    details: [
      'Navegação lateral mantém a seção ativa identificada em menta.',
      'Cartões com valores grandes separam cobertura, risco e confiança.',
      'Filtros antecedem a tabela, com identificação e estado em colunas.',
    ],
  },
  'edy-recon': {
    description: 'O menu tem visual de terminal, com molduras de caracteres e opções numeradas. No case, a saída demonstrada ganha uma moldura azul e um fundo azul-noite.',
    typography: 'Monoespaçada do terminal. A família depende do ambiente onde o console é aberto.',
    paletteNote: 'Amostras da apresentação do console no case. As cores ANSI podem variar conforme o terminal.',
    colors: [
      { name: 'Fundo da apresentação', value: '#030F17' },
      { name: 'Azul da moldura', value: '#0A7EA5' },
      { name: 'Turquesa do selo de demonstração', value: '#44E5D2' },
      { name: 'Texto claro do console', value: '#C8E2ED' },
    ],
    details: [
      'Molduras de texto separam o cabeçalho da lista de opções.',
      'A numeração alinha as ações para leitura rápida no console.',
      'O modo de texto simples permite navegação sem cor e com bordas ASCII.',
    ],
  },
  'edy-shadowcat': {
    description: 'O tema roxo da demonstração mistura fotografia, painéis translúcidos e detalhes lilás. A imagem dos gatos inspira a marca, enquanto a grade mantém os indicadores legíveis.',
    typography: 'Bahnschrift na marca e no título de abertura, com Segoe UI no restante da interface.',
    paletteNote: 'Cores do tema roxo mostrado no painel de demonstração.',
    colors: [
      { name: 'Fundo índigo escuro', value: '#080913' },
      { name: 'Superfície violeta do tema', value: '#171024' },
      { name: 'Lilás de interação', value: '#AD7CFF' },
      { name: 'Magenta do título', value: '#DC38F3' },
      { name: 'Turquesa de indicadores', value: '#32E9D0' },
      { name: 'Texto lilás claro', value: '#F1EAFA' },
    ],
    details: [
      'A fotografia ocupa o fundo da abertura e se dissolve nas bordas.',
      'Os cartões translúcidos mantêm os números separados da imagem.',
      'Menu lateral destacado e ícones mantêm a navegação reconhecível nas telas de trabalho.',
    ],
  },
} satisfies Record<string, CaseIdentity>;
