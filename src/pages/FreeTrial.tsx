
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import GlassCard from '@/components/ui/GlassCard';
import { CheckCircle, ArrowRight, Shield, Eye, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const FreeTrial = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    aiUseCase: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('free_trial_signups')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company || null,
          ai_use_case: formData.aiUseCase || null,
        }]);

      if (dbError) throw dbError;

      // Send welcome email
      const { error: emailError } = await supabase.functions.invoke('send-trial-email', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          aiUseCase: formData.aiUseCase,
        },
      });

      if (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the whole process if email fails
      }

      toast({
        title: "Free Trial Started!",
        description: "Check your email for login credentials and setup instructions.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        aiUseCase: ''
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const trialFeatures = [
    "Monitor up to 5 AI assets",
    "Real-time threat detection",
    "Basic takedown assistance",
    "Weekly protection reports",
    "Email support",
    "Dashboard access"
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Form */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-600 text-sm font-medium mb-6">
                  14-Day Free Trial
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Start Protecting Your AI Assets Today
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  No credit card required. Full access to all features for 14 days.
                </p>
              </div>

              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/80"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/80"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/80"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/80"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="aiUseCase" className="block text-sm font-medium mb-2">
                      Primary AI Use Case
                    </label>
                    <select
                      id="aiUseCase"
                      name="aiUseCase"
                      value={formData.aiUseCase}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/80"
                    >
                      <option value="">Select your use case</option>
                      <option value="voice-cloning">Voice Cloning/Synthesis</option>
                      <option value="image-generation">AI Image Generation</option>
                      <option value="video-creation">AI Video Creation</option>
                      <option value="text-generation">AI Text/Content</option>
                      <option value="music-audio">AI Music/Audio</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 mr-3 h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <a href="/terms-of-service" className="text-primary hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <AnimatedButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    size="lg"
                  >
                    {isSubmitting ? 'Starting Trial...' : 'Start Free Trial'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <a href="/sign-in" className="text-primary hover:underline font-medium">
                    Sign in here
                  </a>
                </div>
              </GlassCard>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">What's Included in Your Trial</h2>
                <div className="space-y-4">
                  {trialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <GlassCard className="p-6 bg-gradient-to-br from-indigo-500/20 to-indigo-700/10">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-indigo-500 mr-3" />
                    <h3 className="text-xl font-semibold">Instant Protection</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Start monitoring your AI assets immediately with our advanced detection algorithms.
                  </p>
                </GlassCard>

                <GlassCard className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-700/10">
                  <div className="flex items-center mb-4">
                    <Eye className="h-8 w-8 text-purple-500 mr-3" />
                    <h3 className="text-xl font-semibold">Real-Time Alerts</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Get notified the moment unauthorized usage is detected anywhere online.
                  </p>
                </GlassCard>

                <GlassCard className="p-6 bg-gradient-to-br from-pink-500/20 to-pink-700/10">
                  <div className="flex items-center mb-4">
                    <Zap className="h-8 w-8 text-pink-500 mr-3" />
                    <h3 className="text-xl font-semibold">Quick Setup</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Complete setup in under 5 minutes and start protecting your assets today.
                  </p>
                </GlassCard>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 rounded-xl p-6 border border-emerald-500/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$0</div>
                  <div className="text-sm text-muted-foreground mb-4">for 14 days</div>
                  <div className="text-sm">
                    No credit card required • Cancel anytime • Full feature access
                  </div>
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

export default FreeTrial;
