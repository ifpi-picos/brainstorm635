<template>
  <div>
    <Loader v-if="loading"> </Loader>
    <b-container v-if="!loading" fluid>
      <b-row align-v="start">
        <b-col
          class="align-items-center justify-content-center ml-auto mr-auto"
          md="10"
        >
          <b-card class="text-center pr-3 pl-3 pb-3">
            <b-row>
              <b-col>
                <h4 class="page-tittle page-tittle-text mb-5">Brainstorm</h4>
              </b-col>
            </b-row>
            <b-form @submit.prevent="startBrainstorm()">
              <b-row align-h="center" class="mb-5">
                <b-col md="4">
                  <b-form-group
                    class="text-left"
                    id="input-group-1"
                    label="Theme Description"
                    label-for="input-1"
                    label-class="required"
                  >
                    <b-input-group>
                      <b-input-group-prepend
                        class="input-with-prepend">
                        <span class="input-group-text color-icon"
                          ><i class="fas fa-file-signature fa-lg"></i>
                        </span>
                      </b-input-group-prepend>
                      <b-form-input
                        v-b-tooltip.hover.topright.v-info
                        title="Edit description"
                        type="text"
                        :disabled="!isLeader"
                        @blur="saveDescription"
                        class="input-with-prepend"
                        autofocus
                        id="input-1"
                        v-model="description"
                        placeholder="Describe the brainstorm"
                      >
                      </b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group
                    label-class="required"
                    label="Rounds time"
                    label-for="rounds-time"
                  >
                    <b-form-timepicker
                      @hidden="saveRoundsTime()"
                      v-b-tooltip.hover.topright.v-info
                      title="Edit time"
                      class="input-group-text"
                      id="rounds-time"
                      :disabled="!isLeader"
                      v-model="roundsTime"
                      variant="info"><!-- :state="false" -->
                    </b-form-timepicker>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group
                    class="text-left mt-1"
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
                          class="copy-button"
                          variant="light"
                          @click="copyCodeToClipboad()"
                        >
                          <i class="fas fa-copy fa-lg"/>
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
                    class="text-left mt-1"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <span class="input-group-text active-members"
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
                        <span class="photo-guests mr-1" variant="light">
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
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Loader from '../components/loader.vue'

export default {
  components: { Loader },
  data () {
    return {
      disabledButton: true,
      activeMembers: 1,
      brainstormId: this.$route.params.id,
      listGuests: [],
      isLeader: false,
      description: '',
      currentRound: 0,
      roundsTime: '',
      running: false,
      loading: true
    }
  },

  mounted: function () {
    /* EventBus.$on('updateList', () => {
      this.getData()
    }) */
    this.getData()
  },

  watch: {
    running: function () {
      this.initBrainstorm()
    },
    activeMembers: function () {
      this.activeDisableButtonInit()
    }
  },

  methods: {
    // This function save the braisntorm description when clicked out of the input
    saveDescription () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.update({
        description: this.description
      })
    },

    // This function start the brainstorm changing to de start brainstorm screen
    initBrainstorm () {
      const currentRoute = this.$route.name
      if (this.running && currentRoute !== 'startBrainstorm') {
        this.createSheet().then(() => {
          const currentRound = 'round' + this.currentRound
          this.$router.push({ name: 'startBrainstorm', params: { id: this.brainstormId, round: currentRound } })
        })
      }
    },

    // This function active and disable the start button
    activeDisableButtonInit () {
      if (this.activeMembers >= 2) {
        this.disabledButton = false
      } else {
        this.disabledButton = true
      }
    },

    // This function get every necessary data to start the brainstorm and get data when back to braistorm screen clicked stop button
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
              this.running = doc.data().running
              this.roundsTime = doc.data().roundsTime
              this.loading = false

              // Insert the rounds time value on input after saved with start brainstorm button
              /* if (this.currentRound > 0) {

              } */
            } else {
              console.log('The Brainstorm not exist!')
            }
          })
      } catch (error) {
        console.error(error)
      }
    },

    // This function is async and create the user sheet to write ideas
    async createSheet () {
      const userUid = this.$firebase.auth().currentUser.uid
      const indexGuest = this.listGuests.findIndex(guest => {
        return guest.uid === userUid
      })
      const sheet = 'sheet' + (indexGuest + 1)
      const dataSheet = {
        owner: userUid
      }
      const brainstorm = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      brainstorm.collection('sheets').doc(sheet).set(dataSheet, { merge: true })
        .then(() => {})
        .catch(error => console.error(error))
    },

    // This function select the brainstorm code to copy to clipboard later
    codeSelect () {
      const copyText = document.getElementById('copyCode')
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
    },

    // This function copy to clipboart the brainstorm code
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
        confirmButtonColor: '#17a2b8',
        timer: 1200
      })
    },

    saveRoundsTime () {
      const db = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      db.update({
        roundsTime: this.roundsTime
      })
    },

    // This function start up the brainstorm
    startBrainstorm () {
      let currentRound

      const db = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      db.get().then((doc) => {
        if (doc.exists) {
          currentRound = doc.data().currentRound === 0 ? 1 : doc.data().currentRound
          this.saveDescription()
          db.update({
            roundsTime: this.roundsTime,
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
.copy-button {
  border: none !important;
  padding: 0 !important;
  background-color: #fff !important;
  color: #17a2b8 !important;
}

.copy-button:hover {
  background-color: #fff !important;
  box-shadow: none !important;
}

.copy-button:focus {
  background-color: #fff !important;
  border: none !important;
  box-shadow: none !important;
}

.input-with-prepend {
  border-left: none;
  /* background: #e9ecef !important; */
}

.input-with-prepend:focus, .input-code:focus {
  /* background-color: #e9ecef; */
  box-shadow: none !important;
  border-color: #ced4da !important;
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

.color-icon {
  color: #17a2b8 !important;
  background-color: #fff;
}

.photo-guests, .active-members {
  background-color: #fff !important;
  color: #17a2b8 !important; /* #1384968 */
  /*  opacity: 1.95 !important; */
  border: none !important;
}

.guests, .input-code{
  border: none !important;
}

.guests:focus {
  box-shadow: none !important;
}

.loading {
  font-size: 15.5px;
}

/* Change the color of watch in rounds time input */
.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi {
  color: #17a2b8 !important;
}

.input-group-text {
  background-color: #fff !important;
}

</style>
