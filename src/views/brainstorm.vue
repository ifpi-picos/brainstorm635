
<template>
  <div>
    <b-card
      class="text-center p-5 card-brainstorm"
      align-h="center"
      align-v="end"
    >
      <h3 class="page-tittle">Brainstorm</h3>
        <b-row
          class="mt-5 d-flex justify-content-begin">
          <b-col md="4">
            <router-link :to="{ name: 'joinToBrainstorm' }">
              <b-button
                @click="createNewBrainstorming"
                size="lg"
                class="inicial-buttons"
                pill
                variant="outline-secondary"
              >Novo Brainstorm
                <i class="fas fa-plus"></i>
              </b-button>
            </router-link>
          </b-col>
          <b-col md="8">
            <form action="">
              <b-input-group
                class="d-flex justify-content-end">
                <b-form-input
                  disabled
                  type="text"
                  placeholder="Entrar com o código">
                  </b-form-input>
                <b-input-group-append>
                  <b-button size="lg" variant="outline-primary">Entrar</b-button>
                </b-input-group-append>
              </b-input-group>
            </form>
          </b-col>

      </b-row>
    </b-card>
  </div>
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

.inicial-buttons {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.input-group > .form-control, .input-group > .form-control-plaintext, .input-group > .custom-select, .input-group > .custom-file {
  flex: none !important;
  width: 30% !important;
  padding: 1.5rem !important;
}

.btn-outline-primary {
  color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}

.btn-outline-primary:hover {
  color: #fff !important;
  border-color: #17a2b8 !important;
  background-color: #17a2b8 !important;
}

.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}

.btn-outline-primary:focus, .btn-outline-primary.focus {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px 0px !important;
}
</style>
