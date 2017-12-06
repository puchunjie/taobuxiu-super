<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">{{title}}配置</p>
      <div>
        <Form :mode="filterData" :label-width="80" inline style="margin-top:24px;">
          <FormItem prop="name" label="资源类型">
            <Select v-model="filterData.storeQualificationTypeId" @on-change="onFilter" placeholder="请选择" style="width:150px">
                <Option v-for="item in typeData" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="name" label="资源品类">
            <Select v-model="filterData.ironTypeId" @on-change="onFilter" placeholder="请选择" style="width:150px">
              <Option v-for="item in ironTypes" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem>
              <Button type="warning" @click.native="resetFilter">清除</Button>
          </FormItem>
        </Form>
      </div>
      <Button slot="extra" size="small" type="warning" @click="openDefault" style="margin-right:10px;">配置默认规则</Button>
     <div class="card-contnet">
       <div class="table-contnet">
        <Row class-name="head">
            <Col class-name="col" span="1">
                <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
            </Col>
            <Col class-name="col" span="4">资源类型</Col>
            <Col class-name="col" span="4">品类</Col>
            <Col class-name="col" span="3">规则</Col>
            <Col class-name="col" span="3">更新备注</Col>
            <Col class-name="col" span="3">最近操作人</Col>
            <Col class-name="col" span="3">最近操作时间</Col>
            <Col class-name="col" span="3">操作</Col>
        </Row>
        <CheckboxGroup ref="getGroup" v-model="bindData.resultId" @on-change="checkAllGroupChange">
            <Row v-for="(item,index) in list" :key="item.id">
                <Col class-name="col" span="1">
                    <Checkbox :label="item.id">&nbsp;</Checkbox>
                </Col>
                <Col class-name="col" span="4">{{ item.storeQualificationTypeName }}</Col>
                <Col class-name="col" span="4">{{item.ironTypeName}}</Col>
                <Col class-name="col" span="3">{{item.storeRuleTypeName}}</Col>
                <Col class-name="col" span="3">{{ item.remark | isEmpty(params ='暂无')}}</Col>
                <Col class-name="col" span="3">{{ item.updateUser}}</Col>
                <Col class-name="col" span="3">{{ item.updateTime | dateformat}}</Col>
                <Col class-name="col" span="3">
                    <Button size="small" type="warning" @click="openModel(item)">编辑</Button>
                    <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
                </Col>
            </Row>
        </CheckboxGroup>
         <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
         </Row>
         </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="filterData.currentPage" :page-size="filterData.pageSize" @on-change="changePage"></Page>
      </div>
        <div class="bind-main">
          您已勾选<span>{{selectLen}}</span>资源，批量应用刷新规则：
            <Select v-model="bindData.storeRuleTypeId" placeholder="请选择" style="width:150px">
                <Option v-for="item in rulesList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
            <Button type="primary" size="large" @click.native="savaBind">确认应用新配置</Button>
        </div>
    </Card>
    <Modal v-model="show" title="编辑资源刷新机制_规则配置" :closable="false" :mask-closable="false">
      <Form :label-width="80" :ref="ref" :model="itemApi" :rules="editRules">
         <FormItem prop="storeQualificationTypeId" label="资源类型">
            <Select v-model="itemApi.storeQualificationTypeId" :disabled="isEdit" placeholder="请选择" style="width:150px">
                <Option v-for="item in typeData" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="ironTypeId" label="资源品类">
            <Select v-model="itemApi.ironTypeId" :disabled="isEdit" placeholder="请选择" style="width:150px">
              <Option v-for="item in ironTypes" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择规则" prop="storeRuleTypeId">
            <Select v-model="itemApi.storeRuleTypeId" placeholder="请选择" style="width:150px">
                <Option v-for="item in rulesList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="更新备注" prop="remark">
            <Input type="text" v-model="itemApi.remark" size="small" placeholder="请输入..."></Input>
          </FormItem>
      </Form>
      <div slot="footer">
          <Button @click="show = false">取消</Button>
          <Button type="primary" @click="handleSubmit" :loading="loading">编辑</Button>
      </div>
    </Modal>
    <Modal v-model="showDefault" title="配置默认规则" :closable="false" :mask-closable="false">
        <Form :label-width="100" :ref="refdefault" :model="defalutApi" >
          <FormItem label="当前默认规则：">
            {{defaultRuleName}}
          </FormItem>
          <FormItem label="选择规则：" prop="storeRuleTypeId">
            <Select v-model="defalutApi.storeRuleTypeId" placeholder="请选择" style="width:150px">
                <Option v-for="item in rulesList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="showDefault = false">取消</Button>
            <Button type="primary" @click="defaultSubmit" :loading="loading">确认保存</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
        title: '资源刷新机制_规则',
        ref: 'form' + new Date().getTime(),
        refdefault: 'form' + new Date().getTime(),
        show: false,
        isEdit: false,
        showDefault: false,
        ironTypes: [],
        filterData: {
            storeQualificationTypeId: '',
            ironTypeId: '',
            pageSize: 10,
            currentPage: 1
        },
        typeData: [],
        list:[],
        totalCount: 0,
        selectLen: 0,
        bindData: {
            resultId: [],
            storeRuleTypeId: ''
        },
        rulesList: [],
        checkAll: false,
        indeterminate: false,
        defaultRuleName: '',
        itemApi: {
           id: '',
           storeQualificationTypeId: '',
           ironTypeId: '',
           storeRuleTypeId: '',
           remark: '' 
        },
        editRules:{
            storeQualificationTypeId: [{
              required: true,
              message: '请选择资源类型',
            }],
            ironTypeId: [{
                required: true,
                message: '请选择资源品类'
            }],
            storeRuleTypeId: [{
                required: true,
                message: '请选择规则'
            }]
        },
        defalutApi: {
            storeRuleTypeId: ''
        },
        // defalutRules: {
        //     storeRuleTypeId: [{
        //         required: true,
        //         message: '请选择规则'
        //     }]
        // },
        loading: false
    }
  },
  computed: {
    allCheckIds(){
      let arr = [];
      this.list.forEach(el=>{
        arr.push(el.id);
      })
      return arr
    }
  },
  methods: {
    onFilter() {
      this.getAllList();
      this.resetBinder();
      this.filterData.currentPage = 1;
    },
    changePage(page) {
      this.filterData.currentPage = page;
      this.getAllList();
      this.resetBinder();
    },
    openDefault() {
        this.getDefaultRule();
        this.showDefault = true;
    },
    checkAllGroupChange(data) {
      this.selectLen = this.bindData.resultId.length;
      if (data.length === this.filterData.pageSize) {
          this.indeterminate = false;
          this.checkAll = true;
      } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
      } else {
          this.indeterminate = false;
          this.checkAll = false;
      }
    },
    // 处理全选
    handleCheckAll() {
      if (this.indeterminate) {
          this.checkAll = false;
      } else {
          this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
          this.bindData.resultId =  this.allCheckIds;
          this.selectLen = this.bindData.resultId.length;
      } else {
          this.bindData.resultId = [];
          this.selectLen = 0;
      }
    },
    getAllList() {
        this.$http.post(this.api.selectStoreRolesConfigurationPage,this.filterData).then(res => {
            if(res.code === 1000){
                this.list = res.data.list;
                this.totalCount = res.data.totalCount
            }
        })
    },
    //  获取品类
    getironTypes() {
        this.$http.get(this.api.queryIronTypes).then(res => {
            if(res.code === 1000){
                this.ironTypes = res.data;
            }
        })
    },
    // 所有资源类型
    getResouceType() {
        this.$http.get(this.api.selectStoreQualificationTypeName).then(res => {
            if(res.code === 1000){
                this.typeData = res.data;
            }
        })
    },
    //  获取默认规则名称
    getDefaultRule() {
        this.$http.get(this.api.selectFagRuleName).then(res => {
            if(res.code === 1000){
                this.defaultRuleName = res.data[0].storeRuleTypeName
            }
        })
    },
    getRuleList() {
        this.$http.get(this.api.selectFagRuleNameList).then(res => {
            if(res.code === 1000){
                this.rulesList = res.data
            }
        })
    },
    //  保存默认规则
    defaultSubmit() {
        if(this.defalutApi.storeRuleTypeId != ''){
            this.loading = true;
            let params = JSON.parse(JSON.stringify(this.defalutApi));
            this.$http.post(this.api.saveStoreRolesConfiguration,params).then(res => {
                if(res.code === 1000){
                    this.getAllList();
                    this.showDefault = false;
                    this.$Message.success('操作成功');
                }else{
                    this.$Message.error('操作失败')
                }
                this.loading = false
            })
        }else{
            this.$Message.error('请选择规则');
        }
    },
    //  清空筛选数据
    resetFilter() {
        this.filterData.storeQualificationTypeId = '';
        this.filterData.ironTypeId= ''
        this.resetBinder();
    },
    //  清空绑定数据
    resetBinder() {
        this.bindData = {
            resultId: [],
            storeRuleTypeId: ''
        }
        this.selectLen = 0;
        this.indeterminate = false;
        this.checkAll = false; 
    },
    //  编辑资源刷新机制_规则配置
    openModel(item){
        this.show = true;
        this.isEdit = true;
        this.itemApi = {
            id: item.id,
            storeQualificationTypeId: item.storeQualificationTypeId,
            ironTypeId: item.ironTypeId,
            storeRuleTypeId: item.storeRuleTypeId,
            remark: item.remark 
        }
    },
    //  保存编辑资源刷新机制_规则配置 
    handleSubmit() {
      this.$refs[this.ref].validate((valid) => {
            if(valid){
                this.loading = true;
                let params = JSON.parse(JSON.stringify(this.itemApi));
                this.$http.post(this.api.updateStoreRolesConfiguration,params).then(res => {
                    if(res.code === 1000){
                        this.$Message.success('编辑成功')
                        this.show = false;
                        this.getAllList();
                    }else{
                        this.$Message.error('编辑失败')
                    }
                    this.loading = false
                })
            }else{
                    this.$Message.error('表单验证失败')
                }
        })
    },
    //  删除规则配置
    deleteItem(item) {
        this.$Modal.confirm({
            title: '删除提示',
            content: '确认删除？',
            onOk: () =>{
                let params = {
                    id: item.id
                }
                this.$http.post(this.api.deleteStoreRoles,params).then(res => {
                    if(res.code === 1000){
                        this.getAllList();
                        this.$Message.success('删除成功')
                    }else {
                        this.$Message.error('删除失败')
                    }
                })
            }
        })
    },
    //  绑定规则
    savaBind() {
        if(this.bindData.storeRuleTypeId === ''){
            this.$Message.error('请选择刷新规则')
        }else{
        this.$Modal.confirm({
            title: '绑定提示',
            content: '确认绑定？',
            onOk: () =>{
                let params = this.$clearData(this.bindData)
                    params.resultId = JSON.stringify(params.resultId)
                this.$http.post(this.api.updateStoreRules,params).then(res => {
                    if(res.code === 1000){
                        this.$Message.success('操作成功！');
                        this.getAllList();
                        this.resetBinder();
                    }else{
                        this.$Message.error('操作失败')
                    }
                })
            }
        })
        }
    }
  },
    created () {
        this.getironTypes();
        this.getResouceType();
        this.getAllList();
        this.getRuleList();
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
    .bind-main{
        position: relative;
        margin-top: 15px;
        span{
            color: red;
        }
        button{
            position: absolute;
            top: 0;
            right: 20px;
        }
    }
} 
</style>
