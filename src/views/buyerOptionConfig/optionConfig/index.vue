<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">配置订单有效确认时间选项</p>
      <div>dsfsfd</div>
    </Card>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.card {
    position: relative;
    margin-bottom: 20px;
    .card-contnet {
        position: relative;
        padding-bottom: 40px;
    }
    .table-contnet {
        line-height: 40px;
        text-align: center;
        border-top: 1px solid #d0d0d0;
        border-left: 1px solid #d0d0d0;
        .head {
            background-color: #ddd;
        }
        .col {
            height: 40px;
            padding: 0 5px;
            border-right: 1px solid #d0d0d0;
            border-bottom: 1px solid #d0d0d0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .page-count {
        position: absolute;
        right: 0;
        bottom: 0;
    }
} 
</style>

