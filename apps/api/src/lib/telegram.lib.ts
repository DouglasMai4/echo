import { ofetch } from 'ofetch';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
	throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

export const telegram = ofetch.create({
	baseURL: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`,
});
