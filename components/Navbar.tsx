'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { editorialEase } from '@/lib/motion';
import { useHydratedReducedMotion } from './motion/useHydratedReducedMotion';

export function Navbar() {
  const pathname = usePathname();
  const reduce = useHydratedReducedMotion();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    let idle = 0;
    const heroSelector = '.home-hero, .editorial-hero, .work-header, .capabilities-hero, .contact-hero, .case-hero';
    const update = (state: 'top' | 'scrolling' | 'idle') => {
      if (!header.current) return;
      if (header.current.dataset.scrollState !== state) header.current.dataset.scrollState = state;
      const hero = document.querySelector<HTMLElement>(heroSelector);
      header.current.dataset.heroState = !hero || hero.getBoundingClientRect().bottom > 120 ? 'visible' : 'past';
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        update(window.scrollY < 24 ? 'top' : 'scrolling');
        window.clearTimeout(idle);
        idle = window.setTimeout(() => update(window.scrollY < 24 ? 'top' : 'idle'), 180);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update(window.scrollY < 24 ? 'top' : 'idle');
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(idle);
    };
  }, [pathname]);

  useEffect(() => {
    let observer: IntersectionObserver;
    const observeSurface = () => {
      observer?.disconnect();
      const visible = new Set<Element>();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
        if (header.current) header.current.dataset.surface = visible.size ? 'light' : 'dark';
      }, { rootMargin: `0px 0px -${Math.max(0, innerHeight - 90)}px 0px` });
      document.querySelectorAll('.values-section, .case-overview, .case-features').forEach(section => observer.observe(section));
    };
    observeSurface();
    window.addEventListener('resize', observeSurface);
    return () => { observer.disconnect(); window.removeEventListener('resize', observeSurface); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const siblings = Array.from(header.current?.parentElement?.children ?? []).filter((node): node is HTMLElement => node instanceof HTMLElement && node !== header.current);
    const previousInert = siblings.map(node => node.inert);
    siblings.forEach(node => { node.inert = true; });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
      if (event.key !== 'Tab') return;
      const items = Array.from(header.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []).filter(item => item.offsetParent !== null);
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      siblings.forEach((node, index) => { node.inert = previousInert[index]; });
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const headerClass = [
    'site-nav',
    pathname === '/work' ? 'nav-on-light' : '',
    open ? 'menu-is-open' : '',
  ].filter(Boolean).join(' ');
  const mobileItems = site.navigation;

  return (
    <header ref={header} className={headerClass} data-scroll-state="top" data-hero-state="visible">
      <Link href="/" prefetch={false} className="brand" aria-label="Edy — página inicial">{site.mark}</Link>
      <nav aria-label="Navegação principal" className="nav-links desktop-nav">
        <div className="nav-primary">
          {site.navigation.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} prefetch={false} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>
          ))}
        </div>
        <div className="nav-social">
          <a href={site.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </nav>
      <button ref={menuButton} className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Navegação mobile"
            className="mobile-nav"
            data-lenis-prevent
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? .15 : .62, ease: editorialEase }}
          >
            <motion.div className="mobile-nav-primary" initial="closed" animate="open" exit="closed">
              {mobileItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={{ closed: { opacity: 0, y: 22 }, open: { opacity: 1, y: 0 } }}
                  transition={{ duration: .5, delay: reduce ? 0 : .18 + index * .07, ease: editorialEase }}
                >
                  <Link href={item.href} prefetch={false} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="mobile-nav-social"><a href={site.contact.github} target="_blank" rel="noreferrer">GitHub</a><a href={site.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
            <span className="mobile-nav-meta">EDY — GOMES / SÃO PAULO</span>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
