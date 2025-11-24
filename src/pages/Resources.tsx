import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { Link } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight, BookOpen, Download, FileText, Filter, Search, Lock } from 'lucide-react';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [leadCaptureModal, setLeadCaptureModal] = useState<{
    isOpen: boolean;
    contentTitle: string;
    contentDescription: string;
    contentType: 'whitepaper' | 'guide' | 'case-study' | 'tool';
  }>({
    isOpen: false,
    contentTitle: '',
    contentDescription: '',
    contentType: 'guide'
  });
  
  const resources = [
    {
      title: "A Complete Guide to AI Asset Protection",
      description: "Learn the fundamentals of safeguarding your AI-generated content and intellectual property in this comprehensive guide.",
      category: "guide",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
      date: "May 15, 2023",
      isPremium: true
    },
    {
      title: "Legal Framework for AI Ownership",
      description: "Explore the current legal landscape surrounding AI intellectual property and how it affects creators and businesses.",
      category: "whitepaper",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2012&auto=format&fit=crop",
      date: "June 3, 2023",
      isPremium: true
    },
    {
      title: "AI Protection ROI Calculator",
      description: "Calculate the potential return on investment from implementing proper AI asset protection for your business.",
      category: "tool",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      date: "July 21, 2023",
      isPremium: false
    },
    {
      title: "Case Study: How TechVision Saved $2M with AI Protection",
      description: "Read how one AI company prevented unauthorized use of their models and reclaimed lost revenue.",
      category: "case-study",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      date: "August 9, 2023",
      isPremium: true
    },
    {
      title: "Blockchain Verification for AI Assets Explained",
      description: "Understand how blockchain technology is revolutionizing the verification and protection of AI-generated content.",
      category: "guide",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop",
      date: "September 14, 2023",
      isPremium: false
    },
    {
      title: "The Future of AI Intellectual Property Protection",
      description: "Expert insights on emerging trends and technologies in the field of AI asset protection.",
      category: "whitepaper",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
      date: "October 5, 2023",
      isPremium: true
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeTab === 'all' || resource.category === activeTab;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (category: string) => {
    switch(category) {
      case 'guide':
        return <BookOpen className="h-5 w-5 text-indigo-500" />;
      case 'whitepaper':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'case-study':
        return <FileText className="h-5 w-5 text-pink-500" />;
      case 'tool':
        return <Download className="h-5 w-5 text-emerald-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleResourceClick = (resource: any) => {
    if (resource.isPremium) {
      setLeadCaptureModal({
        isOpen: true,
        contentTitle: resource.title,
        contentDescription: resource.description,
        contentType: resource.category as 'whitepaper' | 'guide' | 'case-study' | 'tool'
      });
    } else {
      // Navigate to resource or open directly for free resources
      if (resource.category === 'tool' && resource.title.includes('Calculator')) {
        window.location.href = '/calculator';
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-600 text-sm font-medium mb-6">
              Knowledge Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Protection Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our collection of guides, whitepapers, tools, and case studies to better understand 
              and implement AI asset protection.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center w-full md:w-auto border border-border rounded-lg overflow-hidden bg-background/80 backdrop-blur-sm">
              <div className="px-3 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 flex-1 bg-transparent focus:outline-none w-full md:w-60"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <div className="text-muted-foreground flex items-center mr-2">
                <Filter className="h-4 w-4 mr-1" />
                <span className="text-sm">Filter:</span>
              </div>
              {['all', 'guide', 'whitepaper', 'case-study', 'tool'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-background/60 hover:bg-background/80 border border-border'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredResources.map((resource, index) => (
              <div 
                key={index}
                onClick={() => handleResourceClick(resource)}
                className="group bg-background/70 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border border-border flex items-center">
                    {getResourceIcon(resource.category)}
                    <span className="ml-1 capitalize">{resource.category.replace('-', ' ')}</span>
                  </div>
                  {resource.isPremium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-muted-foreground mb-3">{resource.date}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>{resource.isPremium ? 'Get Access' : 'Read more'}</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* ROI Calculator Preview */}
          <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-lg mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Calculate Your AI Protection ROI
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover how much revenue you could protect and potential savings with our comprehensive AI protection services.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
                    <span>Estimate potential losses from AI misuse</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                    <span>Calculate protection cost savings</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-pink-500 mr-2"></div>
                    <span>Project new licensing revenue opportunities</span>
                  </div>
                </div>
                <Link to="/calculator">
                  <AnimatedButton>
                    Try Our ROI Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-sm">
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2">Estimated annual value of your AI assets</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <input 
                      type="text" 
                      defaultValue="500,000" 
                      className="w-full pl-8 py-3 border border-border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2">Estimated unauthorized use frequency (per year)</label>
                  <select className="w-full p-3 border border-border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-background/50">
                    <option>1-5 times</option>
                    <option>6-20 times</option>
                    <option selected>21-50 times</option>
                    <option>51-100 times</option>
                    <option>100+ times</option>
                  </select>
                </div>
                
                <div className="bg-indigo-500/10 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Potential annual losses:</span>
                    <span className="font-semibold text-indigo-600">$125,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Protection service cost:</span>
                    <span className="font-semibold text-indigo-600">$24,000</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-indigo-500/20">
                    <span className="font-medium">Net savings:</span>
                    <span className="font-bold text-lg text-indigo-600">$101,000</span>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  This is a simplified calculation. Use our full ROI calculator for a detailed analysis.
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="text-center bg-background/70 backdrop-blur-sm rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-3">Stay Updated on AI Protection</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter to receive the latest resources, news, and updates on protecting your AI assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 p-3 rounded-md border border-border focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <AnimatedButton className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Subscribe
              </AnimatedButton>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      <LeadCaptureModal
        isOpen={leadCaptureModal.isOpen}
        onClose={() => setLeadCaptureModal(prev => ({ ...prev, isOpen: false }))}
        contentTitle={leadCaptureModal.contentTitle}
        contentDescription={leadCaptureModal.contentDescription}
        contentType={leadCaptureModal.contentType}
      />
    </div>
  );
};

export default Resources;
