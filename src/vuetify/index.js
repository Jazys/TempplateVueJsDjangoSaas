import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify)

const opts = {
    iconfont: "mdi"
}

export default new Vuetify(opts)