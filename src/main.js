// Packages
import Vue from 'vue';
import Vuex from 'vuex';

import registerPlugins from '@/plugins'
import registerValidation from '@/helpers/validation'
import vuetify from '@/vuetify';
import i18n from '@/i18n'
import router from '@/router';
import store from "@/store";

// Application
import App from './App';

// Globals
Vue.config.productionTip = false

registerPlugins(Vue);
registerValidation(Vue);

Vue.use(Vuex);

//For saving dark ou bright theme
vuetify.framework.theme.isDark = store.state.theme.dark;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
});
