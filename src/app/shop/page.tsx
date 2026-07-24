'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { products, Product } from '@/data/products';
import { getProductImage } from '@/data/images';
import { useStore } from '@/store/store';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { value: 'all', label: 'All' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
];

const types = [
  { value: 'all', label: 'All Types' },
  { value: 'ready-to-wear', label: 'Ready-to-Wear' },
  { value: 'semi-stitched', label: 'Semi-Stitched' },
];

function ShopProductCard({ product, index }: { product: Product; index: number }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const [activeColor, setActiveColor] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.colors[activeColor], product.sizes[0]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="product-card" style={{ flex: 'none', width: '100%' }}>
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
            {product.originalPrice && (
              <span className="product-card-badge badge-sale" style={{ top: product.new ? '48px' : undefined }}>
                Sale
              </span>
            )}
            {product.bestSeller && !product.new && (
              <span className="product-card-badge badge-bestseller">Bestseller</span>
            )}

            <div className="product-card-quick-add">
              <motion.button
                className={`btn ${addedToCart ? 'btn-gold' : 'btn-primary'} btn-sm`}
                style={{ width: '100%' }}
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
              >
                {addedToCart ? '✓ Added!' : 'Add to Bag'}
              </motion.button>
            </div>
          </div>
        </Link>

        <button
          className={`product-card-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>

        <div className="product-card-info">
          <p className="product-card-category">{product.subcategory} · {product.type}</p>
          <h3 className="product-card-name">{product.name}</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--charcoal-muted)', marginBottom: 'var(--space-sm)' }}>
            {product.shortDescription}
          </p>
          <div className="product-card-price">
            <span className="current">${product.price}</span>
            {product.originalPrice && <span className="original">${product.originalPrice}</span>}
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
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.shop-header h1', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.shop-header p', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (activeType !== 'all') {
      filtered = filtered.filter((p) => p.type === activeType);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [activeCategory, activeType, sortBy]);

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <div className="shop-header paisley-bg" ref={headerRef}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="text-overline" style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
              Casual & Dailywear Catalog
            </span>
            <h1>Shop JionaFashion</h1>
            <p style={{ color: 'var(--charcoal-muted)', maxWidth: '500px', margin: '0 auto' }}>
              Explore breathable cotton kurtis, short linen kurtas, casual palazzo sets, and comfortable dailywear.
            </p>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
              <div style={{ width: '1px', background: 'var(--border-color-strong)', margin: '0 var(--space-sm)' }} />
              {types.map((type) => (
                <button
                  key={type.value}
                  className={`filter-btn ${activeType === type.value ? 'active' : ''}`}
                  onClick={() => setActiveType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--charcoal-muted)' }}>
                {filteredProducts.length} pieces
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  border: '1.5px solid var(--border-color-strong)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  background: 'transparent',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div className="shop-grid" layout>
            <AnimatePresence>
              {filteredProducts.map((product, i) => (
                <ShopProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)', color: 'var(--charcoal-muted)' }}>
              <p style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>
                No pieces found matching your filters
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveCategory('all');
                  setActiveType('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
