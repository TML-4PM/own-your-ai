
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { Shield, Lock, CheckCircle } from 'lucide-react';

const Security = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Security</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              How we protect your data and AI assets
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-5">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Data Protection</h2>
                  <p className="text-muted-foreground">
                    We implement robust security measures to protect your personal information and AI assets from unauthorized access, disclosure, alteration, and destruction.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 pl-16">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Encryption</h3>
                    <p className="text-sm text-muted-foreground">All data is encrypted both in transit and at rest using industry-standard encryption protocols.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Secure Infrastructure</h3>
                    <p className="text-sm text-muted-foreground">Our systems are hosted in secure, enterprise-grade data centers with 24/7 monitoring and multiple layers of physical security.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Regular Security Audits</h3>
                    <p className="text-sm text-muted-foreground">We conduct regular security assessments and penetration testing to identify and address potential vulnerabilities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-5">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Account Security</h2>
                  <p className="text-muted-foreground">
                    We provide robust account security features to protect your account and the AI assets you manage through our platform.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 pl-16">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Strong Authentication</h3>
                    <p className="text-sm text-muted-foreground">We support multi-factor authentication to add an extra layer of security to your account.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Session Management</h3>
                    <p className="text-sm text-muted-foreground">Automated session timeouts and the ability to monitor active sessions help prevent unauthorized access.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Activity Monitoring</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive logging and monitoring of account activities allow us to detect and respond to suspicious behavior.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Security Commitment</h2>
              <p className="text-muted-foreground mb-6">
                Security is fundamental to our business. We are committed to protecting your data and constantly evolving our security practices to address new threats and challenges.
              </p>
              
              <p className="text-muted-foreground mb-6">
                If you have any questions about our security practices or want to report a security concern, please contact us at: troy.latter@4pm.net.au
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;
