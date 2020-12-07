<template>
  <b-container align-v="center">
    <b-row class="align-items-center justify-content-center ml-auto mr-auto">
      <b-col class="pr-0 pl-0">
        <b-card no-body>
          <b-row>
            <b-col>
              <h4 class="page-tittle mb-4 mt-2">Brainstorm 635 online</h4>
            </b-col>
          </b-row>
          <br>
          <b-row >
            <b-col xs="12" sm="4" md="4" class="text-center culums">
              <span class="corpoInfo">
                <span class="icone icone-padd">
                  <i class="fa fa-file-signature fa-lg"></i>
                </span>
                Description
              </span>
            </b-col>
            <b-col xs="12" sm="4" md="4" class="text-center culums">
              <span class="corpoInfo round">
                <span class="icone">
                  <i
                    class="fa fa-circle-notch fa-lg">
                  </i>
                </span>
                Round
              </span>
            </b-col>
            <b-col xs="12" sm="4" md="4" class="text-center culums">
              <span class="corpoInfo">
                <span class="icone">
                  <i class="fa fa-clock fa-lg"></i>
                </span>
                Restant Time
            </span>
            </b-col>
          </b-row>
          <br><br>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-v="center">
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body class="pb-0">
            <b-form-group>
              <label for="ideia1" class="idea-label"><strong>Idea #1</strong></label>
              <b-form-textarea
                id="ideia1"
                placeholder="Write your idea..."
                class="entradaTexto">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
              v-b-tooltip.hover.v-info title="Continue idea... [M]"
              variant="outline-info" class="continueIdea">
              Continue
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body class="pb-0">
            <b-form-group>
              <label for="ideia2" class="idea-label"><strong>Idea #2</strong></label>
              <b-form-textarea
                id="ideia2"
                placeholder="Write your idea..."
                class="entradaTexto"
              ></b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
              v-b-tooltip.hover.v-info title="Continue idea... [M]"
              variant="outline-info" class="continueIdea"
              >Continue
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body class="pb-0 pl-0">
            <b-form-group>
              <label for="ideia3" class="idea-label"><strong>Idea #3</strong></label>
              <b-form-textarea
                id="ideia3"
                placeholder="Write your idea..."
                class="entradaTexto"
                wrap="hard">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
            <b-button
              v-b-tooltip.hover.v-info title="Continue idea... [M]"
              variant="outline-info" class="continueIdea"
              >Continue
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
/* .cartao{
  display: flex !important;
  flex-direction: column;
  align-content: center;
  align-items: center;
} */

.entradaTexto {
  display: flex;
  height: 200px !important;
  min-width: 200px !important;
  border: none !important;
  flex-wrap: wrap;
  margin-left: 1rem;
}

.entradaTexto:focus {
  /* box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) */
  box-shadow: none !important;
}

.entradaTexto::-webkit-scrollbar {
  width: 4px;
}

.entradaTexto::-webkit-scrollbar-track {
  background: #cecece;
  border-radius: 3px;
}

.entradaTexto::-webkit-scrollbar-thumb {
  background: rgb(112, 112, 231);
  border-radius: 3px;
}

.entradaTexto::-webkit-scrollbar-thumb:hover {
  background: blue;
}

.cor {
  position: absolute;
  left: 20px;
  bottom: 26px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background:#17a2b8;
}

.cartao {
  border: solid 1px #17a2b8 !important;
}

.icone {
  /* background: #17a2b8 !important;
  opacity: 0.95; */
  height: 43.98px !important;
  width: 38.38px !important;
  padding: 5.25px 7.5px;
  border-radius: 0.25rem 0 0 0.25rem !important;
  color: #138496 !important;
}

.icone-padd {
  padding-right: 3.5px !important;
}

.corpoInfo {
  padding: 2px 0 !important;
  border-radius: 0.25rem !important;
  /* border: solid 1px #ced4da; */
}

.idea-label {
  font-size: 17px;
}

.continueIdea {
 /*  height: 20% !important;
  padding: 0 5px 0 5px !important; */
  font-size: 15px !important;
  float: right !important;
}

.continueIdea:hover {
  background-color: #fff !important;
  color: #138496;
  font-weight: 300;
}

@media only screen and (max-width: 576px) {
  .corpoInfo {
    font-size: 15px  !important;
  }
  .culums {
    text-align: left !important;
    margin-bottom: 0.4rem !important;
  }
  .round {
    margin-left: -0.1rem;
  }
}
</style>
