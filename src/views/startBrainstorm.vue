<template>
  <b-container align-v="center" style="margin-bottom: 8%">
    <b-row class="align-items-center justify-content-center ml-auto mr-auto">
      <b-col class="pr-0 pl-0">
        <b-card no-body>
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-4 mt-2">Brainstorm 635 online</h4>
            </b-col>
          </b-row>
          <br>
          <b-row >
            <b-col xs="12" sm="4" md="4" class="text-center culums">
              <span class="corpoInfo">
                <span class="icone icone-padd">
                  <i class="fa fa-file-signature fa-lg"></i>
                </span>
                {{ description }}
              </span>
            </b-col>
            <b-col xs="12" sm="4" md="4" class="text-center culums">
              <span class="corpoInfo round">
                <span class="icone">
                  <i
                    class="fa fa-circle-notch fa-lg">
                  </i>
                </span>
                {{ returnRound }}
              </span>
            </b-col>
            <b-col xs="12" sm="4" md="4" class="text-center culums">
              <span class="corpoInfo">
                <span class="icone">
                  <i class="fa fa-clock fa-lg"></i>
                </span>
                {{ time }}
            </span>
            </b-col>
          </b-row>
          <br><br>
        </b-card>
      </b-col>
    </b-row>
    <b-container align-v="center">
      <b-row align-v="center" v-for="(field, index) in oldIdeas" :key="index">
        <b-col
              v-for="(idea, ind) in field" :key="ind"
              class="mb-4 pl-1 pr-1"
              md="4"
            >
              <div class="postit">
                <h5 class="text-center pt-1 pb-3">
                  <b> Idea #{{ ind + 1 }} </b>
                </h5>
                <b-card-text>
                  <p style="font-size: 17.5px; text-align: justify;">
                    {{ idea }}
                  </p>
                </b-card-text>
                <!-- <p
                  class="text-muted"
                  style="position: absolute; bottom: -10px">
                  Editado por:
                  <b>{{ guestNames[index] }}</b>
                </p> -->
              </div>
            </b-col>
      </b-row>
    </b-container>
    <b-row align-v="center">
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body class="pb-0">
            <b-form-group>
              <label for="ideia1" class="idea-label"><strong>Idea #1</strong></label>
              <b-form-textarea
                @blur="finishWriteIdeas()"
                id="ideia1"
                placeholder="Write your idea..."
                v-model="newIdeas[0]"
                class="entradaTexto">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
              hidden="true"
              v-b-tooltip.hover.v-info title="Continue idea... [M]"
              variant="outline-info" class="continueIdea">
              Continue
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body class="pb-0">
            <b-form-group>
              <label for="ideia2" class="idea-label"><strong>Idea #2</strong></label>
              <b-form-textarea
                @blur="finishWriteIdeas()"
                id="ideia2"
                placeholder="Write your idea..."
                v-model="newIdeas[1]"
                class="entradaTexto"
              ></b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
              hidden="true"
              v-b-tooltip.hover.v-info title="Continue idea... [M]"
              variant="outline-info" class="continueIdea"
              >Continue
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body class="pb-0 pl-0">
            <b-form-group>
              <label for="ideia3" class="idea-label"><strong>Idea #3</strong></label>
              <b-form-textarea
                @blur="finishWriteIdeas()"
                id="ideia3"
                placeholder="Write your idea..."
                v-model="newIdeas[2]"
                class="entradaTexto"
                wrap="hard">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
              hidden="true"
              v-b-tooltip.hover.v-info title="Continue idea... [M]"
              variant="outline-info" class="continueIdea"
              >Continue
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row
      v-if="isLeader"
      align-v="center"
      align-h="center"
      class="mt-3 mb-3">
      <b-button
        variant="outline-warning" class="buttonPauseNext"
        @click="pauseBrainstorm()">Pause
      </b-button>
      <b-button
        v-if="currentRound < participants"
        variant="outline-info" class="buttonPauseNext ml-4"
        @click="changeRound()">Next Round
      </b-button>
      <b-button
        v-if="currentRound === participants"
        variant="outline-info" class="buttonPauseNext ml-4"
        @click="changeRound()">Finish Brainstorm
      </b-button>
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'

const eventRoundChanged = new Event('eventRoundChanged')

export default {
  data () {
    return {
      brainstormId: this.$route.params.id,
      round: this.$route.params.round,
      description: '',
      newIdeas: [],
      oldIdeas: {},
      time: '',
      currentRound: 0,
      concluded: false,
      isLeader: false,
      listFinishWriteIdeas: 0,
      listGuests: [],
      participants: 0,
      // concluded: null,
      hourOfStartRound: '',
      running: true,
      roundsTime: '',
      indexSheet: 0
    }
  },

  mounted () {
    this.getData()
    this.getHourOfStartRound()
  },

  watch: {
    // listFinishWriteIdeas: function () {
    //   this.changeRound()
    // },
    hourOfStartRound: function () {
      if (this.hourOfStartRound) {
        this.createClock()
      }
    },
    $route (route) {
      this.round = route.params.round
      this.getData()
      this.getHourOfStartRound()
    },
    concluded: function () {
      if (this.concluded) {
        this.changeRoute()
      }
    },
    running: function () {
      this.changeRoute()
    },
    currentRound: function () {
      this.changeRoute()
    }
  },

  computed: {
    returnRound: function () {
      let text = this.round
      text = 'Round: ' + text[5]
      return text
    }
  },

  methods: {
    async getHourOfStartRound () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.get().then(doc => {
        this.hourOfStartRound = new Date(doc.data().hourOfStartRound)
      })
      this.getOldIdeas()
    },

    getOldIdeas () {
      if (this.indexSheet >= 0) {
        const sheet = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
          .collection('ideas').doc(this.indexSheet.toString())
        sheet.get().then(doc => {
          this.oldIdeas = (doc.data())
          delete this.oldIdeas.owner
        })
      }
    },

    changeRoute () {
      const route = this.$route
      if (this.concluded && route.name !== 'printBrainstorm') {
        this.saveIdeas()
          .then(() => dispatchEvent(eventRoundChanged))
          .then(() => {
            this.newIdeas = []
            this.oldIdeas = {}
          })
          .then(() => { this.$router.push({ name: 'printBrainstorm' }) })
          .catch(error => console.error(error))
      } else {
        if (!this.running && route.name !== 'brainstorm') {
          dispatchEvent(eventRoundChanged)
          this.saveIdeas()
            .then(() => this.$router.push({ name: 'brainstorm', params: { id: this.brainstormId } }))
            .catch(error => console.error(error))
        } else if (!this.concluded && (this.round !== ('round' + this.currentRound))) {
          const newRound = 'round' + this.currentRound
          dispatchEvent(eventRoundChanged)
          this.saveIdeas()
            .then(() => {
              this.newIdeas = []
              this.oldIdeas = {}
            })
            .then(() => { this.$router.push({ name: 'startBrainstorm', params: { id: this.brainstormId, round: newRound } }) })
            .catch(error => console.error(error))
        }
      }
    },

    getData () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)

      database.onSnapshot(doc => {
        this.running = doc.data().running
        this.roundsTime = doc.data().roundsTime
        this.description = doc.data().description
        this.currentRound = doc.data().currentRound
        this.isLeader = doc.data().leader === this.$firebase.auth().currentUser.uid
        this.listFinishWriteIdeas = doc.data().listFinishWriteIdeas.length
        this.participants = doc.data().listGuests.length
        this.listGuests = doc.data().listGuests
        this.concluded = doc.data().concluded

        // moment when the sheet exchange occurs
        this.chooseSheet()
      })
    },

    createClock () {
      const currentTime = new Date()
      const timeSecondsDifference = Math.trunc((currentTime - this.hourOfStartRound) / 1000)

      const time = this.roundsTime.split(':')

      /* Calc to transfor minuts to seconds in time variable */
      let min = parseInt(time[0])
      let sec = parseInt(time[1])

      let totalSeconds = (min * 60) + sec

      if (timeSecondsDifference > 0 && (totalSeconds - timeSecondsDifference > 0)) {
        totalSeconds = totalSeconds - timeSecondsDifference
      } else if (timeSecondsDifference < 0) { totalSeconds = 0 }

      min = Math.trunc(totalSeconds / 60)
      sec = totalSeconds - (min * 60)

      if (totalSeconds > 0) {
        const cron = setInterval(() => {
          if (sec < 0 && min > 0) {
            min--
            sec = 59
          } else if ((sec === 0 && min === 0) || !this.running) {
            this.saveIdeas().then(() => {})
            // if (sec === 0 && min === 0) {
            //   this.changeRound()
            // }
            clearInterval(cron)
          }

          addEventListener('eventRoundChanged', () => {
            clearInterval(cron)
          })

          this.time = (min < 10 ? '0' + min : min) + ' : ' + (sec < 10 ? '0' + sec : sec)
          sec--
        }, 1000)
      }
    },

    pauseBrainstorm () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.update({ running: false })
    },

    changeRound () {
      if (this.isLeader) {
        if (this.currentRound < this.participants) {
          const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
          database.update({
            currentRound: this.currentRound + 1,
            listFinishWriteIdeas: [],
            hourOfStartRound: new Date()
          })
        } else {
          const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
          database.update({ concluded: true })
        }
      }
      this.$bvToast.toast('Changing to Round ' + (this.currentRound + 1), {
        title: 'Round change alert!',
        toaster: 'b-toaster-top-center',
        variant: 'success',
        autoHideDelay: 3000,
        appendToast: true
      })
    },

    finishWriteIdeas () {
      if (this.newIdeas.length === 3) {
        this.saveIdeas().then(() => {})
      }
    },

    // Get Sheet for current user
    chooseSheet () {
      const currentRound = this.round[5]
      const currentUser = this.$firebase.auth().currentUser.uid
      const myPositon = this.listGuests.findIndex((guest) => guest.uid === currentUser)

      let indexSheet = null
      if (currentRound === 1) {
        indexSheet = myPositon
      } else {
        indexSheet = myPositon + 1 - currentRound
        if (indexSheet < 0) {
          indexSheet = this.listGuests.length + indexSheet
        }
      }
      // console.log('indexSheet', indexSheet)
      this.indexSheet = indexSheet

      // console.log(
      //   `${this.$firebase.auth().currentUser.displayName} na rodada ${currentRound} escreve na folha de ${this.listGuests[indexSheet].displayName}`
      // )
    },

    async saveIdeas () {
      const uid = this.$firebase.auth().currentUser.uid
      let user = this.listGuests.findIndex(guest => guest.uid === uid)
      user = user.toString()
      const removeEmptyIdeas = []
      for (const index in this.newIdeas) {
        if (this.newIdeas[index] !== '') {
          removeEmptyIdeas.push(this.newIdeas[index])
        }
      }
      const data = { [user]: removeEmptyIdeas }
      if (removeEmptyIdeas.length !== 0 && this.indexSheet >= 0) {
        const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
        await database.collection('ideas').doc(this.indexSheet.toString()).set(data, { merge: true })
          .then(() => {})
          .catch((error) => {
            console.error(error)
          })
        await database.update({
          listFinishWriteIdeas: firebase.firestore.FieldValue.arrayUnion(user)
          // currentDate: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>

.buttonPauseNext:hover {
  color: #fff;
}

.entradaTexto {
  display: flex;
  height: 200px !important;
  min-width: 200px !important;
  border: none !important;
  flex-wrap: wrap;
  margin-left: 1rem;
}

.entradaTexto:focus {
  /* box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) */
  box-shadow: none !important;
}

.entradaTexto::-webkit-scrollbar {
  width: 4px;
}

.entradaTexto::-webkit-scrollbar-track {
  background: #cecece;
  border-radius: 3px;
}

.entradaTexto::-webkit-scrollbar-thumb {
  background: rgb(112, 112, 231);
  border-radius: 3px;
}

.entradaTexto::-webkit-scrollbar-thumb:hover {
  background: blue;
}

.cor {
  position: absolute;
  left: 20px;
  bottom: 26px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background:#17a2b8;
}

.cartao {
  border: solid 1px #17a2b8 !important;
}

.corpoInfo {
  padding: 2px 0 !important;
  border-radius: 0.25rem !important;
  /* border: solid 1px #ced4da; */
}

.idea-label {
  font-size: 17px;
}

.continueIdea {
 /*  height: 20% !important;
  padding: 0 5px 0 5px !important; */
  font-size: 15px !important;
  float: right !important;
}

.continueIdea:hover {
  background-color: #fff !important;
  color: #138496;
  font-weight: 300;
}

@media only screen and (max-width: 576px) {
  .corpoInfo {
    font-size: 15px  !important;
  }
  .culums {
    text-align: left !important;
    margin-bottom: 0.4rem !important;
  }
  .round {
    margin-left: -0.1rem;
  }
}

.postit {
  line-height: 1;
  text-align: center;
  width: 98%;
  max-width: 98%;
  margin: 0px;
  min-height: 250px;
  max-height: 250px;
  padding: 1rem;
  position: relative;
  border: 1px solid #E8E8E8;
  /* border-top: 60px solid #fdfd86; */
  font-family: 'comfortaa';
  font-size: 3em;
  border-bottom-right-radius: 60px 6px;
  display: inline-block;
  background: #ADD8E6; /* Old browsers */
  background: -moz-linear-gradient(-45deg, #b6dae6 81%, #b6dae6 82%, #b6dae6 82%, #e1f7ff 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(81%,#b6dae6), color-stop(82%,#b6dae6), color-stop(82%,#b6dae6), color-stop(100%,#e1f7ff)); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(-45deg, #b6dae6 81%,#b6dae6 82%#b6dae6 82%,#e1f7ff 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(-45deg, hsl(195, 53%, 79%) 81%,#b6dae6 82%,#b6dae6 82%,#e1f7ff 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(-45deg, #b6dae6 81%,#b6dae6 82%,#b6dae6 82%,#e1f7ff 100%); /* IE10+ */
  background: linear-gradient(135deg, #b6dae6 81%,#b6dae6 82%,#b6dae6 82%,#e1f7ff 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffff88', endColorstr='#e1f7ff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.postit:after {
  content: "";
  position: absolute;
  z-index: -1;
  right: -0px;
  bottom: 20px;
  width: 200px;
  height: 25px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow:2px 15px 5px rgba(0, 0, 0, 0.40);
  -moz-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  -webkit-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  -o-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  -ms-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  transform: matrix(-1, -0.1, 0, 1, 0, 0);
}

.container-ideas {
  max-width: 80% !important;
  min-width: 80% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

h5,
span {
  font-family: 'comfortaa';
}

.round {
  /* color: #138496; */
  font-weight: 700;
  margin: 0 !important;
  font-family: 'comfortaa';
}
</style>
