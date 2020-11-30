
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
            class="text-center mt-4">
            <b-col md="6">
              <router-link :to="{ name: 'newBrainstorm' }">
                <b-button
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
                    <b-button
                      variant="outline-primary"
                      v-b-modal.modal-1>
                      Entrar
                    </b-button>
                  </b-input-group-append>
                <!-- </b-input-group> -->
              </form>
            </b-col>
          </b-row>
        </b-card>
        <b-modal
          id="modal-1"
          title="Informe seu nome">
          <form  @submit="nextPage()">
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
            <b-button variant="danger"></b-button>
          </form>
        </b-modal>
      </b-col>
    </b-row>
   </b-container>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      name: '',
      nameState: null
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    }
  },
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
    },

    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },

    netxPage () {
      this.checkFormValidity()
      this.checkForm()
      this.$router.push({ name: 'newBrainstorm' })
    },

    checkForm () {
      this.$v.$touch()
      if (!this.$v.name.$error) {
        Swal.fire({
          title: 'Código copiado',
          text: 'Você já pode enviá-lo aos seus amigos',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1200
        })
      }
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
.modal-footer {
margin-left: auto !important;
margin-right: auto !important;
border-top: none !important;
}

.modal-footer > * {
margin: 1rem 1.5rem !important;
}

.modal-content {
box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 0.2) !important;
}

.modal {
top: 120px !important;
}

/* Chancge colors for class button .btn-secondary */
.btn-secondary {
  background-color: transparent !important;
  border-color: #ce242a !important;
  color: #bd2130 !important;
}

.btn-secondary:hover {
  color: #fff !important;
  background-color: #bd2130 !important;
  border-color: #a94442 !important;
}

.btn-secondary:focus {
  color: #fff !important;
  background-color: #a94442 !important;
  border-color: #a94442 !important;
  box-shadow: 0 0 0 0.2rem rgba(225,83,97,.5) !important;
}
</style>
