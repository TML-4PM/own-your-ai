
import React from 'react';

const CustomerLogos = () => {
  // Mock customer data - in a real app, these would be actual customer logos
  const customers = [
    { name: "TechVision AI", logo: "TV", gradient: "from-indigo-500 to-indigo-600" },
    { name: "NeuralVoice", logo: "NV", gradient: "from-purple-500 to-purple-600" },
    { name: "Future Media", logo: "FM", gradient: "from-pink-500 to-pink-600" },
    { name: "Creative AI", logo: "CA", gradient: "from-emerald-500 to-emerald-600" },
    { name: "LangChain Tech", logo: "LT", gradient: "from-blue-500 to-blue-600" },
    { name: "Neural Creations", logo: "NC", gradient: "from-amber-500 to-amber-600" },
    { name: "AI Innovations", logo: "AI", gradient: "from-teal-500 to-teal-600" },
    { name: "Voice Tech Pro", logo: "VT", gradient: "from-rose-500 to-rose-600" }
  ];

  return (
    <section className="py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by Leading AI Companies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join over 1,000+ AI creators and companies who trust us to protect their digital assets
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {customers.map((customer, index) => (
            <div 
              key={index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${customer.gradient} flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                <span className="text-white font-bold text-lg">{customer.logo}</span>
              </div>
              <span className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors">
                {customer.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              <span>1000+ Protected Assets</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
              <span>99.7% Uptime</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;
