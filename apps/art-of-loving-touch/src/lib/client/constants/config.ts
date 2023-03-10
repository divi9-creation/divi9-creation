import { z } from 'zod';

const publicEnvSchema = z.object({
  DEV: z.boolean({ required_error: 'DEV is required' }),
  PROD: z.boolean({ required_error: 'PROD is required' }),
  PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID: z
    .string({
      required_error: 'PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID is required',
    })
    .optional(),
  PUBLIC_IPINFO_API_KEY: z.string().optional(),
  PUBLIC_META_PIXEL_ID: z
    .string({ required_error: 'PUBLIC_META_PIXEL_ID is required' })
    .min(1, 'PUBLIC_META_PIXEL_ID is required'),
  PUBLIC_MIXPANEL_PROJECT_TOKEN: z
    .string({ required_error: 'PUBLIC_MIXPANEL_PROJECT_TOKEN is required' })
    .min(1, 'PUBLIC_MIXPANEL_PROJECT_TOKEN is required'),
  PUBLIC_ORGANIZATION_ID: z
    .string({ required_error: 'PUBLIC_ORGANIZATION_ID is required' })
    .min(1, 'PUBLIC_ORGANIZATION_ID is required'),
  PUBLIC_PLAUSIBLE_DOMAIN: z
    .string({ required_error: 'PUBLIC_PLAUSIBLE_DOMAIN is required' })
    .optional(),
  PUBLIC_PROJECT_ID: z
    .string({ required_error: 'PUBLIC_PROJECT_ID is required' })
    .min(1, 'PUBLIC_PROJECT_ID is required'),
});

const config = publicEnvSchema.parse(import.meta.env);

export default config;
