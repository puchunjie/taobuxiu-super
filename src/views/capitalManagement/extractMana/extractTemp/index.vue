<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">{{isDeal ? '提现待处理':'提现申请管理'}}</p>
      <Form :mode="pageApi" :label-width="80" inline>
        <FormItem label="商户名称：">
          <Input type="text" v-model="pageApi.buserName" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="提现单号：">
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
      </Form>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="3">提现单号</Col>
            <Col class-name="col" span="3">提现商户</Col>
            <Col class-name="col" span="2">申请时间</Col>
            <Col class-name="col" span="4">提现账户</Col>
            <Col class-name="col" span="2">金额</Col>
            <Col class-name="col" span="2">审核人</Col>
            <Col class-name="col" span="3">更新时间</Col>
            <Col class-name="col" span="2">状态</Col>
            <Col class-name="col" span="3">操作</Col>
          </Row>
          <Row v-for="item in list" :key="item.id">
            <Col class-name="col" span="3">{{item.id}}</Col>
            <Col class-name="col" span="3">{{item.buserName}}</Col>
            <Col class-name="col" span="2">{{item.createTime | dateformat}}</Col>
            <Col class-name="col" span="4">{{item.bankCardType === '1' ? '企业':'个人'}}|{{item.toBank}}|{{item.toBankCardNo | toHidden(0,4)}}|{{item.toAccountName | toHidden(0,1)}}</Col>
            <Col class-name="col" span="2">{{item.amount}}</Col>
            <Col class-name="col" span="2">{{item.checkUser}}</Col>
            <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
            <Col class-name="col" span="2">{{item.status | toStatus}}</Col>
            <Col class-name="col" span="3">
            <Button size="small" type="warning" @click="showDetail(item)">详情</Button>
            <Button size="small" type="warning" v-if="item.status === 0" @click="dealItem(false,item)">处理</Button>
            <Button size="small" type="warning" v-if="item.status === 0" @click="rejectItem(false,item)">驳回</Button>
            <Button size="small" type="warning" v-if="item.status === 1" @click="dealItem(true,item)">编辑</Button>
            <Button size="small" type="warning" v-if="item.status === 2 " @click="rejectItem(true,item)">编辑</Button>
            </Col>
          </Row>
          <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" title="提现申请详情" :closable="false" :mask-closable="false">
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
        <FormItem label="驳回理由：" v-if="detailItem.status === 2">
          {{detailItem.rejectRemark}}
        </FormItem>
        <FormItem label="转账记录：" v-if="detailItem.status === 1">
          <Button size="small" @click="previewFiles(detailItem.files)" v-if="detailItem.files != ''">查看转账记录</Button>
          <span v-else>暂无转账记录</span>
        </FormItem>
        <FormItem label="更新人：" v-if="detailItem.status === 1 || detailItem.status === 2">
          {{detailItem.updateUser}}
        </FormItem>
        <FormItem label="更新时间：" v-if="detailItem.status === 1 || detailItem.status === 2">
          {{detailItem.updateTime | dateformat}}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="dealShow" title="提现申请详情" :closable="false" :mask-closable="false">
      <Form :label-width="100" :model="dealData" ref="dealForm" class="modal" :rules="delaRules">
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
        <FormItem label="已退金额：" prop="dealAmount">
          <Input type="text" v-model="dealData.dealAmount" :disabled="dealEdit" style="width: 200px;" placeholder="请输入..."></Input>元
        </FormItem>
        <FormItem label="转账记录：">
          <uploadImg v-model="dealData.files"></uploadImg>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="dealHidden('dealForm')">关闭</Button>
        <Button type="primary" @click="dealAction('dealForm')" :loading="loading">确定</Button>
      </div>
    </Modal>
    <Modal v-model="rejectShow" title="提现申请详情" :closable="false" :mask-closable="false">
      <Form :label-width="100" :model="rejectApi" ref="rejectForm" class="modal" :rules="rejectRules">
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
        <FormItem label="驳回理由：" prop="rejectRemark">
          <Input type="text" v-model="rejectApi.rejectRemark" style="width: 300px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="更新人：">
          {{detailItem.updateUser}}
        </FormItem>
        <FormItem label="更新时间：">
          {{detailItem.updateTime | dateformat}}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="rejectHidden('rejectForm')">关闭</Button>
        <Button type="primary" @click="rejectAction('rejectForm')" :loading="loading">确定</Button>
      </div>
    </Modal>
    <Modal v-model="prevShow" title="查看转账记录" width="800">
      <div class="previewImg">
        <div class="img-list" v-for="(item,index) in curFiles.split(',')" :key="index">
          <img :src="item">
        </div>
      </div>
      <div slot="footer">
        <Button @click="prevShow = false">关闭</Button>
      </div>
    </Modal>
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
        detailItem: {},
        show: false,
        dealShow: false,
        dealData: {
          id: '',
          dealAmount: '',
          files: ''
        },
        rejectApi: {
          id: '',
          rejectRemark: ''
        },
        rejectShow: false,
        delaRules: {
          dealAmount: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }]
        },
        rejectRules: {
          rejectRemark: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }]
        },
        loading: false,
        rejectEdit: false,
        dealEdit: false,
        curFiles: '',
        prevShow: false
      };
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
          status: this.pageApi.status,
          buserName: this.pageApi.buserName
        };
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
      }
    },
    filters: {
      toHidden(str, start, end) {
        return str.substr(start, start) + "..." + str.substr(str.length - end);
      },
      toStatus(val) {
        return ['待审核处理', '提现成功', '申请驳回', '申请已撤销'][val * 1]
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.api.widthDrawPage, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount;
          }
        });
      },
      //  清除查询
      resetFilter() {
        this.pageApi = {
          currentPage: 1,
          pageSize: 10,
          timeBegin: "",
          timeEnd: "",
          amountBegin: "",
          amountEnd: "",
          id: "",
          status: "",
          buserName: ""
        };
        this.dateValue = ["", ""];
        if (this.isDeal) {
          this.pageApi.status = 0;
        }
        this.getList(this.handleFilter);
      },
      //  分页
      changePage(page) {
        this.pageSize.currentPage = page;
        this.getList(this.handleFilter);
      },
      getDetail(item) {
        this.$http
          .post(this.api.widthDrawDetail, {
            id: item.id
          })
          .then(res => {
            if (res.code === 1000) {
              this.detailItem = Object.assign({}, res.data);
            }
          });
      },
      previewFiles(files) {
        this.curFiles = files;
        this.prevShow = true;
      },
      showDetail(item) {
        this.getDetail(item);
        this.show = true;
      },
      dealItem(isEdit, item) {
        this.dealEdit = isEdit;
        if (isEdit) {
          this.dealData.files = item.files;
          this.dealData.dealAmount = item.dealAmount.toString();
        }
        this.getDetail(item);
        this.dealShow = true
      },
      // 处理
      dealAction(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let params = this.$clearData(this.dealData);
                params.id = this.detailItem.id;
                if (this.dealEdit) {
                  delete params.dealAmount;
                }
            let postUrl = this.dealEdit ? this.api.updateFiles : this.api.widthDrawPass;
            this.$http.post(postUrl, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handleFilter)
                this.dealShow = false;
              } else {
                this.$Message.error(res.message)
              }
            })
          } else {
            this.$Message.error('表单验证失败')
          }
        })
  
      },
      dealHidden(name) {
        this.dealShow = false;
        this.dealData.dealAmount = '';
        this.dealData.files = '';
        this.$refs[name].resetFields();
      },
      rejectHidden(name) {
        this.rejectShow = false;
        this.rejectApi.rejectRemark = '';
        this.$refs[name].resetFields();
      },
      rejectItem(rejectEdit, item) {
        this.rejectEdit = rejectEdit;
        if (rejectEdit) {
          this.rejectApi.rejectRemark = item.rejectRemark;
        }
        this.getDetail(item);
        this.rejectShow = true
      },
      // 驳回
      rejectAction(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let params = this.$clearData(this.rejectApi);
            params.id = this.detailItem.id;
            let postUrl = this.rejectEdit ? this.api.updateRejectRemark : this.api.widthDrawReject;
            this.$http.post(postUrl, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handleFilter)
                this.rejectShow = false;
              } else {
                this.$Message.error(res.message)
              }
            })
          } else {
            this.$Message.error('表单验证失败')
          }
        })
  
      },
    },
    created() {
      if (this.isDeal) {
        this.pageApi.status = 0;
      }
      this.getList(this.handleFilter);
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
      margin-bottom: 15px;
    }
  }
  
  .previewImg {
    .img-list {
      img {
        max-width: 100%;
      }
    }
  }
</style>