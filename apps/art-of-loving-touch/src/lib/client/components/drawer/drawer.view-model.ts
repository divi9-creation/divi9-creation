import { PageScrollLock } from '$client/utils';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

const FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const useDrawer = () => {
  const isOpen = writable(false);

  const KEYBOARD_CODES = {
    ESC: 'Escape',
    ENTER: 'Enter',
    SPACE: 'Space',
    TAB: 'Tab',
  };

  let previousActiveElement: HTMLElement | null;
  let drawerElement: HTMLElement | null;

  onMount(() => {
    drawerElement = document.querySelector('.hustleui-drawer');
  });

  const open = () => {
    if (drawerElement) {
      previousActiveElement = document.activeElement as HTMLElement; // store the element used to open the modal for later

      const focusableElements =
        drawerElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);

      const firstFocusableElement = focusableElements[0];

      document.addEventListener('keydown', onKeydown(focusableElements));

      isOpen.set(true);
      firstFocusableElement.focus();
      PageScrollLock.enable();
    }
  };

  const close = () => {
    if (previousActiveElement) {
      previousActiveElement.focus(); // return focus to the element used to open the drawer
    }

    isOpen.set(false);
    document.removeEventListener('keydown', onKeydown);
    PageScrollLock.disable();
  };

  const isActiveElement = (element: Element) =>
    document.activeElement === element;

  const onKeydown =
    (focusableElements: NodeListOf<HTMLElement>) => (e: KeyboardEvent) => {
      const code = e.code;

      if (code === KEYBOARD_CODES.ESC) {
        close();
      }

      if (code !== KEYBOARD_CODES.TAB) {
        return;
      }

      // We know the user has pressed the tab key at this point
      let firstOrLastFocusableElement;

      const isShiftKeyPressed = e.shiftKey;

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      const isFirstFocusableElement = isActiveElement(firstFocusableElement);
      const isLastFocusableElement = isActiveElement(lastFocusableElement);

      if (isShiftKeyPressed) {
        // Go to the last focusable element if focused on the first one
        if (isFirstFocusableElement) {
          firstOrLastFocusableElement = lastFocusableElement;
        }
      } else {
        // Go to the first focusable element if focused on the last one
        if (isLastFocusableElement) {
          firstOrLastFocusableElement = firstFocusableElement;
        }
      }

      if (firstOrLastFocusableElement) {
        firstOrLastFocusableElement.focus();
        e.preventDefault();
      }
    };

  return {
    isOpen,
    close,
    open,
  };
};

// const sidebarToggleNode = document.querySelector('.sidebar-toggle');
// sidebarToggleNode.addEventListener('click', () => drawer.open());
