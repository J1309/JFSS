'use client';

import { motion } from 'framer-motion';

export default function HeroLoopingLogo() {
  return (
    <motion.div
      className="hero-looping-logo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      {/* Animated Looping Monogram Icon */}
      <div className="hero-logo-symbol-box">
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          animate={{ rotate: [0, 4, 0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Diamond Outer Frame with pulsating opacity */}
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
            animate={{ strokeOpacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Stylized 'J' */}
          <motion.path
            d="M21 11V21C21 23.5 19 25 16.5 25C14.5 25 13 23.8 13 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Stylized 'F' */}
          <motion.path
            d="M14 12.5H23M14 17.5H20.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Lotus Dot Pulse Accent */}
          <motion.circle
            cx="18"
            cy="8"
            r="1.8"
            fill="var(--terracotta)"
            animate={{ scale: [1, 1.45, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.svg>
      </div>

      {/* Looping Shimmer Brand Text */}
      <div className="hero-logo-text-box">
        <span className="hero-logo-title">JIONA</span>
        <span className="hero-logo-subtitle">FASHION</span>
      </div>

      {/* Badge Tag Divider */}
      <div className="hero-logo-divider" />

      <div className="hero-logo-tag">
        <motion.span
          className="tag-dot"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span>New Season SS 2026</span>
      </div>
    </motion.div>
  );
}
