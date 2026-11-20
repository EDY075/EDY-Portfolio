import Link from 'next/link';
import { SiteFrame } from '@/components/SiteFrame';

export default function NotFound() {
  return (
    <SiteFrame showFooter={false}>
      <main className="pf-page pf-error">
        <section className="pf-hero pf-error-hero" data-portfolio-theme="dark" aria-labelledby="pf-error-title">
          <div className="pf-hero-copy">
            <p className="pf-label">Erro 404</p>
            <h1 id="pf-error-title" className="pf-title"><em>Fora</em> do mapa</h1>
            <p className="pf-lead">Esta página não existe ou mudou de endereço.</p>
            <Link href="/" className="pf-action" prefetch={false}>Voltar ao início</Link>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
