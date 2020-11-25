<template>
  <div class="container-fluid container-central-card">
    <b-row>
      <b-col class="home-card">
        <b-card
          class="text-center pt-4 ">
          <b-row>
            <b-col>
              <h4 class="mt-1 page-tittle md"> Bem vindo o Brainstorm 635 online</h4>
            </b-col>
          </b-row>
          <b-row
            class="text-center justify-content-md-center mt-5 pt-5"
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
  </div>
</template>

<style lang="css">
.inicial-buttons {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
.home-card{
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
