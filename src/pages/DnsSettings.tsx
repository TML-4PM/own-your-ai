
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import GlassCard from '@/components/ui/GlassCard';
import { Copy, Globe, Server, Check, Info, AlertTriangle, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Define the types for DNS records and form values
type DnsRecordType = 'A' | 'CNAME' | 'TXT' | 'MX';

interface DnsRecord {
  type: DnsRecordType;
  name: string;
  value: string;
  ttl: string;
  description: string;
  priority?: string;
}

interface Domain {
  id: string;
  name: string;
  records: DnsRecord[];
}

interface NewARecordForm {
  name: string;
  value: string;
  ttl: string;
  description: string;
}

const DnsSettings = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: 'ownmyai',
      name: 'OwnMyAI.biz',
      records: [
        {
          type: 'A',
          name: '@',
          value: '76.76.21.21',
          ttl: '3600',
          description: 'Points to Vercel hosting IP'
        },
        {
          type: 'CNAME',
          name: 'www',
          value: 'cname.vercel-dns.com',
          ttl: '3600',
          description: 'Redirects www subdomain to main domain'
        },
        {
          type: 'TXT',
          name: '@',
          value: 'v=spf1 include:_spf.google.com ~all',
          ttl: '3600',
          description: 'SPF record for email authentication'
        },
        {
          type: 'MX',
          name: '@',
          value: 'aspmx.l.google.com',
          priority: '1',
          ttl: '3600',
          description: 'Primary mail exchange server'
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
          value: '76.76.21.21',
          ttl: '3600',
          description: 'Points to Vercel hosting IP'
        },
        {
          type: 'CNAME',
          name: 'www',
          value: 'cname.vercel-dns.com',
          ttl: '3600',
          description: 'Redirects www subdomain to main domain'
        },
        {
          type: 'TXT',
          name: '@',
          value: 'v=spf1 include:_spf.google.com ~all',
          ttl: '3600',
          description: 'SPF record for email authentication'
        },
        {
          type: 'MX',
          name: '@',
          value: 'aspmx.l.google.com',
          priority: '1',
          ttl: '3600',
          description: 'Primary mail exchange server'
        }
      ]
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('ownmyai');
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  const form = useForm<NewARecordForm>({
    defaultValues: {
      name: '',
      value: '',
      ttl: '3600',
      description: ''
    }
  });

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddRecord = (data: NewARecordForm) => {
    const newRecord: DnsRecord = {
      type: 'A',
      name: data.name,
      value: data.value,
      ttl: data.ttl,
      description: data.description
    };

    setDomains(prevDomains => 
      prevDomains.map(domain => 
        domain.id === activeTab 
          ? { ...domain, records: [...domain.records, newRecord] } 
          : domain
      )
    );

    setIsAddingRecord(false);
    form.reset();
    toast.success(`New A record added to ${domains.find(d => d.id === activeTab)?.name}`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">AWS Route 53 DNS Settings</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Configure your AWS Route 53 DNS settings for OwnMyAI.biz and OwnYourAI.biz domains to point to your hosting service.
          </p>
        </div>

        <div className="mb-12">
          <GlassCard className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Route 53 Setup Instructions</h3>
                <ol className="list-decimal list-inside space-y-3 ml-2 text-muted-foreground">
                  <li>Log into your AWS Management Console and navigate to Route 53 service.</li>
                  <li>In the Route 53 dashboard, click on "Hosted zones" in the left navigation menu.</li>
                  <li>Click "Create hosted zone", enter your domain name (e.g., ownmyai.biz), and click "Create".</li>
                  <li>After creating the hosted zone, you'll need to update your domain's name servers at your domain registrar to use AWS's name servers.</li>
                  <li>Find the NS (Name Server) records in your new hosted zone and copy them.</li>
                  <li>Go to your domain registrar's website and update the domain's name servers with the AWS name servers you copied.</li>
                  <li>Return to the Route 53 hosted zone and add the DNS records listed below for each domain.</li>
                </ol>
              </div>
            </div>
          </GlassCard>
        </div>

        <Tabs 
          defaultValue="ownmyai" 
          className="w-full max-w-4xl mx-auto"
          onValueChange={(value) => setActiveTab(value)}
        >
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Server size={20} />
                    {domain.name} Route 53 Records
                  </h2>
                  <button
                    onClick={() => setIsAddingRecord(!isAddingRecord)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
                  >
                    <Plus size={16} className="mr-2" />
                    Add A Record
                  </button>
                </div>
                
                {isAddingRecord && activeTab === domain.id && (
                  <div className="mb-6 p-4 border border-dashed rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Add New A Record</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleAddRecord)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormItem>
                            <FormLabel>Name (subdomain or @)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. @ or subdomain" {...form.register("name")} />
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormLabel>Value (IP Address)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 192.168.1.1" {...form.register("value")} />
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormLabel>TTL (seconds)</FormLabel>
                            <FormControl>
                              <Input placeholder="3600" {...form.register("ttl")} />
                            </FormControl>
                          </FormItem>
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Optional description" {...form.register("description")} />
                            </FormControl>
                          </FormItem>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsAddingRecord(false)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-green-500 bg-green-500 text-white hover:bg-green-600 h-9 px-4"
                          >
                            Add Record
                          </button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4">Type</th>
                        <th className="text-left py-4 px-4">Name</th>
                        <th className="text-left py-4 px-4">Value</th>
                        <th className="text-left py-4 px-4">TTL</th>
                        <th className="text-left py-4 px-4">Description</th>
                        <th className="text-left py-4 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domain.records.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-white/5">
                          <td className="py-4 px-4 font-medium">{record.type}</td>
                          <td className="py-4 px-4">{record.name}</td>
                          <td className="py-4 px-4 font-mono text-sm max-w-[200px] break-words">{record.value}</td>
                          <td className="py-4 px-4">{record.ttl}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{record.description}</td>
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
                    <h3 className="text-xl font-semibold mb-2">Important Notes for AWS Route 53</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>DNS propagation typically takes 24-48 hours after making changes in Route 53.</li>
                      <li>The A record points to your hosting service's IP address. Update this with your actual hosting IP.</li>
                      <li>You can create an alias A record instead if you're using AWS services like CloudFront or Elastic Load Balancer.</li>
                      <li>For CNAME records, make sure to use the fully qualified domain name (FQDN) with a trailing period.</li>
                      <li>If you're using AWS Certificate Manager for SSL, you'll need to validate domain ownership using either DNS validation (recommended) or email validation.</li>
                      <li>Route 53 charges a small monthly fee for each hosted zone ($0.50/month per hosted zone as of last update).</li>
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
