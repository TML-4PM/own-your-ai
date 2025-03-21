
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';

const TermsOfService = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: May 1, 2023</p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to OwnMyAI.biz. Please read these Terms of Service carefully before using our website and services.
            </p>
            
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            
            <h2>Use of Services</h2>
            <p>
              Our services are designed to help protect and monetize AI-generated content. You may use our services only as permitted by these terms and any applicable laws. You agree not to misuse our services or help anyone else do so.
            </p>
            
            <h2>User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account.
            </p>
            
            <h2>Content and Intellectual Property</h2>
            <p>
              You retain all rights to your AI-generated content. By using our services, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content solely for the purpose of providing our services to you.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event shall OwnMyAI.biz, its affiliates, directors, employees, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law provisions.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at: troy.latter@4pm.net.au
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
