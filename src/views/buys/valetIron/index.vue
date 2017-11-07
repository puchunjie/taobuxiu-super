<style lang="less" scoped>
  .jv-container {
    width: 100%;
  }
</style>


<template>
  <div class="jv-container">
    <iframPanel></iframPanel>
  </div>
</template>

<script>
  import iframPanel from './iframPanel'
  export default {
    components: {
      iframPanel
    },
    methods: {
      hasJV() {
        this.$http.post(this.api.hasJV)
      }
    },
    created() {
      this.hasJV();
    }
  }
</script>

