<template>
    <div class="thinkWrap" :style="{left:x,top:y}" v-clickoutside="ousideClick">
        <a v-for="item in list" :key="item.id" @click="selectItem(item.name)">{{item.name}}</a>
    </div>
</template>

<script>
    export default {
        props: {
            x: [String,Number],
            y: [String,Number],
            apiData: String
        },
        data() {
            return {
                list: [],
            }
        },
        methods: {
            getData: _.debounce(function() {
                this.$http.post(this.apiData).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data
                    }
                });
            }, 100),
            selectItem(data) {
                this.$emit('on-item-click',data)
            },
            ousideClick() {
                this.$emit('on-out-click')
            }
        },
        created () {
            this.getData()
        }
    }
</script>

<style lang='less' scoped>
    .thinkWrap{
        position: absolute;
        width: 280px;
        min-height: 100px;
        background: #fff;
        padding: 10px;
        box-shadow: 0 3px 4px rgba(0,0,0,.2);
        z-index: 999;
        a{
            display: inline-block;
            line-height: 26px;
            color: #333;
            padding: 0 8px;
            &:hover{
                color: #2d8cf0
            }
        }
    }
</style>