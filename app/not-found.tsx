import Link from 'next/link';
import { SiteFrame } from '@/components/SiteFrame';

export default function NotFound() {
  return (
    <SiteFrame showFooter={false}>
      <main className="not-found">
        <span>404 / NOT FOUND</span>
        <h1>Off the<br /><em>map.</em></h1>
        <p>Esta página não existe ou mudou de endereço.</p>
        <Link href="/" className="text-link">Voltar ao início</Link>
      </main>
    </SiteFrame>
  );
}
