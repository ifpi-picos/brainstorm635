<template>
  <div class="login" v-if="isLoged === true">
    <b-button class="inicial-buttons btn-google" pill variant="outline-info" @click="login()">
      <img class="img-fluid" height="30" width="30" src="/img/google.png" alt="Google logo" />
      Login with Google
    </b-button>
  </div>
</template>

<script>
import googleProvider from '../firebase/providers'

export default {
  data () {
    return {
      isLoged: true,
      user: {},
      imageUrl: ''
      /* users: {
        fotoUrl: null,
        nome: '',
        email: ''
      } */
    }
  },

  created () {
    this.users = JSON.parse(localStorage.getItem('user'))
    this.$firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.$store.commit('logged', true)
        this.geraUrlDaFoto(this.user.photoURL)
      } else {
        this.$store.commit('logged', false)
      }
    })
  },

  methods: {

    login () {
      this.$firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(async result => {
          localStorage.setItem('username', result.user.displayName)
          const user = {}
          user.photoURL = result.user.photoURL
          user.email = result.user.email
          user.displayName = result.user.displayName
          const existentUser = await this.existentUser(result.user.uid)
          console.log('existentUser', existentUser)
          if (!existentUser) {
            console.log('add new user ')
            await this.saveUser(user, result.user.uid)
            await this.saveLocalStorage(user)
          }
        })
        .catch(function (error) {
          console.error(error)
        })
      this.isLoged = true
    },

    async saveUser (user, uid) {
      this.$firebase
        .firestore()
        .collection('users').add({ userRegistered: true })
        .doc(uid)
        .set(user)
        .then(docRef => {
          this.user = user
          console.log('usuario salvo com sucesso: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },

    async existentUser (uid) {
      const docRef = this.$firebase
        .firestore()
        .collection('users')
        .doc(uid)
      const doc = await docRef.get()
      return doc.exists
    },

    saveLocalStorage (user) {
      let usersLocalStorage = localStorage.getItem('users')

      if (usersLocalStorage) {
        /* dadsda */
      } else {
        usersLocalStorage = [user]
      }
      localStorage.setItem('users', JSON.stringify(usersLocalStorage))
    },

    geraUrlDaFoto (photoURL) {
      const letter = photoURL.substring(0, 2)
      if (letter === 'gs') {
        const storage = this.$firebase.storage()
        const storageRef = storage.refFromURL(photoURL)
        storageRef.getDownloadURL().then((url) => {
          this.imageUrl = url
        })
      } else {
        this.imageUrl = photoURL
      }
    }
  }

}
</script>

<style lang="css">
/* .login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.btn-google:hover {
background-color: #fff;
color: #138496;
font-weight: 300;
}
</style>
