export const NODE_ENV = (process.env.NODE_ENV || 'development') as
	| 'development'
	| 'production';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const TRUSTED_ORIGINS = process.env.TRUSTED_ORIGINS?.split(',') || [
	'http://localhost:5173',
];
