<template>
    <div>
        <FilterForm @on-change="doFilter"></FilterForm>
        <div class="order-list">
            订单列表
        </div>
    </div>
</template>

<script>
import FilterForm from '../orderFilter/stockFilter'
export default {
    components: {
        FilterForm
    },
    data () {
        return {
            params: {},
            screenApi: {
                pageSize: 10,
                currentPage: 0
            },
            list: [],
            totalCount: 0,
            loading: false
        }
    },
    methods: {
        //  筛选
        doFilter(data){
            let params = _.cloneDeep(data);
            this.screenApi.currentPage = 1;
            params.pageSize = this.screenApi.pageSize;
            params.currentPage = this.screenApi.currentPage;
            this.params = params
        },
        //  获取现货资源列表
        getStockList(params) {
            this.$http.post(this.api,params).then(res => {
                
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>

