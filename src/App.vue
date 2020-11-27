
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

<style lang="css">
/* @import '../node_modules/font-awesome/css/font-awesome.css';
@import './assets/main.scss';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss'; */

body {
  padding: 75 0 75px 0px !important;
  height: 100vh !important;
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
