<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">拍品管理</p>
      <Button slot="extra" type="primary" @click="addAuction">新增拍品</Button>
      <!-- <Form :mode="pageApi" :label-width="80" inline>
        <FormItem label="商户名称：">
          <Input type="text" v-model="pageApi.buserName" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="提货单号：">
          <Input type="text" v-model="pageApi.id" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="申请时间：">
          <DatePicker type="daterange" :clearable="false" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </FormItem>
        <FormItem label="状态：">
          <Select v-model="pageApi.status" placeholder="请选择" style="width:150px" :disabled="isDeal">
                  <Option v-for="item in [{id:0,name: '待审核处理'},{id:1,name: '提现成功'},{id:2,name: '申请驳回'},{id:3,name: '申请已撤销'}]" :key="item.id" :value="item.id" >{{ item.name }}</Option>
                </Select>
        </FormItem>
        <FormItem label="提现金额：">
          <Input type="text" v-model="pageApi.amountBegin" placeholder="请输入..." style="width:80px"></Input>-
          <Input type="text" v-model="pageApi.amountEnd" placeholder="请输入..." style="width:80px"></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="resetFilter">清除</Button>
        </FormItem>
      </Form> -->
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="2">提现单号</Col>
            <Col class-name="col" span="3">提现商户</Col>
            <Col class-name="col" span="3">申请时间</Col>
            <Col class-name="col" span="4">提现账户</Col>
            <Col class-name="col" span="2">金额</Col>
            <Col class-name="col" span="2">审核人</Col>
            <Col class-name="col" span="3">更新时间</Col>
            <Col class-name="col" span="2">状态</Col>
            <Col class-name="col" span="3">操作</Col>
          </Row>
          <Row v-for="item in list" :key="item.id">
            <Col class-name="col" span="2">{{item.id}}</Col>
            <Col class-name="col" span="3">{{item.buserName}}</Col>
            <Col class-name="col" span="3">{{item.createTime | dateformat}}</Col>
            <Col class-name="col" span="4">{{item.bankCardType === '1' ? '企业':'个人'}}|{{item.toBank}}|{{item.toBankCardNo | toHidden(0,4)}}|{{item.toAccountName | toHidden(0,1)}}</Col>
            <Col class-name="col" span="2">{{item.amount}}</Col>
            <Col class-name="col" span="2">{{item.checkUser}}</Col>
            <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
            <Col class-name="col" span="2">{{item.status | toStatus}}</Col>
            <Col class-name="col" span="3">
            <Button size="small" type="warning" @click="showDetail(item)">详情</Button>
            <Button size="small" type="warning" v-if="item.status === 0" @click="dealItem(item)">处理</Button>
            <Button size="small" type="warning" v-if="item.status === 0">驳回</Button>
            <Button size="small" type="warning" v-if="item.status === 2">编辑</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
  import uploadImg from '@/components/basics/uploadBtn'
  export default {
    components: {
      uploadImg
    },
    props: {
      isDeal: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 10,
          timeBegin: "",
          timeEnd: "",
          amountBegin: "",
          amountEnd: "",
          id: "",
          status: "",
          buserName: ""
        },
        list: [],
        totalCount: 0,
        dateValue: ["", ""],
      };
    },
    computed: {
      handleFilter() {
        // return {
        //   currentPage: this.pageApi.currentPage,
        //   pageSize: this.pageApi.pageSize,
        //   timeBegin: this.dateValue[0] != "" ? new Date(this.dateValue[0]).getTime() : "",
        //   timeEnd: this.dateValue[1] != "" ? new Date(this.dateValue[1]).getTime() : "",
        //   amountBegin: this.pageApi.amountBegin,
        //   amountEnd: this.pageApi.amountEnd,
        //   id: this.pageApi.id,
        //   status: this.pageApi.status,
        //   buserName: this.pageApi.buserName
        // };
      }
    },
    watch: {
      // handleFilter: {
      //   handler: _.debounce(function(val, oldVal) {
      //     // 是否是翻页操作
      //     if (val.currentPage == oldVal.currentPage) this.pageApi.currentPage = 1;
      //     this.getList(this.handleFilter);
      //   }, 200),
      //   deep: true
      // }
    },
    filters: {
      toStatus(val) {
        switch (val * 1) {
          case 0:
            return "待审核处理";
            break;
          case 1:
            return "提现成功";
            break;
          case 2:
            return "申请驳回";
            break;
          case 3:
            return "申请已撤销";
            break;
          default:
            break;
        }
      }
    },
    methods: {
      addAuction(){
        this.$router.push('auctionAdd')
      },
      // getList(params) {
      //   this.$http.post(this.api.widthDrawPage, params).then(res => {
      //     if (res.code === 1000) {
      //       this.list = res.data.data;
      //       this.totalCount = res.data.totalCount;
      //     }
      //   });
      // },
      //  清除查询
      // resetFilter() {
      //   this.pageApi = {
      //     currentPage: 1,
      //     pageSize: 10,
      //     timeBegin: "",
      //     timeEnd: "",
      //     amountBegin: "",
      //     amountEnd: "",
      //     id: "",
      //     status: "",
      //     buserName: ""
      //   };
      //   this.dateValue = ["", ""];
      //   if (this.isDeal) {
      //     this.pageApi.status = 0;
      //   }
      //   this.getList(this.handleFilter);
      // },
      //  分页
      changePage(page) {
        this.pageSize.currentPage = page;
        this.getList(this.handleFilter);
      }
    },
    created() {
      // this.getList(this.handleFilter);
    }
  };
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
  
  .modal {
    .ivu-form-item {
      margin-bottom: 10px;
    }
  }
  

</style>