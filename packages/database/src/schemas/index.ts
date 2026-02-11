import { accounts } from './accounts.schema';
import { sessions } from './sessions.schema';
import { subscriptions } from './subscriptions.schema';
import { twoFactors } from './two-factors.schema';
import { users } from './users.schema';
import { verifications } from './verifications.schema';

export const schema = {
	users,
	sessions,
	accounts,
	verifications,
	twoFactors,
	subscriptions,
};
