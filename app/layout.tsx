import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { PageTransition } from '@/components/motion/PageTransition';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { HomeEntry } from '@/components/HomeEntry';
import { pageSocialMetadata, siteUrl } from '@/lib/seo';
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
    'EDY — GOMES',
    'IT Support, Cybersecurity, Systems & Automation.',
    { src: '/og.png', width: 1200, height: 630, alt: 'EDY — GOMES — IT Support, Cybersecurity, Systems & Automation' },
  ),
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>
        <HomeEntry />
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
