<template>
  <b-container fluid class="pr-5 pl-5">
    <b-row class=" plans ">
      <b-col md="4" class=" mb-4">
        <b-card border-variant="default" class="card-ideas" title="Ideia 1">
          <b-card-sub-title class="text-info" style="margin-bottom: 35px;">
            <p style="margin: 10px 0;">
              Planejamento criado por
              <b style="font-weight: 600"> Ramos </b>
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
              <b>Alterado em: </b>{{ datasOFBrainstorm.timestamp.toDate() }}
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
      datasOFBrainstorm: {}
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
          .onSnapshot(doc => {
            if (doc.exists) {
              this.datasOFBrainstorm = doc.data()
              console.log(this.datasOFBrainstorm.ideas)
            }
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
