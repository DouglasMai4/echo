import { createMiddleware } from 'hono/factory';

import { logger } from '@/utils/logger.util';

export const loggerMiddleware = createMiddleware(async (ctx, next) => {
	const start = performance.now();
	await next();
	const duration = (performance.now() - start).toFixed(2);

	logger.info({
		method: ctx.req.method,
		path: ctx.req.path,
		status: ctx.res.status,
		duration: `${duration}ms`,
	});
});
