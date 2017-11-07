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
        this.$http.post(this.api.hasJV).then(res => {
          if (res.code === 1000) {
            if (!res.data) {
              this.$Modal.error({
                content: '操作权限不够，请充值！',
                onOk:()=>{
                  this.$router.replace({
                    path: '/'
                  })
                }
              })
            }
          }
        })
      }
    },
    created() {
      this.hasJV();
    }
  }
</script>

