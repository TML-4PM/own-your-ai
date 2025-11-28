
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "./components/ErrorBoundary";
import LazyRoute from "./components/LazyRoute";
import StripeProvider from "./components/StripeProvider";
import { usePerformance } from "./hooks/usePerformance";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DnsSettings = lazy(() => import("./pages/DnsSettings"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Auth = lazy(() => import("./pages/Auth"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Careers = lazy(() => import("./pages/Careers"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Security = lazy(() => import("./pages/Security"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Resources = lazy(() => import("./pages/Resources"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Demo = lazy(() => import("./pages/Demo"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number') {
          return error.status >= 500 && failureCount < 3;
        }
        return failureCount < 3;
      },
    },
  },
});

const App = () => {
  const [showChat, setShowChat] = useState(false);
  const [isInitialView, setIsInitialView] = useState(true);
  
  // Use performance monitoring
  usePerformance();

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
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <StripeProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LazyRoute><Index /></LazyRoute>} />
                  <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
                  <Route path="/features" element={<LazyRoute><Features /></LazyRoute>} />
                  <Route path="/pricing" element={<LazyRoute><Pricing /></LazyRoute>} />
                  <Route path="/demo" element={<LazyRoute><Demo /></LazyRoute>} />
                  <Route path="/free-trial" element={<LazyRoute><FreeTrial /></LazyRoute>} />
                  <Route path="/admin" element={<LazyRoute><Admin /></LazyRoute>} />
                  <Route path="/dns-settings" element={<LazyRoute><DnsSettings /></LazyRoute>} />
                  <Route path="/blog" element={<LazyRoute><Blog /></LazyRoute>} />
                  <Route path="/blog/:slug" element={<LazyRoute><BlogArticle /></LazyRoute>} />
                  <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
                  <Route path="/sign-in" element={<LazyRoute><SignIn /></LazyRoute>} />
                  <Route path="/auth" element={<LazyRoute><Auth /></LazyRoute>} />
                  <Route path="/forgot-password" element={<LazyRoute><ForgotPassword /></LazyRoute>} />
                  <Route path="/get-started" element={<LazyRoute><GetStarted /></LazyRoute>} />
                  <Route path="/case-studies" element={<LazyRoute><CaseStudies /></LazyRoute>} />
                  <Route path="/careers" element={<LazyRoute><Careers /></LazyRoute>} />
                  <Route path="/privacy-policy" element={<LazyRoute><PrivacyPolicy /></LazyRoute>} />
                  <Route path="/terms-of-service" element={<LazyRoute><TermsOfService /></LazyRoute>} />
                  <Route path="/cookie-policy" element={<LazyRoute><CookiePolicy /></LazyRoute>} />
                  <Route path="/security" element={<LazyRoute><Security /></LazyRoute>} />
                  <Route path="/resources" element={<LazyRoute><Resources /></LazyRoute>} />
                  <Route path="/calculator" element={<LazyRoute><Calculator /></LazyRoute>} />
                  <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
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
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
