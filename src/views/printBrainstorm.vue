<template>
  <div>
    <Loader v-if="loading"> </Loader>
    <b-container v-if="!loading" fluid class="container-ideas">
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
      <b-row
        class="mb-4 text-center"
        v-for="(roundy, i) in ideasPerRound"
        :key="i"
      >
        <b-col md="12" class="mb-2">
          <h5 class="round">Round {{ i + 1 }}</h5>
        </b-col>
        <b-col md="12">
          <b-row v-for="(values, key) in roundy" :key="key">
            <b-col
              class="mb-4 pl-1 pr-1"
              md="4"
              v-for="(value, index) in values"
              :key="index"
            >
              <div class="postit">
                <h5 class="text-center pt-1 pb-3">
                  <b> Idea #{{ index + 1 }} </b>
                </h5>
                <b-card-text>
                  <p style="font-size: 17.5px; text-align: justify;">
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
      rounds: [],
      ideasPerRound: [],
      description: ''
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    getData () {
      try {
        const db = this.$firebase.firestore()
        db.collection('brainstorms')
          .doc(this.brainstormId)
          .get()
          .then(doc => {
            this.rounds = doc.data().listGuests
            this.description = doc.data().description
            this.brainstormDate = doc.data().brainstormDate.toDate()
            /* ? doc.data().currentDate.timestamp
            : '' */

            for (let i = 0; i < this.rounds.length; i++) {
              const index = 'round' + (i + 1)
              try {
                const rows = this.$firebase.firestore()
                rows
                  .collection('brainstorms')
                  .doc(this.brainstormId)
                  .collection('ideas')
                  .doc(index)
                  .get()
                  .then(doc => {
                    this.ideasPerRound.push(doc.data())
                  })
              } catch (error) {
                console.error(error)
              }
            }
            this.loading = false
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="css" scoped>
/* $color: rgb(255,215,7); */
/* $color: #6495ED; */
/* $color: #836FFF; */
/* $color: #add8e6; */
/* $color:#ADFF2F; */
/* $color: #DDA0DD; */
/* $colorDark: darken($color, 10%) transparent; */

/* .postit {
  padding: 1.5rem;
  background: $color;
  position: relative;
  min-height: 15em;
  max-height: 15em;
  min-width: 13em;
  border: 1px solid $color;
}

.postit:after {
  background: $color;
  content: '';
  position: absolute;
  bottom: -1.5em;
  left: -1px;
  right: 1.5em;
  border-width: 0.8em;
  border-style: solid;
  border-color: $color;
}

.postit:before {
  content: '';
  position: absolute;
  bottom: -1.5em;
  right: 0;
  border-width: 1.5em 1.5em 0 0;
  border-style: solid;
  border-color: $colorDark;
} */
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
  color: #138496;
  font-weight: 700;
  margin: 0 !important;
  font-family: 'comfortaa';
}

.date {
  color: #138496;
}

.text-date {
  font-size: 18px;
}
</style>
