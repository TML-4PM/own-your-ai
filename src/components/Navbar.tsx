
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
import useMobile from '@/hooks/use-mobile';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (dropdownOpen === dropdown) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(dropdown);
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/70 backdrop-blur-lg border-b border-white/10 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white mr-2">AI</span>
                OwnYourAI
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative group" onMouseLeave={closeDropdown}>
              <button 
                onClick={() => toggleDropdown('product')}
                onMouseEnter={() => toggleDropdown('product')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
                  isActive('/features') || isActive('/pricing') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Product
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'product' ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen === 'product' && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border overflow-hidden">
                  <div className="py-1">
                    <Link to="/features" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Features
                    </Link>
                    <Link to="/pricing" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Pricing
                    </Link>
                    <Link to="/case-studies" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Case Studies
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative group" onMouseLeave={closeDropdown}>
              <button 
                onClick={() => toggleDropdown('resources')}
                onMouseEnter={() => toggleDropdown('resources')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
                  isActive('/blog') || isActive('/resources') || isActive('/calculator') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen === 'resources' && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border overflow-hidden">
                  <div className="py-1">
                    <Link to="/resources" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Resource Center
                    </Link>
                    <Link to="/blog" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Blog
                    </Link>
                    <Link to="/calculator" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      ROI Calculator
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative group" onMouseLeave={closeDropdown}>
              <button 
                onClick={() => toggleDropdown('company')}
                onMouseEnter={() => toggleDropdown('company')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
                  isActive('/about') || isActive('/careers') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Company
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'company' ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen === 'company' && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border overflow-hidden">
                  <div className="py-1">
                    <Link to="/about" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      About Us
                    </Link>
                    <Link to="/careers" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Careers
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      Contact
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
                isActive('/contact') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">
              Sign in
            </Link>
            <Link to="/get-started">
              <AnimatedButton size="sm">Get Started</AnimatedButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu} 
              className="text-gray-600 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '0', paddingTop: '4rem' }}
      >
        <div className="px-6 py-6 space-y-1">
          <div className="border-b border-border pb-2 mb-2">
            <button
              onClick={() => toggleDropdown('product')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
            >
              Product
              <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${dropdownOpen === 'product' ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen === 'product' && (
              <div className="pl-5 py-2 space-y-1">
                <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium">
                  Features
                </Link>
                <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium">
                  Pricing
                </Link>
                <Link to="/case-studies" className="block px-3 py-2 rounded-md text-base font-medium">
                  Case Studies
                </Link>
              </div>
            )}
          </div>
          
          <div className="border-b border-border pb-2 mb-2">
            <button
              onClick={() => toggleDropdown('resources')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
              <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${dropdownOpen === 'resources' ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen === 'resources' && (
              <div className="pl-5 py-2 space-y-1">
                <Link to="/resources" className="block px-3 py-2 rounded-md text-base font-medium">
                  Resource Center
                </Link>
                <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium">
                  Blog
                </Link>
                <Link to="/calculator" className="block px-3 py-2 rounded-md text-base font-medium">
                  ROI Calculator
                </Link>
              </div>
            )}
          </div>
          
          <div className="border-b border-border pb-2 mb-2">
            <button
              onClick={() => toggleDropdown('company')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
            >
              Company
              <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${dropdownOpen === 'company' ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen === 'company' && (
              <div className="pl-5 py-2 space-y-1">
                <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium">
                  About Us
                </Link>
                <Link to="/careers" className="block px-3 py-2 rounded-md text-base font-medium">
                  Careers
                </Link>
                <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium">
                  Contact
                </Link>
              </div>
            )}
          </div>
          
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          
          <div className="pt-4 border-t border-border">
            <Link
              to="/sign-in"
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              Sign in
            </Link>
            <Link to="/get-started" className="block px-3 mt-2">
              <AnimatedButton className="w-full">Get Started</AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
