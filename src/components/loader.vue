<template>
  <b-container fluid class="container-loader text-center">
    <b-spinner style="width: 4rem; height: 4rem;" variant="info" type="grow"></b-spinner><br><br>
    <h5 class="load">Loading info...</h5>
  </b-container>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.container-loader {
  margin-top: 75px;
  padding-top: 10%;
  padding-bottom: 10%;
}

.load {
  font-weight: bold;
  font-family: 'comfortaa';
}
</style>
