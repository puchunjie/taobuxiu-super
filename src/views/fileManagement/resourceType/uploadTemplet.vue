<template>
  <div class="panel">
    <Card :bordered="false" class="card">
        <p slot="title">资源上传EXCEL模板管理</p>
        <Button slot="extra" size="small" type="success" @click="openModel(false)">新增资源模板</Button>
        <div class="card-contnet">
            <div class="table-contnet">
                <Row class-name="head">
                    <Col class-name="col" span="4">资源类型</Col>
                    <Col class-name="col" span="4">模板名称</Col>
                    <Col class-name="col" span="4">最近更新时间</Col>
                    <Col class-name="col" span="4">更新说明</Col>
                    <Col class-name="col" span="3">更新操作人</Col>
                    <Col class-name="col" span="2">商家总下载次数</Col>
                    <Col class-name="col" span="3">操作</Col>
                </Row>
                <Row v-for="(item , index) in list" :key="item.id">
                    <Col class-name="col" span="4">{{ item.qualificationName }}</Col>
                    <Col class-name="col" span="4" :title="item.modelName">{{ item.modelName }}</Col>
                    <Col class-name="col" span="4">{{ item.updateTime | dateformat}}</Col>
                    <Col class-name="col" span="4">{{ item.remark | isEmpty(params ='暂无')}}</Col>
                    <Col class-name="col" span="3">{{ item.updateUser }}</Col>
                    <Col class-name="col" span="2">{{ item.downLodeCount }}</Col>
                    <Col class-name="col" span="3">
                        <Button size="small" type="warning" @click="openModel(true,item)">更新</Button>
                        <Button size="small" type="warning" @click="download(item)">下载</Button>
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
    <Modal v-model="show" :title="isEdit?`编辑${title}`:`更新${title}`" :closable="false" :mask-closable="false">
        <Form :label-width="80" :ref="ref" :model="itemApi" :rules="rules" style="position:relative">
            <FormItem label="资源类型" prop="qualificationName" v-if="!isEdit">
                 <Select v-model="itemApi.qualificationName">
                    <Option  v-for="item in typeList" :value="item.name+'~'+item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="资源类型" prop="qualificationName" v-else>
                 <Select v-model="itemApi.qualificationName" disabled>
                    <Option  v-for="item in typeList" :value="item.name" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="模板文件" prop="modelName">
                <Input v-model="itemApi.modelName" disabled size="small" placeholder="请选择上传文件"></Input>
                  <Upload :action="uploadApi" :headers="uplaodHeader" :before-upload="beforeUpload" :max-size="1024" :data="uploadParams" :format="['xlsx']" :show-upload-list="false" :on-exceeded-size="handleMaxSize" :on-success="handleSuccess" :on-format-error="handleFormatError" style="display:inline-block;width: 60px;"> 
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                  </Upload>  
            </FormItem>
            <FormItem label="备注说明" prop="remark">
                <Input type="text" v-model="itemApi.remark" size="small" placeholder="请输入..."></Input>
            </FormItem>
            <div class="sping" v-show="spinShow"></div>
        </Form>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '更新' : '添加' }}</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import * as types from '@/store/store'
export default {
    props: {
        title: String,
        getListApi: String,
        addApi: String,
        updateApi: String,
        uploadApi: String,
        getTypeApi: String,
        deleteApi: String,
        downloadApi: String
    },
    data () {
        return {
            ref: 'form' + new Date().getTime(),
            isEdit: false,
            show: false,
            editItem: {},
            loading: false,
            itemApi:{
                qualificationId: '',
                qualificationName:'',
                modelName: '',
                modelUrl: '',
                remark: ''
            },
            apiData: {
                currentPage: 1,
                pageSize: 10
            },
            rules:{
                qualificationName: [{
                    required: true,
                    message: '请选择资源类型',
                    trigger: 'blur'
                }],
                modelName:[{
                    required: true,
                    message: '请上传模板文件',
                    trigger: 'blur'
                }]
            },
            totalCount: 0,
            list: [],
            typeList: [],
            typeApi: {
                currentPage: '',
                pageSize: ''
            },
            uploadList: [],
            spinShow: false,
        }
    },
    computed: {
        //  上传文件data处理
         uploadParams() {
            let params = JSON.parse(JSON.stringify(this.itemApi));
             if(this.isEdit){
                 return {
                    qualificationId: params.qualificationId 
                 }
             }else{
                let qualificat = params.qualificationName.split('~');
                return  {
                    qualificationId: qualificat[1],
                }
            }
        },
        //  设置文件上传headers
        uplaodHeader() {
            return {
                authorization: this.$store.state.authorization,
                loginId: this.$store.state.loginId
            }
        }
    },
    methods: {
        //  获取列表
        getList() {
            this.$http.post(this.getListApi, this.apiData).then(res => {
                if(res.code === 1000){
                    this.list = res.data.list;
                    this.totalCount = res.data.totalCount
                }
            })
        },
        //  获取资源类型列表
        getTypeList() {
            this.$http.post(this.getTypeApi,this.typeApi).then(res => {
                if(res.code === 1000){
                    this.typeList = res.data.list;
                }
            })
        },
        changePage(page) {
            this.apiData.currentPage = page;
            this.getList();
        },
       
        openModel(isEdit,item) {
            this.getTypeList();
            this.isEdit = isEdit;
            if(isEdit){
                this.editItem = item || {};
                this.itemApi = {
                    qualificationId: item.qualificationId,
                    qualificationName: item.qualificationName,
                    modelName: item.modelName,
                    modelUrl: item.modelUrl,
                    remark: item.remark
                }
                this.uploadList = {
                    name: item.modelName,
                    url: item.modelUrl
                }
            }else{
                this.itemApi = {
                    qualificationId:'',
                    qualificationName:'',
                    modelName: '',
                    modelUrl: '',
                    remark: ''
                }
            }
            this.show = true;
        },
        // 提交表单新增、更新
        handleSubmit() {
            this.$refs[this.ref].validate((valid) =>{
                if(valid){
                    this.loading = true;
                    let params = JSON.parse(JSON.stringify(this.itemApi));
                    let qualificat = params.qualificationName.split('~');
                        params.qualificationId = qualificat[1];
                        params.qualificationName = qualificat[0]
                    if(this.isEdit){
                        params.id = this.editItem.id;
                        params.qualificationId = this.itemApi.qualificationId;
                        params.qualificationName = this.itemApi.qualificationName;
                        params.modelName = this.itemApi.modelName;
                        params.modelUrl = this.itemApi.modelUrl;
                        params.remark = this.itemApi.remark;
                    }
                    let apiUrl = this.isEdit ? this.updateApi : this.addApi;
                    this.$http.post(apiUrl, params).then(res => {
                        if(res.code === 1000){
                            this.getList();
                            this.$Message.success('操作成功');
                            this.show = false;
                        }else if(res.code === -1){
                            this.$Message.error(res.message)
                        }else{
                            this.$Message.error('操作失败')
                        }
                        this.loading = false
                    })
                }else{
                    this.$Message.error('表单验证失败')
                }
            })
        },
        beforeUpload() {
            if(this.itemApi.qualificationName === ''){
                this.$Message.error('请先选择资源类型');
                return false
            }else{
                this.spinShow = true;
            }
        },
        //  文件上传处理
        handleSuccess(res,file) {
            this.spinShow = false
            if(res.code === -1){
                this.$Modal.error({
                    title: '错误提示',
                    content: res.message
                })
                // this.$Message.error(res.message)
            }
            this.itemApi.modelName = res.data.modelName;
            this.itemApi.modelUrl = res.data.modelUrl
        },
        //  文件格式
        handleFormatError(file) {
            this.spinShow = false
            this.$Message.error('请上传.xlsx文件');
            return false;
        },
        //  上传文件过大提示
        handleMaxSize(file) {
            this.spinShow = false
            this.$Message.error('文件最大不超过1M');
            return false;
        },
        //  下载
        download(item) {
            let params = {
                id: item.id,
                downLodeCount: item.downLodeCount
            }
            this.$http.post(this.downloadApi, params).then(res => {
                if(res.code === 1000){
                    this.getList();
                    window.open(this.api.excelBaseUrl + item.modelUrl);
                }                
            })
        },
        //  删除
        deleteItem(item) {
          this.$Modal.confirm({
              title: '删除提示！',
              content: '删除后无法撤销，是否继续？',
              onOk: () =>{
                  let params = {
                      id: item.id
                  }
                  this.$http.post(this.deleteApi,params).then(res => {
                      if(res.code === 1000){
                          this.getList();
                          this.$Message.success('删除成功')
                      }else{
                          this.$Message.error('删除失败')
                      }
                  })
              }
          })
        }
    },
    created () {
        this.getList();
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
}
.sping{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255,.4);
    z-index: 9;
    &:before{
        content:'正在上传...';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 11;
        color: #2d8cf0
    }
}   
</style>