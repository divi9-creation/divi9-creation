<script lang="ts">
  import {
    Button,
    Form,
    FormControl,
    FormErrorMessage,
    Input,
  } from '$client/components';
  import EmailIcon from './email-icon.svelte';
  import FormLoading from './form-loading.svelte';
  import FormSuccess from './form-success.svelte';
  import { useEmailCaptureForm } from './form.view-model';

  export let actionText: string;
  export let privacyStatement: string;
  export let offer: { id: string; name: string; type: string; url: string };

  const { errorMessage, errors, state, form } = useEmailCaptureForm({ offer });
</script>

<Form loadingComponent={FormLoading} {form} state={$state}>
  <svelte:fragment slot="success">
    <FormSuccess offerUrl={offer.url} />
  </svelte:fragment>

  <div class="grid gap-5">
    <FormControl label="Email" name="email" errors={$errors.email}>
      <div class="relative mt-1 rounded-md shadow-sm">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <EmailIcon />
        </div>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          error={!!$errors.email}
        />
      </div>
    </FormControl>

    <FormErrorMessage message={$errorMessage} />

    <div class="rounded-md shadow">
      <Button>{actionText}</Button>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400">
      {@html privacyStatement}
    </p>
  </div>
</Form>
