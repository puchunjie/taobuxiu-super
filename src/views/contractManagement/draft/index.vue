<template>
  <div class="draft-wrap">
    <div class="draft-step">
      <div class="step-wrap">
        <div class="item" v-for="(step,i) in steps" :key="i" :class="{'active':nowSetp == i+1}" :style="{zIndex:steps.length - i}">
          <span class="step-count">{{ i+1 }}</span>{{ step }}
        </div>
      </div>
    </div>
    <div class="draft-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        steps: ['选择买家', '选择卖家', '选择订单', '开始起草合同'],
        nowSetp: 1
      }
    },
    methods: {
      setStep(val) {
        this.nowSetp = val.replace(/[^0-9]/ig, "");
      },
    },
    watch: {
      '$route.name' (val) {
        this.setStep(val)
      }
    },
    created() {
      this.setStep(this.$route.name);
    }
  }
</script>

<style lang='less' scoped>
  .draft-wrap {
    background: #fff;
    padding: 15px;
  }
  .step-wrap {
    width: 100%;
    height: 51px;
    line-height: 50px;
    border: 1px solid #d1d1d1;
    font-size: 14px;
    color: #333;
    .item {
      position: relative;
      width: 25%;
      height: 100%;
      text-align: center;
      float: left;
      &:not(:last-child):before {
        position: absolute;
        content: '';
        right: -20px;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 20px solid #e6e6e6;
        border-bottom: 25px solid transparent;
      }
      &:not(:last-child):after {
        position: absolute;
        content: '';
        right: -19px;
        top: 1px;
        width: 0;
        height: 0;
        border-top: 24px solid transparent;
        border-left: 19px solid #fff;
        border-bottom: 24px solid transparent;
      }
      .step-count {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 18px;
        border: 2px solid #e6e6e6;
        margin-right: 8px;
        border-radius: 50%;
      }
      &.active {
        background-color: #609EE9;
        color: #fff;
        &:after {
          border-left-color: #609EE9;
        }
        .step-count {
          border-color: #fff;
        }
      }
    }
  }
</style>