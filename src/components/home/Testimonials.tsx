'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={sectionRef}>
      <div className="container container-narrow">
        <div className="section-header testimonials-header">
          <span className="text-overline">Testimonials</span>
          <h2>What Our Clients Say</h2>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="testimonial-card glass-card"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-quote">&ldquo;</div>
              <div className="testimonial-stars">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="testimonial-text">{testimonials[active].text}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{testimonials[active].name}</span>
                <span className="testimonial-location">
                  {testimonials[active].location} · Purchased: {testimonials[active].product}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: 'var(--space-xl)',
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View testimonial ${i + 1}`}
                style={{
                  width: i === active ? '32px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: i === active ? 'var(--soft-gold)' : 'var(--mist)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
