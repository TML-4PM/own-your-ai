
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { ArrowRight, Shield, DollarSign, FileCheck, Users, BarChart3, Award } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link } from 'react-router-dom';

// Create blog article paths for case studies
const BLOG_PATHS = {
  aiVoice: '/blog/ai-voice-protection',
  financialAi: '/blog/financial-ai-monetization',
  mediaContent: '/blog/media-content-authentication',
};

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "How Tech Giant Protected Their AI Voice Model",
      excerpt: "A leading technology company faced unauthorized use of their AI voice technology. Our protection services helped them secure their intellectual property and reduce misuse by 92%.",
      industry: "Technology",
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      results: "92% reduction in unauthorized use",
      image: "public/lovable-uploads/f96640a3-0318-4563-8c2d-a76bf255d2d2.png",
      path: BLOG_PATHS.aiVoice
    },
    {
      id: 2,
      title: "Financial Services Firm Monetizes AI Investment",
      excerpt: "This case study explores how a financial services company created new revenue streams by licensing their proprietary AI algorithms through our platform, generating $2.4M in new annual revenue.",
      industry: "Finance",
      icon: <DollarSign className="h-10 w-10 text-green-500" />,
      results: "$2.4M in new revenue",
      image: "public/lovable-uploads/243c1d81-b0a1-4c10-9c7d-cafaaa0da6e4.png",
      path: BLOG_PATHS.financialAi
    },
    {
      id: 3,
      title: "Media Company Authenticates AI Content",
      excerpt: "Learn how a global media company used blockchain verification to authenticate AI-generated content and prevent unauthorized distribution, achieving a 100% verification success rate.",
      industry: "Media",
      icon: <FileCheck className="h-10 w-10 text-purple-500" />,
      results: "100% verification success rate",
      image: "public/lovable-uploads/b89f579d-2891-4c16-b3f4-4e2c1c215b7a.png",
      path: BLOG_PATHS.mediaContent
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world examples of how businesses are protecting and monetizing their AI assets
            </p>
          </div>
          
          <div className="space-y-20 mb-20">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="bg-background/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Left section with colored background and image */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-blue-400/20 to-violet-500/20 z-10"></div>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6">
                        <div className="text-center">
                          {study.icon}
                          <h3 className="text-lg font-semibold mt-3">{study.industry}</h3>
                          <div className="mt-4 py-2 px-4 bg-primary/10 rounded-full text-primary text-sm font-medium">
                            {study.results}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right section with content */}
                  <div className="md:col-span-2 p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{study.title}</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                      {study.excerpt}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Challenge Identified</h4>
                          <p className="text-sm text-muted-foreground">Detailed analysis of the problem</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Solution Implemented</h4>
                          <p className="text-sm text-muted-foreground">Custom-tailored approach</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Measurable Results</h4>
                          <p className="text-sm text-muted-foreground">Data-driven outcomes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Ongoing Success</h4>
                          <p className="text-sm text-muted-foreground">Long-term partnership</p>
                        </div>
                      </div>
                    </div>
                    
                    <Link to={study.path}>
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
          
          <div className="mt-16 text-center py-16 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl">
            <h3 className="text-3xl font-bold mb-6">Ready to protect your AI assets?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
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
