<template>
  <div class="home-ad">
    <adTemplate title="左悬浮" position="1" :values="list[0]"></adTemplate>
    <adTemplate title="右悬浮" position="2" :values="list[1]"></adTemplate>
    <adTemplate title="底部收起" position="3" :values="list[2]"></adTemplate>
    <adTemplate title="底部展开" position="4" :values="list[3]"></adTemplate>
  </div>
</template>

<script>
import adTemplate from './adTemplate'
  export default {
    components: {
      adTemplate
    },
    data() {
      return {
        list:[]
      }
    },
    methods: {
      getData(){
        this.$http.post(this.api.getHomeAdv).then(res =>{
          if(res.code === 1000){
            this.list = res.data;
          }
        })
      }
    },
    created () {
      this.getData();
    }
  }
</script>

<style lang='less' scoped>
  
</style>