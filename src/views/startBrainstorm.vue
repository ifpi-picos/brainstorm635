<template>
  <div @beforeunload="
      return ''
    ">
    <Loader v-if="loading"/>
    <b-container v-else align-v="center" style="margin-bottom: 8%">
      <b-row class="align-items-center justify-content-center ml-auto mr-auto">
        <b-col class="pr-0 pl-0">
          <b-card no-body>
            <b-row>
              <b-col>
                <h4 class="page-tittle mb-4 mt-2">Brainstorm 635 online</h4>
              </b-col>
            </b-row>
            <br>
            <b-row>
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
      <b-row align-v="center" v-for="(round, index) of oldIdeas" :key="index">
        <b-col
          v-for="(idea, ind) in round[`round${index + 1}`]" :key="ind"
          class="mb-4 pl-1 pr-1"
          md="4">
          <div class="postit" :style="returnColorPostIt(index + 1)">
            <h5 class="text-center pt-1 pb-3">
              <b>idea #{{ setNumberIdea(idea[`idea${ind + 1}`].id) + 1 }}</b>
            </h5>
            <b-card-text>
              <p style="font-size: 17.5px; text-align: justify;">
                {{ idea[`idea${ind + 1}`].description }}
              </p>
              <span class="ideaTagging" v-if="idea[`idea${ind + 1}`].idContinueIdea !== ''">
                Continue Idea #{{ setNumberIdea(idea[`idea${ind + 1}`].idContinueIdea) + 1 }}
              </span>
            </b-card-text>
          </div>
        </b-col>
      </b-row>
      <b-row align-v="center">
        <b-col v-for="(idea, value, index) in newIdeas" :key="index"
          class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
          <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
            <b-card-body class="pb-0">
              <b-form-group>
                <label for="ideia1" class="idea-label"><strong>Idea #{{ populeteSelect().length + (index + 1) }}</strong></label>
                <b-form-textarea
                  :autofocus="index===0"
                  @blur="finishWriteIdeas()"
                  id="ideia1"
                  placeholder="Write your idea..."
                  v-model="newIdeas[`idea${index + 1}`].description"
                  class="entradaTexto">
                </b-form-textarea>
              </b-form-group>
              <div class="cor"
                v-if="listGuests.length > 0"
                :style="returnColor">
              </div>
              <label :for="`continueIdea${index + 1}`" class="d-inline mr-2">Continue</label>
              <select :name="`continueIdea${index + 1}`" :id="`continueIdea${index + 1}`" @change="setContinueIdea(index + 1)">
                <option value="---">---</option>
                <option :value="idea.id"
                v-for="(idea, key) in populeteSelect()"
                :key="key">Idea {{ key + 1 }}</option>
              </select>
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
          @click="changeRound(true)">Next Round
        </b-button>
        <b-button
          v-if="currentRound === participants"
          variant="outline-info" class="buttonPauseNext ml-4"
          @click="changeRound(false)">Finish Brainstorm
        </b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Loader from '../components/loader'

const eventRoundChanged = new Event('eventRoundChanged')

export default {
  name: 'StartBrainstorm',
  components: { Loader },
  data () {
    return {
      brainstormId: this.$route.params.id,
      round: this.$route.params.round,
      description: '',
      newIdeas: {
        idea1: {
          description: '',
          id: '',
          idContinueIdea: ''
        },
        idea2: {
          description: '',
          id: '',
          idContinueIdea: ''
        },
        idea3: {
          description: '',
          id: '',
          idContinueIdea: ''
        }
      },
      oldIdeas: {},
      time: '',
      currentRound: 0,
      concluded: false,
      isLeader: false,
      listGuests: [],
      participants: 0,
      hourOfStartRound: '',
      running: true,
      roundsTime: '',
      indexSheet: undefined,
      loading: false,
      title: '',
      text: '',
      confirmButtonText: ''
    }
  },

  created () {
    window.onbeforeunload = function () {
      if (!localStorage.getItem('sair')) {
        localStorage.setItem('sair', 1)
        return false
      }
    }
  },

  mounted () {
    this.getData()
    this.getOldIdeas()
    this.getHourOfStartRound()
  },

  watch: {
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
    },
    indexSheet: function () {
      this.getOldIdeas()
    }
  },

  computed: {
    returnRound: function () {
      let text = this.round
      text = 'Round: ' + text[5]
      return text
    },

    returnColor () {
      return `background: ${this
        .$store
        .getters
        .getColor(this.$firebase.auth().currentUser.uid, this.listGuests)
      }`
    }
  },

  methods: {
    returnColorPostIt (roundIdea) {
      return `
        background: ${this
          .$store
          .getters
          .getColorPostit(
            this.indexSheet,
            roundIdea,
            this.listGuests
          )
        }
      `
    },

    getHourOfStartRound () {
      const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
      database.get().then(doc => {
        this.hourOfStartRound = new Date(doc.data().hourOfStartRound)
      })
    },

    populeteSelect: function () {
      const listIdeas = []
      for (const round in this.oldIdeas) {
        const currentRound = this.oldIdeas[round]
        for (const idea in currentRound[`round${Number(round) + 1}`]) {
          const currentIdea = currentRound[`round${Number(round) + 1}`]
          listIdeas.push(currentIdea[idea][`idea${Number(idea) + 1}`])
        }
      }
      return listIdeas
    },

    setContinueIdea (idea) {
      const select = document.getElementById(`continueIdea${idea}`)
      const indexIdea = select.options.selectedIndex
      const idIdeacontinued = indexIdea > 0
        ? this.populeteSelect()[indexIdea - 1].id
        : ''
      if (idIdeacontinued) {
        this.newIdeas[`idea${idea}`].idContinueIdea = idIdeacontinued
      } else {
        this.newIdeas[`idea${idea}`].idContinueIdea = ''
      }
    },

    setNumberIdea: function (id) {
      const indexIdeaContinued = this.populeteSelect().findIndex(idea => idea.id === id)
      return indexIdeaContinued
    },

    organizeIdeasForRender (data) {
      this.oldIdeas = []
      let countRound = 0
      let countIdeas = 0
      let ideasPerRound = []
      for (const key in data) {
        if (key !== 'owner' && key !== `round${this.currentRound}`) {
          for (const key2 in data[`round${countRound + 1}`]) {
            if (key2 !== 'owner') {
              ideasPerRound.push({ [`idea${countIdeas + 1}`]: data[`round${countRound + 1}`][`idea${countIdeas + 1}`] })
              countIdeas++
            }
          }
          this.oldIdeas.push({ [`round${countRound + 1}`]: ideasPerRound })
          ideasPerRound = []
          countRound++
          countIdeas = 0
        }
      }
    },

    getOldIdeas () {
      if (this.indexSheet >= 0) {
        const sheet = 'sheet' + (this.indexSheet + 1)
        const docSheet = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
          .collection('sheets').doc(sheet)
        docSheet.get().then(doc => {
          this.organizeIdeasForRender(doc.data())
        })
      }
    },

    changeRoute () {
      const route = this.$route
      if (this.concluded && route.name !== 'printBrainstorm') {
        this.saveIdeas()
          .then(() => dispatchEvent(eventRoundChanged))
          .then(() => {
            this.newIdeas = {
              idea1: {
                description: '',
                id: '',
                idContinueIdea: ''
              },
              idea2: {
                description: '',
                id: '',
                idContinueIdea: ''
              },
              idea3: {
                description: '',
                id: '',
                idContinueIdea: ''
              }
            }
            this.oldIdeas = []
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
              // Changing round alert
              if (!this.isLeader && this.currentRound !== 1) {
                this.$bvToast.toast('Changing to Round ' + (this.currentRound), {
                  title: 'Round change alert!',
                  toaster: 'b-toaster-top-center',
                  variant: 'success',
                  autoHideDelay: 3000,
                  appendToast: true
                })
              }
              this.newIdeas = {
                idea1: {
                  description: '',
                  id: '',
                  idContinueIdea: ''
                },
                idea2: {
                  description: '',
                  id: '',
                  idContinueIdea: ''
                },
                idea3: {
                  description: '',
                  id: '',
                  idContinueIdea: ''
                }
              }
              this.oldIdeas = []
            })
            .then(() => {
              this.$router.replace({
                name: 'startBrainstorm',
                params: {
                  id: this.brainstormId,
                  round: newRound
                }
              })
            })
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
      } else if (timeSecondsDifference > totalSeconds) { totalSeconds = 0 }

      min = Math.trunc(totalSeconds / 60)
      sec = totalSeconds - (min * 60)

      this.time = (min < 10 ? '0' + min : min) + ' : ' + (sec < 10 ? '0' + sec : sec)
      if (totalSeconds > 0) {
        const cron = setInterval(() => {
          if (sec < 0 && min > 0) {
            min--
            sec = 59
          } else if ((sec === 0 && min === 0) || !this.running) {
            this.saveIdeas().then(() => {})
            this.time = (min < 10 ? '0' + min : min) + ' : ' + (sec < 10 ? '0' + sec : sec)
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
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are trying to get out without finishing or saving data. If you pause the session, you and your friends will lost all ideas informed and the round will be restarted.',
        icon: 'warning',
        focusConfirm: false,
        showCloseButton: true,
        confirmButtonText: 'Confirm pause',
        denyButtonText: 'Cancel',
        showCancelButton: true,
        confirmButtonColor: '#3BB5E0',
        cancelButtonColor: '#dc3545'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true
          const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
          database.update({ running: false })
        }
        this.loading = false
      })
    },

    changeRound (nextRound) {
      // Verify end of brainstorm or next round
      if (nextRound) {
        this.title = 'Are you sure?'
        this.text = 'You and yours friends are ready to change for the next round?'
        this.confirmButtonText = 'Confirm Change'
      } else {
        this.title = 'Are you sure?'
        this.text = 'You and yours friends are ready to finish the brainstorm?'
        this.confirmButtonText = 'Confirm Finish'
      }
      // Changing round alert
      Swal.fire({
        title: this.title,
        text: this.text,
        icon: 'warning',
        focusConfirm: false,
        showCloseButton: true,
        confirmButtonText: this.confirmButtonText,
        denyButtonText: 'Cancel',
        showCancelButton: true,
        confirmButtonColor: '#3BB5E0',
        cancelButtonColor: '#dc3545'
      }).then((result) => {
        if (result.isConfirmed && this.isLeader) {
          if (this.currentRound < this.participants) {
            this.loading = true
            const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
            database.update({
              currentRound: this.currentRound + 1,
              hourOfStartRound: Date()
            }).then(() => { this.loading = false })
          } else {
            this.loading = true
            const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
            database.update({ concluded: true }).then(() => { this.loading = false })
          }
        }
      })
    },

    finishWriteIdeas () {
      if (this.newIdeas.idea1.description &&
        this.newIdeas.idea2.description &&
        this.newIdeas.idea3.description) {
        this.saveIdeas().then(() => {})
      }
    },

    async codeGenerator (length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
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

      this.indexSheet = indexSheet
    },

    async organizeIdeasForSave () {
      for (const campo in this.newIdeas) {
        if (Object.prototype.hasOwnProperty.call(this.newIdeas[campo], 'id')) {
          this.newIdeas[campo].id = await this.codeGenerator(8)
        }
        if (!this.newIdeas[campo].description) { delete this.newIdeas[campo] }
      }
      const organizedIdeas = {}
      let countIdea = 0
      for (const idea in this.newIdeas) {
        if (idea) {
          organizedIdeas[`idea${countIdea + 1}`] = this.newIdeas[idea]
          countIdea++
        }
      }
      return organizedIdeas
    },

    async saveIdeas () {
      const userId = this.$firebase.auth().currentUser.uid
      const organizedIdeas = await this.organizeIdeasForSave()
      organizedIdeas.owner = userId

      if (Object.keys(organizedIdeas).length !== 0 && this.indexSheet >= 0) {
        const round = this.round
        const sheet = 'sheet' + (this.indexSheet + 1)
        const dataSheet = { [round]: organizedIdeas }
        const database = this.$firebase.firestore().collection('brainstorms').doc(this.brainstormId)
        await database.collection('sheets').doc(sheet).set(dataSheet, { merge: true })
          .then(() => {})
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.buttonPauseNext:hover {
  color: #fff;
}

.entradaTexto {
  display: flex;
  height: 200px !important;
  min-width: 200px !important;
  border: none !important;
  flex-wrap: wrap;
}

.entradaTexto:focus {
  box-shadow: none !important;
}

.cor {
  position: absolute;
  left: 20px;
  bottom: 26px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.cartao {
  border: solid 1px #3BB5E0 !important;
}

.corpoInfo {
  padding: 2px 0 !important;
  border-radius: 0.25rem !important;
}

.idea-label {
  font-size: 17px;
}

.continueIdea {
  font-size: 15px !important;
  float: right !important;
}

.continueIdea:hover {
  background-color: #fff !important;
  color: #3BB5E0;
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

.ideaTagging{
  position: absolute;
  bottom: 5% !important;
  left: 25%;
  right: auto;
  font-size: 1.1rem;
}

.container-ideas {
  max-width: 80% !important;
  min-width: 80% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

h5,
span,
.idea-label {
  font-family: 'comfortaa';
}

.idea-label {
  font-weight: 600;
  font-size: 20px;
}
</style>
