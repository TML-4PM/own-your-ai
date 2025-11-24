
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Mail } from 'lucide-react';

const CONTACT_EMAIL = 'troy.latter@4pm.net.au';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "AI Protection Specialist",
      department: "Technology",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 3,
      title: "IP Law Consultant",
      department: "Legal",
      location: "Remote",
      type: "Part-time"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Careers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us in revolutionizing AI protection and monetization
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Why Work With Us</h2>
              
              <div className="space-y-8">
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Innovative Technology</h3>
                  <p className="text-muted-foreground">
                    Work on cutting-edge AI protection systems and blockchain verification technologies that are defining a new industry.
                  </p>
                </div>
                
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Remote-First Culture</h3>
                  <p className="text-muted-foreground">
                    We embrace flexible working arrangements and have built our company culture around successful remote collaboration.
                  </p>
                </div>
                
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
                  <p className="text-muted-foreground">
                    As a growing company in an emerging field, there are abundant opportunities for professional development and career advancement.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
              
              {openPositions.length > 0 ? (
                <div className="space-y-6">
                  {openPositions.map(position => (
                    <div key={position.id} className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {position.department}
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {position.location}
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {position.type}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        We're looking for talented individuals passionate about AI protection to join our growing team.
                      </p>
                      
                      <AnimatedButton variant="secondary" className="w-full">
                        Apply for this position
                      </AnimatedButton>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    We don't have any open positions at the moment, but we're always looking for talented individuals.
                  </p>
                  <p className="text-muted-foreground">
                    Send your resume to {CONTACT_EMAIL} and we'll keep it on file.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Don't See a Suitable Position?</h2>
            <p className="text-muted-foreground mb-6">
              We're always interested in connecting with talented individuals who are passionate about AI protection and intellectual property.
            </p>
            
            <div className="flex justify-center">
              <a 
                href={`mailto:${CONTACT_EMAIL}`} 
                className="inline-flex items-center text-primary hover:underline"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>Send your resume to {CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
