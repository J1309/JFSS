'use client';

import { motion } from 'framer-motion';

/**
 * Hero logo showpiece — the animated diamond monogram draws itself, then the
 * JIONAFASHION wordmark settles beneath it. Shares the draw-in motif with the
 * site Preloader so the brand mark stays memorable. (Preloader itself untouched.)
 */
export default function HeroLoopingLogo() {
  return (
    <div className="jf-logo-stage">
      <motion.div
        className="jf-logo-mark"
        initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: 4, scale: 1.04 }}
      >
        <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
          <motion.rect
            x="18"
            y="2"
            width="22.6"
            height="22.6"
            rx="3"
            transform="rotate(45 18 2)"
            stroke="currentColor"
            strokeWidth="1.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          <motion.path
            d="M21 11V21C21 23.5 19 25 16.5 25C14.5 25 13 23.8 13 22"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.85, ease: 'easeOut' }}
          />
          <motion.path
            d="M14 12.5H23M14 17.5H20.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: 'easeOut' }}
          />
          <motion.circle
            cx="18"
            cy="8"
            r="2"
            fill="var(--crimson)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.95, type: 'spring', stiffness: 450 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="jf-logo-wordmark"
        initial={{ opacity: 0, y: 12, letterSpacing: '0.32em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.16em' }}
        transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        JIONA<span className="accent">FASHION</span>
      </motion.div>
    </div>
  );
}
