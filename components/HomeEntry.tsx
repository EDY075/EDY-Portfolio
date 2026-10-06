'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function HomeEntry() {
  const isExperience = usePathname() === '/experience';
  const [phase, setPhase] = useState<'entering' | 'leaving' | 'done'>('entering');
  const completed = useRef(false);

  useEffect(() => {
    if (completed.current) return;
    // The experience paints its own poster immediately. Keep the approved
    // first-entry presentation on the existing routes only.
    if (isExperience || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = window.requestAnimationFrame(() => {
        completed.current = true;
        setPhase('done');
      });
      return () => window.cancelAnimationFrame(frame);
    }

    let cancelled = false;
    const timers: number[] = [];
    const delay = (duration: number) => new Promise<void>((resolve) => {
      timers.push(window.setTimeout(resolve, duration));
    });
    const image = document.querySelector<HTMLImageElement>('.home-portrait img, .about-portrait img, .case-art img');
    const imageReady = image?.decode().catch(() => undefined) ?? Promise.resolve();
    const contentReady = Promise.allSettled([document.fonts.ready, imageReady]);
    document.documentElement.dataset.preloading = 'true';

    void Promise.all([delay(1250), Promise.race([contentReady, delay(2300)])]).then(() => {
      if (cancelled) return;
      setPhase('leaving');
      timers.push(window.setTimeout(() => {
        if (cancelled) return;
        delete document.documentElement.dataset.preloading;
        completed.current = true;
        setPhase('done');
      }, 500));
    });

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      delete document.documentElement.dataset.preloading;
    };
  }, [isExperience]);

  if (isExperience || phase === 'done') return null;

  return (
    <div className="home-entry" data-leaving={phase === 'leaving'}>
      <output className="home-entry-status">Preparando o portfólio</output>
      <span className="home-entry-kicker" aria-hidden="true">PORTFÓLIO / EDMILSON GOMES</span>
      <div className="home-entry-mark" aria-hidden="true"><span>EDY</span><span>GOMES</span></div>
      <div className="home-entry-bottom" aria-hidden="true">
        <span>Tecnologia útil.<br />Projetos reais.</span>
        <span>São Paulo — BR</span>
      </div>
      <div className="home-entry-line" aria-hidden="true" />
    </div>
  );
}
