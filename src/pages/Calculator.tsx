import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight, Calculator, Download, HelpCircle, Lightbulb, Building, Briefcase, Rocket } from 'lucide-react';
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
import jsPDF from 'jspdf';

interface ScenarioPreset {
  name: string;
  description: string;
  icon: React.ReactNode;
  values: {
    assetValue: number;
    unauthorizedUses: number;
    averageLoss: number;
    protectionCost: number;
    monthlySubscription: number;
    recoveryRate: number;
    growthRate: number;
  };
}

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
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const scenarioPresets: ScenarioPreset[] = [
    {
      name: 'Startup',
      description: 'Early-stage company with emerging AI products',
      icon: <Rocket className="h-5 w-5" />,
      values: {
        assetValue: 50000,
        unauthorizedUses: 10,
        averageLoss: 2500,
        protectionCost: 500,
        monthlySubscription: 99,
        recoveryRate: 60,
        growthRate: 15
      }
    },
    {
      name: 'Mid-Size Business',
      description: 'Established company with multiple AI solutions',
      icon: <Briefcase className="h-5 w-5" />,
      values: {
        assetValue: 500000,
        unauthorizedUses: 30,
        averageLoss: 10000,
        protectionCost: 2000,
        monthlySubscription: 499,
        recoveryRate: 70,
        growthRate: 8
      }
    },
    {
      name: 'Enterprise',
      description: 'Large organization with extensive AI portfolio',
      icon: <Building className="h-5 w-5" />,
      values: {
        assetValue: 2000000,
        unauthorizedUses: 100,
        averageLoss: 25000,
        protectionCost: 10000,
        monthlySubscription: 1999,
        recoveryRate: 80,
        growthRate: 5
      }
    }
  ];

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
    setActiveScenario(null);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
    setActiveScenario(null);
  };

  const applyScenario = (scenario: ScenarioPreset) => {
    setValues(scenario.values);
    setActiveScenario(scenario.name);
    toast({
      title: `${scenario.name} Scenario Applied`,
      description: scenario.description,
    });
  };

  const handleDownloadReport = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(99, 102, 241);
    pdf.text('OwnMyAI', 20, 25);
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('AI Protection ROI Report', 20, 35);
    
    // Date
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 50, pageWidth - 20, 50);
    
    // Input Values Section
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Your Input Values', 20, 65);
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    const inputY = 75;
    pdf.text(`AI Asset Value: $${values.assetValue.toLocaleString()}`, 25, inputY);
    pdf.text(`Annual Unauthorized Uses: ${values.unauthorizedUses}`, 25, inputY + 8);
    pdf.text(`Average Loss per Incident: $${values.averageLoss.toLocaleString()}`, 25, inputY + 16);
    pdf.text(`Protection Setup Cost: $${values.protectionCost.toLocaleString()}`, 25, inputY + 24);
    pdf.text(`Monthly Subscription: $${values.monthlySubscription.toLocaleString()}`, 25, inputY + 32);
    pdf.text(`Recovery Rate: ${values.recoveryRate}%`, 25, inputY + 40);
    pdf.text(`Annual Growth Rate: ${values.growthRate}%`, 25, inputY + 48);
    
    // Results Section
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('ROI Analysis Results', 20, 140);
    
    pdf.setFontSize(12);
    const resultY = 155;
    
    pdf.setTextColor(239, 68, 68);
    pdf.text(`Potential Annual Losses: $${results.potentialLosses.toLocaleString()}`, 25, resultY);
    
    pdf.setTextColor(34, 197, 94);
    pdf.text(`Annual Protection Cost: $${results.annualProtectionCost.toLocaleString()}`, 25, resultY + 12);
    
    pdf.setTextColor(99, 102, 241);
    pdf.text(`Recovered Revenue: $${results.recoveredRevenue.toLocaleString()}`, 25, resultY + 24);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text(`Net Annual Savings: $${results.netSavings.toLocaleString()}`, 25, resultY + 40);
    
    pdf.setFontSize(16);
    pdf.setTextColor(99, 102, 241);
    pdf.text(`Return on Investment: ${results.roi.toFixed(1)}%`, 25, resultY + 56);
    
    // 5-Year Projection
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('5-Year Projection', 20, 230);
    
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    let projY = 245;
    for (let i = 1; i <= 5; i++) {
      const yearGrowth = Math.pow(1 + values.growthRate / 100, i - 1);
      const yearSavings = Math.round(results.netSavings * yearGrowth);
      pdf.text(`Year ${i}: Net Savings of $${yearSavings.toLocaleString()}`, 25, projY);
      projY += 8;
    }
    
    // Recommendation
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Recommendation:', 20, 295);
    
    pdf.setFontSize(10);
    let recommendation = '';
    if (results.roi > 100) {
      recommendation = 'Strong ROI indicates excellent potential for AI asset protection investment.';
    } else if (results.roi > 50) {
      recommendation = 'Good ROI suggests worthwhile investment in AI protection services.';
    } else if (results.roi > 0) {
      recommendation = 'Positive ROI. Consider our Basic plan to start protecting your assets.';
    } else {
      recommendation = 'Consider adjusting parameters or consulting our experts for customized solutions.';
    }
    pdf.text(recommendation, 25, 305);
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text('This report is for estimation purposes only. Actual results may vary.', 20, 320);
    pdf.text('Contact us at hello@ownmyai.com for a personalized consultation.', 20, 326);
    
    // Save
    pdf.save('OwnMyAI-ROI-Report.pdf');
    
    toast({
      title: "Report Downloaded",
      description: "Your ROI analysis report has been saved as a PDF.",
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
    assetValue: "The estimated total value of your AI-generated assets including models, training data, algorithms, and intellectual property. This includes development costs, market value, and potential licensing revenue.",
    unauthorizedUses: "How often your AI assets are used without permission each year. This includes model theft, unauthorized API access, data scraping, and copyright infringement. Industry average is 20-50 incidents for mid-size companies.",
    averageLoss: "The financial impact per incident, including: direct revenue loss, legal costs ($5K-50K per case), brand damage, competitive advantage loss, and opportunity costs. Industry data suggests $5K-100K per incident depending on severity.",
    protectionCost: "One-time setup costs including: initial audit ($1K-5K), watermarking implementation, monitoring system setup, and legal documentation preparation.",
    monthlySubscription: "Ongoing protection services: 24/7 monitoring, automated detection, takedown services, legal support, and reporting dashboard. Plans range from $99/mo (Startup) to $1,999/mo (Enterprise).",
    recoveryRate: "Percentage of losses prevented or recovered. Factors: detection speed, enforcement effectiveness, legal jurisdiction, and infringer cooperation. Our clients typically achieve 60-85% recovery rates.",
    growthRate: "Expected annual increase in both your AI asset value and potential unauthorized uses. AI industry growth averages 15-25% annually. Consider your specific market trajectory."
  };

  const getROIInterpretation = () => {
    if (results.roi > 200) {
      return {
        level: 'Exceptional',
        color: 'text-green-600',
        bgColor: 'bg-green-500/10',
        message: 'Outstanding ROI! Protection investment will pay for itself multiple times over. Immediate action recommended.',
        action: 'Get Started Now'
      };
    } else if (results.roi > 100) {
      return {
        level: 'Strong',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        message: 'Excellent returns expected. Your AI assets are at significant risk without protection.',
        action: 'Schedule Demo'
      };
    } else if (results.roi > 50) {
      return {
        level: 'Good',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        message: 'Solid investment opportunity. Protection will likely generate positive returns within the first year.',
        action: 'Learn More'
      };
    } else if (results.roi > 0) {
      return {
        level: 'Moderate',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        message: 'Positive but modest returns. Consider our Basic plan to start protecting your most valuable assets.',
        action: 'View Plans'
      };
    } else {
      return {
        level: 'Review Needed',
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        message: 'Based on current inputs, ROI is limited. Our team can help identify hidden risks and optimize your protection strategy.',
        action: 'Get Consultation'
      };
    }
  };

  const roiInterpretation = getROIInterpretation();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              Financial Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Protection ROI Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate your potential return on investment from implementing our AI protection services. 
              Understand the real cost of unprotected AI assets and see how much you could save.
            </p>
          </div>

          {/* Scenario Presets */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Quick Start Scenarios</h2>
              <span className="text-sm text-muted-foreground">— Select a scenario that matches your business</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarioPresets.map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => applyScenario(scenario)}
                  className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                    activeScenario === scenario.name
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background/60 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${activeScenario === scenario.name ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {scenario.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{scenario.name}</h3>
                      <p className="text-xs text-muted-foreground">{scenario.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Asset Value: ${scenario.values.assetValue.toLocaleString()} • {scenario.values.unauthorizedUses} incidents/year
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                      className="w-full accent-primary"
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                      className="w-full accent-primary"
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
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
                        <div className="absolute right-0 bottom-full mb-2 w-72 p-3 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border text-xs z-10">
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
                      className="w-full accent-primary"
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
                    className="w-full p-3 border border-border rounded-md bg-background/50 focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
            
            {/* Results and Visualization */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Results */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-primary" />
                  Your ROI Summary
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-primary text-sm font-medium mb-1">Potential Losses</div>
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

                {/* ROI Interpretation */}
                <div className={`${roiInterpretation.bgColor} rounded-lg p-4 border border-border`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-semibold ${roiInterpretation.color}`}>{roiInterpretation.level} ROI</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{roiInterpretation.message}</p>
                    </div>
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/20 via-purple-600/15 to-pink-600/10 backdrop-blur-sm rounded-xl p-6 border border-border">
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
                  <Link to="/get-started">
                    <AnimatedButton>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-background/60 backdrop-blur-sm rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How accurate is this ROI calculator?",
                  answer: "This calculator provides estimates based on industry data and your inputs. Actual results depend on your specific AI assets, industry, and enforcement effectiveness. For a precise assessment, schedule a consultation with our experts who can analyze your unique situation."
                },
                {
                  question: "What's included in the protection costs?",
                  answer: "Protection costs include: initial audit and watermarking setup, ongoing 24/7 monitoring across web and dark web, automated infringement detection, legal takedown services, monthly reporting, and dedicated support. Enterprise plans include custom enforcement strategies."
                },
                {
                  question: "How can I increase my recovery rate?",
                  answer: "Recovery rates improve with: faster detection (our average is 48 hours), comprehensive watermarking, clear licensing terms, proactive monitoring, and swift legal action. Enterprise clients typically see 75-90% recovery rates through our advanced enforcement tools."
                },
                {
                  question: "What factors should I consider for 'Average Loss per Incident'?",
                  answer: "Include: direct revenue loss from stolen IP, legal costs ($5K-50K per case), brand damage (often 2-3x direct costs), competitive advantage erosion, customer trust impact, and opportunity costs from diverted resources. Enterprise AI theft can exceed $100K per incident."
                },
                {
                  question: "How do unauthorized uses affect my AI model's value?",
                  answer: "Each unauthorized use can: degrade your competitive moat, flood markets with copied solutions, reduce licensing revenue potential, expose proprietary training data, and accelerate competitor development. Early protection prevents cumulative damage."
                },
                {
                  question: "What ROI should I expect from AI protection?",
                  answer: "Most clients see 100-300% ROI in year one, increasing as AI asset values grow. Startups typically see faster payback due to growth rates; enterprises benefit from absolute savings. Our average client saves $47K annually after protection costs."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-sm rounded-lg p-5 border border-border">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
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