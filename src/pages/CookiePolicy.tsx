
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';

const CookiePolicy = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: May 1, 2023</p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              This Cookie Policy explains how OwnMyAI.biz uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            
            <h2>Why We Use Cookies</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics and other purposes.
            </p>
            
            <h2>Types of Cookies We Use</h2>
            <p>
              The types of cookies we use include:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> These cookies are strictly necessary to provide you with services available through our website.</li>
              <li><strong>Performance cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
              <li><strong>Analytics cookies:</strong> These cookies collect information that is used to help us understand how our website is being used or how effective our marketing campaigns are.</li>
              <li><strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you and your interests.</li>
            </ul>
            
            <h2>How to Control Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            
            <h2>Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at: troy.latter@4pm.net.au
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
