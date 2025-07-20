
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import GlassCard from '@/components/ui/GlassCard';
import { Shield, AlertTriangle, CheckCircle, Eye, Zap, TrendingUp, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [threatsDetected, setThreatsDetected] = useState(0);
  const [takedownsActive, setTakedownsActive] = useState(0);

  const demoSteps = [
    {
      title: "AI Asset Upload",
      description: "Upload your AI-generated content for protection",
      icon: Shield,
      color: "text-indigo-500"
    },
    {
      title: "Threat Detection",
      description: "Our AI scans the internet for unauthorized usage",
      icon: Eye,
      color: "text-purple-500"
    },
    {
      title: "Alert System",
      description: "Receive instant notifications of potential infringement",
      icon: AlertTriangle,
      color: "text-orange-500"
    },
    {
      title: "Automated Takedown",
      description: "Initiate legal takedown processes automatically",
      icon: Zap,
      color: "text-pink-500"
    },
    {
      title: "Protection Verified",
      description: "Confirm removal and maintain ongoing monitoring",
      icon: CheckCircle,
      color: "text-emerald-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const startScan = () => {
    setIsScanning(true);
    setThreatsDetected(0);
    setTakedownsActive(0);
    
    // Simulate threat detection
    const threatInterval = setInterval(() => {
      setThreatsDetected(prev => {
        if (prev < 15) return prev + Math.floor(Math.random() * 3) + 1;
        return prev;
      });
    }, 500);

    // Simulate takedown process
    setTimeout(() => {
      const takedownInterval = setInterval(() => {
        setTakedownsActive(prev => {
          if (prev < 12) return prev + 1;
          return prev;
        });
      }, 800);

      setTimeout(() => {
        clearInterval(takedownInterval);
        setIsScanning(false);
      }, 10000);
    }, 3000);

    setTimeout(() => {
      clearInterval(threatInterval);
    }, 8000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-600 text-sm font-medium mb-6">
              Interactive Demo
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              See AI Protection in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience how our AI protection system detects, alerts, and removes unauthorized usage of your digital assets in real-time.
            </p>
            <Link to="/free-trial">
              <AnimatedButton size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Start Your Free Trial
              </AnimatedButton>
            </Link>
          </div>

          {/* Demo Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Protection Process</h2>
              <div className="space-y-4">
                {demoSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div key={index} className={`flex items-center p-4 rounded-xl border transition-all duration-500 ${
                      isActive ? 'border-primary/50 bg-primary/5' : 'border-border bg-background/50'
                    }`}>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 
                        isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <GlassCard className="p-8 h-full">
                <h3 className="text-2xl font-bold mb-6">Live Protection Dashboard</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-indigo-500/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-indigo-600">{threatsDetected}</div>
                    <div className="text-sm text-muted-foreground">Threats Detected</div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-600">{takedownsActive}</div>
                    <div className="text-sm text-muted-foreground">Takedowns Active</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-background/80 rounded-lg border">
                    <span className="text-sm">Scanning Progress</span>
                    <span className="text-sm font-medium">{isScanning ? 'Active' : 'Ready'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/80 rounded-lg border">
                    <span className="text-sm">Protection Status</span>
                    <span className="text-sm font-medium text-emerald-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/80 rounded-lg border">
                    <span className="text-sm">Last Scan</span>
                    <span className="text-sm font-medium">2 minutes ago</span>
                  </div>
                </div>

                <AnimatedButton 
                  onClick={startScan} 
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? 'Scanning...' : 'Start Security Scan'}
                </AnimatedButton>
              </GlassCard>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <GlassCard className="p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">24/7 automated scanning across millions of websites and platforms</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
              <p className="text-muted-foreground">Average 75% reduction in unauthorized usage within 30 days</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted by 1000+</h3>
              <p className="text-muted-foreground">Leading AI companies and creators protect their assets with us</p>
            </GlassCard>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your AI Assets?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your free trial today and experience the power of comprehensive AI protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-trial">
                <AnimatedButton size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Start Free Trial
                </AnimatedButton>
              </Link>
              <Link to="/contact">
                <AnimatedButton variant="secondary" size="lg">
                  Schedule Demo
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Demo;
