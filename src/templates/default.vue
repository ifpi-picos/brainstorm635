<template>
  <div class="default">
    <NavBar class="fixed-to"/>
    <router-view class="main-content"></router-view>
    <Footer class="ixed-bottom footer" />
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
  #app div .main-content {
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .nav-footer-bar {
    min-height: 100% !important;
  }
</style>
