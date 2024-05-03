export default {
  namespaced: true,

  state: () => ({
    selectedFaction: null,
    factions: [],
    categories: []
  }),
  mutations: {
    storeSelectedFaction (state, data) {
      state.selectedFaction = data
    },
    storeFactionArray (state, data) {
      state.factions = data
    },
    spliceFactionArray (state, spliceData) {
      state.factions.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    storeCategoryArray (state, data) {
      state.categories = data
    },
    spliceCategoryArray (state, spliceData) {
      state.categories.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    clearData (state) {
      state.factions = []
      state.categories = []
    },
  },
  actions: {
    setSelectedFaction ({ commit }, data) {
      commit('storeSelectedFaction', data)
    },
    setFactionArray ({ commit }, data) {
      commit('storeFactionArray', data)
    },
    spliceFactionArray ({ commit }, spliceData) {
      commit('spliceFactionArray', spliceData)
    },
    setCategoryArray ({ commit }, data) {
      commit('storeCategoryArray', data)
    },
    spliceCategoryArray ({ commit }, spliceData) {
      commit('spliceCategoryArray', spliceData)
    },
    clearData({ commit }) {
      commit('clearData')
    }
  },

  getters: {
  }
}