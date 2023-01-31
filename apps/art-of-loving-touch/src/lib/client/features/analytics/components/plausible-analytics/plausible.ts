import { config } from '$client/constants';
import { onMount } from 'svelte';

const SCRIPT_URL = config.DEV
  ? 'https://plausible.io/js/script.local.manual.js'
  : 'https://plausible.io/js/script.js';

const onPageViewed = () => {
  plausible('pageView');
};

export const usePlausibleAnalytics = () => {
  onMount(() => {
    window.addEventListener('page_viewed', onPageViewed);
  });

  return {
    domain: config.PUBLIC_PLAUSIBLE_DOMAIN,
    scriptUrl: SCRIPT_URL,
  };
};
