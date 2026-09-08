'use client';

import { ResponsiveImage } from './ResponsiveImage';
import { motion } from 'framer-motion';
import { useHydratedReducedMotion } from './motion/useHydratedReducedMotion';

export function HeroPortrait({ className = '', priority = false, reveal = true }: { className?: string; priority?: boolean; reveal?: boolean }) {
  const reduce = useHydratedReducedMotion();
  return (
    <div className={`portrait-wrap ${className}`}>
      <motion.div
        className="portrait-reveal"
        initial={!reveal ? false : { clipPath: 'inset(0 0 100% 0)', opacity: .55 }}
        animate={!reveal ? undefined : { clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        transition={{ duration: reduce ? .01 : 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="portrait-motion">
          <ResponsiveImage
            src="/images/edy-portrait-suit.jpg"
            desktopSrc="/images/edy-portrait-desktop.png"
            alt="Retrato editorial de Edmilson Gomes"
            width={1023}
            height={1537}
            priority={priority}
            sizes="(max-width: 560px) 140vw, (max-width: 767px) 94vw, 100vw"
            className="portrait-image"
          />
        </div>
      </motion.div>
    </div>
  );
}
