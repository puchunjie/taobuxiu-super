import Vue from 'vue'
import App from './App'
import router from './router'
import * as api from './utils/api'
import iView from 'iview'
import '../static/css/reset.css'
import '../static/css/iview.css'
import '../static/css/animate.css'
import axios from './http'
import store from './store/store'
import moment from 'vue-moment-jalaali'
import * as filters from '@/utils/filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(iView)
Vue.use(moment)
Vue.prototype.api = api; //所有接口列表挂载
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.config.debug = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})