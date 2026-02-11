import { relations } from 'drizzle-orm';
import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { users } from './users.schema';

export const twoFactors = pgTable(
	'two_factors',
	{
		id: uuid('id')
			.primaryKey()
			.$defaultFn(() => Bun.randomUUIDv7()),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		secret: text('secret').notNull(),
		backupCodes: text('backup_codes').notNull(),
	},
	(table) => [
		index('twoFactors_secret_idx').on(table.secret),
		index('twoFactors_userId_idx').on(table.userId),
	],
);

export const twoFactorsRelations = relations(twoFactors, ({ one }) => ({
	users: one(users, {
		fields: [twoFactors.userId],
		references: [users.id],
	}),
}));
