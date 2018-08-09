<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">提现退款记录</p>
      <Form :mode="pageApi" :label-width="100" inline>
        <FormItem label="商户名称：">
          <Input type="text" v-model="pageApi.buserName" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="提货单号：">
          <Input type="text" v-model="pageApi.id" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="提现金额：">
          <Input type="text" v-model="pageApi.amountBegin" style="width: 60px;" placeholder="请输入..."></Input>
          <span>-</span>
          <Input type="text" v-model="pageApi.amountEnd" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="退款时间：">
          <DatePicker type="daterange" :clearable="false" v-model="dateValue2" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </FormItem>
        <FormItem label="申请时间：">
          <DatePicker type="daterange" :clearable="false" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="resetFilter">清除</Button>
        </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="total">
          <span>提现总金额: ￥{{total.refund != '' ? total.refund : 0}}</span>
          <span>退款总金额: ￥{{total.recharge != '' ? total.recharge : 0}}</span>
        </div>
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="2">提货单号</Col>
            <Col class-name="col" span="4">提现商户</Col>
            <Col class-name="col" span="3">申请时间</Col>
            <Col class-name="col" span="4">提现账户(类型|银行|账号)</Col>
            <Col class-name="col" span="2">提现金额</Col>
            <Col class-name="col" span="2">退款金额</Col>
            <Col class-name="col" span="2">审核人</Col>
            <Col class-name="col" span="3">退款时间</Col>
            <Col class-name="col" span="2">操作</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="index">
            <Col class-name="col" span="2">{{item.id}}</Col>
            <Col class-name="col" span="4">{{item.buserName}}</Col>
            <Col class-name="col" span="3">{{item.createTime | dateformat}}</Col>
            <Col class-name="col" span="4">{{item.bankCardType === '1' ? '企业':'个人'}}|{{item.toBank}}|{{item.toBankCardNo | toHidden(0,4)}}|{{item.toAccountName | toHidden(0,1)}}</Col>
            <Col class-name="col" span="2">￥{{item.amount}}</Col>
            <Col class-name="col" span="2">￥{{item.dealAmount}}</Col>
            <Col class-name="col" span="2">{{item.updateUser}}</Col>
            <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
            <Col class-name="col" span="2">
            <Button type="warning" size="small" @click="goDetail(item)">详情</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" title="提现退款详情" :closable="false" :mask-closable="false">
      <Form :label-width="100" class="modal">
        <FormItem label="提现状态：">
          {{detailItem.status | toStatus}}
        </FormItem>
        <FormItem label="申请单号：">
          {{detailItem.id}}
        </FormItem>
        <FormItem label="申请商户：">
          {{detailItem.buserName}}
        </FormItem>
        <FormItem label="申请时间：">
          {{detailItem.createTime | dateformat}}
        </FormItem>
        <FormItem label="提现金额：">
          ￥{{detailItem.amount}}
        </FormItem>
        <FormItem label="提现账户：">
          <p>{{detailItem.toAccountName}}</p>
          <p>{{detailItem.toBank}}</p>
          <p>{{detailItem.toBankCardNo}}</p>
        </FormItem>
        <FormItem label="提现备注：">
          {{detailItem.remark | isEmpty('暂无')}}
        </FormItem>
        <FormItem label="查看转账记录：">
          <Button v-if="detailItem.files !=''" type="warning" size="small" @click="previewImg(detailItem)">查看转账记录</Button>
          <span v-else>暂无</span>
        </FormItem>
        <FormItem label="审核人：">
          {{detailItem.updateUser}}
        </FormItem>
        <FormItem label="更新时间：">
          {{detailItem.updateTime | dateformat}}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="picShow" title="查看转账记录" width="700" :mask-closable="false">
      <div class="preview-img">
        <img v-for="(item,i) in files.split(',')" :src="item">
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
          timeBegin: '',
          timeEnd: '',
          amountBegin: '',
          amountEnd: '',
          id: '',
          buserName: '',
          finishTimeBegin: '',
          finishTimeEnd: ''
        },
        dateValue: ['', ''],
        dateValue2: ['', ''],
        list: [],
        totalCount: 0,
        total: {
          refund: 0,
          recharge: 0
        },
        show: false,
        detailItem: {},
        picShow: false,
        files: ''
      }
    },
    computed: {
      handleFilter() {
        return {
          currentPage: this.pageApi.currentPage,
          pageSize: this.pageApi.pageSize,
          timeBegin: this.dateValue[0] != "" ? new Date(this.dateValue[0]).getTime() : "",
          timeEnd: this.dateValue[1] != "" ? new Date(this.dateValue[1]).getTime() : "",
          amountBegin: this.pageApi.amountBegin,
          amountEnd: this.pageApi.amountEnd,
          id: this.pageApi.id,
          buserName: this.pageApi.buserName,
          finishTimeBegin: this.dateValue2[0] != "" ? new Date(this.dateValue2[0]).getTime() : "",
          finishTimeEnd: this.dateValue2[1] != "" ? new Date(this.dateValue2[1]).getTime() : ""
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
      toHidden(str, start, end) {
        return str.substr(start, start) + "..." + str.substr(str.length - end);
      },
      toStatus(val) {
        return ['待审核处理','提现成功','申请驳回','申请已撤销'][val*1]
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.api.widthDrawHistory, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount;
            this.total.refund = res.data.amount;
            this.total.recharge = res.data.dealAmount;
          }
        })
      },
      changePage(page) {
        this.pageApi.currentPage = page;
        this.getList(this.handleFilter)
      },
      resetFilter() {
        this.pageApi = {
          currentPage: 1,
          pageSize: 10,
          timeBegin: '',
          timeEnd: '',
          amountBegin: '',
          amountEnd: '',
          id: '',
          buserName: '',
          finishTimeBegin: '',
          finishTimeEnd: ''
        }
        this.dateValue = ['', ''];
        this.dateValue2 = ['', ''];
        this.getList(this.handleFilter)
      },
      goDetail(data){
        this.detailItem = Object.assign({},data);
        this.show = true;
      },
      previewImg(item){
        this.files = item.files;
        this.picShow = true;
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
  
  .total {
    padding-bottom: 20px;
    span {
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
  .modal{
    .ivu-form-item{
      margin-bottom: 5px;
    }
  }
  .preview-img{
    img{
      max-width: 100%;
    }
  }
</style>