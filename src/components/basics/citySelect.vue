<template>
    <Cascader ref='cs' :class="value != '请选择地区' ? 'city-picker' : ''" :data="arr" :load-data="loadData" :clearable="false" @on-change="exportData" :clearData="clearData" :placeholder="value">
    </Cascader>
</template>

<script>
    export default {
        props: {
            value: {
                type: String
            }
        },
        data() {
            return {
                arr: []
            };
        },
        watch: {
            value(){
                this.init();
            }
        },
        methods: {
            findProvince() {
                this.$http.post(this.api.findProvince).then(res => {
                    if (res.code === 1000) {
                        this.pipData(res.data, this.arr, true);
                    }
                });
            },
            findCity(id, item, callback) {
                this.$http
                    .post(this.api.findCity, {
                        id: id
                    })
                    .then(res => {
                        if (res.code === 1000) {
                            this.pipData(res.data, item);
                            item.loading = false;
                            callback();
                        }
                    });
            },
            findDistrict(id, item, callback) {
                this.$http
                    .post(this.api.findDistrict, {
                        id: id
                    })
                    .then(res => {
                        if (res.code === 1000) {
                            this.pipData(res.data, item);
                            item.loading = false;
                            callback();
                        }
                    });
            },
            loadData(item, callback) {
                item.loading = true;
                if (item.pid == '100000') {
                    this.findCity(item.value, item, callback);
                } else {
                    this.findDistrict(item.value, item, callback);
                }
            },
            pipData(arr, target, isArr = false) {
                arr.forEach(el => {
                    if (isArr) {
                        target.push({
                            value: el.id,
                            label: el.shortName,
                            children: [],
                            loading: false,
                            pid: el.parentId
                        });
                    } else {
                        if (target.pid == '100000') {
                            target.children.push({
                                value: el.id,
                                label: el.shortName,
                                children: [],
                                loading: false,
                            });
                        } else {
                            target.children.push({
                                value: el.id,
                                label: el.shortName
                            });
                        }
                    }
                });
            },
            exportData(value, selectedData) {
                this.$emit("on-pick", {
                    provinceName: selectedData[0].label,
                    cityName: selectedData[1].label,
                    districtName: selectedData[2].label
                });
            },
            //  清除数据
            clearData() {
                this.init();
            },
            init() {
                this.$nextTick(function() {
                    this.arr = [];
                    this.$refs.cs.currentValue = [];
                    this.$refs.cs.selected = [];
                    this.$refs.cs.tmpSelected = [];
                    this.$refs.cs.validDataStr = "";
                    this.findProvince();
                });
            }
        },
        created() {
            this.init();
        }
    };
</script>

<style lang='less'>
    .city-picker {
        input::-webkit-input-placeholder {
            color: #495060;
        }
        input:-ms-input-placeholder {
            color: #495060;
        }
        input:-moz-placeholder {
            color: #495060;
        }
        input::-moz-placeholder {
            color: #495060;
        }
    }
</style>

