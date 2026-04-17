import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight, Shield, Eye, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

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
      setFormData({ firstName: '', lastName: '', email: '', company: '', aiUseCase: '' });
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      <main className="pt-24 pb-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
              14-Day Free Trial
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Protecting Your AI Assets Today</h1>
            <p className="text-muted-foreground mb-8">No credit card required. Full access to all features for 14 days.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
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
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
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
                <label htmlFor="email" className="block text-sm font-medium mb-1">Work Email *</label>
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
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</label>
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
                <label htmlFor="aiUseCase" className="block text-sm font-medium mb-1">Primary AI Use Case</label>
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
                  <Link to="/privacy-policy" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Starting Trial...' : 'Start Free Trial'}
              </button>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link to="/auth" className="text-primary hover:underline">Sign in here</Link>
              </p>
            </form>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">What's Included in Your Trial</h2>
              <ul className="space-y-3">
                {trialFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Instant Protection</h3>
                <p className="text-sm text-muted-foreground">Start monitoring your AI assets immediately with our advanced detection algorithms.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <Eye className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Real-Time Alerts</h3>
                <p className="text-sm text-muted-foreground">Get notified the moment unauthorized usage is detected anywhere online.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Quick Setup</h3>
                <p className="text-sm text-muted-foreground">Complete setup in under 5 minutes and start protecting your assets today.</p>
              </div>
            </div>

            <div className="text-center p-6 rounded-xl border border-border bg-background/50">
              <div className="text-5xl font-bold text-primary mb-2">$0</div>
              <div className="text-muted-foreground mb-4">for 14 days</div>
              <p className="text-sm text-muted-foreground">No credit card required • Cancel anytime • Full feature access</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreeTrial;
