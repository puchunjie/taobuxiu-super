<template>
    <div>
        <div class="filters">
            <Form ref="formInline" inline :label-width="120">
                <FormItem label="订单编号：" class="magin0" style="width: 280px;">
                    <Input type="text" v-model="detail.orderId" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="订单成交时间：" class="magin0">
                    <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="电子合同认证：" class="magin0">
                    <Select v-model="detail.storeType" placeholder="请选择" style="width:150px">
                        <Option v-for="item in orderType" :key="item.id" :value="item.id" >{{ item.label }}</Option>
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
                    <Col class-name="col" span="8">货品详情</Col>
                    <Col class-name="col" span="2">计量方式</Col>
                    <Col class-name="col" span="2">单价(吨/元)</Col>
                    <Col class-name="col" span="2">数量(吨)</Col>
                    <Col class-name="col" span="2">总额(元)</Col>
                    <Col class-name="col" span="2">所在地</Col>
                    <Col class-name="col" span="2">仓库</Col>
                    <Col class-name="col" span="2">订单状态</Col>
                    <Col class-name="col" span="2">订单类型</Col>
                </Row>
                <CheckboxGroup v-model="orderIds" @on-change="checkAllGroupChange">
                    <Row class="order-row" v-for="(item,index) in list" :key="item.id">
                        <Row class="rowHeader">
                            <Col span="24">
                                <span><Checkbox :label="item.id">&nbsp;</Checkbox></span>
                                <span>成交时间：{{item.updateTime | dateformat}}</span>
                                <span>订单编号：{{item.id}}</span>
                            </Col>
                        </Row>
                        <Col class-name="col" span="8">
                            {{ item.ironTypeName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ `${item.materialName}/${item.surfaceName}` }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.proPlacesName }} &nbsp;&nbsp;{{ item.specifications ? item.specifications :`${item.height}*${item.width}*${item.length}`
                            }} &nbsp;&nbsp;&nbsp;&nbsp;{{ item.tolerance | isEmpty('') }}
                        </Col>
                        <Col class-name="col" span="2">{{item.measuringType == 1 ? '过磅': '理计'}}</Col>
                        <Col class-name="col" span="2">&yen;{{item.price}}</Col>
                        <Col class-name="col" span="2">x{{ item.storeType == 0 ? item.weights != '' ? item.weights : item.numbers : item.nums }}</Col>
                        <Col class-name="col" span="2">&yen;{{item.allPrice}}</Col>
                        <Col class-name="col" span="2">{{item.locationName}}</Col>
                        <Col class-name="col" span="2">{{item.storeHouseName}}</Col>
                        <Col class-name="col" span="2">已完成</Col>
                        <Col class-name="col" span="2">{{item.storeType | orderSta}}</Col>
                    </Row>
                </CheckboxGroup>
                <Row v-if="list.length == 0">
                    <Col class-name="col" span="24">暂无数据</Col>
                </Row>
            </div>
            <div class="checkAll">
                <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                <span>共勾选{{selectLen}}条</span>
                <Button type="warning" @click.native="subOrder" size="small">下一步，确认订单内容</Button>
            </div>
            <Page class="page-count" size="small" :total="totalCount" show-total :current="detail.currentPage" :page-size="detail.pageSize" @on-change="changePage"></Page>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                detail: {
                    sellId: '',
                    buyId: '',
                    orderId: '',
                    storeType: '',
                    startTime: '',
                    endTime: '',
                    currentPage: 1,
                    pageSize: 10
                },
                dateValue: ['',''],
                orderType: [{
                    label: '实单求购',
                    id: 0
                },{
                    label: '现货资源',
                    id: 1
                },{
                    label: '定开计划',
                    id: 2
                },{
                    label: '特价资源',
                    id: 3
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
                totalCount: 0,
                orderIds: [],
                checkAll: false,
                indeterminate: false,   
                selectLen: 0
            }
        },
        computed: {
            handleData() {
                return {
                    orderId: this.detail.orderId,
                    sellId: this.sellId,
                    buyId: this.buyId,
                    storeType: this.detail.storeType,
                    startTime: this.dateValue[0] != '' ? this.dateValue[0].getTime() : '',
                    endTime: this.dateValue[1] != '' ? this.dateValue[1].getTime() : '',
                    pageSize: this.detail.pageSize,
                    currentPage: this.detail.currentPage
                }
            },
           buyId() {
                return this.$route.params.buyerId
           },
           sellId() {
                return this.$route.params.sellerId
           },
            allCheckIds(){
                let arr = [];
                this.list.forEach(el=>{
                    arr.push(el.id);
                })
                return arr
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
                this.detail = {
                    sellId: '',
                    buyId: '',
                    orderId: '',
                    storeType: '',
                    startTime: '',
                    endTime: '',
                    currentPage: 1,
                    pageSize: 10
                }
                this.dateValue = ['','']
            },
            changePage(page) {
                this.detail.currentPage = page;
                this.getAllList(this.handleData)
            },
            //  获取列表
            getAllList(){
                this.$http.post(this.api.queryBgContractOrderPage,this.handleData).then(res => {
                    if(res.code === 1000){
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount
                    }
                })
            },
            checkAllGroupChange(data) {
                this.selectLen = this.orderIds.length;
                if (data.length === this.detail.pageSize) {
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
            //  全选订单
            handleCheckAll() {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
                    this.orderIds =  this.allCheckIds;
                    this.selectLen = this.orderIds.length;
                } else {
                    this.orderIds = [];
                    this.selectLen = 0;
                }
            },
            //  提交合同订单
            subOrder() {
                if(this.orderIds.length > 0){
                    this.saveContractInfo()
                    this.$router.push('step4')
                }else{
                    this.$Message.error('请先选择订单')
                }
            },
            // 本地保存合同信息
            saveContractInfo(){
                this.$ls.set('contractInfo', this.$clearData({
                    buyId: this.buyId,
                    sellId: this.sellId,
                    orderIds: this.orderIds
                }));
            }
        },
        created () {
            this.getAllList();
        }
    }
</script>
<style lang='less' scoped>
    .filters {
        margin: 20px 0;
    }
    
    .card-contnet {
        position: relative;
        padding-bottom: 60px;
    }
    
    .table-contnet {
        line-height: 40px;
        text-align: center;
        border-top: 1px solid #d0d0d0;
        .order-row{
            margin-top: 15px;
            border-left: 1px solid #d0d0d0;
        }
        .head {
            background-color: #ddd;
        }
        .rowHeader{
            text-align: left;
            background-color: #EDEEF2;
            border-top: 1px solid #d0d0d0;
            border-right: 1px solid #d0d0d0;
            span{
                display: inline-block;
                margin-left: 40px;
            }
            span:first-child{
                margin-left: 20px;
                label{
                    span:last-child{
                        display: none;
                    }
                }
            }
        }
        .col {
            padding: 0 5px;
            border-right: 1px solid #d0d0d0;
            border-bottom: 1px solid #d0d0d0;
            border-top: 1px solid #d0d0d0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .checkAll{
        position: absolute;
        left: 0;
        bottom: 10px;
    }
    .page-count {
        position: absolute;
        right: 0;
        bottom: 10px;
    }
</style>