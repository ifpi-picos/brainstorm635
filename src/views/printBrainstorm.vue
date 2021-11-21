<template>
  <div>
    <Loader v-if="loading"> </Loader>
    <b-container v-if="!loading" fluid class="container-ideas">
      <b-col md="12">
        <h4 class="page-tittle mb-3 mt-3">Ideas Report</h4>
      </b-col>
      <b-col xs="12" sm="12" md="12" class="text-left mb-3">
        <span>
          <span class="icone icone-padd">
            <i class="fa fa-file-signature fa-lg"></i>
          </span>
          {{ description }}
        </span>
      </b-col>
      <b-row
        class="mb-4 text-center"
      >
        <b-col md="12" class="mb-2">
        </b-col>
        <b-col md="12">
          <b-row>
            <b-col
              class="mb-4 pl-1 pr-1"
              md="4"
              v-for="(idea, index) in ideasToPrint"
              :key="index"
            >
              <div class="postit" :style="`background: ${idea.color}`">
                <h5 class="text-center pt-1 pb-3">
                  <b> Idea #{{ index + 1 }} </b>
                </h5>
                <b-card-text>
                  <p style="font-size: 17.5px; text-align: justify;">
                    {{ idea.description }}
                  </p>
                  <span class="ideaTagging" v-if="idea.idContinueIdea !== ''">
                    Continue Idea #{{ setNumberIdea(idea.idContinueIdea) + 1 }}
                  </span>
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
        </b-col>
      </b-row>
      <b-row>
        <b-col md="9" class="ml-0 pl-0">
          <span class="text-date">
            <b class="date"> Brainstorm date: </b> <i> {{ brainstormDate }} </i>
          </span>
        </b-col>
        <b-col md="3" class="text-right pr-0">
          <b-button onClick="window.print()" variant="outline-info">
            Print brainstorm
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Loader from '../components/loader'
export default {
  components: { Loader },
  data () {
    return {
      loading: true,
      brainstormId: this.$route.params.id,
      brainstormDate: '',
      numberRounds: [],
      ideasPerRound: [],
      description: '',
      ideasToPrint: []
    }
  },

  mounted () {
    this.printIdeas()
  },

  methods: {
    printIdeas () {
      try {
        // Geting every brainstorm datas by id
        const ideas = this.$firebase.firestore()
          .collection('brainstorms')
          .doc(this.brainstormId)

        // Geting datas to show brainstorm -
        ideas.onSnapshot(doc => {
          this.numberRounds = doc.data().listGuests
          this.description = doc.data().description
          this.brainstormDate = doc.data().brainstormDate.toDate()

          for (let index = 0; index < this.numberRounds.length; index++) {
            const indexSheet = 'sheet' + (index + 1)
            try {
              ideas.collection('sheets')
                .doc(indexSheet)
                .get()
                .then(doc => {
                  /* console.log(`%c${indexSheet}`, 'color: red')
                  console.log(`%c${indexRound}`, 'color: green') */

                  for (let round = 0; round < this.numberRounds.length; round++) {
                    const indexRound = 'round' + (round + 1)
                    let count = 1
                    for (const sheet in doc.data()[indexRound]) {
                      if (sheet !== 'owner') {
                        this.ideasToPrint.push(doc.data()[indexRound][`idea${count}`])
                        count++
                      }
                    }
                  }
                })
            } catch (error) {
              console.error(error)
            }
          }
          // console.log(this.roundsInSheets)
          this.loading = false
        })
      } catch (error) {
        console.error(error)
      }
    },

    setNumberIdea: function (id) {
      const indexIdeaContinued = this.ideasToPrint.findIndex(idea => idea.id === id)
      return indexIdeaContinued
    }
  }
}
</script>

<style lang="scss" scoped>

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
span {
  font-family: 'comfortaa';
}

.round {
  color: #3BB5E0;
  font-weight: 700;
  margin: 0 !important;
}

.date {
  color: #3BB5E0;
}

.text-date {
  font-size: 18px;
}
</style>
