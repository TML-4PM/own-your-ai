
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

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
          <div className="mb-10 mx-auto w-72 h-72 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full animate-pulse-slow"></div>
            <img 
              src="public/lovable-uploads/9b1bbcb1-2400-4ef8-addd-52659c97b859.png" 
              alt="404 Illustration" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain z-10"
            />
            <h1 className="text-8xl md:text-9xl font-bold relative z-10 pt-20 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">404</h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
            Oops! This page doesn't seem to exist.
          </p>
          
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 mb-10">
            <p className="mb-4">The page you're looking for might have been moved, deleted, or never existed.</p>
            <p>Let's get you back on track!</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link to="/">
              <AnimatedButton className="flex items-center justify-center w-full">
                <Home className="mr-2 h-4 w-4" />
                <span>Return Home</span>
              </AnimatedButton>
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center justify-center bg-background/80 hover:bg-background text-foreground px-6 py-2 rounded-md border border-border transition-colors w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Go Back</span>
            </button>
            <Link to="/contact">
              <button className="flex items-center justify-center bg-background/80 hover:bg-background text-foreground px-6 py-2 rounded-md border border-border transition-colors w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Get Help</span>
              </button>
            </Link>
          </div>

          <div className="mt-12 max-w-lg mx-auto">
            <p className="text-muted-foreground mb-4">You might want to check out:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link to="/features" className="text-primary hover:underline">Features</Link>
              <Link to="/pricing" className="text-primary hover:underline">Pricing</Link>
              <Link to="/about" className="text-primary hover:underline">About Us</Link>
              <Link to="/blog" className="text-primary hover:underline">Blog</Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
