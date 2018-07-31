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
  store.commit(types.LOGIN, {
    authorization: Vue.ls.get('authorization_bg'),
    loginId: Vue.ls.get('loginId_bg')
  })
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
        }, {
          path: 'bankCard/:id',
          name: 'bankCard',
          component: resolve => require(['@/views/userManagement/bankCard/index'], resolve),
        }, {
          path: 'examine',
          name: 'examine',
          component: resolve => require(['@/views/userManagement/examine/index'], resolve)
        }, {
          path: 'examineDetail/:id/:status',
          name: 'examineDetail',
          component: resolve => require(['@/views/userManagement/examine/detail/index'], resolve)
        }, {
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
          component: resolve => require(['@/views/fileManagement/resourceType/index'], resolve)
        },
        {
          path: 'resourceDownloadRecord',
          name: 'resourceDownloadRecord',
          component: resolve => require(['@/views/fileManagement/resourceDownloadRecord/index'], resolve),
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
        }, {
          path: 'stockOrder',
          name: 'stockOrder',
          component: resolve => require(['@/views/orderManagement/stockOrder/index'], resolve)
        }, {
          path: 'planOrder',
          name: 'planOrder',
          component: resolve => require(['@/views/orderManagement/planOrder/index'], resolve)
        }, {
          path: 'specialOrder',
          name: 'specialOrder',
          component: resolve => require(['@/views/orderManagement/specialOrder/index'], resolve)
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
        }, {
          path: 'orderCountManagement',
          name: 'orderCountManagement',
          redirect: 'orderCountManagement/orderCount',
          component: resolve => require(['@/views/orderCountManagement/index'], resolve),
          meta: {
            requireAuth: true
          },
          children: [{
            path: 'orderCount',
            name: 'orderCount',
            component: resolve => require(['@/views/orderCountManagement/orderCount/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'buyerCount',
            name: 'buyerCount',
            component: resolve => require(['@/views/orderCountManagement/buyerCount/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'sellerCount',
            name: 'sellerCount',
            component: resolve => require(['@/views/orderCountManagement/sellerCount/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'areaCount',
            name: 'areaCount',
            component: resolve => require(['@/views/orderCountManagement/areaCount/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'goodsCount',
            name: 'goodsCount',
            component: resolve => require(['@/views/orderCountManagement/goodsCount/index'], resolve),
            meta: {
              requireAuth: true
            }
          }]
        }, {
          path: 'authentication',
          name: 'authentication',
          component: resolve => require(['@/views/contractManagement/authentication/index'], resolve)
        }, {
          path: 'authDetail-:id-:status',
          name: 'authDetail',
          component: resolve => require(['@/views/contractManagement/authentication/authDetail/index'], resolve)
        }, {
          path: 'draft',
          name: 'draft',
          redirect: 'draft/step1',
          component: resolve => require(['@/views/contractManagement/draft/index'], resolve),
          children: [{
            path: 'step1',
            name: 'step1',
            component: resolve => require(['@/views/contractManagement/draft/step/step1'], resolve)
          }, {
            path: 'step2-:buyerId',
            name: 'step2',
            component: resolve => require(['@/views/contractManagement/draft/step/step2'], resolve)
          }, {
            path: 'step3-:buyerId-:sellerId',
            name: 'step3',
            component: resolve => require(['@/views/contractManagement/draft/step/step3'], resolve)
          }, {
            path: 'step4',
            name: 'step4',
            component: resolve => require(['@/views/contractManagement/draft/step/step4'], resolve)
          }]
        }, {
          path: 'authList',
          name: 'authList',
          component: resolve => require(['@/views/contractManagement/authList/index'], resolve)
        }, {
          path: 'infoConfig',
          name: 'infoConfig',
          component: resolve => require(['@/views/contractManagement/infoConfig/index'], resolve)
        }, {
          path: 'logData',
          name: 'logData',
          component: resolve => require(['@/views/logisticsManagement/data/index'], resolve)
        }, {
          path: 'logDemand',
          name: 'logDemand',
          component: resolve => require(['@/views/logisticsManagement/demand/index'], resolve)
        }, {
          path: 'logGoods',
          name: 'logGoods',
          component: resolve => require(['@/views/logisticsManagement/goods/index'], resolve)
        }, {
          path: 'dictionaryMana',
          name: 'dictionaryMana',
          component: resolve => require(['@/views/system/dictionaryMana/index'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'resourceRefresh',
          name: 'resourceRefresh',
          redirect: '/resourceRefresh/type',
          component: resolve => require(['@/views/system/resourceRefresh/index'], resolve),
          meta: {
            requireAuth: true
          },
          children: [{
            path: 'rank',
            name: 'rank',
            component: resolve => require(['@/views/system/resourceRefresh/refreshRank/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'rulesConfig',
            name: 'rulesConfig',
            component: resolve => require(['@/views/system/resourceRefresh/refreshRulesConfig/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'rules',
            name: 'rules',
            component: resolve => require(['@/views/system/resourceRefresh/refreshRulesManagement/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'type',
            name: 'type',
            component: resolve => require(['@/views/system/resourceRefresh/refreshType/index'], resolve),
            meta: {
              requireAuth: true
            }
          }]
        }, {
          path: 'addNews/:id/:type',
          name: 'addNews',
          component: resolve => require(['@/views/newsManagement/add/index'], resolve)
        }, {
          path: 'newsList',
          name: 'newsList',
          redirect: '/newsList/publish',
          component: resolve => require(['@/views/newsManagement/list/index'], resolve),
          meta: {
            requireAuth: true
          },
          children: [{
            path: 'publish',
            name: 'publish',
            component: resolve => require(['@/views/newsManagement/list/publish/index'], resolve),
            meta: {
              requireAuth: true
            }
          }, {
            path: 'drafts',
            name: 'drafts',
            component: resolve => require(['@/views/newsManagement/list/drafts/index'], resolve),
            meta: {
              requireAuth: true
            }
          }]
        }, {
          path: 'newsConfig',
          name: 'newsConfig',
          component: resolve => require(['@/views/newsManagement/newsConfig/index'], resolve)
        },
        {
          path: 'resourceOpenTime',
          name: 'resourceOpenTime',
          component: resolve => require(['@/views/system/resourceOpenTime/index'], resolve)
        },
        {
          path: 'baseDataSort',
          name: 'baseDataSort',
          component: resolve => require(['@/views/system/baseDataSort/index'], resolve),
        },
        {
          path: 'resourceTypeConfig',
          name: 'resourceTypeConfig',
          component: resolve => require(['@/views/system/resourceTypeConfig/index'], resolve)
        },
        {
          path: 'buyerOptionConfig',
          name: 'buyerOptionConfig',
          component: resolve => require(['@/views/buyerOptionConfig/optionConfig/index'], resolve)
        },
        {
          path: 'auctionManagement',
          name: 'auctionManagement',
          component: resolve => require(['@/views/auctionManagement/index'], resolve),
          children: [{
            path: 'configMana',
            name: 'configMana',
            component: resolve => require(['@/views/auctionManagement/configMana/index'], resolve),
            redirect: '/auctionManagement/configMana/fieldMana',
            children: [{
              path: 'fieldMana',
              name: 'fieldMana',
              component: resolve => require(['@/views/auctionManagement/configMana/fieldMana/index'], resolve),
            }, {
              path: 'categoricalMana',
              name: 'categoricalMana',
              component: resolve => require(['@/views/auctionManagement/configMana/categoricalMana/index'], resolve),
            }, {
              path: 'goodsMana',
              name: 'goodsMana',
              component: resolve => require(['@/views/auctionManagement/configMana/goodsMana/index'], resolve),
            }, {
              path: 'supportMana',
              name: 'supportMana',
              component: resolve => require(['@/views/auctionManagement/configMana/supportMana/index'], resolve),
            }]
          },
          {
            path: 'auctionMana',
            name: 'auctionMana',
            component: resolve => require(['@/views/auctionManagement/auctionMana/index'], resolve),
            redirect: '/auctionManagement/auctionMana/auctionList',
            children:[{
              path: 'auctionList',
              name: 'auctionList',
              component: resolve => require(['@/views/auctionManagement/auctionMana/list/index'], resolve)
            },{
              path: 'auctionAdd',
              name: 'auctionAdd',
              component: resolve => require(['@/views/auctionManagement/auctionMana/add/index'], resolve)
            },
            {
              path: 'auctionDetail/:id',
              name: 'auctionDetail',
              component: resolve => require(['@/views/auctionManagement/auctionMana/detail/index'], resolve)
            },
            {
              path: 'auctionEdit/:id',
              name: 'auctionEdit',
              component: resolve => require(['@/views/auctionManagement/auctionMana/edit/index'], resolve)
            },
            {
              path: 'auctionCopy/:id',
              name: 'auctionCopy',
              component: resolve => require(['@/views/auctionManagement/auctionMana/copy/index'], resolve)
            }]
          }
          ]
        },
        {
          path: 'capitalManagement',
          name: 'capitalManagement',
          component: resolve => require(['@/views/capitalManagement/index'], resolve),
          children: [{
            path: 'extractMana',
            name: 'extractMana',
            component: resolve => require(['@/views/capitalManagement/extractMana/index'], resolve),
            redirect: '/capitalManagement/extractMana/dealMana',
            children: [{
              path: 'dealMana',
              name: 'dealMana',
              component: resolve => require(['@/views/capitalManagement/extractMana/deal/index'], resolve)
            }, {
              path: 'applyMana',
              name: 'applyMana',
              component: resolve => require(['@/views/capitalManagement/extractMana/apply/index'], resolve),
            }]
          },{
            path: 'capitalAccount',
            name: 'capitalAccount',
            component: resolve => require(['@/views/capitalManagement/capitalAccount/index'], resolve)
          },{
            path:'transactionMana',
            name: 'transactionMana',
            component: resolve => require(['@/views/capitalManagement/transactionMana/index'], resolve),
            redirect: '/capitalManagement/transactionMana/refundMana',
            children:[{
              path: 'refundMana',
              name: 'refundMana',
              component: resolve => require(['@/views/capitalManagement/transactionMana/refund/index'], resolve)
            },{
              path: 'rechargeMana',
              name: 'rechargeMana',
              component: resolve => require(['@/views/capitalManagement/transactionMana/recharge/index'], resolve)
            }]
          },{
            path: 'recharge',
            name: 'recharge',
            component: resolve => require(['@/views/capitalManagement/rechargeMana/index'], resolve)
          }
         ]
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
      return {
        x: 0,
        y: 0
      }
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
            query: {
              redirect: to.fullPath
            }
          })
        }
      })
    }
  }
})

router.afterEach((to, from, next) => {

});

export default router;
