<script lang="ts">
  export let size: number;
</script>

<div class="bg-gray-300 rounded-full dark:bg-gray-700" style="--size: {size}px;" />

<style lang="scss">
  div {
    height: var(--size);
    max-height: var(--size);
    max-width: var(--size);
    width: var(--size);
  }
</style>
