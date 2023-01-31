<script lang="ts">
  import { FocusTrap } from '../focus-trap';
  import Logo from './logo.svelte';
  import MobileMenuButton from './mobile-menu-button.svelte';
  import NavMenu from './nav-menu.svelte';
  import { useNavigation } from './navigation';

  const { isFocusTrapActive, toggleMobileMenu } = useNavigation();

  export let activePath: string;
  export let cta: { text: string; url: string };
  export let menuItems: { text: string; url: string }[];
</script>

<svelte:window
  on:keydown={(e) => {
    const isEscapeKey = e.code === 'Escape';

    if ($isFocusTrapActive && isEscapeKey) {
      toggleMobileMenu();
    }
  }}
/>

<FocusTrap active={$isFocusTrapActive}>
  <nav class="py-5 px-4" data-primary-navigation>
    <div class="flex justify-between items-center">
      <div class="w-full flex justify-between items-center">
        <div class="pl-8 md:hidden">
          <MobileMenuButton
            bind:isMenuOpen={$isFocusTrapActive}
            toggle={toggleMobileMenu}
          />
        </div>
        <a href="/">
          <Logo />
        </a>
      </div>
      <NavMenu {activePath} items={menuItems} {cta} />
    </div>
  </nav>
</FocusTrap>
