export default {
  namespaced: true,

  state: () => ({
    primaryWeapons: [],
    secondaryWeapons: [],
    supportWeapons: [],
    backpacks: [],
    grenades: [],
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
    clearData (state) {
      state.primaryWeapons = []
      state.secondaryWeapons = []
      state.supportWeapons = []
      state.backpacks = []
      state.grenades = []
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
    clearData({ commit }) {
      commit('clearData')
    }
  },

  getters: {
  }
}