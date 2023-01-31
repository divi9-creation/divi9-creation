<script lang="ts">
  import { config } from '$client/constants';
  import { MetaPixel } from '../meta-pixel';
  import { MixPanel } from '../mixpanel';
  import { PlausibleAnalytics } from '../plausible-analytics';
  import { useAnalytics } from './analytics';

  useAnalytics();
</script>

{#if !!config.PUBLIC_PLAUSIBLE_DOMAIN}
  <PlausibleAnalytics />
{/if}

{#if !!config.PUBLIC_MIXPANEL_PROJECT_TOKEN}
  <MixPanel />
{/if}

{#if !!config.PUBLIC_META_PIXEL_ID}
  <MetaPixel />
{/if}
