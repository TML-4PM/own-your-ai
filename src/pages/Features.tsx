
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { Check } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      title: "AI-Powered Content Scanning",
      description: "Our advanced algorithms continuously scan the web to detect unauthorized use of your AI-generated content.",
      items: [
        "Real-time monitoring across websites and platforms",
        "Deep learning detection of similar content variants",
        "Automated reports and notifications",
        "Historical tracking and pattern analysis"
      ]
    },
    {
      title: "Blockchain Verification",
      description: "Establish immutable proof of ownership with our blockchain verification system.",
      items: [
        "Tamper-proof timestamp certification",
        "Verifiable ownership records",
        "Integration with major blockchain networks",
        "Public and private verification options"
      ]
    },
    {
      title: "Automated Takedown Process",
      description: "Streamline the removal of unauthorized content with our automated takedown system.",
      items: [
        "One-click DMCA notice generation",
        "Direct platform integration for faster removal",
        "Legal document templates and assistance",
        "Case tracking and resolution monitoring"
      ]
    },
    {
      title: "Licensing Management",
      description: "Create, track, and monetize licenses for your AI-generated content.",
      items: [
        "Customizable license terms and conditions",
        "Secure payment processing",
        "Usage analytics and reporting",
        "Automatic renewal management"
      ]
    }
  ];

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {featuresList.map((feature, index) => (
              <div key={index} className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex">
                      <Check className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
