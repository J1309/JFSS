'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import HeroLoopingLogo from './HeroLoopingLogo';
import HeroRoulette from './HeroRoulette';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.jf-logo-stage', { y: 16, opacity: 0, duration: 0.7, delay: 0.3 })
        .from('.jf-hero-title', { y: 30, opacity: 0, duration: 0.9 }, '-=0.2')
        .from('.jf-hero-sub', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.jf-hero-cta', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.jf-hero-stage', { x: 44, opacity: 0, duration: 1 }, '-=0.7');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="jf-hero" ref={heroRef}>
      <div className="jf-hero-split">
        {/* Left: animated logo + the sentence content */}
        <div className="jf-hero-copy">
          <HeroLoopingLogo />

          <h1 className="jf-hero-title">
            Comfort, <span className="accent">worn every day.</span>
          </h1>

          <p className="jf-hero-sub">
            Breathable organic cottons, breezy short kurtas and relaxed co-ords —
            South Asian dailywear, reimagined for how you actually live.
          </p>

          <div className="jf-hero-cta">
            <Link href="/shop" className="jf-btn jf-btn-primary">
              Shop the edit
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/shop?category=women" className="jf-btn jf-btn-ghost">
              New in
            </Link>
          </div>
        </div>

        {/* Right: auto-rotating product carousel with horizontal slide */}
        <div className="jf-hero-stage">
          <HeroRoulette />
        </div>
      </div>

      <div className="jf-hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
