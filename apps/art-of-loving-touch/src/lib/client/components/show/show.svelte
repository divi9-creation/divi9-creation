<script lang="ts">
  export let when: boolean;
</script>

<div class={when ? 'block' : 'hidden'}>
  <slot />
</div>
