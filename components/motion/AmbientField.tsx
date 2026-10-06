'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  phase: number;
};

const MAX_DPR = 1.5;
const FRAME_INTERVAL = 1000 / 30;
const COARSE_FRAME_INTERVAL = 1000 / 15;
const MAX_CANVAS_PIXELS = 8_300_000;

export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let resizeFrame = 0;
    let previousFrame = 0;
    let previousScroll = window.scrollY;
    let scrollImpulse = 0;

    const createParticles = () => {
      const density = coarsePointer ? 11000 : 12500;
      const count = Math.max(coarsePointer ? 38 : 64, Math.min(coarsePointer ? 54 : 120, Math.round((width * height) / density)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: ((index * 83.3) % 100) / 100 * width,
        y: ((index * 47.7 + 19) % 100) / 100 * height,
        radius: 0.8 + (index % 4) * 0.4,
        vx: ((index % 7) - 3) * 0.1,
        vy: 0.12 + (index % 5) * 0.035,
        phase: index * 0.73,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelBudgetDpr = Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, width * height));
      dpr = coarsePointer ? 1 : Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_DPR, pixelBudgetDpr));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = (time: number, move: boolean) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(231, 224, 201, 0.7)';
      const portrait = document.querySelector<HTMLElement>('.portrait-wrap')?.getBoundingClientRect();
      const portraitVisible = portrait && portrait.bottom > 0 && portrait.top < height;

      particles.forEach((particle) => {
        if (move) {
          const wave = Math.sin(time * 0.00055 + particle.phase) * 0.16;
          particle.x += particle.vx + wave;
          particle.y += particle.vy + scrollImpulse * 0.016;

          if (particle.x < -12) particle.x = width + 12;
          if (particle.x > width + 12) particle.x = -12;
          if (particle.y < -12) particle.y = height + 12;
          if (particle.y > height + 12) particle.y = -12;
        }

        if (portraitVisible && particle.x >= portrait.left - 3 && particle.x <= portrait.right + 3 && particle.y >= portrait.top - 3 && particle.y <= portrait.bottom + 3) return;

        let alpha = 1;
        if (pointer.active) {
          const distance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
          alpha = Math.max(0, Math.min(1, (distance - (coarsePointer ? 45 : 65)) / (coarsePointer ? 85 : 115)));
        }

        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;

      scrollImpulse *= 0.9;
    };

    const animate = (time: number) => {
      const interval = coarsePointer ? COARSE_FRAME_INTERVAL : FRAME_INTERVAL;
      if (time - previousFrame >= interval) {
        previousFrame = time;
        draw(time, true);
      }
      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = !coarsePointer || event.pointerType === 'touch';
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleScroll = () => {
      if (reducedMotion) return;
      const nextScroll = window.scrollY;
      scrollImpulse = Math.max(-42, Math.min(42, nextScroll - previousScroll));
      previousScroll = nextScroll;
    };

    const handleResize = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resize();
        draw(performance.now(), false);
        resizeFrame = 0;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        return;
      }

      if (reducedMotion) draw(performance.now(), false);
      else if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      if (reducedMotion) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        pointer.active = false;
        draw(performance.now(), false);
      } else if (!document.hidden && !frame) frame = window.requestAnimationFrame(animate);
    };

    resize();
    draw(0, false);

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    if (coarsePointer) {
      window.addEventListener('pointerup', handlePointerLeave, { passive: true });
      window.addEventListener('pointercancel', handlePointerLeave, { passive: true });
    }
    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerup', handlePointerLeave);
      window.removeEventListener('pointercancel', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div className="ambient-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
