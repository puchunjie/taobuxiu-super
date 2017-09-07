import Vue from 'vue';
import iView from 'iview'
import Router from 'vue-router';
import store from '@/store/store'
import * as types from '@/store/types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Router);


// 页面刷新时，重新赋值token
if (Vue.ls.get('authorization')) {
    store.commit(types.LOGIN, { authorization: Vue.ls.get('authorization'), loginId: Vue.ls.get('loginId') })
}

const router = new Router({
    mode: 'history',
    base: '/bg/',
    routes: [{
            path: '/',
            name: '/',
            component: resolve => require(['@/views/index/index'], resolve),
            children: [{
                path: 'adManage',
                name: 'adManage',
                component: resolve => require(['@/views/marketing/adManage'], resolve),
            }, {
                path: 'special',
                name: 'special',
                component: resolve => require(['@/views/specialResources/index'], resolve),
            }]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/login/index'], resolve),
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.meta.requireAuth) {
        next();
    } else {
        if (store.state.authorization) {
            next();
        } else {
            console.log(iView.Message)
            iView.Modal.error({
                content: '登录过期，请重新登录。',
                onOk() {
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath }
                    })
                }
            })
        }
    }
})

router.afterEach((to, from, next) => {
    setTimeout(function() {
        iView.LoadingBar.finish();
    }, 500);
});

export default router;