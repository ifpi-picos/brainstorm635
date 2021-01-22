<template>
  <b-container fluid class="container-ideas">
    <b-col md="12">
      <h5 class="page-tittle mb-3 mt-3">Ideas Report</h5>
    </b-col>
    <b-row class="mb-4" v-for="(roundy, i) in ideasPerRound" :key="i">
      <b-col md="12" class="mb-1">
        <h5 class="round">Round {{ i+1 }} </h5>
      </b-col>
      <b-col md="12">
        <b-row v-for="(values, key) in roundy" :key="key">
          <b-col class="mb-4" md="4" v-for="(value, index) in values" :key="index">
            <div class="postit">
              <h5> <b> Idea {{ index+1 }} </b> </h5>
              <b-card-text>
              <p style="font-size: 1rem">
                {{ value }}
              </p>
              </b-card-text>
            <!-- <b-card border-variant="default" class="card-ideas" :title="'Idea'+[index+1]">
              <b-card-sub-title class="text-info" style="margin-bottom: 35px;">
                <p style="margin: 10px 0;">
                  Criado por
                  <b style="font-weight: 600"> Ramos </b>
                </p>
              </b-card-sub-title>
              <b-card-text>
                {{ value }}
              </b-card-text> -->
              <!--
              <b-button
                class="btn-share"
                variant="outline-info"
                :id="'share' + index"
                @click.prevent="moutedLinkShare(plan.id)"
                v-b-modal.modal-share2
              >Compartilhar</b-button>
              <b-tooltip :target="'share' + index" variant="secondary" placement="bottom">
                Qualquer pessoa com o link pode acessar e alterar o planejamento
              </b-tooltip>

              <b-button
                :id="'edit' + index"
                class="btn-open"
                @click.prevent="edit(plan.id)"
                variant="primary"
                >{{ plan.editable ? 'Editar' : 'Visualizar' }}
              </b-button>
              <b-tooltip :target="'edit' + index" variant="secondary" placement="bottom">Abrir planejamento</b-tooltip>
              -->
              <!-- <template v-slot:footer>
                <small v-if="true" class="text-muted">
                  <b>Alterado em: </b>{{ date }}
                  {{ plan.lastUpdate.toDate() | formatDateHour }}
                </small>

              </template>
              -->

              <p v-if="true" class="text-muted" style="position: absolute; bottom: -10px">
                Editado por:
                <b>Ramos</b>
              </p>
            </div>
          </b-col>
        </b-row>
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
      ideasPerRound: []
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
            /* this.date = doc.data().timestamp.toDate() */

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
/* $color: #ADD8E6; */
/* $color:#ADFF2F; */
$color: #DDA0DD;
$colorDark: darken($color, 10%) transparent;

.postit {
  padding: 1.5rem;
  background: $color;
  position: relative;
  min-height: 15em;
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

h5, p {
  font-family: 'comfortaa';
}

.round {
  color: #138496;
  font-weight: bold;
  margin: 0 !important;
}
</style>
