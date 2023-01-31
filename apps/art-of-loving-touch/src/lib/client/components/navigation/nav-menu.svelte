<script lang="ts">
  import { Button } from '../button';

  export let activePath: string;
  export let cta: { text: string; url: string };
  export let items: { text: string; url: string }[];
</script>

<ul
  class={`
          nav-menu
          hidden
          absolute md:static left-0 top-[100px] 
          w-screen h-screen md:w-auto md:h-auto
          flex-col md:flex md:flex-row items-center md:items-start gap-10
          p-8 md:p-0
          bg-white dark:bg-zinc-900 md:bg-transparent
        `}
>
  {#each items as item (item.url)}
    <li
      class={`text-xl font-semibold ${
        activePath === item.url ? 'text-primary-600 dark:text-primary-400' : ''
      }`}
    >
      <a class="p-2 rounded-lg" href={item.url}>{item.text}</a>
    </li>
  {/each}
  <li>
    <Button size="lg" href={cta.url} external>{cta.text}</Button>
  </li>
</ul>
