
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { Shield, Lock, Share2, Settings, User, Bell } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">Last updated: May 1, 2023</p>
          </div>
          
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
              <div className="md:w-1/2">
                <p className="text-lg mb-6 leading-relaxed">
                  At OwnMyAI.biz, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI protection services.
                </p>
              </div>
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
                  alt="AI technology visualization" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
            <section className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-10 rounded-3xl border border-cyan-200/20">
              <div className="flex items-start gap-4 mb-6">
                <User className="text-cyan-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-0">Information We Collect</h2>
              </div>
              <p className="text-lg mb-4 leading-relaxed">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 pl-0">
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-cyan-500 mr-2">•</span> Register for an account
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-cyan-500 mr-2">•</span> Submit AI content for protection
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-cyan-500 mr-2">•</span> Contact our customer support
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-cyan-500 mr-2">•</span> Subscribe to our newsletter
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-cyan-500 mr-2">•</span> Respond to surveys or questionnaires
                </li>
              </ul>
            </section>
            
            <section className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 p-10 rounded-3xl border border-blue-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Settings className="text-blue-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-0">How We Use Your Information</h2>
              </div>
              <p className="text-lg mb-4 leading-relaxed">
                We may use the information we collect from you to:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 pl-0">
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-blue-500 mr-2">•</span> Provide, maintain, and improve our services
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-blue-500 mr-2">•</span> Process and complete transactions
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-blue-500 mr-2">•</span> Send you technical notices and support messages
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-blue-500 mr-2">•</span> Respond to your comments and questions
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-blue-500 mr-2">•</span> Develop new products and services
                </li>
                <li className="bg-white/50 dark:bg-white/5 p-4 rounded-xl flex items-center">
                  <span className="text-blue-500 mr-2">•</span> Monitor and analyze trends and usage
                </li>
              </ul>
            </section>
            
            <section className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-10 rounded-3xl border border-indigo-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Share2 className="text-indigo-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-0">Information Sharing and Disclosure</h2>
              </div>
              <p className="text-lg leading-relaxed">
                We do not share, sell, or otherwise disclose your personal information for purposes other than those outlined in this Privacy Policy. However, we may disclose your personal information to our service providers that we have engaged to perform business-related functions on our behalf.
              </p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-10">
              <section className="bg-gradient-to-br from-purple-500/5 to-violet-500/5 p-10 rounded-3xl border border-purple-200/20">
                <div className="flex items-start gap-4 mb-6">
                  <Lock className="text-purple-500 mt-1 h-8 w-8" />
                  <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-0">Security</h2>
                </div>
                <p className="leading-relaxed">
                  We use reasonable administrative, technical, and physical security measures designed to safeguard and protect your information from unauthorized access, disclosure, alteration, and destruction. However, no system is 100% secure, and we cannot guarantee the absolute security of your information.
                </p>
              </section>
              
              <section className="bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 p-10 rounded-3xl border border-violet-200/20">
                <div className="flex items-start gap-4 mb-6">
                  <Bell className="text-violet-500 mt-1 h-8 w-8" />
                  <h2 className="text-3xl font-bold text-violet-600 dark:text-violet-400 mt-0">Your Choices</h2>
                </div>
                <p className="leading-relaxed">
                  You may update, correct, or delete your account information at any time by logging into your account or contacting us. You can also opt-out of receiving promotional emails from us by following the instructions in those emails.
                </p>
              </section>
            </div>
            
            <section className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-10 rounded-3xl border border-white/20 dark:border-white/5 text-center">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
