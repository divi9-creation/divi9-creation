import type { z } from 'zod';
import type { geolocationSchema, subscribeSchema } from '.';

declare global {
  type SubscribeRequest = z.infer<typeof subscribeSchema>;
}
