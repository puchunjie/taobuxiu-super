<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">拍品详情</p>
      <Button slot="extra" type="primary" @click="back">返回</Button>
      <Form inline :label-width="100" class="addForm">
        <h2 class="title">基本信息</h2>
        <div>
          <FormItem label="商户名称：">
            <div style="width: 400px;">{{item.companyName}}</div>
          </FormItem>
        </div>
        <FormItem label="是否批量发布：">
          <div style="width: 150px;">{{item.isBatch ? '是':'否'}}</div>
        </FormItem>
        <FormItem label="场次类型：">
          <div style="width: 150px;">{{item.auctionIndex}}</div>
        </FormItem>
        <FormItem label="货品种类：">
          <div style="width: 150px;">{{item.goodsType}}</div>
        </FormItem>
        <FormItem label="品类：">
          <div style="width: 150px;">{{item.ironType}}</div>
        </FormItem>
        <FormItem label="材质：">
          <div style="width: 150px;">{{item.material}}</div>
        </FormItem>
        <FormItem label="表面：">
          <div style="width: 150px;">{{item.surface}}</div>
        </FormItem>
        <FormItem label="产地：">
          <div style="width: 150px;">{{item.proPlace}}</div>
        </FormItem>
        <FormItem label="规格：" v-if="!isBJ">
          <div style="width: 150px;">{{item.specifiction}}</div>
        </FormItem>
        <FormItem label="厚：" v-if="isBJ">
          <div style="width: 150px;">{{item.height}}</div>
        </FormItem>
        <FormItem label="宽：" v-if="isBJ">
          <div style="width: 150px;">{{item.width}}</div>
        </FormItem>
        <FormItem label="长：" v-if="isBJ">
          <div style="width: 150px;">{{item.length}}</div>
        </FormItem>
        <FormItem label="公差：">
          <div style="width: 150px;">{{item.tolerance}}</div>
        </FormItem>
        <FormItem label="仓库：">
          <div style="width: 150px;">{{item.storeHouse}}</div>
        </FormItem>
        <FormItem label="所在地区：">
          <div style="width: 150px;">{{item.province}}{{item.city}}</div>
        </FormItem>
        <FormItem label="包装：">
          <div style="width: 150px;">{{item.packaging}}</div>
        </FormItem>
        <FormItem label="备注：">
          <div style="width: 150px;">{{item.remark}}</div>
        </FormItem>
        <FormItem label="起拍价/￥：">
          <div style="width: 150px;">{{item.startPrice}}</div>
        </FormItem>
        <FormItem label="加价幅度/￥：">
          <div style="width: 150px;">{{item.priceStep}}</div>
        </FormItem>
        <FormItem label="开拍时间：" prop="startTime">
          <div style="width: 150px;">{{item.startTime | dateformatS}}</div>
        </FormItem>
        <FormItem label="竞拍时间：">
          <div style="width:150px;">{{item.keepTime | formatDuring(1)}}</div>
        </FormItem>
        <FormItem label="延时周期：">
          <div style="width:150px;">{{item.timeStep != '' ? item.timeStep/60000+'分/次':'无'}}</div>
        </FormItem>
        <FormItem label="结束时间：">
          <div style="width:150px;">{{item.endTime | dateformatS}}</div>
        </FormItem>
        <FormItem label="服务支持：">
          <div class="item-content clearfix">
            <div class="item" v-for="(sub,index) in item.auctionRights" :key="index">
              <span class="iconfont icon-yduifuxuankuangxuanzhong"></span> {{ sub.name }}
            </div>
            <div v-if="item.auctionRights.length === 0">暂无</div>
          </div>
        </FormItem>
        <FormItem label="保留底价：">
          <div style="width: 150px;">{{item.hasReservePrice ? item.reservePrice:'无'}}</div>
        </FormItem>
        <h2 class="title">拍品属性</h2>
        <Row class="auctionInfos">
          <Col span="3" class="auctionInfos-item">数量</Col>
          <Col span="3" class="auctionInfos-item">重量/KG</Col>
          <Col span="3" class="auctionInfos-item">保证金/￥</Col>
          <Col span="3" class="auctionInfos-item">出价方式</Col>
        </Row>
        <Row class="auctionInfos" v-for="(sub,index) in item.auctionInfos" :key="index">
          <Col span="3" class="auctionInfos-item">
          <div>{{sub.number}}</div>
          </Col>
          <Col span="3" class="auctionInfos-item">
          <div>{{sub.weight}}</div>
          </Col>
          <Col span="3" class="auctionInfos-item">
          <div>{{sub.maigin}}</div>
          </Col>
          <Col span="3" class="auctionInfos-item">
          <div>{{sub.offerWay}}</div>
          </Col>
          <Col span="3" class="auctionInfos-item" v-if="item.isBatch">
          <Button @click="recordAction(sub.id)">出价记录</Button>
          </Col>
        </Row>
        <h2 class="title" v-if="item.pack">打包详情</h2>
        <div class="edit-wrapper" v-if="item.pack" v-html="item.auctionLob.packMessage">
        </div>
        <h2 class="title">标的物介绍</h2>
        <div class="edit-wrapper" v-html="item.auctionLob.introduction">
        </div>
        <h2 class="title">竞买须知</h2>
        <div class="edit-wrapper" v-html="item.auctionLob.priceNotice">
        </div>
        <h2 class="title">保证金须知</h2>
        <div class="edit-wrapper" v-html="item.auctionLob.moneyNotice">
        </div>
        <h2 class="title" v-show="!item.isBatch">出价记录({{recordList.length}})</h2>
        <div class="edit-wrapper" v-show="!item.isBatch">
          <div class="card-contnet">
            <div class="table-contnet">
              <Row class-name="head">
                <Col class-name="col" span="4">状态</Col>
                <Col class-name="col" span="4">出价</Col>
                <Col class-name="col" span="6">时间</Col>
                <Col class-name="col" span="10">出价公司</Col>
              </Row>
              <Row v-for="(item,index) in recordList" :key="item.id">
                <Col class-name="col" span="4">{{index === 0 ? '领先':'出局'}}</Col>
                <Col class-name="col" span="4">￥{{item.price}}</Col>
                <Col class-name="col" span="6">{{item.updateTime | dateformatS}}</Col>
                <Col class-name="col" span="10">{{item.companyName}}</Col>
              </Row>
              <Row v-if="recordList.length == 0">
                <Col class-name="col" span="24">暂无数据</Col>
              </Row>
            </div>
          </div>
        </div>
      </Form>
    </Card>
    <Modal v-model="show" :title="`出价记录(${recordList.length})`" width="700" :closable="false" :mask-closable="false">
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="4">状态</Col>
            <Col class-name="col" span="4">出价</Col>
            <Col class-name="col" span="6">时间</Col>
            <Col class-name="col" span="10">出价公司</Col>
          </Row>
          <Row v-for="(item,index) in recordList" :key="item.id">
            <Col class-name="col" span="4">{{index === 0 ? '领先':'出局'}}</Col>
            <Col class-name="col" span="4">￥{{item.price}}</Col>
            <Col class-name="col" span="6">{{item.updateTime | dateformatS}}</Col>
            <Col class-name="col" span="10">{{item.companyName}}</Col>
          </Row>
          <Row v-if="recordList.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
          </Row>
        </div>
      </div>
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {
          auctionLob: {},
          auctionRights: [],
          auctionInfos: []
        },
        recordList: [],
        show: false
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      isBJ() {
        return (
          this.item.ironType === "不锈钢卷" || this.item.ironType === "不锈钢板"
        );
      },
    },
    watch: {
      'item' (val) {
        if (!val.isBatch) {
          this.recordAction(val.auctionInfos[0].id)
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1); //返回上一层
      },
      getData() {
        this.$http.post(this.api.findAuction, {
          id: this.id
        }).then(res => {
          if (res.code === 1000) {
            this.item = Object.assign({}, res.data)
          }
        })
      },
      recordAction(data) {
        this.$http.post(this.api.findOfferAuction, {
          auctionInfoId: data
        }).then(res => {
          if (res.code === 1000) {
            this.recordList = res.data;
          }
        })
        if (this.item.isBatch) {
          this.show = true;
        }
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style lang='less' scoped>
  .addForm {
    .ivu-form-item {
      margin-bottom: 10px;
    }
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
      img {
        max-width: 100%;
      }
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
  
  .card-contnet {
    position: relative;
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
</style>