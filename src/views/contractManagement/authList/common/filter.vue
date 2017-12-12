<template>
    <div class="filters">
        <Form ref="formInline" inline :label-width="80">
            <FormItem label="合同编号：" class="magin0" style="width: 280px;">
                <Input type="text" v-model="detail.contactId" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="甲方公司：" class="magin0" style="width: 280px;">
                <Input type="text" v-model="detail.firstCompanyName" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="乙方公司：" class="magin0" style="width: 280px;">
                <Input type="text" v-model="detail.secondCompanyName" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="更新时间：" class="magin0">
                <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="updateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
            </FormItem>
            <FormItem label="起草时间：" class="magin0">
                <DatePicker type="daterange" :clearable="false" :options="dateOption" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
            </FormItem>
            <FormItem label="订单编号：" class="magin0" style="width: 280px;">
                <Input type="text" v-model="detail.orderId" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem>
                <Button type="warning" @click.native="resetFilter">清除</Button>
            </FormItem>
        </Form>
        <div class="status-select">
            <div class="item" v-for="(item,i) in data" :key="i" @click="pickerStatus(i)" :class="{'active':activeStatus == i}">
                {{ item.label }}{{ item.count > 0 ? `(${item.count})` : '' }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String, Number]
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
                detail: {
                    contractId: '',
                    orderId: '',
                    firstCompanyName: '',
                    secondCompanyName: ''
                },
                activeStatus: '',
                updateValue: ['', ''],
                dateValue: ['', ''],
                dateOption: {
                    shortcuts: [{
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
            }
        },
        computed: {
            filters() {
                let data = {};
                data.contactId = this.detail.contactId;
                data.orderId = this.detail.orderId;
                data.firstCompanyName = this.detail.firstCompanyName;
                data.secondCompanyName = this.detail.secondCompanyName;
                data.startTime = this.updateValue[0] != '' ? this.updateValue[0].getTime() : '';
                data.endTime = this.updateValue[1] != '' ? this.updateValue[1].getTime() : '';
                data.startCreateTime = this.dateValue[0] != '' ? this.dateValue[0].getTime() : '';
                data.endCreateTime = this.dateValue[1] != '' ? this.dateValue[1].getTime() : '';
                data.checkStatus = this.activeStatus;
                return data;
            }
        },
        methods: {
            // 清除筛选条件
            resetFilter() {
                this.detail = {
                    contactId: '',
                    orderId: '',
                    firstCompanyName: '',
                    secondCompanyName: ''
                };
                this.updateValue = ['', '']
                this.dateValue = ['', '']
            },
            pickerStatus(i) {
                if (i != this.activeStatus && this.data[i].count > 0) {
                    this.activeStatus = i;
                }
            }
        },
        watch: {
            filters: _.debounce(function(now) {
                this.$emit('on-change', now)
            }, 200),
            value(val) {
                this.itemValue = val;
            },
            activeStatus(val) {
                this.$emit('input', this.data[val].value)
            }
        }
    
    }
</script>

<style lang='less' scoped>
    .filters {
        background: #fff;
        padding: 10px 15px;
    }
    .status-select {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 15px;
        background-color: #fff;
        height: 40px;
        .item {
            position: relative;
            display: inline-block;
            padding: 0 15px;
            line-height: 40px;
            color: #333;
            font-size: 14px;
            cursor: pointer;
            &.active {
                color: #2d8cf0;
                ;
                cursor: default;
                &:before {
                    content: '';
                    position: absolute;
                    border-bottom: 2px solid #2d8cf0;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }
            }
        }
    }
</style>