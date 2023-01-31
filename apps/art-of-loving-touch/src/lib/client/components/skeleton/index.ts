import { default as Circle } from './circle.svelte';
import { default as Rectangle } from './rectangle.svelte';
import { default as SkeletonRoot } from './skeleton.svelte';

export const Skeleton = Object.assign(SkeletonRoot, {
  Circle,
  Rectangle,
});
