<style lang="less" scoped>
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
</style>

<template>
    <div class="business-container">
        <div class="filter-bar">
            <Form ref="formInline" inline :label-width="100">
                <FormItem label="商户名称：" class="magin0">
                    <Input type="text" :value="apiData.name" @input="asyncValue($event)" placeholder="输入商家名称"></Input>
                </FormItem>
                <FormItem label="诚信商户：" class="magin0">
                    <i-switch v-model="apiData.isFU">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="担保商户：" class="magin0">
                    <i-switch v-model="apiData.isGU">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="开通店铺：" class="magin0">
                    <i-switch v-model="apiData.isHS">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="注册商户：" class="magin0">
                    <DatePicker type="daterange" :options="dateOption" v-model="apiData.bUTime" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="成为诚信商户：" class="magin0">
                    <DatePicker type="daterange" :options="dateOption" v-model="apiData.bFUTime" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="成为担保商户：" class="magin0">
                    <DatePicker type="daterange" :options="dateOption" v-model="apiData.bGUTime" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="开通店铺时间：" class="magin0">
                    <DatePicker type="daterange" :options="dateOption" v-model="apiData.bHSTime" placement="bottom-end" placeholder="选择日期"></DatePicker>
                </FormItem>
            </Form>
            <div style="margin-bottom:10px;text-align:right">
                <Button type="warning" @click="reset">清空筛选</Button>
            </div>
        </div>
        <div class="item-group" v-for="(item,index) in list" :key="item.id">
            <div class="head">
                {{ item.companyName }}
                <span class="iconfont icon-cheng" style="color:#F5A623" v-show="item.isFaithUser == 1"></span>
                <span class="iconfont icon-bao" style="color:#C16BD6" v-show="item.isGuaranteeUser == 1"></span>
                <span class="iconfont icon-dian" style="color:#57c5f7" v-show="item.isHaveShop == 1"></span>
                <Button style="float:right;margin-top:10px" size="small" type="info" @click="showInfo(index)">详情</Button>
                <Button style="float:right;margin-top:10px;margin-right:10px;" size="small" type="info" @click="showRangeInfo(index)">报价经营范围</Button>
            </div>
            <div class="card clearfix">
                <div class="item">入驻时间：{{ item.beBuserTime | dateformat }}</div>
                <div class="item">注册账号：{{ item.buserMobile }}</div>
                <div class="item">联系人：{{ item.contact }}</div>
                <div class="item">联系方式：{{ item.contactNum }}</div>
                <div class="item">办公地址：{{ item.address }}</div>
                <div class="item">注册资金：{{ item.regMoney }}万</div>
                <div class="item">负责专员：{{ item.salesManName }}</div>
                <div class="item">专员手机：{{ item.salesManMobile }}</div>
            </div>
        </div>
    
        <Page :total="totalCount" @on-change="pageChange" show-total :current="apiData.currentPage" :page-size="apiData.pageSize"></Page>
    
    
        <Modal title="商家详情编辑" v-model="showEdit" loading :mask-closable="false" @on-ok="edit">
            <Form :label-width="100">
                <FormItem label="商户名称">
                    {{ activeItem.companyName }}
                </FormItem>
                <FormItem label="诚信商家">
                    <i-switch size="large" v-model="editData.isFaithUser">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="担保商家">
                    <i-switch size="large" v-model="editData.isGuaranteeUser">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="开通店铺">
                    <i-switch size="large" v-model="editData.isHaveShop">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="成为诚信商家" v-if="activeItem.isFaithUser == 1">
                    {{ activeItem.beFaithUserTime | dateformat }}
                </FormItem>
                <FormItem label="开通店铺时间" v-if="activeItem.isHaveShop == 1">
                    {{ activeItem.beHaveShopTime | dateformat }}
                </FormItem>
                <FormItem label="成为担保商家" v-if="activeItem.isGuaranteeUser == 1">
                    {{ activeItem.beGuaranteeUserTime | dateformat }}
                </FormItem>
                <FormItem label="QQ" >
                    <Input v-model="editData.qq" placeholder="请输入qq"></Input>
                </FormItem>
                <FormItem label="仓库">
                    <ajaxSelect class="form-input" :api="api.getStroeHouse" :value="editData.storeHouseId+'-'+editData.storeHouseName" @on-select="asyncStore"></ajaxSelect>
                </FormItem>
                <FormItem label="商户优惠信息">
                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="editData.proInfo" placeholder="请输入..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal title="报价经营范围" width="900" v-model="showRange" loading :mask-closable="false" @on-ok="saveScope">
            <rang v-if="showRange" :id= "activeItem.userId" ref="scope"></rang>
        </Modal>
    </div>
</template>

<script>
import rang from './rangInfor';
import ajaxSelect from '@/components/basics/ajaxSelect' 
    export default {
        components: {
            rang,
            ajaxSelect

        },
        data() {
            return {
                showEdit: false,
                showRange: false,
                apiData: {
                    name: '',
                    isFU: false,
                    isGU: false,
                    isHS: false,
                    bUTime: ['',''],
                    bFUTime: ['',''],
                    bGUTime: ['',''],
                    bHSTime: ['',''],
                    currentPage: 1,
                    pageSize: 10
                },
                list: [],
                houseList: [],
                totalCount: 0,
                activeIndex: 0,
                editData:{
                    userId: '',
                    isFaithUser: false,
                    isGuaranteeUser: false,
                    isStore: false,
                    isHaveShop: false,
                    qq: '',
                    storeHouseId:'',
                    storeHouseName:'',
                    proInfo: ''
                },
                dateOption:{
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
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
            pipApi() {
                return {
                    name: this.apiData.name.replace(/'/g, ''),
                    isFU: this.apiData.isFU ? 1 : '',
                    isGU: this.apiData.isGU ? 1 : '',
                    isHS: this.apiData.isHS ? 1 : '',
                    bUStartTime: this.apiData.bUTime[0] != '' && this.apiData.bUTime[0] != null ? this.apiData.bUTime[0].getTime() : '',
                    bUEndTime: this.apiData.bUTime[1] != '' && this.apiData.bUTime[1] != null ? this.apiData.bUTime[1].getTime() : '',
                    bFUStartTime: this.apiData.bFUTime[0] != '' && this.apiData.bFUTime[0] != null ? this.apiData.bFUTime[0].getTime() : '',
                    bFUEndTime: this.apiData.bFUTime[1] != '' && this.apiData.bFUTime[1] != null ? this.apiData.bFUTime[1].getTime() : '',
                    bGUStartTime: this.apiData.bGUTime[0] != '' && this.apiData.bGUTime[0] != null ? this.apiData.bGUTime[0].getTime() : '',
                    bGUEndTime: this.apiData.bGUTime[1] != '' && this.apiData.bGUTime[1] != null ? this.apiData.bGUTime[1].getTime() : '',
                    bHSStartTime: this.apiData.bHSTime[0] != '' && this.apiData.bHSTime[0] != null ? this.apiData.bHSTime[0].getTime() : '',
                    bHSEndTime: this.apiData.bHSTime[1] != '' && this.apiData.bHSTime[1] != null ? this.apiData.bHSTime[1].getTime() : '',
                    currentPage: this.apiData.currentPage,
                    pageSize: this.apiData.pageSize
                }
            },
            activeItem() {
                return this.list.length > 0 ? this.list[this.activeIndex] : {}
            }
        },
        methods: {
            // 商户列表
            getBusinesses() {
                this.$http.post(this.api.getBusiness, this.pipApi).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list;
                        this.totalCount = res.data.totalCount;
                    }
                })
            },
            showInfo(i) {
                // this.getStroeHouse();
                this.activeIndex = i;
                let data = _.cloneDeep(this.activeItem);
                this.editData.userId = data.userId;
                this.editData.isFaithUser = data.isFaithUser == 1;
                this.editData.isGuaranteeUser = data.isGuaranteeUser == 1;
                this.editData.isHaveShop = data.isHaveShop == 1;
                this.editData.proInfo = data.proInfo;
                this.editData.storeHouseId = data.storeHouseId;
                this.editData.storeHouseName = data.storeHouseName;
                this.editData.qq = data.qq;
                this.showEdit = true;
            },
            showRangeInfo(index) {
                this.activeIndex = index;
                this.showRange = true;
            },
            asyncStore(data) {
                this.editData.storeHouseId = data.id;
                this.editData.storeHouseName = data.name;
            },
            edit(){
                let params = _.cloneDeep(this.editData);
                params.isFaithUser = params.isFaithUser ? 1 : 0;
                params.isGuaranteeUser = params.isGuaranteeUser ? 1 : 0;
                params.isHaveShop = params.isHaveShop ? 1 : 0;
                this.$http.post(this.api.eidtBusiness,params).then(res => {
                    if(res.code === 1000){
                        this.$Message.success('修改成功！');
                        this.getBusinesses();
                    }else{
                        this.$Message.error('修改失败');
                    }
                    this.showEdit = false;
                })
            },
            // 分页
            pageChange(page) {
                this.apiData.currentPage = page;
            },
            // 获取仓库
            getStroeHouse() {
                this.$http.post(this.api.getStroeHouse).then(res => {
                    if(res.code === 1000){
                        this.houseList = res.data;      
                    }
                })
            },
            // 清空筛选
            reset() {
                this.apiData = {
                    name: '',
                    isFU: false,
                    isGU: false,
                    isHS: false,
                    bUTime: ['',''],
                    bFUTime: ['',''],
                    bGUTime: ['',''],
                    bHSTime: ['',''],
                    currentPage: 1,
                    pageSize: 10
                }
            },
            // 实时检索
            asyncValue: _.debounce(function(value) {
                this.apiData.currentPage = 1;
                this.apiData.name = value;
                this.getBusinesses();
            }, 500),
            //  保存经营范围
            saveScope() {
                this.$refs.scope.saveScope();
                this.showRange = false;
            }
        },
        watch: {
            pipApi(a,b) {
                // 如果分页参数没变过，其他筛选参数变了，说明是筛选不是分页，把页码设为1
                if(a.currentPage == b.currentPage)
                    this.apiData.currentPage = 1;
                this.getBusinesses();
            }
        },
        created() {
            this.getBusinesses();
        }
    }
</script>
