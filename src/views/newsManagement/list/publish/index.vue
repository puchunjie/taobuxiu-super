<template>
    <div>
        发布新闻列表
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filterData: {
                    pageSize: 10,
                    currentPage: 1,
                    status: 0,
                    typeId: '',
                    startTime: '',
                    endTime: '',
                    title: '',
                    article: '',
                    flag: ''
                }
            }
        },
        methods: {
            getList() {
                this.$http.post(this.api.findArticleList, this.filterData).then(res => {
                    if (res.code === 1000) {
                        console.log(res)
                    }
                })
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style lang='less' scoped>
    
</style>