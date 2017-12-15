<template>
    <div class="status-select">
        <div class="item" v-for="(item,i) in data" :key="i" @click="pickerStatus(i)" :class="{'active':activeStatus == i}">
            {{ item.label }}{{ item.count > 0 ? `(${item.count})` : '' }}
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            value: {
                type:[String, Number]
            },
            data: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        data() {
            return {
                activeStatus: 0
            }
        },
        watch: {
          value(val){
              this.itemValue = val;
          },
          activeStatus(val){
              this.$emit('input',this.data[val].value)
          }  
        },
        methods: {
            pickerStatus(i) {
                if(i != this.activeStatus && this.data[i].count>0){
                    this.activeStatus = i;
                }
                
            }
        }
    }
</script>


<style lang="less" scoped>
    .status-select {
        position: relative;
        line-height: 36px;
        color: #333;
        font-size: 14px;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 15px;
        .item {
            display: inline-block;
            padding: 0 20px;
            cursor: pointer;
            &.active {
                border-bottom: 2px solid #2d8cf0;
                color: #2d8cf0;
                cursor: default;
            }
        }
    }
</style>
