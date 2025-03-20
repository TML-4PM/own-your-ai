
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

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
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setError(null);
    setIsLoading(true);

    // Get the card element
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    try {
      // For testing, you can use these card numbers:
      // Success: 4242 4242 4242 4242
      // Decline: 4000 0000 0000 0002
      
      // In a real implementation, you would call your backend to create a payment intent
      // and confirm the payment here using the clientSecret.
      // 
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      // });
      
      // Simulate a successful payment for demonstration purposes
      setTimeout(() => {
        // Simulate successful payment
        toast({
          title: 'Payment Successful',
          description: `You have successfully subscribed to ${productName}`,
        });
        
        console.log('Payment processed successfully for:', {
          product: productName,
          amount: amount / 100,
        });
        
        setIsLoading(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="card-element" className="block text-sm font-medium">
          Card Details
        </label>
        <div className="p-3 border rounded-md bg-background">
          <CardElement 
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive mt-1">{error}</p>
        )}
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        <p>For testing, use these card numbers:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Success: 4242 4242 4242 4242</li>
          <li>Decline: 4000 0000 0000 0002</li>
        </ul>
        <p className="mt-1">Use any future expiration date, any 3-digit CVC, and any postal code.</p>
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
          disabled={!stripe || isLoading}
        >
          {isLoading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
