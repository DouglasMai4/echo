import { Hono } from 'hono';

const app = new Hono();

app.get('/', (ctx) => {
	return ctx.json({
		success: true,
		data: {
			message: 'Hello Echo!',
		},
	});
});

export default app;
