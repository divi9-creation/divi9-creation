import { createFocusTrap } from 'focus-trap';
import type { Action } from 'svelte/action';

export const trapFocus: Action = (node, active) => {
  const trap = createFocusTrap(node);

  const activate = () => {
    trap.activate();
  };

  const deactivate = () => {
    trap.deactivate();
  };

  active ? activate() : deactivate();

  return {
    update: (active) => {
      active ? activate() : deactivate();
    },
    destroy: () => {},
  };
};
