<template>
  <div>
    <b-navbar
      fixed="top"
      toggleable="lg"
      type="light"
    >
    <span class="sidebar-nav"></span>
    <b-link
      class="
      navbar-brand
      ml-3"
      to="/">
      <b-img width="190" height="20" :src="require('../../public/img/brainstorm635.png')" />
    </b-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <b-nav-item-dropdown
            class="mr-5"
            text="Lang"
            right
          >
            <b-dropdown-item href="#">PT
              <b-img
                class="ml-1"
                rounded="circle"
                :src="require('../../public/img/brasil.png')"
                alt="PT"
                height="17"
              />
            </b-dropdown-item>
            <b-dropdown-item href="#">EN
              <b-img
                class="usa"
                :src="require('../../public/img/eua.png')"
                rounded="circle"
                alt="EN"
                height="17"
              />
            </b-dropdown-item>
            <b-dropdown-item href="#">ES
              <b-img
                class="ml-1"
                rounded="circle"
                :src="require('../../public/img/espanha.png')"
                alt="ES"
                height="17"
              />
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- <b-nav-item-dropdown right>
            //Using 'button-content' slot
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style lang="css">
  .navbar {
    background-color: #fff !important;
    /* padding: 1rem 1rem !important; */
    border-bottom: 1px solid rgb(0, 0, 0, 0.125 );
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
    position: fixed !important;
    width: 100%;
    height: 75px !important;
  }

  /* .logo {
    font-family: Comfortaa !important;
    font-size: 1.8rem !important;
    font-weight: bold;
  } */

  .navbar-light .navbar-brand {
    color: #2c3e50 !important;
  }

  .usa {
    margin-left: 1px;
  }

  span {
    font-size: 1.2rem;
  }

  /* .navbar-brand {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
  } */
</style>
