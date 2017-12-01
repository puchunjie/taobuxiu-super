<template>
  <div class="panel">
        <Card :bordered="false" class="card">
          <p slot="title">基础数据排序配置</p>
          <div>
            <Form :mode="filterData" :label-width="80" inline style="margin-top:24px;">
              <FormItem prop="name" label="数据类型">
                <Select v-model="filterData.type" @on-change="onFilter" placeholder="请选择" style="width:150px">
                    <Option v-for="item in typeData" :key="item.id" :value="item.id" >{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem prop="name" label="数据品类">
                <Select v-model="filterData.baseId" @on-change="onFilter" placeholder="请选择" style="width:150px">
                  <Option v-for="item in ironTypes" :key="item.id" :value="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                  <Button type="warning" @click.native="resetFilter">清除</Button>
              </FormItem>
            </Form>
          </div>
          <Table border :columns="columns" :data="filterList"></Table>
          <Page class="page-count" size="small" :total="totalCount" :page-size="filterData.pageSize" @on-change="changePage"></Page>
        </Card>
        <Modal v-model="show" title="编辑基础数据排序指数" :closable="false" :mask-closable="false">
            <Form :label-width="100" :ref="ref" :model="itemApi" :rules="rules">
              <FormItem label="数据列表：">
                {{itemData.dataType | sortType}}
              </FormItem>
              <FormItem label="数据名称：">
                {{itemData.dataName}}
              </FormItem>
              <FormItem label="排序指数：" prop="sort">
                <input class="ivu-input ivu-input-small" type="number" v-model="itemApi.sort"  placeholder="请输入...">
              </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="show = false">取消</Button>
                <Button type="primary" @click="sortSubmit" :loading="loading">确认保存</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import {dateformat,sortType} from '@/utils/filters'
export default {
  data () {
    return {
      ref: 'form' + new Date().getTime(),
      filterData: {
        type: '',
        baseId: '',
        pageSize: 10,
        currentPage: 1
      },
      typeData: [{
        name: '品类',
        id: 1
      },{
        name: '材质',
        id: 2
      },{
        name: '表面',
        id: 3
      },{
        name: '产地',
        id: 4
      }],
      ironTypes: [],
      columns: [{
        title: 'id',
        key: 'baseId'
      },{
        title: '数据类型',
        key: 'type',
        sortable: true,
        render: (h,params) => {
          return h('span',[
            h('span',sortType(params.row.type))
          ])
        }
      },{
        title: '数据名称',
        key: 'baseName'
      },{
        title: '排序指数',
        sortable: true,
        key: 'sortIndex'
      },{
        title: '最近操作人',
        key: 'updateUser'
      },{
        title: '最近操作时间',
        key: 'updateTime',
        render: (h,params) => {
          return h('span',[
            h('span',dateformat(params.row.updateTime))
          ])
        }
      },{
        title: '操作',
        render: (h,params) => {
          return h('div',[
            h('Button',{
              props: {
                type: 'ghost',
                size: 'small'
              },
              on: {
                click: () =>{
                  this.setData(params.row)
                }
              }
            },'设为默认'),
            h('Button',{
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () =>{
                  this.modifyData(params.row)
                }
                }
            },'编辑'),
          ])
        }
      }],
      list: [],
      totalCount: 0,
      show: false,
      itemApi: {
        baseId: '',
        sort: ''
      },
      itemData: {
        dataType: '',
        dataName: '' 
      },
      rules: {
        sort: [{
          required: true,
          message: '请输入排序',
        }]
      },
      loading: false,
    }
  },
  computed: {
    //   给table数据整形
    filterList() {
        let arr = [];
        this.list.forEach(el => {
          let item = {};
          this.columns.forEach(el2 => {
            if(_.isArray(el[el2.key])){
              item[el2.key] =  el[el2.key].join()
            }else{
              item[el2.key] =  el[el2.key]
            }
          });
          arr.push(item)
        });
        return arr;
      }
  },
  methods: {
    resetFilter() {
      this.filterData = {
        type: '',
        baseId: '',
        pageSize: 10,
        currentPage: 1
      }
    },
    //   获取列表
    getData() {
      this.$http.post(this.api.findBaseSortList,this.filterData).then(res => {
        if(res.code === 1000){
          this.list = res.data.list;
          this.totalCount = res.data.totalCount;
        }
      })
    },
    //   保存编辑排序
    sortSubmit() {
       this.$refs[this.ref].validate((valid) => {
         if(valid){
           let params = JSON.parse(JSON.stringify(this.itemApi));
           this.$http.post(this.api.updateBaseSort,params).then(res => {
             if(res.code === 1000){
               this.show = false
               this.$Message.success('保存成功')
               this.getData();
             }else{
               this.$Message.error('保存失败')
             }
           })
         }else{
           this.$Message.error('表单验证失败')
         }
       })
    },
    modifyData(data) {
      this.show = true;
      this.itemData = {
          dataType: data.type,
          dataName: data.baseName
      }
      this.itemApi = {
        baseId: data.baseId,
        sort: data.sortIndex
      }
    },
    //  设为默认
    setData(data) {
      this.$Modal.confirm({
        title: '设为默认提示!',
        content: '确认设为默认？',
        onOk: () =>{
          let base = {
            baseId: data.baseId
          };
          let params = JSON.parse(JSON.stringify(base))
          this.$http.post(this.api.setBaseSortZero,params).then(res => {
            if(res.code === 1000){
              this.getData();
              this.$Message.success('设为默认成功');
            }else{
              this.$Message.error('设为默认失败')
            }
          })
        }
      })
    },
    changePage(page) {
        this.filterData.currentPage = page;
        this.getData();
    },
    onFilter() {
      this.getData();
      this.filterData.currentPage = 1
      this.$http.all([
          this.getIronTypes(),
          this.getMaterials(),
          this.getSurFaces(),
          this.getPlaces()
      ]).then(res => {
          res.forEach((el, index) => {
              if (el.code === 1000) {
                if(this.filterData.type === index + 1){
                  this.ironTypes = []
                  this.ironTypes.push(...el.data)
                }
              }
          })
      })
    },
    // 获取品类
    getIronTypes() {
        return this.$http.get(this.api.queryIronTypes)
    },
    // 获取材质
    getMaterials() {
        return this.$http.get(this.api.queryMaterials)
    },
    // 获取表面
    getSurFaces() {
        return this.$http.get(this.api.querySurFaces)
    },
    // 获取产地
    getPlaces() {
        return this.$http.get(this.api.queryPlaces)
    },  
  },
  created () {
    this.getData();
  }
}
</script>
<style lang="less" scoped>
.card {
    position: relative;
    margin-bottom: 20px;
    padding-bottom: 40px;
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