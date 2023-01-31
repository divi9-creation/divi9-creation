import { config } from '$client/constants';
import { onMount } from 'svelte';

export const useMetaPixel = () => {
  onMount(() => {
    fbq('init', config.PUBLIC_META_PIXEL_ID);
  });
};
