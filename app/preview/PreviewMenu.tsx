'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { site } from '@/data/site';
import './preview-menu.css';

const frames = [
  { href: '/about', label: 'Sobre Edy', src: '/images/optimized/edy-portrait-suit-640.webp', width: 640, height: 962 },
  { href: '/work/edy-crm', label: 'EDY CRM', src: '/images/projects/covers/edy-crm-640.webp', width: 640, height: 400 },
  { href: '/work/cr-fitness', label: 'CR Fitness', src: '/images/projects/covers/cr-fitness-cinematic-20261006-640.webp', width: 640, height: 400 },
  { href: '/work/andrea-tur', label: 'Andréa Tur', src: '/images/projects/covers/andrea-tur-640.webp', width: 640, height: 400 },
];

function RollingLabel({ label }: { label: string }) {
  return (
    <span className="eg-menu-roll" aria-hidden="true">
      {Array.from(label).map((letter, index) => (
        <span key={index} className="eg-menu-glyph" style={{ '--eg-glyph-index': index } as CSSProperties}>{letter}</span>
      ))}
    </span>
  );
}

function Wordmark({ href }: { href: string }) {
  return (
    <Link className="eg-menu-wordmark" href={href} prefetch={false} aria-label="Edy Gomes, início">
      <span>EDY</span>
      <span>GOMES</span>
    </Link>
  );
}

export function PreviewMenu() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/preview';
  const homeHref = isHome ? '#inicio' : '/';
  const destinations = [
    { label: 'Início', href: homeHref },
    { label: 'Projetos', href: isHome ? '#projetos' : '/work' },
    { label: 'Sobre', href: '/about' },
    { label: 'Competências', href: '/capabilities' },
    { label: 'Contato', href: '/contact' },
  ];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState('#inicio');

  useEffect(() => {
    if (!open) return;

    function closeForNavigation(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      const dialog = dialogRef.current;
      if (!link || !dialog?.contains(link)) return;

      dialog.close();
    }

    // A transição global intercepta cliques em rotas antes dos links.
    window.addEventListener('click', closeForNavigation, true);
    return () => window.removeEventListener('click', closeForNavigation, true);
  }, [open]);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setAnchor(window.location.hash || '#inicio');
    dialog.showModal();
    closeRef.current?.focus();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <header className="eg-header eg-menu-bar">
        <Wordmark href={homeHref} />
        <span className="eg-menu-mark" aria-hidden="true">EG</span>
        <div className="eg-menu-actions">
          <Link className="eg-menu-contact" href="/contact" prefetch={false}>Contato</Link>
          <button
            ref={triggerRef}
            type="button"
            className="eg-menu-toggle"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-controls="eg-menu-screen"
            aria-expanded={open}
            onClick={openMenu}
          >
            <span className="eg-menu-icon" aria-hidden="true" />
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="eg-menu-screen"
        className="eg-menu-screen"
        aria-label="Menu do portfólio"
        onClose={handleClose}
        data-lenis-prevent
      >
        <div className="eg-menu-dialog-layout">
          <div className="eg-menu-bar eg-menu-bar-open">
            <Wordmark href={homeHref} />
            <div className="eg-menu-actions">
              <Link className="eg-menu-contact" href="/contact" prefetch={false}>Contato</Link>
              <button ref={closeRef} type="button" className="eg-menu-toggle" aria-label="Fechar menu" onClick={() => dialogRef.current?.close()}>
                <span className="eg-menu-icon eg-menu-icon-close" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="eg-menu-body">
            <div className="eg-menu-panel">
              <nav className="eg-menu-nav" aria-label="Navegação principal">
                {destinations.map(({ label, href }) => (
                  <div className="eg-menu-link-line" key={href}>
                    {href.startsWith('#') ? (
                      <a href={href} aria-label={label} aria-current={anchor === href ? 'location' : undefined}><RollingLabel label={label} /></a>
                    ) : (
                      <Link href={href} prefetch={false} aria-label={label} aria-current={pathname === href || (href === '/work' && pathname.startsWith('/work/')) ? 'page' : undefined}><RollingLabel label={label} /></Link>
                    )}
                  </div>
                ))}
              </nav>

              <nav className="eg-menu-social" aria-label="Redes sociais">
                <a href={site.contact.github}>GitHub</a>
                <a href={site.contact.linkedin}>LinkedIn</a>
                <a href={site.contact.instagram}>Instagram</a>
              </nav>
            </div>

            <nav className="eg-menu-mosaic" aria-label="Atalhos em destaque">
              {frames.map(({ href, label, src, width, height }) => (
                <Link key={href} className="eg-menu-shot" href={href} prefetch={false}>
                  <Image src={src} width={width} height={height} alt="" sizes="(max-width: 760px) 45vw, 24vw" unoptimized />
                  <span className="eg-menu-shot-label">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </dialog>
    </>
  );
}
