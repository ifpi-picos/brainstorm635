
<template>
   <b-container>
    <b-row>
      <b-col class=" d-flex brain-card align-items-center justify-content-center" md="12">
        <b-card
          class="text-center">
          <h4 class="page-tittle mt-4 mb-3">Brainstorm</h4>
            <b-row
              class="mt-5">
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

.brain-card {
  height: calc(100vh - 150px);
}
</style>
