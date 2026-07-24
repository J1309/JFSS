'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.newsletter-content', {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="section newsletter paisley-bg" ref={sectionRef}>
      <div className="container container-narrow newsletter-content" style={{ position: 'relative', zIndex: 1 }}>
        <span className="text-overline" style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
          Stay Connected
        </span>
        <h2 className="font-display">Join the JFS Family</h2>
        <p>
          Be the first to discover new collections, exclusive offers, and stories from our artisan workshops.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button
            className="btn btn-primary"
            type="submit"
            style={{ borderRadius: 'var(--radius-full)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitted ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                ✓ Subscribed!
              </motion.span>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
