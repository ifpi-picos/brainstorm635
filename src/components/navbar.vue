<template>
  <div>
    <b-navbar
      fixed="top"
      toggleable="lg"
      type="light">
      <b-navbar-brand>
        <b-link
          class="sidebar-nav
          navbar-brand ml-1"
          to="/">
          <b-img class="ml-3 mt-4" width="190" height="20" :src="require('../../public/img/brainstorm635.png')" />
        </b-link>
      </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse
            id="nav-collapse"
            is-nav>
            <!-- <b-navbar-nav>
              <b-nav-item href="#">Link</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav> -->
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <div
                v-if="verifyLocalStorage"
                class="d-flex mr-3" >
                <b-nav-item
                  right>
                  <b-avatar
                    circle
                    :src="user.photoURL"
                    alt="Foto do usuário">
                  </b-avatar>
                  <span class="user ml-2">{{ user.displayName }}</span>
                </b-nav-item>
                <b-nav-item-dropdown
                  class="avatar d-flex justify-content-end pl-0"
                  right>
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </div>

              <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form> -->
              <b-nav-item-dropdown
                class="mr-5"
                text="Lang"
                right>
                <b-dropdown-item href="#">PT
                  <b-img
                    class="ml-1"
                    rounded="circle"
                    :src="require('../../public/img/brasil.png')"
                    alt="PT"
                    height="17">
                  </b-img>
                </b-dropdown-item>
                <b-dropdown-item href="#">EN
                  <b-img
                    class="usa"
                    :src="require('../../public/img/eua.png')"
                    rounded="circle"
                    alt="EN"
                    height="17">
                  </b-img>
                </b-dropdown-item>
                <b-dropdown-item href="#">ES
                  <b-img
                    class="ml-1"
                    rounded="circle"
                    :src="require('../../public/img/espanha.png')"
                    alt="ES"
                    height="17">
                  </b-img>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { EventBus } from '@/eventBus'

export default {
  data () {
    return {
      verifyLocalStorage: true,
      user: {
        photoURL: '',
        displayName: ''
      }
    }
  },

  created () {
    EventBus.$on('user', () => {
      this.user = JSON.parse(localStorage.getItem('currentUser'))
      console.log(this.user)
      if (this.user) {
        this.verifyLocalStorage = true
      }
      if (this.user === null) {
        this.user = { photoURL: '', displayName: '' }
      }
      console.log(this.user)
    })
  },

  updated () {
    console.log('sasdas')
  },

  methods: {
    logout () {
      this.verifyLocalStorage = false
      this.$firebase
        .auth()
        .signOut()
        .then(function () {
          localStorage.removeItem('currentUser')
          this.user = { photoURL: '', displayName: '' }
          this.$router.push('/')
          console.log('dasda', this.$router)
        }).catch(function (error) {
          console.log('errou', error)
        })
    }
  }
}
</script>

<style lang="css">

/* Barra lateral Azul da navbar e footer */
.sidebar-nav {
  border-left: 4px solid #17a2b8;
  height: 60px !important;
}

.navbar-brand {
  padding: 0 !important;
}

.navbar {
  background-color: #fff !important;
  border-bottom: 1px solid rgb(0, 0, 0, 0.125 );
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
  width: 100%;
  height: 75px !important;
  padding: 0 7rem 0 7rem !important;
}

.usa {
  margin-left: 1px;
}

span, .user {
  font-size: 1.2rem;
}
/* Media queries for responsive nav bar */
@media only screen and (max-width: 576px) {
  .navbar {
    padding: 0 !important;
  }
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

.navbar-expand-lg .navbar-nav .nav-link {
  padding-right: 0.5rem;
  padding-left: 0 !important;
}
</style>
