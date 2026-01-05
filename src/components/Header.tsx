import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Own Your AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/consent" className="text-muted-foreground hover:text-foreground transition-colors">Consent</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
