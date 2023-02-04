import { writable } from 'svelte/store';

export const featureFlagsStore = writable<App.FeatureFlag[]>();
