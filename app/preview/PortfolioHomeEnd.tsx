import Link from 'next/link';
import { NextChapter } from '@/components/NextChapter';
import { site } from '@/data/site';
import './preview-home-end.css';

export function PortfolioHomeEnd() {
  return (
    <div className="eg-home-end">
      <NextChapter
        eyebrow="Próximo capítulo"
        title="Sobre"
        subtitle="Conheça Edmilson Gomes."
        href="/about"
      />
      <footer className="eg-home-footer">
        <p className="eg-home-footer-name">Edy Gomes</p>
        <nav aria-label="Páginas do portfólio">
          <ul>
            {site.navigation.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} prefetch={false}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  );
}
