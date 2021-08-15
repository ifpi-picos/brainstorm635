import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: [
      '#ADD8E6',
      '#83CF50',
      '#83CF50',
      '#E67EB2',
      '#ED893B',
      '#3BB5E0'
    ]
  },

  mutations: {
    SET_GUESTS (state, payload) {
      state.guests = payload
    }
  },

  getters: {
    getColor: (state) => (userId, guests) => {
      const colorIndex = guests.findIndex((user) => user.uid === userId)
      return state.colors[colorIndex]
    },

    getColorGuest: (state) => (round, userId, guests, roundIdea) => {
      const currentRound = Number(round[5])
      const userIndex = guests.findIndex((user) => user.uid === userId)
      let colorIndex = userIndex - currentRound + (roundIdea)

      if (colorIndex < 0) {
        colorIndex = guests.length + colorIndex
      }

      console.log(colorIndex)
      return state.colors[colorIndex]
    }
  }
})

/* Cores
  #ed477d
  #2e3737
  #2a6333
  #48aaa9
  #83cf50
  #642c95
  #fbdf59
  #e67eb2
  #2b80c4
  #ed893b
  #ed3833
*/
