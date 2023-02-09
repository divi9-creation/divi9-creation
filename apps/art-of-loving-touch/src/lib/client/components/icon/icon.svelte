<script lang="ts">
  export let className: string = '';
  export { className as class };
  export let icon: any;
  export let size: number = 24;
</script>

<svg
  class={`pointer-events-none ${className}`}
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <svelte:component this={icon} />
</svg>
