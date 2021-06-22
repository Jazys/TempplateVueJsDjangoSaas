import api from './api'
import eventbus from './eventbus'


export default function registerPlugins(Vue) {
    Vue.use(api);
    Vue.use(eventbus);
}
