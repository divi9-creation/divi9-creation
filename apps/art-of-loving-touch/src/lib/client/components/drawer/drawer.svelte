<script lang="ts">
  import { useDrawer } from './drawer.view-model';

  const { isOpen, close, open } = useDrawer();
</script>

<button class="sidebar-toggle" on:click={open}>
  <span class="fas fa-bars">Toggle</span>
</button>

<div
  class={`hustleui-drawer z-50 transition-all duration-300 ${
    $isOpen ? 'block left-0' : 'hidden -left-64'
  }`}
  role="dialog"
  aria-modal="true"
  aria-labelledby="Side Navigation Drawer"
>
  <div class="fixed inset-0 z-10 bg-gray-800/60" />

  <div class="fixed z-40 inset-0">
    <div class="surface surface-1 h-screen sm:max-w-sm flex flex-col p-8">
      <div class="flex justify-end p-2">
        <button
          class="focus:outline focus:outline-1 focus:outline-blue-400"
          on:click={close}>[X]</button
        >
      </div>
      <slot />
    </div>
  </div>
</div>
