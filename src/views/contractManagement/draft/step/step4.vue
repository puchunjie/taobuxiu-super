<template>
    <div>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24">
                    <span class="warmFont">*</span>请确认平台签约身份信息
                </Col>
            </Row>
            <Row class="rowBody">
                <Col span="2" class="rowBodyTitle">
                    甲方名称：
                </Col>
                <Col span="20">
                    {{data.systemAppName}}
                </Col>
            </Row>
        </Row>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24"  class="row-col">
                    <span class="warmFont">*</span>请确认采购方的客户信息，合同中将以此作为乙方信息
                </Col>
            </Row>
            <Row class="rowBody">
                <Row class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        乙方名称：
                    </Col>
                    <Col span="20">
                        {{data.buyCompanyName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        乙方地址：
                    </Col>
                    <Col span="20">
                        {{data.buyLocationName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        联系人:
                    </Col>
                    <Col span="20">
                        {{data.buyLegalPersonName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        联系方式:
                    </Col>
                    <Col span="20">
                        {{data.buyLegalPersonMobile}}
                    </Col>
                </Row>
            </Row>
        </Row>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24"  class="row-col">
                    <span class="warmFont">*</span>请确认供应商的客户信息，合同中将以此作为丙方信息
                </Col>
            </Row>
            <Row class="rowBody">
                <Row class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        丙方名称：
                    </Col>
                    <Col span="20">
                        {{data.sellCompanyName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        丙方地址：
                    </Col>
                    <Col span="20">
                        {{data.sellLocationName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        联系人:
                    </Col>
                    <Col span="20">
                        {{data.sellLegalPersonName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        联系方式:
                    </Col>
                    <Col span="20">
                        {{data.sellLegalPersonMobile}}
                    </Col>
                </Row>
            </Row>
        </Row>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24">
                    <span class="warmFont">*</span>请确认合同的交易货物明细<span class="warmFont">(计价方式=“重量“,总价=重量*单价|计价方式=”数量”，总价=数量*单价)</span>
                </Col>
                <div class="totalPrice">合计：<span>&yen;{{ totlePrice }}</span></div>
            </Row>
            <Row class="rowBody">
              <table class="tables">
                <col width="8%" />
                <col width="8%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="14%" />
                <col width="7%" />
                <col width="3%" />
                <tr>
                    <td>货品名称</td>
                    <td>材质</td>
                    <td>规格及型号</td>
                    <td>公差产地</td>
                    <td>数量</td>
                    <td>重量(吨)</td>
                    <td>计价方式</td>
                    <td>单价(元/单位)</td>
                    <td>备注</td>
                    <td>总价(元)</td>
                </tr>
                <tr v-for="(info,i) in data.orderIds" :key="i">
                    <td>{{info.ironTypeName}}</td>
                    <td>{{ info.materialName }}/{{ info.surfaceName }}</td>
                    <td>{{ info.specifications ? info.specifications :`${info.height}*${info.width}*${info.length}` }}</td>
                    <td><Input v-model="info.tolerance" placeholder="公差" size="small" ></Input></td>
                    <td><input v-model="info.numbers" @blur="blurOut" class="ivu-input ivu-input-small" :id="'numbers-'+i" placeholder="数量" size="small" ></td>
                    <td><input v-model="info.weights" @blur="blurOut" class="ivu-input ivu-input-small" :id="'weights-'+i" placeholder="重量" size="small" ></td>
                    <td>
                    <Select v-model="info.priceMode" size="small">
                        <Option v-for="mode in priceModeData" :value="mode.id" :key="mode.id">{{ mode.label }}</Option>
                    </Select>
                    </td>
                    <td><Input v-model="info.price" placeholder="价格" size="small" ></Input></td>
                    <td><Input v-model="info.remark" placeholder="备注" size="small"></Input></td>
                    <td class="price">{{ totlePrcieArr[i]}}</td>
                    <td></td>
                </tr>
              </table>
              <table class="tables">
                <col width="8%" />
                <col width="8%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="14%" />
                <col width="7%" />
                <col width="3%" />
                <tr v-for="(item,i) in castData.items" :key="i">
                    <td><input v-model="item.ironTypeName" @click="showThink($event,i)" :id="'thinding-'+i" class="ivu-input ivu-input-small" placeholder="请输入"></td>
                    <td><Input v-model="item.materialName" placeholder="请输入" size="small"></Input></td>
                    <td><Input v-model="item.specifications" placeholder="请输入" size="small" ></Input></td>
                    <td><Input v-model="item.tolerance" placeholder="请输入" size="small" ></Input></td>
                    <td><Input v-model="item.numbers" placeholder="请输入" size="small" ></Input></td>
                    <td><Input v-model="item.weights" placeholder="请输入" size="small" ></Input></td>
                    <td>
                    <Select v-model="item.priceMode" size="small">
                        <Option v-for="mode in priceModeData" :value="mode.id" :key="mode.id">{{ mode.label }}</Option>
                    </Select>
                    </td>
                    <td><Input v-model="item.price" placeholder="价格" size="small" ></Input></td>
                    <td style="width:300px;"><Input v-model="item.remark" placeholder="备注" size="small"></Input></td>
                    <td class="price">
                        {{ totleCoastArr[i] }}
                    </td>
                    <td><i class="iconfont icon-shanchu1 icon-cost" @click="removeCost(i)"></i></td>
                </tr>
              </table>
              <Button type="info" @click="addCost" class="addCost">添加其他费用</Button>
            </Row>
        </Row>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24">
                    <span class="warmFont">*</span>请完善合同信息
                </Col>
            </Row>
            <Row class="rowBody">
                <Row  class="row-col" >
                    <Form :label-width="150" :model="dataApi" style="width: 400px;">
                        <FormItem label="交货地点：">
                            <City ref="city" @on-pick="selectCity" ></City>
                        </FormItem>
                        <FormItem label="验货时长：">
                            <input type="number" class="ivu-input" v-model="dataApi.inspectionTime"  placeholder="请输入...">
                        </FormItem>
                        <FormItem label="交货仓库：">
                            <input type="input" class="ivu-input" v-model="dataApi.deliveryHouse"  placeholder="请输入交货仓库（如：东方一期）">
                        </FormItem>
                        <FormItem label="交货期限：">
                            <DatePicker :clearable="false" type="date" :options="deliveryDateOpt" v-model="deliveryDate" placement="bottom-end" placeholder="选择日期"></DatePicker>
                        </FormItem>
                        <FormItem label="备注说明：">
                            <Input type="textarea" v-model="dataApi.remark" placeholder="请输入..."></Input>
                        </FormItem>
                        <FormItem label="付款方式：">
                            <Select v-model="dataApi.payMent">
                                <Option  v-for="item in payMentData" :value="item.id" :key="item.id">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="开具发票有效日：">
                            <input type="number" class="ivu-input" disabled="true" v-model="dataApi.invoiceDate"  placeholder="请输入...">
                        </FormItem>
                        <FormItem label="合同有效日期：">
                            {{data.systemTime | dateformatZ}}
                            <!-- <DatePicker type="daterange" :clearable="false" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker> -->
                        </FormItem>
                    </Form>
                </Row>
            </Row>
        </Row>
        <div class="button-wrap">
            <Button type="info" @click.native="doDraft">确认起草电子合同</Button>
            <Button @click="previewDraft">预览电子合同</Button>
            <Button @click="giveUpDraft">放弃起草合同</Button>
        </div>
        <Modal v-model="show" title="预览电子合同" :closable="false" width="850" :mask-closable="false">
            <previewPage :previewData="previewData"></previewPage>
            <div slot="footer">
                <Button type="primary" @click="show = false">关闭</Button>
            </div>
        </Modal>
        <thinkWrap v-if="thinkData.show" @on-item-click="choseItem" @on-out-click="outClick" :apiData="api.findBaseCost" :x="thinkData.x" :y="thinkData.y" :id="activeTargetRef"></thinkWrap>
    </div>
</template>

<script>
import City from '@/components/basics/adress/citySelect'
import previewPage from '../preview/index'
import thinkWrap from '../thinkwrap/index'
    export default {
        components: {
            City,
            previewPage,
            thinkWrap
        },
        data() {
            return {
                thinkData: {
                    show: false,
                    x: '',
                    y: ''
                },
                activeTargetRef: '',
                costIndex: 0,
                castData: {
                    items: []
                },
                data: {
                    orderIds: [],
                    buyCompanyName: '',
                    buyId: '',
                    buyLegalPersonMobile: '',
                    buyLegalPersonName: '',
                    buyLocationName: '',
                    sellCompanyName: '',
                    sellId: '',
                    sellLegalPersonMobile: '',
                    sellLegalPersonName: '',
                    sellLocationName: '',
                    systemAppName: '',
                    systemAppTel: '',
                    contractShowId: '',
                    contractCreateId: '',
                    systemTime: '',
                },
                dataApi: {
                    inspectionTime: '',
                    deliveryTerm: '',
                    deliveryHouse: '',
                    remark: '',
                    payMent: 1,
                    deliveryHouse: '',
                    invoiceDate: 25,
                    startDate: '',
                    endDate: ''
                },
                priceModeData:[{
                    label: '重量',
                    id: '2'
                },{
                    label:'数量',
                    id: '1'
                }],
                location: {
                    id: '',
                    name: ''
                },
                show: false,
                payMentData: [{
                    label:'电汇',
                    id: 1
                },{
                    label:'支票',
                    id: 2
                },{
                    label:'承兑',
                    id: 3
                }],
                // dateValue: ['',''],
                deliveryDate: '',
                deliveryDateOpt: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                inputId: '',
                isOk: true
            }
        },
        computed: {
            //  计算单个订单总价
             totlePrcieArr() {
                let arr = [];
                this.data.orderIds.forEach(el => {
                    let number = el.priceMode == 1 ? el.numbers : el.weights;
                    number *= 1;
                    arr.push((el.price * number).toFixed(2));
                })
                return arr
            },
            //  计算其他费用单个总价
            totleCoastArr() {
                let arr = [];
                if(this.castData.items.length != 0)
                    this.castData.items.forEach((el,index) => {
                        let number = el.priceMode == 1 ? el.numbers : el.weights;
                        number *= 1;
                        arr.push((el.price * number).toFixed(2));
                    })
                    return arr != 'NaN' ? arr : 0.00
            },
            //  计算总价
            totlePrice() {
                let price = 0,price1 = 0,price2 = 0;
                this.totlePrcieArr.forEach(el => {
                    price1 += Number(el);
                })
                if(this.castData.items.length != 0)
                    this.totleCoastArr.forEach(el => {
                        price2 += Number(el)
                    })
                price = price1 + price2;
                return price.toFixed(2)
            },
            //  数量总计
            totleNumbers() {
                let numbers = 0;
                let numbers1 = 0;
                let numbers2 = 0;
                this.data.orderIds.forEach(el => {
                    numbers1 += Number(el.numbers)
                })
                this.castData.items.forEach(el => {
                    numbers2 += Number(el.numbers)
                })
                numbers = numbers1 + numbers2
                return numbers == 0 ? '' : numbers
            },
            //  总量总计
            totleWeights() {
                let weights = 0;
                let weights1 = 0;
                let weights2 = 0;
                this.data.orderIds.forEach(el => {
                    weights1 += Number(el.weights)
                })
                this.castData.items.forEach(el => {
                    weights2 += Number(el.weights)
                })
                weights = weights1 + weights2
                return weights == 0 ? '' : weights
            },
            ajaxParams() {
                return {
                    buyId: this.data.buyId,
                    sellId: this.data.sellId,
                    locationId: this.location.id,
                    locationName: this.location.name,
                    contractShowId:this.data.contractShowId,
                    contractCreateId: this.data.contractCreateId,
                    orderIds: JSON.stringify({orderIds:this.data.orderIds,costs:this.castData.items}),
                    inspectionTime: this.dataApi.inspectionTime,
                    deliveryTerm: this.deliveryDate != '' ? new Date(this.deliveryDate).getTime() : '',
                    deliveryHouse: this.dataApi.deliveryHouse,
                    remark: this.dataApi.remark,
                    payMent: this.dataApi.payMent,
                    invoiceDate: this.dataApi.invoiceDate,
                    startDate: this.data.systemTime,
                    endDate: this.data.systemTime
                }
            },
            previewData() {
                return {
                    buyId: this.data.buyId,
                    sellId: this.data.sellId,
                    locationId: this.location.id,
                    locationName: this.location.name,
                    orderIds: this.data.orderIds,
                    totlePrice: this.totlePrice,
                    systemAppName: this.data.systemAppName,
                    buyCompanyName: this.data.buyCompanyName,
                    sellCompanyName: this.data.sellCompanyName,
                    buyLegalPersonName: this.data.buyLegalPersonName,
                    buyLegalPersonMobile: this.data.buyLegalPersonMobile,
                    systemAppTel: this.data.systemAppTel,
                    systemAppName: this.data.systemAppName,
                    sellLegalPersonMobile: this.data.sellLegalPersonMobile,
                    sellLegalPersonName: this.data.sellLegalPersonName,
                    inspectionTime: this.dataApi.inspectionTime,
                    sysTime: this.data.systemTime,
                    tolerance: this.dataApi.tolerance,
                    contractShowId: this.data.contractShowId,
                    deliveryTerm: this.deliveryDate != '' ? new Date(this.deliveryDate).getTime() : '',
                    remark: this.dataApi.remark,
                    payMent: this.dataApi.payMent,
                    invoiceDate: this.dataApi.invoiceDate,
                    startDate: this.data.systemTime,
                    endDate: this.data.systemTime,
                    costs: this.castData.items,
                    totleCoastArr: this.totleCoastArr,
                    contractShowId:this.data.contractShowId,
                    deliveryHouse: this.dataApi.deliveryHouse,
                    totleNumbers: this.totleNumbers,
                    totleWeights: this.totleWeights
                }
            }
        },
        methods: {
            selectCity(data) {
                this.location.id = data.cityId;
                this.location.name = data.cityName;
            },
            getData() {
                let  data = this.$ls.get('contractInfo');
                let params = this.$clearData(data)
                params.orderIds = JSON.stringify(params.orderIds)
                this.$http.post(this.api.selectBgStartContractInfo, params).then(res => {
                    if (res.code === 1000) {
                        this.data = res.data
                        this.data.orderIds.forEach(el => {
                            el.tolerance += ' ' + el.proPlacesName
                        })
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            },
            //  起草合同
            doDraft() {
                // this.checkInfo();
                let condition = this.location.id != '' && this.dataApi.deliveryHouse != '' && this.deliveryDate != '' && this.dataApi.inspectionTime !=''
                    if(this.isOk && condition){
                    this.$Modal.confirm({
                        title:'起草合同提示',
                        content: '确认起草合同？',
                        onOk: () => {
                            this.$http.post(this.api.saveBgContractInfo,this.ajaxParams).then(res => {
                                if(res.code === 1000){
                                    this.$Message.success('合同起草成功');
                                    this.$router.push('/authList');
                                }else {
                                    this.$Message.error(res.message)
                                }
                            })
                        }
                    })
                }else{
                    this.$Message.error('请完善合同信息')
                }
            },
            //  放弃起草
            giveUpDraft() {
                this.$router.push('step1');
            },
            blurOut(e) {
                if(e.target.className = 'ivu-input ivu-input-small error')
                    e.target.className = 'ivu-input ivu-input-small'
                this.isOk = true
            },
            //  验证是否输入完整信息
            // checkInfo() {
            //     this.totlePrcieArr.forEach((el,index) => {
            //         if(el == '0.00' || el == 'NaN'){
            //             let numbersId = document.getElementById('numbers-' + index)
            //             let weightsId = document.getElementById('weights-' + index)
            //             if(this.data.orderIds[index].priceMode == '1'){
            //                 numbersId.className = 'ivu-input ivu-input-small error'
            //             }else{
            //                 weightsId.className = 'ivu-input ivu-input-small error'
            //             }
            //             this.$Message.error('请填写正确信息');
            //             this.isOk = false
            //         }
            //     })
            // },
            //  预览合同
            previewDraft(){
                let condition = this.location.id != '' && this.dataApi.deliveryHouse != '' && this.deliveryDate != '' && this.dataApi.inspectionTime !=''
                if(condition) {
                    this.show = true
                }else{
                    this.$Message.error('请先完善合同信息')
                }
            },
            // 添加其他费用
            addCost() {
                this.costIndex++;
                this.castData.items.push({
                    index: this.costIndex,
                    priceMode: '1',
                    ironTypeName: '',
                    materialName: '',
                    specifications: '',
                    tolerance: '',
                    numbers: '',
                    weights: '',
                    price: '',
                    remark: ''
                })
            },
            //  删除其他费用
            removeCost(index) {
                this.castData.items.splice(index,1);
            },
            //  获取合同种类数据
            showThink(event,id) {
                if(!this.thinkData.show){
                    let inputId = event.target.getAttribute('id')
                    this.inputId = inputId;
                    this.activeTargetRef = inputId+'type';
                    let elem = document.getElementById(inputId)
                    let elLeft = elem.offsetLeft
                    let elTop = elem.offsetTop
                    let current = elem.offsetParent;
                    while (current != null) {　　　　　　
                        // elLeft += current.offsetLeft;
                        elTop += current.offsetTop;　　　　　　
                        current = current.offsetParent;　
                    }　
                    this.thinkData.x = elLeft + 30 + 'px';
                    this.thinkData.y = elTop + 25 + 'px';
                    setTimeout(() => {
                        this.thinkData.show = true
                    }, 100);
                }
            },
            //  赋值
            choseItem(tag) {
                let inputs = this.inputId.split('-')
                this.castData.items[inputs[1]].ironTypeName = tag
                setTimeout(() => {
                    this.thinkData.show = false
                },100)
            },
            //  关闭其他费用弹窗
            outClick() {
                this.thinkData.show = false;
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang='less' scoped>
    .order-row {
        margin-top: 15px;
        border: 1px solid #d0d0d0;
        .rowHeader{
            position: relative;
            background: #EDEEF2;
            line-height: 36px;
            border-bottom: 1px solid #d0d0d0;
            border-left: 3px solid #d0d0d0;
            padding: 0 10px;
        }
        .rowBody{
            padding: 10px 0;
            .rowBodyTitle{
                padding-right: 5px;
                text-align: right;
            }
        .row-col{
            margin: 15px 0;
        }
        }
        .tables{
            width:100%;
            td{
                position: relative;
                text-align: center;
                padding: 5px;
            }
            .price{
                color: #FF5555;
                width: 150px;
            }
        }
        .totalPrice{
            position: absolute;
            top: 0px;
            right: 20px;
            font-size: 16px;
            span{
                color: #ff5555;
            }
        }
    }
    .ivu-input.error{
        border-color: #ff5555
    }
    .button-wrap{
        padding: 40px 0;
        text-align: right;
        button{
            margin-left: 20px;
        }
    }
    .warmFont{
        color: #FF5555; 
        vertical-align: middle;
        display: inline-block;
        margin-right: 5px;
    }
    .addCost{
        margin: 15px 0 0 5px;
    }
    .icon-cost{
        cursor: pointer;
        font-size: 18px;
    }
</style>