
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeatureShowcase from '@/components/FeatureShowcase';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { ArrowUp } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Apply smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up on unmount
    return () => {
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <FeatureShowcase />
        <Testimonials />
        <Pricing />
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg z-50 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default Index;
