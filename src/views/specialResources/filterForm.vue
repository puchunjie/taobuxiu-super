<template>
    <div>
        <div class="group" v-for="(group,index) in filterData" :key="index">
            <div class="head">
                <h4><span class="title" :title="group.title">{{ group.title }}</span> ：</h4>
            </div>
            <div class="body">
                <div class="item clearfix">
                    <a class="tag" :class="{ 'active':group.activeIndex === i} " @click="group.activeIndex = i" v-for="(item,i) in group.list" :key="i">
                                {{ item }}
                            </a>
                </div>
            </div>
            <div class="foot">
                <span class="more" @click="resetGroup(group)">重置</span>
            </div>
        </div>
        <div class="group">
            <div class="head">
                <h4><span class="title" title="发起时间">发起时间</span> ：</h4>
            </div>
            <div class="body">
                <div class="item clearfix">
                    <a class="tag">
                        <DatePicker v-model="dateValue" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期范围" style="width: 200px"></DatePicker>
                    </a>
                </div>
            </div>
            <div class="foot">
                <!-- <span class="more" @click="resetGroup(group)">重置</span> -->
            </div>
        </div>
    </div>
</template>

<script>
    import {
        ironTypes,
        surfaces,
        materials,
        proPlaces
    } from '@/utils/data'
    export default {
        data() {
            return {
                filterData: [{
                        title: '品类',
                        key: 'type',
                        list: ['全部', ...ironTypes]
                    },
                    {
                        title: '表面',
                        key: 'surface',
                        list: ['全部', ...surfaces]
                    },
                    {
                        title: '材质',
                        key: 'material',
                        list: ['全部', ...materials]
                    },
                    {
                        title: '产地',
                        key: 'proPlace',
                        list: ['全部', ...proPlaces]
                    },
                    {
                        title: '状态',
                        key: 'status',
                        list: ['全部', '在线', '下架']
                    }
                ],
                dateValue: []
            }
        },
        created() {
            this.filterData.forEach(el => {
                this.$set(el, 'activeIndex', 0);
            });
        },
        computed: {
            filters() {
                let data = {};
                this.filterData.forEach(el => {
                    data[el.key] = el.list[el.activeIndex] === '全部' ? '' : el.list[el.activeIndex];
                });
                data.date = this.dateValue
                return data
            }
        },
        methods: {
            resetGroup(group) {
                group.activeIndex = 0;
            }
        },
        watch: {
            filters(now) {}
        }
    }
</script>


<style lang="less" scoped>
    .filter-tip {
        padding: 20px;
        overflow: hidden;
        .active-item {
            display: inline-block;
            position: relative;
            margin-left: 10px;
            top: 4px;
            right: 5px;
            padding: 0 4px;
            max-width: 144px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: 1px solid #e8e8e8;
            height: 18px;
            line-height: 18px;
            color: #666;
            text-decoration: none;
            i {
                font-size: 12px;
                margin-left: 5px;
            }
            &:hover {
                border-color: #007de4;
                color: #007de4;
            }
        }
    }
    
    .group {
        position: relative;
        margin: 0 8px;
        border-bottom: 1px dashed #dedede;
        &:last-child {
            border-bottom: none;
        }
        .head {
            position: absolute;
            left: 11px;
            top: 9px;
            color: #999;
        }
        .body {
            padding: 0 100px 0 112px;
            .item {
                // height: 36px;
                overflow: hidden;
            }
            .items-show2line {
                height: 72px;
            }
            .tag {
                float: left;
                margin: 9px 40px 9px 0;
                color: #000;
                text-decoration: none;
                &:hover {
                    color: #007de4;
                }
                &.active {
                    color: #007de4;
                }
            }
        }
        .foot {
            position: absolute;
            right: 0;
            top: 8px;
            .more {
                position: absolute;
                right: 10px;
                height: 18px;
                padding-right: 10px;
                line-height: 18px;
                cursor: pointer;
                white-space: nowrap;
                &:hover {
                    color: #007de4;
                }
            }
        }
    }
</style>

