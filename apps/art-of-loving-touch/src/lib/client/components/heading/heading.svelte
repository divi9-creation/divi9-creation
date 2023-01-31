<script lang="ts">
  export let level: 1 | 2 | 3 | 4 | 5 = 2;

  const element = `h${level}`;
</script>

<svelte:element this={element}>
  <slot />
</svelte:element>

<style>
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 700;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.875rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2.25rem;
    }

    h3 {
      font-size: 1.875rem;
    }

    h4 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1.25rem;
    }
  }
</style>
