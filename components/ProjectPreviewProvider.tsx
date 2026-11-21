'use client';

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

type PreviewMode = 'hover' | 'manual';
type ActivePreview = { slug: string; mode: PreviewMode };

type PreviewController = {
  active: ActivePreview | null;
  ready: boolean;
  startPreview: (slug: string, mode: PreviewMode) => void;
  stopPreview: (slug: string, mode?: PreviewMode) => void;
};

const PreviewContext = createContext<PreviewController | null>(null);
const subscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ProjectPreviewProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [active, setActive] = useState<ActivePreview | null>(null);

  const startPreview = useCallback((slug: string, mode: PreviewMode) => {
    if (document.hidden) return;
    setActive(current => {
      if (mode === 'hover' && current?.mode === 'manual') return current;
      return { slug, mode };
    });
  }, []);

  const stopPreview = useCallback((slug: string, mode?: PreviewMode) => {
    setActive(current => current?.slug === slug && (!mode || current.mode === mode) ? null : current);
  }, []);

  useEffect(() => {
    const closeWhenHidden = () => {
      if (document.hidden) setActive(null);
    };
    const closeOnExit = () => setActive(null);
    document.addEventListener('visibilitychange', closeWhenHidden);
    window.addEventListener('pagehide', closeOnExit);
    return () => {
      document.removeEventListener('visibilitychange', closeWhenHidden);
      window.removeEventListener('pagehide', closeOnExit);
    };
  }, []);

  return (
    <PreviewContext.Provider value={{ active, ready, startPreview, stopPreview }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function useProjectPreview() {
  return useContext(PreviewContext);
}
