<script lang="ts">
  export let value: string;
</script>

<div class="hustleui-rich-text">
  {@html value}
</div>

<style lang="scss" global>
  .hustleui-rich-text {
    p {
      margin-bottom: 1rem;
    }
  }
</style>
