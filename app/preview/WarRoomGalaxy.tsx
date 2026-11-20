'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function WarRoomGalaxy() {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;

    let inView = false;
    const syncVisibility = () => {
      element.toggleAttribute('data-in-view', inView && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncVisibility();
    });

    observer.observe(element);
    document.addEventListener('visibilitychange', syncVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  return (
    <figure className="eg-war-galaxy" ref={scene} aria-hidden="true">
      <picture>
        <source media="(max-width: 900px)" srcSet="/images/projects/war-room/galaxy-mobile.webp" />
        <Image src="/images/projects/war-room/galaxy.webp" width={1672} height={940} alt="" unoptimized />
      </picture>
    </figure>
  );
}
