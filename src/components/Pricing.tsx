import React, { useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import GlassCard from './ui/GlassCard';
import { Check, ArrowRight } from 'lucide-react';
import PaymentModal from './PaymentModal';

const PLANS = [
  {
    slug: 'ai-ownership-audit',
    name: 'AI Ownership Audit',
    description: 'Know exactly what AI tools you use, what they touch, and what you actually own.',
    price: 0,
    priceId: null,
    cta: 'Get the audit',
    ctaPath: '/audit',
    highlighted: false,
    features: [
      'Tool sprawl score',
      'Ownership risk score',
      'Next-step recommendation',
      'Instant delivery via email',
    ],
  },
  {
    slug: 'starter-kit',
    name: 'AI Ownership Starter Kit',
    description: 'Everything you need to map, register and govern your personal AI stack.',
    price: 29,
    priceId: 'price_1TCdlwD6fFdhmypRokr6gq8m',
    cta: 'Buy starter kit',
    ctaPath: null,
    highlighted: false,
    features: [
      'Personal AI stack worksheet',
      'Tool register template',
      'Prompt / workflow inventory',
      'Ownership checklist',
    ],
  },
  {
    slug: 'setup-session',
    name: 'Own Your AI Setup Session',
    description: '60-minute session to review your current stack and build your ownership plan.',
    price: 99,
    priceId: 'price_1TCdlyD6fFdhmypRuh29XHI8',
    cta: 'Book setup',
    ctaPath: null,
    highlighted: true,
    features: [
      'Current-state review',
      'Recommended stack',
      'Priority actions',
      '60-minute 1:1 session',
    ],
  },
  {
    slug: 'business-blueprint',
    name: 'Business AI Ownership Blueprint',
    description: 'Full AI estate map, governance recommendations and 90-day action plan for your business.',
    price: 499,
    priceId: 'price_1TCdlzD6fFdhmypRKpzIhq37',
    cta: 'Get the blueprint',
    ctaPath: null,
    highlighted: false,
    features: [
      'Discovery form',
      'AI estate map',
      'Governance & workflow recommendations',
      '90-day action plan',
    ],
  },
  {
    slug: 'enterprise-workshop',
    name: 'AI Ownership Workshop',
    description: 'Leadership workshop, governance view, operating model options and roadmap for your organisation.',
    price: null,
    priceId: null,
    cta: 'Talk to us',
    ctaPath: '/contact',
    highlighted: false,
    features: [
      'Leadership workshop',
      'Governance view',
      'Operating model options',
      'Roadmap',
    ],
  },
];

const Pricing: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; priceId: string | null }>({ name: '', price: 0, priceId: null });

  const handlePlanSelect = (plan: typeof PLANS[0]) => {
    if (plan.ctaPath) {
      window.location.href = plan.ctaPath;
      return;
    }
    if (plan.priceId) {
      setSelectedPlan({ name: plan.name, price: plan.price!, priceId: plan.priceId });
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-gradient-to-b from-transparent to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Own your AI stack</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From a free audit to a full business blueprint — start wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, index) => (
            <div
              key={plan.slug}
              className={`relative animate-fade-up ${plan.highlighted ? 'md:-mt-4 md:-mb-4 z-10' : ''}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}
              <GlassCard
                intensity={plan.highlighted ? 'heavy' : 'medium'}
                className={`p-8 h-full flex flex-col ${plan.highlighted ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                </div>
                <div className="mb-6">
                  {plan.price === null ? (
                    <div className="text-4xl font-bold">Enquire</div>
                  ) : plan.price === 0 ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">Free</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-sm text-muted-foreground mr-1">AUD</span>
                      <span className="text-4xl font-bold">${plan.price}</span>
                    </div>
                  )}
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <AnimatedButton
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full mt-auto flex items-center justify-center gap-2"
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        planName={selectedPlan.name}
        amount={selectedPlan.price * 100}
        priceId={selectedPlan.priceId}
      />
    </section>
  );
};

export default Pricing;
