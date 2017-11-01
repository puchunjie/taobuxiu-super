<template>
  <div class="offerList">
      <template  v-if="list.length>1">
          <div  v-show="index>0" class="offerItem" v-for="(item,index) in list" :key="index">
              <p>{{index}}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.offerPerPrice }}元/{{ item.baseUnit }} - {{ item.tolerance }} - {{ item.offerPlaces }} - {{ item.createTime | dateformat }} - {{item.offerRemark}} - {{ item.offerStatus | offerStr }}</p>
          </div>
      </template>
      <p v-else style="text-align:center">暂无多条报价</p>
  </div>
</template>

<script>
    export default {
        props: {
            list: Array
        }
    };
</script>