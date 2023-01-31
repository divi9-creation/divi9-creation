<script lang="ts">
  import CloseIcon from './close-icon.svelte';
  import MenuIcon from './menu-icon.svelte';

  export let isMenuOpen: boolean;
  export let toggle: () => void;
  export let size: number = 36;
</script>

<button class="rounded-lg p-2" on:click={toggle}>
  {#if isMenuOpen}
    <CloseIcon {size} />
  {:else}
    <MenuIcon {size} />
  {/if}
</button>
