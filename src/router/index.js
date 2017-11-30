import Vue from 'vue';
import iView from 'iview'
import Router from 'vue-router';
import store from '@/store/store'
import * as types from '@/store/types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Router);


// 页面刷新时，重新赋值token
if (Vue.ls.get('authorization_bg')) {
    store.commit(types.LOGIN, { authorization: Vue.ls.get('authorization_bg'), loginId: Vue.ls.get('loginId_bg') })
}

const router = new Router({
    mode: 'history',
    base: '/bg/',
    routes: [{
            path: '/',
            name: '/',
            component: resolve => require(['@/views/index/index'], resolve),
            children: [{
                    path: 'ironBuys',
                    name: 'ironBuys',
                    component: resolve => require(['@/views/buys/irons/index'], resolve),
                },
                {
                    path: 'valetIron',
                    name: 'valetIron',
                    component: resolve => require(['@/views/buys/valetIron/index'], resolve),
                },
                {
                    path: 'quality',
                    name: 'quality',
                    component: resolve => require(['@/views/buys/quality/index'], resolve),
                },
                {
                    path: 'jurisdiction',
                    name: 'jurisdiction',
                    component: resolve => require(['@/views/jurisdiction/index'], resolve),
                },
                {
                    path: 'interfaceManagement',
                    name: 'interfaceManagement',
                    component: resolve => require(['@/views/interface/index'], resolve),
                }, {
                    path: 'adManage',
                    name: 'adManage',
                    component: resolve => require(['@/views/marketing/adManage'], resolve),
                }, {
                    path: 'userManagement',
                    name: 'userManagement',
                    component: resolve => require(['@/views/userManagement/user/index'], resolve),
                }, {
                    path: 'businessManagement',
                    name: 'businessManagement',
                    component: resolve => require(['@/views/userManagement/business/index'], resolve),
                },{
                    path: 'commissioner',
                    name: 'commissioner',
                    component: resolve => require(['@/views/userManagement/commissioner/index'], resolve)
                }, {
                    path: 'unitManagement',
                    name: 'unitManagement',
                    component: resolve => require(['@/views/application/unitManagement/index'], resolve),
                },
                {
                    path: 'dataManagement',
                    name: 'dataManagement',
                    component: resolve => require(['@/views/application/dataManagement/index'], resolve),
                },
                {
                    path: 'relationManagement',
                    name: 'relationManagement',
                    component: resolve => require(['@/views/application/relationManagement/index'], resolve),
                },
                {
                    path: 'sellerBaseManagement',
                    name: 'sellerBaseManagement',
                    component: resolve => require(['@/views/application/sellerBaseInfo/index'], resolve),
                },
                {
                    path: 'resourceType',
                    name: 'resourceType',
                    component: resolve => require(['@/views/fileManagement/resourceType/index'],resolve)
                },
                {
                    path:'resourceDownloadRecord',
                    name: 'resourceDownloadRecord',
                    component: resolve => require(['@/views/fileManagement/resourceDownloadRecord/index'],resolve),
                },
                {
                    path: 'dataAggregation',
                    name: 'dataAggregation',
                    component: resolve => require(['@/views/jiedanba/dataAggregation/index'], resolve),
                },
                {
                    path: 'dkplan',
                    name: 'dkplan',
                    component: resolve => require(['@/views/resourceManagement/dkplan/index'], resolve),
                },
                {
                    path: 'specialOffer',
                    name: 'specialOffer',
                    component: resolve => require(['@/views/resourceManagement/specialOffer/index'], resolve),
                },
                {
                    path: 'stockResources',
                    name: 'stockResources',
                    component: resolve => require(['@/views/resourceManagement/stockResources/index'], resolve),
                },
                {
                    path: 'buyerRank',
                    name: 'buyerRank',
                    component: resolve => require(['@/views/jiedanba/buyerRank/index'], resolve),
                },
                {
                    path: 'sellerRank',
                    name: 'sellerRank',
                    component: resolve => require(['@/views/jiedanba/sellerRank/index'], resolve),
                },
                {
                    path: 'regionalRank',
                    name: 'regionalRank',
                    component: resolve => require(['@/views/jiedanba/regionalRank/index'], resolve),
                },
                {
                    path: 'ironsRank',
                    name: 'ironsRank',
                    component: resolve => require(['@/views/jiedanba/ironsRank/index'], resolve),
                },
                {
                    path:'resourceRefresh',
                    name: 'resourceRefresh',
                    redirect: '/resourceRefresh/type',
                    component: resolve => require(['@/views/system/resourceRefresh/index'],resolve),
                    meta: {
                        requireAuth: true
                    },
                    children: [{
                        path: 'rank',
                        name: 'rank',
                        component: resolve => require(['@/views/system/resourceRefresh/refreshRank/index'],resolve),
                        meta: {
                            requireAuth: true
                        }
                    },{
                        path: 'rulesConfig',
                        name: 'rulesConfig',
                        component: resolve => require(['@/views/system/resourceRefresh/refreshRulesConfig/index'],resolve),
                        meta: {
                            requireAuth: true
                        }
                    },{
                        path: 'rules',
                        name: 'rules',
                        component: resolve => require(['@/views/system/resourceRefresh/refreshRulesManagement/index'],resolve),
                        meta: {
                            requireAuth: true
                        }
                    },{
                        path: 'type',
                        name: 'type',
                        component: resolve => require(['@/views/system/resourceRefresh/refreshType/index'],resolve),
                        meta: {
                            requireAuth: true
                        }
                    }]
                },
                {
                    path: 'resourceOpenTime',
                    name: 'resourceOpenTime',
                    component: resolve => require(['@/views/system/resourceOpenTime/index'],resolve)
                },
                {
                    path: 'baseDataSort',
                    name: 'baseDataSort',
                    component: resolve => require(['@/views/system/baseDataSort/index'],resolve),
                },
                {
                    path: 'resourceTypeConfig',
                    name: 'resourceTypeConfig',
                    component: resolve => require(['@/views/system/resourceTypeConfig/index'],resolve)
                },
                {
                    path: 'buyerOptionConfig',
                    name: 'buyerOptionConfig',
                    component: resolve => require(['@/views/buyerOptionConfig/optionConfig/index'],resolve)
                }
            ]
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
    if (to.meta.requireAuth) {
        next();
    } else {
        if (store.state.authorization) {
            next();
        } else {
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

});

export default router;