
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { Check, Shield, DollarSign, FileCheck } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link, useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  
  const featuresList = [
    {
      id: "brand-protection",
      title: "AI-Powered Content Scanning",
      description: "Our advanced algorithms continuously scan the web to detect unauthorized use of your AI-generated content.",
      icon: <Shield className="h-12 w-12 text-indigo-500" />,
      items: [
        "Real-time monitoring across websites and platforms",
        "Deep learning detection of similar content variants",
        "Automated reports and notifications",
        "Historical tracking and pattern analysis"
      ]
    },
    {
      id: "monetization",
      title: "AI Monetization Hub",
      description: "Create, track, and monetize licenses for your AI-generated content with our comprehensive solution.",
      icon: <DollarSign className="h-12 w-12 text-purple-500" />,
      items: [
        "Customizable license terms and conditions",
        "Secure payment processing",
        "Usage analytics and reporting",
        "Automatic renewal management"
      ]
    },
    {
      id: "authentication",
      title: "Blockchain Verification",
      description: "Establish immutable proof of ownership with our blockchain verification system.",
      icon: <FileCheck className="h-12 w-12 text-pink-500" />,
      items: [
        "Tamper-proof timestamp certification",
        "Verifiable ownership records",
        "Integration with major blockchain networks",
        "Public and private verification options"
      ]
    },
    {
      id: "takedown",
      title: "Automated Takedown Process",
      description: "Streamline the removal of unauthorized content with our automated takedown system.",
      icon: <Check className="h-12 w-12 text-emerald-500" />,
      items: [
        "One-click DMCA notice generation",
        "Direct platform integration for faster removal",
        "Legal document templates and assistance",
        "Case tracking and resolution monitoring"
      ]
    }
  ];

  const handleStartFeature = () => {
    navigate('/get-started');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Protection Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools to safeguard your AI-generated content and intellectual property
            </p>
          </div>
          
          <div className="space-y-32">
            {featuresList.map((feature, index) => (
              <div 
                key={index} 
                id={feature.id}
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={`order-2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 rounded-2xl p-8 flex items-center justify-center">
                    <div className="bg-background/70 backdrop-blur-sm border border-border rounded-xl p-8 w-full aspect-square flex items-center justify-center">
                      <div className="text-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h2 className="text-3xl font-bold mb-6">{feature.title}</h2>
                  <p className="text-xl text-muted-foreground mb-8">{feature.description}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex">
                        <Check className="h-6 w-6 text-primary mr-3 shrink-0 mt-0.5" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <AnimatedButton onClick={handleStartFeature}>
                    Start Using This Feature
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
