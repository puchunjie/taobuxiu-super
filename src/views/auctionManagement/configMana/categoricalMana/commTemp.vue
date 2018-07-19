<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">{{ `${title}数据管理` }}</p>
      <Button slot="extra" size="small" type="success" @click="openModel(false)">{{ `${title}数据添加` }}</Button>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="10">{{ `${title}名称` }}</Col>
            <Col class-name="col" span="5">{{ `${title}备注` }}</Col>
            <Col class-name="col" span="5">{{ `${title}排序` }}</Col>
            <Col class-name="col" span="4">操作</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="item.id">
            <Col class-name="col" span="10">{{ item.name }}</Col>
            <Col class-name="col" span="5">{{ item.remark | isEmpty('-')}}</Col>
            <Col class-name="col" span="5">{{ item.sortIndex }}</Col>
            <Col class-name="col" span="4">
            <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
            <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" :page-size="apiData.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" :title="isEdit?`编辑${title}数据`:`添加${title}数据`" :closable="false" :mask-closable="false">
      <Form :label-width="80" :ref="ref" :model="itemApi" :rules="rules">
        <FormItem :label="`${title}名称`" prop="name">
          <Select v-model="itemApi.name" >
            <Option v-for="(item,i) in selected" :value="item.name" :key="i">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${title}排序`" prop="sortIndex">
          <InputNumber :max="99999" :min="1" v-model="itemApi.sortIndex" style="width: 100%;"></InputNumber>
        </FormItem>
        <FormItem :label="`${title}备注`">
          <Input type="text" v-model="itemApi.remark" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="close">取消</Button>
        <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      getListApi: String,
      addApi: String,
      updateApi: String,
      delApi: String,
      getOptionData: String
    },
    data() {
      return {
        ref: 'form' + new Date().getTime(),
        show: false,
        isEdit: false,
        loading: false,
        editItem: {},
        apiData: {
          currentPage: 1,
          pageSize: 10
        },
        itemApi: {
          name: '',
          sortIndex: 0,
          remark: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请选择名称',
            trigger: 'change'
          }],
          sortIndex: [{
            required: true,
            type: 'number',
            message: '排序不能为空',
            trigger: 'blur'
          }]
        },
        totalCount: 0,
        list: [],
        selected: []
      }
    },
    methods: {
      // 获取数据列表
      getList() {
        this.$http.post(this.getListApi, this.apiData).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      getData() {
        this.$http.post(this.getOptionData, {
          name: ''
        }).then(res => {
          if (res.code === 1000) {
            this.selected = res.data;
          }
        })
      },
      changePage(page) {
        this.apiData.currentPage = page;
        this.getList();
      },
      close(){
        this.show = false;
        this.$refs[this.ref].resetFields();
      },
      // 打开面板
      openModel(isEdit, item) {
        this.isEdit = isEdit;
        if (isEdit) {
          this.editItem = item || {};
          this.itemApi = {
            name: item.name,
            sortIndex: item.sortIndex != '' ? item.sortIndex : 0,
            remark: item.remark
          }
        } else {
          this.itemApi = {
            name: '',
            sortIndex: 0,
            remark: ''
          }
        }
        this.show = true;
      },
      // 删除
      deleteItem(item) {
        this.$Modal.confirm({
          title: ' 删除提示！',
          content: '删除后无法撤销，是否继续？',
          onOk: () => {
            let params = {
              id: item.id,
            }
            this.$http.post(this.delApi, params).then(res => {
              if (res.code === 1000) {
                this.getList();
                this.$Message.success('删除成功！');
              } else {
                this.$Message.error('删除失败！');
              }
            })
          }
        })
      },
      // 提交表单添加、编辑
      handleSubmit() {
        this.$refs[this.ref].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.itemApi));
            if (this.isEdit) {
              params.id = this.editItem.id;
            }
            let apiUrl = this.isEdit ? this.updateApi : this.addApi
            this.$http.post(apiUrl, params).then(res => {
              if (res.code === 1000) {
                this.getList();
                this.$Message.success('操作成功！');
                this.show = false;
                this.$refs[this.ref].resetFields();
              } else {
                this.$Message.error(res.message);
              }
              this.loading = false;
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
    },
    created() {
      this.getList();
      this.getData();
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
        border-right: 1px solid #d0d0d0;
        border-bottom: 1px solid #d0d0d0;
      }
    }
    .page-count {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
</style>