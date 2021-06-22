
import { getRoles} from '@/api/roles';
import { getSimpleRest} from '@/api/simpleRest';

export default {
    install(Vue /*, options */) {
        Vue.prototype.$api = {
            getRoles, getSimpleRest,
        }
    }
}