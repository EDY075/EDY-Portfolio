import Link from 'next/link';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="eyebrow">EDY — GOMES</p>
        <p className="footer-cta">Ideas become useful<br />when they become real.</p>
      </div>
      <div className="footer-links">
        <Link href="/work">Selected work</Link>
        <Link href="/about">About Edy</Link>
        <Link href="/contact">Get in touch</Link>
      </div>
      <div className="footer-meta">
        <span>{site.name}</span>
        <span>{site.location}</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
