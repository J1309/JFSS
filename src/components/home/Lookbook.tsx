'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lookbook } from '@/data/lookbook';

gsap.registerPlugin(ScrollTrigger);

/**
 * The real photography, shown as a plain image grid. No names, prices or
 * badges yet — product data gets attached to these shots later.
 */
export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.jf-look-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="jf-look" ref={sectionRef}>
      <div className="container">
        <div className="jf-head">
          <span className="jf-eyebrow">The Lookbook</span>
          <h2 className="jf-h2">
            This season, <span className="accent">on the rail</span>
          </h2>
        </div>

        <div className="jf-look-grid">
          {lookbook.map((shot) => (
            <figure className="jf-look-card" key={shot.id}>
              <img src={shot.src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
