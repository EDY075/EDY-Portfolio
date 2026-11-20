'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import './contact-option-c.css';

const fineMotion = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function ContactOptionC({ intro, contacts }: { intro: ReactNode; contacts: ReactNode }) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const motion = window.matchMedia(fineMotion);
    let frame = 0;

    function reset() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      sheet?.style.removeProperty('--ct-c-offset-x');
      sheet?.style.removeProperty('--ct-c-offset-y');
    }

    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType !== 'mouse' || !sheet) return;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const { left, top, width, height } = sheet.getBoundingClientRect();
        const x = (event.clientX - left) / width - .5;
        const y = (event.clientY - top) / height - .5;
        sheet.style.setProperty('--ct-c-offset-x', x.toFixed(3));
        sheet.style.setProperty('--ct-c-offset-y', y.toFixed(3));
      });
    }

    sheet.addEventListener('pointermove', move, { passive: true });
    sheet.addEventListener('pointerleave', reset);
    sheet.addEventListener('pointercancel', reset);
    motion.addEventListener('change', reset);
    window.addEventListener('blur', reset);

    return () => {
      reset();
      sheet.removeEventListener('pointermove', move);
      sheet.removeEventListener('pointerleave', reset);
      sheet.removeEventListener('pointercancel', reset);
      motion.removeEventListener('change', reset);
      window.removeEventListener('blur', reset);
    };
  }, []);

  return (
    <section className="ct-option-c" aria-labelledby="pf-contact-title">
      <div className="ct-c-sheet" ref={sheetRef}>
        {intro}
        <div className="ct-c-mark" aria-hidden="true">
          <span className="ct-c-mark-stroke">EG</span>
          <span className="ct-c-mark-fill">EG</span>
        </div>
      </div>
      <div className="ct-c-channels">{contacts}</div>
    </section>
  );
}
