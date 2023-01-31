<script lang="ts">
  import { Show } from '../show';
  import type { FormState } from './form';

  export let loadingComponent: any;
  export let form: any;
  export let state: FormState;
</script>

<Show when={state === 'normal' || state === 'error'}>
  <form use:form>
    <div class="grid gap-5">
      <slot />
    </div>
  </form>
</Show>

<Show when={state === 'loading'}>
  <svelte:component this={loadingComponent} />
</Show>

{#if state === 'success'}
  <slot name="success" />
{/if}
