'use client';

import { motion } from 'framer-motion';

export default function HeroLoopingLogo() {
  return (
    <motion.div
      className="hero-top-big-logo"
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      {/* Big Diamond Monogram Icon */}
      <div className="hero-big-symbol-box">
        <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
          {/* Diamond Outer Frame Stroke Draw */}
          <motion.rect
            x="18"
            y="2"
            width="22.6"
            height="22.6"
            rx="3"
            transform="rotate(45 18 2)"
            stroke="currentColor"
            strokeWidth="1.8"
            className="symbol-frame-big"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Stylized 'J' */}
          <motion.path
            d="M21 11V21C21 23.5 19 25 16.5 25C14.5 25 13 23.8 13 22"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
          {/* Stylized 'F' */}
          <motion.path
            d="M14 12.5H23M14 17.5H20.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          />
          {/* Lotus Dot Accent */}
          <motion.circle
            cx="18"
            cy="8"
            r="2"
            fill="var(--champagne-gold)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.85, type: 'spring', stiffness: 450 }}
          />
        </svg>
      </div>

      {/* Big Brand Text Block */}
      <div className="hero-big-text-group">
        <motion.h2
          className="hero-big-title"
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.24em' }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          JIONA
        </motion.h2>
        <motion.span
          className="hero-big-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          FASHION · MODERN DAILYWEAR
        </motion.span>
      </div>

      {/* Pill Badge Tag */}
      <motion.div
        className="hero-big-tag-pill"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
      >
        <span className="pill-gold-dot" />
        <span>New Season SS 2026</span>
      </motion.div>
    </motion.div>
  );
}
