
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { toast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      
      toast({
        title: "Reset Link Sent",
        description: "Check your email for instructions to reset your password.",
      });
      
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="flex justify-center items-center min-h-screen pt-24 pb-20 px-6 md:px-10">
        <div className="w-full max-w-md">
          <div className="bg-background/70 backdrop-blur-md border border-border rounded-xl p-10 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Reset Your Password</h1>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-background/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="pt-2">
                  <AnimatedButton type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Reset Password'}
                  </AnimatedButton>
                </div>
                
                <div className="text-center pt-4">
                  <Link to="/sign-in" className="text-primary hover:underline text-sm">
                    Return to sign in
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="bg-primary/10 text-primary p-4 rounded-lg mb-6">
                  <p>We've sent reset instructions to:</p>
                  <p className="font-semibold mt-2">{email}</p>
                </div>
                <p className="mb-6">
                  If you don't see the email in your inbox, please check your spam folder.
                </p>
                <Link to="/sign-in">
                  <AnimatedButton>
                    Return to Sign In
                  </AnimatedButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
