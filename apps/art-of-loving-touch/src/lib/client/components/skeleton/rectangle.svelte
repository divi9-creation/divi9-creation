<script lang="ts">
  export let height: number;
  export let width: number;
</script>

<div
  class="bg-gray-300 rounded dark:bg-gray-700"
  style="--height: {height}px; --width: {width}%;"
/>

<style lang="scss">
  div {
    height: var(--height);
    max-width: 100%;
    width: var(--width);
  }
</style>
