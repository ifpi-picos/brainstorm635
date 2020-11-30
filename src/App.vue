<template>
<div id="app">
  <NavBar />
  <div>
    <router-view></router-view>
     <Footer />
  </div>
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
    return {
    }
  }
  /* mounted () {
    console.log(this.$firebase)
  } */
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50 !important;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
