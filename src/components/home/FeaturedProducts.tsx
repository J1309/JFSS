'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFeaturedProducts, Product } from '@/data/products';
import { getProductImage } from '@/data/images';
import { useStore } from '@/store/store';

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const [activeColor, setActiveColor] = useState(0);
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="product-card-image">
          <div
            className="product-card-image-inner"
            style={{
              background: `linear-gradient(135deg, ${product.colors[activeColor].hex}22, ${product.colors[activeColor].hex}55)`,
            }}
          >
            <img src={getProductImage(product.id)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {product.new && <span className="product-card-badge badge-new">New</span>}
          {product.originalPrice && <span className="product-card-badge badge-sale" style={{ top: product.new ? '48px' : undefined }}>Sale</span>}
          {product.bestSeller && !product.new && <span className="product-card-badge badge-bestseller">Bestseller</span>}

          <div className="product-card-quick-add">
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Quick View
            </button>
          </div>
        </div>
      </Link>

      <button
        className={`product-card-wishlist ${wishlisted ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      <div className="product-card-info">
        <p className="product-card-category">{product.subcategory}</p>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-price">
          <span className="current">${product.price}</span>
          {product.originalPrice && (
            <span className="original">${product.originalPrice}</span>
          )}
        </div>
        <div className="product-card-colors">
          {product.colors.map((color, i) => (
            <motion.div
              key={color.name}
              className={`color-dot ${i === activeColor ? 'active' : ''}`}
              style={{ background: color.hex }}
              onClick={() => setActiveColor(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.featured-header', {
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
    <section className="section" ref={sectionRef} style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="section-header featured-header">
          <span className="text-overline">Everyday Staples</span>
          <h2>Featured Dailywear</h2>
          <p>Handpicked comfortable cottons and breezy linens for everyday style</p>
        </div>

        <div className="featured-scroll">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
          <Link href="/shop" className="btn btn-secondary">
            View All Pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
