<script lang="ts">
  import { useMenu } from './menu.view-model';

  export let className: string = '';
  export let items: { text: string; external?: boolean; url: string }[];

  export { className as class };

  const { isOpen, toggle } = useMenu();
</script>

<div class="">
  <button on:click={toggle}
    >Services
    <span class="fas fa-caret-down second" />
  </button>
  <ul class={`flex flex-col gap-2 ${$isOpen ? 'block' : 'hidden'}`}>
    {#each items as item (item.text)}
      <li
        class={`${className} first-of-type:mt-2 last-of-type:mb-2 ml-3 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300`}
      >
        <a href={item.url} target={item.external ? '_blank' : ''}>{item.text}</a
        >
      </li>
    {/each}
  </ul>
</div>
