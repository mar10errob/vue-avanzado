<template lang="pug">
  .container
    .columns
      .column.is-5.is-offset-4
        .notification(:class="color")
          slot(name="body") Algo anduvo mal.
</template>
<script>
  export default {
    props: {
      color: { type: String, default: 'is-success' }
    }
  }
</script>
<style lang="scss" scoped>
  .notification {
    margin: 10px;
  }
</style>
