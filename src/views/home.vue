<template>
  <b-container fluid >
    <b-row class="pt-4 pl-5">
      <b-col>
        <b-img fluid width="100" :src="require('../../public/img/logo/logo-background-white.jpg')"></b-img>
      </b-col>
    </b-row>
    <b-row align-v="center" style="height:65vh">
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto"
        md="7"
      >
        <b-card class="text-center">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-2">
                Welcome to
                <b-img height="55"
                  :src="require('../../public/img/logo/brainstorm635.com-white.jpg')">
                </b-img>online
              </h4>
            </b-col>
          </b-row>
          <b-row
            class="text-center justify-content-md-center mt-5"
            align-h="center"
            align-v="end"
          >
            <b-col xl="4" lg="4" md="3" sm="4" xs="3">
              <!-- <router-link> -->
              <b-button
                class="inicial-buttons"
                pill
                variant="outline-secondary"
              >
                About
              </b-button>
            </b-col>
            <b-col xl="5" lg="5" md="8" sm="7" xs="5" >
              <Login> </Login>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from '../components/login'

export default {
  components: { Login }
}
</script>
<style lang="css">
.inicial-buttons {
  padding-left: 1.6rem !important;
  padding-right: 1.6rem !important;
}
</style>
