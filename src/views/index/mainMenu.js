export default [{
        name: '求购',
        icon: 'icon-maijiaqiugou',
        children: [{
                name: '现货求购管理',
                router: { name: '' }
            },
            {
                name: '加工求购管理',
                router: { name: '' }
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
        }]
    }
]