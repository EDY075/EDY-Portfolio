'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

type Chapter = { eyebrow: string; title: string; subtitle?: string; href: string };

const chapters: Record<string, Chapter> = {
  '/': { eyebrow: 'PRÓXIMO CAPÍTULO', title: 'SOBRE', subtitle: 'Conheça\nEdmilson Gomes.', href: '/about' },
  '/about': { eyebrow: 'PRÓXIMO CAPÍTULO', title: 'PROJETOS', subtitle: 'Sistemas, ferramentas\ne experimentos.', href: '/work' },
  '/work': { eyebrow: 'PRÓXIMO CAPÍTULO', title: 'COMPETÊNCIAS', subtitle: 'Suporte. Segurança.\nSistemas. Automação.', href: '/capabilities' },
  '/capabilities': { eyebrow: 'PRÓXIMO CAPÍTULO', title: 'CONTATO', subtitle: 'Vamos construir\nalgo útil.', href: '/contact' },
  '/contact': { eyebrow: 'VOLTAR AO INÍCIO', title: 'EDY — GOMES', href: '/' },
};

export function NextChapter({ eyebrow, title, subtitle, href }: Chapter) {
  const root = useRef<HTMLElement>(null);
  const prefetched = useRef(false);
  const router = useRouter();
  const prefetch = useCallback(() => {
    if (prefetched.current) return;
    // Only the following chapter, close to its entrance or on explicit intent.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return;
    prefetched.current = true;
    router.prefetch(href);
  }, [href, router]);
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { prefetch(); observer.disconnect(); }
    }, { rootMargin: '160px' });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [prefetch]);

  return (
    <section ref={root} className="next-chapter" aria-label={eyebrow}>
      <Link className="next-chapter-link" href={href} prefetch={false} onPointerEnter={prefetch} onFocus={prefetch}>
        <span className="next-chapter-meta">{eyebrow}</span>
        <span className="next-chapter-main"><span className="next-chapter-title">{title}</span></span>
        {subtitle && <span className="next-chapter-subtitle">{subtitle}</span>}
      </Link>
    </section>
  );
}

export function RouteChapter() {
  const pathname = usePathname();
  const chapter = chapters[pathname];
  return chapter ? <NextChapter key={pathname} {...chapter} /> : null;
}
