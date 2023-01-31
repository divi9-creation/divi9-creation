<script lang="ts">
  export let message: string | undefined = undefined;
</script>

{#if message}
  <p class="text-error-500">{message}</p>
{/if}
