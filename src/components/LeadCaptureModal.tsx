
import React, { useState } from 'react';
import { X, Download, Mail, CheckCircle } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
import { toast } from './ui/use-toast';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentTitle: string;
  contentDescription: string;
  contentType: 'whitepaper' | 'guide' | 'case-study' | 'tool';
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  contentTitle,
  contentDescription,
  contentType
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Check your email for the download link.",
      });
      setIsSubmitting(false);
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: ''
      });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getContentTypeIcon = () => {
    switch (contentType) {
      case 'whitepaper':
      case 'guide':
        return <Download className="h-6 w-6 text-indigo-500" />;
      case 'case-study':
        return <CheckCircle className="h-6 w-6 text-emerald-500" />;
      case 'tool':
        return <Mail className="h-6 w-6 text-purple-500" />;
      default:
        return <Download className="h-6 w-6 text-indigo-500" />;
    }
  };

  const benefits = [
    "Instant download access",
    "Exclusive AI protection insights",
    "Industry best practices",
    "Real-world case examples"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              {getContentTypeIcon()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{contentTitle}</h2>
              <p className="text-sm text-muted-foreground capitalize">{contentType.replace('-', ' ')}</p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{contentDescription}</p>
          
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Work Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                placeholder="CEO, CTO, etc."
              />
            </div>

            <AnimatedButton
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {isSubmitting ? 'Sending...' : `Download ${contentType.replace('-', ' ')}`}
              <Download className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </form>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            By downloading, you agree to our{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
