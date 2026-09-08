import Link from 'next/link';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="eyebrow">EDY — GOMES</p>
        <p className="footer-cta">Ideias se tornam úteis<br />quando se tornam reais.</p>
      </div>
      <div className="footer-links">
        <Link href="/work" prefetch={false}>Projetos</Link>
        <Link href="/about" prefetch={false}>Sobre Edy</Link>
        <Link href="/contact" prefetch={false}>Entrar em contato</Link>
      </div>
      <div className="footer-meta">
        <span>{site.name}</span>
        <span>{site.location}</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
