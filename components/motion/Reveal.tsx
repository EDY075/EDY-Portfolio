'use client';

import { motion } from 'framer-motion';
import { editorialEase, revealViewport } from '@/lib/motion';
import { useHydratedReducedMotion } from './useHydratedReducedMotion';

type RevealVariant = 'soft' | 'fade' | 'clip';

export function Reveal({ children, className = '', delay = 0, variant = 'soft' }: { children: React.ReactNode; className?: string; delay?: number; variant?: RevealVariant }) {
  const reduce = useHydratedReducedMotion();
  const hidden = variant === 'fade'
    ? { opacity: 0 }
    : variant === 'clip'
      ? { opacity: 0.75, y: 18, clipPath: 'inset(0 0 100% 0)' }
      : { opacity: 0, y: 12 };
  const visible = variant === 'clip'
    ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
    : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0.85 } : hidden}
      whileInView={visible}
      viewport={revealViewport}
      transition={{ duration: reduce ? 0.18 : 0.7, delay: reduce ? 0 : delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
