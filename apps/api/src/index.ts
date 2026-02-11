import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { auth } from './lib/auth.lib';

import { loggerMiddleware } from './middlewares/logger.middleware';

import { TRUSTED_ORIGINS } from './constants';
import { webhookRoutes } from './modules/webhook/webhook.route/v1';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: TRUSTED_ORIGINS,
		allowHeaders: ['Content-Type', 'Authorization'],
		exposeHeaders: ['Content-Length'],
		maxAge: 600,
		credentials: true,
	}),
);

app.use('*', loggerMiddleware);

app.on(['POST', 'GET'], '/auth/*', (ctx) => {
	return auth.handler(ctx.req.raw);
});

const routes = app
	.get('/', (ctx) => {
		return ctx.json({
			success: true,
			data: {
				message: 'Hello Echo!',
			},
		});
	})
	.route('/v1/webhook', webhookRoutes);

export default app;
export type AppType = typeof routes;
