'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      tl.from('.jf-story-text > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      }).from('.jf-story-figure', { x: 48, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7');

      // Parallax: the image drifts within its frame as the section scrolls past.
      // scale 1.12 gives overflow room so the ±6% travel never reveals an edge.
      gsap.fromTo(
        '.jf-story-figure img',
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: '.jf-story-figure', scrub: true, start: 'top bottom', end: 'bottom top' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="jf-story" ref={sectionRef}>
      <div className="container">
        <div className="jf-story-grid">
          <div className="jf-story-text">
            <span className="jf-eyebrow">The JessAura Story</span>
            <h2>
              Everyday <span className="accent">comfort</span>, artisanal craft
            </h2>
            <p>
              We believe South Asian clothing should feel as good as it looks — every
              single day. So we trade heavy, restrictive garments for breathable organic
              cottons, slub linens and easy silhouettes that move with you.
            </p>
            <p>
              Each piece is made with block-printers and chikankari artisans across Jaipur
              and Lucknow — lightweight dailywear that carries a little heritage into your
              ordinary mornings.
            </p>
            <Link href="/shop" className="jf-btn jf-btn-primary" style={{ marginTop: 'var(--space-sm)' }}>
              Explore our fabrics
            </Link>
          </div>

          <figure className="jf-story-figure">
            <img src="/images/brand-story.png" alt="Artisan weaving organic cotton dailywear fabric on a handloom" />
            <figcaption>Handwoven in Jaipur</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
