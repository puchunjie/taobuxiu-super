<template>
  <div>
      <storehouse title="仓库" :getListApi="api.getHouse" :addApi="api.saveStoreHouse" :updateApi="api.updateStoreHouse" :deleteApi="api.deleteStoreHouse">
        </storehouse>
        <discount title="优惠信息模板" :getListApi="api.findProInfoPage" :addApi="api.saveProInfoModel" :updateApi="api.updateProInfoModel" :deleteApi="api.deleteProInfoModel">
        </discount>
        <kpTime title="开平时间选项" :getListApi="api.findKaipingModelPage" :saveAndUpdateApi="api.saveAndUpdateKaipingModel" :deleteApi="api.deleteKaipingModel"></kpTime>
  </div>
</template>

<script>
    import storehouse from './storehouse.vue'
    import discount from './discount.vue'
    import kpTime from './kpTime.vue'
    export default {
        components: {
            storehouse,
            discount,
            kpTime
        }
    }
</script>
