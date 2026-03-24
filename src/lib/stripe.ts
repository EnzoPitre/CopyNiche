import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const PLANS = {
  STARTER: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    credits: 100,
    amount: 2900, // 29€
  },
  PRO: {
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    credits: -1, // illimité
    amount: 7900, // 79€
  }
};
