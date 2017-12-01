<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">配置订单有效确认时间选项</p>
        <Button slot="extra" size="small" type="success" @click="openModel(false)">新增时间选项</Button>
        <div class="card-contnet">
            <div class="table-contnet">
                <Row class-name="head">
                    <Col class-name="col" span="7">选项名称</Col>
                    <Col class-name="col" span="7">时间</Col>
                    <Col class-name="col" span="5">备注说明</Col>
                    <Col class-name="col" span="5">操作</Col>
                </Row>
                <Row v-for="(item,index) in list" :key="item.id">
                    <Col class-name="col" span="7">{{ item.name }}</Col>
                    <Col class-name="col" span="7">{{ item.determineTime | formatDuring(params = 2) }}</Col>
                    <Col class-name="col" span="5">{{ item.remark | isEmpty(params ='暂无')}}</Col>
                    <Col class-name="col" span="5">
                        <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
                        <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
                    </Col>
                </Row>
            </div>
            <Page class="page-count" size="small" :total="totalCount" :page-size="dataApi.pageSize" @on-change="changePage"></Page>
        </div>
    </Card>
    <Modal v-model="show" :title="isEdit?`编辑订单有效确认时间选项`:`添加订单有效确认时间选项`" :closable="false" :mask-closable="false">
      <Form :label-width="110" :ref="ref" :model="itemApi" :rules="rules">
          <FormItem label="选项名称：" prop="name">
              <Input type="text" v-model="itemApi.name" size="small" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="时间设置：" prop="determineTime">
            <TimePicker type="time" v-model="itemApi.determineTime" confirm placeholder="时分秒" size="small" style="width: 168px;display:inline-block"></TimePicker>
          </FormItem>
          <FormItem label="备注：" prop="remark">
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
import {formatDuring, dataToTime} from '@/utils/filters'
export default {
    data () {
        return {
            ref: 'form' + new Date().getTime(),
            isEdit: false,
            show: false,
            loading: false,
            dataApi: {
                pageSize: 10,
                currentPage: 1
            },
            list: [],
            totalCount: 0,
            itemApi: {
                name: '',
                determineTime: '',
                remark: ''
            },
            editItem: {},
            rules: {
                name:[{
                    required: true,
                    message: '请输入选项名称'
                }],
                determineTime: [{
                    required: true,
                    message: '请选择时间设置'
                }]
            }
        }
    },
    computed: {
        //  时分秒转毫秒
      formateMsec () {
          let time = dataToTime(this.itemApi.determineTime);
          let times;
          if(time != '' && time != undefined) {
              let h = parseFloat(time.split(':')[0].toString());
              let m = parseFloat(time.split(':')[1].toString())
              let s = parseFloat(time.split(':')[2].toString())
              times = (h * 60 * 60 *1000) + (m * 60 * 1000) + (s * 1000)
          }
          return times
      }
    },
    methods: {
        openModel(isEdit,item) {
            this.show = true
            this.isEdit = isEdit
            if(isEdit = isEdit){
                this.editItem = item || {}
                this.itemApi = {
                    name: item.name,
                    determineTime: item.determineTime,
                    remark: item.remark
                }
                //  编辑时显示时分秒
                this.itemApi.determineTime = formatDuring(this.itemApi.determineTime)
            }else{
                 this.itemApi = {
                    name: '',
                    determineTime: '',
                    remark: ''
                }
            }

        },
        changePage(page) {
            this.dataApi.currentPage = page;
            this.getAllList();
        },
        getAllList() {
            this.$http.post(this.api.storerSubOrderPage,this.dataApi).then(res => {
                if(res.code === 1000){
                    this.list = res.data.list;
                    this.totalCount = res.data.totalCount
                }
            })
        },
        //  删除
        deleteItem(data) {
            this.$Modal.confirm({
            title: '删除提示！',
            content: '删除后无法撤销，是否继续？',
            onOk: () =>{
              let params = {
                  id: data.id
              }
              this.$http.post(this.api.deleteStorerSubOrder, params).then(res => {
                  if(res.code === 1000){
                      this.getAllList();
                      this.$Message.success('删除成功')
                  }else{
                      this.$message.error('删除失败')
                  }
              })
            }
        })
        },
        // 提交表单
        handleSubmit(){
            this.$refs[this.ref].validate((valid) => {
                if(valid){
                    this.loading = true;
                    let params = JSON.parse(JSON.stringify(this.itemApi))
                    params.determineTime = this.formateMsec
                    if(this.isEdit){
                        params.id = this.editItem.id;
                        params.name = this.itemApi.name;
                        params.name = this.itemApi.determineTime;
                        params.remark = this.itemApi.remark;
                    }
                    let apiUrl = this.isEdit ? this.api.updateStorerSubOrder: this.api.saveStorerSubOrder
                    this.$http.post(apiUrl,params).then(res => {
                        if(res.code === 1000){
                            this.$Message.success('保存成功');
                            this.getAllList();
                            this.show = false;
                        }else{
                            this.$Message.error('提交失败')
                        }
                    this.loading = false;
                    })
                }else{
                    this.$message.error('表单验证失败')
                }
            })
        }
    },
    created () {
        this.getAllList();
    }
  
}
</script>
<style lang="less" scoped>
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

