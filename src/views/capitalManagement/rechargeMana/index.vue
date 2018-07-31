<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">充值账户管理</p>
      <Form :mode="pageApi" :label-width="100" inline>
        <FormItem label="商户名称：">
          <Input type="text" v-model="pageApi.buserName" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="充值方式：">
          <Select v-model="pageApi.rechargeWay" style="width:150px">
              <Option v-for="(item,index) in [{id: '1',label:'用户充值'},{id: '2',label:'银行转账'},{id: '3',label:'微信转账'},{id: '4',label:'支付宝转账'},{id: '5',label:'现金支付'},{id: '6',label:'其他方式'}]" :value="item.id" :key="index">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="充值金额：">
          <Input type="text" v-model="pageApi.amountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="pageApi.amountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="充值时间：">
          <DatePicker type="daterange" :clearable="false" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </FormItem>
        <FormItem label="操作人：">
          <Input type="text" v-model="pageApi.createUser" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="resetFilter">清除</Button>
        </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="total">
          <span>充值总金额: ￥{{total.recharge != '' ? total.recharge : 0}}</span>
        </div>
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="4">商户名称</Col>
            <Col class-name="col" span="4">充值方式</Col>
            <Col class-name="col" span="4">附件</Col>
            <Col class-name="col" span="4">充值金额</Col>
            <Col class-name="col" span="4">审核人</Col>
            <Col class-name="col" span="4">充值时间</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="index">
            <Col class-name="col" span="4">{{item.buserName}}</Col>
            <Col class-name="col" span="4">{{item.rechargeWay | rechargeWay}}</Col>
            <Col class-name="col" span="4">
              <Button type="warning" size="small" @click="previewsFiles(item.files)" v-if="item.files != ''">查看</Button>
              <span v-else>暂无</span>
            </Col>
            <Col class-name="col" span="4">￥{{item.amount}}</Col>
            <Col class-name="col" span="4">{{item.createUser}}</Col>
            <Col class-name="col" span="4">{{item.payTime | dateformat}}</Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" :title="`查看附件`" width="700" :closable="false" :mask-closable="false">
      <div class="previews" v-for="(item,index) in files.split(',')" :key="index">
        <img :src="item" >
      </div>
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 10,
          amountBegin: '',
          amountEnd: '',
          rechargeWay: '',
          buserName: '',
          createTimeBegin: '',
          createTimeEnd: '',
          createUser: ''
        },
        dateValue: ['', ''],
        list: [],
        totalCount: 0,
        show: false,
        files: '',
        total:{
          recharge: 0
        },
      }
    },
    computed: {
      handleFilter() {
        return {
          currentPage: this.pageApi.currentPage,
          pageSize: this.pageApi.pageSize,
          createTimeBegin: this.dateValue[0] != "" ? new Date(this.dateValue[0]).getTime() : "",
          createTimeEnd: this.dateValue[1] != "" ? new Date(this.dateValue[1]).getTime() : "",
          amountBegin: this.pageApi.amountBegin,
          amountEnd: this.pageApi.amountEnd,
          rechargeWay: this.pageApi.rechargeWay,
          buserName: this.pageApi.buserName,
          createUser: this.pageApi.createUser
        }
      }
    },
    watch: {
      handleFilter: {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage) this.pageApi.currentPage = 1;
          this.getList(this.handleFilter);
        }, 200),
        deep: true
      },
    },
    filters: {
      rechargeWay(val){
        return ['用户充值','银行转账','微信转账','支付宝转账','现金支付','其他方式'][val-1]
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.api.rechargePage, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount;
            this.total.recharge = res.data.amount
          }
        })
      },
      previewsFiles(files){
        this.show = true;
        this.files = files
      },
      changePage(page) {
        this.pageApi.currentPage = page;
        this.getList(handleFilter)
      },
      resetFilter() {
        this.pageApi = {
          currentPage: 1,
          pageSize: 10,
          amountBegin: '',
          amountEnd: '',
          rechargeWay: '',
          buserName: '',
          createTimeBegin: '',
          createTimeEnd: ''
        }
        this.dateValue = ['', ''];
        this.getList(this.handleFilter)
      }
    },
    created() {
      this.getList(this.handleFilter)
    }
  }
</script>

<style lang='less' scoped>
  .card-contnet {
    position: relative;
    padding-bottom: 40px;
    .page-count {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .total{
    padding-bottom: 20px;
    span{
      display: inline-block;
      margin-right: 20px;
    }
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
  .previews{
    img{
      max-width: 100%;
    }
  }
</style>