import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://edy-gomes-portfolio.fluffy-lion-2904.chatgpt.site'),
  title: { default: 'EDY — GOMES', template: '%s — EDY GOMES' },
  description: 'Portfólio de Edmilson Gomes: tecnologia útil, sistemas seguros e automação com propósito.',
  openGraph: {
    title: 'EDY — GOMES',
    description: 'IT Support, Cybersecurity, Systems & Automation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
