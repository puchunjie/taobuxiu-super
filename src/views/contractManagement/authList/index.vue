<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title">合同列表管理</p>
            <Form ref="formInline" :mode="detail" inline :label-width="80">
                <FormItem label="合同编号：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.contactId" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="甲方公司：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.firstCompanyName" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="乙方公司：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.secondCompanyName" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="起草公司：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.createUser" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="更新时间：" class="magin0">
                    <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="updateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="起草时间：" class="magin0">
                    <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="订单编号：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.orderId" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="warning" @click.native="resetFilter">清除</Button>
                </FormItem>
            </Form>
            <filterStatus :data="statusData" v-model="checkstatus"></filterStatus>
            <div class="card-contnet">
                <div class="table-contnet">
                    <Row class-name="head">
                        <Col class-name="col" span="3">合同编号</Col>
                        <Col class-name="col" span="3">合同标题</Col>
                        <Col class-name="col" span="3">起草公司名称</Col>
                        <Col class-name="col" span="3">买方公司名称</Col>
                        <Col class-name="col" span="3">卖方公司名称</Col>
                        <Col class-name="col" span="3">更新时间</Col>
                        <Col class-name="col" span="2">合同状态</Col>
                        <Col class-name="col" span="4">操作</Col>
                    </Row>
                    <Row v-for="item in list" :key="item.contractId">
                        <Col class-name="col" span="3">{{item.contractId}}</Col>
                        <Col class-name="col" span="3">{{item.contractTitle}}</Col>
                        <Col class-name="col" span="3">{{item.createUser}}</Col>
                        <Col class-name="col" span="3">{{item.firstCompanyName}}</Col>
                        <Col class-name="col" span="3">{{item.secondCompanyName}}</Col>
                        <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
                        <Col class-name="col" span="2">{{item.status | contractStatus}}</Col>
                        <Col class-name="col" span="4">
                        <a target="_black" :href="getDetail+'?appUserId=100000000000000000000000000000001&loginId=' + getloginId + '&contractId=' + item.contractId + '&authorization=' + getToken" class="ivu-btn ivu-btn-primary ivu-btn-small">查看</a>
                        <Button type="primary" size="small" @click="contractInfo(item)">合同信息</Button>
                        <a target="_black" :href="getExport+ '?loginId=' + getloginId + '&contractId=' + item.contractId + '&authorization=' + getToken" class="ivu-btn ivu-btn-primary ivu-btn-small" v-show="item.status == '1'">下载合同</a>
                        </Col>
                    </Row>
                    <Row v-if="list.length == 0">
                        <Col class-name="col" span="24">暂无数据</Col>
                    </Row>
                </div>
            </div>
            <Page :total="totalCount" size="small" class="page-count" @on-change="pageChange" show-total :current="detail.currentPage" :page-size="detail.pageSize"></Page>
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
                <Col span="5" class="info-title">起草公司名称：</Col>
                <Col span="19">{{infoData.createUser}}</Col>
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
                <Col span="19">
                <p v-for="order in infoData.order" :key="order.orderId">
                    {{order.orderType | orderSta}}&nbsp;&nbsp;&nbsp;&nbsp;{{order.orderId}}
                </p>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="show = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import filterStatus from './common/status'
    import * as types from '@/store/types'
    export default {
        components: {
            filterStatus
        },
        data() {
            return {
                detail: {
                    contactId: '',
                    orderId: '',
                    firstCompanyName: '',
                    secondCompanyName: '',
                    createUser: '',
                    pageSize: 10,
                    currentPage: 1
                },
                updateValue: ['', ''],
                dateValue: ['', ''],
                statusData: [{
                    label: '全部合同',
                    value: '',
                    count: 0
                }, {
                    label: '需要我的签名',
                    value: 'a',
                    count: 0
                }, {
                    label: '等待他方签署',
                    value: 'b',
                    count: 0
                }, {
                    label: '已完成',
                    value: '1',
                    count: 0
                }, {
                    label: '已作废',
                    value: '0',
                    count: 0
                }],
                checkstatus: '',
                list: [],
                totalCount: 0,
                show: false,
                infoData: {
                    contractId: '',
                    contractTitle: '',
                    firstCompanyName: '',
                    secondCompanyName: '',
                    createUser: '',
                    updateTime: '',
                    createTime: '',
                    status: '',
                    order: '',
                },
                dateOption: {
                    shortcuts: [{
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
            }
        },
        computed: {
            handleFilter() {
                let data = {}
                data.contactId = this.detail.contactId
                data.orderId = this.detail.orderId
                data.firstCompanyName = this.detail.firstCompanyName
                data.secondCompanyName = this.detail.secondCompanyName
                data.createUser = this.detail.createUser
                data.pageSize = this.detail.pageSize;
                data.currentPage = this.detail.currentPage;
                data.startTime = this.updateValue[0] != '' ? this.updateValue[0].getTime() : '';
                data.endTime = this.updateValue[1] != '' ? this.updateValue[1].getTime() : '';
                data.startCreateTime = this.dateValue[0] != '' ? this.dateValue[0].getTime() : '';
                data.endCreateTime = this.dateValue[1] != '' ? this.dateValue[1].getTime() : '';
                data.checkstatus = this.checkstatus
                return data;
            },
            getToken(){
                return this.$store.state.authorization
            },
            getloginId() {
                return this.$store.state.loginId
            },
            getDetail(){
                return this.api.detailContract
            },
            getExport(){
                return this.api.exportContract
            }
        },
        watch: {
            'handleFilter': {
                handler: _.debounce(function(val, oldVal) {
                    // 是否是翻页操作
                    if (val.currentPage == oldVal.currentPage)
                        this.detail.currentPage = 1;
                    this.getAllList();
                }, 200),
                deep: true
            },
            'checkstatus' () {
                this.getAllList()
            }
        },
        filters: {
            contractStatus(str){
                switch (str) {
                    case 'a':
                    return '需要我的签名'
                    break;
                    case 'b':
                    return '等待他方签署'
                    break;
                    case '1':
                    return '已完成'
                    break;
                    case '0':
                    return '已作废'
                    break;
                    default:
                    return '全部合同'
                    break
                }
            }
        },
        methods: {
            pageChange(page) {
                this.detail.currentPage = page;
                this.getAllList();
            },
            resetFilter() {
                this.detail = {
                    contactId: '',
                    orderId: '',
                    createUser: '',
                    createUser: '',
                    firstCompanyName: '',
                    secondCompanyName: '',
                    pageSize: 10,
                    currentPage: 1
                }
                this.updateValue = ['', '']
                this.dateValue = ['', '']
            },
            // 获取列表
            getAllList() {
                this.$http.post(this.api.queryBgContractInfoPage, this.handleFilter).then(res => {
                    if (res.code === 1000) {
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
            //  合同信息
            contractInfo(data) {
                this.show = true;
                let params = {
                    contractId: data.contractId
                }
                this.$http.post(this.api.getContractInfoContractId, params).then(res => {
                    if (res.code === 1000) {
                        this.infoData = {
                            contractId: res.data.contractId,
                            contractTitle: res.data.contractTitle,
                            firstCompanyName: res.data.firstCompanyName,
                            secondCompanyName: res.data.secondCompanyName,
                            createUser: res.data.createUser,
                            updateTime: res.data.updateTime,
                            createTime: res.data.updateTime,
                            status: res.data.status,
                            order: res.data.orderInfo,
                        }
                    }
                })
            }
        },
        created() {
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .page-count {
            position: absolute;
            right: 20px;
            bottom: 10px;
        }
    }
    
    .info {
        margin: 10px 0;
        .info-title {
            text-align: right;
            padding-right: 5px;
        }
    }
</style>