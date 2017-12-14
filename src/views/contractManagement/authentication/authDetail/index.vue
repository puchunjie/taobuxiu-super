<template>
    <div class="auth-info">
        <div class="auth-wrap">
            <p class="title"><span>主体及认证负责人基本信息</span></p>
            <div class="auth-main">
                <Row class="row">
                    <Col span="2" class="col-title">企业抬头：</Col>
                    <Col span="22">{{dataApi.companyName}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">主体类型：</Col>
                    <Col span="22">{{dataApi.userType | userTypeStu}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">主体证件类型：</Col>
                    <Col span="22">{{dataApi.certifyType | certifyTypeStu}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">主体证件号码：</Col>
                    <Col span="22">{{dataApi.certifyNumber}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">主体所属区域：</Col>
                    <Col span="22">{{dataApi.locationName}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">主体单位通讯地址：</Col>
                    <Col span="22">{{dataApi.address}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">认证负责人姓名：</Col>
                    <Col span="22">{{dataApi.legalPersonName}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">负责人证件类型：</Col>
                    <Col span="22">{{dataApi.legalPersonCertifyType = 1 ? '身份证':''}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">负责人证件号：</Col>
                    <Col span="22">{{dataApi.legalPersonCardId}}</Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">负责人手机号码：</Col>
                    <Col span="22">{{dataApi.legalPersonMobile}} <span style="color:#ff9900">(已通过短信验证)</span></Col>
                </Row>
                <Row class="row">
                    <Col span="2" class="col-title">提交审核时间：</Col>
                    <Col span="22">{{dataApi.updateTime | dateformat}}</Col>
                </Row>
                <Row class="row" v-if="dataApi.status == '9'">
                    <Col span="2" class="col-title">审核失败原因：</Col>
                    <Col span="22">{{dataApi.remark}}</Col>
                </Row>
            </div>
        </div>
        <div class="auth-wrap">
            <p class="title"><span>主体证件资料</span></p>
            <div class="auth-main">
                <div class="auth-main-header">主体工商证件：</div>
                <div class="auth-main-img">
                    <i class="iconfont icon-fangdajing" @click="previewImg(businessLicense)"></i>
                    <img :src="businessLicense" style="width:180px">
                </div>
            </div>
        </div>
        <div class="auth-wrap">
            <p class="title"><span>主体负责人证件资料</span></p>
            <div class="auth-main">
                <Row>
                    <Col span="5">
                        <div class="auth-main-header">身份证正面照：</div>
                        <div class="auth-main-img">
                            <i class="iconfont icon-fangdajing" @click="previewImg(legalPersonCardPhotoA)"></i>
                            <img :src="legalPersonCardPhotoA"  style="width:180px">
                        </div>
                    </Col>
                    <Col span="5">
                        <div class="auth-main-header">身份证反面照：</div>
                        <div class="auth-main-img">
                            <i class="iconfont icon-fangdajing" @click="previewImg(legalPersonCardPhotoB)"></i>
                            <img :src="legalPersonCardPhotoB" style="width:180px">
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="auth-wrap">
            <p class="title"><span>企业认证授权书资料</span></p>
            <div class="auth-main">
                <div class="auth-main-header">授权书资料图：</div>
                <div class="auth-main-img">
                    <i class="iconfont icon-fangdajing" @click="previewImg(businessCertificate)"></i>
                    <img :src="businessCertificate" style="width:180px">
                </div>
            </div>
        </div>
        <div class="auth-wrap" v-if="getStatus != 2">
            <p class="title"><span>审核操作</span></p>
            <div class="auth-main">
                <Button type="success" @click.native="pass" style="margin-right: 40px;">审核通过</Button>
                <Button type="warning" @click.native="unpass">无法通过</Button>
            </div>
        </div>
        <Modal v-model="show" title="无法通过审核" :closable="false" :mask-closable="false">
            <Form :ref="ref" :model="unpassApi" :rules="rules">
                <FormItem prop="remark">
                    <Input type="textarea" v-model="unpassApi.remark" placeholder="请输入此次认证申请无法通过审核的原因，用户将可以查看此结果">
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="show = false">取消</Button>
                <Button type="primary" @click="unpassHandle" :loading="loading">确认保存</Button>
            </div>
        </Modal>
        <Modal v-model="imgshow" title="查看大图" :closable="false" :mask-closable="false">
           <div>
               <img :src="previewImgUrl" style="max-width:100%;">
           </div>
            <div slot="footer">
                <Button type="primary" @click="imgshow = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {authStatus,certifyTypeStu,userTypeStu} from '@/utils/filters.js'
    export default {
        data() {
            return {
                ref: 'form' + new Date().getTime(),
                show: false,
                imgshow: false,
                unpassApi: {
                    remark: ''
                },
                rules: {
                    remark: [{
                        required: true,
                        message: '请输入无法通过原因',
                        trigger: 'blur'
                    }]
                },
                loading: false,
                dataApi: [],
                businessLicense: '',
                legalPersonCardPhotoA: '',
                legalPersonCardPhotoB: '',
                businessCertificate: '',
                previewImgUrl: ''
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            },
            getStatus() {
                return this.$route.params.status
            }
        },
        methods: {
            getData() {
                let params = {
                    appUserId: this.id
                }
                this.$http.post(this.api.queryContractAuthenticationById,params).then(res => {
                    if(res.code === 1000){
                        this.dataApi = res.data
                        this.businessLicense = res.data.businessLicense
                        this.legalPersonCardPhotoA = res.data.legalPersonCardPhotoA,
                        this.legalPersonCardPhotoB = res.data.legalPersonCardPhotoB,
                        this.businessCertificate = res.data.businessCertificate
                    }
                })
            },
            // 通过审核
            pass() {
                this.$Modal.confirm({
                    title: '审核提示!',
                    content: '确认审核通过？',
                    onOk: () => {
                        let params = {
                            appUserId: this.id,
                            flag: 1,
                            remark:''
                        }
                        this.$http.post(this.api.checkContractAuthentication,params).then(res => {
                            if(res.code === 1000){
                                this.$Message.success('通过成功')
                                this.$router.push('/authentication')
                            }else{
                                this.$Message.error(res.message)   
                            }
                        })
                        
                    }
                })
            },
            //  不通过
            unpass() {
                this.show = true;
            },
            unpassHandle() {
                this.$refs[this.ref].validate((valid) => {
                    if (valid) {
                        let params = {
                            appUserId: this.id,
                            flag: 0,
                            remark: this.unpassApi.remark
                        }
                        this.$http.post(this.api.checkContractAuthentication,params).then(res => {
                            if(res.code === 1000){
                                this.$Message.success('操作成功')
                                this.$router.push('/authentication')
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }
                })
            },
            previewImg(data) {
                this.imgshow = true;
                this.previewImgUrl = data;
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style lang='less' scoped>
    .auth-info {
        background: #fff;
        padding: 15px;
        .title {
            border-bottom: 1px solid #e9eaec;
            padding: 14px 16px;
            line-height: 1;
            span {
                display: inline-block;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #1c2438;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .auth-main {
            padding: 10px;
            .row {
                margin: 15px 0;
            }
            .col-title {
                text-align: right;
                padding-right: 8px;
            }
            .auth-main-header{
                margin-bottom: 10px;
            }
            .auth-main-img{
                position: relative;
                font-size: 0;
                i{
                    position: absolute;
                    bottom: 0px;
                    left: 140px;
                    font-size: 26px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, .3);
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center
                }
            }
        }
    }
</style>