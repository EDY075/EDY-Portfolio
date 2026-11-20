import type { Metadata } from 'next';
import { PortfolioHome } from './PortfolioHome';

export const metadata: Metadata = {
  title: 'Prévia do portfólio',
  robots: { index: false, follow: false },
};

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ warroom?: string | string[] }> }) {
  const { warroom } = await searchParams;
  return <PortfolioHome compareHero warRoomPreview={typeof warroom === 'string' ? warroom : undefined} />;
}
