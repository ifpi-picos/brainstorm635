<template>
  <div class="login">
    <b-button
      class="inicial-buttons btn-google"
      pill
      variant="outline-info"
      @click="login()"
    >
      <img
        class="img-fluid"
        height="30"
        width="30"
        src="/img/google.png"
        alt="Google logo"
      />
      Login with Google
    </b-button>
  </div>
</template>

<script>
import googleProvider from '../firebase/providers'
import { EventBus } from '@/eventBus'

export default {
  data () {
    return {
      user: {}
    }
  },

  created () {
    this.users = JSON.parse(localStorage.getItem('currentUser'))
    if (this.user) {
      /* this.existedUser() */
    } else {
      console.log('error')
    }
  },

  methods: {
    login () {
      this.$firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(async result => {
          const existentUser = await this.existentUser(result.user.uid)
          if (!existentUser) {
            const user = {
              uid: result.user.uid,
              photoURL: this.geraUrlDaFoto(result.user.photoURL),
              email: result.user.email,
              displayName: result.user.displayName
            }
            await this.saveUser({
              photoURL: result.user.photoURL,
              email: result.user.email,
              displayName: result.user.displayName
            }, result.user.uid)
            const userForLocalStorage = { displayName: user.displayName, photoURL: user.photoURL }
            localStorage.setItem('currentUser', JSON.stringify(userForLocalStorage))
          } else {
            const user = {
              uid: result.user.uid,
              photoURL: this.geraUrlDaFoto(result.user.photoURL),
              email: result.user.email,
              displayName: result.user.displayName
            }
            const userForLocalStorage = { displayName: user.displayName, photoURL: user.photoURL }
            localStorage.setItem('currentUser', JSON.stringify(userForLocalStorage))
          }
          EventBus.$emit('user')
        })
        .catch(function (error) {
          console.error(error)
        })
    },

    async saveUser (user, uid) {
      this.$firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .set(user)
        .then(() => {
          this.user = user
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

    /* saveLocalStorage (user) {
      let usersLocalStorage = localStorage.getItem('users')

      if (usersLocalStorage) {
        /* dadsda  } else {
        usersLoca
        Storage = [user]
      }
      localStorage.setItem('users', JSON.stringify(usersLocalStorage))
    }, */

    geraUrlDaFoto (photoURL) {
      const letter = photoURL.substring(0, 2)
      if (letter === 'gs') {
        const storage = this.$firebase.storage()
        const storageRef = storage.refFromURL(photoURL)
        storageRef.getDownloadURL().then(url => {
          return url
        })
      } else {
        return photoURL
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
