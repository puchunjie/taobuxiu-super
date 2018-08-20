<template>
  <div>
    <Card class="home-ad-card">
      <p slot="title">{{title}}</p>
      <div class="main-ad">
        <Form :label-width="80">
          <FormItem label="上传图片：">
            <p v-show="position === '1' || position === '2'">尺寸:160*240</p>
            <p v-show="position === '3'">尺寸:179*90</p>
            <p v-show="position === '4'">尺寸:1320*90</p>
            <uploadBtn v-model="dataApi.src" :single="true"></uploadBtn>
          </FormItem>
          <FormItem label="商铺ID：">
            <Input v-model="dataApi.buserId" placeholder="请输入商铺ID"></Input>
          </FormItem>
          <FormItem label="颜色值：" v-if="position === '4'">
            <Input v-model="dataApi.bgColor" placeholder="请输入商铺ID"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
  import uploadBtn from '@/components/basics/uploadBtn'
  export default {
    components: {
      uploadBtn
    },
    props: {
      title: String,
      position: String,
      values: Object
    },
    data() {
      return {
        dataApi: {
          id: '',
          src: '',
          buserId: '',
          position: this.position,
          bgColor: ''
        }
      }
    },
    watch: {
      values(val) {
        this.dataApi = {
          id: val.id,
          src: val.src,
          buserId: val.buserId,
          position: val.position,
          bgColor: val.bgColor
        }
      }
    },
    methods: {
      save() {
        let params = this.$clearData(this.dataApi)
        this.$http.post(this.api.homeAdv, params).then(res => {
          if (res.code === 1000) {
            this.$Message.success('保存成功')
          } else {
            this.$Message.error(res.message)
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  .home-ad-card {
    margin-bottom: 15px;
    .main-ad {
      max-width: 400px;
    }
  }
</style>