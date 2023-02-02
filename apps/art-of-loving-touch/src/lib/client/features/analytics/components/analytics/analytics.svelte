<script lang="ts">
  import { onMount } from 'svelte';
  import {
    loadAnalyticsUseCase,
    trackPageViewedUseCase,
  } from '../../use-cases';

  onMount(() => {
    loadAnalyticsUseCase();
    trackPageViewedUseCase();
  });
</script>
