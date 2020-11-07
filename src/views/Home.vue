<template>
  <div>
    <b-card
      no-body
      class="text-center p-5 card-home"
      align-h="center"
    >
      <h1> Bem vindo ao FastStorm, o Brainstorm 635 online</h1>
        <b-row
          class="mt-5"
          align-h="center">
          <!-- <router-link> -->
          <b-button
            size="lg"
            class="mr-5 inicial-buttons"
            pill
            variant="outline-info"
          >Sobre</b-button>
        <!-- </router-link> -->
        <router-link :to="{ name: 'brainstorm' }">
          <b-button
            size="lg"
            class="ml-5 inicial-buttons"
            pill
            variant="outline-success">Iniciar</b-button>
        </router-link>
      </b-row>
    </b-card>
  </div>
</template>
<style lang="css">
  .card-home {
    margin-top: 10% !important;
    position: absolute !important;
    display: inline-flex !important;
    height: 250px;
    width: 60%;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1);
  }

  .inicial-buttons {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
</style>
