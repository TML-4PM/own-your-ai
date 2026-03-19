import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import CheckoutForm from './CheckoutForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
  priceId?: string | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, planName, amount, priceId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{planName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <CheckoutForm
            amount={amount}
            productName={planName}
            priceId={priceId}
            onSuccess={onClose}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
