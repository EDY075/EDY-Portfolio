'use client';

import { Droplets } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type PointerEvent } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { HANDOFF_WAVE, HeroIntro, PORTRAIT_IMAGE } from './PreviewHero';
import { HeroWorkScene } from './HeroWorkScene';
import { HeroTraceScene } from './HeroTraceScene';
import './hero-comparison.css';

const variants = [
  { id: 'a', label: 'Retrato em camadas' },
  { id: 'b', label: 'Do retrato ao trabalho' },
  { id: 'c', label: 'Linha até os projetos' },
] as const;

type Variant = (typeof variants)[number]['id'];

const portraitPlanes = [
  {
    layout: 'wide', width: 740, height: 416, alignment: 'xMaxYMid',
    src: '/images/optimized/edy-portrait-desktop-1672.webp',
    outline: 'M261 416Q281 388 301 372Q310 324 348 294L362 286Q382 264 396 242Q402 234 429 225L466 212L479 201Q470 189 464 174Q455 155 450 145Q431 134 436 105Q435 86 450 70Q462 53 483 48Q502 38 522 43Q545 44 562 56Q578 69 580 91L584 106Q592 114 587 130Q585 148 577 157L585 181Q592 179 598 190Q605 200 629 204L700 212Q726 215 740 229V416Z',
  },
  {
    layout: 'narrow', width: 395, height: 593, alignment: 'xMidYMin',
    src: '/images/optimized/edy-portrait-suit-828.webp',
    outline: 'M0 488Q26 469 69 451L107 434Q94 427 85 422Q66 409 67 385L70 354Q68 342 75 325L82 285Q80 261 91 248L120 232L139 219L145 212L151 207L164 192Q153 181 144 163L134 151L129 139Q110 139 111 112Q108 94 124 75Q145 57 169 61Q192 56 212 77Q221 84 223 102L224 113Q232 119 228 135L221 150L226 168Q233 162 241 180L274 187L331 206Q345 221 353 247Q371 285 365 327L352 382L351 411L363 442L391 507L371 553L360 547V593H0Z',
  },
] as const;

function DepthPortrait() {
  return portraitPlanes.map(({ layout, width, height, alignment, src, outline }) => (
    <svg
      key={layout}
      className={`eg-compare-depth eg-compare-depth--${layout}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={`${alignment} slice`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`eg-compare-portrait-${layout}`}><path d={outline} /></clipPath>
      </defs>
      <image href={src} width={width} height={height} clipPath={`url(#eg-compare-portrait-${layout})`} />
    </svg>
  ));
}

export function HeroComparison({ projects, compare = false }: ComponentProps<typeof HeroWorkScene> & { compare?: boolean }) {
  const [selection, setSelection] = useState<Variant | null>(null);
  const variant = selection ?? 'c';
  const frame = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(false);

  useLayoutEffect(() => {
    if (!compare) return;

    const readVariant = () => {
      const choice = new URL(window.location.href).searchParams.get('hero');
      setSelection(variants.find(item => item.id === choice)?.id ?? null);
    };
    readVariant();
    window.addEventListener('popstate', readVariant);
    return () => window.removeEventListener('popstate', readVariant);
  }, [compare]);

  useEffect(() => {
    const scene = frame.current;
    const canvas = stage.current;
    if (!scene || !canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let request = 0;
    let last = -1;

    function update() {
      request = 0;
      if (!scene || !canvas) return;
      const range = scene.offsetHeight - canvas.offsetHeight;
      const progress = reduced.matches || range <= 0
        ? 0
        : Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / range));
      if (progress === last) return;
      last = progress;
      const reveal = Math.min(1, Math.max(0, (progress - .07) / .76));
      canvas.style.setProperty('--eg-scene-progress', progress.toFixed(4));
      canvas.style.setProperty('--eg-scene-reveal', (reveal * reveal * (3 - 2 * reveal)).toFixed(4));
      canvas.toggleAttribute('data-trace-started', progress > .025);
      canvas.dataset.workStep = progress < .12 ? '0' : progress < .25 ? '1' : progress < .38 ? '2' : '3';
    }

    function schedule() {
      if (!request) request = window.requestAnimationFrame(update);
    }

    function onScroll() {
      photo.current?.removeAttribute('data-pointer-color');
      schedule();
    }

    const size = new ResizeObserver(schedule);
    size.observe(canvas);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    update();

    return () => {
      size.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      window.cancelAnimationFrame(request);
    };
  }, []);

  function selectVariant(choice: Variant) {
    setSelection(choice);
    setColor(false);
    photo.current?.removeAttribute('data-pointer-color');
    const url = new URL(window.location.href);
    url.searchParams.set('hero', choice);
    url.hash = '';
    window.history.replaceState(window.history.state, '', url);
    window.dispatchEvent(new Event('edy:scroll-to-top'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function previewColor(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse') event.currentTarget.setAttribute('data-pointer-color', 'true');
  }

  function clearColor(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.removeAttribute('data-pointer-color');
  }

  return (
    <section id="inicio" className="eg-compare" data-hero-variant={variant} ref={frame} aria-labelledby="eg-title">
      <div className="eg-compare-stage" ref={stage}>
        <HeroIntro className="eg-compare-intro" />

        <div
          className="eg-compare-photo"
          ref={photo}
          data-color={color}
          onPointerMove={previewColor}
          onPointerLeave={clearColor}
          onPointerCancel={clearColor}
        >
          <div className="eg-compare-plate">
            <div className="eg-compare-portrait">
              <ResponsiveImage {...PORTRAIT_IMAGE} alt="Retrato de Edmilson Gomes" priority />
            </div>
          </div>
          <button className="eg-portrait-toggle eg-compare-color" type="button" aria-pressed={color} onClick={() => setColor(value => !value)}>
            <Droplets size={16} strokeWidth={1.7} aria-hidden="true" /> Cor no retrato
          </button>
        </div>

        {variant === 'a' && <DepthPortrait />}
        {variant === 'b' && <HeroWorkScene projects={projects} />}
        {variant === 'c' && <HeroTraceScene />}

        {variant !== 'c' && (
          <svg className="eg-compare-wave" viewBox="0 0 1600 280" preserveAspectRatio="none" aria-hidden="true">
            <path d={HANDOFF_WAVE} />
          </svg>
        )}
      </div>

      {compare && selection && (
        <div className="eg-compare-dock">
          <div className="eg-compare-choice">
            <span>Comparar abertura</span>
            <span aria-live="polite">{variants.find(item => item.id === variant)?.label}</span>
          </div>
          <fieldset className="eg-compare-buttons"><legend className="sr-only">Versão da abertura</legend>
            {variants.map(({ id, label }) => (
              <button key={id} type="button" aria-label={`${id.toUpperCase()} · ${label}`} aria-pressed={variant === id} onClick={() => selectVariant(id)}>
                {id.toUpperCase()}
              </button>
            ))}
          </fieldset>
        </div>
      )}
    </section>
  );
}
