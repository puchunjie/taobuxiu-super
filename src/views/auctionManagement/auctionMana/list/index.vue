<template>
  <div class="panel">
    <Card :bordered="false" class="card">
      <p slot="title">拍品管理</p>
      <Button slot="extra" type="primary" @click="addAuction">新增拍品</Button>
      <Form :mode="pageApi" :label-width="80" inline>
        <FormItem label="商户名称：">
          <Input type="text" v-model="pageApi.companyName" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="场次编号：">
          <Input type="text" v-model="pageApi.auctionId" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="更新时间：">
          <DatePicker type="daterange" :clearable="false" v-model="dateValue" placement="bottom-end" placeholder="选择日期" style="width: 180px;"></DatePicker>
        </FormItem>
        <FormItem label="有无底价：">
          <Select v-model="pageApi.reservePrice" placeholder="请选择" style="width:150px">
            <Option v-for="item in [{id:'true',name: '有'},{id:'false',name: '无'}]" :key="item.id" :value="item.id" >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="品类：">
          <Select v-model="pageApi.ironType" style="width: 150px;">
            <Option v-for="(item,index) in filterList[0].list" :key="index" :value="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="表面：">
          <Select v-model="pageApi.surface" style="width: 150px;">
            <Option v-for="(item,index) in filterList[1].list" :key="index" :value="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="材质：">
          <Select v-model="pageApi.material" style="width: 150px;">
            <Option v-for="(item,index) in filterList[2].list" :key="index" :value="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="产地：">
          <Select v-model="pageApi.proPlace" style="width: 150px;">
            <Option v-for="(item,index) in filterList[3].list" :key="index" :value="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="货品种类：">
          <Select v-model="pageApi.goodTypes" style="width: 150px;">
            <Option v-for="(item,index) in filterList[4].list" :key="index" :value="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="公差：">
          <Input type="text" v-model="pageApi.tolerance" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="重量：">
          <Input type="text" v-model="pageApi.weightMin" style="width: 60px;" placeholder="请输入..."></Input>
          <Input type="text" v-model="pageApi.weightMax" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="数量：">
          <Input type="text" v-model="pageApi.numberMin" style="width: 60px;" placeholder="请输入..."></Input>
          <Input type="text" v-model="pageApi.numberMax" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="起拍价：">
          <Input type="text" v-model="pageApi.priceMin" style="width: 60px;" placeholder="请输入..."></Input>
          <Input type="text" v-model="pageApi.priceMax" style="width: 60px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="更新人：">
          <Input type="text" v-model="pageApi.updateUser" style="width: 150px;" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="resetFilter">清除</Button>
        </FormItem>
      </Form>
      <div class="card-contnet">
        <Table border width="100%" :columns="tableHeader" :data="list"></Table>
        <Page class="page-count" size="small" :total="totalCount" show-total :current="pageApi.currentPage" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
  import {
    dateformat
  } from '@/utils/filters.js'
  export default {
    data() {
      return {
        pageApi: {
          currentPage: 1,
          pageSize: 10,
          companyName: "",
          auctionId: "",
          reservePrice: "",
          goodTypes: "",
          ironType: "",
          material: "",
          surface: "",
          proPlace: "",
          tolerance: "",
          weightMin: "",
          weightMax: "",
          numberMin: "",
          numberMax: "",
          priceMin: '',
          priceMax: '',
          startTime: "",
          endTime: "",
          updateUser: ""
        },
        list: [],
        totalCount: 0,
        dateValue: ["", ""],
        filterList: [{
          list: []
        }, {
          list: []
        }, {
          list: []
        }, {
          list: []
        }, {
          list: []
        }],
        tableHeader: [{
          title: '场次编号',
          key: 'id',
          width: 150
        }, {
          title: '商户名称',
          key: 'companyName',
          width: 200
        }, {
          title: '货品名称',
          key: 'ironType',
          width: 150,
          render: (h, params) => {
            let iron = params.row.ironType;
            let goodsType = params.row.goodsType;
            let reservePrice = params.row.reservePrice != '' ? '有底价' : '无底价';
            return h('div', [
              h('div', iron),
              h('span', {
                 style: {
                  color: '#fff',
                  display: 'inline-block',
                  background: '#2d8cf0',
                  borderRadius:'4px',
                  padding: '1px 4px'
                },
              }, reservePrice),
              h('span', goodsType)
            ])
          }
        }, {
          title: '货品详情',
          key: 'ironType',
          width: 150,
          render: (h, params) => {
            let specifiction = params.row.specifiction != '' ? params.row.specifiction : `${params.row.height}*${params.row.width}*${params.row.length}`
            let str = `${params.row.surface}/${params.row.material}/${specifiction}/${params.row.tolerance}`
            return h('div', str)
          }
        }, {
          title: '重量(KG)',
          key: 'weight',
          width: 100
        }, {
          title: '数量',
          key: 'number',
          width: 100
        }, {
          title: '产地',
          key: 'proPlace',
          width: 100
        }, {
          title: '仓库',
          key: 'storeHouse',
          width: 100
        }, {
          title: '地区',
          key: 'storeHouse',
          width: 100,
          render: (h, params) => {
            let str = `${params.row.province}${params.row.city}`
            return h('div', str)
          }
        }, {
          title: '起拍价(元/吨)',
          key: 'startPrice',
          width: 120
        }, {
          title: '状态',
          key: 'status',
          width: 100,
          render: (h, params) => {
            let status = params.row.status;
            let auctionStatus = params.row.auctionStatus;
            if (status === '1') {
              return h('div', '等待拍卖')
            } else if (status === '2') {
              return h('div', '正在拍卖')
            } else if (status === '3') {
              if (auctionStatus === '1') {
                return h('div', '有效')
              } else if (auctionStatus === '2') {
                return h('div', '已成交')
              } else if (auctionStatus === '3') {
                return h('div', '已流拍')
              }
            } else {
              return h('div', '已删除')
            }
          }
        }, {
          title: '更新时间',
          key: 'updateTime',
          width: 150,
          render: (h, params) => {
            return h('span', dateformat(params.row.updateTime))
          }
        }, {
          title: '更新人',
          key: 'updateUser',
          width: 200
        }, {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 180,
          render: (h, params) => {
            let status = params.row.status;
            let auctionStatus = params.row.auctionStatus;
            if (status === '1') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showEdit(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showDelete(params.row)
                    }
                  }
                }, '删除')
              ]);
            } else if (status === '2') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showDelete(params.row)
                    }
                  }
                }, '删除')
              ]);
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showCopy(params.row)
                    }
                  }
                }, '复制')
              ]);
            }
          }
        }]
      };
    },
    computed: {
      handleFilter() {
        return {
          currentPage: this.pageApi.currentPage,
          pageSize: this.pageApi.pageSize,
          companyName: this.pageApi.companyName,
          auctionId: this.pageApi.auctionId,
          reservePrice: this.pageApi.reservePrice,
          goodTypes: this.pageApi.goodTypes,
          ironType: this.pageApi.ironType,
          material: this.pageApi.material,
          surface: this.pageApi.surface,
          proPlace: this.pageApi.proPlace,
          tolerance: this.pageApi.tolerance,
          weightMin: this.pageApi.weightMin,
          weightMax: this.pageApi.weightMax,
          numberMin: this.pageApi.numberMin,
          numberMax: this.pageApi.numberMax,
          priceMax: this.pageApi.priceMax,
          priceMin: this.pageApi.priceMin,
          updateUser: this.pageApi.updateUser,
          startTime: this.dateValue[0] != "" ? new Date(this.dateValue[0]).getTime() : "",
          endTime: this.dateValue[1] != "" ? new Date(this.dateValue[1]).getTime() : "",
        };
      }
    },
    watch: {
      handleFilter: {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage) this.pageApi.currentPage = 1;
          this.getList(this.handleFilter);
        }, 200),
        deep: true
      }
    },
    methods: {
      showDetail(data) {
        this.$router.push('auctionDetail/' + data.id)
      },
      showEdit(data) {
        this.$router.push('auctionEdit/' + data.id)
      },
      showCopy(data) {
        this.$router.push('auctionCopy/' + data.id)
      },
      showDelete(data) {
        let params = {
          id: data.id
        }
        this.$Modal.confirm({
          title: "拍品删除",
          content: "是否确认删除拍品",
          onOk: () => {
            this.$http.post(this.api.deleteAuction, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success("删除成功");
                this.getList(this.handleFilter)
              } else {
                this.$Message.error(res.message)
              }
            });
          }
        });
      },
      addAuction() {
        this.$router.push('auctionAdd')
      },
      getList(params) {
        this.$http.post(this.api.findAuctionList, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        });
      },
      //  清除查询
      resetFilter() {
        this.pageApi = {
          currentPage: 1,
          pageSize: 10,
          companyName: "",
          auctionId: "",
          reservePrice: "",
          goodTypes: "",
          ironType: "",
          material: "",
          surface: "",
          proPlace: "",
          tolerance: "",
          weightMin: "",
          weightMax: "",
          numberMin: "",
          numberMax: "",
          priceMin: '',
          priceMax: '',
          startTime: "",
          endTime: "",
          updateUser: ""
        };
        this.dateValue = ["", ""];
        this.getList(this.handleFilter);
      },
      //  分页
      changePage(page) {
        this.pageApi.currentPage = page;
        this.getList(this.handleFilter);
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
      //  获取货品
      getAllGoodsTypeList() {
        return this.$http.get(this.api.getAllGoodsTypeList);
      }
    },
    created() {
      this.getList(this.handleFilter);
      this.$http
        .all([
          this.getIronTypes(),
          this.getSurFaces(),
          this.getMaterials(),
          this.getPlaces(),
          this.getAllGoodsTypeList(),
        ])
        .then(res => {
          res.forEach((el, index) => {
            if (el.code === 1000) {
              this.filterList[index].list.push(...el.data);
            }
          });
        });
    }
  };
</script>

<style lang='less' scoped>
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
  
  .modal {
    .ivu-form-item {
      margin-bottom: 10px;
    }
  }
</style>