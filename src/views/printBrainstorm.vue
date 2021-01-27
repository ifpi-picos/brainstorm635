<template>
  <b-container fluid class="container-ideas">
    <b-col md="12">
      <h5 class="page-tittle mb-3 mt-3">Ideas Report</h5>
    </b-col>
    <b-col xs="12" sm="12" md="12" class="text-left mb-3">
      <span>
        <span class="icone icone-padd">
          <i class="fa fa-file-signature fa-lg"></i>
        </span>
        {{ description }}
      </span>
    </b-col>
    <b-row class="mb-4 text-center" v-for="(roundy, i) in ideasPerRound" :key="i">
      <b-col md="12" class="mb-1">
        <h5 class="round">Round {{ i+1 }} </h5>
      </b-col>
      <b-col md="12">
        <b-row v-for="(values, key) in roundy" :key="key">
          <b-col class="mb-4 pl-1 pr-1" md="4" v-for="(value, index) in values" :key="index">
            <div class="postit">
              <h5 class="text-center"> <b> Idea #{{ index+1 }} </b> </h5>
              <b-card-text>
              <p style="font-size: 1rem">
                {{ value }}
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
      </b-col>
    </b-row>
    <b-row class="mr-auto">
      <b-col>
        <span>
          <b class="date" > Brainstorm date: </b> {{ date }}
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      brainstormId: this.$route.params.id,
      datasOFBrainstorm: {},
      date: '',
      round: [],
      rounds: [],
      ideasPerRound: [],
      description: '',
      guestNames: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      try {
        const db = this.$firebase.firestore()
        db.collection('brainstorms')
          .doc(this.brainstormId)
          .get()
          .then(async doc => {
            this.rounds = doc.data().listGuests
            /* console.log(this.rounds.length) */
            /* console.log(this.rounds) */
            /*  this.datasOFBrainstorm = doc.data() */
            this.date = doc.data().timestamp.toDate()
            this.description = doc.data().description

            for (let i = 1; i < this.rounds.length + 1; i++) {
              const index = 'round' + i
              /* console.log(index) */
              try {
                const rows = this.$firebase.firestore()
                rows
                  .collection('brainstorms')
                  .doc(this.brainstormId)
                  .collection('ideas')
                  .doc(index)
                  .get()
                  .then(doc => {
                    this.round = doc.data()
                    this.ideasPerRound.push(this.round)
                    /* console.log(this.ideasPerRound) */
                  })
              } catch (error) {
                console.error(error)
              }
              /* try {
                const guestName = this.$firebase.firestore()
                guestName
                  .collection('brainstorms')
                  .doc(this.brainstormId)
                  .get()
                  .then(doc => {
                    for (let cont = this.rounds.length; cont > 1; cont--) {
                      this.guestNames.push(doc.data().listGuests[i - 1].displayName)
                      this.guestNames.push(doc.data().listGuests[i - 1].displayName)
                      this.guestNames.push(doc.data().listGuests[i - 1].displayName)
                    }
                  })
              } catch (error) {
                console.error(error)
              } */
            }
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

/* $color: rgb(255,215,7); */
/* $color: #6495ED; */
/* $color: #836FFF; */
$color: #ADD8E6;
/* $color:#ADFF2F; */
/* $color: #DDA0DD; */
$colorDark: darken($color, 10%) transparent;

.postit {
  padding: 1.5rem;
  background: $color;
  position: relative;
  min-height: 15em;
  max-height: 15em;
  min-width: 13em;
}

.postit:after {
  content: "";
  position: absolute;
  bottom: -1.5em;
  left: 0;
  right: 1.5em;
  border-width: 1em;
  border-style: solid;
  border-color: $color;
}

.postit:before {
  content: "";
  position: absolute;
  bottom: -1.5em;
  right: 0;
  border-width: 1.5em 1.5em 0 0;
  border-style: solid;
  border-color: $colorDark;
}

.container-ideas {
  max-width: 80% !important;
  min-width: 80% !important;
}

h5, p, span {
  font-family: 'comfortaa';
}

.round {
  color: #138496;
  font-weight: 700;
  margin: 0 !important;
}

.date {
  color: #138496;
}
</style>
