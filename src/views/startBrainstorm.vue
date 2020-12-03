<template>
  <b-container align-v="center">
    <b-row class="align-items-center justify-content-center ml-auto mr-auto">
      <b-col>
        <b-card>
          <b-card-body class="d-flex justify-content-between">
              <span class="corpoInfo">
                <span class="icone">
                  <i class="fa fa-file-signature fa-lg"></i>
                </span>Description
              </span>
              <span class="corpoInfo">
                <span class="icone">
                  <i class="fa fa-circle-notch fa-lg mr-auto ml-auto"></i>
                </span>Round
              </span>
              <span class="corpoInfo">
                <span class="icone">
                  <i class="fa fa-clock fa-lg"></i>
                </span>Restant Time
              </span>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-v="center">
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body>
            <b-form-group>
              <label for="ideia1">Idea #1</label>
              <b-form-textarea
                id="ideia1"
                placeholder="Write your idea..."
                class="entradaTexto">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body>
            <b-form-group>
              <label for="ideia2">Idea #2</label>
              <b-form-textarea
                id="ideia2"
                placeholder="Write your idea..."
                class="entradaTexto"
              ></b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        class="align-items-center justify-content-center ml-auto mr-auto mb-2 h-100">
        <b-card class="cartao text-center pr-0 pl-0 pb-0 pt-0">
          <b-card-body>
            <b-form-group>
              <label for="ideia3">Idea #3</label>
              <b-form-textarea
                id="ideia3"
                placeholder="Write your idea..."
                class="entradaTexto"
                wrap="hard">
              </b-form-textarea>
            </b-form-group>
            <div class="cor"></div>
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
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: blue;
}

.cartao {
  border: solid 1px blue !important;
}

.icone {
  background: #17a2b8 !important;
  opacity: 0.95;
  height: 43.98px !important;
  width: 38.38px !important;
  padding: 5.25px 7.5px;
  border-radius: 0.25rem 0 0 0.25rem !important;
}

.corpoInfo {
  padding: 2px 0 !important;
  border-radius: 0.25rem !important;
  border: solid 1px #ced4da;
}
</style>
