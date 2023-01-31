<script lang="ts">
  import { trapFocus } from './focus-trap';

  export let active: boolean = false;
</script>

<div use:trapFocus={active}>
  <slot />
</div>
