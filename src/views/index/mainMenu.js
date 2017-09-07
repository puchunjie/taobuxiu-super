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

]