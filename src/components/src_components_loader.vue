<template>
  <div
    v-if="visivel"
    class="loader-overlay"
  >
    <div class="loader"></div>
    <span
      class="text"
      v-html="text"
    ></span>
  </div>
</template>
<script>
export default {
  name: 'Loader',
  props: {
    visivel: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<style lang="scss">
</style>
