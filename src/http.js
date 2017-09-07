import Vue from 'vue';
import iView from 'iview'
import axios from 'axios'
import store from './store/store'
import * as types from './store/types'
import router from './router'
import Qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://192.168.0.251'; //配置接口地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // 所有请求带上token验证
        if (store.state.authorization) {
            config.headers.common['authorization'] = store.state.authorization;
            config.headers.common['loginId'] = store.state.loginId;
        }
        config.data = Qs.stringify(config.data);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 403) {
            iView.Modal.error({
                content: '登录过期，请重新登录。',
                onOk() {
                    //清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }
            })
        }
        return response.data;
    },
    error => {
        iView.Notice.error({
            title: '服务器异常',
            desc: '对方不想和你说话，并向你抛出了一个异常！你可以再尝试一下，但是一切只能看服务器心情。'
        })
        return Promise.reject(error)
    });

export default axios;