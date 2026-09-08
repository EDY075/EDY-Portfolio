'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { useRef } from 'react';
import { useHydratedReducedMotion } from './useHydratedReducedMotion';

export function MagneticLink({ href, children, className = '', external = false }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useHydratedReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 20, mass: 0.45 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 20, mass: 0.45 });

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
  };
  const reset = () => { x.set(0); y.set(0); };
  const props = { className, onClick: reset };

  return (
    <motion.div ref={ref} className="magnetic-wrap" style={{ x, y }} onMouseMove={move} onMouseLeave={reset}>
      {external ? <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a> : <Link href={href} prefetch={false} {...props}>{children}</Link>}
    </motion.div>
  );
}
