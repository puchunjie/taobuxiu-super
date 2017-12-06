<template>
  <div class="router-wrap">
     <div class="router-nav">
      <a class="tab-item" :class="{'active':activeTab == i}" @click="goPage(i)" v-for="(tab,i) in routerTabs" :key="i">{{ tab.name }}</a>
    </div>
    <div class="router-page">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerTabs: [{
        name: '订单统计',
        pathName: 'orderCount'
      },{
        name: '买家统计',
        pathName: 'buyerCount'
      },{
        name: '卖家统计',
        pathName: 'sellerCount'
      },{
        name: '地区统计',
        pathName: 'areaCount'
      },{
        name: '货品数据',
        pathName: 'goodsCount'
      }],
      activeTab: 0
    }
  },
  computed: {
    routerPath() {
        return this.routerTabs[this.activeTab].pathName
    }
  },
  created() {
      switch (this.$route.name) {
          case 'orderCount':
              this.activeTab = 0
              break;
          case 'buyerCount':
              this.activeTab = 1
              break;
          case 'sellerCount':
              this.activeTab = 2
              break;
          case 'areaCount':
              this.activeTab = 3
              break;
          case 'goodsCount':
              this.activeTab = 4
              break;
          default:
              break;
      }
  },
  methods: {
    goPage(i) {
        this.activeTab = i;
        this.$router.push({
            name: this.routerPath
        })
    }
  }
}
</script>
<style lang="less" scoped>
.router-nav{
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 15px;
  background-color: #fff;
  height: 60px; 
  a{
    position: relative;
    display: inline-block;
    padding: 0 15px;
    line-height: 60px;
    color: #333;
    font-size: 14px;
    &.active{
      color: #2d8cf0;
      cursor: default;
      &:before{
        content: '';
        position: absolute;
        border-bottom: 2px solid #2d8cf0;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
  }
}
</style>
