
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DnsSettings from "./pages/DnsSettings";
import StripeProvider from "./components/StripeProvider";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import GetStarted from "./pages/GetStarted";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Security from "./pages/Security";
import BlogArticle from "./pages/BlogArticle";
import Resources from "./pages/Resources";
import Calculator from "./pages/Calculator";

const queryClient = new QueryClient();

const App = () => {
  const [showChat, setShowChat] = useState(false);
  const [isInitialView, setIsInitialView] = useState(true);

  useEffect(() => {
    // After 5 seconds, show the chat bubble
    const timer = setTimeout(() => {
      setIsInitialView(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StripeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dns-settings" element={<DnsSettings />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/security" element={<Security />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Global Live Chat */}
            <div className="fixed bottom-6 right-6 z-50">
              {isInitialView && !showChat && (
                <div className="absolute bottom-20 right-0 w-72 p-4 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-lg animate-fade-up mb-2">
                  <p className="text-sm">Need help protecting your AI assets? Chat with us now!</p>
                  <button 
                    onClick={() => {
                      setShowChat(true);
                      setIsInitialView(false);
                    }}
                    className="mt-3 text-sm text-indigo-600 font-medium"
                  >
                    Start chat
                  </button>
                  <button 
                    onClick={() => setIsInitialView(false)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              <button 
                onClick={toggleChat}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                aria-label="Live Chat"
              >
                {showChat ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
              </button>
              
              {showChat && (
                <div className="absolute bottom-20 right-0 w-80 bg-background border border-border rounded-xl shadow-xl animate-fade-up">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-xl">
                    <h3 className="font-semibold">Live Chat Support</h3>
                    <p className="text-sm opacity-90">We typically reply in a few minutes</p>
                  </div>
                  <div className="p-4 h-80 bg-background/80 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-muted/50 p-3 rounded-lg inline-block max-w-[80%] mb-3">
                      <p className="text-sm">Hello! How can we help you with your AI protection needs today?</p>
                      <span className="text-xs text-muted-foreground mt-1 block">Support Team, just now</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border">
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1 p-2 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button className="bg-indigo-600 text-white p-2 rounded-r-md">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </BrowserRouter>
        </StripeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
