import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
//import SecureLS from "secure-ls";
import equipment from "./equipment.module"
import types from "./types.module"

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    equipment,
    types
  },
  plugins: [vuexLocal.plugin],
})
