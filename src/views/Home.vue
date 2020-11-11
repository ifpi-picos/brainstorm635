<template>
  <div>
    <b-card
      class="text-center p-5 card-home1"
      align-h="center"
    >
      <h1 class="mt-3"> Bem vindo o Brainstorm 635 online</h1>
        <b-row
          class="mt-5"
          align-h="center">
          <!-- <router-link> -->
        <b-button
          size="lg"
          class="mr-5 mt-5 inicial-buttons"
          pill
          variant="outline-info"
        >Sobre
      </b-button>
        <!-- </router-link> -->
        <router-link :to="{ name: 'brainstorm' }">
          <b-button
            size="lg"
            class="ml-5 mt-5 inicial-buttons"
            pill
            variant="outline-success">Iniciar</b-button>
        </router-link>
      </b-row>
    </b-card>
  </div>
</template>
<style lang="css">
  .card-home1 {
    vertical-align: middle;
    font-family: Comfortaa !important;
    margin-top: 15% !important;
    /* align-content: center; */
    position: relative !important;
    display: inline-flex !important;
    height: 350px !important;
    padding: 15% !important;
    width: 50% !important;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.16);
  }

  .inicial-buttons {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }

  h1 {
    font-family: Comfortaa !important;
  }
</style>
