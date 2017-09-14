<template>
    <div class="interface-content">
        <Card class="interface-group" v-for="(item,index) in interfaces" :key="index">
            <p slot="title">{{ item.name }}</p>
            <Tooltip placement="top" v-for="(sub,i) in item.interfaceInfoList" :key="i">
                <div class="item" :class="['status-'+sub.methodType,sub.flag ? '' : 'disable']" @click="selectInterface(sub)">
                    <div class="title">
                        <span class="iconfont" :class="sub.methodType | toIcon"></span> {{sub.name}}
                    </div>
                </div>
                <div slot="content">
                    <p>接口名称：{{ sub.name }}</p>
                    <p>接口地址：{{ sub.url }}</p>
                </div>
            </Tooltip>
        </Card>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                interfaces: []
            }
        },
        computed: {
            // 操作的是否为自己本身？
            isSelf() {
                return this.id.roleId === this.$store.getters.roleId
            }
        },
        methods: {
            getInterfaces(id) {
                console.log('当前选中角色roleId为：' + id.roleId);
                this.$http.post(this.api.getInterfaceById, id).then(res => {
                    if (res.code === 1000) {
                        this.interfaces = res.data.interfaceGroupList;
                    }
                })
            },
            // 勾选接口
            selectInterface(item) {
                if (!this.isSelf) {
                    item.flag = !item.flag;
                    this.$emit('on-item-click', JSON.parse(JSON.stringify(this.interfaces)));
                }
            }
        },
        created() {
            this.getInterfaces(this.id)
        },
        watch: {
            // 监听id的变化来获取不同角色的接口列表
            id(now) {
                this.getInterfaces(now)
            }
        }
    }
</script>

<style lang="less" scoped>
    .interface-content {
        position: relative;
        .interface-group {
            margin-bottom: 10px;
            .item {
                position: relative;
                width: 180px;
                float: left;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin: 0 10px 10px 0;
                cursor: pointer;
                overflow: hidden;
                color: #fff;
                .title {
                    position: relative;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-weight: bold;
                    font-size: 18px;
                    text-indent: 40px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .iconfont {
                        position: absolute;
                        text-indent: 0;
                        font-size: 38px;
                        left: 0;
                        top: 0;
                    }
                }
                .desc {
                    width: 100%;
                    height: 90px;
                    line-height: 20px;
                    padding: 10px;
                    text-indent: 10px;
                }
                .foot {
                    position: absolute;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    bottom: 0;
                    left: 0;
                    padding: 0 10px;
                    transition: height .3s;
                    border-top: 1px solid #ddd;
                    text-align: right;
                    .iconfont {
                        font-size: 20px;
                    }
                }
                &:hover .foot {
                    height: 30px;
                }
                &.disable {
                    background-color: gray;
                }
            }
        }
    }
</style>


