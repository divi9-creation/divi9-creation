type Meta = {
  pixelId: string;
};

type PlausibleAnalytics = {
  domain: string;
};

export type Options = {
  meta: Meta;
  plausible: PlausibleAnalytics;
};

export { default as Analytics } from './analytics.svelte';
