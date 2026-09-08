'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { editorialEase } from '@/lib/motion';
import { NAVIGATION_SCROLL_INTENT_KEY } from '@/lib/navigationScroll';
import { useHydratedReducedMotion } from './useHydratedReducedMotion';

const pageNames: Record<string, string> = {
  '/': 'EDY — GOMES',
  '/about': 'ABOUT',
  '/work': 'SELECTED WORK',
  '/capabilities': 'CAPABILITIES',
  '/contact': 'CONTACT',
  '/work/edy-shadowcat': 'EDY SHADOWCAT', '/work/edy-verdict': 'EDY VERDICT',
  '/work/edy-recon': 'EDY RECON', '/work/edy-scanurl-family': 'EDY ScanURL Family',
  '/work/edy-helpdesk': 'EDY HelpDesk', '/work/edy-soc-analytics': 'EDY SOC Analytics',
};
const covered = 'inset(0 0 0% 0)';
const cleared = 'inset(0 0 100% 0)';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useHydratedReducedMotion();
  const curtain = useAnimationControls();
  const content = useAnimationControls();
  const busy = useRef(false);
  const entered = useRef(false);
  const fallback = useRef(0);
  const resetTopOnArrival = useRef(false);
  const scrollSettleFrame = useRef(0);
  const scrollSettleTimer = useRef(0);
  const [destination, setDestination] = useState<string | null>(null);
  const [settledPath, setSettledPath] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.clearTimeout(fallback.current);
    window.cancelAnimationFrame(scrollSettleFrame.current);
    window.clearTimeout(scrollSettleTimer.current);
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
      void curtain.start({ clipPath: cleared, transition: { duration: reduce ? 0 : .48, ease: editorialEase } }).then(() => {
        busy.current = false;
        setSettledPath(pathname);
        setDestination(null);
        if (resetTopOnArrival.current) {
          const settleAtTop = () => window.dispatchEvent(new Event('edy:scroll-to-top'));
          settleAtTop();
          scrollSettleFrame.current = requestAnimationFrame(settleAtTop);
          scrollSettleTimer.current = window.setTimeout(() => {
            settleAtTop();
            resetTopOnArrival.current = false;
          }, 180);
        }
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, reduce, curtain, content]);

  useEffect(() => () => {
    window.clearTimeout(fallback.current);
    window.cancelAnimationFrame(scrollSettleFrame.current);
    window.clearTimeout(scrollSettleTimer.current);
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
    event.preventDefault();
    event.stopPropagation();
    if (busy.current) return;
    busy.current = true;
    resetTopOnArrival.current = !url.hash;
    try {
      sessionStorage.setItem(NAVIGATION_SCROLL_INTENT_KEY, url.hash ? 'hash' : 'top');
    } catch {
      // Navigation still works when browser storage is unavailable.
    }
    setDestination(pageNames[url.pathname]);
    void content.start({ opacity: reduce ? 1 : .2, transition: { duration: reduce ? 0 : .2 } });
    await curtain.start({ clipPath: covered, transition: { duration: reduce ? 0 : .26, ease: editorialEase } });
    // SmoothScrollProvider owns the final position. Disabling the router's
    // competing restoration prevents destination pages from reopening at the
    // previous page's footer, especially on mobile.
    router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    if (!url.hash) {
      // push() records the source history entry first; resetting immediately
      // afterwards makes the new document start at zero without erasing the
      // position restored by the browser when the user presses Back.
      window.dispatchEvent(new Event('edy:scroll-to-top'));
    }
    fallback.current = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(NAVIGATION_SCROLL_INTENT_KEY);
      } catch {
        // Ignore unavailable browser storage.
      }
      busy.current = false;
      resetTopOnArrival.current = false;
      setDestination(null);
      void content.start({ opacity: 1 });
      void curtain.start({ clipPath: cleared });
    }, 8000);
  };

  return (
    <>
      <motion.div
        className="page-transition-curtain"
        initial={{ clipPath: cleared }}
        animate={curtain}
        aria-hidden="true"
      >
        <span>{destination ?? pageNames[pathname] ?? 'EDY — GOMES'}</span>
      </motion.div>
      <motion.div
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
      </motion.div>
    </>
  );
}
