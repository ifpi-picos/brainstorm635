<template>
  <div id="app">

    <Navbar class="nav"></Navbar>

    <router-view />

    <Footer></Footer>
  </div>
</template>

<script>

import Footer from './components/footer'
import Navbar from './components/navbar'

export default {
  components: { Footer, Navbar },
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
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color:#f0f2f5; */

  /* f7 é o mais claro */
  /* background-color: #f7f7f7; */

  background-color: #FAFAFA !important;
  color: #2c3e50 !important;
}

.nav {
  margin-bottom: 100px !important;
  display: inline-block !important;
}

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
