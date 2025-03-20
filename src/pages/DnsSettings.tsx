
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import GlassCard from '@/components/ui/GlassCard';
import { Copy, Globe, Server, Check, Info } from 'lucide-react';
import { useState } from 'react';

const DnsSettings = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const domains = [
    {
      id: 'ownmyai',
      name: 'OwnMyAI.biz',
      records: [
        {
          type: 'A',
          name: '@',
          value: '192.168.1.100',
          ttl: '3600'
        },
        {
          type: 'CNAME',
          name: 'www',
          value: '@',
          ttl: '3600'
        },
        {
          type: 'MX',
          name: '@',
          value: 'mail.ownmyai.biz',
          priority: '10',
          ttl: '3600'
        },
        {
          type: 'TXT',
          name: '@',
          value: 'v=spf1 include:_spf.ownmyai.biz ~all',
          ttl: '3600'
        }
      ]
    },
    {
      id: 'ownyourai',
      name: 'OwnYourAI.biz',
      records: [
        {
          type: 'A',
          name: '@',
          value: '192.168.1.200',
          ttl: '3600'
        },
        {
          type: 'CNAME',
          name: 'www',
          value: '@',
          ttl: '3600'
        },
        {
          type: 'MX',
          name: '@',
          value: 'mail.ownyourai.biz',
          priority: '10',
          ttl: '3600'
        },
        {
          type: 'TXT',
          name: '@',
          value: 'v=spf1 include:_spf.ownyourai.biz ~all',
          ttl: '3600'
        }
      ]
    }
  ];

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">DNS Settings</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure your DNS settings for OwnMyAI.biz and OwnYourAI.biz domains to ensure proper connectivity.
          </p>
        </div>

        <Tabs defaultValue="ownmyai" className="w-full max-w-4xl mx-auto">
          <TabsList className="mb-8 w-full justify-center">
            <TabsTrigger value="ownmyai" className="flex items-center gap-2 px-4 py-2">
              <Globe size={20} />
              OwnMyAI.biz
            </TabsTrigger>
            <TabsTrigger value="ownyourai" className="flex items-center gap-2 px-4 py-2">
              <Globe size={20} />
              OwnYourAI.biz
            </TabsTrigger>
          </TabsList>

          {domains.map((domain) => (
            <TabsContent key={domain.id} value={domain.id} className="space-y-8">
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Server size={20} />
                  {domain.name} DNS Records
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4">Type</th>
                        <th className="text-left py-4 px-4">Name</th>
                        <th className="text-left py-4 px-4">Value</th>
                        <th className="text-left py-4 px-4">TTL</th>
                        <th className="text-left py-4 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domain.records.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-white/5">
                          <td className="py-4 px-4 font-medium">{record.type}</td>
                          <td className="py-4 px-4">{record.name}</td>
                          <td className="py-4 px-4 font-mono text-sm">{record.value}</td>
                          <td className="py-4 px-4">{record.ttl}</td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => copyToClipboard(record.value, `${domain.id}-${index}`)}
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                              title="Copy value"
                            >
                              {copiedField === `${domain.id}-${index}` ? (
                                <Check size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <Info size={24} className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Important Notes</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>DNS changes typically take 24-48 hours to fully propagate across the internet.</li>
                      <li>The A record points to your server's IP address.</li>
                      <li>The CNAME record directs the www subdomain to your main domain.</li>
                      <li>MX records are required for email delivery.</li>
                      <li>TXT records are used for domain verification and email security.</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default DnsSettings;
