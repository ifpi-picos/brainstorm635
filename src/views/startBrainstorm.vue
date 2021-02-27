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
                v-model="ideas[0]"
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
                v-model="ideas[1]"
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
                v-model="ideas[2]"
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
      ideas: [],
      time: '',
      currentRound: 0,
      isLeader: false,
      listFinishWriteIdeas: 0,
      participants: 0,
      // concluded: null,
      hourOfStartRound: '',
      running: true,
      roundsTime: ''
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
    },

    getData () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)

      database.onSnapshot(doc => {
        this.running = doc.data().running

        if (doc.data().concluded && (this.$route.name !== 'printBrainstorm')) {
          this.saveIdeas()
            .then(() => {
              dispatchEvent(eventRoundChanged)
              this.ideas = []
            })
            .then(() => {
              this.$router.push({ name: 'printBrainstorm', params: { id: this.brainstormId } })
            })
        } else {
          this.roundsTime = doc.data().roundsTime
          this.description = doc.data().description
          this.currentRound = doc.data().currentRound
          this.isLeader = doc.data().leader === this.$firebase.auth().currentUser.uid
          this.listFinishWriteIdeas = doc.data().listFinishWriteIdeas.length
          this.participants = doc.data().listGuests.length

          if (!this.running && (this.$route.name !== 'brainstorm')) {
            dispatchEvent(eventRoundChanged)
            this.saveIdeas().then(() => {
              this.$router.push({ name: 'brainstorm', params: { id: this.brainstormId } })
            })
          } else if (this.round !== ('round' + doc.data().currentRound)) {
            const round = 'round' + doc.data().currentRound
            this.saveIdeas().then(() => {
              this.ideas = []
              dispatchEvent(eventRoundChanged)
              /* window.location.reload() */
            }).then(() => {
              this.$router.push({ name: 'startBrainstorm', params: { id: this.brainstormId, round: round } })
            })
          }
        }
      })
    },

    createClock () {
      this.ideas = []
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

          addEventListener('eventRoundChanged', () => clearInterval(cron))

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
      if (this.ideas.length === 3) {
        this.saveIdeas().then(() => {})
      }
    },

    async saveIdeas () {
      const user = this.$firebase.auth().currentUser.uid
      const removeEmptyIdeas = []
      for (const index in this.ideas) {
        if (this.ideas[index] !== '') {
          removeEmptyIdeas.push(this.ideas[index])
        }
      }
      const data = { [user]: removeEmptyIdeas }
      if (removeEmptyIdeas.length !== 0) {
        const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
        database.collection('ideas').doc(this.round).set(data, { merge: true })
          .then(function () {})
          .catch(function (error) {
            console.error(error)
          }).then(() => {
            database.update({
              listFinishWriteIdeas: firebase.firestore.FieldValue.arrayUnion(user)
              /* currentDate: firebase.firestore.FieldValue.serverTimestamp() */
            })
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
</style>
