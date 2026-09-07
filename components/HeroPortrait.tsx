'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HeroPortrait({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 55]);
  return (
    <div ref={ref} className={`portrait-wrap ${className}`}>
      <motion.div style={{ y }} className="portrait-motion">
        <Image
          src="/images/edy-portrait.png"
          alt="Retrato editorial de Edmilson Gomes"
          fill
          priority={priority}
          sizes="(max-width: 768px) 92vw, 52vw"
          className="portrait-image"
        />
      </motion.div>
    </div>
  );
}
