
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About OwnMyAI.biz</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protecting your AI assets in an increasingly AI-driven world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                At OwnMyAI.biz, we believe that the creators of AI content deserve the same protection and ownership rights as creators of traditional content. Our mission is to provide comprehensive tools that help businesses and individuals protect, manage, and monetize their AI-generated intellectual property.
              </p>
              <p className="text-lg mb-6">
                In a world where AI-generated content is becoming increasingly prevalent, protecting your AI assets has never been more important. We're here to ensure that your innovative AI creations remain yours.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 rounded-2xl p-10 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">AI</div>
                <div className="text-2xl">Protection Experts</div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p>We continuously evolve our technology to stay ahead of emerging threats to AI intellectual property.</p>
              </div>
              
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4">Integrity</h3>
                <p>We operate with transparency and honesty in all our dealings with clients and partners.</p>
              </div>
              
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4">Empowerment</h3>
                <p>We believe in giving creators the tools they need to maintain control over their AI-generated content.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to protect your AI assets?</h2>
            <Link to="/pricing">
              <AnimatedButton className="group">
                <span>View our pricing plans</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
