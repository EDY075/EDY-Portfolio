import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { PageTransition } from '@/components/motion/PageTransition';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { HomeEntry } from '@/components/HomeEntry';
import { pageSocialMetadata, siteUrl } from '@/lib/seo';
import './globals.css';
import './preview/preview.css';
import './portfolio-pages.css';
import './portfolio-pointer.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  preload: false,
  weight: ['400', '500', '600', '700'],
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  preload: false,
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: 'EDY — GOMES', template: '%s — EDY GOMES' },
  description: 'Portfólio de Edmilson Gomes: tecnologia útil, sistemas seguros e automação com propósito.',
  applicationName: 'EDY — GOMES',
  authors: [{ name: 'Edmilson Gomes' }],
  creator: 'Edmilson Gomes',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true, nocache: true },
  ...pageSocialMetadata(
    '/',
    'Edy Gomes | Portfólio',
    'Suporte de TI, segurança, desenvolvimento e automação.',
    {
      src: '/og-portfolio-v2.jpg',
      width: 1200,
      height: 630,
      alt: 'Nome Edy Gomes e retrato em preto e branco sobre um fundo claro com linhas topográficas.',
    },
  ),
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/preview-assets/edy-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${display.variable} ${sans.variable}`}>
        <HomeEntry />
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
