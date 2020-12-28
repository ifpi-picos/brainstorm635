<template>
  <b-container fluid>
    <br>
    <b-row align-v="end">
      <b-col
        class="brain-card align-items-center justify-content-center ml-auto mr-auto"
        md="7"
      >
        <b-card class="text-center pr-5 pl-5 pb-5 pt-0 mt-3">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-4">Brainstorm</h4>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col md="6">
              <b-button
                @click="createNewBrainstorm()"
                class="new-brain-button mt-5"
                variant="outline-info"
              >
                New Brainstorm
                <i class="fas fa-plus"></i>
              </b-button>
            </b-col>
            <b-col md="6">
              <b-form @submit.prevent="joinWithCode(coderoom)">
                <b-row class="mt-5">
                  <b-col
                    md="12"
                    class="d-flex"
                  >
                    <b-form-input
                      class="input-for-code"
                      v-model="coderoom"
                      placeholder="Join with code"
                      maxlength="10"
                    >
                    </b-form-input>
                    <b-button
                      type="submit"
                      variant="info"
                    >
                      Join
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
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
import firebase from 'firebase/app'
import Swal from 'sweetalert2'
/* import { EventBus } from '@/eventBus' */

export default {
  data () {
    return {
      idBrainstorm: '',
      coderoom: ''
    }
  },

  props: {},

  methods: {
    createNewBrainstorm () {
      /* EventBus.$emit('updateList') */
      const id = this.codeGenerator(6)
      const uid = this.$firebase.auth().currentUser.uid
      const user = JSON.parse(localStorage.getItem('currentUser'))
      this.$firebase
        .firestore()
        .collection('brainstorms')
        .doc(id.toString())
        .set({
          started: false,
          leader: uid,
          description: '',
          listGuests: [user],
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      this.$router.push({ name: 'brainstorm', params: { id: id } })
    },

    codeGenerator (length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },

    async joinWithCode (coderoom) {
      coderoom = coderoom.trim()
      coderoom = coderoom.toUpperCase()
      if (coderoom) {
        const database = this.$firebase.firestore().collection('brainstorms')
        await database.doc(coderoom).onSnapshot(doc => {
          doc.metadata.hasPendingWrites = 'Server'

          const dataGuest = JSON.parse(localStorage.getItem('currentUser'))
          if (doc.exists) {
            let userExists = false
            doc.data().listGuests.map(user => {
              if (user.uid === dataGuest.uid) {
                userExists = true
              }
            })

            const numberOfGuests = doc.data().listGuests.length
            if (numberOfGuests < 6 || userExists) {
              const users = doc.data().listGuests
              this.saveGuestInBrainstorm(dataGuest, coderoom, users)
              this.$router.push({ name: 'brainstorm', params: { id: coderoom } })
            } else {
              this.fullBrainstorm()
            }
          } else {
            this.nonExistentBrainstorm()
          }
        })
      }
    },

    async saveGuestInBrainstorm (dataGuest, coderoom, users) {
      const brainstorm = this.$firebase.firestore().collection('brainstorms').doc(coderoom)
      let guestExists = false
      if (users) {
        users.map(guest => {
          if (guest.uid === dataGuest.uid) guestExists = true
        })
        if (!guestExists) {
          await brainstorm.update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            listGuests: firebase.firestore.FieldValue.arrayUnion(dataGuest)
          })
        }
      }
    },

    fullBrainstorm () {
      Swal.fire({
        title: 'The Brainstorm is full!',
        text: 'You are trying to access the Brainstorm, but it´s reached the number maximum of guests!',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 4000
      })
    },

    nonExistentBrainstorm () {
      Swal.fire({
        title: 'Brainstorm not existent!',
        text: 'You are trying to access a non-existent Brainstorm, try another code!',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 4000
      })
    }
  }
}
</script>

<style lang="css">
* {
  box-sizing: border-box;
}

.input-for-code {
  padding: 1.2rem 0.5rem !important;
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
