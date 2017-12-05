<template>
    <div>
        <filterForm @on-change="doFilter"></filterForm>
        <div class="order-list">
            <p style="text-align:center" v-show="list.length<=0">暂无数据</p>
            <div class="order-card" v-for="(item,index) in list" :key="item.orderId">
                <div class="head">
                    订单编号：{{item.orderId}}
                    <span>负责专员：{{ item.salemanName }}</span>
                    <div class="action">
                       <a @click="contactOrder(true,item)">查看资源</a>
                       <a @click="contactOrder(false,item)">联系双方</a>
                        <template v-if="item.status == '2'">
                            <a @click="updateOrderInfo(item.orderId,6)">取消订单</a> 
                            <a @click="updateOrderInfo(item.orderId,9)">删除资源</a>
                        </template>
                        <template v-else-if="item.status == '3' || item.status == '4' || item.status == '5' || item.status == '6'">
                            <a @click="updateOrderInfo(item.orderId,9)">删除资源</a>
                        </template>
                    </div>
                </div>
                <div class="detail clearfix">
                    <div class="item">资源状态：{{item.status | orderStatus}}</div>
                    <div class="item">下单时间：{{item.createTime | dateformat}}</div>
                    <div class="item">买方公司：{{item.buyCompanyName}}</div>
                    <div class="item">卖方公司：{{item.sellCompanyName}}</div>
                    <div class="item">资源所在地：{{item.locationName}}</div>
                    <div class="item">品类：{{item.ironTypeName}}</div>
                    <div class="item">材质：{{item.materialName}}</div>
                    <div class="item">表面：{{item.surfaceName}}</div>
                    <div class="item">产地：{{item.proPlacesName}}</div>
                    <div class="item">下单新鲜度：{{item.recommendPoint}}- 最近更新于{{item.createTime | getDateDiff(now = `${item.updateTime}`)}}</div>
                    <div class="item">规格：{{ item.specifications != '' ? item.specifications : `${item.height}*${item.width}*${item.length}`}}</div>
                    <div class="item">公差：{{item.tolerance}}</div>
                    <div class="item">仓库：{{item.storeHouseName}}</div>
                    <div class="item">单价：{{item.price}}元/吨</div>
                    <div class="item">购买数量：{{item.numbers}}</div>
                    <div class="item">计量方式：{{item.measuringType = 1 ? "过磅" : "理计"}}</div>
                    <div class="item">交易总额：{{item.allPrice}}元</div>
                    <template v-if="item.status == 2">
                        <div class="item">
                            有效时间： 
                            <countDown :normal="true" :endTime="item.createTime + item.validity" :nowTime="item.serverTime"></countDown>
                        </div>
                    </template>
                    <template v-else-if="item.status == 6">
                        <div class="item">
                            取消时间：{{item.updateTime | dateformat}} 
                        </div>
                    </template>
                    <template v-else-if="item.status == 9">
                        <div class="item">
                            删除时间：{{item.updateTime | dateformat}} 
                        </div>
                    </template>
                    <div class="item">是否含税：{{item.taxType = 1 ? '含税' : '不含税'}}</div>
                </div>
            </div>
            <Page :total="totalCount" @on-change="pageChange" show-total :current="screenApi.currentPage" :page-size="screenApi.pageSize"></Page>
        </div>
        <Modal v-model="show" :title="isFind ? '查看资源' : '联系双方'" :closable="false" :mask-closable="false">
            <template v-if="isFind">
                <div class="info-item">资源编号：{{resourseData.id}}</div>
                <div class="info-item">资源状态：{{resourseData.status | dkStatus}}</div>
                <div class="info-item">更新时间：{{resourseData.updateTime | dateformat}}</div>
                <div class="info-item">负责专员：{{resourseData.salemanName}}</div>
                <div class="info-item">所属商户：{{resourseData.createUser}}</div>
                <div class="info-item">所属地区：{{resourseData.locationName}}</div>
                <div class="info-item">计量方式：{{resourseData.measuringType = 1 ? "过磅" : "理计"}}</div>
                <div class="info-item">推荐指数：{{resourseData.recommendPoint}}</div>
                <div class="info-item">品类：{{resourseData.ironTypeName}}</div>
                <div class="info-item">材质：{{resourseData.materialName}}</div>
                <div class="info-item">表面：{{resourseData.surfaceName}}</div>
                <div class="info-item">产地：{{resourseData.proPlacesName}}</div>
                <div class="info-item">规格：{{ resourseData.specifications != '' ? resourseData.specifications : `${resourseData.height}*${resourseData.width}*${resourseData.length}`}}</div>
                <div class="info-item">单价：{{resourseData.price}}元/吨</div>
                <div class="info-item">仓库：{{resourseData.storeHouseName}}</div>
            </template> 
             <template v-else>
                <div class="info-item">买方公司名称：{{contactData.buyCompanyName}}</div>
                <div class="info-item">买方公司账号：{{contactData.buyMobile}}</div>
                <div class="info-item">卖方公司名称：{{contactData.sellCompanyName}}</div>
                <div class="info-item">卖方公司名称：{{contactData.sellMobile}}</div>
            </template> 
            <div slot="footer">
                <Button type="primary" @click="closed">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import filterForm from '../orderFilter/specialFilter'
import countDown from '@/components/basics/countDown'
import {orderStatus,dateformat,getDateDiff,dkStatus} from '@/utils/filters.js'
export default {
    components: {
        filterForm,
        countDown
    },
    data () {
        return {
            params: {},
            screenApi: {
                pageSize: 10,
                currentPage: 0
            },
            list: [],
            totalCount: 0,
            loading: false,
            contactData: {
                buyCompanyName: '',
                buyMobile: '',
                sellCompanyName: '',
                sellMobile: ''
            },
            show: false,
            isFind: false,
            resourseData: {
                createUser: '',
                height: '',
                id: '',
                ironTypeName: '',
                length: '',
                locationName: '',
                materialName: '',
                measuringType: '',
                price: '',
                proPlacesName: '',
                recommendPoint: '',
                salemanName: '',
                specifications: '',
                status: '',
                storeHouseName: '',
                surfaceName: '',
                tolerance: '',
                updateTime: '',
                width: ''
            }
        }
    },
    methods: {
        //  筛选
        doFilter(data){
            let params = _.cloneDeep(data);
            this.screenApi.currentPage = 1;
            params.pageSize = this.screenApi.pageSize;
            params.currentPage = this.screenApi.currentPage;
            this.params = params;
            this.getAllList(params)
        },
        // 分页
        pageChange(page) {
            this.screenApi.currentPage = page;
            let params = _.cloneDeep(this.params);
            params.currentPage = page;
            this.getAllList(params);
        },
        //  获取特价资源订单列表
        getAllList(params) {
            this.$http.post(this.api.findSpecialOrdersByPage,params).then(res => {
                if(res.code === 1000){
                    this.list = res.data.list;
                    this.totalCount = res.data.totalCount
                }
            })
        },
        //  状态态操作
        updateOrderInfo(id,status) {
            this.$Modal.confirm({
                title: '操作提示！',
                content: '操作后不可修改，确认操作？',
                onOk: () => {
                    this.loading = true
                    let params = {  
                        id: id,
                        status: status
                    }
                    this.$http.post(this.api.updateOrderStatusById, params).then(res => {
                        if(res.code === 1000){
                            this.$Message.success('操作成功')
                            this.getAllList(this.params);
                        }else{
                            this.$Message.error('操作失败')
                        }
                        this.loading = false
                    })
                }
            })
        },
        //  联系双方
        contactOrder(isFind,data) {
            this.isFind = isFind;
            if(isFind){
                let params = {
                    id: data.storeId,
                    type: data.storeType
                }
                this.$http.post(this.api.findGoodsInfoById,params).then(res => {
                    if(res.code === 1000){
                        this.resourseData.createUser = res.data[0].createUser,
                        this.resourseData.height = res.data[0].height,
                        this.resourseData.id = res.data[0].id,
                        this.resourseData.ironTypeName = res.data[0].ironTypeName,
                        this.resourseData.length = res.data[0].length,
                        this.resourseData.locationName = res.data[0].locationName,
                        this.resourseData.materialName = res.data[0].materialName,
                        this.resourseData.measuringType = res.data[0].measuringType,
                        this.resourseData.price = res.data[0].price,
                        this.resourseData.proPlacesName = res.data[0].proPlacesName,
                        this.resourseData.recommendPoint = res.data[0].recommendPoint,
                        this.resourseData.salemanName = res.data[0].salemanName,
                        this.resourseData.specifications = res.data[0].specifications,
                        this.resourseData.status = res.data[0].status,
                        this.resourseData.storeHouseName = res.data[0].storeHouseName,
                        this.resourseData.surfaceName = res.data[0].surfaceName,
                        this.resourseData.tolerance = res.data[0].tolerance,
                        this.resourseData.updateTime = res.data[0].updateTime,
                        this.resourseData.width = res.data[0].width
                    }
                })
            }else{
                this.contactData = {
                    buyCompanyName: data.buyCompanyName,
                    buyMobile: data.buyMobile,
                    sellCompanyName: data.sellCompanyName,
                    sellMobile: data.sellMobile
                }
            }
            this.show = true;
        },
        // 关闭联系双方、查看资源
        closed() {
            this.show = false;
        }
    },
    created () {
    }
}
</script>
<style lang="less" scoped>
    .order-list {
        width: 100%;
        margin-top: 10px;
        .order-card {
            width: 100%;
            background-color: #fff;
            margin-bottom: 10px;
            font-size: 14px;
            border: 1px solid #ddd;
            color: #000;
            .head {
                position: relative;
                width: 100%;
                padding: 10px 20px;
                border-bottom: 1px solid #ddd;
                span {
                    margin-left: 20px;
                }
                .action {
                    position: absolute;
                    right: 20px;
                    top: 10px;
                    color: #007de4;
                }
            }
            .detail {
                width: 100%;
                padding: 10px 20px;
                .item {
                    width: 20%;
                    height: 40px;
                    line-height: 40px;
                    float: left;
                }
            }
        }
    }
    
    .info {
        padding: 10px 0;
        line-height: 24px;
        font-size: 14px;
        .offer {
            margin-left: 20px;
            &:first-child {
                margin-left: 0;
            }
        }
    }
    .info-item{
        font-size: 14px;
        margin: 10px 0;
    }
</style>

