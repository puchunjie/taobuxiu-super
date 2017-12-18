<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title" class="title">电子合同待审核列表</p>
            <div class="card-contnet">
                <div class="table-contnet">
                    <Row class-name="head">
                        <Col class-name="col" span="4">商户名称</Col>
                        <Col class-name="col" span="3">用户类型</Col>
                        <Col class-name="col" span="3">认证证件类型</Col>
                        <Col class-name="col" span="3">负责人姓名</Col>
                        <Col class-name="col" span="3">负责人手机号</Col>
                        <Col class-name="col" span="3">认证状态</Col>
                        <Col class-name="col" span="3">提交审核时间</Col>
                        <Col class-name="col" span="2">操作</Col>
                    </Row>
                    <Row v-for="item in list" :key="item.appUserId">
                        <Col class-name="col" span="4">{{item.companyName}}</Col>
                        <Col class-name="col" span="3">{{item.userType | userTypeStu}}</Col>
                        <Col class-name="col" span="3">{{item.certifyType | certifyTypeStu}}</Col>
                        <Col class-name="col" span="3">{{item.legalPersonName}}</Col>
                        <Col class-name="col" span="3">{{item.legalPersonMobile}}</Col>
                        <Col class-name="col" span="3" style="color:#ff9900">{{item.status | authStatus}}</Col>
                        <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
                        <Col class-name="col" span="2">
                            <Button type="warning" size="small" @click="$router.push('/authDetail-'+item.appUserId + '-'+ 1)">审核</Button>
                        </Col>
                    </Row>
                    <Row v-if="list.length == 0">
                    <Col class-name="col" span="24">暂无数据</Col>
                    </Row>
                </div>
                <Page class="page-count" size="small" :total="totalCount" show-total :current="filterData.currentPage" :page-size="filterData.pageSize" @on-change="changePage"></Page>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filterData: {
                    status: 2,
                    companyName: '',
                    legalPersonMobile: '',
                    certifyNumber: '',
                    userType: '',
                    timeStart: '',
                    timeEnd: '',
                    certifyType: '',
                    certifyNumber: '',
                    currentPage: 1,
                    pageSize: 10
                },
                list: [],
                totalCount: 0
            }
        },
        methods: {
            changePage(page) {
                this.filterData.currentPage = page;
                this.getAllList(this.filterData);
            },
            //  获取列表
            getAllList() {
                this.$http.post(this.api.queryCheckContractPage,this.filterData).then(res => {
                    if(res.code === 1000){
                        this.list = res.data.list
                        this.totalCount = res.data.totalCount
                    }
                });
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
        .title {
            span {
                font-size: 12px;
            }
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
    }
</style>