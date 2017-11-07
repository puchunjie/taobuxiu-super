<template>
    <iframe class="ifram" :src="pipUrl"></iframe>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        computed: {
            ...mapGetters(['loginId'])
        },
        data() {
            return {
                pipUrl: ''
            }
        },
        created() {
            let origin = window.location.origin;
            this.pipUrl = origin + '/qd/superAgent-' + this.loginId;
        }
    }
</script>

<style lang="less" scoped>
    .ifram {
        position: relative;
        left: -13%;
        width: 120%;
        height: 800px;
        transform: scale(0.8);
    }
</style>

