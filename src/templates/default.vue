<template>
  <div>
    <NavBar />
    <router-view></router-view>
    <Footer class="fixed-bottom" />
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
#app div .container-fluid {
  margin-top: 90px;
  margin-bottom: 90px;
}
</style>
