import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

// Validate Stripe key
const isPlaceholder = stripeKey.includes('placeholder');

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || isPlaceholder) {
  console.warn('[MAZGY] Stripe publishable key is missing or contains a placeholder. Payment features will not work.');
}

const stripePromise = loadStripe(stripeKey);

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}

