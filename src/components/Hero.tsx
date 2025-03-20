
import React, { useEffect, useRef } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import { ArrowRight, Shield, DollarSign, FileCheck } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    // Text animation
    if (headingRef.current) {
      const text = headingRef.current.innerText;
      headingRef.current.innerHTML = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        span.style.transitionDelay = `${i * 20}ms`;
        
        // Add spaces back
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        }
        
        headingRef.current?.appendChild(span);
        
        // Trigger animation after a small delay
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 100);
      });
    }

    // Feature cards animation
    const startFeatureAnimations = () => {
      featureRefs.current.forEach((card, index) => {
        if (!card) return;
        
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Trigger animation with staggered delay
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, background-color 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 1000 + (index * 200)); // Start after heading animation + stagger
      });
    };

    startFeatureAnimations();

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen pt-24 overflow-hidden flex flex-col justify-center"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <span className="mr-2 bg-primary text-white px-2 py-0.5 rounded-full text-xs">New</span>
            Introducing AI Brand Protection
          </div>
          
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Your AI, Your Business, Your Rules.
          </h1>
          
          <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-up" style={{ animationDelay: '800ms' }}>
            The first AI Brand Protection Service that helps businesses own, license, and secure their AI-generated content and likenesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: '1000ms' }}>
            <AnimatedButton size="lg" className="group">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </AnimatedButton>
            <AnimatedButton variant="secondary" size="lg">
              Schedule a Demo
            </AnimatedButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <div 
              ref={el => featureRefs.current[0] = el} 
              className="flex flex-col items-center p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg mb-2">AI Brand Protection</h3>
              <p className="text-sm text-muted-foreground text-center">Detect where your AI-generated likeness is being used.</p>
            </div>
            
            <div 
              ref={el => featureRefs.current[1] = el}
              className="flex flex-col items-center p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg mb-2">AI Monetization Hub</h3>
              <p className="text-sm text-muted-foreground text-center">Sell & license your AI-generated assets easily.</p>
            </div>
            
            <div 
              ref={el => featureRefs.current[2] = el}
              className="flex flex-col items-center p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg mb-2">AI Authentication</h3>
              <p className="text-sm text-muted-foreground text-center">Blockchain-based AI signature to prove authenticity.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced mouse position gradient effect */}
      <div
        className="absolute inset-0 -z-10 opacity-30 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(59, 130, 246, 0.3), transparent 50%)`,
        }}
      ></div>
      
      {/* Additional subtle gradients */}
      <div className="absolute top-1/4 left-0 w-full h-40 -z-10 opacity-20 bg-gradient-to-r from-blue-400/30 via-transparent to-violet-400/30"></div>
      <div className="absolute bottom-1/4 right-0 w-full h-40 -z-10 opacity-20 bg-gradient-to-l from-blue-400/30 via-transparent to-violet-400/30"></div>
    </div>
  );
};

export default Hero;
