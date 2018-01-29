<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">物流货品维护</p>
      <Button slot="extra" size="small" type="success" @click="openModel(false)">新增物流需求</Button>
      <div class="card-contnet">
        <div class="table-contnet">
          <ztree :list.sync='ztreeDataSource' :func="nodeClick" :is-open='true'></ztree>
        </div>
      </div>
    </Card>
    <!-- 添加修改面板 -->
    <Modal v-model="rolePanelShow" :title="isEdit ? '编辑':'新增'">
      <Form :label-width="110" ref="roleEdit" :model="itemApi" :rules="ruleValidate">
        <FormItem label="物流需求名称：" prop="goodsName">
          <Input v-model="itemApi.goodsName" placeholder="请输入"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="addNode"><span v-if="!loading">{{ isEdit ? '编辑' : '添加' }}</span><span v-else>提交中...</span></Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import ztree from '@/components/basics/logZtree/ztree'
  export default {
    components: {
      ztree
    },
    data() {
      return {
        isEdit: false,
        ztreeDataSource: [],
        rolePanelShow: false,
        itemApi: {
          id: '',
          goodsName: '',
          parentId: ''
        },
        editItem: {},
        loading: false,
        ruleValidate: {
          goodsName: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      getAll() {
        this.$http.post(this.api.findLogisticsGoodsList).then(res => {
          if (res.code === 1000) {
            this.ztreeDataSource = res.data
          }
        })
      },
      nodeClick(m, p, d, o) {
        if (o == 1) { //  新增
          this.rolePanelShow = true;
          this.isEdit = false;
          this.itemApi = {
            id: '',
            goodsName: '',
            parentId: m.father.id
          }
        } else if (o == 2) { // 编辑
          this.rolePanelShow = true
          this.isEdit = true
          this.itemApi = {
            id: m.father.id,
            goodsName: m.father.goodsName,
            parentId: m.father.parentId
          }
        } else if (o == 3) { // 删除
          let params = {
            id: m.father.id
          }
          this.$Modal.confirm({
            title: '删除提示！',
            content: '删除后无法撤销，是否继续？',
            onOk: () => {
              this.$http.post(this.api.deleteLogisticsGoods, params).then(res => {
                if (res.code === 1000) {
                  this.$Message.success('删除成功');
                  this.getAll();
                } else {
                  this.$Message.error(res.message)
                }
              })
            }
          })
        }
      },
      openModel() {
        this.rolePanelShow = true;
        this.resetData();
      },
      //  编辑 保存
      addNode() {
        this.loading = true
        let params = this.itemApi;
        this.$http.post(this.api.saveAndUpdateLogisticsGoods, params).then(res => {
          if (res.code === 1000) {
            this.$Message.success('操作成功');
            this.getAll();
          } else {
            this.$Message.error(res.message)
          }
          this.rolePanelShow = false
          this.loading = false
        })
      },
      resetData(){
        this.itemApi = {
          id: '',
          goodsName: '',
          parentId: ''
        }
      }
    },
    created() {
      this.getAll();
    }
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