import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';

interface CheckoutFormProps {
  totalAmount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalAmount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('PAYMENT SECURED. MAYHEM AUTHORIZED.');
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#0B0C0F] border border-[#2A2D36] p-4">
        <PaymentElement 
          options={{
            layout: 'tabs',
          }} 
        />
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'PROCESSING CRIMES...' : `PAY £${totalAmount.toFixed(2)}`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-[#A9B1C3] font-mono text-sm hover:text-[#F4F6FA] transition-colors uppercase"
        >
          Abort Mission
        </button>
      </div>

      <p className="text-[#A9B1C3] text-[10px] font-mono text-center leading-relaxed">
        SECURE CHECKOUT BY STRIPE. NO CARD DATA IS STORED ON OUR SERVERS.
        MAZGY IS NOT RESPONSIBLE FOR ANY DAMAGES CAUSED AFTER DELIVERY.
      </p>
    </form>
  );
};
