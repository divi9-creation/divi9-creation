import { PageScrollLock } from '$client/utils';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

const PRIMARY_NAV_SELECTOR = 'nav[data-primary-navigation]';

export const useNavigation = () => {
  const isFocusTrapActive = writable(false);

  let navEl: HTMLElement;
  let menuEl: HTMLElement;

  onMount(() => {
    navEl = document.querySelector(PRIMARY_NAV_SELECTOR)!;
    menuEl = navEl.querySelector('.nav-menu')!;
  });

  const hideMobileNav = () => {
    if (menuEl) {
      menuEl.classList.add('hidden');
      menuEl.classList.remove('flex');
    }
  };

  const showMobileNav = () => {
    if (menuEl) {
      menuEl.classList.remove('hidden');
      menuEl.classList.add('flex');
    }
  };

  const toggleMobileMenu = () => {
    isFocusTrapActive.update((previous) => {
      const newValue = !previous;
      previous ? hideMobileNav() : showMobileNav();

      return newValue;
    });

    PageScrollLock.toggle();
  };

  return {
    isFocusTrapActive,
    toggleMobileMenu,
  };
};
