<template>
    <div class="quality-container">
        <div class="filter-bar">
            <Form ref="formInline" inline :label-width="100">
                <FormItem label="处理状态：" class="magin0">
                    <RadioGroup v-model="apiData.applyStatus">
                        <Radio label="">全部</Radio>
                        <Radio label="0">未处理</Radio>
                        <Radio label="1">正在处理</Radio>
                        <Radio label="2">已完成</Radio>
                        <Radio label="3">已取消</Radio>
                        <Radio label="4">已删除</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="申请商户：" class="magin0">
                    <Input type="text" v-model="apiData.applyCompany" placeholder="输入申请商户名称"></Input>
                </FormItem>
                <FormItem label="申请商户账号：" class="magin0">
                    <Input type="text" v-model="apiData.applyPhone" placeholder="输入申请商户账号"></Input>
                </FormItem>
                <FormItem label="质检商户：" class="magin0">
                    <Input type="text" v-model="apiData.company" placeholder="输入质检商户名称"></Input>
                </FormItem>
                <FormItem label="联系电话" class="magin0">
                    <Input type="text" v-model="apiData.contact" placeholder="输入联系电话"></Input>
                </FormItem>
                <FormItem label="提交申请时间：" class="magin0">
                    <DatePicker type="daterange" :options="dateOption" v-model="time" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
            </Form>
        </div>
        <div class="item-group" v-for="(item,index) in list" :key="item.id">
            <div class="head">
                申请商户：{{ item.companyName }}
                <span class="iconfont icon-cheng" style="color:#F5A623" v-show="item.isFaithUser == 1"></span>
                <span class="iconfont icon-bao" style="color:#C16BD6" v-show="item.isGuaranteeUser == 1"></span>
                <span class="status" :class="'status'+item.applyStatus ">{{ item.applyStatus | statusStr }}</span>
                <ButtonGroup style="float:right;margin-top:10px" size="small">
                    <Button type="primary" @click="act({id:item.id,applyStatus:1},index)">开始处理</Button>
                    <Button type="primary" @click="act({id:item.id,applyStatus:2},index)">质检完成</Button>
                    <Button type="primary" @click="act({id:item.id,applyStatus:3},index)">取消质检</Button>
                    <Button type="primary" @click="act({id:item.id,applyStatus:4},index)">删除质检</Button>
                </ButtonGroup>
            </div>
            <div class="card clearfix">
                <div class="item">提交申请：{{ item.createTime | dateformat }}</div>
                <div class="item">质检时间：{{ item.inDoorTime }}</div>
                <div class="item">质检联系人：{{ item.contactName }}</div>
                <div class="item">质检联系方式：{{ item.contactPhone }}</div>
                <div class="item">申请账号：{{ item.contactNum }}</div>
                <div class="item">质检用户：{{ item.company }}万</div>
                <div class="item">质检地点：{{ item.place }}</div>
                <div class="item">负责专员：{{ item.saleman }}</div>
            </div>
        </div>
    
        <Page :total="totalCount" @on-change="pageChange" show-total :current="apiData.currentPage" :page-size="apiData.pageSize"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                totalCount: 0,
                time: ['', ''],
                apiData: {
                    applyStatus: '',
                    applyCompany: '',
                    applyPhone: '',
                    company: '',
                    contact: '',
                    beforeTime: '',
                    afterTime: '',
                    currentPage: 1,
                    pageSize: 10
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
                }
            }
        },
        computed: {
            handleData() {
                return {
                    applyStatus: this.apiData.applyStatus,
                    applyCompany: this.apiData.applyCompany,
                    applyPhone: this.apiData.applyPhone,
                    company: this.apiData.company,
                    contact: this.apiData.contact,
                    beforeTime: this.time[0] != '' ? new Date(this.time[0]).getTime() : '',
                    afterTime: this.time[1] != '' ? new Date(this.time[1]).getTime() : '',
                    currentPage: this.apiData.currentPage,
                    pageSize: this.apiData.pageSize
                }
            }
        },
        watch: {
            handleData: _.debounce(function(val) {
                this.getData(val)
            }, 200)
    
        },
        filters: {
            statusStr(val) {
                switch (val * 1) {
                    case 0:
                        return '未处理 '
                        break;
                    case 1:
                        return '正在处理 '
                        break;
                    case 2:
                        return '已完成 '
                        break;
                    case 3:
                        return '已取消 '
                        break;
                    case 4:
                        return '已删除'
                        break;
                    default:
                        break;
                }
            }
        },
        methods: {
            getData(val) {
                this.$http.get(this.api.get_quality, {
                    params: val
                }).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.result;
                        this.totalCount = res.data.totalCount;
                    }
                })
            },
            pageChange(page) {
                this.apiData.currentPage = page;
            },
            // 处理
            act(data,i){
                this.$http.get(this.api.get_actQua,{
                    params:{
                        id: data.id,
                        applyStatus: data.applyStatus
                    }
                }).then(res => {
                    if(res.code === 1000){
                        this.$Message.success('操作成功！');
                        this.list[i].applyStatus = data.applyStatus;
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
        },
        created() {
            this.getData(this.handleData)
        }
    }
</script>


<style lang="less" scoped>
    .quality-container {
        width: 100%;
        .filter-bar {
            width: 100%;
            padding: 10px 10px 0 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            margin-bottom: 10px;
            .magin0 {
                margin-bottom: 10px;
            }
        }
        .item-group {
            width: 100%;
            background-color: #fff;
            border: 1px solid #ddd;
            margin-bottom: 10px;
            .head {
                position: relative;
                padding: 0 10px;
                border-bottom: 1px solid #ddd;
                height: 40px;
                line-height: 40px;
                font-weight: bold;
                .status {
                    display: inline-block;
                    padding: 0 5px;
                    text-align: center;
                    line-height: 20px;
                    border-radius: 5px;
                    color: #fff;
                    margin-left: 10px;
                    &.status0 {
                        background-color: #007de4;
                    }
                    &.status1 {
                        background-color: #ffa500;
                    }
                    &.status2 {
                        background-color: green;
                    }
                    &.status3,&.status4 {
                        background-color: gray;
                    }
                }
            }
            .card {
                padding: 10px;
                .item {
                    float: left;
                    width: 25%;
                    height: 30px;
                    line-height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
