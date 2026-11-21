'use client';

import type Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { NAVIGATION_SCROLL_INTENT_KEY, type NavigationScrollIntent } from '@/lib/navigationScroll';

const PROJECT_HOVER_IDLE_DELAY_MS = 150;
const PROJECT_HOVER_VELOCITY_EPSILON = 0.01;
const NAVIGATION_SETTLE_DELAYS_MS = [90, 240, 600];
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const restoringHistory = useRef(false);
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      restoringHistory.current = previousPath.current !== window.location.pathname;
      try {
        sessionStorage.removeItem(NAVIGATION_SCROLL_INTENT_KEY);
      } catch {
        // Ignore unavailable browser storage.
      }
    };
    // Registra a volta antes que o roteador renderize a rota do histórico.
    window.addEventListener('popstate', onPopState, true);
    return () => window.removeEventListener('popstate', onPopState, true);
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
    let touchStart: { x: number; y: number } | null = null;
    const settleTimers: number[] = [];
    const changedPath = previousPath.current !== null && previousPath.current !== pathname;
    previousPath.current = pathname;
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
    const { __vinext_scrollX: left, __vinext_scrollY: top } = window.history.state ?? {};
    const savedPosition = changedPath && pathname === window.location.pathname && typeof top === 'number' && Number.isFinite(top);
    if (savedPosition || (restoringHistory.current && !intent)) {
      restoringHistory.current = false;
      lenisRef.current?.resize();
      if (savedPosition) {
        // A rolagem suave pode interromper a restauração durante a transição.
        lenisRef.current?.scrollTo(top, { immediate: true, force: true });
        window.scrollTo({ top, left: typeof left === 'number' ? left : 0, behavior: 'instant' });
        clearIntent();
      }
      return;
    }
    restoringHistory.current = false;

    // A abertura direta sem âncora já começa na posição definida pelo navegador.
    const shouldSettle = changedPath || intent !== null || window.location.hash !== '';
    if (shouldSettle) scrollToDestination();
    const main = document.querySelector('main');
    if (main && intent !== 'hash') {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
    if (!shouldSettle) return;

    const cancelPending = () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      settleTimers.forEach(timer => window.clearTimeout(timer));
      window.removeEventListener('touchstart', onTouchStart, true);
      window.removeEventListener('touchmove', onTouchMove, true);
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('keydown', onKeyDown);
    };

    const finishSettling = () => {
      cancelPending();
      lenisRef.current?.resize();
      clearIntent();
    };

    function onTouchStart(event: TouchEvent) {
      const touch = event.touches[0];
      touchStart = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
    }

    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touchStart || event.touches.length !== 1) return;
      const moved = Math.max(Math.abs(touch.clientX - touchStart.x), Math.abs(touch.clientY - touchStart.y));
      if (moved >= 5) finishSettling();
    }

    function onWheel(event: WheelEvent) {
      if (!event.ctrlKey && (event.deltaY || event.deltaX)) finishSettling();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || !SCROLL_KEYS.has(event.key) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target instanceof Element && event.target.closest('button, input, textarea, select, [contenteditable], [role="slider"]')) return;
      finishSettling();
    }

    const passiveCapture = { passive: true, capture: true };
    window.addEventListener('touchstart', onTouchStart, passiveCapture);
    window.addEventListener('touchmove', onTouchMove, passiveCapture);
    window.addEventListener('wheel', onWheel, passiveCapture);
    window.addEventListener('keydown', onKeyDown);

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        scrollToDestination();
      });
    });

    // O primeiro gesto de rolagem encerra os realinhamentos da navegação.
    for (const delay of NAVIGATION_SETTLE_DELAYS_MS) {
      settleTimers.push(window.setTimeout(() => {
        scrollToDestination();
        if (delay === NAVIGATION_SETTLE_DELAYS_MS.at(-1)) finishSettling();
      }, delay));
    }

    return cancelPending;
  }, [pathname]);

  return children;
}
