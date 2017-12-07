<template>
<div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title" class="title">电子合同认证信息管理</span></p>
      <Form :mode="filterData" :label-width="100" inline style="margin-top:24px;">
          <FormItem label="是否认证：">
            <Select v-model="filterData.status" @on-change="onFilter" placeholder="请选择" style="width:150px">
                <Option v-for="item in status" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商户名称：">
            <Input type="text" v-model="filterData.userName" @on-blur="onFilter" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="认证联系方式：">
            <Input type="text" v-model="filterData.cellNum" @on-blur="onFilter" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="用户类型：">
            <Select v-model="filterData.userType" @on-change="onFilter" placeholder="请选择" style="width:150px">
                <Option v-for="item in userType" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="认证时间：">
              <DatePicker type="daterange" :clearable="false" @on-change="onFilter" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
          </FormItem>
          <FormItem label="认证证件类型：">
            <Select v-model="filterData.certifyType" @on-change="onFilter" placeholder="请选择" style="width:150px">
                <Option v-for="item in certifyType" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="认证证件号：">
            <Input type="text" v-model="filterData.certifyNumber" @on-blur="onFilter" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem>
              <Button type="warning" @click.native="resetFilter">清除</Button>
          </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="table-contnet">
            <Row class-name="head">
                <Col class-name="col" span="4">商户名称</Col>
                <Col class-name="col" span="3">联系方式</Col>
                <Col class-name="col" span="4">用户类型</Col>
                <Col class-name="col" span="4">认证证件类型</Col>
                <Col class-name="col" span="4">认证证件号</Col>
                <Col class-name="col" span="3">认证时间</Col>
                <Col class-name="col" span="2">操作</Col>
            </Row>
            <Row v-for="(item,index) in list" :key="item.appUserId">
                <Col class-name="col" span="4">{{item.userName}}</Col>
                <Col class-name="col" span="3">{{item.cellNum}}</Col>
                <Col class-name="col" span="4">{{item.userType | userTypeStu}}</Col>
                <Col class-name="col" span="4">{{item.certifyType | certifyTypeStu}}</Col>
                <Col class-name="col" span="4">{{item.certifyNumber}}</Col>
                <Col class-name="col" span="3">{{item.updateTime}}</Col>
                <Col class-name="col" span="2">
                  <template v-if="item.status == 1">
                    <Button type="warning" size="small" @click="openModel(true,item)">修改</Button>
                  </template>
                  <template v-else>
                    <Button type="error" size="small" @click="openModel(false,item)">认证</Button>
                  </template>
                </Col>
            </Row>
            <Row v-if="list.length == 0">
                <Col class-name="col" span="24">暂无数据</Col>
            </Row>
          </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="filterData.currentPage" :page-size="filterData.pageSize" @on-change="changePage"></Page>
      </div>
      </Card>
      <Modal v-model="show" :title="isEdit ? '电子合同平台用户信息认证' : '电子合同平台用户信息修改'" :closable="false" :mask-closable="false">
      <Form :label-width="120" :ref="ref" :model="itemApi" :rules="rules">
          <FormItem label="商户名称：" prop="userName">
            <Input type="text" v-model="itemApi.userName" :disabled="true" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="认证联系方式：" prop="cellNum">
            <Input type="text" v-model="itemApi.cellNum" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="用户类型：" prop="userType" >
            <Select v-model="itemApi.userType" placeholder="请选择" :disabled="isEdit">
                <Option v-for="item in userType" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="认证证件类型：" prop="certifyType">
            <Select v-model="itemApi.certifyType" placeholder="请选择" :disabled="isEdit">
                <Option v-for="item in certifyType" :key="item.id" :value="item.id" >{{ item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="认证证件号：" prop="certifyNumber">
            <Input type="text" v-model="itemApi.certifyNumber" :disabled="isEdit" placeholder="请输入..."></Input>
          </FormItem>
      </Form>
      <div slot="footer">
          <Button @click="show = false">取消</Button>
          <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '修改' : '认证' }}</Button>
      </div>
    </Modal>
</div>
</template>

<script>
export default {
  data () {
    return {
      ref: 'from' + new Date().getTime(),
      isEdit: false,
      show: false,
      editItem: {},
      itemApi: {
        appUserId: '',
        cellNum: '',
        userType: '',
        userName: '',
        certifyType: '',
        certifyNumber: ''
      },
      editApi: {
        appUserId: '',
        cellNum: '',
        id: ''
      },
      rules: {
        userName: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        cellNum: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        userType: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        certifyType: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        certifyNumber: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]

      },
      filterData: {
        status: '',
        userName: '',
        cellNum: '',
        certifyNumber: '',
        userType: '',
        startTime: '',
        endTime: '',
        certifyType: '',
        certifyNumber: '',
        currentPage: 1,
        pageSize: 10
      },
      status: [{
        name: '是',
        id: 1
      },{
        name: '不是',
        id: 0
      }],
      userType: [{
        name: '个人',
        id: '1'
      },{
        name: '企业',
        id: '2'
      },{
        name: '平台自身',
        id: '4'
      }],
      certifyType: [{
        name: '身份证',
        id: '1'
      },{
        name: '护照',
        id: '2'
      },{
        name: '军官证',
        id: '3'
      },{
        name: '营业执照',
        id: '4'
      },{
        name: '组织机构代码证',
        id: '5'
      },{
        name: '社会统一信用代码',
        id: '6'
      }],
      dateValue: ['', ''],
      dateOption: {
          shortcuts: [{
                  text: '最近一周',
                  value() {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      return [start, end];
                  }
              },
              {
                  text: '最近一个月',
                  value() {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      return [start, end];
                  }
              },
              {
                  text: '最近三个月',
                  value() {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      return [start, end];
                  }
              }
          ],
      },
      list: [],
      totalCount: 0,
      loading: false
    }
  },
  computed: {
    handleData() {
      return {
        status: this.filterData.status,
        userName: this.filterData.userName,
        cellNum: this.filterData.cellNum,
        certifyNumber: this.filterData.certifyNumber,
        userType: this.filterData.userType,
        certifyType: this.filterData.certifyType,
        startTime: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
        endTime: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
        certifyNumber: this.filterData.certifyNumber,
        currentPage: this.filterData.currentPage,
        pageSize: this.filterData.pageSize
      }
    }
  },
  watch: {
    handleData: _.debounce(function(val) {
        this.getAllList(val)
    }, 200)
  },
  methods: {
    resetFilter() {
      this.filterData = {
        status: '',
        userName: '',
        cellNum: '',
        certifyNumber: '',
        userType: '',
        certifyType: '',
        startTime: '',
        endTime: '',
        certifyNumber: '',
        currentPage: 1,
        pageSize: 10
      }
      this.dateValue= ['',''];
      this.getAllList(this.handleData);
    },
    //  筛选
    onFilter() {
      this.filterData.currentPage = 1
      this.getAllList(this.handleData);
    },
    //  分页
    changePage(page) {
      this.filterData.currentPage = page;
      this.getAllList(this.handleData);
    },
    //  获取列表
    getAllList(val) {
      this.$http.post(this.api.queryCheckContractPage,this.handleData).then(res => {
        if(res.code === 1000){
          this.list = res.data.list
          this.totalCount = res.data.totalCount
        }
      });
    },
    //  修改、认证Model
    openModel(isEdit,data) {
      this.isEdit = isEdit;
      if(isEdit) {
        this.editItem = data || {};
        this.itemApi = {
          appUserId: data.appUserId,
          cellNum: data.cellNum,
          userType: data.userType,
          userName: data.userName,
          certifyType: data.certifyType,
          certifyNumber: data.certifyNumber
        }
        this.editApi = {
          appUserId: data.appUserId,
          cellNum: this.itemApi.cellNum,
          id: data.id
        }
      }else{
        this.itemApi = {
          appUserId: data.appUserId,
          cellNum: '',
          userType: '',
          userName: data.userName,
          certifyType: '',
          certifyNumber: ''
        }
      }
      this.show = true;
    },
    //  认证、修改保持表单
    handleSubmit() {
      this.$refs[this.ref].validate((valid) => {
        if(valid){
          this.loading = true;
          let params;
          if(this.isEdit){
            params = JSON.parse(JSON.stringify(this.editApi))
            params.cellNum = this.itemApi.cellNum;
          }else{
            params = JSON.parse(JSON.stringify(this.itemApi));
          }
          let apiUrl = this.isEdit ? this.api.updateCheckContract : this.api.saveCheckContract
          this.$http.post(apiUrl,params).then(res => {
            if(res.code === 1000){
              this.show = false;
              this.getAllList(this.handleData);
              this.$Message.success('操作成功')
            }else{
              // this.$Message.error(res.message)
              this.$Modal.error({
                title: '错误提示',
                content: res.message
              })
            }
            this.loading = false
          })
        }else{
          this.$Message.error('表单验证失败')
        }
      })
    }
  },
  created () {
    this.getAllList(this.handleData);
  }
}
</script>

<style lang="less" scoped>
.card {
    position: relative;
    margin-bottom: 20px;
    padding-bottom: 40px;
    .title{
      span{
        font-size: 12px;
      }
    }
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
        bottom: 10px;
    }
} 
</style>
