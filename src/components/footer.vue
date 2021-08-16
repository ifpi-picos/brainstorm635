<template>
  <b-container fluid class="footer">
    <b-row class="text-center justify-content-md-center" align-v="end" style="padding-top: 10px">
      <b-col class="cols-footer" md="6" lg="6" sm="6" align-self="center">
        <span class="span">
          &copy; CopyRight, Brainstorm635 2020
        </span>
      </b-col>
      <b-col class="cols-footer sidebar-footer" md="6" lg="6" sm="6" align-self="center" style="padding-top: 15px">
        <span class="span">
          All Rights Reserved
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="css">
.span {
  font-family: comfortaa !important;
  color: #2c3e50 !important;
  font-size: 16px !important;
}

.footer {
  display: block !important;
  min-height: 75px !important;
  max-height: 80px !important;
  border-top: rgb(0, 0, 0, 0.125 ) 0.2px solid !important;
  margin-left: none !important;
  margin-right: none !important;
}

.sidebar-footer {
  /* position: absolute; */
  height: 55px;
  border-left: 4px solid #17a2b8;
}

/* Media queries for responsive footer bar */
@media only screen and (max-width: 576px) {
  .span {
    font-size: 13px !important;
  }
  .cols-footer {
    width: 50% !important;
  }
}
</style>
