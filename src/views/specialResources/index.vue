<template>
  <div>
    <div class="filter-container">
      <div class="head">
        编号：
        <Input placeholder="请输入资源编号" style="width: 300px"></Input>
        <Button type="primary">查询</Button>
        <Button type="error">取消</Button>
      </div>
      <div class="content">
        <FilterForm></FilterForm>
      </div>
    </div>
  </div>
</template>

<script>
  import FilterForm from './filterForm.vue'
  export default {
    components: {
      FilterForm
    }
  }
</script>


<style lang="less" scoped>
  .filter-container {
    width: 100%;
    padding: 0 20px;
    background-color: #fff;
    .head {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd;
    }
    .content {
      padding: 10px;
    }
  }
</style>

