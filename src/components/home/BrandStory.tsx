'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.brand-story-text h2', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          '.brand-story-text p',
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.brand-story-text .btn',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          '.brand-story-image',
          {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section brand-story jaali-overlay" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="brand-story-grid">
          <div className="brand-story-text">
            <span className="text-overline" style={{ display: 'block', marginBottom: 'var(--space-lg)' }}>
              The Jiona Story
            </span>
            <h2>
              Everyday <em>Comfort</em>,<br />
              Artisanal <em>Craft</em>
            </h2>
            <p>
              At JionaFashion, we believe that South Asian clothing should feel as good as it looks — every single day. We replace heavy, restrictive garments with breathable organic cottons, slub linens, and easy-breezy silhouettes.
            </p>
            <p>
              We collaborate with traditional block-printers and chikankari artisans across Jaipur and Lucknow to bring you lightweight dailywear that moves effortlessly with your lifestyle.
            </p>
            <a href="/shop" className="btn btn-gold" style={{ marginTop: 'var(--space-md)' }}>
              Explore Dailywear Fabrics
            </a>
          </div>

          <div className="brand-story-image">
            <img
              src="/images/brand-story.png"
              alt="Artisan weaving organic cotton dailywear fabric"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
