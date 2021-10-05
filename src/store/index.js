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

  getters: {
    getColor: (state) => (userId, guests) => {
      const colorIndex = guests.findIndex((user) => user.uid === userId)
      return state.colors[colorIndex]
    },

    getColorPostit: (state) => (indexSheet, roundIdea, listGuestsLength) => {
      let indexColor = (indexSheet - 1) + (roundIdea - 1)

      if (indexColor > listGuestsLength - 1) {
        indexColor = indexColor - listGuestsLength - 1
      }

      return state.colors[indexColor]
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
