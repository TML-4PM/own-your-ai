import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Shield, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Troy Latter",
      role: "Founder & CEO",
      bio: "Tech entrepreneur with 15+ years in digital IP, cloud infrastructure, and AI systems. Based in Sydney, Australia.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      linkedin: "https://linkedin.com/in/theinnovater",
    },
  ];

  const values = [
    {
      icon: <Zap className="h-6 w-6 text-indigo-500" />,
      title: "Innovation",
      description: "We continuously evolve our technology to stay ahead of emerging threats to AI intellectual property.",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "Integrity",
      description: "We operate with transparency and honesty in all our dealings with clients and partners.",
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      title: "Empowerment",
      description: "We believe in giving creators the tools they need to maintain control over their AI-generated content.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About OwnMyAI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protecting your AI assets in an increasingly AI-driven world
            </p>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-4">
                At OwnMyAI, we believe that the creators of AI content deserve the same protection and
                ownership rights as creators of traditional content. Our mission is to provide comprehensive
                tools that help businesses and individuals protect, manage, and monetize their AI-generated
                intellectual property.
              </p>
              <p className="text-lg text-muted-foreground">
                In a world where AI-generated content is becoming increasingly prevalent, protecting your
                AI assets has never been more important. We're here to ensure that your innovative AI
                creations remain yours.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 rounded-2xl p-10 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">AI</div>
                <div className="text-2xl">Protection Experts</div>
                <div className="text-sm text-muted-foreground mt-2">Based in Sydney, Australia</div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-4 text-center">Meet the Founder</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              OwnMyAI is built by practitioners who have lived the problem of AI IP protection first-hand.
            </p>
            <div className="flex justify-center">
              {team.map((member, i) => (
                <div key={i} className="max-w-sm text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
                  />
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    LinkedIn &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-background/50">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-16 border-t border-border">
            <h2 className="text-3xl font-bold mb-4">Ready to protect your AI assets?</h2>
            <Link
              to="/pricing"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View our pricing plans
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
