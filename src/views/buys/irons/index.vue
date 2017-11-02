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
                    width: 25%;
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
                        <a @click="showDetail(item)">查看报价</a>
                        <a @click="delIron(item.id)">删除求购</a>
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
    
            <Modal v-model="show" width="1200">
                <p slot="header">
                    报价详情(有效报价：{{ offers.validSell.length }}家,错过报价：{{ offers.missSell.length }}家,总响应：{{ offers.missSell.length + offers.validSell.length }}家)
                </p>
                <div class="info" v-if="activeItem.buy">
                    <p>求购内容：</p>
                    <p>{{ `${activeItem.ironTypeName}/${activeItem.materialName}/${activeItem.surfaceName}/${activeItem.proPlacesName} (收货城市：${activeItem.locationName})` }}</p>
                    <p>规格：{{ activeItem.specifications == '' ? `${activeItem.height}*${activeItem.width}*${activeItem.length}`: activeItem.specifications }}</p>
                    <p v-show="activeItem.tolerance != ''">公差：{{ activeItem.tolerance }}</p>
                    <p>备注：{{ activeItem.remark }}</p>
                </div>
                <div class="info">
                    <p>有效报价：{{ offers.validSell.length }}家</p>
                    <Table :columns="offerHead" :data="offers.validSell"></Table>
                </div>
                <div class="info">
                    <p>错过报价：{{ offers.missSell.length }}家</p>
                    <p v-for="item in offers.missSell" :key="item.id">
                        {{ item.companyName }} — 联系人：{{item.contact}} — 联系电话：{{item.contactNum}}
                    </p>
                </div>
    
                <div slot="footer">
    
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    import ironFilter from '@/components/business/ironFilter.vue'
    import offerList from './offerList.vue'
    import {
        dateformat,
        isOfferStatus
    } from '@/utils/filters'
    export default {
        components: {
            ironFilter,
            offerList
        },
        data() {
            return {
                show: false,
                list: [],
                screenApi: {
                    currentPage: 1,
                    pageSize: 10
                },
                totalCount: 0,
                params: {},
                offers: {
                    missSell: [],
                    validSell: []
                },
                activeItem: {},
                offerHead: [{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(offerList, {
                                props: {
                                    list: params.row.ironSell
                                }
                            })
                        }
                    },
                    {
                        title: '卖家手机号',
                        key: 'contactNum'
                    },
                    {
                        title: '卖家公司名',
                        key: 'companyName'
                    },
                    {
                        title: '报价',
                        key: 'offerPerPrice',
                        render: (h, params) => {
                            return h('div', params.row.offerPerPrice + '/' + params.row.baseUnit);
                        }
                    },
                    {
                        title: '公差',
                        key: 'tolerance',
                        render: (h, params) => {
                            return h('div', params.row.tolerance != '' ? params.row.tolerance : '-');
                        }
                    },
                    {
                        title: '产地',
                        key: 'offerPlaces'
                    },
                    {
                        title: '报价时间',
                        key: 'createTime',
                        render: (h, params) => {
                            return h('div', dateformat(params.row.createTime));
                        }
                    },
                    {
                        title: '备注',
                        key: 'offerRemark',
                        ellipsis: true
                    },
                    {
                        title: '中标状态',
                        key: 'offerStatus',
                        render: (h, params) => {
                            return h('div', isOfferStatus(params.row.offerStatus));
                        }
                    }
                ]
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
            },
            getOfferInfo(id) {
                this.$http.post(this.api.findIronOffer, {
                    ironBuyId: id
                }).then(res => {
                    if (res.code === 1000) {
                        this.offers.missSell = res.data.missSell;
                        this.offers.validSell = res.data.validSell;
                    }
                })
            },
            showDetail(data) {
                this.show = true;
                this.activeItem = data;
                this.getOfferInfo(data.id)
            },
            delIron(id) {
                this.$Modal.confirm({
                    title: '删除确认！',
                    content: '删除操作将无法撤销，是否继续？',
                    onOk: () => {
                        this.$http.post(this.api.deleteIron, {
                            ironBuyId: id
                        }).then(res => {
                            if (res.code === 1000) {
                                this.screenApi.currentPage = 1;
                                this.params.currentPage = 1;
                                this.getIrons(this.params);
                            }
                        })
                    }
                })
            }
        }
    }
</script>
