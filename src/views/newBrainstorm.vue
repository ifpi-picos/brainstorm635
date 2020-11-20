<template>
  <div>
    <b-card class="card-new">
      <h4 class="page-tittle mb-5">Novo Brainstorm</h4>
      <b-form>
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
                  <b-button class="line-button" variant="light"><i class="fas fa-copy"/></b-button>
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
        <b-row align-h="center" class="pt-5">
          <b-button
            type="submit"
            class="pl-5 pr-5 create"
            pill
            variant="outline-success">
            Criar
          </b-button>
        </b-row>
      </b-form>
    </b-card>
  </div>
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

  methods: {
    getData () {
      const db = this.$firebase.firestore()
      db.collection('brainstorms').get().then(querySnapshot => {
        const dados = querySnapshot.docs[0]
        this.description = dados.data().description
        this.numberOFMembers = dados.data().users.length + 1
        this.code = dados.id
      })
    }
  },

  created: function () {
    this.getData()
  }
}
</script>

<style lang="css">
  .card-new {
    margin-top: 10%;
    position: relative !important;
    display: inline-flex !important;
    height: 300px;
    width: 80%;
  }

  .create {
    padding-top: 0.3rem !important;
    padding-bottom: 0.3rem !important;
    font-size: 1.2rem !important;
  }

  .line-button {
    border: solid 1px #ced4da !important;
  }

  .input-with-prepend {
    border-left: none !important;
  }

  .input-with-append {
    border-right: none !important;
  }
  .input-code {
    background-color: #fff !important;
  }
</style>
