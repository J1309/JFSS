'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collections } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const collectionImages = [
  '/images/hero-casual.png',
  '/images/mens-collection.png',
  '/images/womens-collection.png',
  '/images/festive-collection.png',
];

export default function CollectionsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.collection-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section paisley-bg" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="text-overline">Casual Wardrobe</span>
          <h2>Explore Daily Collections</h2>
          <p>From office hours to weekend coffee runs — effortless South Asian dailywear</p>
        </div>

        <div className="collections-grid">
          {collections.map((col, i) => (
            <Link
              key={col.id}
              href={`/shop?category=${col.id}`}
              className="collection-card"
            >
              <div
                className="collection-card-bg"
                style={{
                  backgroundImage: `url(${collectionImages[i]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="collection-card-overlay" />
              <div className="collection-card-content">
                <span className="text-overline">{col.subtitle}</span>
                <h3>{col.title}</h3>
                <p>{col.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
