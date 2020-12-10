<template>
  <b-container class="footer" >
    <b-row class="text-center" no-gutters  >
      <b-col class="ml-auto mr-auto" xs="6" sm="12" md="8" lg="10" align-self="center">
        <b-row class="mt-4" no-gutters>
          <b-col xs="4">
            <span class="span">
              &copy; CopyRight, Brainstorm635 2020
            </span>
          </b-col>
          <b-col xs="4">
            <span class="sidebar-footer"></span>
          </b-col>
          <b-col xs="4">
            <span class="span">
              All Rights Reserved
            </span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container >
</template>

<style lang="css">
.span {
  font-family: comfortaa !important;
  color: #2c3e50 !important;
  font-size: 16px !important;
}

.footer {
  min-width: 100% !important;
  max-width: 100% !important;
  box-shadow: 0px 5px 10px 0px rgba(153, 153, 153, 0.3) !important;
 /*  bottom: 0px !important;
  position: fixed !important; */
  height: 75px !important;
  border-radius: 0 !important;
  background-color: #fff !important;
  border-top: rgb(0, 0, 0, 0.125 ) 0.2px solid !important;
}

.sidebar-footer {
  position: absolute;
  height: 55px;
  border-left: 4px solid #17a2b8;
  margin-top: -10px !important;
}

/* Media queries for responsive footer bar */
@media only screen and (max-width: 576px) {
  .span {
    font-size: 15px !important;
  }
}
</style>
