import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartFreeTrial = () => {
    navigate('/free-trial');
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="h-px w-8 bg-foreground"></div>
            <span className="text-sm uppercase tracking-wider">AI Protection Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 leading-[1.1]">
            Your AI,<br />
            Your Business,<br />
            Your Rules
          </h1>
          
          <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            The first AI brand protection service that helps businesses own, license, and secure their AI-generated content and likenesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button 
              onClick={handleStartFreeTrial}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium border border-border hover:bg-secondary transition-colors"
            >
              Schedule Demo
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border">
            <div>
              <div className="text-3xl font-semibold mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Protection</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Detection Rate</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-2">$2M+</div>
              <div className="text-sm text-muted-foreground">Protected Value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
