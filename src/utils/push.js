import * as types from '@/store/types'
import {
  MathRand
} from '@/utils/tools.js'
export default {
  data() {
    return {
      isFocus: true,
      titleInit: document.title,
      stl: '',
      msg: '默认通知',
      isNotice: true
    }
  },
  methods: {
    initScoket() {
      let _this = this;
      let rand = this.$ls.get('rand');
      if (rand == null) {
        rand = MathRand();
        this.$ls.set('rand', rand);
      }
      // 建立WebSocket链接
      let ws = new WebSocket(this.api.ws + '/quality?' + this.$store.state.loginId + rand);

      ws.onopen = function (evt) {
        //  console.log("消息推送链接成功");
      };

      ws.onmessage = function (evt) {
        let data = JSON.parse(evt.data);
        _this.isNotice = false;
        _this.msg = data;
        _this.notify(data);
      };

      ws.onclose = function (evt) {
        // console.log("Connection closed.");
        setTimeout(() => {
          _this.initScoket();
        }, 10000)
      };

      if (window.Notification)
        Notification.requestPermission();
    },
    notify(data) {
      let _this = this;
      let title = data.title;
      let body = data.body;
      if (window.Notification && Notification.permission == 'granted') {
        let notif = new Notification(title, {
          body: body, //通知的具体内容
          requireInteraction: true
        });
        notif.onclick = () => {
          // 1 求购消息推送 2 质检消息推送 3 中标
          if (data.code == 1 || data.code == 3) {
            //  跳转到求购
            this.$router.push('/ironBuys');
          } else if (data.code == 3) {
            //  跳转到质检
            this.$router.push('/quality');
          } else if (data.code == 21 || data.code == 24 || data.code == 27) {
            this.$router.push('/stockOrder')
          } else if (data.code == 22 || data.code == 25 || data.code == 28) {
            this.$router.push('/planOrder')
          } else if (data.code == 23 || data.code == 26 || data.code == 29) {
            this.$router.push('/specialOrder')
          } else if (data.code == 31 || data.code == 32 || data.code == 33) {
            this.$router.push('/authentication')
          } else if (data.code == 34 || data.code == 35 || data.code == 36) {
            this.$router.push('/authList')
          }
          window.focus();
          notif.close();
        }
        this.isNotice = true;
      } else {
        if (this.isFocus) {
          this.$Notice.success({
            title: title,
            desc: body
          });
          this.isNotice = true;
        } else {
          this.stl = setInterval(function () {
            let title = document.title;
            if (/新/.test(title) == false) {
              document.title = '【你有新消息】' + _this.titleInit;
            } else {
              document.title = '【　　　　　】' + _this.titleInit;
            }
          }, 500);
        }
      }
    }
  }
}
