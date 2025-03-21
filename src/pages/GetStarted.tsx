
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Shield, DollarSign, FileCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Different feature packages
const PACKAGES = [
  {
    id: "basic",
    name: "Basic Protection",
    description: "Essential protection for individuals and small businesses",
    features: [
      "AI content monitoring",
      "Basic takedown assistance",
      "Monthly reports",
      "Email support"
    ],
    price: "$99",
    icon: <Shield className="h-10 w-10" />
  },
  {
    id: "professional",
    name: "Professional",
    description: "Advanced protection for growing businesses",
    features: [
      "Everything in Basic",
      "Priority takedowns",
      "Weekly reports",
      "Phone support",
      "License management"
    ],
    price: "$299",
    recommended: true,
    icon: <DollarSign className="h-10 w-10" />
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete protection for large organizations",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom API integration",
      "Daily reports",
      "24/7 support",
      "Advanced analytics"
    ],
    price: "Contact us",
    icon: <FileCheck className="h-10 w-10" />
  }
];

const GetStarted = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      toast({
        title: "Please select a package",
        description: "You need to select a protection package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      const selectedPkg = PACKAGES.find(pkg => pkg.id === selectedPackage);
      toast({
        title: "Registration successful!",
        description: `Thank you for choosing the ${selectedPkg?.name} package. Your account is being activated.`
      });
      
      // Reset form and navigate to features page
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
      });
      setSelectedPackage(null);
      setIsSubmitting(false);
      
      // Navigate to features page after successful registration
      navigate('/features');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Started</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Begin protecting your AI-generated assets in just a few simple steps
            </p>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-8">Choose Your Protection Package</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`relative bg-background/50 backdrop-blur-sm border ${selectedPackage === pkg.id ? 'border-primary' : 'border-border'} rounded-xl p-6 transition-all hover:border-primary/80 cursor-pointer`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${selectedPackage === pkg.id ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'} mr-3`}>
                      {pkg.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="text-2xl font-bold mb-4">{pkg.price} <span className="text-sm font-normal text-muted-foreground">{pkg.id !== 'enterprise' ? '/month' : ''}</span></div>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <AnimatedButton 
                    onClick={() => handlePackageSelect(pkg.id)}
                    variant={selectedPackage === pkg.id ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {selectedPackage === pkg.id ? 'Selected' : 'Select'}
                  </AnimatedButton>
                </div>
              ))}
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Complete Registration</h2>
            
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50"
                  />
                </div>
                
                <div className="pt-4">
                  <AnimatedButton 
                    type="submit" 
                    disabled={isSubmitting || !selectedPackage}
                    className="w-full"
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                  </AnimatedButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
