
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from './ui/AnimatedButton';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 py-4 ${
        isScrolled ? 'bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-display font-semibold text-foreground transition-all duration-300 hover:opacity-80"
        >
          OwnMyAI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
            Home
          </Link>
          <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
            Features
          </Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
            Pricing
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors duration-200">
            About
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AnimatedButton variant="ghost" size="sm">
            Sign In
          </AnimatedButton>
          <AnimatedButton>
            Get Started
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg border-t border-border animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="block py-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <AnimatedButton variant="ghost" size="sm" className="justify-start">
                Sign In
              </AnimatedButton>
              <AnimatedButton className="w-full">
                Get Started
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
