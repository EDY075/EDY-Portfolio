'use client';

import { motion } from 'framer-motion';
import { editorialEase } from '@/lib/motion';
import { useHydratedReducedMotion } from './useHydratedReducedMotion';

export function ImageReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.div
      className={`image-reveal ${className}`}
      initial={reduce ? { opacity: 0.9 } : { clipPath: 'inset(10% 0 10% 0)', scale: 1.035, opacity: 0.7 }}
      whileInView={{ clipPath: 'inset(0% 0 0% 0)', scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduce ? 0.2 : 1.05, delay: reduce ? 0 : delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
