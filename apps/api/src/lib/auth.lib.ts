import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { BASE_URL, NODE_ENV, TRUSTED_ORIGINS } from '@/constants';

import { db } from '@echo/database';

import {
	admin,
	captcha,
	haveIBeenPwned,
	openAPI,
	twoFactor,
} from 'better-auth/plugins';
import { stripe } from '@better-auth/stripe';
import { stripeClient, STRIPE_WEBHOOK_SECRET } from './stripe.lib';

export const auth = betterAuth({
	appName: 'Echo',
	baseURL: BASE_URL,
	basePath: '/auth',
	trustedOrigins: TRUSTED_ORIGINS,
	database: drizzleAdapter(db, {
		provider: 'pg',
		camelCase: false,
		usePlural: true,
	}),
	advanced: {
		database: {
			generateId: false,
		},
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		// TODO: Implement email verification
	},
	plugins: [
		...(NODE_ENV !== 'production' ? [openAPI()] : []),
		twoFactor({
			issuer: 'Echo',
		}),
		admin(),
		captcha({
			provider: 'cloudflare-turnstile',
			secretKey: process.env.CAPTCHA_SECRET_KEY || '', // TODO: Implement captcha
		}),
		haveIBeenPwned(),
		stripe({
			stripeClient,
			stripeWebhookSecret: STRIPE_WEBHOOK_SECRET,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [],
			},
		}),
	],
});
