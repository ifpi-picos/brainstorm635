<template>
  <b-container fluid class="footer">
    <b-row class="text-center justify-content-md-center" align-v="end" style="padding-top: 10px">
      <b-col class="cols-footer" md="6" lg="6" sm="6" align-self="center">
        <span class="span">
          &copy; CopyLeft,
          <b-img class="logo-footer" height="45"
            :src="require('../../public/img/logo/brainstorm635.com-white.jpg')">
          </b-img>2020
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

<style lang="css" scoped>
.span {
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
  height: 55px;
  border-left: 4px solid #3BB5E0;
}

/* Media queries for responsive footer bar */
@media only screen and (max-width: 576px) {
  .span {
    font-size: 13px !important;
  }
  .cols-footer {
    width: 50% !important;
  }
  .logo-footer {
    height: 3rem !important;
    width: 12rem !important;
  }
}
</style>
