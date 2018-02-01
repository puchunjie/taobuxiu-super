<template>
  <div class="filter-wrapper">
    <div class="filter-bar">
      <Form ref="formInline" inline :label-width="100">
        <FormItem label="处理状态：" class="magin0">
          <RadioGroup v-model="filterData.status">
            <Radio label="">全部</Radio>
            <Radio label="0">未处理</Radio>
            <Radio label="1">正在处理</Radio>
            <Radio label="2">已完成</Radio>
            <Radio label="3">已取消</Radio>
            <Radio label="9">已删除</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="申请商户：" class="magin0">
          <Input type="text" v-model="filterData.bussinessName" placeholder="输入申请商户名称"></Input>
        </FormItem>
        <FormItem label="申请商户账号：" class="magin0">
          <Input type="text" v-model="filterData.bussinessAccount" placeholder="输入申请商户账号"></Input>
        </FormItem>
        <FormItem label="提交申请时间：" class="magin0">
          <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="warning" @click.native="resetFilter">清除</Button>
        </FormItem>
      </Form>
    </div>
    <div class="item-group" v-for="(item,index) in list" :key="item.id">
      <div class="head">
        申请商户：{{ item.bussinessName }}
        <span class="status" :class="'status'+item.status ">{{ item.status | statusStr }}</span>
        <ButtonGroup style="float:right;margin-top:10px" size="small" v-if="item.status != 4">
          <Button type="primary" @click="deal(item,1)">开始处理</Button>
          <Button type="primary" @click="deal(item,2)">处理完成</Button>
          <Button type="primary" @click="deal(item,3)">取消处理</Button>
          <Button type="primary" @click="deal(item,9)">删除此条</Button>
        </ButtonGroup>
      </div>
      <div class="card clearfix">
        <div class="item">提交申请：{{ item.createTime | dateformat }}</div>
        <div class="item">装点：{{ item.beginProvinceName }}{{ item.beginCityName }}{{ item.beginAreaName }}</div>
        <div class="item">卸点：{{ item.endProvinceName }}{{ item.endCityName }}{{ item.endAreaName }}</div>
        <div class="item">货物明细：{{ item.freightLogisticGoods }}</div>
        <div class="item">特殊需求：{{ item.extraDemandName }}</div>
        <div class="item">备注：{{ item.remark !='' ? item.remark: '无' }}</div>
        <div class="item">联系方式：{{ item.tel }}</div>
        <div class="item">联系专员：{{ item.salemanName }}</div>
      </div>
    </div>
    <div class="nodata" v-if="list.length == 0">
      暂无数据
    </div>
    <Page :total="totalCount" @on-change="pageChange" show-total :current="filterData.currentPage" :page-size="filterData.pageSize"></Page>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        filterData: {
          currentPage: 1,
          pageSize: 10,
          status: "",
          bussinessName: "",
          bussinessAccount: "",
          startCreateTime: "",
          endCreateTime: ""
        },
        dateValue: ["", ""],
        totalCount: 0,
        dateOption: {
          shortcuts: [{
              text: "最近一周",
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: "最近一个月",
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: "最近三个月",
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
      };
    },
    computed: {
      handleData() {
        return {
          currentPage: this.filterData.currentPage,
          pageSize: this.filterData.pageSize,
          status: this.filterData.status,
          bussinessName: this.filterData.bussinessName,
          bussinessAccount: this.filterData.bussinessAccount,
          startCreateTime: this.dateValue[0] != "" ? new Date(this.dateValue[0]).getTime() : "",
          endCreateTime: this.dateValue[1] != "" ? new Date(this.dateValue[1]).getTime() : ""
        };
      }
    },
    watch: {
      handleData: {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage)
            this.filterData.currentPage = 1;
          this.getAll();
        }, 200),
        deep: true
      }
    },
    filters: {
      statusStr(val) {
        switch (val * 1) {
          case 0:
            return '未处理 '
            break;
          case 1:
            return '正在处理 '
            break;
          case 2:
            return '已完成 '
            break;
          case 3:
            return '已取消 '
            break;
          case 9:
            return '已删除'
            break;
          default:
            break;
        }
      }
    },
    methods: {
      pageChange(page) {
        this.filterData.currentPage = page;
      },
      resetFilter() {
        this.filterData = {
          currentPage: 1,
          pageSize: 10,
          status: "",
          bussinessName: "",
          bussinessAccount: "",
          startCreateTime: "",
          endCreateTime: ""
        }
        this.dateValue = ["", ""]
      },
      getAll() {
        this.$http.post(this.api.findFreightLogisticOrderByPage, this.handleData).then(res => {
          if (res.code === 1000) {
            console.log(res)
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        });
      },
      DoDeal(data, status) {
        let params = {
          status: status,
          id: data.id
        }
        this.$http.post(this.api.updateStatusById, params).then(res => {
          if (res.code === 1000) {
            this.$Message.success('操作成功')
            this.getAll();
          } else {
            this.$Message.error(res.message)
          }
        })
      },
      deal(data, status) {
        if (status == 9) {
          this.$Modal.confirm({
            title: ' 删除提示！',
            content: '确认删除质检？',
            onOk: () => {
              this.DoDeal(data, status);
            }
          })
        } else {
          this.DoDeal(data, status)
        }
      }
    },
    created() {
      this.getAll();
    }
  };
</script>

<style lang='less' scoped>
  .filter-wrapper {
    width: 100%;
    .filter-bar {
      width: 100%;
      padding: 10px 10px 0 10px;
      background-color: #fff;
      margin-bottom: 10px;
    }
    .item-group {
      width: 100%;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      .head {
        position: relative;
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        .status {
          display: inline-block;
          padding: 0 5px;
          text-align: center;
          line-height: 20px;
          border-radius: 5px;
          color: #fff;
          margin-left: 10px;
          &.status0 {
            background-color: #007de4;
          }
          &.status1 {
            background-color: #ffa500;
          }
          &.status2 {
            background-color: green;
          }
          &.status3,
          &.status9 {
            background-color: gray;
          }
        }
      }
      .card {
        padding: 10px;
        .item {
          float: left;
          width: 25%;
          height: 30px;
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .nodata {
      padding: 15px 0;
      text-align: center
    }
  }
</style>