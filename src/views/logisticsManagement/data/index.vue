<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">额外需求数据配置</p>
      <Button slot="extra" size="small" type="success" @click="openModel(false)">新增额外需求</Button>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="7">额外需求内容</Col>
            <Col class-name="col" span="4">显示排序</Col>
            <Col class-name="col" span="4">额外需求备注</Col>
            <Col class-name="col" span="3">操作人</Col>
            <Col class-name="col" span="3">最近操作时间</Col>
            <Col class-name="col" span="3">操作</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="item.id">
            <Col class-name="col" span="7">{{ item.name }}</Col>
            <Col class-name="col" span="4">{{ item.orderNum}}</Col>
            <Col class-name="col" span="4">{{ item.remark | isEmpty(params ='暂无')}}</Col>
            <Col class-name="col" span="3">{{ item.updateUser}}</Col>
            <Col class-name="col" span="3">{{ item.updateTime | dateformat}}</Col>
            <Col class-name="col" span="3">
            <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
            <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="filterData.currentPage" :page-size="filterData.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
  
    <Modal v-model="show" :title="isEdit? '编辑':'添加'" :closable="false" :mask-closable="false">
      <Form :label-width="100" :ref="ref" :model="itemApi" :rules="rules">
        <FormItem label="额外需求内容" prop="name">
          <Input type="text" v-model="itemApi.name" size="small" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="显示排序">
          <Input type="text" v-model="itemApi.orderNum" size="small" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="额外需求备注">
          <Input type="text" v-model="itemApi.remark" size="small" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="show = false">取消</Button>
        <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ref: 'form' + new Date().getTime(),
        isEdit: false,
        show: false,
        loading: false,
        editItem: {},
        list: [],
        filterData: {
          currentPage: 1,
          pageSize: 10
        },
        itemApi: {
          name: '',
          orderNum: '',
          remark: '',
          status: 1
        },
        rules: {
          name: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
        totalCount: 0
      }
    },
    methods: {
      getList() {
        this.$http.post(this.api.fingLogisticsExtraDemandPage, this.filterData).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list
            this.totalCount = res.data.totalCount
          }
        })
      },
      changePage(page) {
        this.filterData.currentPage = page;
        this.getList();
      },
      openModel(isEdit, item) {
        this.isEdit = isEdit;
        if (isEdit = isEdit) {
          this.editItem = item || {};
          this.itemApi = {
            id: item.id,
            name: item.name,
            orderNum: item.orderNum,
            remark: item.remark,
          }
        } else {
          this.itemApi = {
            id: '',
            name: '',
            orderNum: '',
            remark: '',
            status: 1
          }
        }
        this.show = true;
      },
      //  新增、编辑
      handleSubmit() {
        this.$refs[this.ref].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.itemApi));
            if (this.isEdit) {
              params.id = this.editItem.id;
              params.name = this.itemApi.name;
              params.orderNum = this.itemApi.orderNum;
              params.remark = this.itemApi.remark;
            }
            let apiUrl = this.isEdit ? this.api.updateLogisticsExtraDemand : this.api.saveLogisticsExtraDemand;
            this.$http.post(apiUrl, params).then(res => {
              if (res.code === 1000) {
                this.getList();
                this.$Message.success('操作成功');
                this.show = false;
              } else {
                this.$Message.error(res.message);
              }
              this.loading = false
            })
          }
        })
      },
      //  删除
      deleteItem(item) {
        this.$Modal.confirm({
          title: '删除提示！',
          content: '删除后无法撤销，是否继续？',
          onOk: () => {
            let params = {
              id: item.id
            }
            this.$http.post(this.api.deleteLogisticsExtraDemand, params).then(res => {
              if (res.code === 1000) {
                this.getList();
                this.$Message.success('删除成功')
              }else {
                this.$message.error(res.message)
              }
            })
          }
        })
      }
  
    },
    created() {
      this.getList();
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