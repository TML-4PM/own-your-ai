
import React, { useRef, useEffect } from 'react';
import GlassCard from './ui/GlassCard';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  gradient: string;
  textColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The AI brand protection service has been a game-changer for our company. We've seen unauthorized uses drop by 75% in the first month.",
    author: "Sarah Chen",
    position: "CMO",
    company: "TechVision AI",
    gradient: "bg-gradient-to-br from-indigo-500/20 to-indigo-700/10",
    textColor: "text-indigo-500"
  },
  {
    quote: "As an AI-first startup, protecting our digital assets was becoming a nightmare until we found this platform. Worth every penny.",
    author: "Michael Rodriguez",
    position: "Founder",
    company: "NeuralVoice",
    gradient: "bg-gradient-to-br from-purple-500/20 to-purple-700/10",
    textColor: "text-purple-500"
  },
  {
    quote: "The licensing marketplace has opened new revenue streams we hadn't even considered. Our AI voice models are now generating passive income.",
    author: "Aisha Johnson",
    position: "Head of Innovation",
    company: "Future Media Group",
    gradient: "bg-gradient-to-br from-pink-500/20 to-pink-700/10",
    textColor: "text-pink-500"
  }
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          // Calculate delay based on index for staggered animation
          const delay = index * 150;
          
          // Apply staggered animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, delay);
        });
      }
    };

    // Initialize
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-6 md:px-8 overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
          alt="Technology background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the companies who have successfully protected and monetized their AI assets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GlassCard className={`h-full p-8 flex flex-col ${testimonial.gradient}`}>
                <Quote className={`h-8 w-8 ${testimonial.textColor} mb-4`} />
                <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className={`text-sm ${testimonial.textColor}`}>
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
