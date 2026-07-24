'use client';

import { motion } from 'framer-motion';

export default function HeroLoopingLogo() {
  return (
    <motion.div
      className="hero-looping-logo hero-looping-logo-big"
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      {/* Animated Diamond Monogram Symbol Box */}
      <div className="hero-logo-symbol-box">
        <svg width="42" height="42" viewBox="0 0 36 36" fill="none">
          {/* Diamond Outer Frame */}
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
          {/* Stylized 'J' */}
          <motion.path
            d="M21 11V21C21 23.5 19 25 16.5 25C14.5 25 13 23.8 13 22"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.85, ease: 'easeOut' }}
          />
          {/* Stylized 'F' */}
          <motion.path
            d="M14 12.5H23M14 17.5H20.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: 'easeOut' }}
          />
          {/* Lotus Dot Accent */}
          <motion.circle
            cx="18"
            cy="8"
            r="2"
            fill="var(--crimson)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 450 }}
          />
        </svg>
      </div>

      {/* Brand Name Text Block */}
      <div className="hero-logo-text-box">
        <motion.span
          className="hero-logo-title"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, letterSpacing: '0.20em' }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          JIONAFASHION
        </motion.span>
        <motion.span
          className="hero-logo-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          EST. 2026
        </motion.span>
      </div>

      {/* Vertical Gold Divider */}
      <div className="hero-logo-divider" />

      {/* Badge Tag */}
      <div className="hero-logo-tag">
        <span className="tag-dot" />
        <span>SS 2026 COLLECTION</span>
      </div>
    </motion.div>
  );
}
