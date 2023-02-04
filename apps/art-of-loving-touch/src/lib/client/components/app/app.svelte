<script lang="ts">
  import { featureFlagsStore } from '$client/stores';
  import { onMount } from 'svelte';

  export let featureFlags: App.FeatureFlag[];

  onMount(() => {
    featureFlagsStore.set(featureFlags);
  });
</script>
