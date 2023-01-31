<script lang="ts">
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
</script>

<p class="font-normal" data-size={size}>
  <slot />
</p>

<style lang="scss">
  p {
    &[data-size='xs'] {
      @apply text-xs;
    }

    &[data-size='sm'] {
      @apply text-sm;
    }

    &[data-size='md'] {
      @apply text-base;
    }

    &[data-size='lg'] {
      @apply text-lg;
    }

    &[data-size='xl'] {
      @apply text-xl;
    }
  }
</style>
