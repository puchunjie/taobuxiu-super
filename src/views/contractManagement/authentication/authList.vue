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
            <Input type="text" v-model="filterData.companyName" @on-blur="onFilter" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="认证联系方式：">
            <Input type="text" v-model="filterData.legalPersonMobile" @on-blur="onFilter" placeholder="请输入..."></Input>
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
                <Col class-name="col" span="3">负责人手机号码</Col>
                <Col class-name="col" span="3">用户类型</Col>
                <Col class-name="col" span="3">认证证件类型</Col>
                <Col class-name="col" span="3">认证证件号</Col>
                <Col class-name="col" span="3">认证状态</Col>
                <Col class-name="col" span="3">更新时间</Col>
                <Col class-name="col" span="2">操作</Col>
            </Row>
            <Row v-for="(item,index) in list" :key="item.appUserId">
                <Col class-name="col" span="4">{{item.companyName}}</Col>
                <Col class-name="col" span="3">{{item.legalPersonMobile}}</Col>
                <Col class-name="col" span="3">{{item.userType | userTypeStu}}</Col>
                <Col class-name="col" span="3">{{item.certifyType | certifyTypeStu}}</Col>
                <Col class-name="col" span="3">{{item.certifyNumber}}</Col>
                <Col class-name="col" span="3">{{item.status | authStatus}}</Col>
                <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
                <Col class-name="col" span="2">
                  <template v-if="item.status == '1'">
                    <Button type="warning" size="small" @click="$router.push('/authDetail-'+item.appUserId + '-'+ 3)">更改</Button>
                  </template>
                  <template v-if="item.status == '2'">
                    <Button type="warning" size="small" @click="$router.push('/authDetail-'+item.appUserId + '-'+ 1)">审核</Button>
                  </template>
                  <template v-else>
                    <Button type="warning" size="small" @click="$router.push('/authDetail-'+item.appUserId + '-'+ 2)">查看</Button>
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
</div>
</template>

<script>
export default {
  data () {
    return {
      filterData: {
        status: '',
        companyName: '',
        legalPersonMobile: '',
        userType: '',
        timeStart: '',
        timeEnd: '',
        certifyType: '',
        certifyNumber: '',
        currentPage: 1,
        pageSize: 10
      },
      status: [{
        name: '认证成功',
        id: 1
      },{
        name: '保存状态',
        id: 0
      },{
        name: '待审核',
        id: 2
      },{
        name: '认证失败',
        id: 9
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
        companyName: this.filterData.companyName,
        legalPersonMobile: this.filterData.legalPersonMobile,
        userType: this.filterData.userType,
        certifyType: this.filterData.certifyType,
        timeStart: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
        timeEnd: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
        certifyNumber: this.filterData.certifyNumber,
        currentPage: this.filterData.currentPage,
        pageSize: this.filterData.pageSize
      }
    }
  },
  watch: {
    'handleData': {
        handler: _.debounce(function(val, oldVal) {
            // 是否是翻页操作
            if(val.currentPage == oldVal.currentPage)
                this.filterData.currentPage = 1;
            this.getAllList();
        }, 200),
        deep: true
    }
  },
  methods: {
    resetFilter() {
      this.filterData = {
        status: '',
        companyName: '',
        legalPersonMobile: '',
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
        if(res.code === 1000) {
          console.log(res);
          this.list = res.data.list
          this.totalCount = res.data.totalCount
        }
      });
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
