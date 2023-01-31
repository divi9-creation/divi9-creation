import { writable } from 'svelte/store';

export type FormState = 'error' | 'loading' | 'normal' | 'success';

export const useForm = () => {
  const state = writable<FormState>('normal');

  const setState = (newState: FormState) => state.set(newState);

  return {
    state,
    setState,
  };
};
