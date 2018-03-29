export default [{
        name: '业务管理',
        icon: 'icon-maijiaqiugou',
        children: [{
                name: '现货求购管理',
                router: { name: 'ironBuys' }
            },
            {
                name: '代客发布求购',
                router: { name: 'valetIron' }
            },
            {
                name: '质检申请管理',
                router: { name: 'quality' }
            }
        ]
    },{
        name: '资源管理',
        icon: 'icon-ziyuan',
        children: [{
            name: '现货资源管理',
            router: {name: 'stockResources'}
        },{
            name: '定开计划管理',
            router: {name: 'dkplan'}
        },{
            name: '特价资源管理',
            router: {name: 'specialOffer'}
        }]
    },{
        name: '订单管理',
        icon: 'icon-dingdan',
        children: [{
            name: '现货订单管理',
            router: {name: 'stockOrder'}
        },{
            name: '定开订单管理',
            router: {name: 'planOrder'}
        },{
            name: '特价订单管理',
            router: {name: 'specialOrder'}
        }]
    },{
        name: '合同管理',
        icon: 'icon-hetong',
        children: [{
            name: '合同起草',
            router: {name: 'draft'}
        },{
            name: '合同列表管理',
            router: {name: 'authList'}
        },{
            name: '合同认证信息管理',
            router: {name: 'authentication'}
        },{
            name: '合同信息配置',
            router: {name: 'infoConfig'}
        }]
    },{
        name: '物流管理',
        icon: 'icon-wuliu1',
        children:[{
            name: '物流需求管理',
            router: {name: 'logGoods'}
        },{
            name: '物流数据配置',
            router: {name: 'logData'}
        },{
            name: '物流货品维护',
            router: {name: 'logDemand'}
        }]
    },
    {
        name: '营销',
        icon: 'icon-guanggao',
        children: [{
            name: '网站首页广告位',
            router: { name: 'adManage' }
        }]
    },
    {
        name: '权限',
        icon: 'icon-quanxian',
        children: [{
            name: '角色配置',
            router: { name: 'jurisdiction' }
        }]
    },
    {
        name: '接口',
        icon: 'icon-jiekou',
        children: [{
            name: '接口管理',
            router: { name: 'interfaceManagement' }
        }]
    },
    {
        name: '用户管理',
        icon: 'icon-admin',
        children: [{
            name: '角色绑定',
            router: { name: 'userManagement' }
        },{
            name: '商家审核管理',
            router: {name: 'examine'}
        },{
            name: '商家用户管理',
            router: { name: 'businessManagement' }
        },{
            name: '平台专员管理',
            router: {name: 'commissioner'}
        }]
    },
    {
        name: '应用',
        icon: 'icon-yingyonghui',
        children: [{
                name: '计量单位配置',
                router: { name: 'unitManagement' }
            }, {
                name: '分类数据配置',
                router: { name: 'dataManagement' }
            }, {
                name: '关联配置管理',
                router: { name: 'relationManagement' }
            },
            {
                name: '卖家基础信息管理',
                router: { name: 'sellerBaseManagement' }
            }
        ]
    },{
        name: '买家操作参数配置',
        icon: 'icon-maijia',
        children: [{
            name: '买家操作参数配置',
            router: {name: 'buyerOptionConfig'}
        }]
    },{
        name: '新闻管理',
        icon: 'icon-xinwen',
        children: [{
            name: '新建新闻内容',
            router: {name:'addNews', params: { id: 0,type: 'add' }}
        },{
            name:'新闻内容管理',
            router: {name: 'newsList'},
            child:[{
                name: '已发布',
                router: {name: '/newsList/publish'}
            },{
                name: '草稿箱',
                router: {name: '/newsList/drafts'}
            }]
        },{
            name:'新闻中心配置',
            router: {name: 'newsConfig'}
        }]
    },
    {
        name: '文件管理',
        icon: 'icon-wenjian',
        children:[{
            name: '资源上传模板管理',
            router: { name: 'resourceType' }
        },{
            name: '资源模板下载记录',
            router: {name: 'resourceDownloadRecord'}
        }]
    },
    {
        name: '数据统计',
        icon: 'icon-shuju',
        children: [{
            name: '交易数据汇总',
            router: { name: 'dataAggregation' }
        }, {
            name: '买方排行分析',
            router: { name: 'buyerRank' }
        }, {
            name: '卖方排行分析',
            router: { name: 'sellerRank' }
        }, {
            name: '热门地区分析',
            router: { name: 'regionalRank' }
        }, {
            name: '货品数据分析',
            router: { name: 'ironsRank' }
        },{
            name: '订单数据统计分析',
            router: {name: 'orderCountManagement'},
            child:[{
                name: '订单统计',
                router: {name: '/orderCountManagement/orderCount'}
            },{
                name: '买家统计',
                router: {name: '/orderCountManagement/buyerCount'}
            },{
                name: '卖家统计',
                router: {name: '/orderCountManagement/sellerCount'}
            },{
                name: '地区统计',
                router: {name: '/orderCountManagement/areaCount'}
            },{
                name: '货品统计',
                router: {name: '/orderCountManagement/goodsCount'}
            }]
        }]
    },
    {
        name: '系统配置',
        icon: 'icon-config',
        children:[{
            name: '资源刷新机制配置',
            router: {name: 'resourceRefresh'},
            child:[{
                name: '类型管理',
                router: {name: '/resourceRefresh/type'},
            },{
                name: '等级管理',
                router: {name: '/resourceRefresh/rank'},
            },{
                name: '规则管理',
                router: {name: '/resourceRefresh/rules'},
            },{
                name: '规则配置',
                router: {name: '/resourceRefresh/rulesConfig'},
            }]
        },{
            name: '资源开放时间配置',
            router: {name: 'resourceOpenTime'}
        },{
            name: '基础数据排序配置',
            router: {name: 'baseDataSort'}
        },{
            name: '资源类型配置',
            router: {name: 'resourceTypeConfig'}
        }]
    }
]