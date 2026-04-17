import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const CustomerLogos = () => {
  // Placeholder partner names — replace with real client logos once partnerships confirmed
  const customers = [
    { name: "VoiceStack AI" },
    { name: "DeepLayer" },
    { name: "Synthera" },
    { name: "Promptly" },
    { name: "ArcLight Media" },
    { name: "Orion AI" },
    { name: "FluxMind" },
    { name: "Luminary Labs" },
  ];

  const stats = [
    { label: "Protected AI Assets", value: "500+" },
    { label: "Businesses Protected", value: "150+" },
    { label: "Uptime Guarantee", value: "99.9%" }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(autoplay, 2500);
    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  return (
    <section className="py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Trusted by Growing AI Businesses</h2>
          <p className="text-muted-foreground">
            Join businesses who trust us to protect their AI-generated content and brand assets
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {[...customers, ...customers].map((customer, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-8 py-4 rounded-lg border border-border/50 bg-background/50"
              >
                <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                  {customer.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;
