
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, FileText, Users, Key, AlertTriangle, PenTool } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">Last updated: May 1, 2023</p>
          </div>
          
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Person working on laptop" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <p className="text-lg mb-6 leading-relaxed">
                  Welcome to OwnMyAI.biz. Please read these Terms of Service carefully before using our website and services.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
            <section className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 p-10 rounded-3xl border border-blue-200/20">
              <div className="flex items-start gap-4 mb-6">
                <FileText className="text-blue-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-0">Acceptance of Terms</h2>
              </div>
              <p className="text-lg leading-relaxed">
                By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </section>
            
            <section className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-10 rounded-3xl border border-indigo-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="text-indigo-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-0">Use of Services</h2>
              </div>
              <p className="text-lg leading-relaxed">
                Our services are designed to help protect and monetize AI-generated content. You may use our services only as permitted by these terms and any applicable laws. You agree not to misuse our services or help anyone else do so.
              </p>
            </section>
            
            <section className="bg-gradient-to-br from-purple-500/5 to-violet-500/5 p-10 rounded-3xl border border-purple-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Users className="text-purple-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-0">User Accounts</h2>
              </div>
              <p className="text-lg leading-relaxed">
                When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-10">
              <section className="bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 p-10 rounded-3xl border border-violet-200/20">
                <div className="flex items-start gap-4 mb-6">
                  <Key className="text-violet-500 mt-1 h-8 w-8" />
                  <h2 className="text-3xl font-bold text-violet-600 dark:text-violet-400 mt-0">Content and Intellectual Property</h2>
                </div>
                <p className="leading-relaxed">
                  You retain all rights to your AI-generated content. By using our services, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content solely for the purpose of providing our services to you.
                </p>
              </section>
              
              <section className="bg-gradient-to-br from-fuchsia-500/5 to-pink-500/5 p-10 rounded-3xl border border-fuchsia-200/20">
                <div className="flex items-start gap-4 mb-6">
                  <AlertTriangle className="text-fuchsia-500 mt-1 h-8 w-8" />
                  <h2 className="text-3xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mt-0">Limitation of Liability</h2>
                </div>
                <p className="leading-relaxed">
                  To the maximum extent permitted by law, in no event shall OwnMyAI.biz, its affiliates, directors, employees, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses.
                </p>
              </section>
            </div>
            
            <section className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 p-10 rounded-3xl border border-pink-200/20">
              <div className="flex items-start gap-4 mb-6">
                <PenTool className="text-pink-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mt-0">Governing Law</h2>
              </div>
              <p className="text-lg leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-10 rounded-3xl border border-white/20 dark:border-white/5 text-center">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <a href="mailto:troy.latter@4pm.net.au" className="text-xl font-medium text-primary hover:underline">
                troy.latter@4pm.net.au
              </a>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
