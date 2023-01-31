<script lang="ts">
  export let color: 'secondary' | 'accent' | undefined = undefined;
  export let external: boolean = false;
  export let href: string | undefined = undefined;
  export let size: 'sm' | 'lg' | undefined = undefined;
  export let variant: 'link' | 'outline' | undefined = undefined;

  const element = href ? 'a' : 'button';
  const target = external ? '_blank' : '';
</script>

<svelte:element
  this={element}
  {href}
  {target}
  class={`btn ${variant ? `btn-${variant}` : ''} ${
    color ? `btn-${color}` : ''
  } ${size ? `btn-${size}` : ''} cursor-pointer`}
>
  <slot />
</svelte:element>

<style lang="scss">
  .btn {
    @apply flex w-full h-11 justify-center items-center px-4 rounded-lg border border-gray-300 dark:border-gray-600;
    @apply bg-primary-600 hover:bg-primary-700 dark:bg-primary-300 dark:hover:bg-primary-400 shadow-sm;
    @apply text-lg text-center text-white dark:text-gray-900 font-semibold no-underline;
    @apply transition-all duration-300;

    &-sm {
      padding-inline: 0.75rem;
      font-size: 1rem;
    }

    &-lg {
      padding-inline: 1.25rem;
      font-size: 1.25rem;
    }

    &-secondary {
      @apply bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-300 dark:hover:bg-accent-400;
    }

    &-accent {
      @apply bg-accent-600 hover:bg-accent-700 dark:bg-accent-300 dark:hover:bg-accent-400;
    }
  }

  .btn-link {
    @apply bg-transparent hover:bg-transparent;

    &.btn-primary {
      @apply text-primary-600 dark:text-primary-300;
    }

    &.btn-secondary {
      @apply text-secondary-600 dark:text-secondary-300;
    }

    &.btn-accent {
      @apply text-accent-600 dark:text-accent-300;
    }
  }

  .btn-outline {
    @apply bg-transparent border border-solid;

    &.btn-primary {
      @apply border-primary-600 hover:bg-primary-600 text-primary-600 dark:border-primary-300 dark:hover:bg-primary-300 dark:text-primary-300;
    }

    &.btn-secondary {
      @apply border-secondary-600 hover:bg-secondary-600 text-secondary-600 dark:border-secondary-300 dark:hover:bg-secondary-300 dark:text-secondary-300;
    }

    &.btn-accent {
      @apply border-accent-600 hover:bg-accent-600 text-accent-600 dark:border-accent-300 dark:hover:bg-accent-300 dark:text-accent-300;
    }

    &:hover {
      @apply text-white dark:text-black;
    }
  }
</style>
