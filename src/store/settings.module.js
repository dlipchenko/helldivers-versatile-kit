export default {
  namespaced: true,

  state: () => ({
    urlPath: ''
  }),
  mutations: {
    storeUrlPath (state, data) {
      state.urlPath = data
    }
  },
  actions: {
    setUrlPath({ commit }) {
      commit('storeUrlPath')
    }
  },

  getters: {
  }
}