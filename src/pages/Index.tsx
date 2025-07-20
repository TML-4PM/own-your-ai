
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeatureShowcase from '@/components/FeatureShowcase';
import CustomerTestimonials from '@/components/CustomerTestimonials';
import CustomerLogos from '@/components/CustomerLogos';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <CustomerLogos />
        <Services />
        <FeatureShowcase />
        <CustomerTestimonials limit={3} />
        <div className="text-center my-12">
          <Link to="/resources" className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
            Explore our resources →
          </Link>
        </div>
        <Pricing />
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg z-50 transition-all duration-300 ${
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
