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
        name: '类型管理',
        pathName: 'type'
      },{
        name: '等级管理',
        pathName: 'rank'
      },{
        name: '规则管理',
        pathName: 'rules'
      },{
        name: '规则配置',
        pathName: 'rulesConfig'
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
          case 'type':
              this.activeTab = 0
              break;
          case 'rank':
              this.activeTab = 1
              break;
          case 'rules':
              this.activeTab = 2
              break;
          case 'rulesConfig':
              this.activeTab = 3
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
