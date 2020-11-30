<template>
  <b-container fluid>
    <b-row align-v="center">
      <b-col class="align-items-center justify-content-center ml-auto mr-auto" md="7">
        <b-card
          class="text-center pr-5 pl-5 pb-5 pt-0 mt-5">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-4"> Bem vindo o Brainstorm 635 online</h4>
            </b-col>
          </b-row>
          <b-row
            class="text-center justify-content-md-center mt-5 pt-4"
            align-h="center"
            align-v="end">
            <b-col md="3">
              <!-- <router-link> -->
              <b-button
                class="inicial-buttons"
                pill
                variant="outline-info">
                Sobre
              </b-button>
            </b-col>
            <b-col md="3">
              <!-- </router-link> -->
              <router-link :to="{ name: 'brainstorm' }">
                <b-button
                  class="inicial-buttons"
                  pill
                  variant="outline-success">
                  Iniciar
                </b-button>
              </router-link>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="css">
.inicial-buttons {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

</style>
