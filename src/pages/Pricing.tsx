
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import PricingComponent from '@/components/Pricing';

const PricingPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Pricing Plans</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your AI protection needs
            </p>
          </div>
        </div>
        
        <PricingComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
