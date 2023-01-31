<script lang="ts">
  export let label: string;
  export let name: string;
  export let errors: string[] | undefined | null = undefined;
</script>

<div class="grid gap-2">
  <label for={name} class="block font-medium">{label}</label>
  <slot />
  {#if errors}
    <div class="text-error-600 dark:text-error-400">
      <small>{errors[0]}</small>
    </div>
  {/if}
</div>
