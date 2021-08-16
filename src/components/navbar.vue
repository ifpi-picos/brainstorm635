<template>
  <b-navbar
    toggleable="lg"
    type="light"
  >
    <b-navbar-brand>
      <b-link
        @click.prevent="verifyRoute()"
        class="sidebar-nav
        navbar-brand ml-1"
      >
        <b-img
          class="ml-3 mt-4"
          width="190"
          height="20"
          :src="require('../../public/img/brainstorm635.png')"
        />
      </b-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse
      id="nav-collapse"
      is-nav
    >
      <b-navbar-nav class="ml-auto">
        <div
          v-if="verifyLocalStorage"
          class="d-flex mr-3"
        >
          <b-nav-item right>
            <b-avatar
              circle
              :src="user.photoURL"
              alt="Foto do usuário"
            >
            </b-avatar>
            <span class="user ml-2">{{ user.displayName }}</span>
          </b-nav-item>
          <b-nav-item-dropdown
            class="avatar d-flex justify-content-end pl-0"
            right
          >
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
         <!-- <b-nav-item-dropdown
          text="Lang"
          right
          >
          <b-dropdown-item href="#">EN
            <b-img
              class="usa"
              :src="require('../../public/img/eua.png')"
              rounded="circle"
              alt="EN"
              height="17"
            >
            </b-img>
          </b-dropdown-item>
          <b-dropdown-item href="#">PT
            <b-img
              class="ml-1"
              rounded="circle"
              :src="require('../../public/img/brasil.png')"
              alt="PT"
              height="17"
            >
            </b-img>
          </b-dropdown-item>
          <b-dropdown-item href="#">ES
            <b-img
              class="ml-1"
              rounded="circle"
              :src="require('../../public/img/espanha.png')"
              alt="ES"
              height="17"
            >
            </b-img>
          </b-dropdown-item>
         </b-nav-item-dropdown>-->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Swal from 'sweetalert2'
import { EventBus } from '@/eventBus'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      load: false,
      verifyLocalStorage: false,
      user: {
        photoURL: '',
        displayName: ''
      }
    }
  },

  computed: {
    ...mapState([])
  },

  created () {
    EventBus.$on('user', () => {
      this.getLocalStorage()
      this.verifyLocalStorage = true
    })
    this.getLocalStorage()
  },

  methods: {
    logout () {
      this.verifyLocalStorage = false
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('currentUser')
          this.user = { photoURL: null, displayName: null }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    getLocalStorage () {
      this.user = JSON.parse(localStorage.getItem('currentUser'))
      if (this.user) {
        this.verifyLocalStorage = true
      }
      if (this.user === null) {
        this.user = { photoURL: '', displayName: '' }
      }
    },

    verifyRoute () {
      if (this.$route.name === 'brainstorm' || this.$route.name === 'startBrainstorm' || this.$route.name === 'printBrainstorm') {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are trying to get out without finishing or saving data!',
          icon: 'warning',
          focusConfirm: false,
          showCloseButton: true,
          confirmButtonText: 'Confirm exit',
          denyButtonText: 'Cancel',
          showCancelButton: true,
          confirmButtonColor: '#17a2b8',
          cancelButtonColor: '#dc3545'
        }).then((result) => {
          if (result.isConfirmed) { this.$router.push({ name: 'default' }) }
        })
      }
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

.usa {
  margin-left: 1px;
}

span,
.user {
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

.navbar-expand-lg .navbar-nav .nav-link {
  padding-right: 0.5rem;
  padding-left: 0 !important;
}

.swal2-close:focus {
  box-shadow: none !important;
}

/* Adicional CSS for navbar */
.navbar {
  background-color: #fff !important;
  border-bottom: 1px solid rgb(0, 0, 0, 0.125);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
  min-width: 100%;
  min-height: 75px !important;
  padding: 0 7rem 0 7rem !important;
}

/* Media queries for responsive nav bar */
@media only screen and (max-width: 576px) {
  .navbar {
    padding: 0 !important;
  }
}
</style>
