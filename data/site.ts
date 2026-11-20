export const site = {
  name: 'Edmilson Gomes',
  mark: 'Edy',
  title: 'EDY — GOMES',
  description:
    'Portfólio de Edmilson Gomes: tecnologia útil, sistemas seguros e automação com propósito.',
  location: 'São Paulo — BR',
  disciplines: ['Suporte de TI', 'Cibersegurança', 'Sistemas & Automação'],
  contact: {
    email: 'edmilsongsousa20@gmail.com',
    github: 'https://github.com/EDY075',
    linkedin: 'https://www.linkedin.com/in/edmilsongomes21/',
    instagram: 'https://www.instagram.com/edmilson_zn_/',
    location: 'São Paulo — BR',
  },
  navigation: [
    { label: 'Projetos', href: '/work' },
    { label: 'Sobre', href: '/about' },
    { label: 'Competências', href: '/capabilities' },
    { label: 'Contato', href: '/contact' },
  ],
} as const;

export const isPlaceholder = (value: string) => value.startsWith('SEU_');
