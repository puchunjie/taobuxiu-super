import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        authorization: undefined,
        loginId: undefined
    },
    mutations: {
        [types.LOGIN]: (state, payload) => {
            Vue.ls.set('authorization', payload.authorization);
            Vue.ls.set('loginId', payload.loginId);
            state.authorization = payload.authorization;
            state.loginId = payload.loginId;
        },
        [types.LOGOUT]: (state) => {
            Vue.ls.remove('authorization');
            Vue.ls.remove('loginId');
            state.authorization = undefined;
            state.loginId = undefined;
        }
    }
})