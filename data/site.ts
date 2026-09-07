export const site = {
  name: 'Edmilson Gomes',
  mark: 'Edy',
  title: 'EDY — GOMES',
  description:
    'Portfólio de Edmilson Gomes: tecnologia útil, sistemas seguros e automação com propósito.',
  location: 'São Paulo — BR',
  disciplines: ['IT Support', 'Cybersecurity', 'Systems & Automation'],
  contact: {
    email: 'SEU_EMAIL_AQUI',
    github: 'https://github.com/EDY075',
    linkedin: 'SEU_LINKEDIN_AQUI',
    location: 'São Paulo — BR',
  },
  navigation: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/work' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export const isPlaceholder = (value: string) => value.startsWith('SEU_');
