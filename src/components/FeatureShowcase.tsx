import React, { useRef, useEffect } from 'react';
import { ArrowRight, Database, Shield, Zap } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
import { toast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Contact email configuration - corrected
const CONTACT_EMAIL = 'troy.latter@4pm.net.au';

const FeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPercentage = Math.max(0, Math.min(1, 
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));
      
      imageRef.current.style.transform = `scale(${0.9 + scrollPercentage * 0.1}) 
                                          translateY(${scrollPercentage * -30}px)`;
      imageRef.current.style.opacity = `${0.7 + scrollPercentage * 0.3}`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to features page instead of showing toast
  const handleLearnMore = () => {
    navigate('/features');
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Advanced Technology
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              AI-Powered Protection You Can Trust
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Our platform uses advanced AI algorithms to scan the web and detect unauthorized 
              use of your AI-generated content, providing real-time alerts and automated 
              protection measures.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Deep Web Scanning</h3>
                  <p className="text-muted-foreground">
                    Our AI crawlers constantly scan the web to find instances of your AI content.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
                  <p className="text-muted-foreground">
                    Immutable records of your AI asset ownership on secure blockchain.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Automated Action</h3>
                  <p className="text-muted-foreground">
                    Instant takedown notices and legal actions when infringement is detected.
                  </p>
                </div>
              </div>
            </div>
            
            <AnimatedButton onClick={handleLearnMore} className="group">
              <span>Learn how it works</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </AnimatedButton>
          </div>
          
          {/* Image/Dashboard Mock */}
          <div ref={imageRef} className="w-full lg:w-1/2 animate-fade-up transition-all duration-700" style={{ animationDelay: '200ms' }}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
              {/* Dashboard mockup - visualized as a colored rectangle for now */}
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
                      <Shield className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">AI Protection Dashboard</h3>
                    <p className="text-sm text-muted-foreground">(Visualization placeholder)</p>
                  </div>
                </div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-20" 
                    style={{
                      backgroundImage: "url(/src/assets/patterns/grid.svg)",
                      backgroundSize: "40px 40px"
                    }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
