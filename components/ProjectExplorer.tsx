'use client';

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ProjectCollection } from './ProjectCollection';
import { useHydratedReducedMotion } from './motion/useHydratedReducedMotion';

const subscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ProjectExplorer() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [open, setOpen] = useState(false);
  const reduceMotion = useHydratedReducedMotion();
  const explorerRef = useRef<HTMLDetailsElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      const explorer = explorerRef.current;
      if (explorer) window.dispatchEvent(new CustomEvent('edy:align-project-gallery', { detail: explorer }));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      if (explorerRef.current) explorerRef.current.open = false;
      explorerRef.current?.querySelector('summary')?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!ready) {
    return <div id="explorar-3d" className="project-explorer project-explorer-pending" aria-hidden="true">Explorar todos os projetos em 3D <span>↗</span></div>;
  }

  return (
    <details id="explorar-3d" ref={explorerRef} className="project-explorer" open={open} data-lenis-prevent-wheel={open && !reduceMotion ? '' : undefined} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>Explorar todos os projetos em 3D <span aria-hidden="true">↗</span></summary>
      {open && <ProjectCollection />}
    </details>
  );
}
