
import React from 'react';
import GlassCard from './ui/GlassCard';
import { Shield, Globe, Lock, DollarSign, FileCheck, Bell, Bot, BrainCircuit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Shield className="h-10 w-10 text-indigo-500" />,
      title: "AI Brand & Likeness Protection",
      description: "Detect where your AI-generated likeness or work is being used. Automated copyright claims & takedown notices to protect your digital identity.",
      features: [
        "Automated web scanning",
        "Early detection alerts",
        "DMCA takedown automation",
        "Continuous monitoring"
      ],
      gradient: "bg-gradient-to-br from-indigo-500/30 to-indigo-700/20",
      iconBg: "bg-indigo-500/20",
      image: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=1469&auto=format&fit=crop"
    },
    {
      icon: <DollarSign className="h-10 w-10 text-purple-500" />,
      title: "AI Licensing & Monetization Hub",
      description: "Sell & license your AI-generated assets including images, voice, and video content with flexible licensing options.",
      features: [
        "Custom licensing terms",
        "Secure payment processing",
        "Usage analytics",
        "Revenue tracking"
      ],
      gradient: "bg-gradient-to-br from-purple-500/30 to-purple-700/20",
      iconBg: "bg-purple-500/20",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b2d52b?q=80&w=1470&auto=format&fit=crop"
    },
    {
      icon: <FileCheck className="h-10 w-10 text-pink-500" />,
      title: "AI Content Authentication",
      description: "Blockchain-based AI signature to prove authenticity and establish ownership of your AI-generated content.",
      features: [
        "Tamper-proof certificates",
        "Blockchain verification",
        "Digital watermarking",
        "Authenticity tracking"
      ],
      gradient: "bg-gradient-to-br from-pink-500/30 to-pink-700/20",
      iconBg: "bg-pink-500/20",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  const agentFeatures = [
    {
      icon: <Bot className="h-12 w-12 text-indigo-500" />,
      title: "AI Agents",
      description: "Autonomous AI agents that work 24/7 to protect your digital assets.",
      gradient: "from-indigo-600/20 to-indigo-700/10"
    },
    {
      icon: <BrainCircuit className="h-12 w-12 text-violet-500" />,
      title: "Agentic Networks",
      description: "Collaborative AI systems that coordinate protection across platforms.",
      gradient: "from-violet-600/20 to-violet-700/10"
    },
    {
      icon: <Sparkles className="h-12 w-12 text-fuchsia-500" />,
      title: "Adaptive Intelligence",
      description: "Self-improving systems that learn from patterns to enhance protection.",
      gradient: "from-fuchsia-600/20 to-fuchsia-700/10"
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Comprehensive Protection
          </div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Protection Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our suite of services helps businesses protect, monetize, and authenticate 
            their AI-generated assets across the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg animate-fade-up ${service.gradient} relative`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 z-20">
                  <div className={`p-3 rounded-full ${service.iconBg}`}>
                    {service.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-background/95 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
                            className={`fill-current ${index === 0 ? 'text-indigo-500' : index === 1 ? 'text-purple-500' : 'text-pink-500'}`}
                          />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/features" className={`inline-block px-4 py-2 rounded-md text-white ${
                  index === 0 ? 'bg-indigo-500 hover:bg-indigo-600' : 
                  index === 1 ? 'bg-purple-500 hover:bg-purple-600' : 
                  'bg-pink-500 hover:bg-pink-600'
                } transition-colors`}>
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-32 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-1">
          <div className="absolute inset-0 -z-10 opacity-30 rounded-3xl overflow-hidden">
            <img 
              src="public/lovable-uploads/cc3bcfa0-34f8-4104-9f15-99c131d65842.png" 
              alt="Technology background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="bg-background/60 backdrop-blur-lg rounded-3xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Technology Built for the AI Economy
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {agentFeatures.map((feature, idx) => (
                <div key={idx} 
                  className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-md border border-white/10 rounded-xl p-8 text-center transition-all hover:scale-105 duration-300`}
                >
                  <div className="mx-auto w-20 h-20 bg-background/20 backdrop-blur-lg rounded-full flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
