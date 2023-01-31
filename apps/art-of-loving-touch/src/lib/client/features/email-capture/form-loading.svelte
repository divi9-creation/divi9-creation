<script>
  import { Skeleton } from '$client/components';
</script>

<Skeleton>
  <div class="grid gap-6">
    <div class="grid gap-3">
      <Skeleton.Rectangle width={20} height={20} />
      <Skeleton.Rectangle width={100} height={40} />
    </div>
    <div class="grid gap-3">
      <Skeleton.Rectangle width={100} height={50} />
    </div>
  </div>
</Skeleton>
