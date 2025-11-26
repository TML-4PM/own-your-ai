
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand/Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/droid-icon.webp" alt="OwnMyAI" className="h-8 w-8 object-contain rounded" />
              <span className="text-xl font-semibold">OwnMyAI</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Protect and monetize your AI-generated assets.
            </p>
            <div className="flex space-x-3">
              <a href="mailto:troy@ownyourai.org" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/TroyLatter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/TML-4PM" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/theinnovater" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Tech 4 Humanity. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
