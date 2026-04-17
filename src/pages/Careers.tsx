import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

const CONTACT_EMAIL = 'hello@ownmyai.info';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "AI Ownership Consultant",
      department: "Advisory",
      location: "Remote",
      type: "Contract"
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      id: 3,
      title: "AI Governance Specialist",
      department: "Strategy",
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
              Join us in helping people and businesses take back ownership of their AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-6 rounded-xl border border-border bg-background/50">
              <h3 className="text-xl font-bold mb-3">Innovative Work</h3>
              <p className="text-muted-foreground">Work on one of the most important emerging challenges in tech: AI ownership and governance.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-background/50">
              <h3 className="text-xl font-bold mb-3">Remote-First Culture</h3>
              <p className="text-muted-foreground">We're fully remote and built our culture around flexibility, autonomy, and output.</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-background/50">
              <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
              <p className="text-muted-foreground">Early team members grow with the company. Shape the product, strategy, and culture from day one.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Open Positions</h2>

            {openPositions.length > 0 ? (
              <div className="space-y-4">
                {openPositions.map(position => (
                  <div key={position.id} className="p-6 rounded-xl border border-border bg-background/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">{position.department}</span>
                          <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">{position.location}</span>
                          <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">{position.type}</span>
                        </div>
                        <p className="text-muted-foreground mt-3 text-sm">
                          We're looking for passionate people who care about AI ownership to join our growing team.
                        </p>
                      </div>
                      <a
                        href={`mailto:${CONTACT_EMAIL}?subject=Application: ${position.title}`}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                      >
                        <Mail className="h-4 w-4" />
                        Apply for this position
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-border rounded-xl">
                <p className="text-muted-foreground mb-4">
                  We don't have any open positions at the moment, but we're always looking for talented individuals.
                </p>
                <p className="text-muted-foreground">Send your resume to {CONTACT_EMAIL} and we'll keep it on file.</p>
              </div>
            )}
          </div>

          <div className="mt-16 text-center p-8 rounded-xl border border-border bg-background/50">
            <h3 className="text-xl font-bold mb-2">Don't See a Suitable Position?</h3>
            <p className="text-muted-foreground mb-6">
              We're always interested in connecting with talented people who care about AI ownership and governance.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Send your resume to {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
