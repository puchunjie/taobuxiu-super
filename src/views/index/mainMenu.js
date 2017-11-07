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
        name: '特价',
        icon: 'icon-xianshitejia',
        children: [{
            name: '特价资源管理',
            router: { name: 'special' }
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
        }, {
            name: '商家用户管理',
            router: { name: 'businessManagement' }
        },{
            name: '平台专员管理',
            router: {name: 'commissioner'}
        }]
    },
    {
        name: '应用',
        icon: 'icon-admin',
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
    },
    {
        name: '数据统计',
        icon: 'icon-admin',
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
        }]
    }
]