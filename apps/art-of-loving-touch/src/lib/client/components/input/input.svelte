<script lang="ts">
  export let className: string = '';
  export let error: boolean;
  export let name: string;
  export let placeholder: string = '';
  export let required: boolean = true;
  export let type: 'email' | 'text' = 'text';

  export { className as class };
</script>

<input
  class={`surface surface-1 w-full h-11 pl-10 border rounded-lg focus:outline focus:outline-4 focus:outline-primary-100 dark:focus:outline-primary-800 focus:border-primary-300 dark:focus:border-primary-600 ${className} ${
    error
      ? 'border-error-300 dark:border-error-500'
      : 'border-gray-300 dark:border-gray-700'
  }`}
  {type}
  {name}
  {placeholder}
  {required}
/>
