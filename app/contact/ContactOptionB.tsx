'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './contact-option-b.css';

const pointerQuery = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function ContactOptionB({ intro, contacts }: { intro: ReactNode; contacts: ReactNode }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = section.current;
    if (!scene) return;

    const preference = window.matchMedia(pointerQuery);
    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const reset = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      scene.style.removeProperty('--ct-b-x');
      scene.style.removeProperty('--ct-b-y');
    };

    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== 'mouse') return;

      clientX = event.clientX;
      clientY = event.clientY;
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const { left, top, width, height } = scene.getBoundingClientRect();
        scene.style.setProperty('--ct-b-x', String(((clientX - left) / width) * 2 - 1));
        scene.style.setProperty('--ct-b-y', String(((clientY - top) / height) * 2 - 1));
      });
    };

    scene.addEventListener('pointermove', move, { passive: true });
    scene.addEventListener('pointerleave', reset);
    scene.addEventListener('pointercancel', reset);
    preference.addEventListener('change', reset);
    window.addEventListener('blur', reset);

    return () => {
      reset();
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
      scene.removeEventListener('pointercancel', reset);
      preference.removeEventListener('change', reset);
      window.removeEventListener('blur', reset);
    };
  }, []);

  return (
    <section ref={section} className="ct-option-b" aria-labelledby="pf-contact-title">
      <div className="ct-b-scene" aria-hidden="true">
        <div className="ct-b-portrait">
          <ResponsiveImage
            src="/images/edy-portrait-suit.jpg"
            desktopSrc="/images/edy-portrait-desktop.png"
            alt=""
            width={1023}
            height={1537}
            sizes="(max-width: 959px) 100vw, 86vw"
            priority
          />
        </div>
        <div className="ct-b-contour" />
      </div>
      {intro}
      <div className="ct-b-rail">{contacts}</div>
    </section>
  );
}
