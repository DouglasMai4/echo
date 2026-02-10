import { drizzle } from 'drizzle-orm/neon-http';

import { schema } from './schemas';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined');
}

export const db = drizzle(DATABASE_URL, {
	schema,
	casing: 'snake_case',
});

export { schema };
export * from 'drizzle-orm';
