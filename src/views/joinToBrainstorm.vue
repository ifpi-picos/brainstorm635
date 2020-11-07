<template>
  <div>
    <b-card class="card-join">
      <b-form>
        <b-row>
          <b-col md="4">
            <b-form-group
              class="text-left"
              id="input-group-1"
              label="Descrição"
              label-for="input-1"
            >
              <b-form-input
                size='md'
                id="input-1"
                required
                v-model="description"
                placeholder="Descreva o brainstorm"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
              class="text-left"
              id="input-group-2"
              label="Código da sala"
              label-for="input-2"
            >
              <b-input-group size=md>
                <b-input-group-append>
                  <b-form-input
                    class="code"
                    id="input-2"
                    v-model="code"
                    value="this.code">
                  </b-form-input>

                  <b-button class="line-button" size="md" variant="light"><i class="fas fa-copy"/></b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="4" class="mt-2">
          <b-row class="mt-4">
            <i class="fas fa-user-friends fa-2x mr-1" ></i>
            <b-form-goup
              id="input-group-3"
              label="rqwrq"
              label-for="input-3"
              class="text-left"
              >
              <b-form-input
                id="input-3"
                v-model="numberOFMembers"
                value="this.numberOFMembers">
              </b-form-input>
            </b-form-goup>
            </b-row>
          </b-col>
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
  }
}
</script>

<style lang="css">
  .card-join {
    margin-top: 10%;
    position: relative !important;
    display: inline-flex !important;
    height: 250px;
    width: 60%;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1);
  }

  .line-button {
    border: solid 1px #ced4da !important;
  }

</style>
