
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: May 1, 2023</p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              At OwnMyAI.biz, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI protection services.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Register for an account</li>
              <li>Submit AI content for protection</li>
              <li>Contact our customer support</li>
              <li>Subscribe to our newsletter</li>
              <li>Respond to surveys or questionnaires</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We may use the information we collect from you to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
            
            <h2>Information Sharing and Disclosure</h2>
            <p>
              We do not share, sell, or otherwise disclose your personal information for purposes other than those outlined in this Privacy Policy. However, we may disclose your personal information to our service providers that we have engaged to perform business-related functions on our behalf.
            </p>
            
            <h2>Security</h2>
            <p>
              We use reasonable administrative, technical, and physical security measures designed to safeguard and protect your information from unauthorized access, disclosure, alteration, and destruction. However, no system is 100% secure, and we cannot guarantee the absolute security of your information.
            </p>
            
            <h2>Your Choices</h2>
            <p>
              You may update, correct, or delete your account information at any time by logging into your account or contacting us. You can also opt-out of receiving promotional emails from us by following the instructions in those emails.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our website prior to the change becoming effective.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: troy.latter@4pm.net.au
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
