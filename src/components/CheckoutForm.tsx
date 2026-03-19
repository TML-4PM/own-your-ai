import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CheckoutFormProps {
  amount: number;
  productName: string;
  priceId?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  productName,
  priceId,
  onSuccess,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      toast({ title: 'Email Required', description: 'Please enter your email address.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      const payload: any = {
        planName: productName,
        amount: amount / 100, // edge fn expects dollars
        email,
        successUrl: 'https://ownyourai.org/thank-you?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: 'https://ownyourai.org/products',
      };
      if (priceId) payload.priceId = priceId;

      const { data, error } = await supabase.functions.invoke('create-checkout-session', { body: payload });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast({ title: 'Payment Error', description: err.message || 'An error occurred. Please try again.', variant: 'destructive' });
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
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Processing...' : `Pay${amount > 0 ? ' AUD $' + (amount / 100).toFixed(0) : ''}`}
      </Button>
      {onCancel && (
        <Button type="button" variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </form>
  );
};

export default CheckoutForm;
