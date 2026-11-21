'use client';

import { domAnimation, LazyMotion, m, useAnimationControls } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { editorialEase } from '@/lib/motion';
import { NAVIGATION_SCROLL_INTENT_KEY } from '@/lib/navigationScroll';
import { useHydratedReducedMotion } from './useHydratedReducedMotion';

const pageNames: Record<string, string> = {
  '/': 'EDY — GOMES',
  '/preview': 'EDY — GOMES',
  '/about': 'SOBRE',
  '/work': 'PROJETOS',
  '/capabilities': 'COMPETÊNCIAS',
  '/contact': 'CONTATO',
  '/work/war-room': 'WAR ROOM',
  '/work/andrea-tur': 'Andréa Tur',
  '/work/edy-scanurl-family': 'EDY ScanURL Family',
  '/work/edy-helpdesk': 'EDY HelpDesk',
  '/work/edy-shield': 'EDY Shield',
  '/work/edy-siem': 'EDY SIEM',
  '/work/edy-soc-analytics': 'EDY SOC Analytics',
  '/work/edy-crm': 'EDY CRM',
  '/work/edy-verdict': 'EDY VERDICT',
  '/work/edy-recon': 'EDY RECON',
  '/work/cr-fitness': 'CR Fitness',
  '/work/raquel-web': 'Raquel Web',
  '/work/assistente-personalizado': 'Assistente Personalizado',
  '/work/edy-shadowcat': 'EDY SHADOWCAT',
};
const rim = (top: number, bottom: number, amplitude: number) => {
  const x = [-2, 8, 20, 34, 48, 62, 76, 90, 102];
  const wave = [0, -7, -8, -4, 3, 8, 7, 2, -3];
  const upper = x.map((value, index) => `${value}% ${top + wave[index] * amplitude}%`);
  const lower = x.map((value, index) => `${value}% ${bottom - wave[index] * amplitude}%`).reverse();
  return `polygon(${[...upper, ...lower].join(', ')})`;
};
const awaitingEntry = rim(118, 148, 1.4);
const covered = rim(-18, 118, 1.15);
const cleared = rim(-44, -15, 1.3);

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useHydratedReducedMotion();
  const curtain = useAnimationControls();
  const content = useAnimationControls();
  const busy = useRef(false);
  const entered = useRef(false);
  const fallback = useRef(0);
  const [destination, setDestination] = useState<string | null>(null);
  const [cover, setCover] = useState<{ src: string } | null>(null);
  const [settledPath, setSettledPath] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.clearTimeout(fallback.current);
    // Paint server content immediately on document loads; keep the curtain
    // for internal navigation rather than using it as a loading screen.
    if (!entered.current) {
      entered.current = true;
      curtain.set({ clipPath: cleared });
      content.set({ opacity: 1, y: 0 });
      setSettledPath(pathname);
      return;
    }
    curtain.set({ clipPath: reduce ? cleared : covered });
    const frame = requestAnimationFrame(() => {
      void content.start({ opacity: 1, y: 0, transition: { duration: reduce ? .12 : .38, ease: editorialEase } });
      void curtain.start({ clipPath: cleared, transition: { duration: reduce ? 0 : .57, ease: editorialEase } }).then(() => {
        busy.current = false;
        setSettledPath(pathname);
        setDestination(null);
        setCover(null);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, reduce, curtain, content]);

  useEffect(() => () => {
    window.clearTimeout(fallback.current);
  }, []);

  const navigate = async (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin || !pageNames[url.pathname]) return;
    if (url.pathname === pathname && url.search === location.search && !url.hash) {
      event.preventDefault();
      event.stopPropagation();
      window.dispatchEvent(new Event('edy:scroll-to-top'));
      return;
    }
    if (url.pathname === pathname) return;
    // A página nova já pode receber um toque enquanto a cortina termina de sair.
    if (busy.current && settledPath !== pathname) return;
    event.preventDefault();
    event.stopPropagation();
    if (busy.current) return;
    busy.current = true;
    try {
      sessionStorage.setItem(NAVIGATION_SCROLL_INTENT_KEY, url.hash ? 'hash' : 'top');
    } catch {
      // Navigation still works when browser storage is unavailable.
    }
    setDestination(pageNames[url.pathname]);
    const image = url.pathname.startsWith('/work/') ? anchor.querySelector<HTMLImageElement>('img') : null;
    const coverSrc = image?.currentSrc || image?.src || anchor.dataset.coverSrc;
    setCover(coverSrc && !reduce ? { src: coverSrc } : null);
    curtain.set({ clipPath: reduce ? cleared : awaitingEntry });
    if (!reduce) await curtain.start({ clipPath: covered, transition: { duration: .49, ease: editorialEase } });
    // O provedor ajusta a rolagem depois que a rota muda. A posição da página
    // de origem precisa ficar disponível para o histórico do navegador.
    router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    fallback.current = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(NAVIGATION_SCROLL_INTENT_KEY);
      } catch {
        // Ignore unavailable browser storage.
      }
      busy.current = false;
      setDestination(null);
      setCover(null);
      void content.start({ opacity: 1 });
      void curtain.start({ clipPath: cleared });
    }, 8000);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="page-transition-curtain portfolio-route-wipe"
        data-active={destination !== null}
        initial={{ clipPath: cleared }}
        animate={curtain}
        aria-hidden="true"
      >
        <span className="portfolio-route-mark" aria-hidden="true">EG</span>
        {cover && <m.img className="page-transition-cover" src={cover.src} alt="" aria-hidden="true"
          initial={{ opacity: 0, scale: 1.045 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .42, ease: editorialEase }} />}
        <span className="portfolio-route-title">{destination ?? pageNames[pathname] ?? 'EDY — GOMES'}</span>
      </m.div>
      <m.div
        key={`${pathname}-page`}
        className="page-transition-content"
        data-transitioning={destination !== null}
        data-navigation-ready={settledPath === pathname && destination === null}
        aria-busy={destination !== null}
        initial={{ opacity: 1, y: 0 }}
        animate={content}
        onClickCapture={navigate}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
