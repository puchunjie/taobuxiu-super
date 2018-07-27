<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">拍品详情</p>
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
        <FormItem label="surface">
          <div style="width: 150px;">{{item.goodsType}}</div>
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
        <FormItem label="服务支持：">
          <div class="item-content clearfix">
            <div class="item" v-for="(sub,index) in item.auctionRights" :key="index">
              <span class="iconfont icon-yduifuxuankuangxuanzhong"></span>
              {{ sub.name }}
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
      </Form>
    </Card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {
          auctionLob:{},
          auctionRights: [],
          auctionInfos: []
        }
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
    methods: {
      getData() {
        this.$http.post(this.api.findAuction, {
          id: this.id
        }).then(res => {
          if (res.code === 1000) {
            this.item = Object.assign({}, res.data)
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style lang='less' scoped>
  .addForm {
    .ivu-form-item{
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
      img{
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
</style>