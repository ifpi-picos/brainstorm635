
<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
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
body {
  padding: 75px 0 75px 0;
  height: 100vh;
}
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
