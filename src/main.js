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
import * as filters from '@/utils/filters' //过滤器
import tools from '@/utils/tools' //全局方法

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(tools);

Vue.use(iView)
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