<template>
    <div class="img-upload-container">
        <img :src="defaultImg">
        <label class="img-show" :for="id">请选择图片</label>
        <input :id="id" type="file" accept="image/*" ref="file" multiple="multiple">
    </div>
</template>

<script>
    export default {
        props:{
            defaultImg:{
                type: String,
                default:'http://www.itaobuxiu.com/files/ads/g_pic.png'
            }
        },
        data () {
            return {
                id: ''
            }
        },
        created () {
            this.id = 'file' + Math.round(Math.random() * 10000);
        }
    }
</script>


<style lang="less" scoped>
    .img-upload-container{
        position: relative;
        width: 100%;
        height: 100%;
        img{
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            pointer-events: none;
        }
        .img-show{
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
            background-size: cover;
        }
        input {
            display: none;
        }
    }
</style>

