
<template>
   <b-container fluid>
    <b-row align-v="end">
      <b-col class="brain-card align-items-center justify-content-center ml-auto mr-auto" md="7">
        <b-card
          class="text-center pr-5 pl-5 pb-5 pt-0">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-4">Brainstorm</h4>
            </b-col>
          </b-row>
          <b-row
            class="text-center mt-5">
            <b-col md="6">
              <router-link :to="{ name: 'newBrainstorm' }">
                <b-button
                  @click="createNewBrainstorming"
                  class="new-brain-button mt-5"
                  variant="outline-secondary"
                >Novo Brainstorm
                  <i class="fas fa-plus"></i>
                </b-button>
              </router-link>
            </b-col>
            <b-col md="6">
              <form action="" >
                <!-- <b-input-group
                  > -->
                  <b-input-group-append class="justify-content-end mt-5">
                  <b-form-input
                    type="text"
                    placeholder="Entrar com o código">
                  </b-form-input>

                    <b-button variant="outline-primary">Entrar</b-button>
                  </b-input-group-append>
                <!-- </b-input-group> -->
              </form>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
   </b-container>
</template>

<script>
export default {
  methods: {
    createNewBrainstorming () {
      this.$firebase.firestore().collection('brainstorms').add({
        leader: 'Edmarques',
        users: ['Rafael', 'Jáder', 'Wisley', 'Pedro', 'Georgina'],
        description: 'iBeer',
        ideas: []
      }).then(function (docRef) {
        console.log('Document id: ', docRef.id)
      }).catch(function (error) {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="css">
  * {
    box-sizing: border-box
  }

.form-control {
  padding: 1.3rem 0.5rem !important;
}

/* .brain-card {
  height: calc(100vh - 150px);
} */
</style>
