<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">商户资金账户</p>
      <Form :mode="pageApi" :label-width="100" inline>
        <FormItem label="商户名称：">
          <Input type="text" v-model="pageApi.buserName" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="账户总余额：">
          <Input type="text" v-model="pageApi.totalAccountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="pageApi.totalAccountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="可用余额：">
          <Input type="text" v-model="pageApi.accountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="pageApi.accountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="提现冻结金额：">
          <Input type="text" v-model="pageApi.lockAccountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="pageApi.lockAccountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="竞拍冻结金额：">
          <Input type="text" v-model="pageApi.withDrawAccountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="pageApi.withDrawAccountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="resetFilter">清除</Button>
        </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="4">商户名称</Col>
            <Col class-name="col" span="4">商户总金额</Col>
            <Col class-name="col" span="4">可用金额</Col>
            <Col class-name="col" span="4">提现冻结金额</Col>
            <Col class-name="col" span="4">竞拍冻结金额</Col>
            <Col class-name="col" span="4">操作</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="index">
            <Col class-name="col" span="4">{{item.buserName}}</Col>
            <Col class-name="col" span="4">￥{{item.totalAccount}}</Col>
            <Col class-name="col" span="4">￥{{item.account}}</Col>
            <Col class-name="col" span="4">￥{{item.lockAccount}}</Col>
            <Col class-name="col" span="4">￥{{item.withDrawAccount}}</Col>
            <Col class-name="col" span="4">
            <Button type="warning" size="small" @click="showRecharge(item)">充值</Button>
            <Button type="warning" size="small" @click="showDetail(item)">详情</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" :title="`资金账户明细`" width="1100" :closable="false" :mask-closable="false">
      <Form :mode="logApi" :label-width="100" inline>
        <FormItem label="操作类别：">
          <Select v-model="logApi.logType" style="width:150px">
                  <Option v-for="(item,index) in ['微信充值','支付宝充值','线下充值','现金支付','其他方式','提现申请','提现成功','提现撤回','提现驳回','参与拍卖','拍卖中标','拍卖退回']" :value="item" :key="index">{{ item }}</Option>
              </Select>
        </FormItem>
        <FormItem label="提现编号：">
          <Input type="text" v-model="logApi.withDrawId" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="提现场次：">
          <Input type="text" v-model="logApi.auctionIndex" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="操作人：">
          <Input type="text" v-model="logApi.createUser" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="操作时间：">
          <DatePicker type="daterange" :clearable="false" v-model="dateValue" placement="bottom-end" placeholder="选择日期" style="width: 180px;"></DatePicker>
        </FormItem>
        <FormItem label="操作金额：">
          <Input type="text" v-model="logApi.amountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="logApi.amountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="交易流水号：">
          <Input type="text" v-model="logApi.tradeNo" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="resetLog">清除</Button>
        </FormItem>
      </Form>
      <Table border width="100%" style="margin-bottom: 40px;" :columns="tableHeader" :data="logList"></Table>
      <Page class="log-page-count" size="small" :total="logTotal" show-total :current="logApi.currentPage" :page-size="logApi.pageSize" @on-change="changeLogPage"></Page>
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="rechargeShow" title="用户充值" :closable="false" :mask-closable="false">
      <Form :label-width="110" ref="ref" :model="dataApi" :rules="rules">
        <FormItem label="充值商户名称：">
          {{activeItem.buserName}}
        </FormItem>
        <FormItem label="充值方式：" prop="rechargeWay">
          <Select v-model="dataApi.rechargeWay">
              <Option v-for="(item,index) in [{id:'1',lable: '用户充值'},{id:'2',lable: '银行转账'},{id:'3',lable: '微信转账 '},{id: '4',lable: '支付宝转账 '},{id:'5',lable: '现金支付'},{id:'6',lable: '其他方式'},]" :value="item.id" :key="index">{{ item.lable }}</Option>
            </Select>
        </FormItem>
        <FormItem label="充值凭证：" prop="files">
          <uploadFile v-model="dataApi.files"></uploadFile>
        </FormItem>
        <FormItem label="充值金额：" prop="amount">
          <Input type="text" v-model="dataApi.amount" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="确认充值金额：" prop="checkAmount">
          <Input type="text" v-model="dataApi.checkAmount" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="充值备注：">
          <Input type="text" v-model="dataApi.rechargeWayRemark" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="close('ref')">取消</Button>
        <Button type="primary" @click="handleSubmit('ref')" :loading="loading">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import uploadFile from '@/components/basics/uploadBtn'
  export default {
    components: {
      uploadFile
    },
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 10,
          buserName: '',
          totalAccountBegin: '',
          totalAccountEnd: '',
          accountBegin: '',
          accountEnd: '',
          lockAccountBegin: '',
          lockAccountEnd: '',
          withDrawAccountBegin: '',
          withDrawAccountEnd: ''
        },
        list: [],
        totalCount: 0,
        logApi: {
          currentPage: 1,
          pageSize: 10,
          buserId: '',
          withDrawId: '',
          auctionIndex: '',
          createUser: '',
          createTimeBegin: '',
          createTimeEnd: '',
          amountBegin: '',
          amountEnd: '',
          tradeNo: '',
          logType: ''
        },
        dateValue: ['', ''],
        logList: [],
        logTotal: 0,
        show: false,
        rechargeShow: false,
        dataApi: {
          amount: '',
          checkAmount: '',
          rechargeWay: '',
          rechargeWayRemark: '',
          files: '',
          remark: '',
          buserId: ''
        },
        activeItem: {},
        loading: false,
        rules: {
          rechargeWay: [{
            required: true,
            message: '请选择充值方式',
            trigger: 'change'
          }],
          files: [{
            required: true,
            message: '请上传充值凭证',
          }],
          amount: [{
            required: true,
            message: '金额不能为空',
            trigger: 'blur'
          }],
          checkAmount: [{
            required: true,
            message: '确认金额不能为空',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value != this.dataApi.amount) {
                return callback(new Error('金额输入不一致'));
              } else {
                callback();
              }
            }
          }],
        },
        tableHeader: [{
          title: '账户总余额/￥',
          key: 'totalAccount',
          width: 120
        }, {
          title: '可用余额/￥',
          key: 'account',
          width: 150
        }, {
          title: '提现冻结金额/￥',
          key: 'lockAccount',
          width: 150
        }, {
          title: '拍卖冻结金额/￥',
          key: 'withDrawAccount',
          width: 150
        }, {
          title: '操作类别',
          key: 'logDescribe',
          width: 150
        }, {
          title: '支付流水号',
          key: 'tradeNo',
          width: 150
        }, {
          title: '操作金额/￥',
          key: 'amount',
          width: 150
        }, {
          title: '提现编号',
          key: 'withDrawId',
          width: 150
        }, {
          title: '拍卖场次',
          key: 'auctionIndex',
          width: 150
        }, {
          title: '操作人',
          key: 'updateUser',
          width: 150
        }, {
          title: '备注',
          key: 'remark',
          width: 150
        }]
      }
    },
    computed: {
      handleFilter() {
        return {
          currentPage: this.pageApi.currentPage,
          pageSize: this.pageApi.pageSize,
          buserName: this.pageApi.buserName,
          totalAccountBegin: this.pageApi.totalAccountBegin,
          totalAccountEnd: this.pageApi.totalAccountEnd,
          accountBegin: this.pageApi.accountBegin,
          accountEnd: this.pageApi.accountEnd,
          lockAccountBegin: this.pageApi.lockAccountBegin,
          lockAccountEnd: this.pageApi.lockAccountEnd,
          withDrawAccountBegin: this.pageApi.withDrawAccountBegin,
          withDrawAccountEnd: this.pageApi.withDrawAccountEnd
        }
      },
      logFilter() {
        return {
          currentPage: this.logApi.currentPage,
          pageSize: this.logApi.pageSize,
          buserId: this.logApi.buserId,
          withDrawId: this.logApi.withDrawId,
          auctionIndex: this.logApi.auctionIndex,
          createUser: this.logApi.createUser,
          createTimeBegin: this.dateValue[0] != "" ? new Date(this.dateValue[0]).getTime() : "",
          createTimeEnd: this.dateValue[1] != "" ? new Date(this.dateValue[1]).getTime() : "",
          amountBegin: this.logApi.amountBegin,
          amountEnd: this.logApi.amountEnd,
          tradeNo: this.logApi.tradeNo,
          logType: this.logApi.logType
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
      logFilter: {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage) this.logApi.currentPage = 1;
          this.getLog(this.logFilter);
        }, 200),
        deep: true
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.dataApi));
            params.buserId = this.activeItem.id;
            this.$http.post(this.api.buserAccountRecharge, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handleFilter);
                this.$Message.success('操作成功！');
                this.rechargeShow = false;
                this.$refs[name].resetFields();
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
      close(name) {
        this.rechargeShow = false;
        this.$refs[name].resetFields();
      },
      getList(params) {
        this.$http.post(this.api.buserAccountPage, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount
          }
        })
      },
      changePage(page) {
        this.pageApi.currentPage = page;
        this.getList(this.handleFilter);
      },
      changeLogPage(page) {
        this.logApi.currentPage = page;
        this.getLog(this.logFilter);
      },
      resetFilter() {
        this.pageApi = {
          currentPage: 1,
          pageSize: 10,
          buserName: '',
          totalAccountBegin: '',
          totalAccountEnd: '',
          accountBegin: '',
          accountEnd: '',
          lockAccountBegin: '',
          lockAccountEnd: '',
          withDrawAccountBegin: '',
          withDrawAccountEnd: ''
        }
        this.getList(this.handleFilter)
      },
      resetLog() {
        this.logApi = {
          currentPage: 1,
          pageSize: 10,
          buserId: this.logApi.buserId,
          withDrawId: '',
          auctionIndex: '',
          createUser: '',
          createTimeBegin: '',
          createTimeEnd: '',
          amountBegin: '',
          amountEnd: '',
          tradeNo: '',
          logType: ''
        }
        this.getLog(this.logFilter)
      },
      showRecharge(data) {
        this.activeItem = Object.assign({}, data);
        this.rechargeShow = true
      },
      showDetail(data) {
        this.logApi.buserId = data.id;
        this.getLog(this.logFilter);
        this.show = true
      },
      getLog(params) {
        this.$http.post(this.api.buserAccountHistory, params).then(res => {
          if (res.code === 1000) {
            this.logList = res.data.data;
            this.logTotal = res.data.totalCount
          }
        })
      }
    },
    created() {
      this.getList(this.handleFilter);
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
  
  .log-page-count {
    position: absolute;
    right: 0;
    bottom: 70px;
  }
</style>