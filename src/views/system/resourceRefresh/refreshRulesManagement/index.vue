<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">{{title}}管理</p>
      <Button slot="extra" size="small" type="success" @click="openModel(false)">新增刷新规则</Button>
      <div class="card-contnet">
      <div class="table-contnet">
        <Row class-name="head">
            <Col class-name="col" span="4">规则名称</Col>
            <Col class-name="col" span="4">时间单元</Col>
            <Col class-name="col" span="4">类型备注</Col>
            <Col class-name="col" span="4">最近操作人</Col>
            <Col class-name="col" span="4">最近操作时间</Col>
            <Col class-name="col" span="4">操作</Col>
        </Row>
        <Row v-for="(item,index) in list" :key="item.id">
            <Col class-name="col" span="4">{{ item.name }}</Col>
            <Col class-name="col" span="4">{{item.determineTime | formatDuring(params = 1)}}</Col>
            <Col class-name="col" span="4">{{ item.remark | isEmpty(params ='暂无')}}</Col>
            <Col class-name="col" span="4">{{ item.updateUser}}</Col>
            <Col class-name="col" span="4">{{ item.updateTime | dateformat}}</Col>
            <Col class-name="col" span="4">
                <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
                <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
            </Col>
        </Row>
         <Row v-if="list.length == 0">
            <Col class-name="col" span="24">暂无数据</Col>
         </Row>
         </div>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="apiData.currentPage" :page-size="apiData.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
    <Modal v-model="show" :title="isEdit?`编辑${title}`:`添加${title}`" :closable="false" :mask-closable="false">
      <Form :label-width="80" :ref="ref" :model="itemApi" class="form-star" :rules="rules">
          <FormItem label="规则名称:" prop="name">
              <Input type="text" v-model="itemApi.name" v-if="isEdit" disabled size="small" placeholder="请输入..."></Input>
              <Input type="text" v-model="itemApi.name" v-else size="small" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="时间单元:">
            <Select style="width:120px" v-model="dataApi.date" size="small" placeholder="选择天数">
                <Option v-for="(d ,i) in 31" :value="i" :key="i">{{ i }}</Option>
            </Select>天 
            <TimePicker type="time" v-model="dataApi.time" format="HH’mm’ss" confirm placeholder="选择时间" size="small" style="width: 168px;display:inline-block;margin-left:10px;"></TimePicker>
          </FormItem>
          <FormItem label="备注说明:" prop="remark">
              <Input type="text" v-model="itemApi.remark" size="small" placeholder="请输入..."></Input>
          </FormItem>
      </Form>
      <div slot="footer">
          <Button @click="show = false">取消</Button>
          <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '资源刷新机制_规则',
      ref: 'form' + new Date().getTime(),
      isEdit: false,
      show: false,
      loading: false,
      editItem: {},
      itemApi: {
        id: '',
        name: '',
        determineTime: '',
        remark: ''
      },
      apiData: {
        currentPage: 1,
        pageSize: 10
      },
      dataApi:{
          date: '',
          time: ''
      },
      rules:{
          name: [{
              required: true,
              message: '不能为空',
              trigger: 'blur'
          }]
          },
      list: [],
      totalCount: 0
    }
  },
  computed: {
      //  天时分秒转毫秒
      formateMsec () {
          let day = this.dataApi.date;
          let time = dataToTime(this.dataApi.time);
          let days,times;
          if(day!= '' && day != undefined && day != NaN) {
              days = day * 24 * 60 * 60 * 1000
          }else{
              days = 0;
          }
          if(time != '' && time != undefined && time != NaN) {
              let h = parseFloat(time.split(':')[0].toString());
              let m = parseFloat(time.split(':')[1].toString())
              let s = parseFloat(time.split(':')[2].toString())
              times = (h * 60 * 60 *1000) + (m * 60 * 1000) + (s * 1000)
          }else{
              times = 0;
          }
          return days + times
      }
  },
  methods: {
    resetDataApi(){
        this.dataApi ={
          date: '',
          time: ''
      }
    },
    openModel(isEdit,item) {
      this.isEdit = isEdit;
      if(isEdit = isEdit){
        this.editItem = item || {};
        this.itemApi = {
          id: item.id,
          name: item.name,
          determineTime: item.determineTime,
          remark: item.remark
        }
        //  处理毫秒转换、显示 天、时分秒
        let editTime = formatDuring(this.itemApi.determineTime,3).split('-');
        this.dataApi = {
            date: editTime[0] != '' ? editTime[0]*1 : '',
            time: editTime[1] != '' ? editTime[1] : ''
        }
      }else{
        this.itemApi = {
          id: '',
          name: '',
          determineTime: '',
          remark: ''
        }
        this.resetDataApi();
      }
      this.show = true;
    },
    changePage(page) {
        this.apiData.currentPage = page;
        this.getList();
    },
    getList() {
      this.$http.post(this.api.storeruletypePage,this.apiData).then(res =>{
        if(res.code === 1000){
          this.list = res.data.list;
          this.totalCount = res.data.totalCount
        }
      })
    },
    // 编辑，新增提交表单
    handleSubmit() {
      this.$refs[this.ref].validate((valid) => {
          if(valid){
              if(this.dataApi.date != '' || this.dataApi.time != ''){
                this.loading = true;
                let params = JSON.parse(JSON.stringify(this.itemApi));
                params.determineTime = this.formateMsec
                if(this.isEdit){
                    params.id = this.editItem.id;
                    params.name = this.itemApi.name;
                    params.remark = this.itemApi.remark;
                    this.dataApi ={
                        date: '',
                        time: ''
                    }
                }
                let apiUrl = this.isEdit ? this.api.updateStoreRuleType : this.api.saveStoreRuleType;
                this.$http.post(apiUrl,params).then(res => {
                    if(res.code === 1000){
                        this.getList();
                        this.$Message.success('操作成功');
                        this.show = false;
                    }else{
                        this.$Message.error(res.message);
                    }
                    this.loading = false
                })
              }else{
                this.$Message.error('请将时间单元选择完整');
                }
          }else{
              this.$Message.error('表单验证失败');
          }
      })
    },
    //  删除
    deleteItem(item) {
        this.$Modal.confirm({
            title: '删除提示！',
            content: '删除后无法撤销，是否继续？',
            onOk: () =>{
              let params = {
                  id: item.id
              }
              this.$http.post(this.api.deleteStoreRuleType, params).then(res => {
                  if(res.code === 1000){
                      this.getList();
                      this.$Message.success('删除成功')
                  }else if(res.code === -1){
                      this.$Message.error(res.message)
                  }else{
                      this.$message.error('删除失败')
                  }
              })
            }
        })
    }
  },
  created () {
    this.getList();
  }
  
}
</script>
<style lang="less" scoped>
.form-star{
    position: relative;
    &:before{
        content: '*';
        position: absolute;
        left: 6px;
        top: 68px;
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
    }
}
.card {
    position: relative;
    margin-bottom: 20px;
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
        bottom: 0;
    }
} 
</style>
