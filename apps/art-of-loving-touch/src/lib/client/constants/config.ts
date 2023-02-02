import { z } from 'zod';

const publicEnvSchema = z.object({
  DEV: z.boolean({ required_error: 'DEV is required' }),
  PUBLIC_COOKIE_YES_SITE_ID: z.string().optional(),
  PUBLIC_SHOW_COOKIE_CONSENT: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
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
    .min(1, 'PUBLIC_PLAUSIBLE_DOMAIN is required'),
  PUBLIC_PROJECT_ID: z
    .string({ required_error: 'PUBLIC_PROJECT_ID is required' })
    .min(1, 'PUBLIC_PROJECT_ID is required'),
});

const config = publicEnvSchema.parse(import.meta.env);

export default config;
