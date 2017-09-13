import { Modal, Notice, LoadingBar } from 'iview'
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
axios.interceptors.request.use(config => {
    LoadingBar.start();
    // 所有请求带上token验证
    if (store.state.authorization) {
        config.headers.common['authorization'] = store.state.authorization;
        config.headers.common['loginId'] = store.state.loginId;
    }
    config.data = Qs.stringify(config.data);
    return config;
}, err => {
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    LoadingBar.finish();
    if (response.data.code === 403) {
        Modal.error({
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
}, error => {
    LoadingBar.finish();
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break

            case 401:
                error.message = '未授权，请登录'
                break

            case 403:
                error.message = '拒绝访问'
                break

            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break

            case 408:
                error.message = '请求超时'
                break

            case 500:
                error.message = '服务器内部错误'
                break

            case 501:
                error.message = '服务未实现'
                break

            case 502:
                error.message = '网关错误'
                break

            case 503:
                error.message = '服务不可用'
                break

            case 504:
                error.message = '网关超时'
                break

            case 505:
                error.message = 'HTTP版本不受支持'
                break

            default:
                error.message = '服务器收到宇宙能量的干扰，已经变异成机甲！'
        }
    }
    Notice.error({
        title: error.message,
        desc: '对方不想和你说话，并向你抛出了一个异常！你可以再尝试一下，但是一切只能看服务器心情。'
    })
    return Promise.reject(error)
});

export default axios;