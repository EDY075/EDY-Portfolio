'use client';

import type Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { NAVIGATION_SCROLL_INTENT_KEY, type NavigationScrollIntent } from '@/lib/navigationScroll';

const PROJECT_HOVER_IDLE_DELAY_MS = 150;
const PROJECT_HOVER_VELOCITY_EPSILON = 0.01;

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const restoringHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      restoringHistory.current = true;
      try {
        sessionStorage.removeItem(NAVIGATION_SCROLL_INTENT_KEY);
      } catch {
        // Ignore unavailable browser storage.
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const main = document.querySelector('main');
      if (main) {
        main.tabIndex = -1;
        main.focus({ preventScroll: true });
      }
    };
    window.addEventListener('edy:scroll-to-top', scrollToTop);
    return () => window.removeEventListener('edy:scroll-to-top', scrollToTop);
  }, []);

  useEffect(() => {
    const alignProjectGallery = (event: Event) => {
      const target = (event as CustomEvent<HTMLElement>).detail;
      if (!target?.isConnected) return;
      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(target, { immediate: true, force: true });
      } else target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    window.addEventListener('edy:align-project-gallery', alignProjectGallery);
    return () => window.removeEventListener('edy:align-project-gallery', alignProjectGallery);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const compact = window.matchMedia('(max-width: 767px)');
    const mediaQueries = [reduced, coarse, compact];
    let stopCurrent: (() => void) | null = null;
    let disposed = false;
    let loading = false;

    const isPortfolioHome = pathname === '/' || pathname === '/preview';

    const startLenis = (ScrollEngine: typeof Lenis) => {
      const lenis = new ScrollEngine({
        autoRaf: true,
        lerp: isPortfolioHome ? 0.08 : 0.12,
        smoothWheel: true,
        wheelMultiplier: isPortfolioHome ? 0.86 : 0.78,
        syncTouch: false,
        anchors: true,
      });
      lenisRef.current = lenis;

      const root = document.documentElement;
      let projectHoverLocked = false;
      let projectHoverIdleTimer: number | null = null;

      const setProjectHoverLocked = (locked: boolean) => {
        const nextState = locked ? 'locked' : 'ready';
        if (projectHoverLocked === locked && root.dataset.projectHover === nextState) return;

        projectHoverLocked = locked;
        root.dataset.projectHover = nextState;
      };

      const clearProjectHoverIdleTimer = () => {
        if (projectHoverIdleTimer === null) return;
        window.clearTimeout(projectHoverIdleTimer);
        projectHoverIdleTimer = null;
      };

      const scheduleProjectHoverUnlock = () => {
        clearProjectHoverIdleTimer();
        projectHoverIdleTimer = window.setTimeout(() => {
          projectHoverIdleTimer = null;
          setProjectHoverLocked(false);
        }, PROJECT_HOVER_IDLE_DELAY_MS);
      };

      const updateProjectHoverState = (current: Lenis) => {
        const hasMomentum =
          Math.abs(current.velocity) > PROJECT_HOVER_VELOCITY_EPSILON ||
          current.isScrolling !== false;

        if (hasMomentum) {
          setProjectHoverLocked(true);
          // Keep renewing the fallback while momentum emits frames. Lenis does
          // not always emit a final event with `isScrolling === false` after an
          // immediate route scroll, so the last event must also be able to
          // release the lock after the approved idle delay.
          scheduleProjectHoverUnlock();
          return;
        }

        if (projectHoverLocked) scheduleProjectHoverUnlock();
      };

      setProjectHoverLocked(false);

      lenis.on('scroll', updateProjectHoverState);

      return () => {
        clearProjectHoverIdleTimer();
        lenis.off('scroll', updateProjectHoverState);
        lenis.destroy();
        lenisRef.current = null;
        delete root.dataset.projectHover;
      };
    };

    const enabled = () => !reduced.matches && !coarse.matches && !compact.matches;
    const configure = () => {
      if (!enabled()) {
        stopCurrent?.();
        stopCurrent = null;
        return;
      }
      if (stopCurrent || loading) return;

      // Touch and reduced-motion visits use the browser's native scrolling.
      loading = true;
      void import('lenis').then(({ default: ScrollEngine }) => {
        if (!disposed && enabled()) stopCurrent = startLenis(ScrollEngine);
      }).catch(() => {
        // Native scrolling remains available if the optional module fails.
      }).finally(() => {
        loading = false;
      });
    };

    configure();
    mediaQueries.forEach(query => query.addEventListener('change', configure));
    return () => {
      disposed = true;
      mediaQueries.forEach(query => query.removeEventListener('change', configure));
      stopCurrent?.();
    };
  }, [pathname]);

  useLayoutEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    const settleTimers: number[] = [];
    let intent: NavigationScrollIntent | null = null;
    try {
      intent = sessionStorage.getItem(NAVIGATION_SCROLL_INTENT_KEY) as NavigationScrollIntent | null;
    } catch {
      // Continue with the URL when browser storage is unavailable.
    }

    const clearIntent = () => {
      try {
        sessionStorage.removeItem(NAVIGATION_SCROLL_INTENT_KEY);
      } catch {
        // Ignore unavailable browser storage.
      }
    };

    const scrollToDestination = () => {
      const hash = window.location.hash.slice(1);
      const target = hash ? document.getElementById(hash) : null;
      if (target) {
        if (lenisRef.current) lenisRef.current.scrollTo(target, { immediate: true, force: true });
        else target.scrollIntoView({ block: 'start' });
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    // Back/forward navigation keeps its saved position. Explicit links always
    // honor the recorded destination, even if a late browser restoration fires.
    if (restoringHistory.current && !intent) {
      restoringHistory.current = false;
      lenisRef.current?.resize();
      return;
    }
    restoringHistory.current = false;

    scrollToDestination();
    const main = document.querySelector('main');
    if (main && intent !== 'hash') {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        scrollToDestination();
      });
    });

    // Vinext/browser restoration may land after the first paint. These bounded
    // checks cover that window without permanently fighting user scrolling.
    for (const delay of [90, 240, 600]) {
      settleTimers.push(window.setTimeout(() => {
        scrollToDestination();
        if (delay === 600) {
          lenisRef.current?.resize();
          clearIntent();
        }
      }, delay));
    }

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname]);

  return children;
}
