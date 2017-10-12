<template>
  <div>
      <storehouse title="仓库" :getListApi="api.getHouse" :addApi="api.saveStoreHouse" :updateApi="api.updateStoreHouse" :deleteApi="api.deleteStoreHouse">
        </storehouse>
        <discount title="优惠信息模板" :getListApi="api.findProInfoPage" :addApi="api.saveProInfoModel" :updateApi="api.updateProInfoModel" :deleteApi="api.deleteProInfoModel">
        </discount>
  </div>
</template>

<script>
    import storehouse from './storehouse.vue'
    import discount from './discount.vue'
    export default {
        components: {
            storehouse,
            discount
        }
    }
</script>
