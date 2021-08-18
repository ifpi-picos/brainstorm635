<template>
  <div class="default">
    <NavBar class="ixed-top"/>
    <router-view class="main-content"></router-view>
    <Footer class="position-footer ixed-bottom" />
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

@media only screen and (min-height: 598px) {
  .position-footer {
    position: fixed !important;
    bottom: 0 !important;
  }
}

@media only screen and (max-height: 799px) {
  .position-footer {
    position: relative !important;
    bottom: 0 !important;
  }
}

/* @media only screen and (min-height: 1124px) {
  .position-footer {
    position: relative !important;
    bottom: none !important;
  }
} */

</style>
