<template>
  <b-container fluid class="pr-5 pl-5">
    <b-row class=" plans "
      v-for="rows in rowsOfRound" :key="rows">
      <b-col md="4" class=" mb-4"
        v-for="(idea, index) in rowsOfRound[rows]" :key="index">
        <b-card border-variant="default" class="card-ideas" title="Ideia 1">
          <b-card-sub-title class="text-info" style="margin-bottom: 35px;">
            <p style="margin: 10px 0;">
              Planejamento criado por
              <b style="font-weight: 600"> {{ idea[index] }} </b>
            </p>
          </b-card-sub-title>
          <b-card-text>
          {{ datasOFBrainstorm.ideas }}
          </b-card-text>
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
          <template v-slot:footer>
            <small v-if="true" class="text-muted">
              <b>Alterado em: </b>{{ date }}
              <!--{{ plan.lastUpdate.toDate() | formatDateHour }}-->
            </small>
          </template>
        </b-card>
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
      rounds: [],
      rowsOfRound: []
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
            if (doc.exists) {
              this.datasOFBrainstorm = doc.data()
              this.date = doc.data().timestamp.toDate()
            }
          })
      } catch (error) {
        console.error(error)
      }

      try {
        const rows = this.$firebase.firestore()
        rows.collection('brainstorms')
          .doc(this.brainstormId)
          .collection('ideas')
          .doc('round1')
          .get()
          .then(doc => {
            this.rounds = doc.data()
            /* console.log(this.rowsOfIdeas) */
            for (const id in this.rounds) {
              this.rowsOfRound.push(this.rounds[id])
              /* console.log(id) */
              /* console.log(this.rowsOfRound) */
              /* console.log(this.rounds[id]) */
            }
            console.log(this.rowsOfRound)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="css">
.plans {
  min-height: 50vh;
}

.card-ideas {
  border: 1px solid rgba(0,0,0,.125) !important;
  border-radius: .25rem !important;
}
</style>
