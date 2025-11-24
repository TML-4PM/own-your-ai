import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { Globe, Server, Info } from 'lucide-react';

const DnsSettings = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">DNS Settings</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure DNS for OwnMyAI.org and OwnYourAI.org through your domain provider's dashboard.
          </p>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-8">
            <div className="flex items-start gap-4">
              <Globe size={28} className="text-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3">AWS Route 53</h3>
                <p className="text-muted-foreground mb-4">
                  Manage your DNS records, hosted zones, and traffic policies through AWS Route 53.
                </p>
                <a 
                  href="https://console.aws.amazon.com/route53" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 font-medium transition-colors"
                >
                  Go to AWS Route 53 Console
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="flex items-start gap-4">
              <Server size={28} className="text-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3">Vercel Hosting</h3>
                <p className="text-muted-foreground mb-4">
                  Deploy and manage your domains directly through the Vercel dashboard.
                </p>
                <a 
                  href="https://vercel.com/dashboard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-foreground/80 font-medium transition-colors"
                >
                  Go to Vercel Dashboard
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start gap-4">
              <Info size={24} className="text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Quick Setup Tips</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>DNS changes typically take 24-48 hours to fully propagate</li>
                  <li>Always verify your A records point to the correct IP address</li>
                  <li>Use CNAME records for subdomains when possible</li>
                  <li>Enable SSL/TLS certificates for secure connections</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DnsSettings;
