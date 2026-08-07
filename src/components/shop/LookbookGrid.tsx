'use client';

import { useState, useEffect, useCallback } from 'react';
import { lookbook } from '@/data/lookbook';

/**
 * The real photography as its own shop section. Cards are image-only —
 * no name or price until real product data is attached — and open a
 * lightbox popup when clicked.
 */
export default function LookbookGrid() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % lookbook.length)),
    []
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + lookbook.length) % lookbook.length)),
    []
  );

  // Keyboard: Esc closes, arrows step through. Body scroll locks while open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <section className="jf-look jf-look-shop">
      <div className="container">
        <div className="jf-head">
          <span className="jf-eyebrow">New In</span>
          <h2 className="jf-h2">
            This season, <span className="accent">on the rail</span>
          </h2>
        </div>

        <div className="jf-look-grid">
          {lookbook.map((shot, i) => (
            <button
              type="button"
              className="jf-look-card"
              key={shot.id}
              onClick={() => setOpen(i)}
              aria-label={`View photo ${i + 1} of ${lookbook.length} larger`}
            >
              <img src={shot.src} alt="" loading="lazy" />
              <span className="jf-look-zoom" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="jf-lightbox" onClick={close} role="dialog" aria-modal="true" aria-label="Product photo">
          <button className="jf-lb-close" onClick={close} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            className="jf-lb-nav jf-lb-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <figure className="jf-lb-stage" onClick={(e) => e.stopPropagation()}>
            <img src={lookbook[open].src} alt="" />
            <figcaption className="jf-lb-count">
              {String(open + 1).padStart(2, '0')} / {String(lookbook.length).padStart(2, '0')}
            </figcaption>
          </figure>

          <button
            className="jf-lb-nav jf-lb-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
