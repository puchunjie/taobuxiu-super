<template>
  <div>
      <kdFilter @on-change="doFilter"></kdFilter>
      <div class="kp-list">
        <p style="text-align:center" v-show="list.length<=0">暂无数据</p>
        <div class="kp-card" v-for="(item,index) in list" :key="item.id">
             <div class="head">
                资源编号：{{ item.id }}
                <span>负责专员：{{ item.salemanName }}</span>
                <div class="action">
                    <template v-if="item.status == '1'">
                        <a @click="updateDingKai(item.id,1)">更新资源</a>
                        <a @click="updateDingKai(item.id,2)">立即下架</a> 
                        <a @click="updateDingKai(item.id,3)">删除资源</a>
                    </template>
                    <template v-else-if="item.status == '0'">
                        <a @click="updateDingKai(item.id,4)">立即上架</a>
                        <a @click="updateDingKai(item.id,3)">删除资源</a>
                    </template>
                    <template v-else-if="item.status == '2'">
                        <a @click="updateDingKai(item.id,4)">立即上架</a>
                        <a @click="updateDingKai(item.id,3)">删除资源</a>
                    </template>
                    <template v-else-if="item.status == '3'">
                        <a @click="updateDingKai(item.id,4)">立即上架</a>
                        <a @click="updateDingKai(item.id,3)">删除资源</a>
                    </template>
                    <template v-else-if="item.status == '7'">
                        <a @click="updateDingKai(item.id,4)">立即上架</a>
                    </template>
                    <template v-else-if="item.status == '9'">
                        <a @click="updateDingKai(item.id,4)">立即上架</a>
                    </template>
                    <template v-else>
                        <a @click="updateDingKai(item.id,1)">更新资源</a>
                        <a @click="updateDingKai(item.id,2)">立即下架</a> 
                        <a @click="updateDingKai(item.id,4)">立即上架</a>
                        <a @click="updateDingKai(item.id,3)">删除资源</a>
                    </template>
                </div>
            </div>
            <div class="detail clearfix">
                <div class="item">资源状态：{{item.status | dkStatus}}</div>
                <div class="item">更新时间：{{item.updateTime | dateformat}}</div>
                <div class="item">计量方式：{{item.measuringType = 1 ? "过磅" : "理计"}}</div>
                <div class="item">所属商户：{{ item.companyName }}</div>
                <div class="item">所在地：{{item.locationName}}</div>
                <div class="item">品类：{{ item.ironTypeName }}</div>
                <div class="item">材质：{{item.materialName}}</div>
                <div class="item">表面：{{item.surfaceName}}</div>
                <div class="item">产地：{{item.proPlacesName}}</div>
                <div class="item">新鲜指数：{{item.recommendPoint}}</div>
                <div class="item">规格：{{item.height}}*{{item.width}}*{{item.length}}</div>
                <div class="item">公差：{{item.tolerance}}</div>
                <div class="item">仓库：{{ item.storeHouseName }}</div>
                <div class="item">单价：{{ item.price }}元/吨</div>
                <div class="item">计划开平时间：{{item.remark}}</div>
            </div>
        </div>
        <Page :total="totalCount" @on-change="pageChange" show-total :current="screenApi.currentPage" :page-size="screenApi.pageSize"></Page>
      </div>
  </div>
</template>
<script>
import kdFilter from '@/components/business/dkFilter.vue'
import {dateformat,dkStatus} from '@/utils/filters'
export default {
    components: {
        kdFilter,
    },
    props: {
        dkCategory: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            list: [],
            params: {},
            screenApi: {
                currentPage: 1,
                pageSize: 10
            },
            totalCount: 0,
            loading: false
        }
    },
    methods: {
        doFilter(data) {
            let params = _.cloneDeep(data);
            this.screenApi.currentPage = 1;
            params.currentPage = this.screenApi.currentPage;
            params.pageSize = this.screenApi.pageSize;
            this.params = params;
            this.getkpList(params);
        },
        pageChange(page) {
            this.screenApi.currentPage = page;
            let params = _.cloneDeep(this.params);
            params.currentPage = page;
            this.getkpList(params);
        },
        //  获取列表
        getkpList(params) {
            this.$http.post(this.api.queryDingKaiList,params).then(res => {
                if(res.code === 1000){
                    this.list = res.data.list
                    this.totalCount = res.data.totalCount
                }
            })
        },
        //  删除
        updateDingKai(id,flag) {
            this.$Modal.confirm({
                title: '操作提示',
                content: '操作提示',
                onOk: () =>{
                    this.loading = true;
                    let params ={
                        id: id,
                        flag: flag
                    }
                    this.$http.post(this.api.updateDingKai, params).then(res => {
                        if(res.code === 1000){
                            this.getkpList(this.params);
                            this.$Message.success('操作成功')
                        }else{
                            this.$Message.error('操作失败')
                        }
                        this.loading = false;
                    })
                }
            })

        }
    }
  
}
</script>
<style lang="less" scoped>
    .kp-list {
        width: 100%;
        margin-top: 10px;
        .kp-card {
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
</style>


