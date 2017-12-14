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
                    平台名称：
                </Col>
                <Col span="20">
                    {{data.systemAppName}}
                </Col>
            </Row>
        </Row>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24"  class="row-col">
                    <span class="warmFont">*</span>请确认采购方的客户信息，合同中将以此作为甲方信息
                </Col>
            </Row>
            <Row class="rowBody">
                <Row class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        甲方名称：
                    </Col>
                    <Col span="20">
                        {{data.buyCompanyName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        甲方地址：
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
                    <span class="warmFont">*</span>请确认供应商的客户信息，合同中将以此作为乙方信息
                </Col>
            </Row>
            <Row class="rowBody">
                <Row class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        乙方名称：
                    </Col>
                    <Col span="20">
                        {{data.sellCompanyName}}
                    </Col>
                </Row>
                <Row  class="row-col">
                    <Col span="2" class="rowBodyTitle">
                        乙方地址：
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
                  <tr>
                      <td>货品名称</td>
                      <td>材质</td>
                      <td>规格及型号</td>
                      <td>公差参数</td>
                      <td>数量</td>
                      <td>重量(吨)</td>
                      <td>计价方式</td>
                      <td>单价(元/单位)</td>
                      <td style="width:300px;">备注</td>
                      <td>总价(元)</td>
                  </tr>
                  <tr v-for="(info,i) in data.orderIds" :key="i">
                      <td>{{info.ironTypeName}}</td>
                      <td>{{ info.materialName }}/{{ info.surfaceName }}</td>
                      <td>{{ info.specifications ? info.specifications :`${info.height}*${info.width}*${info.length}` }}</td>
                      <td><Input v-model="info.tolerance" placeholder="公差" size="small" style="width: 100px"></Input></td>
                      <td><Input v-model="info.numbers" placeholder="数量" size="small" style="width: 100px"></Input></td>
                      <td><Input v-model="info.weights" placeholder="重量" size="small" style="width: 100px"></Input></td>
                      <td>
                        <Select v-model="info.priceMode" style="width:100px">
                            <Option v-for="mode in priceModeData" :value="mode.id" :key="mode.id">{{ mode.label }}</Option>
                        </Select>
                      </td>
                      <td><Input v-model="info.price" placeholder="价格" size="small" style="width: 100px"></Input></td>
                      <td><Input v-model="info.remark" placeholder="备注" size="small"></Input></td>
                      <td class="price">{{ totlePrcieArr[i]}}</td>
                  </tr>
              </table>
            </Row>
        </Row>
        <Row class="order-row">
            <Row class="rowHeader">
                <Col span="24">
                    <span class="warmFont">*</span>请确认合同交货地点
                </Col>
            </Row>
            <Row class="rowBody">
                <Row  class="row-col" >
                    <Col span="2" class="rowBodyTitle" style="line-height: 32px;">
                        交货地点:
                    </Col>
                    <Col span="20" style="width:200px;">
                        <City ref="city" @on-pick="selectCity" ></City>
                    </Col>
                </Row>
            </Row>
        </Row>
        <div class="button-wrap">
            <Button type="info" @click.native="doDraft">确认起草电子合同</Button>
            <Button @click="giveUpDraft">放弃起草合同</Button>
        </div>
    </div>
</template>

<script>
import City from '@/components/basics/adress/citySelect'
    export default {
        components: {
            City
        },
        data() {
            return {
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
                    systemAppName: ''
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
                }
            }
        },
        computed: {
             totlePrcieArr() {
                let arr = [];
                this.data.orderIds.forEach(el => {
                    let number = el.priceMode == 1 ? el.numbers : el.weights;
                    number *= 1;
                    arr.push((el.price * number).toFixed(2));
                })
                return arr
            },
            totlePrice() {
                let price = 0;
                this.totlePrcieArr.forEach(el => {
                    price += Number(el);
                })
                return price.toFixed(2)
            },
            ajaxParams() {
                return {
                    buyId: this.data.buyId,
                    sellId: this.data.sellId,
                    locationId: this.location.id,
                    locationName: this.location.name,
                    orderIds: JSON.stringify({orderIds:this.data.orderIds}) 
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
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            },
            //  起草合同
            doDraft() {
                if(this.location.id != ''){
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
                    this.$Message.error('请选择交货地点')
                }
            },
            //  放弃起草
            giveUpDraft() {
                this.$router.push('step1');
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
            padding: 20px 0;
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
    .button-wrap{
        padding: 40px 0;
        text-align: right;
        button{
            margin-left: 30px;
        }
    }
    .warmFont{
        color: #FF5555; 
        vertical-align: middle;
        display: inline-block;
        margin-right: 5px;
    }
</style>