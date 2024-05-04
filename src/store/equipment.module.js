export default {
  namespaced: true,

  state: () => ({
    primaryWeapons: [],
    secondaryWeapons: [],
    supportWeapons: [],
    backpacks: [],
    grenades: [],
    loadouts: [],
  }),
  mutations: {
    storePrimaryWeaponArray (state, data) {
      state.primaryWeapons = data
    },
    splicePrimaryWeaponArray (state, spliceData) {
      state.primaryWeapons.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    storeSecondaryWeaponArray (state, data) {
      state.secondaryWeapons = data
    },
    spliceSecondaryWeaponArray (state, spliceData) {
      state.secondaryWeapons.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    storeSupportWeaponArray (state, data) {
      state.supportWeapons = data
    },
    spliceSupportWeaponArray (state, spliceData) {
      state.supportWeapons.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    storeBackpackArray (state, data) {
      state.backpacks = data
    },
    spliceBackpackArray (state, spliceData) {
      state.backpacks.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    storeGrenadeArray (state, data) {
      state.grenades = data
    },
    spliceGrenadeArray (state, spliceData) {
      state.grenades.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    storeLoadoutArray (state, data) {
      state.loadouts = data
    },
    spliceLoadoutArray (state, spliceData) {
      state.loadouts.splice(spliceData.index, spliceData.delete ? spliceData.delete : 0, spliceData.data)
    },
    pushLoadoutArray (state, data) {
      state.loadouts.push(data)
    },
    clearData (state) {
      state.primaryWeapons = []
      state.secondaryWeapons = []
      state.supportWeapons = []
      state.backpacks = []
      state.grenades = []
      state.loadouts = []
    },
  },
  actions: {
    setPrimaryWeaponArray ({ commit }, data) {
      commit('storePrimaryWeaponArray', data)
    },
    splicePrimaryWeaponArray ({ commit }, spliceData) {
      commit('splicePrimaryWeaponArray', spliceData)
    },
    setSecondaryWeaponArray ({ commit }, data) {
      commit('storeSecondaryWeaponArray', data)
    },
    spliceSecondaryWeaponArray ({ commit }, spliceData) {
      commit('spliceSecondaryWeaponArray', spliceData)
    },
    setSupportWeaponArray ({ commit }, data) {
      commit('storeSupportWeaponArray', data)
    },
    spliceSupportWeaponArray ({ commit }, spliceData) {
      commit('spliceSupportWeaponArray', spliceData)
    },
    setBackpackArray ({ commit }, data) {
      commit('storeBackpackArray', data)
    },
    spliceBackpackArray ({ commit }, spliceData) {
      commit('spliceBackpackArray', spliceData)
    },
    setGrenadeArray ({ commit }, data) {
      commit('storeGrenadeArray', data)
    },
    spliceGrenadeArray ({ commit }, spliceData) {
      commit('spliceGrenadeArray', spliceData)
    },
    replaceLoadouts({commit}, data) {
      commit('storeLoadoutArray', data)
    },
    addLoadout ({ commit }, data) {
      commit('pushLoadoutArray', data)
    },
    updateLoadout ({ commit, state }, data) {
      const index = state.loadouts.findIndex(x => x.id == data.id)
      if (index > -1) commit('spliceLoadoutArray', { data: data, delete: 1, index: index })
    },
    clearData({ commit }) {
      commit('clearData')
    }
  },

  getters: {
  }
}