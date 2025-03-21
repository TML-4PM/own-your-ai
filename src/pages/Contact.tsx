import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlurredBackground from "@/components/BlurredBackground";
import { Mail, Send, X, MessageSquare } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const contactEmail = 'info@ownyourai.biz';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData, 'to', contactEmail);
      toast({
        title: "Message Sent",
        description: `Thank you for your message. We'll get back to you as soon as possible.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-600 text-sm font-medium mb-6">
              We're Here To Help
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our services? We're here to help you protect your AI assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-indigo-500/20 p-3 rounded-full mr-5">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-purple-600 font-medium">{contactEmail}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      For all inquiries, please email us directly. We aim to respond to all messages within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-3 rounded-full mr-5">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Phone</h3>
                    <p className="text-purple-600 font-medium">+1 (888) AI-PROTECT</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Available Monday through Friday, 9am to 6pm AEST.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-500/20 p-3 rounded-full mr-5">
                    <MapPin className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p className="text-pink-600 font-medium">Sydney, Australia</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Servicing clients globally from our headquarters in Australia.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                  Business Hours
                </h3>
                <p className="text-muted-foreground mb-2">Monday - Friday: 9:00 AM - 6:00 PM AEST</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-background/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-background/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md bg-background/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                
                <div>
                  <AnimatedButton type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Find quick answers to common questions about our AI protection services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  question: "How does your AI protection system work?",
                  answer: "Our system uses advanced machine learning algorithms to continuously scan the web for unauthorized use of your AI assets. When detected, we generate automated takedown notices and help enforce your ownership rights."
                },
                {
                  question: "What types of AI assets can you protect?",
                  answer: "We can protect a wide range of AI assets including generated text, images, voice models, LLMs, and other forms of AI-created intellectual property."
                },
                {
                  question: "How quickly can you respond to unauthorized use?",
                  answer: "Our monitoring system operates 24/7, and our automated takedown system typically initiates the removal process within 24 hours of detection."
                },
                {
                  question: "Do you offer customized protection plans?",
                  answer: "Yes, we offer tailored protection solutions based on the specific needs of your business and the types of AI assets you've created."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="flex items-start text-lg font-semibold mb-3">
                    <HelpCircle className="h-5 w-5 mr-2 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
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
              <div className="flex justify-end">
                <div className="bg-indigo-500/20 text-indigo-800 p-3 rounded-lg inline-block max-w-[80%]">
                  <p className="text-sm">This is a demo of our live chat feature.</p>
                  <span className="text-xs text-indigo-600/70 mt-1 block">You, just now</span>
                </div>
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
      
      <Footer />
    </div>
  );
};

export default Contact;
