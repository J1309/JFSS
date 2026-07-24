'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="preloader-content">
            {/* Animated Diamond Logo Monogram */}
            <motion.div
              className="preloader-symbol"
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="64" height="64" viewBox="0 0 36 36" fill="none">
                {/* Diamond Outer Frame */}
                <motion.rect
                  x="18"
                  y="2"
                  width="22.6"
                  height="22.6"
                  rx="3"
                  transform="rotate(45 18 2)"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="symbol-frame"
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
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                {/* Stylized 'F' */}
                <motion.path
                  d="M14 12.5H23M14 17.5H20.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                />
                {/* Lotus Dot Accent */}
                <motion.circle
                  cx="18"
                  cy="8"
                  r="1.8"
                  fill="var(--terracotta)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 400 }}
                />
              </svg>
            </motion.div>

            {/* Brand Title Stagger */}
            <motion.div
              className="preloader-text-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="preloader-title">JIONA</h1>
              <span className="preloader-subtitle">FASHION</span>
            </motion.div>

            {/* Progress Line */}
            <div className="preloader-progress-track">
              <motion.div
                className="preloader-progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
