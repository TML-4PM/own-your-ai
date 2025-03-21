
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="flex items-center justify-center min-h-screen pt-24 pb-20 px-6 md:px-10">
        <div className="text-center px-6 py-16 animate-fade-up max-w-4xl">
          <div className="mb-10 mx-auto w-64 h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full animate-pulse-slow"></div>
            <h1 className="text-8xl md:text-9xl font-bold relative z-10 pt-16 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">404</h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
            Oops! This page doesn't seem to exist.
          </p>
          
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 mb-10">
            <p className="mb-4">The page you're looking for might have been moved, deleted, or never existed.</p>
            <p>Let's get you back on track!</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <AnimatedButton className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Return to Home</span>
              </AnimatedButton>
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center justify-center bg-background/80 hover:bg-background text-foreground px-6 py-2 rounded-md border border-border transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
