
import React from 'react';
import GlassCard from './ui/GlassCard';
import { Shield, Globe, Lock, DollarSign, FileCheck, Bell } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "AI Brand & Likeness Protection",
      description: "Detect where your AI-generated likeness or work is being used. Automated copyright claims & takedown notices to protect your digital identity.",
      features: [
        "Automated web scanning",
        "Early detection alerts",
        "DMCA takedown automation",
        "Continuous monitoring"
      ]
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "AI Licensing & Monetization Hub",
      description: "Sell & license your AI-generated assets including images, voice, and video content with flexible licensing options.",
      features: [
        "Custom licensing terms",
        "Secure payment processing",
        "Usage analytics",
        "Revenue tracking"
      ]
    },
    {
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      title: "AI Content Authentication",
      description: "Blockchain-based AI signature to prove authenticity and establish ownership of your AI-generated content.",
      features: [
        "Tamper-proof certificates",
        "Blockchain verification",
        "Digital watermarking",
        "Authenticity tracking"
      ]
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Comprehensive AI Protection Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our suite of services helps businesses protect, monetize, and authenticate 
            their AI-generated assets across the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard 
              key={index}
              className="p-8 animate-fade-up"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mr-3 mt-1 text-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-20 text-center animate-fade-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Technology Built for the AI Economy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transition-all hover:bg-white/10">
              <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-medium mb-2">AI-Driven Web Scanner</h4>
              <p className="text-sm text-muted-foreground">Detects unauthorized use of AI-generated content across the web.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transition-all hover:bg-white/10">
              <Lock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-medium mb-2">AI Legal Assistant</h4>
              <p className="text-sm text-muted-foreground">Auto-generates DMCA takedown notices and legal documentation.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transition-all hover:bg-white/10">
              <Bell className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-medium mb-2">API Integrations</h4>
              <p className="text-sm text-muted-foreground">Plug into blockchain & identity tracking tools for comprehensive protection.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
