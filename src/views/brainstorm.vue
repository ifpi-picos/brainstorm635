<template>
  <b-container fluid>
    <b-row align-v="start">
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto"
        md="10"
      >
        <b-card class="text-center pr-3 pl-3 pb-3 pt-0">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-3">Create Brainstorm</h4>
            </b-col>
          </b-row>
          <b-form @submit.prevent="startBrainstorm()">
            <b-row align-h="center" class="mb-5">
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-group-1"
                  label="Description"
                  label-for="input-1"
                  label-class="required"
                >
                  <b-input-group>
                    <b-input-group-prepend
                      class="input-with-prepend">
                      <span class="input-group-text"
                        ><i class="fas fa-file-signature fa-lg"></i>
                      </span>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      :disabled="!isLeader"
                      @blur="saveDescription"
                      class="input-with-prepend input-code"
                      id="input-1"
                      v-model="description"
                      placeholder="Describe the brainstorm"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  class="text-left"
                  id="input-group-2"
                  label="Brainstorm code"
                  label-for="copyCode"
                >
                  <b-input-group>
                    <b-form-input
                      id="copyCode"
                      @click="codeSelect()"
                      readonly
                      class="input-code"
                      v-model="brainstormId"
                      value="this.code"
                    >
                    </b-form-input>
                    <b-input-group-append
                      class="input-with-prepend">
                      <b-button
                        v-b-tooltip.hover.v-info
                        title="Copy Code"
                        class="line-button"
                        variant="light"
                        @click="copyCodeToClipboad()"
                      >
                        <i class="fas fa-copy fa-lg" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group
                  id="input-group-3"
                  label="Active members"
                  label-for="input-3"
                  class="text-left "
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"
                        ><i class="fas fa-users fa-lg"></i
                      ></span>
                    </b-input-group-prepend>
                    <b-form-input
                      disabled
                      type="number"
                      v-model="activeMembers"
                      id="input-3"
                      class="input-with-prepend input-code text-center"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="" align-h="center">
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-name-1"
                  label-for="name-1"
                >
                  <!--  v-b-tooltip.hover.topright.v-info
                    title="Edit my name" -->
                  <b-input-group
                    v-for="user in listGuests"
                    :key="user.uid" class="mb-2">
                    <b-input-group-prepend>
                      <span class="photo-guests" variant="light">
                        <div v-if="user.photoURL === '46'">
                          <i class="fas fa-user fa-lg"></i>
                          1
                        </div>
                        <b-avatar v-else :src="user.photoURL"></b-avatar>
                      </span>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="guests"
                      value=""
                      :disabled="true"
                      v-model="user.displayName"
                      :id="user.uid"
                    >
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-spinner
                  variant="info"
                  label="Spinning"
                  style="width: 1.5rem; height: 1.5rem;"
                  type="grow"
                ></b-spinner>
                <span
                  v-if="currentRound === 0"
                  class="text-spinner text-flashes"
                  >Waiting for members to start...
                </span>
                <span
                  v-else
                  class="text-spinner text-flashes"
                  >Waiting for continue...
                </span>
                <br /><br />
                <span
                  v-if="isLeader"
                  class="loading"
                  >Start when all members are registered</span
                >
                <b-row align-h="center" class="pt-4">
                  <b-button
                    v-if="isLeader"
                    :disabled="disabledButton"
                    type="submit"
                    class="pl-3 pr-3"
                    pill
                    variant="outline-info"
                  >
                    <template v-if="currentRound === 0">Start</template>
                    <template v-else>Continue</template>
                  </b-button>
                </b-row>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'
/* import { EventBus } from '@/eventBus' */

export default {
  data () {
    return {
      disabledButton: true,
      activeMembers: 1,
      brainstormId: this.$route.params.id,
      listGuests: [],
      isLeader: false,
      description: '',
      currentRound: 0
    }
  },

  mounted: function () {
    /* EventBus.$on('updateList', () => {
      this.getData()
    }) */
    this.getData()
  },

  methods: {
    saveDescription () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.update({
        description: this.description
      })
    },

    getData () {
      try {
        const db = this.$firebase.firestore()
        db.collection('brainstorms')
          .doc(this.brainstormId)
          .onSnapshot(doc => {
            if (doc.exists) {
              this.listGuests = doc.data().listGuests
              this.isLeader = doc.data().leader === this.$firebase.auth().currentUser.uid
              this.activeMembers = doc.data().listGuests.length
              this.description = doc.data().description
              this.currentRound = doc.data().currentRound
              const running = doc.data().running
              if (running) {
                const currentRound = 'round' + doc.data().currentRound
                this.$router.push({ name: 'startBrainstorm', params: { id: this.brainstormId, round: currentRound } })
              }
              if (this.activeMembers >= 3) {
                this.disabledButton = false
              } else {
                this.disabledButton = true
              }
            } else {
              console.log('The Brainstorm not exist!')
            }
          })
      } catch (error) {
        console.error(error)
      }
    },

    codeSelect () {
      const copyText = document.getElementById('copyCode')
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
    },

    copyCodeToClipboad () {
      const copyText = document.getElementById('copyCode')
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      Swal.fire({
        title: 'Code copied!',
        text: 'You cant alread sent it to your friends!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 1200
      })
    },

    startBrainstorm () {
      let currentRound

      const db = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      db.get().then((doc) => {
        if (doc.exists) {
          currentRound = doc.data().currentRound === 0 ? 1 : doc.data().currentRound
          this.saveDescription()
          db.update({
            running: true,
            currentRound: currentRound,
            listFinishWriteIdeas: [],
            hourOfStartRound: Date(),
            concluded: false
          })
        }
      })
    }
  }
}
</script>

<style lang="css">

/* Style for inputs from brainstorm scream */
.line-button {
  border: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: #fff !important;
  color: #17a2b8 !important;
}

.line-button:hover {
  background-color: #fff !important;
  box-shadow: none !important;
}

.line-button:focus {
  background-color: #fff !important;
  box-shadow: none !important;
  border: none !important;
}

.input-with-prepend:focus,   .input-code:focus {
  box-shadow: none !important;
  border: none !important;
}

.input-code, .form-control:disabled {
  background-color: #fff !important;
}

/* Efects for spinner and text spinner */
.text-spinner {
  margin-left: 7px;
  color: #17a2b8;
   font-family: comfortaa;
  font-size: 16px;
}

@keyframes blink {
  0% {
    color: #17a2b8;
    font-size: 16.5px;
  }
  100% {
    color: black;
  }
}
@-webkit-keyframes blink {
  0% {
    color: #17a2b8;
    font-size: 16.5px;
  }
  100% {
    color: black;
  }
}
.text-flashes {
  -webkit-animation: blink 1.3s linear infinite;
  -moz-animation: blink 1.3s linear infinite;
  animation: blink 1.3s linear infinite;
}

/* Changing the background color of input appends */
.input-group-text, .photo-guests {
  background-color: #fff !important;
  color: #138496 !important;
  /*  opacity: 1.95 !important; */
  border: none !important;
}

.guests, .input-with-prepend, .input-with-append, .input-code{
  border: none !important;
}

.guests:focus {
  box-shadow: none !important;
}

.loading {
  font-size: 15.5px;
}
</style>
