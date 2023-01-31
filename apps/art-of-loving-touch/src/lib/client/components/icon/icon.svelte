<script lang="ts">
  export let className: string;
  export let name: string;
  export let size: 'sm' | 'md' | 'lg' = 'md';

  export { className as class };
</script>

<box-icon class={`${className} pointer-events-none`} {name} {size} />
