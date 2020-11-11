<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <router-link :to="{ name: 'home' }">
        <a class="ml-5 logo navbar-brand" href="./views/home">Brainstorm 635</a>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
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

          <b-nav-item-dropdown class="mr-5" text="Lang" right>
            <b-dropdown-item href="#">PT
              <b-img
                class="lang-icons ml-1"
                rounded="circle"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCvXT00yZ3_JQpqaG_ChxhO533QY1-IKnMiw&usqp=CAU"
                alt="PT">
              </b-img>
            </b-dropdown-item>
            <b-dropdown-item href="#">EN
              <b-img
                class="lang-icons usa"
                src="https://rlv.zcache.com.br/prato_de_papel_placa_de_papel_de_bandeira_dos_eua-r22b032c500404daa9dd5c25a4854582e_zkbhg_307.jpg?rlvnet=1"
                rounded="circle"
                alt="PT">
              </b-img>
            </b-dropdown-item>
            <b-dropdown-item href="#">ES
              <b-img
                class="lang-icons ml-1"
                rounded="circle"
                src="https://www.extra-imagens.com.br/acessorioseinovacoes/AcessoriosparaCelulares/bastao-selfie/12652148/899224896/pop-selfie-popsocket-bandeiras-espanha-ps270-12652148.jpg"
                alt="PT">
              </b-img>
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
    border-bottom: 1px solid rgb(0, 0, 0, 0.125);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1), 0 -1px 2px 0 rgba(0,0,0,.1);
    position: fixed !important;
    top: 0 !important;
    width: 100%;
    height: 75px !important;
  }

  .logo {
    font-family: Comfortaa !important;
    font-size: 1.8rem !important;
    font-weight: bold;
  }

  .navbar-light .navbar-brand {
    color: #2c3e50 !important;
  }

  .lang-icons {
    height: 17px;
  }

  .usa {
    margin-left: 1px;
  }

  span {
    font-size: 1.2rem;
  }

  .navbar-brand {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
  }
</style>
