import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

// Validate Stripe key
const isPlaceholder = stripeKey.includes('placeholder');

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || isPlaceholder) {
  if (import.meta.env.PROD) {
    throw new Error('FATAL: Stripe publishable key is missing or contains a placeholder. Set VITE_STRIPE_PUBLISHABLE_KEY before deploying.');
  } else {
    console.warn('[MAZGY] Stripe key missing or placeholder detected. Payment features will not work. Set VITE_STRIPE_PUBLISHABLE_KEY in your .env file.');
  }
}

const stripePromise = loadStripe(stripeKey);

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}

