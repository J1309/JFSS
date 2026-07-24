'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import { getProductImage } from '@/data/images';

export default function HeroRoulette() {
  const featured = getFeaturedProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalItems = featured.length;

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Auto-rotate every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, 3800);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  const currentProduct = featured[activeIndex];

  // Horizontal slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? -10 : 10,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  const progressPercent = ((activeIndex + 1) / totalItems) * 100;

  return (
    <div
      className="roulette-box"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Color Aura behind the active product card */}
      <div
        className="roulette-aura"
        style={{
          background: `radial-gradient(circle, ${currentProduct.colors[0]?.hex || '#E8A838'}30 0%, transparent 70%)`,
        }}
      />

      {/* Main Product Card Track */}
      <div className="roulette-viewport" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProduct.id}
            className="roulette-card-premium"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Product Image Container */}
            <div className="card-image-box">
              <img
                src={getProductImage(currentProduct.id)}
                alt={currentProduct.name}
              />
              <div className="card-image-gradient" />

              {/* Badges */}
              <div className="card-badge-group">
                {currentProduct.new && (
                  <span className="badge-pill badge-new">New Arrival</span>
                )}
                {currentProduct.bestSeller && (
                  <span className="badge-pill badge-best">★ Bestseller</span>
                )}
              </div>

              {/* Overlay Content */}
              <div className="card-image-content">
                <span className="card-tag">
                  {currentProduct.subcategory} · {currentProduct.fabric}
                </span>
                <h3 className="card-title">{currentProduct.name}</h3>
                <div className="card-price-row">
                  <span className="card-price">${currentProduct.price}</span>
                  {currentProduct.originalPrice && (
                    <span className="card-price-original">${currentProduct.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Details & CTA */}
            <div className="card-footer-box">
              <div className="card-colors-list">
                {currentProduct.colors.map((color) => (
                  <span
                    key={color.name}
                    className="color-dot"
                    style={{ background: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>

              <Link href={`/product/${currentProduct.id}`} className="btn-roulette-cta">
                <span>View Product</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls Bar */}
      <div className="roulette-nav-bar">
        <button className="nav-btn nav-btn-prev" onClick={goToPrev} aria-label="Previous product">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Progress Dots */}
        <div className="nav-dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              aria-label={`View product ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress Line */}
        <div className="nav-progress">
          <motion.div
            className="nav-progress-fill"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>

        {/* Item Counter */}
        <div className="nav-counter">
          <span className="count-active">0{activeIndex + 1}</span>
          <span className="count-slash">/</span>
          <span className="count-total">0{totalItems}</span>
        </div>

        <button className="nav-btn nav-btn-next" onClick={goToNext} aria-label="Next product">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
