<template>
  <div>
    <storehouse title="仓库"></storehouse>
    <discount title="优惠信息模板"></discount>
    <kpTime title="开平时间选项"></kpTime>
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
