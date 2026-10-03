'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CaseSlide } from '@/data/projects';
import { ProjectVisual } from './ProjectVisual';

export function CaseGallery({ title, slides }: { title: string; slides: CaseSlide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    const element = track.current;
    const child = element?.children[next] as HTMLElement | undefined;
    if (element && child) element.scrollTo({ left: child.offsetLeft - element.offsetLeft, behavior: 'smooth' });
    setActive(next);
  };

  const updateActive = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = track.current;
      if (!element) return;
      const nearest = Array.from(element.children).reduce((best, child, index) => {
        const distance = Math.abs((child as HTMLElement).offsetLeft - element.offsetLeft - element.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      setActive(nearest.index);
    });
  };

  return (
    <section className="case-gallery section-pad" aria-label={`Imagens do projeto ${title}`}>
      <div className="case-gallery-heading">
        <div><span className="section-index">O PROJETO POR DENTRO</span><h2>Veja de perto.</h2><p>Deslize ou use as setas para explorar.</p></div>
        <div className="case-gallery-controls" aria-label="Navegação das imagens">
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Imagem anterior"><ArrowLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === slides.length - 1} aria-label="Próxima imagem"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="case-gallery-track" ref={track} onScroll={updateActive}>
        {slides.map((slide) => <figure className="case-gallery-slide" key={slide.image.src}>
          <div className="case-gallery-image" style={{ aspectRatio: String(Math.max(.65, Math.min(1.8, slide.image.width / slide.image.height))) }}><ProjectVisual image={slide.image} sizes="(max-width: 700px) 88vw, 78vw" /></div>
          <figcaption><div><strong>{slide.title}</strong><p>{slide.caption}</p></div><a href={slide.image.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagem: ${slide.title}`}>Ampliar <ArrowUpRight aria-hidden="true" /></a></figcaption>
        </figure>)}
      </div>
      <div className="case-gallery-pagination" aria-label="Escolher imagem">
        {slides.map((slide, index) => <button key={slide.image.src} type="button" onClick={() => goTo(index)} aria-label={`Ver imagem: ${slide.title}`} aria-current={active === index ? 'true' : undefined}><span /></button>)}
      </div>
    </section>
  );
}
