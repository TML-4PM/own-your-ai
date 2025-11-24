
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight, Calculator, Download, HelpCircle } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from '@/components/ui/use-toast';

const ROICalculator = () => {
  const [values, setValues] = useState({
    assetValue: 500000,
    unauthorizedUses: 30,
    averageLoss: 10000,
    protectionCost: 2000,
    monthlySubscription: 499,
    recoveryRate: 70,
    growthRate: 5
  });

  const [results, setResults] = useState({
    potentialLosses: 0,
    annualProtectionCost: 0,
    netSavings: 0,
    roi: 0,
    recoveredRevenue: 0
  });

  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Calculate results whenever inputs change
  useEffect(() => {
    const potentialLosses = values.unauthorizedUses * values.averageLoss;
    const annualProtectionCost = values.protectionCost + (values.monthlySubscription * 12);
    const recoveredRevenue = potentialLosses * (values.recoveryRate / 100);
    const netSavings = recoveredRevenue - annualProtectionCost;
    const roi = annualProtectionCost > 0 ? (netSavings / annualProtectionCost) * 100 : 0;

    setResults({
      potentialLosses,
      annualProtectionCost,
      netSavings,
      roi,
      recoveredRevenue
    });
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your ROI calculation report has been downloaded.",
    });
  };

  // Chart data
  const comparisonData = [
    { name: 'Without Protection', value: values.unauthorizedUses * values.averageLoss },
    { name: 'With Protection', value: results.annualProtectionCost }
  ];

  const projectionData = Array.from({ length: 5 }, (_, i) => {
    const yearGrowth = Math.pow(1 + values.growthRate / 100, i);
    return {
      year: `Year ${i + 1}`,
      losses: Math.round(values.unauthorizedUses * values.averageLoss * yearGrowth),
      protection: results.annualProtectionCost,
      savings: Math.round(results.netSavings * yearGrowth)
    };
  });

  const COLORS = ['#ef4444', '#10b981', '#6366f1', '#8b5cf6'];

  const tooltips = {
    assetValue: "The estimated total value of your AI-generated assets including models, content, and intellectual property.",
    unauthorizedUses: "The number of times your AI assets are used without authorization annually.",
    averageLoss: "The average financial impact per unauthorized use, including lost revenue and brand value.",
    protectionCost: "One-time setup costs for implementing AI protection.",
    monthlySubscription: "Monthly subscription fee for our AI protection service.",
    recoveryRate: "Percentage of potential losses that can be prevented or recovered through protection.",
    growthRate: "Expected annual growth rate of your AI assets and potential unauthorized uses."
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-600 text-sm font-medium mb-6">
              Financial Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Protection ROI Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate your potential return on investment from implementing our AI protection services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Calculator Inputs */}
            <div className="lg:col-span-1 bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h2 className="text-2xl font-bold mb-6">Input Your Values</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">AI Asset Value ($)</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('assetValue')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'assetValue' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.assetValue}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="number"
                    name="assetValue"
                    value={values.assetValue}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Annual Unauthorized Uses</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('unauthorizedUses')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'unauthorizedUses' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.unauthorizedUses}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                      type="range"
                      name="unauthorizedUses"
                      min="1"
                      max="100"
                      value={values.unauthorizedUses}
                      onChange={handleSliderChange}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    name="unauthorizedUses"
                    value={values.unauthorizedUses}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Average Loss per Incident ($)</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('averageLoss')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'averageLoss' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.averageLoss}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="number"
                    name="averageLoss"
                    value={values.averageLoss}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Protection Setup Cost ($)</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('protectionCost')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'protectionCost' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.protectionCost}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="number"
                    name="protectionCost"
                    value={values.protectionCost}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Monthly Subscription ($)</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('monthlySubscription')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'monthlySubscription' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.monthlySubscription}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="number"
                    name="monthlySubscription"
                    value={values.monthlySubscription}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Recovery Rate (%)</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('recoveryRate')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'recoveryRate' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.recoveryRate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                      type="range"
                      name="recoveryRate"
                      min="0"
                      max="100"
                      value={values.recoveryRate}
                      onChange={handleSliderChange}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    name="recoveryRate"
                    value={values.recoveryRate}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Annual Growth Rate (%)</label>
                    <div className="relative">
                      <HelpCircle 
                        className="h-4 w-4 text-muted-foreground cursor-help"
                        onMouseEnter={() => setShowTooltip('growthRate')}
                        onMouseLeave={() => setShowTooltip(null)}
                      />
                      {showTooltip === 'growthRate' && (
                        <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
                          {tooltips.growthRate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                      type="range"
                      name="growthRate"
                      min="0"
                      max="25"
                      value={values.growthRate}
                      onChange={handleSliderChange}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>12.5%</span>
                      <span>25%</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    name="growthRate"
                    value={values.growthRate}
                    onChange={handleChange}
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Results and Visualization */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary Results */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-indigo-500" />
                  Your ROI Summary
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-indigo-500/10 rounded-lg p-4 text-center">
                    <div className="text-indigo-600 text-sm font-medium mb-1">Potential Losses</div>
                    <div className="text-2xl font-bold">${results.potentialLosses.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-red-500/10 rounded-lg p-4 text-center">
                    <div className="text-red-600 text-sm font-medium mb-1">Protection Cost</div>
                    <div className="text-2xl font-bold">${results.annualProtectionCost.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-4 text-center">
                    <div className="text-green-600 text-sm font-medium mb-1">Net Savings</div>
                    <div className="text-2xl font-bold">${results.netSavings.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-purple-500/10 rounded-lg p-4 text-center">
                    <div className="text-purple-600 text-sm font-medium mb-1">ROI</div>
                    <div className="text-2xl font-bold">{results.roi.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              
              {/* Pie Chart */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold mb-6">Cost Comparison</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={comparisonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {comparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center flex-wrap gap-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">Without Protection: ${results.potentialLosses.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">With Protection: ${results.annualProtectionCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold mb-6">5-Year Projection</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="losses" name="Potential Losses" fill="#ef4444" />
                      <Bar dataKey="protection" name="Protection Cost" fill="#10b981" />
                      <Bar dataKey="savings" name="Net Savings" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-pink-600/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to protect your AI assets?</h3>
                  <p className="text-muted-foreground">Schedule a consultation with our AI protection experts.</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleDownloadReport}
                    className="flex items-center px-4 py-2 bg-background/80 hover:bg-background text-foreground rounded-md border border-border transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </button>
                  <AnimatedButton>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16 bg-background/60 backdrop-blur-sm rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How accurate is this ROI calculator?",
                  answer: "This calculator provides estimates based on the input values you provide. Actual results may vary based on your specific circumstances and the nature of your AI assets."
                },
                {
                  question: "What's included in the protection costs?",
                  answer: "Protection costs include initial setup fees, ongoing subscription costs for monitoring and enforcement services, and any administrative costs associated with managing the protection of your AI assets."
                },
                {
                  question: "How can I increase my recovery rate?",
                  answer: "Recovery rates can be improved by implementing more comprehensive protection measures, establishing clear licensing terms, and working with our experts to develop a custom enforcement strategy."
                },
                {
                  question: "What factors should I consider for the 'Average Loss per Incident'?",
                  answer: "Consider direct revenue loss, brand value impact, legal costs, opportunity costs, and potential market advantage loss when estimating the average financial impact of each unauthorized use."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-sm rounded-lg p-5 border border-border">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ROICalculator;
