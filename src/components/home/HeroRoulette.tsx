'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { getFeaturedProducts, discountPercent } from '@/data/products';
import { getProductImage } from '@/data/images';

/**
 * Hero carousel — one product card at a time, sliding sideways (translateX
 * track) with a 5s auto-advance. Pauses on hover; prev/next + dots for manual
 * control. Auto-advance and the slide transition are disabled under
 * prefers-reduced-motion.
 */
export default function HeroRoulette() {
  const featured = getFeaturedProducts();
  const total = featured.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Auto-advance every 5s (paused on hover / under reduced motion)
  useEffect(() => {
    if (paused || reduce.current) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const active = featured[index];
  const auraColor = active.colors[0]?.hex || '#9B0000';

  return (
    <div
      className="jf-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="jf-carousel-aura"
        style={{ background: `radial-gradient(circle, ${auraColor}44 0%, transparent 70%)` }}
      />

      <div className="jf-carousel-viewport">
        <div className="jf-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {featured.map((product) => {
            const disc = discountPercent(product);
            return (
              <div className="jf-cc-slide" key={product.id} aria-hidden={product.id !== active.id}>
                <Link href={`/product/${product.id}`} className="jf-cc-media" aria-label={product.name}>
                  <img src={getProductImage(product.id)} alt={product.name} />
                </Link>
                <div className="jf-cc-shade" />

                <div className="jf-cc-badges">
                  {product.new ? (
                    <span className="jf-rcard-badge jf-badge-new">New</span>
                  ) : product.bestSeller ? (
                    <span className="jf-rcard-badge jf-badge-best">★ Bestseller</span>
                  ) : null}
                  {disc > 0 && <span className="jf-rcard-badge jf-badge-sale">−{disc}%</span>}
                </div>

                <div className="jf-cc-content">
                  <span className="jf-cc-cat">
                    {product.subcategory} · {product.fabric}
                  </span>
                  <h3 className="jf-cc-name">{product.name}</h3>
                  <div className="jf-cc-pricerow">
                    <span className="jf-cc-now">${product.price}</span>
                    {product.originalPrice && <span className="jf-cc-was">${product.originalPrice}</span>}
                  </div>
                  <Link href={`/product/${product.id}`} className="jf-cc-view">
                    View product
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="jf-carousel-nav">
        <button className="jf-cn-btn" onClick={prev} aria-label="Previous product">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="jf-cn-dots">
          {featured.map((p, i) => (
            <button
              key={p.id}
              className={`jf-cn-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to product ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <div className="jf-cn-count">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </div>

        <button className="jf-cn-btn" onClick={next} aria-label="Next product">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
