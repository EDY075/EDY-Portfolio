import type { CaseIdentity } from './case-identity';

export const productIdentities = {
  'edy-crm': {
    description: 'O tema Nebulosa mantém a imagem astronômica visível sob painéis translúcidos. O texto claro ganha contraste com sombras discretas, enquanto o coral marca as ações e o foco.',
    typography: 'Geist Variable para títulos, controles e dados do painel.',
    colors: [
      { name: 'Fundo azul-noite', value: '#02030D' },
      { name: 'Texto principal', value: '#F5F7FF' },
      { name: 'Coral de foco', value: '#FFAF91' },
      { name: 'Ciano do funil', value: '#56C5F2' },
      { name: 'Lilás do funil', value: '#C099FA' },
      { name: 'Verde do funil', value: '#53CD8B' },
    ],
    details: [
      'Navegação lateral e cabeçalho com contornos finos sobre o fundo da nebulosa.',
      'Cartões com números em destaque para empresas, oportunidades, pacotes e versões de prévia.',
      'Barras, gráfico em anel e legenda usam as mesmas cores para identificar as etapas do funil.',
    ],
  },
  'andrea-tur': {
    description: 'Fotografias de destinos ocupam a abertura. Verde-petróleo e creme conectam as imagens ao catálogo de viagens, e o laranja destaca convites para explorar a agenda e os destinos.',
    typography: 'Nunito Sans nos textos e controles do site. Caveat nos destaques manuscritos definidos no tema.',
    colors: [
      { name: 'Verde da marca', value: '#006C5E' },
      { name: 'Verde-petróleo escuro', value: '#004C43' },
      { name: 'Laranja de destaque', value: '#FF850A' },
      { name: 'Creme principal', value: '#FFFDF7' },
      { name: 'Creme secundário', value: '#F5F1E7' },
      { name: 'Texto azul-petróleo', value: '#113441' },
    ],
    details: [
      'A abertura combina lettering sobre a paisagem, chamada principal e acesso à agenda.',
      'Selos e linhas pontilhadas remetem a carimbos e trajetos.',
      'Cartões arredondados dão espaço às fotografias e organizam a leitura do catálogo.',
    ],
  },
  'edy-helpdesk': {
    description: 'Uma base escura de tons quentes diferencia navegação, área de trabalho e painéis. O âmbar destaca as ações principais, e os marcadores de estado combinam cor, texto e ícone.',
    typography: 'A interface prioriza Inter e recorre à fonte do sistema quando necessário. Códigos e identificadores usam uma fonte monoespaçada.',
    colors: [
      { name: 'Fundo carvão', value: '#151411' },
      { name: 'Painéis', value: '#1D1C19' },
      { name: 'Texto claro', value: '#F2EEE7' },
      { name: 'Âmbar das ações', value: '#D4924B' },
      { name: 'Verde de resolução', value: '#67B78E' },
      { name: 'Vermelho de risco', value: '#DF746D' },
    ],
    details: [
      'Na tela do chamado, a descrição e os controles de atendimento ficam lado a lado.',
      'O histórico usa uma linha vertical para ligar cada mudança ao chamado.',
      'Etiquetas compactas identificam prioridade e estado sem ocupar o espaço dos detalhes.',
    ],
  },
  'war-room': {
    description: 'A experiência documental combina preto, dourado fosco e marfim. A nebulosa compõe a abertura, e os fundos escuros dão continuidade ao mapa e à leitura dos dossiês.',
    typography: 'Georgia nos textos longos. Os títulos declaram Playfair Display com Georgia como alternativa. Rótulos do mapa e metadados usam uma fonte monoespaçada.',
    colors: [
      { name: 'Preto de fundo', value: '#0A0A0A' },
      { name: 'Marfim de leitura', value: '#F0ECE4' },
      { name: 'Dourado da abertura', value: '#CBB577' },
      { name: 'Dourado dos destaques', value: '#C9A84C' },
      { name: 'Verde-escuro do mapa', value: '#101510' },
      { name: 'Papel dos documentos', value: '#E7E0CE' },
    ],
    details: [
      'A abertura sobrepõe à nebulosa uma rede visual de temas com nós selecionáveis.',
      'O mapa usa marcadores, legenda e uma faixa cronológica para conduzir aos dossiês.',
      'Documentos em fundo claro contrastam com os painéis escuros dos episódios.',
    ],
  },
  'cr-fitness': {
    description: 'A identidade da academia usa preto e branco para construir contraste e amarelo no símbolo, nas ações e nas palavras-chave. Um degradê escuro preserva a leitura do título sobre a arte de abertura.',
    typography: 'Barlow Condensed nos títulos de impacto. Barlow nos textos corridos.',
    colors: [
      { name: 'Preto de fundo', value: '#050607' },
      { name: 'Superfícies', value: '#090B0C' },
      { name: 'Painéis destacados', value: '#0D0F10' },
      { name: 'Branco dos títulos', value: '#F7F7F3' },
      { name: 'Cinza do texto de apoio', value: '#D6D7D2' },
      { name: 'Amarelo das ações', value: '#F7C61B' },
    ],
    details: [
      'Títulos condensados em caixa alta marcam a abertura e as seções da página.',
      'Botões amarelos e ícones de traço fino retomam as cores do símbolo da academia.',
      'Modalidades e planos têm blocos próprios para descrição e comparação.',
    ],
  },
  'assistente-personalizado': {
    description: 'A apresentação editorial do case usa papel, tinta escura e verdes suaves para mostrar a passagem de uma consulta para um documento em uma conversa ilustrativa.',
    typography: 'Títulos serifados na apresentação editorial e texto sem serifa nas mensagens ilustradas.',
    paletteNote: 'Amostras aproximadas das ilustrações do case. O assistente funciona no Telegram e sua aparência acompanha o tema escolhido no aplicativo.',
    colors: [
      { name: 'Papel da ilustração', value: '#D0CDC3' },
      { name: 'Tinta dos títulos', value: '#191C19' },
      { name: 'Cartão de documento', value: '#F9F6EC' },
      { name: 'Fundo da conversa', value: '#E5E9DE' },
      { name: 'Verde das mensagens', value: '#CDDEC8' },
      { name: 'Verde do avatar', value: '#234B42' },
    ],
    details: [
      'Balões de cores diferentes distinguem pedidos e respostas nos exemplos.',
      'Cartões com nome e formato do arquivo deixam o documento fácil de identificar na conversa.',
      'As imagens do case usam exemplos fictícios e sinalizam a natureza ilustrativa da interface.',
    ],
  },
} satisfies Record<string, CaseIdentity>;
