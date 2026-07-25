'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import HeroSection from '@/components/home/HeroSection';
import CraftMarquee from '@/components/home/CraftMarquee';
import CollectionsGrid from '@/components/home/CollectionsGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';

export default function Home() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <HeroSection />
        <CraftMarquee />
        <CollectionsGrid />
        <FeaturedProducts />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
