<template>
  <div class="router-wrap">
    <navBar :navData="routerTabs"></navBar>
    <div class="router-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import navBar from '@/components/basics/nav/index'
  export default {
    components: {
      navBar
    },
    data() {
      return {
        routerTabs: [{
          name: '类型管理',
          pathName: 'type',
        }, {
          name: '等级管理',
          pathName: 'rank',
        }, {
          name: '规则管理',
          pathName: 'rules',
        }, {
          name: '规则配置',
          pathName: 'rulesConfig',
        }],
      }
    }
  }
</script>

