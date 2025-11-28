import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Shield, DollarSign, FileCheck, Check, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

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
    price: 99,
    priceDisplay: "$99",
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
    price: 299,
    priceDisplay: "$299",
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
    price: 0,
    priceDisplay: "Contact us",
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check for success/cancel from Stripe
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      toast({
        title: "Payment successful!",
        description: "Your subscription is now active. Welcome aboard!",
      });
      navigate('/features', { replace: true });
    } else if (canceled === 'true') {
      toast({
        title: "Payment canceled",
        description: "Your payment was canceled. You can try again when ready.",
        variant: "destructive"
      });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || ''
        }));
      }
      setIsLoading(false);
    });

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || ''
        }));
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      toast({
        title: "Please select a package",
        description: "You need to select a protection package to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email || !formData.name) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const selectedPkg = PACKAGES.find(pkg => pkg.id === selectedPackage);

    try {
      // If not logged in, redirect to auth page with package info
      if (!user) {
        // Store selected package in sessionStorage for after auth
        sessionStorage.setItem('selectedPackage', selectedPackage);
        sessionStorage.setItem('pendingFormData', JSON.stringify(formData));
        
        toast({
          title: "Create an account first",
          description: "Please sign up or sign in to continue with your subscription.",
        });
        navigate('/auth');
        return;
      }

      // Update user profile with company and phone
      if (formData.company || formData.phone) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            company: formData.company,
            phone: formData.phone,
            full_name: formData.name
          })
          .eq('user_id', user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }

      // Handle Enterprise package - create lead
      if (selectedPackage === 'enterprise') {
        const { error: leadError } = await supabase
          .from('enterprise_leads')
          .insert({
            user_id: user.id,
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            status: 'pending'
          });

        if (leadError) {
          throw new Error('Failed to submit enterprise request');
        }

        toast({
          title: "Request submitted!",
          description: "Our enterprise team will contact you within 24 hours.",
        });
        
        setIsSubmitting(false);
        navigate('/features');
        return;
      }

      // For Basic and Professional - create Stripe checkout
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          planName: selectedPkg?.name,
          amount: (selectedPkg?.price || 0) * 100, // Convert to cents
          email: formData.email,
          successUrl: `${window.location.origin}/get-started?success=true`,
          cancelUrl: `${window.location.origin}/get-started?canceled=true`
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  // Check for stored package from auth redirect
  useEffect(() => {
    if (user) {
      const storedPackage = sessionStorage.getItem('selectedPackage');
      const storedFormData = sessionStorage.getItem('pendingFormData');
      
      if (storedPackage) {
        setSelectedPackage(storedPackage);
        sessionStorage.removeItem('selectedPackage');
      }
      
      if (storedFormData) {
        const parsed = JSON.parse(storedFormData);
        setFormData(prev => ({
          ...prev,
          company: parsed.company || prev.company,
          phone: parsed.phone || prev.phone
        }));
        sessionStorage.removeItem('pendingFormData');
      }
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Started</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Begin protecting your AI-generated assets in just a few simple steps
            </p>
            {user && (
              <p className="text-sm text-primary mt-2">
                Signed in as {user.email}
              </p>
            )}
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-8">Choose Your Protection Package</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`relative bg-background/50 backdrop-blur-sm border ${selectedPackage === pkg.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'} rounded-xl p-6 transition-all hover:border-primary/80 cursor-pointer`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  {selectedPackage === pkg.id && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${selectedPackage === pkg.id ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'} mr-3`}>
                      {pkg.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="text-2xl font-bold mb-4">
                    {pkg.priceDisplay} 
                    <span className="text-sm font-normal text-muted-foreground">
                      {pkg.id !== 'enterprise' ? '/month' : ''}
                    </span>
                  </div>
                  
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
            <h2 className="text-2xl font-bold mb-6">
              {selectedPackage === 'enterprise' ? 'Request Enterprise Demo' : 'Complete Registration'}
            </h2>
            
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={!!user}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-60"
                  />
                  {user && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Email is linked to your account
                    </p>
                  )}
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
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
                    className="w-full px-4 py-2 border border-border rounded-md bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                {!user && (
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p className="text-muted-foreground">
                      Don't have an account? You'll be redirected to create one before completing your subscription.
                    </p>
                    <Link to="/auth" className="text-primary hover:underline">
                      Sign in now →
                    </Link>
                  </div>
                )}
                
                <div className="pt-4">
                  <AnimatedButton 
                    type="submit" 
                    disabled={isSubmitting || !selectedPackage}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : selectedPackage === 'enterprise' ? (
                      'Request Demo'
                    ) : !user ? (
                      'Continue to Sign Up'
                    ) : (
                      'Continue to Payment'
                    )}
                  </AnimatedButton>
                </div>

                {selectedPackage && selectedPackage !== 'enterprise' && (
                  <p className="text-xs text-center text-muted-foreground">
                    You'll be redirected to our secure payment partner Stripe to complete your subscription.
                  </p>
                )}
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