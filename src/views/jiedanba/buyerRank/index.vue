<template>
  <commonTemplate :tableHead="columns" :tableBody="filterList" @date-pick="filterData">
    买家大客户分析(前10名)
  </commonTemplate>
</template>

<script>
  import commonTemplate from '../commonTemplate/index.vue';
  import expandRow from './expandRow.vue';
  export default {
    components: {
      commonTemplate,
      expandRow
    },
    data() {
      return {
        list:[],
        columns: [{
            type: 'expand',
            width: 40,
            render: (h,params) =>{
              return h(expandRow,{
                props: {
                  row: params.row
                }
              })
            },
        },{
            title: '名称',
            key: 'companyName',
            ellipsis: true
          }, {
          title: '地区',
          key: 'address',
          ellipsis: true
        }, {
          title: '求购量',
          key: 'ironBuyTotalNum',
          className: 'red',
          sortable: true
        }, {
          title: '成交次数',
          key: 'ironBuyGetNum'
        }, {
          title: '成交率',
          key: 'ironBuyGetRate'
        }, {
          title: '平均有效报价',
          key: 'ironSellValidAvgNum'
        }, {
          title: '品类',
          key: 'ironType',
          ellipsis: true
        }, {
          title: '材质',
          key: 'material',
          ellipsis: true
        }, {
          title: '表面',
          key: 'surface',
          ellipsis: true
        }, {
          title: '产地',
          key: 'proPlace',
          ellipsis: true
        }]
      }
    },
    computed: {
      // 给TABLE组件用的data数据整形
      filterList() {
        let arr = [];
        this.list.forEach(el => {
          let item = {};
          this.columns.forEach(el2 => {
            if(_.isArray(el[el2.key])){
              item[el2.key] =  el[el2.key].join()
            }else{
              item[el2.key] =  el[el2.key]
            }
          });
          arr.push(item)
        });
        return arr;
      }
    },
    methods: {
      getData(params = {}){
        this.$http.get(this.api.jd_buyerRank,{
          params:params
        }).then(res => {
          if(res.code === 1000){
            this.list = res.data;
          }
        })
      },
      filterData(data){
        this.getData(data);
      }
    },
    created () {
      this.getData();
    }
  }
</script>
