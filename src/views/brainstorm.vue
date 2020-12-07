
<template>
   <b-container fluid>
    <b-row align-v="end">
      <b-col class="brain-card align-items-center justify-content-center ml-auto mr-auto" md="7">
        <b-card
          class="text-center pr-5 pl-5 pb-5 pt-0 mt-3">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-4">Brainstorm</h4>
            </b-col>
          </b-row>
          <b-row
            class="text-center mt-4">
            <b-col md="6">
              <b-button
                @click="createNewBrainstorm () "
                class="new-brain-button mt-5"
                variant="outline-info">
                New Brainstorm
                <i class="fas fa-plus"></i>
              </b-button>
            </b-col>
            <b-col md="6">
              <form action="" >
                <b-row class="mt-5">
                  <b-col md="12" class="d-flex">
                    <b-form-input
                      class="input-join"
                      type="text"
                      placeholder="Entrar com o código">
                    </b-form-input>
                    <b-button
                      type="submit"
                      variant="info">
                      Join
                    </b-button>
                  </b-col>
                </b-row>
              </form>
            </b-col>
          </b-row>
        </b-card>
<!--         <b-modal
          centered
          id="modal"
          title="Informe seu nome">
          <template v-slot:modal-footer="{ hide }">
            <form  @submit.prevent="checkForm()">
              <b-form-group
                label="Nome"
                label-for="name-input"
                label-class="required"
                invalid-feedback="Name is required">
                <b-form-input
                  placeholder="Informe seu nome"
                  id="name-input"
                  v-model="name"
                  @change="$v.name.$touch()"
                  required>
                </b-form-input>
                <span
                  class="warning-input-forms"
                  v-if="$v.name.$error">
                  O campo nome é obrigatório ter no mínimo 4 caracteres.
                </span>
              </b-form-group>
              <br>
              <b-row>
                <b-col class="ml-auto mr-auto" sm="6">
                  <b-button size="sm" variant="outline-danger" @click="hide()">Cancelar</b-button>
                  <b-button class="ml-4 pl-4 pr-4" type="submit" size="sm" variant="outline-success">Ok</b-button>
                </b-col>
              </b-row>
             </form>
          </template>
        </b-modal> -->
      </b-col>
    </b-row>
   </b-container>
</template>

<script>

export default {
  data () {
    return {
      idBrainstorm: ''
    }
  },

  props: {
  },

  methods: {
    createNewBrainstorm () {
      this.$firebase.firestore().collection('brainstorms').add({
        /* leader: 'Edmarques',
        users: ['Rafael', 'Jáder', 'Wisley', 'Pedro', 'Georgina'],
        description: 'iBeer',
        ideas: [] */
      }).then(function (docRef) {
        /* this.idBrainstorm = docRef.id */
        console.log('Document id: ', docRef.id)
      }).catch(function (error) {
        console.error(error)
      })
      this.$router.push({ name: 'newBrainstorm' })
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

/* Changes for Modal */
.modal-title {
  font-weight: bold;
  text-transform: uppercase;
}

.modal-body {
  padding: 0 !important;
}

.modal-footer {
  border-top: none !important;
  display: inline-block !important;
  padding: 0 0 0.75rem 0 !important;
}

.modal-footer > * {
  margin: 1rem 1.5rem !important;
}

.modal-content {
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 0.2) !important;
}

.input-join {
  padding-top: 1.5rem !important;
}

/* Chancge colors for class button .btn-secondary */
/* .btn-outline-danger {
  background-color: transparent !important;
  border-color: #ce242a !important;
  color: #bd2130 !important;
}

.btn-outline-danger:hover {
  color: #fff !important;
  background-color: #bd2130 !important;
  border-color: #a94442 !important;
}

.btn-outline-danger:focus {
  color: #fff !important;
  background-color: #a94442 !important;
  border-color: #a94442 !important;
  box-shadow: 0 0 0 0.2rem rgba(225,83,97,.5) !important;
} */

</style>
