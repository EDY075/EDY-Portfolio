'use client';

import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import { ResponsiveImage } from './ResponsiveImage';
import { useHydratedReducedMotion } from './motion/useHydratedReducedMotion';

type Stage = { width: number; height: number };

const STEP = 30;
const EASE = 0.085;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const radians = (degrees: number) => (degrees * Math.PI) / 180;

export function ProjectCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const turn = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const drawRef = useRef<() => void>(() => undefined);
  const dragStart = useRef<{ x: number; y: number; lastY: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wheelPause = useRef(0);
  const wheelDelta = useRef(0);
  const wheelDirection = useRef(0);
  const reduceMotion = useHydratedReducedMotion();
  const [stage, setStage] = useState<Stage>({ width: 0, height: 0 });
  const [active, setActive] = useState(0);

  const count = projects.length;
  const last = Math.max(count - 1, 0);
  const maxProgress = count;
  const activeProject = projects[active] ?? projects[0];

  const metrics = useMemo(() => {
    const compact = stage.width < 600;
    const widthFactor = compact ? 0.82 : stage.width < 1000 ? 0.66 : 0.57;
    const cardWidth = compact
      ? Math.min(stage.width * widthFactor, stage.height * 0.9)
      : Math.min(stage.height * 0.65 * 1.45, stage.width * widthFactor);
    const cardHeight = cardWidth / 1.45;
    return {
      cardWidth,
      cardHeight,
      ringRadius: cardHeight * (compact ? 0.68 : 1.14),
      drumRadius: cardHeight * (compact ? 1.35 : 1.55),
      perspective: Math.max(cardHeight * 2.7, 680),
    };
  }, [stage]);

  const draw = useCallback(() => {
    const difference = target.current - turn.current;
    turn.current = Math.abs(difference) < 0.001
      ? target.current
      : turn.current + difference * (reduceMotion ? 1 : EASE);

    const progress = turn.current;
    const transition = clamp(progress, 0, 1);
    const position = clamp(Math.max(0, progress - 1), 0, last);
    const focused = clamp(Math.round(position), 0, last);

    if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-transition * metrics.drumRadius}px)`;
    if (labelRef.current) {
      labelRef.current.style.opacity = String(1 - transition);
      labelRef.current.style.visibility = transition > 0.98 ? 'hidden' : 'visible';
    }
    if (currentRef.current) {
      currentRef.current.style.display = transition < 0.02 ? 'none' : 'block';
      currentRef.current.style.opacity = String(transition);
      currentRef.current.style.visibility = transition < 0.02 ? 'hidden' : 'visible';
    }

    projects.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const distance = index - position;
      const ringAngle = index * (360 / count);
      const drumAngle = distance * STEP;
      const ringScale = clamp(
        (((2 * Math.PI * metrics.ringRadius) / count) * 0.78) / (metrics.cardWidth || 1),
        0.24,
        0.8,
      );
      const bow = -metrics.cardHeight * 1.78 * (1 - Math.cos(radians(drumAngle)));
      card.style.transform = [
        `translateX(${transition * bow}px)`,
        `rotateZ(${(1 - transition) * ringAngle}deg)`,
        `translateY(${-(1 - transition) * metrics.ringRadius}px)`,
        `rotateX(${transition * drumAngle}deg)`,
        `translateZ(${transition * metrics.drumRadius}px)`,
      ].join(' ');
      const distanceFromFocus = Math.abs(distance);
      card.style.opacity = transition > 0.5
        ? distanceFromFocus > 1.15 ? '0' : String(clamp(1 - distanceFromFocus * 1.1, 0.08, 1))
        : '1';
      card.style.pointerEvents = transition > 0.5 && distanceFromFocus > 0.55 ? 'none' : 'auto';
      card.style.zIndex = String(Math.round(100 - distanceFromFocus * 3));

      const face = card.firstElementChild as HTMLElement | null;
      const drumScale = clamp(1 - distanceFromFocus * 0.14, 0.68, 1);
      if (face) face.style.transform = `scale(${ringScale * (1 - transition) + drumScale * transition})`;
    });

    setActive((current) => current === focused ? current : focused);
    if (turn.current !== target.current) frame.current = window.requestAnimationFrame(() => drawRef.current());
    else frame.current = 0;
  }, [count, last, metrics, reduceMotion]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  const animateTo = useCallback((next: number) => {
    const nextTarget = clamp(next, 0, maxProgress);
    target.current = nextTarget;
    if (!frame.current) frame.current = window.requestAnimationFrame(() => drawRef.current());
  }, [maxProgress]);

  useEffect(() => {
    if (reduceMotion) return;
    const explorer = sectionRef.current?.closest<HTMLDetailsElement>('.project-explorer');
    const handleWheel = (event: WheelEvent) => {
      const sectionBounds = sectionRef.current?.getBoundingClientRect();
      if (!explorer || !sectionBounds || sectionBounds.top > window.innerHeight * 0.25 || sectionBounds.bottom < window.innerHeight * 0.65) return;
      if (!explorer?.contains(event.target as Node)) return;
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const direction = Math.sign(event.deltaY);
      if (!direction) return;
      const rail = sectionRef.current?.querySelector<HTMLElement>('.project-wheel-rail');
      if (rail?.contains(event.target as Node) && rail.scrollHeight > rail.clientHeight + 1) {
        const canScrollRail = direction > 0
          ? rail.scrollTop + rail.clientHeight < rail.scrollHeight - 1
          : rail.scrollTop > 1;
        if (canScrollRail) return;
      }
      const next = target.current + direction;
      if (next < 0 || next > maxProgress) {
        wheelDelta.current = 0;
        explorer.removeAttribute('data-lenis-prevent-wheel');
        return;
      }
      explorer.setAttribute('data-lenis-prevent-wheel', '');
      const now = performance.now();
      if (now < wheelPause.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (wheelDirection.current !== direction) wheelDelta.current = 0;
      wheelDirection.current = direction;
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      wheelDelta.current += event.deltaY * unit;
      if (Math.abs(wheelDelta.current) < 90) return;
      animateTo(next);
      wheelDelta.current = 0;
      wheelPause.current = now + 760;
    };
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', handleWheel, true);
  }, [animateTo, maxProgress, reduceMotion]);

  useEffect(() => {
    const stageNode = stageRef.current;
    if (!stageNode) return;

    const observer = new ResizeObserver(() => setStage({ width: stageNode.clientWidth, height: stageNode.clientHeight }));
    observer.observe(stageNode);

    if (reduceMotion) return () => observer.disconnect();

    const handlePointerDown = (event: PointerEvent) => {
      suppressClick.current = false;
      if (event.pointerType === 'touch') {
        touchStart.current = { x: event.clientX, y: event.clientY };
        return;
      }
      if (event.button !== 0) return;
      dragStart.current = { x: event.clientX, y: event.clientY, lastY: event.clientY, moved: false };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const start = dragStart.current;
      if (!start) return;
      if (!start.moved) {
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) < 6) return;
        // Capturing on pointerdown retargets an ordinary link click to the stage.
        start.moved = true;
        suppressClick.current = true;
        stageNode.setPointerCapture(event.pointerId);
      }
      const delta = start.lastY - event.clientY;
      animateTo(target.current + delta / 420);
      start.lastY = event.clientY;
    };

    const finishPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        const start = touchStart.current;
        touchStart.current = null;
        if (start) {
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            suppressClick.current = true;
            animateTo(target.current + (dx < 0 ? 1 : -1));
            event.preventDefault();
          }
        }
        return;
      }
      if (dragStart.current === null) return;
      const moved = dragStart.current.moved;
      dragStart.current = null;
      if (moved) animateTo(Math.round(target.current));
      if (stageNode.hasPointerCapture(event.pointerId)) stageNode.releasePointerCapture(event.pointerId);
    };

    stageNode.addEventListener('pointerdown', handlePointerDown);
    stageNode.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', finishPointer);
    const cancelPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') touchStart.current = null;
      else finishPointer(event);
    };
    const handleClick = (event: MouseEvent) => {
      if (event.detail === 0) {
        suppressClick.current = false;
        return;
      }
      if (!suppressClick.current || !stageNode.contains(event.target as Node)) return;
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    };
    window.addEventListener('click', handleClick, true);
    stageNode.addEventListener('pointercancel', cancelPointer);
    return () => {
      observer.disconnect();
      stageNode.removeEventListener('pointerdown', handlePointerDown);
      stageNode.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', finishPointer);
      window.removeEventListener('click', handleClick, true);
      stageNode.removeEventListener('pointercancel', cancelPointer);
    };
  }, [animateTo, reduceMotion]);

  useLayoutEffect(() => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(draw);
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [draw, reduceMotion, stage.height, stage.width]);

  const selectProject = (index: number) => animateTo(index + 1);
  const previousProject = () => animateTo(Math.max(1, Math.ceil(target.current) - 1));
  const nextProject = () => animateTo(Math.min(maxProgress, Math.floor(target.current) + 1));
  const focusProject = (index: number) => {
    selectProject(index);
    window.requestAnimationFrame(() => {
      const explorer = sectionRef.current?.closest<HTMLDetailsElement>('.project-explorer');
      if (explorer?.contains(document.activeElement)) {
        window.dispatchEvent(new CustomEvent('edy:align-project-gallery', { detail: explorer }));
      }
    });
  };

  return (
    <section ref={sectionRef} id="project-wheel" className="project-collection" aria-label="Todos os projetos selecionados">
      <div className="project-wheel-section" data-reduced-motion={reduceMotion || undefined}>
        <div className="project-wheel-copy">
          <span>Todos os projetos</span>
          {reduceMotion ? <p>Selecione um projeto no índice para abrir o case.</p> : (
            <>
              <p className="project-wheel-instruction-desktop">Role para avançar um projeto por vez. Clique na imagem ou no índice para abrir o case.</p>
              <p className="project-wheel-instruction-touch">Deslize para mudar de projeto. Toque na imagem ou no índice para abrir o case.</p>
            </>
          )}
        </div>

        <div className="project-wheel-mobile-controls" aria-label="Controles da galeria">
          <button type="button" onClick={previousProject} disabled={active === 0} aria-label="Projeto anterior">Anterior</button>
          <button type="button" onClick={nextProject} disabled={active === last} aria-label="Próximo projeto">Próximo</button>
        </div>

        <div
          ref={stageRef}
          className="project-wheel-stage"
          aria-label="Roda interativa com todos os projetos"
          onDragStart={(event) => event.preventDefault()}
          style={{ perspective: `${metrics.perspective}px` }}
        >
          <div ref={wheelRef} className="project-wheel">
            {projects.map((project, index) => (
              <Link
                id={`project-wheel-${index}`}
                key={project.slug}
                href={`/work/${project.slug}#detalhes`}
                prefetch={false}
                draggable={false}
                data-cover-src={project.image.src}
                ref={(node) => { cardRefs.current[index] = node; }}
                className="project-wheel-card"
                aria-label={`Abrir projeto ${project.displayTitle}`}
                tabIndex={index === active ? 0 : -1}
                onFocus={() => focusProject(index)}
                style={{
                  width: metrics.cardWidth,
                  height: metrics.cardHeight,
                  marginLeft: -metrics.cardWidth / 2,
                  marginTop: -metrics.cardHeight / 2,
                }}
              >
                <span className="project-wheel-face">
                  <ResponsiveImage
                    src={project.image.src}
                    alt=""
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(max-width: 767px) 82vw, (max-width: 1200px) 46vw, 640px"
                    style={{ objectFit: 'contain', objectPosition: project.image.position ?? 'center' }}
                  />
                  <span className="project-wheel-action">Ver case</span>
                </span>
              </Link>
            ))}
          </div>

          <div ref={labelRef} className="project-wheel-label" aria-hidden="true">Projetos</div>
        </div>

        <aside className="project-wheel-rail">
          <div className="project-wheel-controls" aria-label="Controles da galeria">
            <button type="button" onClick={previousProject} disabled={active === 0} aria-label="Projeto anterior">Anterior</button>
            <button type="button" onClick={nextProject} disabled={active === last} aria-label="Próximo projeto">Próximo</button>
          </div>
          <nav className="project-wheel-index" aria-label="Índice de todos os projetos">
            {projects.map((project, index) => (
              <Link
                href={`/work/${project.slug}#detalhes`}
                prefetch={false}
                data-cover-src={project.image.src}
                key={project.slug}
                onPointerEnter={(event) => {
                  if (window.innerWidth > 900 && event.pointerType === 'mouse') selectProject(index);
                }}
                onFocus={() => focusProject(index)}
                aria-current={index === active ? 'true' : undefined}
              >
                <span>{project.displayTitle}</span>
                <span className="project-case-label">Ver case</span>
              </Link>
            ))}
          </nav>

          <div ref={currentRef} className="project-wheel-current" aria-live="polite">
            <span>Em foco</span>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.subtitle}</p>
            <Link href={`/work/${activeProject.slug}#detalhes`} prefetch={false} data-cover-src={activeProject.image.src}>Ver case</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
