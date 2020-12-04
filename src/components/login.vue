<template>
  <div class="login">
    <b-button class="inicial-buttons btn-google" pill variant="outline-info" @click="login()">
      <img class="img-fluid" height="30" width="30" src="/img/google.png" alt="Google logo" />
      Login with Google
    </b-button>
  </div>
</template>

<script>
import googleProvider from '../firebase/providers'

export default {
  name: ' login ',
  data () {
    return {}
  },
  methods: {
    login () {
      this.$firebase
        .auth().signInWithPopup(googleProvider)
        .then(function (result) {
          // eslint-disable-next-line no-unused-vars
          const user = {}
          user.photoUrl = result.user.photoUrl
          user.email = result.user.email
          user.displayName = result.user.displayName
          /* user.uid = result.user.uid */
          this.saveUser(user, result.user.uid)
          this.$router.push({ name: 'brainstorm' })
        }).catch(function (error) {
          // eslint-disable-next-line no-unused-vars
          const errorCode = error.code
          // eslint-disable-next-line no-unused-vars
          const errorMessage = error.message
          // eslint-disable-next-line no-unused-vars
          const email = error.email
          // eslint-disable-next-line no-unused-vars
          const credential = error.credential
        })
    },

    saveUser (user, uid) {
      this.$firebase
        .firestore()
        .colection('users').doc(uid)
        .set(this.user)
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        }).catch(function (error) {
          console.error('Error eddind document: ', error)
        })
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
