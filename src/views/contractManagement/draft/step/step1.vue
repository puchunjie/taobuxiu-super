<template>
    <div>
        <div class="filters">
            <Form ref="formInline" inline :label-width="120">
                <FormItem label="买家公司名称：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.buyName" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="最近订单成交时间：" class="magin0">
                    <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="买家手机号：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.contactNum" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="电子合同认证：" class="magin0">
                    <Select v-model="detail.contractStatus" placeholder="请选择" style="width:150px">
                        <Option v-for="item in contractStatusData" :key="item.id" :value="item.id" >{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="warning" @click.native="resetFilter">清除</Button>
                </FormItem>
            </Form>
        </div>
        <div class="card-contnet">
            <div class="table-contnet">
                <Row class-name="head">
                    <Col class-name="col" span="6">买家公司名称</Col>
                    <Col class-name="col" span="3">联系方式</Col>
                    <Col class-name="col" span="3">电子合同认证</Col>
                    <Col class-name="col" span="4">可签约订单总数</Col>
                    <Col class-name="col" span="4">最近成交时间</Col>
                    <Col class-name="col" span="4">操作</Col>
                </Row>
                <Row v-for="(item,index) in list" :key="item.buyerId">
                    <Col class-name="col" span="6">{{item.buyName}}</Col>
                    <Col class-name="col" span="3">{{item.contactNum}}</Col>
                    <Col class-name="col" span="3">{{item.contractStatus | authStatus}}</Col>
                    <Col class-name="col" span="4">{{item.orderNum}}</Col>
                    <Col class-name="col" span="4">{{item.updateTime}}</Col>
                    <Col class-name="col" span="4">
                        <template v-if="item.contractStatus == 1">
                            <Button type="warning" @click="goRouter(item)" size="small">选择买家</Button>
                        </template>
                        <template v-else>
                            暂未认证
                        </template>
                    </Col>
                </Row>
                <Row v-if="list.length == 0">
                    <Col class-name="col" span="24">暂无数据</Col>
                </Row>
            </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="detail.currentPage" :page-size="detail.pageSize" @on-change="changePage"></Page>
        </div>
    </div>
</template>

<script>
import {authStatus} from '@/utils/filters.js'
    export default {
        data() {
            return {
                dateValue: ['', ''],
                detail: {
                    buyName: '',
                    contactNum: '',
                    contractStatus: '',
                    startTime: '',
                    endTime: '',
                    pageSize: 10,
                    currentPage: 1
                },
                contractStatusData: [{
                    label: '申请保存',
                    id: 0
                }, {
                    label: '认证成功',
                    id: 1
                }, {
                    label: '待审核',
                    id: 2
                }, {
                    label: '认证失败',
                    id: 9
                }, {
                    label: '未认证',
                    id: 'd'
                }],
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
                list: [],
                totalCount: 0
            }
        },
        computed: {
            handleData() {
                return {
                    buyName: this.detail.buyName,
                    contactNum: this.detail.contactNum,
                    contractStatus: this.detail.contractStatus,
                    startTime: this.dateValue[0] != '' ? this.dateValue[0].getTime() : '',
                    endTime: this.dateValue[1] != '' ? this.dateValue[1].getTime() : '',
                    pageSize: this.detail.pageSize,
                    currentPage: this.detail.currentPage
                }
            }
        },
        watch: {
            'handleData': {
                handler: _.debounce(function(val, oldVal) {
                    // 是否是翻页操作
                    if(val.currentPage == oldVal.currentPage)
                        this.detail.currentPage = 1;
                    this.getAllList();
                }, 200),
                deep: true
            }
        },
        methods: {
            resetFilter() {
                this.dateValue = ['', ''];
                this.detail = {
                    buyName: '',
                    contactNum: '',
                    contractStatus: '',
                    startTime: '',
                    endTime: '',
                    pageSize: 10,
                    currentPage: 1
                }
            },
            changePage(page) {
                this.detail.currentPage = page;
                this.getAllList(this.handleData)
            },
            getAllList() {
                this.$http.post(this.api.queryBgBuyContractMangerPage, this.handleData).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount
                    }
                })
            },
            goRouter(data) {
                this.$router.push('step2-' + data.buyId)
            }
        },
        created() {
            this.getAllList()
        }
    }
</script>

<style lang='less' scoped>
    .filters {
        margin: 20px 0;
    }
    
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
        bottom: 10px;
    }
</style>