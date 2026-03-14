import React from 'react';
import { useCart } from '../hooks/use-cart';
import { CheckoutForm } from '../components/shop/CheckoutForm';
import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe from environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onSuccess }) => {
  const { cart, totalPrice } = useCart();

  return (
    <section className="min-h-screen bg-[#0B0C0F] text-[#F4F6FA] py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#A9B1C3] hover:text-[#FF2D8F] transition-colors font-mono text-sm uppercase"
            >
              <ArrowLeft size={16} />
              Return to Mayhem
            </button>
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
              Secure Checkout
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-[#A9B1C3] font-mono text-sm uppercase">Total Damage</p>
            <p className="text-[#FF2D8F] font-display font-black text-4xl tracking-tighter">
              £{totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-[#15171C] border border-[#2A2D36] p-6 space-y-6">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider border-b border-[#2A2D36] pb-4">
                Manifest
              </h3>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0B0C0F] border border-[#2A2D36] p-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-[#F4F6FA] font-bold text-sm uppercase">{item.name}</p>
                        <p className="text-[#A9B1C3] text-xs font-mono">QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-[#F4F6FA] font-mono font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-[#2A2D36] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A9B1C3]">SUBTOTAL</span>
                  <span className="text-[#F4F6FA]">£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#A9B1C3]">LOGISTICS (CRIME SCENE DELIVERY)</span>
                  <span className="text-[#FF2D8F] font-bold">FREE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0B0C0F] border border-[#2A2D36] flex items-start gap-4">
                <ShieldCheck className="text-[#FF2D8F] shrink-0" />
                <div>
                  <p className="font-bold text-xs uppercase">Encrypted</p>
                  <p className="text-[#A9B1C3] text-[10px] leading-tight mt-1">
                    Your details are secured with feline-grade encryption.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-[#0B0C0F] border border-[#2A2D36] flex items-start gap-4">
                <Truck className="text-[#FF2D8F] shrink-0" />
                <div>
                  <p className="font-bold text-xs uppercase">Fast Delivery</p>
                  <p className="text-[#A9B1C3] text-[10px] leading-tight mt-1">
                    We'll knock it off the shelf and send it your way immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider">
              Payment Details
            </h3>
            <Elements 
               stripe={stripePromise}
               options={{
                 appearance: {
                   theme: 'night',
                   variables: {
                     colorPrimary: '#FF2D8F',
                     colorBackground: '#15171C',
                   }
                 }
               }}
            >
              <CheckoutForm 
                totalAmount={totalPrice} 
                onSuccess={onSuccess} 
                onCancel={onBack}
              />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};
