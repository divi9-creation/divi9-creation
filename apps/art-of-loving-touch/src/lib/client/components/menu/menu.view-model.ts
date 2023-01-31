import { writable } from 'svelte/store';

export const useMenu = () => {
  const isOpen = writable(false);

  const KEYCODES = {
    DOWN: 40,
    ESC: 27,
    RETURN: 13,
    SPACE: 32,
    UP: 38,
  };

  const toggle = () => {
    isOpen.update((previous) => !previous);
  };

  const onKeydown = () => (e: KeyboardEvent) => {
    const keyCodeValues = Object.values(KEYCODES);

    const isValidKeyCode = (code: string) => {
      return keyCodeValues.some((v) => v === Number(code));
    };

    if (!isValidKeyCode(e.code)) {
      return;
    }

    toggle();
  };

  return {
    isOpen,
    toggle,
  };
};
