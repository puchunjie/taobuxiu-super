<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">发布拍品</p>
      <div slot="extra">
        <Button type="primary" @click="saveAcution('formValidate')">确认发布</Button>
        <Button type="primary" @click="back">返回</Button>
      </div>
      <Form ref="formValidate" :model="dataApi" :rules="ruleValidate" :label-width="100" inline class="addForm">
        <h2 class="title">基本信息</h2>
        <div>
          <FormItem label="商户名称：" prop="companyName">
            <Select v-model="dataApi.companyName" :label="dataApi.companyName" style="width: 300px;" filterable remote :remote-method="remoteMethod" :loading="queryLoading">
                            <Option v-for="(option, index) in companyList" :value="`${option.companyName}`" :key="index">{{option.companyName}}</Option>
                          </Select>
          </FormItem>
        </div>
        <FormItem label="是否批量发布：">
          <div style="width: 150px;">
            <Checkbox v-model="dataApi.isBatch" :disabled="isPack">是否批量发布</Checkbox>
          </div>
        </FormItem>
        <FormItem label="场次类型：" prop="auctionIndex">
          <Select v-model="dataApi.auctionIndex" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[5].list" :key="index" :value="item">{{ item }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="货品种类：" prop="goodsType">
          <Select v-model="dataApi.goodsType" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[6].list" :key="index" :value="item.name">{{`${item.name}${item.pack ? '-打包':''}`  }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="品类：" prop="ironType">
          <Select v-model="dataApi.ironType" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[0].list" :key="index" :value="item">{{ item }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="材质：" v-if="!isPack" prop="material">
          <Select v-model="dataApi.material" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[2].list" :key="index" :value="item">{{ item }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="表面：" v-if="!isPack" prop="surface">
          <Select v-model="dataApi.surface" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[1].list" :key="index" :value="item">{{ item }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="产地：" prop="proPlace">
          <Select v-model="dataApi.proPlace" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[3].list" :key="index" :value="item">{{ item }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="打包描述：" v-if="isPack" prop="packDescription">
          <Input type="text" v-model="dataApi.packDescription" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="规格：" v-if="!isPack && !isBJ">
          <Input type="text" v-model="dataApi.specifiction" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="公差：" v-if="!isPack">
          <Input type="text" v-model="dataApi.tolerance" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="厚：" v-if="isBJ && !isPack" prop="height">
          <Input type="text" v-model="dataApi.height" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="宽：" v-if="isBJ && !isPack" prop="width">
          <Input type="text" v-model="dataApi.width" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="长：" v-if="isBJ && !isPack" prop="length">
          <Input type="text" v-model="dataApi.length" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="仓库：" prop="storeHouse">
          <Select v-model="dataApi.storeHouse" style="width: 150px;">
                        <Option v-for="(item,index) in baseData[4].list" :key="index" :value="item">{{ item }}</Option>
                      </Select>
        </FormItem>
        <FormItem label="所在地区：">
          <cityPick @on-pick="selectCity" :value="`${dataApi.province} / ${dataApi.city}`" style="width: 150px;"></cityPick>
        </FormItem>
        <FormItem label="包装：">
          <Input type="text" v-model="dataApi.packaging" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input type="text" v-model="dataApi.remark" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="起拍价(￥/吨)：">
          <InputNumber :max="99999999999" :min="0" v-model="dataApi.startPrice" style="width: 150px;"></InputNumber>
        </FormItem>
        <FormItem label="加价幅度/￥：">
          <Input type="text" v-model="dataApi.priceStep" @on-keyup="onlyNumber" placeholder="请输入..." style="width: 150px;"></Input>
        </FormItem>
        <FormItem label="开拍时间：" prop="startTime">
          <DatePicker type="datetime" v-model="dataApi.startTime" placeholder="选择开拍时间" style="width: 150px"></DatePicker>
        </FormItem>
        <FormItem label="竞拍时间：">
          <Input type="text" v-model="timeApi.date" @on-keyup="onlyNumber" placeholder="请输入..." style="width: 60px;"></Input>天
          <TimePicker type="time" v-model="timeApi.time" format="HH’mm’ss" placeholder="选择时间" style="width: 100px;display:inline-block;margin-left:10px;"></TimePicker>
        </FormItem>
        <FormItem label="延时周期：">
          <Input type="text" v-model="dataApi.timeStep" :disabled="dataApi.isBatch" @on-keyup="onlyNumber" placeholder="请输入..." style="width: 60px;"></Input>分/次
        </FormItem>
        <FormItem label="结束时间：">
          <DatePicker type="datetime" v-model="dataApi.endTime" :disabled="!isStep" placeholder="选择结束时间" style="width: 150px"></DatePicker>
        </FormItem>
        <FormItem label="服务支持：">
          <div class="item-content clearfix">
            <div class="item" v-for="(item,index) in baseData[7].list" :key="index" @click="selectItem(item,index)">
              <span class="iconfont" :class="item.isCheck ? 'icon-yduifuxuankuangxuanzhong' : 'icon-yduifuxuankuang'"></span> {{ item.name }}
            </div>
          </div>
        </FormItem>
        <FormItem label="保留底价：">
          <RadioGroup v-model="dataApi.hasReservePrice">
            <Radio label="true"><label>有</label></Radio>
            <Radio label="false"><label>无</label></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem style="margin-left: -100px;">
          <Input type="text" v-model="dataApi.reservePrice" @on-keyup="onlyNumber" :disabled="dataApi.hasReservePrice === 'false'" placeholder="请输入" style="width: 80px;"></Input>
        </FormItem>
        <h2 class="title">拍品属性
          <Button class="add" @click="addAuctionInfos" v-if="dataApi.isBatch">添加行</Button>
        </h2>
        <Row class="auctionInfos">
          <Col span="3" class="auctionInfos-item">数量</Col>
          <Col span="3" class="auctionInfos-item">重量/KG</Col>
          <Col span="3" class="auctionInfos-item">保证金/￥</Col>
          <Col span="3" class="auctionInfos-item">出价方式</Col>
        </Row>
        <Row class="auctionInfos" v-for="(item,index) in dataApi.infos" :key="index">
          <Col span="3" class="auctionInfos-item">
          <Input type="text" v-model="item.number" @on-keyup="onlyNumber" placeholder="请输入..."></Input>
          </Col>
          <Col span="3" class="auctionInfos-item">
          <Input type="text" v-model="item.weight" @on-keyup="onlyNumber" placeholder="请输入..."></Input>
          </Col>
          <Col span="3" class="auctionInfos-item">
          <Input type="text" v-model="item.maigin" @on-keyup="onlyNumber" placeholder="请输入..."></Input>
          </Col>
          <Col span="3" class="auctionInfos-item">
          <Select v-model="item.offerWay">
                        <Option v-for="(item,index) in baseData[8].list" :key="index" :value="item.name">{{ item.name }}</Option>
                      </Select>
          </Col>
          <Col span="3" class="auctionInfos-item" v-if="dataApi.infos.length > 1">
          <Button @click="removeAuctionInfos(index)">删除</Button>
          </Col>
        </Row>
        <h2 class="title" v-if="dataApi.pack">打包详情</h2>
        <div class="edit-wrapper" v-if="dataApi.pack">
          <ueEdit :defaultMsg="auctionPackMsg" :config="config" eidtId="packDesc" ref="packDesc"></ueEdit>
        </div>
        <h2 class="title">标的物介绍</h2>
        <div class="edit-wrapper">
          <ueEdit :defaultMsg="auctionDescMsg" :config="config" eidtId="auctionDesc" ref="auctionDesc"></ueEdit>
        </div>
        <h2 class="title">竞买须知</h2>
        <div class="edit-wrapper">
          <ueEdit :defaultMsg="auctionBuyMsg" :config="config" eidtId="auctionBuy" ref="auctionBuy"></ueEdit>
        </div>
        <h2 class="title">保证金须知</h2>
        <div class="edit-wrapper">
          <ueEdit :defaultMsg="auctionBondMsg" :config="config" eidtId="auctionBond" ref="auctionBond"></ueEdit>
        </div>
      </Form>
    </Card>
  </div>
</template>

<script>
  import {
    dataToTime,
    formatDuring
  } from '@/utils/filters.js'
  import ueEdit from "@/components/basics/UE/index";
  import cityPick from "@/components/basics/adress/citySelect";
  export default {
    components: {
      cityPick,
      ueEdit
    },
    data() {
      return {
        baseData: [{
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          },
          {
            list: []
          }
        ],
        timeApi: {
          date: '',
          time: ''
        },
        dataApi: {
          companyName: "",
          auctionIndex: "",
          goodsType: "",
          pack: false,
          packDescription: "",
          ironType: "",
          material: "",
          surface: "",
          proPlace: "",
          specifiction: "",
          height: "",
          width: "",
          length: "",
          tolerance: "",
          storeHouse: "",
          province: "",
          city: "",
          packaging: "",
          remark: "",
          startPrice: 0,
          startTime: "",
          keepTime: "",
          timeStep: "",
          endTime: "",
          reservePrice: "",
          priceStep: "",
          packMessage: "",
          introduction: "",
          priceNotice: "",
          moneyNotice: "",
          rights: [],
          infos: [{
            id: "",
            number: "",
            weight: "",
            maigin: "",
            offerWay: ""
          }],
          isBatch: false,
          hasReservePrice: "true"
        },
        isPack: false,
        auctionDescMsg: "",
        auctionBuyMsg: "",
        auctionBondMsg: "",
        auctionPackMsg: "",
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 550
        },
        index: 0,
        companyList: [],
        queryLoading: false,
        ruleValidate: {
          companyName: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          auctionIndex: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          goodsType: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          ironType: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          material: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          surface: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          packDescription: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          proPlace: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          storeHouse: [{
            required: true,
            message: "请选择",
            trigger: "change"
          }],
          startTime: [{
            required: true,
            type: "date",
            message: "请选择",
            trigger: "change"
          }],
          width: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          height: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          length: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }]
        }
      };
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      isBJ() {
        return (
          this.dataApi.ironType === "不锈钢卷" ||
          this.dataApi.ironType === "不锈钢板"
        );
      },
      isStartTime() {
        return this.dataApi.startTime != "" ?
          new Date(this.dataApi.startTime).getTime() :
          "";
      },
      isEndTime() {
        return this.dataApi.endTime != "" ?
          new Date(this.dataApi.endTime).getTime():
          "";
      },
      //  天时分秒转毫秒
      formateMsec() {
        let day = Number(this.timeApi.date);
        let time = dataToTime(this.timeApi.time);
        let days, times;
        if (day != '' && day != undefined && day != NaN) {
          days = day * 24 * 60 * 60 * 1000
        } else {
          days = 0;
        }
        if (time != '' && time != undefined && time != NaN) {
          let h = parseFloat(time.split(':')[0].toString());
          let m = parseFloat(time.split(':')[1].toString())
          let s = parseFloat(time.split(':')[2].toString())
          times = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000)
        } else {
          times = 0;
        }
        return days + times
      },
      minutes() {
        if (this.dataApi.timeStep != '') {
          return parseInt((Number(this.dataApi.timeStep)) * 60000);
        }
      },
      isStep() {
        return this.dataApi.timeStep != ''
      },
      endTime() {
        return new Date(this.formateMsec + this.isStartTime)
      }
    },
    watch: {
      isBJ(val) {
        if (val) {
          this.dataApi.specifiction = "";
        } else {
          this.dataApi.width = "";
          this.dataApi.height = "";
          this.dataApi.length = "";
        }
      },
      "dataApi.hasReservePrice" (val) {
        if (val === "false") {
          this.dataApi.reservePrice = "";
        }
      },
      'dataApi.goodsType' (val) {
        this.baseData[6].list.map(el => {
          if (el.name === val) {
            this.dataApi.pack = el.pack;
            this.isPack = el.pack;
          }
        })
      },
      'dataApi.isBatch' (val) {
        if (val) this.dataApi.timeStep = ''
      },
      'dataApi.pack' (val) {
        if (val) {
          if (this.dataApi.isBatch) {
            this.dataApi.infos = [];
            this.dataApi.infos.push({
              id: "",
              number: "",
              weight: "",
              maigin: "",
              offerWay: ""
            });
          }
          this.dataApi.isBatch = false
          this.isPack = true;
        };
      },
      'dataApi.rights' (val) {
        this.selectedClass();
      },
      'dataApi.hasReservePrice' (val) {
        if (val === 'false') {
          this.dataApi.reservePrice = '';
        }
      }
    },
    methods: {
      onlyNumber(event) {
        event.target.value = event.target.value.replace(/[^\d.]/g, "").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      },
      //返回
      back() {
        this.$router.go(-1);
      },
      remoteMethod(query) {
        if (query != '') {
          this.queryLoading = true
          this.$http.post(this.api.getBusiness, {
            name: query,
            currentPage: 1,
            pageSize: 10
          }).then(res => {
            if (res.code === 1000) {
              this.companyList = res.data.list;
              this.queryLoading = false;
            }
          })
        } else {
          this.companyList = [];
          this.queryLoading = false;
        }
      },
      getData() {
        this.$http.post(this.api.findAuction, {
          id: this.id
        }).then(res => {
          if (res.code === 1000) {
            let otherObj = {
              infos: [],
              rights: []
            }
            this.dataApi = Object.assign({}, res.data, otherObj);
            this.dataApi.infos = res.data.auctionInfos.length != 0 ? _.cloneDeep(res.data.auctionInfos) : [{
              id: "",
              number: "",
              weight: "",
              maigin: "",
              offerWay: ""
            }];
            this.dataApi.rights = res.data.auctionRights.length != 0 ? _.cloneDeep(res.data.auctionRights) : [];
            this.dataApi.hasReservePrice = res.data.hasReservePrice.toString();
            this.timeApi.date = formatDuring(res.data.keepTime, 3).split('-')[0];
            this.timeApi.time = formatDuring(res.data.keepTime, 3).split('-')[1];
            this.dataApi.startTime = new Date(res.data.startTime);
            this.dataApi.endTime = new Date(res.data.endTime);
            this.dataApi.timeStep = res.data.timeStep != '' ? res.data.timeStep / 60000 : '';
            this.auctionDescMsg = res.data.auctionLob.introduction;
            this.auctionBuyMsg = res.data.auctionLob.moneyNotice;
            this.auctionBondMsg = res.data.auctionLob.priceNotice;
            this.auctionPackMsg = res.data.auctionLob.packMessage;
            this.index = res.data.auctionInfos.length != 0 ? res.data.auctionInfos.length - 1 : 0;
            delete this.dataApi.auctionRights;
            delete this.dataApi.auctionLob;
            delete this.dataApi.auctionInfos;
            // 清除拍品属性无用字段
            this.dataApi.infos.forEach(el => {
              delete el.createTime;
              delete el.auctionId;
              delete el.currentPrice;
              delete el.createUser;
              delete el.createUserId;
              delete el.sortIndex;
              delete el.status;
              delete el.updateTime;
              delete el.updateUser;
              delete el.updateUserId;
              delete el.money;
            })
            this.selectedClass();
          }
        })
      },
      saveAcution(name) {
        let auctionDesc = this.$refs.auctionDesc.getUEContent();
        let auctionBond = this.$refs.auctionBond.getUEContent();
        let auctionBuy = this.$refs.auctionBuy.getUEContent();
        let params = this.$clearData(this.dataApi);
        params.id = this.id;
        params.infos = JSON.stringify(params.infos);
        params.rights = JSON.stringify(params.rights);
        params.introduction = auctionDesc;
        params.priceNotice = auctionBuy;
        params.moneyNotice = auctionBond;
        params.startTime = this.isStartTime;
        params.endTime = this.isEndTime;
        params.keepTime = this.formateMsec;
        if (this.minutes != 'undefined') {
          params.timeStep = this.minutes
        }
        if (params.pack) {
          let packDesc = this.$refs.packDesc.getUEContent();
          params.packMessage = packDesc
        }
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$Modal.confirm({
              title: "拍品发布",
              content: "是否确认发布拍品",
              onOk: () => {
                this.$http.post(this.api.saveAuction, params).then(res => {
                  if (res.code === 1000) {
                    this.$router.push('../../auctionMana')
                    this.$Message.success("发布成功");
                  } else {
                    this.$Message.error(res.message)
                  }
                });
              }
            });
          } else {
            this.$Message.error("表单验证失败!");
          }
        });
      },
      //  选择已勾选
      selectedClass() {
        this.baseData[7].list.forEach(el => {
          this.dataApi.rights.forEach(sub => {
            if (el.name === sub.name) {
              el.isCheck = true;
            }
          })
        })
      },
      selectItem(item, index) {
        if (item.isCheck) {
          _.remove(this.dataApi.rights, n => {
            return n.name === item.name;
          });
        } else {
          this.dataApi.rights.push(item);
        }
        item.isCheck = !item.isCheck;
      },
      //  增加行
      addAuctionInfos() {
        this.index++;
        this.dataApi.infos.push({
          id: "",
          number: "",
          weight: "",
          maigin: "",
          offerWay: ""
        });
      },
      // 删除行
      removeAuctionInfos(index) {
        this.dataApi.infos.splice(index, 1);
      },
      selectCity(data) {
        this.dataApi.province = data.provinceName;
        this.dataApi.city = data.cityName;
      },
      // 获取品类
      getIronTypes() {
        return this.$http.get(this.api.A_ironType);
      },
      // 获取材质
      getMaterials() {
        return this.$http.get(this.api.A_material);
      },
      // 获取表面
      getSurFaces() {
        return this.$http.get(this.api.A_surface);
      },
      // 获取产地
      getPlaces() {
        return this.$http.get(this.api.A_proPlace);
      },
      //  获取仓库
      getHouse() {
        return this.$http.get(this.api.A_storeHouse);
      },
      //  获取场次
      getAllSuctionIndex() {
        return this.$http.get(this.api.getAllSuctionIndex);
      },
      //  获取货品
      getAllGoodsTypeList() {
        return this.$http.get(this.api.getAllGoodsTypeList);
      },
      //  获取服务支持
      getAllSerSup() {
        return this.$http.get(this.api.getAllSerSup);
      },
      //  获取出价方式
      getOfferWay() {
        return this.$http.get(this.api.getOfferWay);
      },
      async getAll() {
        this.$http
          .all([
            this.getIronTypes(),
            this.getSurFaces(),
            this.getMaterials(),
            this.getPlaces(),
            this.getHouse(),
            this.getAllSuctionIndex(),
            this.getAllGoodsTypeList(),
            this.getAllSerSup(),
            this.getOfferWay()
          ])
          .then(res => {
            res.forEach((el, index) => {
              if (el.code === 1000) {
                if (index === 7) {
                  el.data.forEach(sub => {
                    sub.isCheck = false;
                  })
                }
                this.baseData[index].list.push(...el.data);
                this.getData();
              }
            });
          });
      }
    },
    created() {
      this.getAll()
    }
  };
</script>

<style lang='less' scoped>
  .addForm {
    .title {
      position: relative;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
      .add {
        position: absolute;
        right: 20px;
        top: 0;
      }
    }
    .auctionInfos {
      margin-bottom: 10px;
      .auctionInfos-item {
        padding: 0 10px;
      }
    }
    .edit-wrapper {
      width: 600px;
      margin-bottom: 20px;
    }
    .item-content {
      .item {
        position: relative;
        display: inline-block;
        margin: 0 10px 0 0;
        cursor: pointer;
        .iconfont {
          font-size: 16px;
          color: #dddee1;
          vertical-align: middle;
          &.icon-yduifuxuankuangxuanzhong {
            color: #2d8cf0
          }
        }
      }
    }
  }
</style>