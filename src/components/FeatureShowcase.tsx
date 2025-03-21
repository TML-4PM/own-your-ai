
import React, { useRef, useEffect } from 'react';
import { ArrowRight, Database, Shield, Zap } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
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
    navigate('/get-started');
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
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </AnimatedButton>
          </div>
          
          {/* Image/Dashboard Mock */}
          <div ref={imageRef} className="w-full lg:w-1/2 animate-fade-up transition-all duration-700" style={{ animationDelay: '200ms' }}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
              {/* Dashboard mockup - visualized with the AI Protection Dashboard */}
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-md rounded-xl shadow-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">AI Protection Dashboard</h3>
                      <div className="flex space-x-2">
                        <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                        <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                        <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="h-2 bg-primary/50 rounded-full w-3/4 mb-2"></div>
                      <div className="h-2 bg-primary/30 rounded-full w-1/2 mb-2"></div>
                      <div className="h-2 bg-primary/20 rounded-full w-2/3"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-background/60 p-2 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="text-xs font-medium">92%</span>
                        </div>
                        <div className="text-xs mt-1">Protected Assets</div>
                      </div>
                      <div className="bg-background/60 p-2 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          <span className="text-xs font-medium">3</span>
                        </div>
                        <div className="text-xs mt-1">Alerts Today</div>
                      </div>
                    </div>
                    
                    <div className="bg-background/60 p-2 rounded-lg mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Scan Progress</span>
                        <span className="text-xs font-medium">78%</span>
                      </div>
                      <div className="h-1.5 bg-background/80 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                        All systems operational
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10" 
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
