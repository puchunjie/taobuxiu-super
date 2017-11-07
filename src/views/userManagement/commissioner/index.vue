<template>
    <div> 
        <commManagement :getListApi="api.getSalemanBind"></commManagement>
        <commBind :getBindApi="api.findCompangWithSaleman" :findSaleman="api.findSalemanInfos" :savaBindApi="api.updateSalemanInfo"></commBind>
    </div>
</template>
<script>
import commManagement from './commManagement.vue';
import commBind from './commBind.vue'
export default {
   components: {
       commManagement,
       commBind
   }
}
</script>
<<style lang="less" scoped>
.comm-container{
    width: 100%;
    background-color: #fff;
    position: relative;
    padding: 10px;
}
</style>





