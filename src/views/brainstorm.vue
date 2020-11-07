
<template>
  <div>
    <b-card
      no-body
      class="text-center p-5 card-home"
      align-h="center"
    >
      <h1>Brainstorm</h1>
        <b-row
          class="mt-5 d-flex justify-content-begin">
          <b-col md="4">
            <router-link :to="{ name: 'joinToBrainstorm' }">
              <b-button
                size="lg"
                class="inicial-buttons"
                pill
                variant="outline-secondary"
              >Novo Brainstorm
                <i class="fas fa-plus"></i>
              </b-button>
            </router-link>
          </b-col>
          <b-col md="8">
            <form action="">
              <b-input-group
                class="d-flex justify-content-end">
                <b-form-input
                type="text"
                placeholder="Entrar com o código"></b-form-input>
                <b-input-group-append>
                  <b-button size="lg" variant="outline-primary">Entrar</b-button>
                </b-input-group-append>
              </b-input-group>
            </form>
          </b-col>

      </b-row>
    </b-card>
  </div>
</template>

<style lang="css">
  * {
    box-sizing: border-box
  }

  .card-home {
    margin-top: 10%;
    position: relative !important;
    display: inline-flex !important;
    height: 250px;
    width: 60%;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1);
    /* display: -webkit-inline-flex; */
  }

.inicial-buttons {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.input-group > .form-control, .input-group > .form-control-plaintext, .input-group > .custom-select, .input-group > .custom-file {
  flex: none !important;
  width: 30% !important;
  padding: 1.5rem !important;
}

</style>
