'use client';

import { useEffect, useRef, useState } from 'react';
import { ResponsiveImage } from './ResponsiveImage';
import type { ProjectImage } from '@/data/projects';

export function DeferredProjectVisual({ image, sizes }: { image: ProjectImage; sizes: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: window.matchMedia('(min-width: 901px)').matches ? '1200px 0px' : '400px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="project-real-media">
      {ready && (
        <ResponsiveImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className="project-real-image"
          style={{ objectFit: image.fit, objectPosition: image.position }}
        />
      )}
    </div>
  );
}
