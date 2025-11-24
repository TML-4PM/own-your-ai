
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Shield, DollarSign, FileCheck, BrainCircuit, Bot, Sparkles, Zap } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link, useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  
  const featuresList = [
    {
      id: "brand-protection",
      title: "AI-Powered Content Scanning",
      description: "Our advanced algorithms continuously scan the web to detect unauthorized use of your AI-generated content.",
      icon: <Shield className="h-16 w-16 text-indigo-500" />,
      image: "https://images.unsplash.com/photo-1633265486501-b4d5c24b8a9f?q=80&w=1470&auto=format&fit=crop",
      items: [
        "Real-time monitoring across websites and platforms",
        "Deep learning detection of similar content variants",
        "Automated reports and notifications",
        "Historical tracking and pattern analysis"
      ],
      gradient: "from-indigo-600/20 via-indigo-500/10 to-purple-500/5"
    },
    {
      id: "monetization",
      title: "AI Monetization Hub",
      description: "Create, track, and monetize licenses for your AI-generated content with our comprehensive solution.",
      icon: <DollarSign className="h-16 w-16 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1616077168087-481383766be1?q=80&w=1470&auto=format&fit=crop",
      items: [
        "Customizable license terms and conditions",
        "Secure payment processing",
        "Usage analytics and reporting",
        "Automatic renewal management"
      ],
      gradient: "from-purple-600/20 via-purple-500/10 to-pink-500/5"
    },
    {
      id: "authentication",
      title: "Blockchain Verification",
      description: "Establish immutable proof of ownership with our blockchain verification system.",
      icon: <FileCheck className="h-16 w-16 text-pink-500" />,
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop",
      items: [
        "Tamper-proof timestamp certification",
        "Verifiable ownership records",
        "Integration with major blockchain networks",
        "Public and private verification options"
      ],
      gradient: "from-pink-600/20 via-pink-500/10 to-rose-500/5"
    },
    {
      id: "takedown",
      title: "Automated Takedown Process",
      description: "Streamline the removal of unauthorized content with our automated takedown system.",
      icon: <Zap className="h-16 w-16 text-emerald-500" />,
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1470&auto=format&fit=crop",
      items: [
        "One-click DMCA notice generation",
        "Direct platform integration for faster removal",
        "Legal document templates and assistance",
        "Case tracking and resolution monitoring"
      ],
      gradient: "from-emerald-600/20 via-emerald-500/10 to-teal-500/5"
    }
  ];

  const agentFeatures = [
    {
      icon: <Bot className="h-14 w-14 text-indigo-500" />,
      title: "AI Agents",
      description: "Autonomous AI agents that work 24/7 to protect your digital assets and monitor for potential infringements.",
      gradient: "from-indigo-600/20 via-indigo-500/10 to-violet-600/5"
    },
    {
      icon: <BrainCircuit className="h-14 w-14 text-violet-500" />,
      title: "Agentic Networks",
      description: "Collaborative AI systems that coordinate across platforms to provide comprehensive protection.",
      gradient: "from-violet-600/20 via-violet-500/10 to-purple-600/5"
    },
    {
      icon: <Sparkles className="h-14 w-14 text-purple-500" />,
      title: "Adaptive Intelligence",
      description: "Self-improving systems that learn from patterns to enhance protection and anticipate new threats.",
      gradient: "from-purple-600/20 via-purple-500/10 to-pink-600/5"
    }
  ];

  const handleStartFeature = () => {
    navigate('/get-started');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-up">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Comprehensive Protection Suite
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Protection Features
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Advanced tools that safeguard your AI-generated content and intellectual property
              in the rapidly evolving digital landscape.
            </p>
            <div className="flex justify-center space-x-4">
              <AnimatedButton onClick={handleStartFeature} size="lg">
                Start Protecting Your AI
              </AnimatedButton>
              <Link to="/pricing">
                <button className="bg-background/80 hover:bg-background text-foreground px-6 py-3 rounded-md border border-border transition-colors text-lg">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
          
          {/* Features List */}
          <div className="space-y-32 mb-36">
            {featuresList.map((feature, index) => (
              <div 
                key={index} 
                id={feature.id}
                className="scroll-mt-32 relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30 rounded-3xl blur-3xl -z-10`}></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 py-12 rounded-2xl">
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 z-10"></div>
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-96 object-cover object-center"
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="bg-background/30 backdrop-blur-lg border border-white/20 rounded-xl p-6 flex items-center justify-center">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">{feature.description}</p>
                    
                    <ul className="space-y-4 mb-10">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="mr-4 p-1.5 bg-primary/10 rounded-full text-primary mt-0.5">
                            <Check className="h-5 w-5" />
                          </div>
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <AnimatedButton onClick={handleStartFeature} size="lg">
                      Start Using This Feature
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Agentic AI Section */}
          <div className="mb-20 relative">
            <div className="absolute inset-0 -z-10">
              <img 
                src="public/lovable-uploads/cc3bcfa0-34f8-4104-9f15-99c131d65842.png" 
                alt="Technology background" 
                className="w-full h-full object-cover rounded-3xl opacity-10"
              />
            </div>
            
            <div className="p-12 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10">
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Technology Built for the AI Economy
              </h3>
              
              <p className="text-xl text-center text-muted-foreground max-w-4xl mx-auto mb-12">
                Our platform leverages cutting-edge agentic AI technology that works autonomously to 
                protect your digital assets across the evolving AI landscape.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {agentFeatures.map((feature, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-md border border-white/10 rounded-xl p-8 text-center transition-all hover:scale-105 duration-300`}>
                    <div className="mb-6 mx-auto w-24 h-24 bg-background/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center animate-fade-up">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Protect Your AI Content?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start safeguarding your AI-generated assets today with our comprehensive protection suite.
            </p>
            <AnimatedButton onClick={handleStartFeature} size="lg">
              Get Started Now
            </AnimatedButton>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
