'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const rootElement = root.current;
    if (!rootElement) return;
    const siteFrame = rootElement.closest('.site-frame');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const context = gsap.context(() => {
      if (!reduced) {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (siteFrame) {
          intro.fromTo(siteFrame, { borderColor: 'rgba(241,238,228,0)' }, { borderColor: 'rgba(241,238,228,.7)', duration: .55 }, .05);
        }
        intro.fromTo('.hero-name-back span', { clipPath: mobile ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', yPercent: mobile ? 3 : 12 }, { clipPath: 'inset(0 0 0% 0)', yPercent: 0, stagger: .08, duration: .9 }, .2);
        if (!mobile) {
          intro.fromTo('.home-portrait', { clipPath: 'inset(10% 0 100% 0)', opacity: .45, scale: 1.02 }, { clipPath: 'inset(0% 0 0% 0)', opacity: 1, scale: 1, duration: 1.05 }, .38);
        }
        intro.fromTo(mobile ? '.hero-note, .hero-bottom' : '.hero-note, .hero-intro, .hero-bottom', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: .04, duration: .5 }, .35);
        if (mobile) {
          // The mobile LCP is this paragraph. Animate its position without
          // hiding readable text behind a delayed opacity-zero state.
          intro.fromTo('.hero-intro', { y: 10 }, { y: 0, duration: .5 }, .35);
        }

        const heroTimeline = gsap.timeline({
          scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: true },
        });
        heroTimeline
          .to('.hero-note, .hero-intro, .hero-bottom', { opacity: 0, y: -8, duration: .28, ease: 'none' }, 0)
          .to('.hero-edy', { x: mobile ? -4 : -12, duration: .6, ease: 'none' }, .06)
          .to('.hero-gomes', { x: mobile ? 4 : 12, duration: .6, ease: 'none' }, .06)
          .to('.hero-name-back', { opacity: .78, duration: .55, ease: 'none' }, .1)
          .to('.home-portrait .portrait-motion', { y: mobile ? 6 : 16, scale: mobile ? 1.008 : 1.018, opacity: .68, duration: .65, ease: 'none' }, .18)
          .to('.hero-atmosphere', { yPercent: mobile ? 0 : 2, scale: mobile ? 1.008 : 1.025, opacity: .45, duration: .65, ease: 'none' }, .28)
          .fromTo('.manifesto', { y: mobile ? 0 : 18 }, { y: 0, duration: .55, ease: 'none' }, .4);

        if (!mobile) {
          rootElement.querySelectorAll<HTMLElement>('.home-project-grid .project-entry-new .project-art').forEach((art) => {
            gsap.fromTo(art, { yPercent: 9, opacity: .56 }, {
              yPercent: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: art, start: 'top bottom', end: 'center center', scrub: .45 },
            });
          });
        } else {
          rootElement.querySelectorAll<HTMLElement>('.home-project-grid .project-entry').forEach((entry) => {
            const art = entry.querySelector<HTMLElement>('.project-art');
            const copy = entry.querySelector<HTMLElement>('.project-copy');
            if (!art || !copy) return;
            gsap.fromTo(art, { y: 22, opacity: .76, scale: 1.025 }, {
              y: 0, opacity: 1, scale: 1, duration: .7, ease: 'power2.out',
              scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
            });
            gsap.fromTo(copy, { y: 12, opacity: .7 }, {
              y: 0, opacity: 1, duration: .55, ease: 'power2.out', delay: .1,
              scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
            });
          });
        }

      }
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return <main ref={root}>{children}</main>;
}
