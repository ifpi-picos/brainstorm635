<template>
  <div class="template">
    <NavBar />
      <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'default',
  components: {
    NavBar,
    Footer
  },
  data () {
    return {}
  }
}
</script>

<style lang="css">
/* .template {
  background-color: #fafafa !important;
  width: 100% !important;
  height: 100% !important;
} */
</style>
