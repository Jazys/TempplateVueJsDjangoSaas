import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import { theme } from './theme.module';

Vue.use(Vuex)

//Permet de stocker les données dans la session en cours
export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    setToken(state, key) {
      state.token = key;
    },
  },
  actions: {
  },
  modules: {
    auth,
    theme
  }
})
