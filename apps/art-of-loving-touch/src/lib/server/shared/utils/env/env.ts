import { env } from '$server/config';

export const isDev = () => env.MODE === 'development';

export const isProd = () => env.MODE === 'production';

export const isStaging = () => env.MODE === 'staging';
