import { productIdentities } from './case-identities-product';
import { technicalIdentities } from './case-identities-technical';

export type CaseIdentity = {
  description: string;
  typography: string;
  colors: readonly { name: string; value: string }[];
  details?: readonly string[];
  paletteNote?: string;
};

export const caseIdentities = {
  ...productIdentities,
  ...technicalIdentities,
  'raquel-web': {
    description: 'A direção Escuro essencial usa carvão para o fundo, cartões em cinza profundo e dourado nas ações. Vinho e magenta assinalam seleções e destaques. O lettering oficial de Raquel Oliveira Personal integra o cabeçalho e o painel.',
    typography: 'Roboto Condensed nos cartões, Segoe UI nos cabeçalhos do painel inicial e da área da aluna, e Georgia no título editorial da lista de alunas.',
    colors: [
      { name: 'Carvão', value: '#0C0F11' },
      { name: 'Fundo secundário', value: '#111416' },
      { name: 'Cartões', value: '#191C1F' },
      { name: 'Bordas', value: '#2B2E32' },
      { name: 'Branco', value: '#F7F7F8' },
      { name: 'Texto secundário', value: '#B8B9BF' },
      { name: 'Dourado', value: '#EDC969' },
      { name: 'Vinho', value: '#560D2B' },
      { name: 'Magenta', value: '#A81046' },
    ],
    details: [
      'Cartões com avatar e estado da ficha ajudam a personal a localizar cada acompanhamento no painel.',
      'A ficha no celular organiza a leitura por exercício, com séries, repetições e carga no mesmo bloco.',
    ],
  },
} satisfies Record<string, CaseIdentity>;

export type CaseIdentitySlug = keyof typeof caseIdentities;
