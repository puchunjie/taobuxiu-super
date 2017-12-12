<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title">合同列表管理</p>
            <filterFrom @on-change="dofilter" :data="statusData" v-model="statusApi.status"></filterFrom>
            <div class="card-contnet">
                <div class="table-contnet">
                    <Row class-name="head">
                        <Col class-name="col" span="3">合同编号</Col>
                        <Col class-name="col" span="4">合同标题</Col>
                        <Col class-name="col" span="4">买方公司名称</Col>
                        <Col class-name="col" span="4">卖方公司名称</Col>
                        <Col class-name="col" span="3">更新时间</Col>
                        <Col class-name="col" span="2">合同状态</Col>
                        <Col class-name="col" span="4">操作</Col>
                    </Row>
                    <Row v-for="(item,index) in list" :key="item.contractId">
                        <Col class-name="col" span="3">{{item.contractId}}</Col>
                        <Col class-name="col" span="4">{{item.contractTitle}}</Col>
                        <Col class-name="col" span="4">{{item.firstCompanyName}}</Col>
                        <Col class-name="col" span="4">{{item.secondCompanyName}}</Col>
                        <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
                        <Col class-name="col" span="2">{{item.status | contractStatus}}</Col>
                        <Col class-name="col" span="4">
                            <Button type="primary" size="small" @click="contractDetail(item)">查看</Button>
                            <Button type="primary" size="small">合同日志</Button>
                            <Button type="primary" size="small" @click="contractInfo(item)">合同信息</Button>
                        </Col>
                    </Row>
                    <Row v-if="list.length == 0">
                        <Col class-name="col" span="24">暂无数据</Col>
                    </Row>
                </div>
            </div>
            <Page :total="totalCount" class="page-count" @on-change="pageChange" show-total :current="pageData.currentPage" :page-size="pageData.pageSize"></Page>
        </Card>
        <Modal v-model="show" title="合同信息" :closable="false" :mask-closable="false">
            <Row class="info">
                <Col span="5" class="info-title">合同编号：</Col>
                <Col span="19">{{infoData.contractId}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">合同标题：</Col>
                <Col span="19">{{infoData.contractTitle}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">买方公司名称：</Col>
                <Col span="19">{{infoData.firstCompanyName}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">卖方公司名称：</Col>
                <Col span="19">{{infoData.secondCompanyName}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">更新时间：</Col>
                <Col span="19">{{infoData.updateTime | dateformat}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">起草时间：</Col>
                <Col span="19">{{infoData.createTime | dateformat}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">合同状态：</Col>
                <Col span="19">{{infoData.status | contractStatus}}</Col>
            </Row>
            <Row class="info">
                <Col span="5" class="info-title">包含订单：</Col>
                <Col span="19" >
                    <p v-for="order in infoData.order" :key="order.orderId">{{order.orderType | orderSta}}&nbsp;&nbsp;&nbsp;&nbsp;{{order.orderId}}</p>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="show = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import filterFrom from './common/filter'
import {contractStatus,dateformat,orderSta} from '@/utils/filters.js'
import * as types from '@/store/types'
    export default {
        components: {
            filterFrom
        },
        data() {
            return {
                statusData: [{
                    label: '全部合同',
                    value: '',
                    count: 0
                },{
                    label: '需要我的签名',
                    value: 'a',
                    count: 0
                },{
                    label: '等待他方签署',
                    value: 'b',
                    count: 0
                },{
                    label: '已完成',
                    value: 1,
                    count: 0
                },{
                    label: '已作废',
                    value: 2,
                    count: 0
                }],
                statusApi: {
                    status: ''
                },
                pageData: {
                    pageSize: 10,
                    currentPage: 1
                },
                params: {},
                list: [],
                totalCount: 0,
                show: false,
                infoData: {
                    contractId: '',
                    contractTitle: '',
                    firstCompanyName: '',
                    secondCompanyName: '',
                    updateTime: '',
                    createTime: '',
                    status: '',
                    order: '',
                }
            }
        },
        methods: {
            dofilter(data) {
                let params = _.cloneDeep(data);
                this.pageData.currentPage = 1;
                params.currentPage = this.pageData.currentPage;
                params.pageSize = this.pageData.pageSize;
                params.checkstatus = this.statusApi.status;
                this.params = params;
                this.getAllList(params)
            },
            pageChange(page) {
                this.pageData.currentPage = page;
                let params = _.cloneDeep(this.params);
                params.currentPage = page;
                this.getAllList(params);
            },
            // 获取列表
            getAllList(params) {
                this.$http.post(this.api.queryBgContractInfoPage,params).then(res => {
                    if(res.code === 1000) {
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount;
                        this.statusData[0].count = res.data.alltotalCount;
                        this.statusData[1].count = res.data.atotalCount;
                        this.statusData[2].count = res.data.btotalCount;
                        this.statusData[3].count = res.data.finishtotalCount;
                        this.statusData[4].count = res.data.overtotalCount;
                    }
                })
            },
            //  查看
            contractDetail(data) {
                let token = this.$store.getters.authorization
                let loginId = this.$store.getters.loginId
                let url = 'http://192.168.0.251:8080/contract.jsp?appUserId=100000000000000000000000000000001'+'&loginId='+loginId+'&contractId=' + data.contractId+'&authorization='+token+'&flash=' + Math.random()
                window.open(url)
            },
            //  合同信息
            contractInfo(data) {
                this.show = true;
                let params = {
                    contractId: data.contractId
                }
                this.$http.post(this.api.getContractInfoContractId,params).then(res => {
                    if(res.code === 1000){
                          this.infoData = {
                            contractId: res.data.contractId,
                            contractTitle: res.data.contractTitle,
                            firstCompanyName: res.data.firstCompanyName,
                            secondCompanyName: res.data.secondCompanyName,
                            updateTime: res.data.updateTime,
                            createTime: res.data.updateTime,
                            status: res.data.status,
                            order: res.data.orderInfo,
                        }
                    }
                })
            }
        },
        created () {
            this.getAllList()
        }
    }
</script>

<style lang="less" scoped>
.card {
    position: relative;
    margin-bottom: 20px;
    padding-bottom: 40px;
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
            border-right: 1px solid #d0d0d0;
            border-bottom: 1px solid #d0d0d0;
        }
    }
    .page-count {
        position: absolute;
        right: 20px;
        bottom: 10px;
    }
}
.info{
    margin: 10px 0;
    .info-title{
        text-align: right;
        padding-right: 5px;
    }
}
</style>