<template>
  <div>
    <commonTemplate :tableHead="filterColums" :tableBody="filterList" @date-pick="filterData">
      <RadioGroup v-model="apiData.type" type="button" @on-change="getData" style="position: relative;top:-5px;">
        <Radio v-for="btn in btns" :key="btn.value" :label="btn.value">{{ btn.name }}</Radio>
      </RadioGroup>
    </commonTemplate>
    <Page style="margin-top:10px;float:right" :total="totalCount" @on-change="pageChange" show-total :current="apiData.currentPage" :page-size="apiData.pageSize"></Page>
  </div>
</template>

<script>
  import commonTemplate from '../commonTemplate/index.vue'
  export default {
    components: {
      commonTemplate
    },
    data() {
      return {
        btns: [{
          name: '品类',
          value: 1
        }, {
          name: '材质',
          value: 2
        }, {
          name: '表面',
          value: 3
        }, {
          name: '产地',
          value: 4
        }],
        apiData: {
          type: 1, //1 品类 2材料 3表面 4产地
          startTime: '',
          endTime: '',
          currentPage: 1,
          pageSize: 20,
          sort: 0
        },
        totalCount: 0,
        list: [],
        columns: [{
          title: '品类',
          key: 'typeName',
          ellipsis: true
        }, {
          title: '求购量',
          key: 'ironBuyTotalNum',
          className: 'red',
          sortable: true
        }, {
          title: '响应次数',
          key: 'ironSellTotalNum'
        }, {
          title: '有效报价',
          key: 'ironSellValidNum'
        }, {
          title: '错过报价',
          key: 'ironSellMissNum',
          ellipsis: true
        }, {
          title: '平均有效响应',
          key: 'ironSellAvgNum'
        }, {
          title: '总成交次数',
          key: 'ironBuyGetNum',
          ellipsis: true
        }, {
          title: '总成交率',
          key: 'ironBuyGetRate',
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
            if (_.isArray(el[el2.key])) {
              item[el2.key] = el[el2.key].join();
            } else {
              let isRate = el2.key.indexOf('Rate') >= 0;
              item[el2.key] = isRate ? el[el2.key] + '%' : el[el2.key];
            }
          });
          arr.push(item)
        });
        return arr
      },
      filterColums() {
        let columns = this.$clearData(this.columns);
        columns[0].title = this.btns[this.apiData.type - 1].name;
        return columns
      }
    },
    methods: {
      getData() {
        this.$http.get(this.api.jd_ironsRank, {
          params: this.apiData
        }).then(res => {
          if (res.code === 1000) {
            this.list = res.data.result;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      filterData(data) {
        this.apiData.startTime = data.startTime;
        this.apiData.endTime = data.endTime;
        this.getData();
      },
      pageChange(page){
        this.apiData.currentPage = page;
        this.getData();
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style lang="less" scoped>
  
</style>

