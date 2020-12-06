<template>
  <b-container fluid class="contain">
    <b-row align-v="start">
      <b-col class="align-items-center justify-content-center ml-auto mr-auto" md="10">
        <b-card class="text-center pr-3 pl-3 pb-3 pt-0">
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-5 mt-3">Create Brainstorm</h4>
            </b-col>
          </b-row>
          <b-form @submit="brainstormInit()">
            <b-row align-h="center" class="mb-5">
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-group-1"
                  label="Description"
                  label-for="input-1"
                  label-class="required">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-file-signature fa-lg"></i></span>
                    </b-input-group-prepend>
                    <b-form-input
                      disabled
                      type="text"
                      class="input-with-prepend input-code"
                      id="input-1"
                      v-model="description"
                      placeholder="Describe the brainstorm">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-group-2"
                  label="Brainstorm code"
                  label-for="copyCode">
                  <b-input-group>
                    <b-form-input
                      id="copyCode"
                      @click="codeSelect ()"
                      readonly
                      class="input-code"
                      v-model="code"
                      value="this.code">
                    </b-form-input>
                    <b-input-group-append>
                      <b-button
                        v-b-tooltip.hover.v-info title="Copy Code"
                        class="line-button"
                        variant="light"
                        @click="copyCodeToClipboad ()">
                        <i class="fas fa-copy"/>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group
                  id="input-group-3"
                  label="Active members"
                  label-for="input-3"
                  label-class="required"
                  class="text-left ">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-users fa-lg"></i></span>
                    </b-input-group-prepend>
                    <b-form-input
                      disabled
                      type="number"
                      v-model="numberOFMembers"
                      value="this.numberOFMembers"
                      id="input-3"
                      class="input-with-prepend input-code text-center"
                      placeholder="Defina o número de participantes">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="" align-h="center">
              <b-col md="4">
                <b-form-group
                  class="text-left"
                  id="input-name-1"
                  label-for="name-1">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text" variant="light"><i class="fas fa-user fa-lg"></i>1</span>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="member1"
                      class="input-code input-with-prepend"
                      placeholder="Guest"
                      id="name-1">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="text-left"
                  id="input-name-2"
                  label-for="name-2">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text" variant="light"><i class="fas fa-user fa-lg"></i>2</span>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="member2"
                      placeholder="Guest"
                      class="input-code input-with-prepend"
                      id="name-2">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="text-left"
                  id="input-name-3"
                  label-for="name-3">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text" variant="light"><i class="fas fa-user fa-lg"></i>3</span>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="member3"
                      placeholder="Guest"
                      class="input-code input-with-prepend"
                      id="name-3">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="text-left"
                  id="input-name-4"
                  label-for="name-4">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text" variant="light"><i class="fas fa-user fa-lg"></i>4</span>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="member4"
                      placeholder="Guest"
                      class="input-code input-with-prepend"
                      id="name-4">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-spinner
                  v-if="allInputsVerified"
                  variant="info" label="Spinning"></b-spinner>
                <span
                  v-if="allInputsVerified"
                  class="text-spinner text-flashes loading">Waiting Members...</span>
                <br><br>
                <span class="loading">Start when all members are registered</span>
                <b-row align-h="center" class="pt-4">
                  <b-button
                    type="submit"
                    class="pl-3 pr-3"
                    pill
                    variant="outline-info">
                    Start
                  </b-button>
                </b-row>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      description: '',
      code: '',
      numberOFMembers: 0,
      allInputsVerified: true,
      disabledButton: true,
      member1: '',
      member2: '',
      member3: '',
      member4: ''
    }
  },

  created: function () {
    this.getData()
  },

  computed: {
    stateBrainstormButton () {
      if (!this.member1 === '' && !this.member2 === '' && !this.member3 === '' && !this.member4 === '') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.disabledButton = false
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.disabledButton = true
      }
      return this.disabledButton
    }
  },

  methods: {
    getData () {
      const db = this.$firebase.firestore()
      db.collection('brainstorms').get().then(querySnapshot => {
        const dados = querySnapshot.docs[0]
        console.log(dados.id)
        /* this.description = dados.data().description
        this.numberOFMembers = dados.data().users.length + 1 */
        this.code = dados.id
      })
    },

    brainstormInit () {
      this.$router.push({ name: 'startbrainstorm' })
    },

    codeSelect () {
      const copyText = document.getElementById('copyCode')
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
    },

    copyCodeToClipboad () {
      const copyText = document.getElementById('copyCode')
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      Swal.fire({
        title: 'Code copied!',
        text: 'You cant alread sent it to your friends!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 1200
      })
    }
  }
}
</script>

<style lang="css">

.contain {
  margin-top: 22px !important;
}

.loading {
  font-family: comfortaa;
}

/* Efects for spinner and text spinner */
.text-spinner {
  margin-left: 7px;
  color: #17a2b8;
}

@keyframes blink {
  0% { color:#17a2b8; font-size: 16.5px; }
  100% { color: black; }
}
@-webkit-keyframes blink {
  0% { color: #17a2b8; font-size: 16.5px; }
  100% { color: black; }
}
.text-flashes {
  -webkit-animation: blink 1.3s linear infinite;
  -moz-animation: blink 1.3s linear infinite;
  animation: blink 1.3s linear infinite;
}

/* Changing the background color of input appends */
.input-group-text {
  background-color: #fff !important;
  color:  #17a2b8 !important;
 /*  opacity: 1.95 !important; */
}
</style>
