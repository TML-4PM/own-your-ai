import React, { useRef, useEffect } from 'react';
import GlassCard from './ui/GlassCard';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
  rating: number;
  gradient: string;
  textColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "After implementing OwnMyAI's protection, our unauthorized model usage dropped by 82% in just three months. The ROI has been incredible.",
    author: "Sarah Chen",
    position: "CTO",
    company: "TechVision AI",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop",
    rating: 5,
    gradient: "bg-gradient-to-br from-indigo-500/20 to-indigo-700/10",
    textColor: "text-indigo-500"
  },
  {
    quote: "The licensing marketplace opened revenue streams we hadn't considered. Our voice models now generate significant passive income.",
    author: "Michael Rodriguez",
    position: "Founder",
    company: "NeuralVoice",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
    rating: 5,
    gradient: "bg-gradient-to-br from-purple-500/20 to-purple-700/10",
    textColor: "text-purple-500"
  },
  {
    quote: "Their blockchain verification system provided the proof we needed in a legal dispute over our AI assets. It saved us over $300,000 in potential losses.",
    author: "Aisha Johnson",
    position: "Head of Innovation",
    company: "Future Media Group",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2787&auto=format&fit=crop",
    rating: 5,
    gradient: "bg-gradient-to-br from-pink-500/20 to-pink-700/10",
    textColor: "text-pink-500"
  },
  {
    quote: "The takedown process is seamless. When our AI-generated content was stolen, the system detected it within hours and had it removed within a day.",
    author: "James Wilson",
    position: "CEO",
    company: "Creative AI Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    rating: 4,
    gradient: "bg-gradient-to-br from-emerald-500/20 to-emerald-700/10",
    textColor: "text-emerald-500"
  },
  {
    quote: "Their AI agents detected unauthorized use of our language model on 27 different websites. The automated takedown process saved us countless hours.",
    author: "Elena Kim",
    position: "IP Director",
    company: "LangChain Technologies",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2761&auto=format&fit=crop",
    rating: 5,
    gradient: "bg-gradient-to-br from-blue-500/20 to-blue-700/10",
    textColor: "text-blue-500"
  },
  {
    quote: "The custom protection plan for our AI-generated art has been a game-changer. We've reduced theft by 75% and increased legitimate licensing by 40%.",
    author: "David Ortiz",
    position: "Art Director",
    company: "Neural Creations",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2760&auto=format&fit=crop",
    rating: 5,
    gradient: "bg-gradient-to-br from-amber-500/20 to-amber-700/10",
    textColor: "text-amber-500"
  }
];

interface Props {
  className?: string;
  limit?: number;
}

const CustomerTestimonials: React.FC<Props> = ({ className = "", limit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const delay = index * 150;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, delay);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <section ref={containerRef} className={`py-24 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
          alt="Technology background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Success Stories</p>
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the companies who have successfully protected and monetized their AI assets with our comprehensive solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GlassCard className={`h-full p-6 ${testimonial.gradient}`}>
                <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
                <Quote className={`h-6 w-6 ${testimonial.textColor} mb-3 opacity-60`} />
                <p className="text-foreground/90 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/resources" className="text-primary hover:underline font-medium">Explore our resources &rarr;</a>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
