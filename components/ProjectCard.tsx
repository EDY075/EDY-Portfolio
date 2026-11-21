'use client';

import { Play, Square } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import { flushSync } from 'react-dom';
import type { Project } from '@/data/projects';
import { PageReveal } from './PageReveal';
import { ImageReveal } from './motion/ImageReveal';
import { DeferredProjectVisual } from './DeferredProjectVisual';
import { useProjectPreview } from './ProjectPreviewProvider';
import './project-card-preview.css';

const hoverPreviewQuery = '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)';
const hoverDelay = 120;

type CardProject = Pick<Project, 'slug' | 'title' | 'subtitle' | 'keywords' | 'image'>;

export function ProjectCard({ project, index = 0, sequence = false }: { project: CardProject; index?: number; sequence?: boolean }) {
  const preview = useProjectPreview();
  const slug = project.slug;
  const mode = preview?.active?.slug === slug ? preview.active.mode : undefined;
  const stopPreview = preview?.stopPreview;
  const art = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const cancelHover = useRef<(() => void) | null>(null);
  const feedback = useId();
  const [failed, setFailed] = useState(false);

  function clearHover() {
    cancelHover.current?.();
    cancelHover.current = null;
  }

  useEffect(() => () => cancelHover.current?.(), []);

  useEffect(() => {
    const video = player.current;
    const artwork = art.current;
    if (!mode || !video || !artwork || !stopPreview) return;

    const fail = () => {
      if (player.current !== video) return;
      setFailed(true);
      stopPreview(slug);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stopPreview(slug);
    });
    observer.observe(artwork);

    const hoverMedia = window.matchMedia(hoverPreviewQuery);
    const stopIfMotionChanges = () => {
      if (!hoverMedia.matches) stopPreview(slug, 'hover');
    };
    if (mode === 'hover') {
      hoverMedia.addEventListener('change', stopIfMotionChanges);
      void video.play().catch(fail);
    }

    return () => {
      observer.disconnect();
      hoverMedia.removeEventListener('change', stopIfMotionChanges);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [mode, slug, stopPreview]);

  function startHover(event: PointerEvent<HTMLDivElement>) {
    if (!preview || event.pointerType !== 'mouse' || !window.matchMedia(hoverPreviewQuery).matches) return;
    clearHover();
    const card = event.currentTarget;
    const root = document.documentElement;
    const playPreview = () => {
      clearHover();
      if (!card.matches(':hover') || !window.matchMedia(hoverPreviewQuery).matches) return;
      setFailed(false);
      preview.startPreview(slug, 'hover');
    };
    const timer = window.setTimeout(() => {
      if (root.dataset.projectHover !== 'locked') {
        playPreview();
        return;
      }
      // Aguarda o fim da rolagem enquanto o cursor continua sobre o card.
      const observer = new MutationObserver(() => {
        if (root.dataset.projectHover !== 'locked') playPreview();
      });
      observer.observe(root, { attributeFilter: ['data-project-hover'] });
      cancelHover.current = () => observer.disconnect();
    }, hoverDelay);
    cancelHover.current = () => window.clearTimeout(timer);
  }

  function stopHover() {
    clearHover();
    stopPreview?.(slug, 'hover');
  }

  function togglePreview() {
    if (!preview) return;
    clearHover();
    if (mode) {
      preview.stopPreview(slug);
      return;
    }
    setFailed(false);
    // O navegador precisa associar play() ao toque para liberar a reprodução.
    flushSync(() => preview.startPreview(slug, 'manual'));
    const video = player.current;
    if (video) void video.play().catch(() => {
      if (player.current !== video) return;
      setFailed(true);
      preview.stopPreview(slug);
    });
  }

  const visual = (
    <div
      ref={art}
      className={`project-art project-art-real project-art-${(index % 9) + 1}`}
    >
      <DeferredProjectVisual
        image={project.image}
        sizes="(max-width: 700px) 94vw, (max-width: 900px) 46vw, 31vw"
      />
      {mode && (
        <video
          ref={player}
          className="project-card-preview-video"
          src={`/media/project-previews/${slug}.mp4?v=2`}
          preload="none"
          muted
          playsInline
          loop
          aria-hidden="true"
          onPlaying={event => { event.currentTarget.dataset.playing = 'true'; }}
          onError={() => {
            setFailed(true);
            stopPreview?.(slug);
          }}
        />
      )}
    </div>
  );
  const content = (
    <Link href={`/work/${project.slug}`} prefetch={false} className="project-link" data-cover-src={project.image.src}>
      <div className="project-preview">
        {sequence ? <div className="image-reveal">{visual}</div> : <ImageReveal>{visual}</ImageReveal>}
        <div className="project-copy">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
          <span className="project-case-label">Ver case</span>
        </div>
      </div>
      <div className="project-tags" aria-label="Áreas do projeto">
        {project.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
      </div>
    </Link>
  );
  const card = preview ? (
    <div className="project-card-preview" onPointerEnter={startHover} onPointerLeave={stopHover}>
      {content}
      <button
        className="project-card-preview-button"
        type="button"
        disabled={!preview.ready}
        aria-label={`${mode ? 'Parar prévia' : 'Prévia'} de ${project.title}`}
        aria-describedby={failed ? feedback : undefined}
        onClick={togglePreview}
      >
        {mode ? <Square aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
      </button>
      <output id={feedback} className="project-card-preview-status">
        {failed ? 'Prévia indisponível. Tente novamente.' : ''}
      </output>
    </div>
  ) : content;
  return sequence
    ? <div className={`project-entry project-entry-sequence${index >= 6 ? ' project-entry-new' : ''}`}>{card}</div>
    : <PageReveal className="project-entry" delay={(index % 2) * 0.08}>{card}</PageReveal>;
}
