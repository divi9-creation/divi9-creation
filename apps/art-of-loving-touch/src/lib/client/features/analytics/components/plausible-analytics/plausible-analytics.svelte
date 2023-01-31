<script lang="ts">
  import { usePlausibleAnalytics } from './plausible';

  const { domain, scriptUrl } = usePlausibleAnalytics();
</script>

<svelte:head>
  <script defer data-domain={domain} src={scriptUrl}></script>

  <script>
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
  </script>
</svelte:head>
