import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env
	.STRIPE_WEBHOOK_SECRET as string;

if (!STRIPE_SECRET_KEY) {
	throw new Error('STRIPE_SECRET_KEY is not defined');
}

if (!STRIPE_WEBHOOK_SECRET) {
	throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
}

export const stripeClient = new Stripe(STRIPE_SECRET_KEY);
