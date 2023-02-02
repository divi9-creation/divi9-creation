import { z } from 'zod';

let envSchema = z.object({
  ANALYTICS_CACHE_MINUTES: z.coerce.number().min(1).default(5),
  DATOCMS_API_TOKEN: z
    .string({
      required_error: 'DATOCMS_API_TOKEN is required',
    })
    .min(1, 'DATOCMS_API_TOKEN is required'),
  DATOCMS_API_URL: z
    .string({ required_error: 'DATOCMS_API_URL is required' })
    .min(1, 'DATOCMS_API_URL is required'),
  DEV: z.boolean({ required_error: 'DEV is required' }),
  JSONBIN_ACCESS_KEY: z
    .string({ required_error: 'JSONBIN_ACCESS_KEY is required' })
    .min(1, 'JSONBIN_ACCESS_KEY is required'),
  JSONBIN_BIN_ID: z
    .string({ required_error: 'JSONBIN_BIN_ID is required' })
    .min(1, 'JSONBIN_BIN_ID is required'),
  MAILERLITE_API_KEY: z
    .string({ required_error: 'MAILERLITE_API_KEY is required' })
    .min(1, 'MAILERLITE_API_KEY is required'),
  MAILERLITE_API_URL: z
    .string({ required_error: 'MAILERLITE_API_URL is required' })
    .min(1, 'MAILERLITE_API_URL is required'),
  MAILERLITE_GROUP_ID: z
    .string({ required_error: 'MAILERLITE_GROUP_ID is required' })
    .min(1, 'MAILERLITE_GROUP_ID is required'),
  MODE: z.enum(['development', 'production', 'staging']),
  PLAUSIBLE_API_KEY: z
    .string({ required_error: 'PLAUSIBLE_API_KEY is required' })
    .min(1, 'PLAUSIBLE_API_KEY is required'),
  PLAUSIBLE_API_URL: z
    .string({ required_error: 'PLAUSIBLE_API_URL is required' })
    .min(1, 'PLAUSIBLE_API_URL is required')
    .url('PLAUSIBLE_API_URL must be a valid url'),
  PROJECT_ID: z
    .string({ required_error: 'PROJECT_ID is required' })
    .min(1, 'PROJECT_ID is required'),
  PLAUSIBLE_SITE_ID: z
    .string({ required_error: 'PLAUSIBLE_SITE_ID is required' })
    .min(1, 'PLAUSIBLE_SITE_ID is required'),
  UPSTASH_API_KEY: z
    .string({ required_error: 'UPSTASH_API_KEY is required' })
    .min(1, 'UPSTASH_API_KEY is required'),
  UPSTASH_API_URL: z
    .string({ required_error: 'UPSTASH_API_URL is required' })
    .min(1, 'UPSTASH_API_URL is required'),
});

export const env = envSchema.parse(import.meta.env);
