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
    <b-row align-v="center" align-h="center" class="mt-2">
      <b-button
        v-if="isLeader"
        variant="outline-warning" class="buttonPause"
        @click="pauseBrainstorm()">Pause
      </b-button>
      <!-- <b-button
        v-if="isLeader && concluded"
        variant="outline-info"
        @click="printBrainstorm()">Finish and print Brainstorm
      </b-button>-->
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
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
      hourOfStartRound: ''
    }
  },

  watch: {
    // listFinishWriteIdeas: function () {
    //   this.changeRound()
    // },
    hourOfStartRound: function () {
      if (this.hourOfStartRound) {
        this.timeForWriting()
      }
    }
  },

  mounted () {
    this.getData()
    this.getHourOfStartRound()
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
        console.log(this.hourOfStartRound)
      })
    },

    getData () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)

      const push = async (round) => {
        this.$router.push({ name: 'startBrainstorm', params: { id: this.brainstormId, round: round } })
      }

      database.onSnapshot(doc => {
        const running = doc.data().running

        if (doc.data().concluded) {
          this.printBrainstorm()
        }

        this.description = doc.data().description
        this.currentRound = doc.data().currentRound
        this.isLeader = doc.data().leader === this.$firebase.auth().currentUser.uid
        this.listFinishWriteIdeas = doc.data().listFinishWriteIdeas.length
        this.participants = doc.data().listGuests.length
        if (!running) {
          this.$router.push({ name: 'brainstorm', params: { id: this.brainstormId } })
        } else if (this.round !== ('round' + doc.data().currentRound)) {
          const round = 'round' + doc.data().currentRound
          push(round).then(() => {
            window.location.reload()
          })
        }
      })
    },

    async createClock () {
      const currentTime = new Date()
      let timeDifference = currentTime - this.hourOfStartRound
      timeDifference = Number(timeDifference)

      let min = 0
      let seg = 60

      if (timeDifference > 0 && (seg - (Math.trunc(timeDifference / 1000)) > 0)) {
        seg = seg - (Math.trunc(timeDifference / 1000))
        console.log('verdadeiro', timeDifference)
      } else {
        console.log('falso', timeDifference)
      }

      const cron = setInterval(() => {
        if (seg < 0 && min > 0) {
          min--
          seg = 59
        } else if (seg === 0 && min === 0) {
          clearInterval(cron)
        }

        this.time = (min < 10 ? '0' + min : min) + ' : ' + (seg < 10 ? '0' + seg : seg)
        seg--
      }, 1000)
    },

    pauseBrainstorm () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.update({ running: false })
    },

    async changeRound () {
      this.verifyFinalRound()
      if (
      /* (this.listFinishWriteIdeas > 0) && */
      /* (this.participants === this.listFinishWriteIdeas) && */
        (this.currentRound < this.participants)) {
        const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
        await database.update({
          currentRound: this.currentRound + 1,
          listFinishWriteIdeas: [],
          hourOfStartRound: new Date()
        })
      }
      await this.saveIdeas()
    },

    finishWriteIdeas () {
      if (this.ideas.length === 3) {
        this.saveIdeas()
      }
    },

    async saveIdeas () {
      const user = this.$firebase.auth().currentUser.uid
      const data = { [user]: this.ideas }

      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      await database.collection('ideas').doc(this.round).set(data, { merge: true })
        .then(function () {})
        .catch(function (error) {
          console.error(error)
        })
      await database.update({
        listFinishWriteIdeas: firebase.firestore.FieldValue.arrayUnion(user),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    },

    timeForWriting () {
      let time = 62000

      const currentTime = new Date()
      let timeDifference = currentTime - this.hourOfStartRound
      timeDifference = Number(timeDifference)

      if (timeDifference > 0) {
        time = time - timeDifference
      }

      this.createClock().then(() => {
        setTimeout(() => {
          this.changeRound()
          this.verifyFinalRound()
        }, time)
      })
    },

    verifyFinalRound () {
      if (this.currentRound === this.participants) {
        const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
        database.set({ concluded: true }, { merge: true }).then(() => {
          this.printBrainstorm()
        })
      } // else {
      //   this.concluded = false
      // }
    },

    printBrainstorm () {
      this.$router.push({ name: 'printBrainstorm' })
    }
  }
}
</script>

<style lang="css" scoped>
.buttonPause:hover {
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
