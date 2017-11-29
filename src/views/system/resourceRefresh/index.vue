<template>
  <div>
    <refreshType title="资源刷新机制_类型" :addApi="api.saveStoreQualiticationType" :deleteApi = "api.deleteStoreQualiticationType" :getApi="api.storequaliticationtypePage" :updateApi="api.updateStoreQualiticationType"></refreshType>
    <refreshRank title="资源刷新机制_等级" :addApi="api.saveStoreQualiticationLevel" :deleteApi = "api.deleteStoreQualiticationLevel" :getApi="api.storequaliticationlevelPage" :updateApi="api.updateStoreQualiticationLevel"></refreshRank>
    <refreshRules title="资源刷新机制_规则" :addApi="api.saveStoreRuleType" :deleteApi = "api.deleteStoreRuleType" :getApi="api.storeruletypePage" :updateApi="api.updateStoreRuleType"></refreshRules>
    <refreshRulesConfig title="资源刷新机制_规则" :getApi="api.selectStoreRolesConfigurationPage"></refreshRulesConfig>
  </div>
</template>
<script>
import refreshType from './refreshType/index.vue'
import refreshRank from './refreshRank/index.vue'
import refreshRules from './refreshRulesManagement/index.vue'
import refreshRulesConfig from './refreshRulesConfig/index.vue'
export default {
  components: {
    refreshType,
    refreshRank,
    refreshRules,
    refreshRulesConfig
  }
}
</script>
<style lang="less" scoped>

</style>
