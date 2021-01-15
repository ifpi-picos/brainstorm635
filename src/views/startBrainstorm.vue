<template>
  <b-container align-v="center">
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
                id="ideia1"
                placeholder="Write your idea..."
                v-model="ideas[0]"
                class="entradaTexto">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
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
                id="ideia2"
                placeholder="Write your idea..."
                v-model="ideas[1]"
                class="entradaTexto"
              ></b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
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
                id="ideia3"
                placeholder="Write your idea..."
                v-model="ideas[2]"
                class="entradaTexto"
                wrap="hard">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
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
      variant="outline-warning" class="buttonPause"
      @click="pauseBrainstorm()" v-if="isLeader">Pause
      </b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      brainstormId: this.$route.params.id,
      round: this.$route.params.round,
      description: '',
      ideas: [],
      time: '',
      currentRound: 0,
      isLeader: false
    }
  },

  mounted () {
    this.getData()
    this.saveIdeas()
  },

  computed: {
    returnRound: function () {
      let text = this.round
      text = 'Round: ' + text[5]
      return text
    }
  },

  methods: {
    getData () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.onSnapshot(doc => {
        const running = doc.data().running
        if (!running) {
          this.$router.push({ name: 'brainstorm', params: { id: this.brainstormId } })
        } else {
          this.description = doc.data().description
          this.currentRound = doc.data().currentRound
          this.isLeader = doc.data().leader === this.$firebase.auth().currentUser.uid
        }
      })
    },

    createClock () {
      let min = 0
      let seg = 60
      const cron = setInterval(() => {
        seg--

        if (min === 0 && seg === 0) {
          clearInterval(cron)
        } else if (min > 0 && seg < 0) {
          seg = 59
        }

        if (seg === '00') {
          seg = 59
          min--
        }

        this.time = (min < 10 ? '0' + min : min) + ' : ' + (seg < 10 ? '0' + seg : seg)
      }, 1000)
    },

    pauseBrainstorm () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.update({ running: false })
    },

    async saveIdeas () {
      const user = this.$firebase.auth().currentUser.uid
      const data = { [user]: this.ideas }

      await this.createClock()

      setTimeout(async () => {
        const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
        await database.collection('ideas').doc(this.round).set(data, { merge: true }).then(function () {}).catch(function (error) {
          console.error(error)
        })
      }, 60000)
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

.icone {
  /* background: #17a2b8 !important;
  opacity: 0.95; */
  height: 43.98px !important;
  width: 38.38px !important;
  padding: 5.25px 7.5px;
  border-radius: 0.25rem 0 0 0.25rem !important;
  color: #138496 !important;
}

.icone-padd {
  padding-right: 3.5px !important;
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
