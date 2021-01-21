<template>
  <b-container fluid class="container-ideas">
    <b-col md="12">
      <h5 class="page-tittle mb-3 mt-3">Ideas Report</h5>
    </b-col>
    <b-row v-for="(roundy, i) in rounds" :key="i" no-gutters>
      <b-col md="12" class="p-0 pl-3 mt-3 mb-0">
        <h5 class="round">Round {{ i+1 }} </h5>
      </b-col>
      <b-col md="12" class="mt-0">
        <b-row v-for="(values, key) in round" :key="key" class="mt-0">
          <b-col md="4" class="mb-0 mt-0" v-for="(value, index) in values" :key="index">
            <div class="postit" >
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
      rounds: []
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
            console.log(this.rounds)
            /*  this.datasOFBrainstorm = doc.data() */
            /* this.date = doc.data().timestamp.toDate() */
          })
      } catch (error) {
        console.error(error)
      }

      try {
        const rows = this.$firebase.firestore()
        rows
          .collection('brainstorms')
          .doc(this.brainstormId)
          .collection('ideas')
          .doc('round1')
          .get()
          .then(doc => {
            this.round = doc.data()
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
$colorDark: darken($color, 10%) transparent;

div {
  min-width: 13em;
  margin: 1em auto;
}

.postit {
  padding: 1rem;
  background: $color;
  position: relative;
  min-height: 15em;
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
.card-ideas {
  border: 1px solid rgba(0, 0, 0, 0.125) !important;
  border-radius: 0.25rem !important;
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
