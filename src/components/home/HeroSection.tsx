'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroLoopingLogo from './HeroLoopingLogo';
import HeroRoulette from './HeroRoulette';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-looping-logo', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      })
        .from(
          '.hero-title-line',
          {
            y: 70,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          '-=0.4'
        )
        .from(
          '.hero-subtitle',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          '.hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          '.hero-stats-row',
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          '-=0.3'
        )
        .from(
          '.hero-right-roulette',
          {
            opacity: 0,
            x: 50,
            duration: 1,
          },
          '-=0.8'
        )
        .from(
          '.hero-scroll-indicator',
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero gradient-hero grain-veil-overlay jaali-overlay" ref={heroRef}>
      {/* Editorial Backdrop Watermark */}
      <div className="hero-watermark" aria-hidden="true">
        JIONA
      </div>

      <div className="hero-container">
        {/* Left Side: Editorial Content */}
        <div className="hero-left">
          <HeroLoopingLogo />

          <h1 className="hero-title">
            <span className="hero-title-line">Effortless Style,</span>
            <span className="hero-title-line">
              Everyday <em>Comfort</em>
            </span>
          </h1>

          <p className="hero-subtitle">
            Breathable organic cotton kurtis, breezy short kurtas & relaxed lounge sets.
            South Asian comfort reimagined for your daily wardrobe.
          </p>

          <div className="hero-cta">
            <a href="/shop" className="btn btn-primary btn-lg">
              Shop Dailywear
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/shop?category=women" className="btn btn-secondary btn-lg">
              Women
            </a>
            <a href="/shop?category=men" className="btn btn-secondary btn-lg">
              Men
            </a>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <strong>100%</strong>
              <span>Organic Cotton</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <strong>Breezy</strong>
              <span>All-Day Fit</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <strong>Easy</strong>
              <span>Machine Washable</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Roulette */}
        <div className="hero-right-roulette">
          <HeroRoulette />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll Collection</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
