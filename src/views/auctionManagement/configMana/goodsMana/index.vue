<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">货品类型管理</p>
      <Button slot="extra" size="small" type="success" @click="openModel(false)">新增货品类型</Button>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="6">货物分类名称</Col>
            <Col class-name="col" span="3">是否打包</Col>
            <Col class-name="col" span="6">类型备注</Col>
            <Col class-name="col" span="6">类型排序</Col>
            <Col class-name="col" span="3">操作</Col>
          </Row>
          <Row v-for="item in list" :key="item.id">
            <Col class-name="col" span="6">{{item.name}}</Col>
            <Col class-name="col" span="3">{{item.pack ? '是':'否'}}</Col>
            <Col class-name="col" span="6">{{item.remark}}</Col>
            <Col class-name="col" span="6">{{item.sortIndex}}</Col>
            <Col class-name="col" span="3">
            <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
            <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" :title="isEdit?`编辑`:`新增`" :closable="false" :mask-closable="false">
      <Form :label-width="100" :ref="ref" :model="dataApi" :rules="rules">
        <FormItem label="分类名称：" prop="name">
          <Input type="text" v-model="dataApi.name" :disabled="isEdit"placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="是否打包：" prop="pack">
            <RadioGroup v-model="dataApi.pack">
              <Radio label="true"><span>是</span></Radio>
              <Radio label="false"><span>否</span></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="分类排序：" prop="sortIndex">
          <Input type="text" v-model="dataApi.sortIndex" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input type="text" v-model="dataApi.remark"  placeholder="请输入..."></Input>
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
        pageApi: {
          currentPage: 1,
          pageSize: 10
        },
        list: [],
        totalCount: 0,
        dataApi: {
          name: '',
          remark: '',
          sortIndex: '',
          pack: 'false'
        },
        isEdit: false,
        show: false,
        loading: false,
        rules: {
          name: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          sortIndex: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
        editItem: {}
      }
    },
    methods: {
      getList() {
        this.$http.post(this.api.findGoodsTypeList, this.pageApi).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      changePage(page) {
        this.pageApi.currentPage = page;
        this.getList();
      },
      openModel(isEdit, item) {
        this.isEdit = isEdit;
        if (isEdit) {
          this.editItem = item || {};
          this.dataApi = {
            name: item.name,
            remark: item.remark,
            sortIndex: item.sortIndex.toString(),
            pack: item.pack.toString()
          }
        } else {
          this.dataApi = {
            name: '',
            remark: '',
            sortIndex: '',
            pack: 'false'
          }
        }
        this.show = true;
      },
      deleteItem(data) {
        this.$Modal.confirm({
          title: '删除提示',
          content: '确认删除？',
          onOk: () => {
            let params = {
              id: data.id
            };
            this.$http.post(this.api.deleteGoodsType, params).then(res => {
              if (res.code === 1000) {
                this.getList()
                this.$Message.success('删除成功')
              } else {
                this.$Message.error('删除失败')
              }
            })
          }
        })
      },
      handleSubmit() {
        this.$refs[this.ref].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.dataApi));
            if (this.isEdit) {
              params.id = this.editItem.id;
            }
            let apiUrl = this.isEdit ? this.api.updateGoodsType : this.api.saveGoodsType;
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
          } else {
            this.$Message.error('表单验证失败');
          }
        })
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style lang='less' scoped>
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