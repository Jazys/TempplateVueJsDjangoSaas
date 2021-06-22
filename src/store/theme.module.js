
import vuetify from '@/vuetify'

var initialState = {
  dark: false
}

var storedState = localStorage.getItem('theme');
if (storedState != null)
  initialState = JSON.parse(localStorage.getItem('theme'));

export const theme = {
  namespaced: true,

  state: () => {
    return initialState;
  },

  mutations: {
    dark(state, value) {
      state.dark = value;
      vuetify.framework.theme.isDark = value;
      localStorage.setItem('theme', JSON.stringify(state));
    },
  },

  actions: {
    toggleDarkMode({ state, commit }) {
      commit('dark', !state.dark);
    },
  },
};