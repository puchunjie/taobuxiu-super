<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title">资源类型管理</p>
            <Button slot="extra" size="small" type="success" @click="openModel(false)">新增资源类型</Button>
            <div class="card-contnet">
                <div class="table-contnet">
                    <Row class-name="head">
                        <Col class-name="col" span="4">资源类型名称</Col>
                        <Col class-name="col" span="4">资源类型</Col>
                        <Col class-name="col" span="4">板卷/非板卷</Col>
                        <Col class-name="col" span="5">最近操作人</Col>
                        <Col class-name="col" span="5">最近操作时间</Col>
                        <Col class-name="col" span="2">操作</Col>
                    </Row>
                    <Row v-for="(item,index) in list" :key="item.id">
                        <Col class-name="col" span="4">{{ item.qualificationTypeName }}</Col>
                        <Col class-name="col" span="4">{{ item.storeType | storeType}}</Col>
                        <Col class-name="col" span="4">{{ item.type | typeData}}</Col>
                        <Col class-name="col" span="5">{{ item.updateUser}}</Col>
                        <Col class-name="col" span="5">{{ item.updateTime | dateformat}}</Col>
                        <Col class-name="col" span="2">
                            <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
                            <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
                        </Col>
                    </Row>
                    <Row v-if="list.length == 0">
                        <Col class-name="col" span="24">暂无数据</Col>
                    </Row>
                </div>
                <Page class="page-count" size="small" :total="totalCount" show-total :current="apiData.currentPage" :page-size="apiData.pageSize" @on-change="changePage"></Page>
            </div>
        </Card>
        <Modal v-model="show" :title="isEdit?`编辑资源类型管理`:`添加资源类型管理`" :closable="false" :mask-closable="false">
            <Form :label-width="110" :ref="ref" :model="itemApi" :rules="rules">
                <FormItem label="资源类型名称：" prop="QualificationTypeName">
                    <Select v-model="itemApi.QualificationTypeName" placeholder="请选择" v-if="!isEdit">
                        <Option v-for="item in typeList" :value="item.QualificationTypeName+'~'+item.QualificationTypeId" :key="item.QualificationTypeId" >{{ item.QualificationTypeName }}</Option>
                    </Select>
                    <Select v-model="itemApi.QualificationTypeName" placeholder="请选择" v-else>
                        <Option v-for="item in typeList" :value="item.QualificationTypeName" :key="item.QualificationTypeId">{{ item.QualificationTypeName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="资源类型：" prop="storeType">
                    <Select v-model="itemApi.storeType" placeholder="请选择" @on-change="doChange"	>
                        <Option v-for="item in storeType" :key="item.id" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="板卷/非板卷：" prop="type">
                    <Select v-model="itemApi.type" placeholder="请选择">
                        <Option v-for="item in type" :key="item.id" :disabled= "item.disable" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="show = false">取消</Button>
                <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ref: 'form' + new Date().getTime(),
                show: false,
                isEdit: false,
                list: [],
                itemApi: {
                    id: '',
                    storeType:'',
                    type: '',
                    QualificationTypeId: '',
                    QualificationTypeName:''
                },
                apiData:{
                    pageSize: 10,
                    currentPage: 1
                },
                editItem: {},
                totalCount: 0,
                typeList: [],
                storeType:[{
                    name: '现货资源',
                    id: '1'
                },{
                    name: '定开计划',
                    id: '2'
                },{
                    name: '特价资源',
                    id: '3'
                }],
                type: [{
                    name: '板卷',
                    id: 1,
                    disable: true
                },{
                    name: '非板卷',
                    id: 2,
                    disable: true
                },{
                    name: '其他',
                    id: 3,
                    disable: true
                }],
                loading: false,
                rules:{
                    QualificationTypeName: [{
                        required: true,
                        message: '请选择资源类型名称',
                    }],
                    storeType: [{
                        required: true,
                        message: '请选择资源类型',
                    }],
                    type: [{
                        required: true,
                        message: '请选择板卷/非板卷',
                    }]
                },
            }
        },
        methods: {
            getAllList() {
                this.$http.post(this.api.selectDynamicResourcelPage, this.itemApi).then(res => {
                    if(res.code === 1000){
                        this.list = res.data.list
                        this.totalCount = res.data.totalCount
                    }
                })
            },
            openModel(isEdit,item) {
                this.isEdit = isEdit;
                if(isEdit){
                    this.editItem = item || {}
                    this.itemApi = {
                        id: item.id,
                        storeType: item.storeType,
                        type: item.type,
                        QualificationTypeId: item.qualificationTypeId,
                        QualificationTypeName: item.qualificationTypeName
                    }
                }else{
                    this.itemApi = {
                        id: '',
                        storeType: '',
                        type: '',
                        QualificationTypeId: '',
                        QualificationTypeName: ''
                    }
                }
                this.getTypeList()
                this.show = true;
            },
            // 保存
            handleSubmit (){
                this.$refs[this.ref].validate((valid) => {
                    if(valid){
                        this.loading = true;
                        let params = JSON.parse(JSON.stringify(this.itemApi));
                        let qualificat = params.QualificationTypeName.split('~');
                        params.QualificationTypeId = qualificat[1];
                        params.QualificationTypeName = qualificat[0]
                        if(this.isEdit){
                            params.id = this.editItem.id;
                            params.storeType = this.itemApi.storeType;
                            params.type = this.itemApi.type;
                            params.QualificationTypeId = this.itemApi.QualificationTypeId;
                            params.QualificationTypeName = this.itemApi.QualificationTypeName;
                        }
                        let apiUrl = this.isEdit ? this.api.updateDynamicResourcel : this.api.saveDynamicResourcel;
                        this.$http.post(apiUrl,params).then(res => {
                            if(res.code === 1000){
                                this.getAllList();
                                this.$Message.success('操作成功');
                                this.show = false;
                            }else{
                                this.$Message.error(res.message);
                            }
                            this.loading = false
                        })
                    }else{
                        this.$Message.error('表单验证失败');
                    }
                })
            },
            //  删除
            deleteItem(item) {
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确认删除？',
                    onOk: () =>{
                        let base = {
                            id: item.id
                        };
                        let params = JSON.parse(JSON.stringify(base))
                        this.$http.post(this.api.deleteDynamicResourcel,params).then(res => {
                            if(res.code === 1000){
                                this.getAllList()
                                this.$Message.success('删除成功')
                            }else{
                                this.$Message.error('删除失败')
                            }
                        })
                    }
                })
            },
            //  现货资源类型1:现货资源 2:定开计划 3.特价资源  选择1，3的时候 可以选type1，2  ,选择2的时候 type 3
            // type  1：板卷 2:非板卷 3:其他
            doChange() {
                if(this.itemApi.storeType == 1 || this.itemApi.storeType == 3){
                    this.type = [{
                            name: '板卷',
                            id: '1',
                            disable: false
                        },{
                            name: '非板卷',
                            id: '2',
                            disable: false
                        },{
                            name: '其他',
                            id: '3',
                            disable: true
                        }] 
                }else if(this.itemApi.storeType == 2){
                        this.type = [{
                            name: '板卷',
                            id: '1',
                            disable: true
                        },{
                            name: '非板卷',
                            id: '2',
                            disable: true
                        },{
                            name: '其他',
                            id: '3',
                            disable: false
                        }] 
                }
            },
            changePage(page) {
                this.itemApi.currentPage = page;
                this.getAllList()
            },
            getTypeList() {
                this.$http.post(this.api.selectStoreQualificationTypeInfo).then(res => {
                    if(res.code === 1000){
                        this.typeList = res.data
                    }
                })
            }
        },
        created() {
            this.getAllList();
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
</style>


