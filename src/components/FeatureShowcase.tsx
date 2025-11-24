import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureShowcase: React.FC = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/get-started');
  };

  return (
    <section className="py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-foreground"></div>
              <span className="text-sm uppercase tracking-wider">Technology</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Advanced protection you can trust
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Our platform uses cutting-edge AI algorithms to scan the web and detect unauthorized 
              use of your AI-generated content, providing real-time alerts and automated 
              protection measures.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border">
                  <span className="text-sm font-medium">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Deep Web Scanning</h3>
                  <p className="text-muted-foreground">
                    Our AI crawlers constantly scan the web to find instances of your AI content.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border">
                  <span className="text-sm font-medium">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
                  <p className="text-muted-foreground">
                    Immutable records of your AI asset ownership on secure blockchain.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border">
                  <span className="text-sm font-medium">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Automated Action</h3>
                  <p className="text-muted-foreground">
                    Instant takedown notices and legal actions when infringement is detected.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleLearnMore}
              className="group inline-flex items-center text-base font-medium hover:translate-x-2 transition-transform"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-secondary border border-border"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-foreground"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
