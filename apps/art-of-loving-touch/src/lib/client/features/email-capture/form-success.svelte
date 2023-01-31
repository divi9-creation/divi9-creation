<script lang="ts">
  import { Button, Heading } from '$client/components';

  export let offerUrl: string;
</script>

<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
  <div class="grid gap-4">
    <p class="text-heading-md font-medium">Thanks, you're all set!</p>
    <p>
      Check your inbox for an email with a link to the download. You can also
      click the button below to access it now.
    </p>
    <Button href={offerUrl} external>Download Now</Button>
  </div>
</div>
