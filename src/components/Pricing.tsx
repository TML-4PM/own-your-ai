
import React, { useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import GlassCard from './ui/GlassCard';
import { Check } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number | string }>({ name: '', price: 0 });
  
  const plans = [
    {
      name: "Basic Protection",
      description: "Essential protection for individuals and small businesses",
      price: annual ? 990 : 99,
      features: [
        "AI content monitoring",
        "Basic takedown assistance",
        "Monthly reports",
        "Email support",
        "Up to 5 AI assets"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      description: "Advanced protection for growing businesses",
      price: annual ? 2990 : 299,
      features: [
        "Everything in Basic",
        "Priority takedowns",
        "Weekly reports",
        "Phone support",
        "License management",
        "Up to 50 AI assets",
        "Analytics dashboard"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "Complete protection for large organizations",
      price: "Contact us",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom API integration",
        "Daily reports",
        "24/7 support",
        "Unlimited AI assets",
        "Advanced analytics"
      ],
      highlighted: false
    }
  ];

  const handlePlanSelect = (plan: { name: string; price: number | string }) => {
    if (plan.price === "Contact us") {
      // Navigate to contact page for enterprise plan
      window.location.href = "/contact";
      return;
    }
    
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-gradient-to-b from-transparent to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your AI protection needs
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${!annual ? 'font-medium' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                annual ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => setAnnual(!annual)}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  annual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${annual ? 'font-medium' : 'text-muted-foreground'}`}>
              Annual <span className="text-xs ml-1 text-primary">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative animate-fade-up ${plan.highlighted ? 'md:-mt-4 md:-mb-4 z-10' : ''}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              
              <GlassCard
                intensity={plan.highlighted ? 'heavy' : 'medium'}
                className={`p-8 h-full flex flex-col ${
                  plan.highlighted ? 'border-primary/50 shadow-lg shadow-primary/10' : ''
                }`}
              >
                <div className="mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-full inline-flex mb-4">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  {typeof plan.price === 'number' ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-2">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">{plan.price}</div>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <AnimatedButton 
                  variant={plan.highlighted ? 'primary' : 'secondary'} 
                  className="w-full mt-auto"
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Select'}
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
        amount={typeof selectedPlan.price === 'number' ? selectedPlan.price * 100 : 0}
      />
    </section>
  );
};

export default Pricing;
