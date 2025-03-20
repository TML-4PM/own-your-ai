
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import AnimatedButton from '@/components/ui/AnimatedButton';

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
      
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center px-6 py-24 animate-fade-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Oops! This page doesn't seem to exist.
          </p>
          <Link to="/">
            <AnimatedButton>
              Return to Home
            </AnimatedButton>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
