import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CheckoutFormProps {
  amount: number;
  productName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  amount, 
  productName,
  onSuccess,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          planName: productName,
          amount: amount,
          email: email,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast({
        title: 'Payment Error',
        description: err.message || 'An error occurred while processing your payment. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          className="bg-background"
        />
        <p className="text-sm text-muted-foreground">
          You'll be redirected to Stripe's secure checkout to complete your payment.
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">{productName} Plan</span>
          <span className="text-lg font-bold">${(amount / 100).toFixed(2)}/mo</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? 'Redirecting...' : 'Continue to Payment'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
