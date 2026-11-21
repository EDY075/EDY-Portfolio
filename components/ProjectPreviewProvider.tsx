'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type PreviewMode = 'hover' | 'viewport';
type ActivePreview = { slug: string; mode: PreviewMode };

type PreviewController = {
  active: ActivePreview | null;
  startPreview: (slug: string, mode: PreviewMode) => void;
  stopPreview: (slug: string, mode?: PreviewMode) => void;
};

const PreviewContext = createContext<PreviewController | null>(null);
const viewportPreviewQuery = '(hover: none) and (pointer: coarse) and (prefers-reduced-motion: no-preference)';
const scrollSettleDelay = 280;

export function ProjectPreviewProvider({ children }: { children: ReactNode }) {
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActivePreview | null>(null);

  const startPreview = useCallback((slug: string, mode: PreviewMode) => {
    if (document.hidden) return;
    setActive(current => current?.slug === slug && current.mode === mode ? current : { slug, mode });
  }, []);

  const stopPreview = useCallback((slug: string, mode?: PreviewMode) => {
    setActive(current => current?.slug === slug && (!mode || current.mode === mode) ? null : current);
  }, []);

  useEffect(() => {
    const scope = grid.current;
    if (!scope) return;
    const media = window.matchMedia(viewportPreviewQuery);
    let timer: number | undefined;
    let lastCandidate: string | undefined;

    function stopViewportPreview() {
      setActive(current => current?.mode === 'viewport' ? null : current);
    }

    const chooseCandidate = () => {
      if (!media.matches || document.hidden) return;
      const center = window.innerHeight / 2;
      const band = window.innerHeight * .16;
      let closest = Infinity;
      let candidate: string | undefined;

      for (const artwork of scope.querySelectorAll<HTMLElement>('[data-project-preview]')) {
        const rect = artwork.getBoundingClientRect();
        if (rect.height === 0 || rect.bottom <= center - band || rect.top >= center + band) continue;
        const distance = Math.abs((rect.top + rect.bottom) / 2 - center);
        if (distance >= closest) continue;
        closest = distance;
        candidate = artwork.dataset.projectPreview;
      }

      if (candidate === lastCandidate) return;
      lastCandidate = candidate;
      if (candidate) startPreview(candidate, 'viewport');
      else stopViewportPreview();
    };

    function afterScroll() {
      if (!media.matches || document.hidden) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(chooseCandidate, scrollSettleDelay);
    }

    function updateMode() {
      window.clearTimeout(timer);
      lastCandidate = undefined;
      if (media.matches) afterScroll();
      else stopViewportPreview();
    }

    const closeOnExit = () => {
      window.clearTimeout(timer);
      setActive(null);
    };
    const updateVisibility = () => {
      if (document.hidden) closeOnExit();
      else afterScroll();
    };

    window.addEventListener('scroll', afterScroll, { passive: true });
    window.addEventListener('resize', afterScroll);
    window.addEventListener('pageshow', updateVisibility);
    document.addEventListener('visibilitychange', updateVisibility);
    window.addEventListener('pagehide', closeOnExit);
    media.addEventListener('change', updateMode);
    afterScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', afterScroll);
      window.removeEventListener('resize', afterScroll);
      window.removeEventListener('pageshow', updateVisibility);
      document.removeEventListener('visibilitychange', updateVisibility);
      window.removeEventListener('pagehide', closeOnExit);
      media.removeEventListener('change', updateMode);
    };
  }, [startPreview]);

  return (
    <PreviewContext.Provider value={{ active, startPreview, stopPreview }}>
      <div ref={grid}>{children}</div>
    </PreviewContext.Provider>
  );
}

export function useProjectPreview() {
  return useContext(PreviewContext);
}
