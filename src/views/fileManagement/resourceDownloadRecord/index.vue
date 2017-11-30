<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title" class="title">资源模板下载记录<span>(商户下载记录)</span></p>
      <Form :mode="filterData" :label-width="100" inline style="margin-top:24px;">
          <FormItem label="数据类型:">
            <Select v-model="filterData.storeType" @on-change="onFilter" placeholder="请选择" style="width:150px">
                <Option v-for="item in storeTypeData" :key="item.id" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="下载商户名:">
            <Input type="text" v-model="filterData.bussizName" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="下载商户账户:">
            <Input type="text" v-model="filterData.bussizMobile" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="查询时间:">
            <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
          </FormItem>
          <FormItem label="资源模板名称:">
            <Input type="text" v-model="filterData.fileName" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem>
              <Button type="warning" @click.native="resetFilter">清除</Button>
          </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="table-contnet">
            <Row class-name="head">
                <Col class-name="col" span="4">资源类型</Col>
                <Col class-name="col" span="7">资源模板名称</Col>
                <Col class-name="col" span="5">下载商户</Col>
                <Col class-name="col" span="4">下载商户账号</Col>
                <Col class-name="col" span="4">下载时间</Col>
            </Row>
            <Row v-for="(item,index) in list" :key="item.id">
                <Col class-name="col" span="4">{{item.qualificationName}}</Col>
                <Col class-name="col" span="7">{{item.fileName}}</Col>
                <Col class-name="col" span="5">{{item.bussizName}}</Col>
                <Col class-name="col" span="4">{{item.bussizMobile}}</Col>
                <Col class-name="col" span="4">{{item.createTime | dateformat}}</Col>
            </Row>
            <Row v-if="list.length == 0">
              <Col class-name="col" span="24">暂无数据</Col>
            </Row>
          </div>
        </div>
        <Page class="page-count" size="small" :total="totalCount" :page-size="filterData.pageSize" @on-change="changePage"></Page>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filterData: {
        storeType: '',
        type: '',
        bussizName: '',
        bussizMobile: '',
        fileName: '',
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: 10
      },
      dateValue: ['', ''],
      dateOption: {
          shortcuts: [{
                  text: '最近一周',
                  value() {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      return [start, end];
                  }
              },
              {
                  text: '最近一个月',
                  value() {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      return [start, end];
                  }
              },
              {
                  text: '最近三个月',
                  value() {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      return [start, end];
                  }
              }
          ]
      },
      storeTypeData:[{
        name: '现货资源',
        id: 1
      },{
        name: '定开计划',
        id: 2
      },{
        name: '特价资源',
        id: 3
      }],
      list: [],
      totalCount: 0
    }
  },
  computed: {
      handleData() {
        return {
            storeType: this.filterData.storeType,
            type: this.filterData.type,
            bussizName: this.filterData.bussizName,
            bussizMobile: this.filterData.bussizMobile,
            fileName: this.filterData.fileName,
            startTime: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
            endTime: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
            currentPage: this.filterData.currentPage,
            pageSize: this.filterData.pageSize
        }
    }
  },
  watch: {
    handleData: _.debounce(function(val) {
        this.getAllList(val)
    }, 200)
  },
  methods: {
    onFilter() {
      this.getAllList(this.handleData);
      this.filterData.currentPage = 1
    },
    resetFilter (){
      this.filterData = {
        storeType: '',
        type: '',
        bussizName: '',
        bussizMobile: '',
        fileName: '',
        startTime: '',
        endTime: '',
        currentPage: 1,
        pageSize: 10
      }
      this.dateValue = ['','']
      this.getAllList(this.handleData);
    },
    changePage(page) {
      this.filterData.currentPage = page;
      this.getAllList(this.handleData);
    },
    getAllList(val) {
      this.$http.post(this.api.findExcelDownHistory,this.handleData).then(res => {
        if(res.code === 1000){
          this.list = res.data.list;
          this.totalCount = res.data.totalCount
        }
      })
    }
  },
 created () {
   this.getAllList(this.handleData);
 }
}
</script>
<style lang="less" scoped>
.card {
    position: relative;
    margin-bottom: 20px;
    padding-bottom: 40px;
    .title{
      span{
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