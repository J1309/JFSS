'use client';

import { motion } from 'framer-motion';

export default function HeroLoopingLogo() {
  return (
    <motion.div
      className="hero-looping-logo"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -2 }}
    >
      {/* Monogram Symbol with Loader Stroke Drawing (Plays Once) */}
      <div className="hero-logo-symbol-box">
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
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
            className="symbol-frame-loop"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Stylized 'J' */}
          <motion.path
            d="M21 11V21C21 23.5 19 25 16.5 25C14.5 25 13 23.8 13 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
          {/* Stylized 'F' */}
          <motion.path
            d="M14 12.5H23M14 17.5H20.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          />
          {/* Lotus Dot Accent Pop */}
          <motion.circle
            cx="18"
            cy="8"
            r="1.8"
            fill="var(--saffron)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 450 }}
          />
        </svg>
      </div>

      {/* Brand Text Block Reveal */}
      <motion.div
        className="hero-logo-text-box"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="hero-logo-title">JIONA</span>
        <span className="hero-logo-subtitle">FASHION</span>
      </motion.div>

      {/* Tag Divider */}
      <div className="hero-logo-divider" />

      {/* Season Tag Reveal */}
      <motion.div
        className="hero-logo-tag"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <span className="tag-dot" />
        <span>New Season SS 2026</span>
      </motion.div>
    </motion.div>
  );
}
