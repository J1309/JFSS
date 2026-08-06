'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { lookbook } from '@/data/lookbook';

/**
 * Hero carousel — real product photography, one shot at a time, sliding
 * sideways (translateX track) with a 5s auto-advance. Pauses on hover;
 * prev/next + counter for manual control. Auto-advance and the slide
 * transition are disabled under prefers-reduced-motion.
 *
 * Deliberately image-only: no name, price or badge until real product data
 * is attached to these photographs.
 */
export default function HeroRoulette() {
  const shots = lookbook;
  const total = shots.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Auto-advance every 5s (paused on hover / under reduced motion)
  useEffect(() => {
    if (paused || reduce.current) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="jf-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="jf-carousel-aura" />

      <div className="jf-carousel-viewport">
        <div className="jf-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {shots.map((shot, i) => (
            <div className="jf-cc-slide" key={shot.id} aria-hidden={i !== index}>
              <img
                src={shot.src}
                alt=""
                className="jf-cc-photo"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="jf-carousel-nav">
        <button className="jf-cn-btn" onClick={prev} aria-label="Previous photo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="jf-cn-progress" aria-hidden="true">
          <span style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        <div className="jf-cn-count">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </div>

        <button className="jf-cn-btn" onClick={next} aria-label="Next photo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
