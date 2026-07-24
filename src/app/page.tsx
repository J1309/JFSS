'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import HeroSection from '@/components/home/HeroSection';
import CollectionsGrid from '@/components/home/CollectionsGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <HeroSection />
        <CollectionsGrid />
        <FeaturedProducts />
        <BrandStory />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
