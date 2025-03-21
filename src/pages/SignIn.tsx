
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { toast } from '@/components/ui/use-toast';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sign-in process
    setTimeout(() => {
      console.log('Sign in attempt:', email);
      
      toast({
        title: "Sign In Successful",
        description: "Welcome back to OwnMyAI.biz!",
      });
      
      setIsLoading(false);
      
      // In a real app, you would redirect to dashboard after successful sign-in
      // For now, we'll reset the form
      setEmail('');
      setPassword('');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="flex justify-center items-center min-h-screen pt-24 pb-20 px-6 md:px-10">
        <div className="w-full max-w-md">
          <div className="bg-background/70 backdrop-blur-md border border-border rounded-xl p-10 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Sign In</h1>
              <p className="text-muted-foreground">Welcome back to OwnMyAI.biz</p>
            </div>
            
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Professional using AI tools" 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
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
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md bg-background/50"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>
              
              <div>
                <AnimatedButton type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </AnimatedButton>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{' '}
                <Link to="/get-started" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
