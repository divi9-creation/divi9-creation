<script lang="ts">
  export let className: string = '';
  export let external: boolean = false;
  export let href: string;

  export { className as class };
</script>

<a class={className} {href} target={external ? '_blank' : '_self'}>
  <slot />
</a>
