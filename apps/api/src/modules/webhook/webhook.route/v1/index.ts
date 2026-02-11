import { logger } from '@/utils/logger.util';
import { OpenAPIHono } from '@hono/zod-openapi';

const webhookApp = new OpenAPIHono();

const TELEGRAM_SECRET_TOKEN = process.env.TELEGRAM_SECRET_TOKEN;

if (!TELEGRAM_SECRET_TOKEN) {
	throw new Error('TELEGRAM_SECRET_TOKEN is not defined');
}

const routes = webhookApp.post('/telegram', async (ctx) => {
	const secretToken = ctx.req.header('X-Telegram-Bot-Api-Secret-Token');

	const update = await ctx.req.json();

	logger.info(update, 'Telegram update received:');

	if (secretToken !== TELEGRAM_SECRET_TOKEN) {
		return ctx.json(
			{
				success: false,
				error: {
					code: 'UNAUTHORIZED',
					message: 'Invalid secret token',
				},
			},
			401,
		);
	}

	return ctx.json({
		success: true,
		data: {
			message: 'Hello, Telegram!',
		},
	});
});

export { routes as webhookRoutes };
