import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

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

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-3' : 'bg-background py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <span className="text-xl font-bold tracking-tight">OwnMyAI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {/* Product Dropdown */}
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
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border z-50">
                <div className="py-1">
                  <Link to="/features" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Features</Link>
                  <Link to="/pricing" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Pricing</Link>
                  <Link to="/case-studies" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Case Studies</Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
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
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border z-50">
                <div className="py-1">
                  <Link to="/resources" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Resource Center</Link>
                  <Link to="/blog" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Blog</Link>
                  <Link to="/calculator" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>ROI Calculator</Link>
                </div>
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div className="relative group" onMouseLeave={closeDropdown}>
            <button
              onClick={() => toggleDropdown('company')}
              onMouseEnter={() => toggleDropdown('company')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
                isActive('/about') || isActive('/careers') || isActive('/contact') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Company
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'company' ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen === 'company' && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border z-50">
                <div className="py-1">
                  <Link to="/about" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>About Us</Link>
                  <Link to="/careers" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Careers</Link>
                  <Link to="/contact" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeDropdown}>Contact</Link>
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

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {/* Mobile Product */}
            <button
              onClick={() => toggleDropdown('product')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
            >
              Product
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'product' ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen === 'product' && (
              <div className="pl-4 space-y-1">
                <Link to="/features" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Features</Link>
                <Link to="/pricing" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Pricing</Link>
                <Link to="/case-studies" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Case Studies</Link>
              </div>
            )}

            {/* Mobile Resources */}
            <button
              onClick={() => toggleDropdown('resources')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'resources' ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen === 'resources' && (
              <div className="pl-4 space-y-1">
                <Link to="/resources" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Resource Center</Link>
                <Link to="/blog" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Blog</Link>
                <Link to="/calculator" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>ROI Calculator</Link>
              </div>
            )}

            {/* Mobile Company */}
            <button
              onClick={() => toggleDropdown('company')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
            >
              Company
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen === 'company' ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen === 'company' && (
              <div className="pl-4 space-y-1">
                <Link to="/about" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>About Us</Link>
                <Link to="/careers" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Careers</Link>
                <Link to="/contact" className="block px-3 py-2 text-sm" onClick={closeMobileMenu}>Contact</Link>
              </div>
            )}

            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>

            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth" onClick={closeMobileMenu}>Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/get-started" onClick={closeMobileMenu}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
