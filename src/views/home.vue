<template>
  <b-container fluid>
    <b-row align-v="center">
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto"
        md="7"
      >
        <b-card class="text-center pr-5 pl-5 pb-5 pt-0 mt-3">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-4">
                Welcome to Brainstorm 635 online
              </h4>
            </b-col>
          </b-row>
          <b-row
            class="text-center justify-content-md-center mt-5 pt-4"
            align-h="center"
            align-v="end"
          >
            <b-col md="3">
              <!-- <router-link> -->
              <b-button
                class="inicial-buttons"
                pill
                variant="outline-secondary"
              >
                About
              </b-button>
            </b-col>
            <b-col md="6">
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
