<template>
  <div class="comm-container">
    <div class="panel">
      <Card :bordered="false" class="card">
        <p slot="title">银行卡管理</p>
        <Button slot="extra" size="small" type="success" @click="openModel(false)">新增银行卡</Button>
        <p style="color:#19be6b;">
          选取商户：{{companyName}}
        </p>
        <Form :mode="pageApi" :label-width="80" inline style="margin-top:24px;">
          <FormItem label="银行账号">
            <Input type="text" v-model="pageApi.bankCardNo" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="开户人">
            <Input type="text" v-model="pageApi.userName" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="账户类型">
            <Select v-model="pageApi.bankCardType" style="width:120px">
                <Option v-for="(item,i) in [{id: '1',name: '企业'},{id: '2',name: '个人'}]" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="warning" @click.native="resetFilter">清除</Button>
          </FormItem>
        </Form>
        <div class="card-contnet">
          <div class="table-contnet">
            <Row class-name="head">
              <Col class-name="col" span="1">序号</Col>
              <Col class-name="col" span="2">开户行</Col>
              <Col class-name="col" span="3">银行账号</Col>
              <Col class-name="col" span="4">开户地址</Col>
              <Col class-name="col" span="3">开户人</Col>
              <Col class-name="col" span="2">账号类型</Col>
              <Col class-name="col" span="1">账号状态</Col>
              <Col class-name="col" span="2">创建时间</Col>
              <Col class-name="col" span="2">更新时间</Col>
              <Col class-name="col" span="4">操作</Col>
            </Row>
            <Row v-for="(item,index) in list" :key="item.id">
              <Col class-name="col" span="1">{{index + 1}}</Col>
              <Col class-name="col" span="2">{{item.bank}}</Col>
              <Col class-name="col" span="3">{{item.bankCardNo}}</Col>
              <Col class-name="col" span="4">{{`${item.bankProvince}${item.bankCity}${item.bankArea}`}}</Col>
              <Col class-name="col" span="3">{{item.userName}}</Col>
              <Col class-name="col" span="2">{{item.bankCardType === '1' ? '企业':'个人'}}</Col>
              <Col class-name="col" span="1">{{item.status === '1' ? '有效':''}}</Col>
              <Col class-name="col" span="2">{{item.createTime | dateformat}}</Col>
              <Col class-name="col" span="2">{{item.updateTime | dateformat}}</Col>
              <Col class-name="col" span="4">
              <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
              <Button size="small" type="warning" @click="openDetail(item)">详情</Button>
              <Button size="small" type="warning" @click="delItem(item)">删除</Button>
              <Button size="small" type="warning" @click="setDefault(item)">{{item.isDefault ? '取消默认':'设为默认'}}</Button>
              </Col>
            </Row>
            <Row v-if="list.length === 0">
              <Col class-name="col" span="24">暂无数据</Col>
            </Row>
          </div>
          <Page class="page-count" size="small" :total="totalCount" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
        </div>
      </Card>
    </div>
    <Modal v-model="show" :title="isEdit?`编辑银行卡`:`新增银行卡`" :closable="false" :mask-closable="false">
      <Form :label-width="100" :ref="ref" :model="dataApi" :rules="rules">
        <FormItem label="账户类型：" prop="bankCardType">
            <RadioGroup v-model="dataApi.bankCardType">
              <Radio label="1"><span>企业</span></Radio>
              <Radio label="2"><span>个人</span></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="this.dataApi.bankCardType === '1' ? '公司抬头：':'开户人姓名：'" prop="userName">
          <Input type="text" :disabled="isDisable" v-model="dataApi.userName" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="开户银行：" prop="bank">
          <Input type="text" v-model="dataApi.bank" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="开户行地址：" prop="bankProvince">
          <citySelect @on-pick="cityPick" :value="placeHolder"></citySelect>
        </FormItem>
        <FormItem label="开户行名称：" prop="bankName">
          <Input type="text" v-model="dataApi.bankName" placeholder="请输入..."></Input>
          <p>请您尽量填写全面清楚，否则可能影响提现进度</p>
        </FormItem>
        <FormItem label="银行账号：" prop="bankCardNo">
          <Input type="text" v-model="dataApi.bankCardNo" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="确认账号：" prop="bankCardNoAgain">
          <Input type="text" v-model="dataApi.bankCardNoAgain" placeholder="请输入..."></Input>
        </FormItem> 
        <FormItem label="账户种类：" prop="accountType" style="margin-bottom: 5px;" v-if="isDisable">
          <Select v-model="dataApi.accountType">
              <Option v-for="(item,i) in [{id: '1',name: '基本账户'},{id: '2',name: '一般账户'},{id: '3',name:'专用账户'},{id: '4',name:'临时账户'}]" :value="item.id" :key="i">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户币种：" prop="financeType">
            <RadioGroup v-model="dataApi.financeType">
              <Radio label="1"><span>人民币</span></Radio>
              <Radio label="2"><span>美元</span></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="设为默认：">
          <Checkbox v-model="dataApi.isDefault"><span></span></Checkbox>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="close">取消</Button>
        <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
      </div>
    </Modal>
    <Modal v-model="detailShow" title="银行卡详情" :closable="false" :mask-closable="false">
      <Form :label-width="100">
        <FormItem label="账户类型：" style="margin-bottom: 5px;">
          {{detail.bankCardType === '1' ? '企业':'个人'}}
        </FormItem>
        <FormItem :label="detail.bankCardType === '1' ? '公司抬头：':'开户人姓名：'" style="margin-bottom: 5px;">
          {{detail.userName}}
        </FormItem>
        <FormItem label="开户银行：" style="margin-bottom: 5px;">
          {{detail.bank}}
        </FormItem>
        <FormItem label="开户行地址：" style="margin-bottom: 5px;">
          {{detail.bankProvince}}{{detail.bankCity}}{{detail.bankArea}}
        </FormItem>
        <FormItem label="开户行名称：" style="margin-bottom: 5px;">
          {{detail.bankName}}
        </FormItem>
        <FormItem label="开户行账号：" style="margin-bottom: 5px;">
          {{detail.bankCardNo}}
        </FormItem>
        <FormItem label="账户种类：" v-if="detail.bankCardType === '1'" style="margin-bottom: 5px;">
          {{detail.accountType | accountType}}
        </FormItem>
        <FormItem label="账户币种：" style="margin-bottom: 5px;">
          {{detail.financeType === '1' ? '人民币':'美元'}}
        </FormItem>
        <FormItem label="默认设置：" style="margin-bottom: 5px;">
          {{detail.isDefault ? '已默认':'无'}}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="detailShow = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import citySelect from '@/components/basics/citySelect'
  export default {
    components: {
      citySelect
    },
    data() {
      return {
        ref: 'form' + new Date().getTime(),
        pageApi: {
          buserId: '',
          bankCardNo: '',
          userName: '',
          bankCardType: '',
          pageSize: 10,
          currentPage: 1
        },
        list: [],
        totalCount: 0,
        isEdit: false,
        dataApi: {
          bankCardType: '1',
          userName: '',
          bank: '',
          bankProvince: '',
          bankCity: '',
          bankArea: '',
          bankName: '',
          bankCardNo: '',
          bankCardNoAgain: '',
          financeType: '1',
          isDefault: false,
          buserId: '',
          accountType: ''
        },
        companyName: '',
        show: false,
        editItem: {},
        rules: {
          userName:[{
            required: true,
            message: '开户行不能为空',
            trigger: 'blur'
          }],
          bank:[{
            required: true,
            message: '开户行不能为空',
            trigger: 'blur'
          }],
          bankProvince:[{
            required: true,
            message: '开户行地址不能为空',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if(value != ''){
                callback();
              }
            }
          }],
          bankName:[{
            required: true,
            message: '开户行名称不能为空',
            trigger: 'blur'
          }],
          bankCardNo:[{
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }],
          bankCardNoAgain:[{
            required: true,
            message: '确认账号不能为空',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value != this.dataApi.bankCardNo) {
                return callback(new Error('账号输入不一致'));
              } else {
                callback();
              }
            }
          }],
          accountType:[{
            required: true,
            message: '请选择账户种类',
            trigger: 'change'
          }],
          bankCardType:[{
            required: true,
            message: '请选择账户类型',
            trigger: 'change'
          }],
          financeType:[{
            required: true,
            message: '请选择币种',
            trigger: 'change'
          }]
        },
        loading: false,
        detailShow: false,
        detail: {}
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      handlFilter() {
        return {
          buserId: this.id,
          bankCardNo: this.pageApi.bankCardNo,
          userName: this.pageApi.userName,
          bankCardType: this.pageApi.bankCardType,
          pageSize: this.pageApi.pageSize,
          currentPage: this.pageApi.currentPage
        }
      },
      isDisable(){
        return this.dataApi.bankCardType === '1';
      },
      placeHolder(){
        return this.dataApi.bankProvince != '' ? `${this.dataApi.bankProvince}/${this.dataApi.bankCity}/${this.dataApi.bankArea}` : '请选择地区'
      }
    },
    watch: {
      'handlFilter': {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage)
            this.pageApi.currentPage = 1;
          this.getList(this.handlFilter);
        }, 200),
        deep: true
      },
      'dataApi.bankCardType'(val){
        if(val === '2'){
          if(this.isEdit){
            this.dataApi.userName = this.editItem.userName;
          }else{
            this.dataApi.userName = '';
          }
        }else{
          this.dataApi.userName = this.companyName;
        }
      }
    },
    filters: {
      accountType(val){
        return ['基本账户','一般账户','专用账户','临时账户'][val*1 -1]
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.api.findBankCardList, params).then(res => {
          if (res.code === 1000) {
            this.companyName = res.data.companyName;
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      changePage(page) {
        this.pageApi.currentPage = page;
        this.getList(this.handlFilter)
      },
      resetFilter() {
        this.pageApi = {
          buserId: this.id,
          bankCardNo: '',
          userName: '',
          bankCardType: '',
          pageSize: 10,
          currentPage: 1
        }
      },
      openModel(isEdit, data) {
        this.isEdit = isEdit;
        if (isEdit) {
          this.editItem = data;
          this.dataApi = {
            bankCardType: data.bankCardType,
            userName: data.userName,
            bank: data.bank,
            bankProvince: data.bankProvince,
            bankCity: data.bankCity,
            bankArea: data.bankArea,
            bankName: data.bankName,
            bankCardNo: data.bankCardNo,
            bankCardNoAgain: data.bankCardNo,
            financeType: data.financeType,
            isDefault: data.isDefault,
            buserId: data.buserId,
            accountType: data.accountType
          }
        } else {
          this.dataApi = {
            bankCardType: '1',
            userName: this.companyName,
            bank: '',
            bankProvince: '',
            bankCity: '',
            bankArea: '',
            bankName: '',
            bankCardNo: '',
            bankCardNoAgain: '',
            financeType: '1',
            isDefault: false,
            buserId: this.id,
            accountType: ''
          }
        }
        this.show = true;
      },
      cityPick(data){
        this.dataApi.bankProvince = data.provinceName;
        this.dataApi.bankCity = data.cityName;
        this.dataApi.bankArea = data.districtName
      },
      // 新增、编辑提交
      handleSubmit() {
        this.$refs[this.ref].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.dataApi));
            if (this.isEdit) {
              params.id = this.editItem.id;
            }
            let apiUrl = this.isEdit ? this.api.updateBankCard : this.api.saveBankCard
            this.$http.post(apiUrl, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handlFilter);
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
      close() {
        this.show = false;
        this.$refs[this.ref].resetFields();
      },
      openDetail(item){
        this.detailShow = true;
        this.detail = Object.assign({},item);
      },
      //  删除银行卡
      delItem(item) {
        this.$Modal.confirm({
          title: '删除提示！',
          content: '删除后无法撤销，是否继续？',
          onOk: () => {
            let params = {
              id: item.id,
            }
            this.$http.post(this.api.deleteBankCard, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handlFilter);
                this.$Message.success('删除成功！');
              } else {
                this.$Message.error('删除失败！');
              }
            })
          }
        })
      },
      //  设为默认
      setDefault(item) {
        this.$Modal.confirm({
          title: item.isDefault ? '取消默认' : '设为默认',
          content: item.isDefault ? '确认取消默认，是否继续？' : '确认设为默认，是否继续？',
          onOk: () => {
            let params = {
              id: item.id,
            }
            this.$http.post(this.api.changDefault, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handlFilter);
                this.$Message.success('删除成功！');
              } else {
                this.$Message.error('删除失败！');
              }
            })
          }
        })
      }
    },
    created() {
      this.getList(this.handlFilter)
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