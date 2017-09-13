<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    watch: {
  
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
  
  .layout .ivu-menu-item-group-title {
    color: #000!important;
    font-weight: bold!important;
  }
  
  .spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>



