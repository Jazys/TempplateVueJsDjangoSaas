export default {
    install(Vue /*, options */) {
        Vue.prototype.$bus = new Vue();
    }
}