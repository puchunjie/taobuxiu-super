<template>
   <div id="app" class="main-container">
    <router-view></router-view>
  </div>
</template>
<script>
import mapGetters from 'vuex'
import push from '@/utils/push.js'

export default {
//   mixins: [push],
//   computed: {
//       ...mapGetters(['user', 'base'])
//   },
//   methods: {
//       getUserInfor() {
//           this.$http.post(this.api.getUserInfo).then(res => {
//             if (res.code === 1000) {
//                 this.$store.commit(types.SET_USER_INFO, res.data);
//                 document.addEventListener('visibilitychange', () => {
//                 let isHidden = document.hidden;
//                 if (isHidden) {
//                     this.isFocus = false;
//                 } else {
//                     this.isFocus = true;
//                     document.title = this.titleInit;
//                     window.clearInterval(this.stl);
//                     if (!this.isNotice) {
//                     this.notify(this.msg)
//                     }
//                 }
//                 });
//                 this.initScoket();
//             }
//           })
//       }
//   },
//   created () {
//       this.getUserInfo();
//   }
}
</script>

