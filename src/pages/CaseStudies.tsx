
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { ArrowRight, Shield, DollarSign, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "How Company X Protected Their AI Voice Model",
      excerpt: "A leading tech company faced unauthorized use of their AI voice technology. See how our protection services helped them secure their intellectual property.",
      industry: "Technology",
      icon: <Shield className="h-10 w-10 text-indigo-500" />,
      results: "92% reduction in unauthorized use"
    },
    {
      id: 2,
      title: "Financial Services Firm Monetizes AI Investment",
      excerpt: "This case study explores how a financial services company created new revenue streams by licensing their proprietary AI algorithms.",
      industry: "Finance",
      icon: <DollarSign className="h-10 w-10 text-purple-500" />,
      results: "$2.4M in new revenue"
    },
    {
      id: 3,
      title: "Media Company Authenticates AI Content",
      excerpt: "Learn how a global media company used blockchain verification to authenticate AI-generated content and prevent unauthorized distribution.",
      industry: "Media",
      icon: <FileCheck className="h-10 w-10 text-pink-500" />,
      results: "100% verification success rate"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world examples of how businesses are protecting and monetizing their AI assets
            </p>
          </div>
          
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="bg-background/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Left section with colored background */}
                  <div className="bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 p-8 flex items-center justify-center">
                    <div className="bg-background/70 backdrop-blur-sm rounded-xl p-6 w-full">
                      <div className="text-center">
                        {study.icon}
                        <h3 className="text-lg font-semibold mt-3">{study.industry}</h3>
                        <div className="mt-4 py-2 px-4 bg-primary/10 rounded-full text-primary text-sm font-medium">
                          {study.results}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right section with content */}
                  <div className="md:col-span-2 p-8">
                    <h2 className="text-2xl font-bold mb-4">{study.title}</h2>
                    <p className="text-muted-foreground mb-6">
                      {study.excerpt}
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-primary mr-3" />
                        <span>Challenge identified and analyzed</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-primary mr-3" />
                        <span>Strategy implemented</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-primary mr-3" />
                        <span>Measurable results achieved</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${study.id}`}>
                      <AnimatedButton className="group">
                        <span>Read full case study</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to protect your AI assets?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team of experts can help you develop a comprehensive strategy for protecting and monetizing your AI-generated content.
            </p>
            <Link to="/get-started">
              <AnimatedButton size="lg" className="group">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
