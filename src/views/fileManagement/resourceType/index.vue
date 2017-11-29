<template>
  <div>
      <resourceManagement title="资源类型" :getListApi="api.queryQualiticationtypePage" :addApi="api.saveQualiticationType" :updateApi="api.updateQualiticationType" :deleteApi="api.deleteQualiticationType"></resourceManagement>
      <uploadTemplete title="资源类型" :getTypeApi="api.queryQualiticationtypePage" :getListApi = "api.queryQualiticationmodelPage" :addApi="api.saveQualiticationModel" :updateApi = "api.updateQualiticationModel" :uploadApi = "api.uploadExcelApi" :deleteApi="api.deleteQualificationModel" :downloadApi = "api.updateDownLodeCount"></uploadTemplete>
  </div>
</template>
<script>
import resourceManagement from './resourceManagement.vue'
import uploadTemplete from './uploadTemplet.vue'
export default {
    components: {
        resourceManagement,
        uploadTemplete
    }
  
}
</script>
<style lang="less" scoped>

</style>


