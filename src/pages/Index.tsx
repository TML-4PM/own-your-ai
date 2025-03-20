
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeatureShowcase from '@/components/FeatureShowcase';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';

const Index = () => {
  // Apply smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Clean up on unmount
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <FeatureShowcase />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
