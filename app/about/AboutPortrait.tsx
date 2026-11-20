'use client';

import { Droplets } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './about-portrait.css';

export function AboutPortrait() {
  const frame = useRef<HTMLElement>(null);
  const [color, setColor] = useState(false);

  useEffect(() => {
    const portrait = frame.current;
    if (!portrait) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let request = 0;
    let last = -1;

    function update() {
      request = 0;
      if (!portrait) return;

      const box = portrait.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = Math.min(window.scrollY - 10, viewport * .88 - box.top);
      const progress = reduced.matches ? 0 : Math.min(1, Math.max(0, distance / Math.min(viewport * .34, box.height * .56)));
      if (progress === last) return;

      last = progress;
      portrait.style.setProperty('--pf-portrait-progress', progress.toFixed(4));
    }

    function schedule() {
      if (!request) request = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      window.cancelAnimationFrame(request);
    };
  }, []);

  return (
    <figure className="pf-portrait" ref={frame} data-color={color}>
      <div className="pf-portrait-crop">
        <ResponsiveImage
          src="/images/edy-portrait-suit.jpg"
          alt="Retrato de Edmilson Gomes"
          width={1023}
          height={1537}
          sizes="(max-width: 760px) 94vw, min(42vw, 544px)"
          priority
        />
      </div>

      <svg className="pf-portrait-mark pf-portrait-mark-start" viewBox="0 0 72 72" aria-hidden="true" focusable="false">
        <path d="M1 71V12Q1 1 12 1H71" pathLength="1" />
      </svg>
      <svg className="pf-portrait-mark pf-portrait-mark-end" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <path d="M95 1V34L34 95H1" pathLength="1" />
      </svg>

      <button className="pf-portrait-color" type="button" aria-pressed={color} onClick={() => setColor(value => !value)}>
        <Droplets size={16} strokeWidth={1.7} aria-hidden="true" /> Cor no retrato
      </button>
    </figure>
  );
}
