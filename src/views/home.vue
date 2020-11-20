<template>
  <div>
    <b-card
      class="text-center pt-4 central-card"
    >
      <h4 class="mt-1 page-tittle"> Bem vindo o Brainstorm 635 online</h4>
        <b-row
          class="mt-5"
          align-h="center">
          <!-- <router-link> -->
        <b-button
          class="mr-5 mt-5 inicial-buttons"
          pill
          variant="outline-info"
          >Sobre
        </b-button>
        <!-- </router-link> -->
        <router-link :to="{ name: 'brainstorm' }">
          <b-button

            class="ml-5 mt-5 inicial-buttons"
            pill
            variant="outline-success">Iniciar</b-button>
        </router-link>
      </b-row>
    </b-card>
  </div>
</template>

<style lang="css">
  .inicial-buttons {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
</style>
