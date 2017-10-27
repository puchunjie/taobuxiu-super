<style lang="less" scoped>
    .iron-list {
        width: 100%;
        margin-top: 10px;
        .iron-card {
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

                .action{
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
                    width: 25%;
                    height: 40px;
                    line-height: 40px;
                    float: left;
                }
            }
        }
    }
</style>

<template>
    <div class="iron-buys-container">
        <ironFilter @on-change="doFilter"></ironFilter>
        <div class="iron-list">
            <p style="text-align:center" v-show="list.length<=0">暂无数据</p>
            <div class="iron-card" v-for="(item,index) in list" :key="item.id">
                <div class="head">
                    求购编号：{{ item.id }}
                    <span> ({{ item.salesManName }}  {{ item.salesManTel }})</span>
                    <div class="action">
                        <a>求购详情</a> | <a>查看报价</a>
                    </div>
                </div>
                <div class="detail clearfix">
                    <div class="item">求购状态：{{ item.buyStatus | statusStr }}</div>
                    <div class="item">发起时间：{{ item.createTime | dateformat }}</div>
                    <div class="item">报价期限：{{ (item.createTime+item.timeLimit) | dateformat }}</div>
                    <div class="item">成交时间：{{ item.sell != '' ? dateformat(item.updateTime) : '暂无'}}</div>
                    <div class="item">买家手机号：{{ item.buy.contactNum }}</div>
                    <div class="item">买家公司：{{ item.buy.companyName }}</div>
                    <div class="item">卖家手机号：{{ item.sell != '' ? item.sell.contactNum : '暂无' }}</div>
                    <div class="item">卖家公司：{{ item.sell != '' ? item.sell.companyName : '暂无' }}</div>
                    <div class="item">求购数量：{{ item.numbers != '' ? `${item.numbers}${item.numberUnit}` : '—' }}/{{ item.weights != '' ? `${item.weights}${item.weightUnit}` : '—' }}</div>
                    <div class="item">中标单价：{{ item.sell != '' ? item.sell.sellPerPrice : '暂无' }}</div>
                    <div class="item">成交总额：{{ item.sell != '' ? item.sell.sellTotalPrice : '暂无' }}</div>
                    <div class="item">发布平台：{{ item.appFlag | wherePublish }}</div>
                </div>
            </div>
            <Page :total="totalCount" @on-change="pageChange" show-total :current="screenApi.currentPage" :page-size="screenApi.pageSize"></Page>
        </div>
    </div>
</template>

<script>
    import ironFilter from '@/components/business/ironFilter.vue'
    import {
        dateformat
    } from '@/utils/filters'
    export default {
        components: {
            ironFilter
        },
        data() {
            return {
                list: [],
                screenApi: {
                    currentPage: 1,
                    pageSize: 10
                },
                totalCount: 0,
                params: {}
            }
        },
        methods: {
            getIrons(params) {
                this.$http.post(this.api.queryIrons, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.result;
                        this.totalCount = res.data.totalCount;
                    }
                })
            },
            doFilter(data) {
                let params = _.cloneDeep(data);
                this.screenApi.currentPage = 1;
                params.currentPage = this.screenApi.currentPage;
                params.pageSize = this.screenApi.pageSize;
                this.params = params;
                this.getIrons(params);
            },
            dateformat(val) {
                return dateformat(val)
            },
            pageChange(page) {
                this.screenApi.currentPage = page;
                let params = _.cloneDeep(this.params);
                params.currentPage = page;
                this.getIrons(params);
            }
        }
    }
</script>
