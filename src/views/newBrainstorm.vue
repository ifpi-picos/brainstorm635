<template>
  <b-container>
    <b-row>
      <b-col class="align-items-center justify-content-center d-fle" style="height: calc(100vh - 0px);">
        <b-card class="card-new">
          <h4 class="page-tittle mb-5 mt-4">Novo Brainstorm</h4>
          <b-form @submit="newBrainstorm()">
            <b-row>
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-group-1"
                  label="Descrição"
                  label-for="input-1">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-file-signature fa-lg"></i></span>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="input-with-prepend"
                      id="input-1"
                      v-model="description"
                      placeholder="Descreva o brainstorm">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-group-2"
                  label="Código da sala"
                  label-for="input-2">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text" variant="light"><i class="fas fa-code fa-lg"></i></span>
                    </b-input-group-prepend>
                    <b-form-input
                      disabled
                      class="input-code input-with-prepend"
                      id="input-2"
                      v-model="code"
                      value="this.code">
                    </b-form-input>
                    <b-input-group-append>
                      <b-button v-b-tooltip.hover.topleft title="Copiar código" class="line-button devsite-icon-copy" variant="light"><i class="fas fa-copy"></i></b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  id="input-group-3"
                  label="Número de participantes"
                  label-for="input-3"
                  class="text-left">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-users fa-lg"></i></span>
                    </b-input-group-prepend>
                    <b-form-input
                      type="number"
                      v-model="numberOFMembers"
                      value="this.numberOFMembers"
                      id="input-3"
                      class="input-with-prepend"
                      placeholder="Defina o número de participantes">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row align-h="center" class="pt-5 mt-4">
              <b-button
                type="submit"
                class="pl-5 pr-5 create"
                pill
                variant="outline-success">
                Iniciar novo Brainstorm
              </b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      description: '',
      code: '',
      numberOFMembers: 0
    }
  },

  created: function () {},

  methods: {

    /* Register  */
    newBrainstorm () {
      const db = this.$firebase.firestore()
      db.collection('brainstorm').doc('newBrainstorm').set({
        dwescription: this.description,
        code: this.code,
        numberOfMembers: this.numberOFMembers
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.$router.push({ name: 'waitForMembers' })
    }
  }
}
</script>

<style lang="css">
.card-new {
  margin-top: 65px;
  position: relative !important;
 /*  display: inline-flex !important; */
  /* height: 350px;
  width: 80%; */
}

.tooltip-inner {
  /* max-width: 200px; */
  padding: .25rem .5rem;
  color: #fff !important;
  text-align: center;
  background-color: #17a2b8 !important;
  border: #17a2b8 1px solid !important;
  border-radius: .25rem;
}

.bs-tooltip-auto[x-placement^=top] .arrow:before, .bs-tooltip-top .arrow:befor {
  top: 0;
  border-width: .4rem .4rem 0;
  border-top-color: #17a2b8 !important;

}

</style>
