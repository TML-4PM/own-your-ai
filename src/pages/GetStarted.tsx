
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';

const GetStarted = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Started</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Begin protecting your AI-generated assets in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <ol className="space-y-8">
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Choose a Plan</h3>
                    <p className="text-muted-foreground">
                      Select the protection plan that fits your needs, from basic monitoring to complete enterprise protection.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Register Your Assets</h3>
                    <p className="text-muted-foreground">
                      Upload or connect your AI-generated content to our platform to establish proof of ownership.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Activate Protection</h3>
                    <p className="text-muted-foreground">
                      Our AI-powered system will begin monitoring the web for unauthorized use of your content.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Respond to Alerts</h3>
                    <p className="text-muted-foreground">
                      When unauthorized usage is detected, you'll be notified and can take automated or manual action.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 rounded-2xl p-10">
              <div className="bg-background/70 backdrop-blur-sm border border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Ready to get started?</h3>
                <p className="text-muted-foreground mb-8">
                  Create your account today and start protecting your AI-generated assets with our advanced platform.
                </p>
                
                <div className="space-y-4">
                  <Link to="/sign-up" className="w-full block">
                    <AnimatedButton className="w-full">
                      Create Account
                    </AnimatedButton>
                  </Link>
                  
                  <Link to="/pricing" className="w-full block">
                    <AnimatedButton variant="secondary" className="w-full">
                      View Pricing
                    </AnimatedButton>
                  </Link>
                  
                  <Link to="/contact" className="w-full block">
                    <AnimatedButton variant="ghost" className="w-full">
                      Contact Sales
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
