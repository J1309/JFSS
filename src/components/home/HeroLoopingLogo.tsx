'use client';

import { motion } from 'framer-motion';

/**
 * Hero logo showpiece — the peacock J+A monogram inks itself in (same
 * diagonal reveal motif as the site Preloader), then the JESSAURA wordmark
 * settles beneath it. Loader → hero brand continuity.
 */
export default function HeroLoopingLogo() {
  return (
    <div className="jf-logo-stage">
      <motion.div
        className="jf-logo-mark"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: 3, scale: 1.05 }}
      >
        <img
          src="/images/JA logo.png"
          alt=""
          className="jf-logo-peacock"
        />
      </motion.div>

      <motion.div
        className="jf-logo-wordmark"
        initial={{ opacity: 0, y: 12, letterSpacing: '0.32em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.16em' }}
        transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        JESS<span className="accent">AURA</span>
      </motion.div>
    </div>
  );
}
