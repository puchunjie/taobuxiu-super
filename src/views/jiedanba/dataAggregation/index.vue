<template>
  <div class="data-container">
    <screenHead @date-change="filterData">平台日常求购报价数据</screenHead>
    <div class="allData clearfix">
      <div class="item">
        <p>求购量</p>
        <h3>{{ allData.ironBuyTotalNum }}</h3>
      </div>
      <div class="item">
        <p>成交次数</p>
        <h3>{{ allData.ironBuyGetNum }}</h3>
      </div>
      <div class="item">
        <p>求购成交率</p>
        <h3>{{ allData.ironBuyGetRate }}%</h3>
      </div>
      <div class="item">
        <p>有效报价次数</p>
        <h3>{{ allData.ironSellValidNum }}</h3>
      </div>
      <div class="item">
        <p>错过报价次数</p>
        <h3>{{ allData.ironSellMissNum }}</h3>
      </div>
      <div class="item">
        <p>平均有效报价</p>
        <h3>{{ allData.ironSellValidAvgNum }}</h3>
      </div>
      <div class="item">
        <p>平均错过次数</p>
        <h3>{{ allData.ironSellMissAvgNum }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import screenHead from '../commonTemplate/screenHead.vue'
  export default {
    components: {
      screenHead
    },
    data() {
      return {
        apiData: {
          startTime: '',
          endTime: ''
        },
        allData: {
          ironBuyGetNum: 47,
          ironSellValidAvgNum: 0.2,
          ironSellMissAvgNum: 0.66,
          ironBuyGetRate: 9.14,
          ironSellValidNum: 107,
          ironBuyTotalNum: 514,
          ironSellMissNum: 344,
          ironSellAvgNum: 0.86
        }
      }
    },
    methods: {
      getData() {
        this.$http.get(this.api.jd_totalData, {
          params:this.apiData
        }).then(res => {
          if(res.code === 1000){
            this.allData.ironBuyGetNum = res.data.ironBuyGetNum;
            this.allData.ironBuyGetRate = res.data.ironBuyGetRate;
            this.allData.ironBuyTotalNum = res.data.ironBuyTotalNum;
            this.allData.ironSellAvgNum = res.data.ironSellAvgNum;
            this.allData.ironSellMissAvgNum = res.data.ironSellMissAvgNum;
            this.allData.ironSellMissNum = res.data.ironSellMissNum;
            this.allData.ironSellValidAvgNum = res.data.ironSellValidAvgNum;
            this.allData.ironSellValidNum = res.data.ironSellValidNum;
          }
        })
      },
      filterData(data){
        this.apiData.startTime = data.startTime;
        this.apiData.endTime = data.endTime;
        this.getData();
      }
    },
    created() {
      this.getData();
    }
  }
</script>


<style lang="less" scoped>
  .data-container {
    width: 100%;
    background-color: #fff;
    .allData {
      width: 100%;
      padding: 10px 0;
      .item {
        width: calc(~"100%/7");
        height: 88px;
        float: left;
        border-right: 1px solid #ddd;
        p {
          color: #868E9A;
          margin: 10px 0;
          text-indent: 10px;
        }
        h3 {
          font-size: 24px;
          color: #535B68;
          text-indent: 15px;
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
</style>
