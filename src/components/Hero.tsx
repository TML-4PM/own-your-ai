import React, { useEffect, useRef } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import { ArrowRight, Shield, DollarSign, FileCheck } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

// Contact email configuration - corrected
const CONTACT_EMAIL = 'troy.latter@4pm.net.au';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

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

  // Navigate to Free Trial page instead of Get Started
  const handleStartFreeTrial = () => {
    navigate('/free-trial');
  };

  // Handle Schedule Demo button click
  const handleScheduleDemo = () => {
    console.log(`Demo request submitted to: ${CONTACT_EMAIL}`);
    toast({
      title: "Demo Scheduled",
      description: `Thank you for scheduling a demo. Our team at ${CONTACT_EMAIL} will contact you shortly with available times.`,
    });
  };

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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-6 animate-fade-in">
            <span className="mr-2 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs">Free Trial</span>
            14 Days of Complete AI Protection
          </div>
          
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Your AI, Your Business, Your Rules.
          </h1>
          
          <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-up" style={{ animationDelay: '800ms' }}>
            The first AI Brand Protection Service that helps businesses own, license, and secure their AI-generated content and likenesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: '1000ms' }}>
            <AnimatedButton 
              onClick={handleStartFreeTrial}
              size="lg" 
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </AnimatedButton>
            <AnimatedButton 
              onClick={handleScheduleDemo}
              variant="secondary" 
              size="lg" 
              className="hover:bg-white/20 backdrop-blur-sm"
            >
              Schedule a Demo
            </AnimatedButton>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '1200ms' }}>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
              <span>Full feature access</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Link 
              to="/features#brand-protection"
              className="block transition-transform hover:scale-105"
            >
              <div 
                ref={el => featureRefs.current[0] = el} 
                className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 backdrop-blur-sm border border-white/10 transition-all hover:from-indigo-500/30 hover:to-purple-500/20 h-full"
                style={{ opacity: 0, transform: 'translateY(30px)' }}
              >
                <div className="h-14 w-14 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="font-medium text-lg mb-2">AI Brand Protection</h3>
                <p className="text-sm text-muted-foreground text-center">Detect where your AI-generated likeness is being used.</p>
              </div>
            </Link>
            
            <Link 
              to="/features#monetization"
              className="block transition-transform hover:scale-105"
            >
              <div 
                ref={el => featureRefs.current[1] = el}
                className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm border border-white/10 transition-all hover:from-purple-500/30 hover:to-pink-500/20 h-full"
                style={{ opacity: 0, transform: 'translateY(30px)' }}
              >
                <div className="h-14 w-14 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
                  <DollarSign className="h-7 w-7" />
                </div>
                <h3 className="font-medium text-lg mb-2">AI Monetization Hub</h3>
                <p className="text-sm text-muted-foreground text-center">Sell & license your AI-generated assets easily.</p>
              </div>
            </Link>
            
            <Link 
              to="/features#authentication"
              className="block transition-transform hover:scale-105"
            >
              <div 
                ref={el => featureRefs.current[2] = el}
                className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 backdrop-blur-sm border border-white/10 transition-all hover:from-pink-500/30 hover:to-rose-500/20 h-full" 
                style={{ opacity: 0, transform: 'translateY(30px)' }}
              >
                <div className="h-14 w-14 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center mb-4">
                  <FileCheck className="h-7 w-7" />
                </div>
                <h3 className="font-medium text-lg mb-2">AI Authentication</h3>
                <p className="text-sm text-muted-foreground text-center">Blockchain-based AI signature to prove authenticity.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced mouse position gradient effect */}
      <div
        className="absolute inset-0 -z-10 opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(129, 90, 246, 0.4), transparent 50%)`,
        }}
      ></div>
      
      {/* Additional subtle gradients */}
      <div className="absolute top-1/4 left-0 w-full h-40 -z-10 opacity-30 bg-gradient-to-r from-indigo-500/30 via-transparent to-purple-500/30"></div>
      <div className="absolute bottom-1/4 right-0 w-full h-40 -z-10 opacity-30 bg-gradient-to-l from-purple-500/30 via-transparent to-pink-500/30"></div>
      
      {/* Hero background image */}
      <div className="absolute inset-0 -z-20 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
          alt="Technology background" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
