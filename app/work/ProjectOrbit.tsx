'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import type { Project } from '@/data/projects';
import './project-orbit.css';

type OrbitProject = Pick<Project, 'slug' | 'title' | 'image'> & { siteHref?: string };

const segments = 240;
const radians = Math.PI * 2;
const stageAspect = 1000 / 535;
const slideDuration = 2600;
const stepDuration = 520;
const spotlight = .14;

const samples = Array.from({ length: segments + 1 }, (_, index) => {
  const angle = index / segments * radians + Math.PI;
  const horizontal = .413 * Math.sin(angle);
  const vertical = .265 * Math.sin(angle * 2);
  const tangent = Math.atan2(.53 * Math.cos(angle * 2), .413 * Math.cos(angle) * stageAspect);
  return { x: (.5 + horizontal) * 100, y: (.5 + vertical) * 100, rotation: Math.sin(tangent * 2) * 11, distance: 0 };
});

for (let index = 1; index < samples.length; index++) {
  const previous = samples[index - 1];
  const point = samples[index];
  point.distance = previous.distance + Math.hypot((point.x - previous.x) * stageAspect, point.y - previous.y);
}

const length = samples[segments].distance;
const track = samples.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${(x * 10).toFixed(2)} ${(y * 5.35).toFixed(2)}`).join(' ') + 'Z';

function wrap(value: number, max: number) {
  return ((value % max) + max) % max;
}

function positionOnTrack(progress: number) {
  const distance = wrap(progress, 1) * length;
  let low = 0;
  let high = segments;

  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if (samples[middle].distance < distance) low = middle;
    else high = middle;
  }

  const start = samples[low];
  const end = samples[high];
  const fraction = (distance - start.distance) / (end.distance - start.distance);
  const x = start.x + (end.x - start.x) * fraction;
  const y = start.y + (end.y - start.y) * fraction;
  const rotation = start.rotation + (end.rotation - start.rotation) * fraction;
  return {
    transform: `translate3d(${x.toFixed(3)}cqw, ${y.toFixed(3)}cqh, 0) translate(-50%, -50%) rotate(${rotation.toFixed(2)}deg)`,
    zIndex: Math.round(y),
  };
}

export function ProjectOrbit({ projects }: { projects: readonly OrbitProject[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const tiles = useRef<Array<HTMLLIElement | null>>([]);
  const phase = useRef(0);
  const current = useRef(0);
  const [active, setActive] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [viewable, setViewable] = useState(false);
  const [tabVisible, setTabVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [target, setTarget] = useState<number | null>(null);
  const count = projects.length;
  const selected = projects[active];

  const paint = useCallback((value: number) => {
    phase.current = value;
    tiles.current.forEach((tile, index) => {
      if (!tile) return;
      const { transform, zIndex } = positionOnTrack(spotlight + (value - index) / count);
      tile.style.transform = transform;
      tile.style.zIndex = String(zIndex);
    });

    const index = wrap(Math.round(value), count);
    if (current.current !== index) {
      current.current = index;
      setActive(index);
    }
  }, [count]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduced(media.matches);
    const updateVisibility = () => setTabVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setViewable(entry.isIntersecting), { threshold: .15 });
    observer.observe(element);
    media.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    updatePreference();
    updateVisibility();

    return () => {
      observer.disconnect();
      media.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const playing = !manualPause && !reduced;
  const autoplay = playing && viewable && tabVisible && !hovered && !focused;

  useEffect(() => {
    if (!autoplay && target === null) return;

    const start = performance.now();
    const origin = phase.current;
    let previous = start;
    let frame = 0;

    function tick(now: number) {
      if (target === null) {
        paint(phase.current + Math.min(48, Math.max(0, now - previous)) / slideDuration);
        previous = now;
      } else {
        const fraction = reduced ? 1 : Math.max(0, Math.min(1, (now - start) / stepDuration));
        paint(origin + (target - origin) * (1 - Math.pow(1 - fraction, 3)));
        if (fraction === 1) {
          setTarget(null);
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, paint, reduced, target]);

  function step(direction: -1 | 1) {
    setManualPause(true);
    const next = Math.round(target ?? phase.current) + direction;
    if (reduced) paint(next);
    else setTarget(next);
  }

  return (
    <section className="pf-orbit" aria-label="Carrossel dos projetos">
      <div
        ref={stage}
        className="pf-orbit-stage"
        onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
        onPointerLeave={event => { if (event.pointerType === 'mouse') setHovered(false); }}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
        <svg className="pf-orbit-track" viewBox="0 0 1000 535" aria-hidden="true" focusable="false">
          <path className="pf-orbit-track-shadow" d={track} />
          <path d={track} />
        </svg>
        <ul className="pf-orbit-tiles">
          {projects.map(({ slug, title, image }, index) => (
            <li
              className="pf-orbit-tile"
              key={slug}
              ref={element => { tiles.current[index] = element; }}
              style={positionOnTrack(spotlight - index / count)}
              data-current={index === active}
            >
              <Link
                className="pf-orbit-link"
                href={`/work/${slug}`}
                aria-label={`Abrir case de ${title}`}
                title={title}
                prefetch={false}
                data-cover-src={image.src}
              >
                <ResponsiveImage {...image} alt="" sizes="(max-width: 700px) 16vw, (max-width: 1050px) 12vw, 8vw" priority={index === 0} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="pf-orbit-bar">
        <div className="pf-orbit-selection" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
          <strong>{selected.title}</strong>
          <div className="pf-orbit-selection-meta">
            <span>{active + 1} de {count}</span>
            {selected.siteHref && (
              <a href={selected.siteHref} target="_blank" rel="noreferrer" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                Visitar site
              </a>
            )}
          </div>
        </div>
        <div className="pf-orbit-buttons">
          {!reduced && (
            <button
              type="button"
              aria-label={playing ? 'Pausar carrossel' : 'Reproduzir carrossel'}
              onClick={() => setManualPause(value => !value)}
            >
              {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            </button>
          )}
          <button type="button" aria-label="Projeto anterior" onClick={() => step(-1)}>
            <ChevronLeft size={21} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Próximo projeto" onClick={() => step(1)}>
            <ChevronRight size={21} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
