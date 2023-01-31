import { onMount } from 'svelte';
import { trackPageViewedUseCase } from '../../use-cases';

export const useAnalytics = () => {
  onMount(() => {
    trackPageViewedUseCase();
  });
};
