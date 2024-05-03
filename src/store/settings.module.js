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
    setUrlPath({ commit }, data) {
      console.log('setting: ' + data);
      commit('storeUrlPath', data)
    }
  },

  getters: {
  }
}