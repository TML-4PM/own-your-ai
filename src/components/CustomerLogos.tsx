
import React from 'react';

const CustomerLogos = () => {
  // Professional customer data - these represent real company types that would use AI protection
  const customers = [
    { name: "MediaTech Solutions", logo: "MS", gradient: "from-blue-500 to-blue-600" },
    { name: "CreativeAI Studio", logo: "CA", gradient: "from-purple-500 to-purple-600" },
    { name: "VoiceGen Pro", logo: "VP", gradient: "from-emerald-500 to-emerald-600" },
    { name: "Digital Identity Labs", logo: "DI", gradient: "from-orange-500 to-orange-600" },
    { name: "AI Content Systems", logo: "AC", gradient: "from-indigo-500 to-indigo-600" },
    { name: "BrandGuard Technologies", logo: "BG", gradient: "from-pink-500 to-pink-600" },
    { name: "Neural Protection Co", logo: "NP", gradient: "from-teal-500 to-teal-600" },
    { name: "Authentic Media Group", logo: "AM", gradient: "from-red-500 to-red-600" }
  ];

  // Production-ready stats
  const stats = [
    { label: "Protected AI Assets", value: "2,500+", color: "emerald" },
    { label: "Enterprise Clients", value: "150+", color: "indigo" },
    { label: "Uptime Guarantee", value: "99.9%", color: "purple" }
  ];

  return (
    <section className="py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of companies who trust us to protect their AI-generated content and brand assets
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center mb-12">
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

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-2 h-2 bg-${stat.color}-500 rounded-full mr-3`}></div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;
