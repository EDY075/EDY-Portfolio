'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { featuredProjects, type Project } from '@/data/projects';
import { ResponsiveImage } from './ResponsiveImage';
import { gsap } from '@/lib/gsap';

function ProjectFilm({ project }: { project: Project }) {
  const alternate = project.caseImage ?? project.image;

  return (
    <Link className="reel-project" href={`/work/${project.slug}`} prefetch={false} data-cover-src={project.image.src}>
      <div className="reel-project-media">
        <ResponsiveImage
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(max-width: 767px) 88vw, 82vw"
          className="reel-project-image reel-project-image-primary"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
        <ResponsiveImage
          src={alternate.src}
          alt=""
          width={alternate.width}
          height={alternate.height}
          sizes="(max-width: 767px) 88vw, 82vw"
          className="reel-project-image reel-project-image-secondary"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
        <span className="reel-project-slate" aria-hidden="true" />
      </div>
      <div className="reel-project-copy">
        <div>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export function ProjectReel() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const media = gsap.matchMedia();
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      section.dataset.active = String(Boolean(entry?.isIntersecting && entry.intersectionRatio >= .03));
    }, { threshold: [0, .03] });
    visibilityObserver.observe(section);

    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = section.querySelector<HTMLElement>('.project-reel-track');
      const cards = Array.from(section.querySelectorAll<HTMLElement>('.reel-project'));
      if (!track || !cards.length) return;

      const lastIndex = cards.length - 1;
      const updateFocus = (progress: number) => {
        const focusedIndex = progress * lastIndex;

        cards.forEach((card, index) => {
          const distanceFromFocus = Math.min(Math.abs(index - focusedIndex), 2);
          const isFocused = Math.round(focusedIndex) === index;

          card.dataset.focused = String(isFocused);
          gsap.set(card, {
            opacity: 1 - Math.min(distanceFromFocus * .18, .36),
            scale: 1 - Math.min(distanceFromFocus * .06, .12),
          });
        });
      };

      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      if (!distance) return;
      updateFocus(0);

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${Math.max(distance * 1.25, window.innerHeight * 4.5)}`,
          pin: true,
          scrub: .85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateFocus(self.progress),
        },
      });
      return () => gsap.set(cards, { clearProps: 'opacity,scale' });
    }, section);

    return () => {
      visibilityObserver.disconnect();
      media.revert();
    };
  }, []);

  return (
    <section ref={root} className="project-reel" aria-labelledby="project-reel-title">
      <div className="project-reel-intro">
        <p>Projetos selecionados</p>
        <h2 id="project-reel-title">{featuredProjects.length} projetos.<br />Diferentes contextos.</h2>
        <span>Role, explore e entre no case que chamar sua atenção.</span>
      </div>
      <div className="project-reel-viewport">
        <div className="project-reel-track">
          {featuredProjects.map((project) => <ProjectFilm key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
