<template>
  <div class="default">
    <NavBar class="ixed-top"/>
    <router-view class="main-content"></router-view>
    <Footer class="ixed-bottom" />
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
  .main-content {
    margin-top: 60px;
    margin-bottom: 60px;
  }

</style>
