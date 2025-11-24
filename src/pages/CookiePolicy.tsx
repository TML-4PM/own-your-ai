
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Cookie, Settings, Info, Eye } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Cookie Policy</h1>
            <p className="text-muted-foreground text-lg">Last updated: May 1, 2023</p>
          </div>
          
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
              <div className="md:w-1/2">
                <p className="text-lg mb-6 leading-relaxed">
                  This Cookie Policy explains how OwnMyAI.biz uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>
              </div>
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                  alt="Digital code visualization" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
            <section className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-10 rounded-3xl border border-indigo-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Cookie className="text-indigo-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-0">What Are Cookies</h2>
              </div>
              <p className="text-lg leading-relaxed">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
            </section>
            
            <section className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-10 rounded-3xl border border-blue-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Info className="text-blue-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-0">Why We Use Cookies</h2>
              </div>
              <p className="text-lg leading-relaxed">
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics and other purposes.
              </p>
            </section>
            
            <section className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-10 rounded-3xl border border-purple-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Settings className="text-purple-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-0">Types of Cookies We Use</h2>
              </div>
              <p className="text-lg mb-6 leading-relaxed">
                The types of cookies we use include:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-white/5 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Essential cookies</h3>
                  <p>These cookies are strictly necessary to provide you with services available through our website.</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Performance cookies</h3>
                  <p>These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">Analytics cookies</h3>
                  <p>These cookies collect information that is used to help us understand how our website is being used or how effective our marketing campaigns are.</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">Advertising cookies</h3>
                  <p>These cookies are used to make advertising messages more relevant to you and your interests.</p>
                </div>
              </div>
            </section>
            
            <section className="bg-gradient-to-br from-cyan-500/5 to-teal-500/5 p-10 rounded-3xl border border-cyan-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Eye className="text-cyan-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-0">How to Control Cookies</h2>
              </div>
              <p className="text-lg leading-relaxed">
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>
            </section>
            
            <section className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 p-10 rounded-3xl border border-teal-200/20">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="text-teal-500 mt-1 h-8 w-8" />
                <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mt-0">Changes to This Cookie Policy</h2>
              </div>
              <p className="text-lg leading-relaxed">
                We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </section>
            
            <section className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-10 rounded-3xl border border-white/20 dark:border-white/5 text-center">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg mb-4">
                If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default CookiePolicy;
