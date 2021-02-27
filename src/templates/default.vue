<template>
  <div>
    <NavBar />
    <router-view></router-view>
    <Footer class="ixed-bottom foot" />
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

.foot {
  position:fixed;
  bottom:0;
  width:100%;
}
</style>
