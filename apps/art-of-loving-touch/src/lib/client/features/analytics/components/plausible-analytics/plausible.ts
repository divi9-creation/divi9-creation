import { config } from '$client/constants';
import { Env } from '$shared/utils';
import { onMount } from 'svelte';

const SCRIPT_URL = Env.isProd()
  ? 'https://plausible.io/js/script.js'
  : 'https://plausible.io/js/script.local.manual.js';

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
