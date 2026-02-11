import { createMiddleware } from 'hono/factory';

import { auth } from '@/lib/auth.lib';

import type { Session, User } from '@/types/auth.type';

export const authMiddleware = createMiddleware<{
	Variables: {
		user?: User;
		session?: Session;
	};
}>(async (ctx, next) => {
	const session = await auth.api.getSession({ headers: ctx.req.raw.headers });

	if (!session) {
		return ctx.json(
			{
				success: false,
				error: {
					code: 'UNAUTHORIZED',
					message: 'Unauthorized',
				},
			},
			401,
		);
	}

	ctx.set('user', session.user);
	ctx.set('session', session.session);
	await next();
});
