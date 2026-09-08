'use client';

import { motion } from 'framer-motion';
import { editorialEase } from '@/lib/motion';
import { useHydratedReducedMotion } from './useHydratedReducedMotion';

export function TextReveal({ lines, className = '', ariaLabel, delay = 0 }: { lines: React.ReactNode[]; className?: string; ariaLabel?: string; delay?: number }) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.h1
      className={`motion-heading ${className}`}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {lines.map((line, index) => (
        <span className="motion-line-mask" key={index}>
          <motion.span
            className="motion-line"
            variants={{
              hidden: reduce ? { opacity: 0.8 } : { y: '112%', opacity: 0 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: reduce ? 0.18 : 0.82, delay: reduce ? 0 : delay + index * .09, ease: editorialEase }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
