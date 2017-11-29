import df from 'dateformat-util'

//接口类型转换图标
export const toIcon = value => {
  let icon = '';
  switch (value) {
    case 0:
      icon = "icon-weizhi";
      break;
    case 1:
      icon = "icon-chaxun";
      break;
    case 2:
      icon = "icon-zengjia";
      break;
    case 3:
      icon = "icon-gengxin";
      break;
    case 4:
      icon = "icon-shanchu";
      break;
    default:
      break;
  }
  return icon
}

// 求购状态
export const statusStr = (val) => {
  switch (val * 1) {
    case 1:
      return '进行中'
      break;
    case 2:
      return '已成交'
      break;
    case 3:
      return '已失效'
      break;
    default:
      return '失效'
      break;
  }
}

// 报价状态
export const offerStr = (val) => {
  switch (val * 1) {
    case 0:
      return '待报价'
      break;
    case 1:
      return '已报价'
      break;
    case 2:
      return '已成交'
      break;
    case 3:
      return '未中标'
      break;
    case 4:
      return '已忽略'
      break;
    default:
      return '失效'
      break;
  }
}

// 中标状态
export const isOfferStatus = (val) => {
  switch (val * 1) {
    case 2:
      return '中标'
      break;
    case 3:
      return '未中标'
      break;
    default:
      return '未知'
      break;
  }
}

// 发布平台
export const wherePublish = value => {
  switch (value * 1) {
    case 1:
      return 'PC'
      break;
    case 2:
      return 'H5'
      break;
    case 3:
      return 'ios'
      break;
    case 4:
      return 'android'
      break;
    default:
      return '全部'
      break;
  }
}
//  定开计划状态
export const dkStatus = (val) => {
  switch (val * 1) {
    case 0:
      return '用户下架'
      break;
    case 1:
      return '上架'
      break;
    case 2:
      return '超管下架'
      break;
    case 3:
      return '系统下架'
      break;
    case 7:
      return '超管删除'
      break;
    case 9:
      return '用户删除'
      break;
  }
}
// 是否含税
export const taxTypeStatus = (val) => {
  switch (val * 1) {
    case 1:
      return '含税'
      break;
    case 2:
      return '不含税'
      break;
  }
}
//  处理数据排序类型
export const sortType = (val) => {
  switch (val * 1) {
    case 1:
      return '品类'
      break;
    case 2:
      return '材质'
      break;
    case 3:
      return '表面'
      break;
    case 4:
      return '产地'
      break;
  }
}

//  处理资源类型
export const storeType = (val) => {
  switch (val * 1) {
    case 1:
      return '现货资源'
      break;
    case 2:
      return '定开计划'
      break;
    case 3:
      return '特价资源'
      break;
  }
}
//  处理资源类型
export const typeData = (val) => {
  switch (val * 1) {
    case 1:
      return '板卷'
      break;
    case 2:
      return '非板卷'
      break;
    case 3:
      return '其他'
      break;
  }
}

// 为空处理
export const isEmpty = (value, params) => {
  if (value != '') {
    return value
  } else {
    return params ? params : '全部'
  }
}
 
export const nowStatus = (val) => {
  switch (val * 1){
    case 1:
      return '开放中'
      break;
    case 2:
      return '已闭市'
      break;
    case 3:
      return '开放中'
      break;
    case 4:
      return '已闭市'
      break;
  }
}
// 常规休市日显示
export const dealRestDay = (val) => {
  var w = ['','周一', '周二', '周三', '周四', '周五', '周六', '周日']

  function numberToWeek(num) {
    var str = num.toString();
    var len = num.toString().length;
    var C_Num = [];
    for (var i = 0; i < len; i++) {
      C_Num.push(w[str.charAt(i)]);
    }
    return C_Num.join('');
  }
  if (val != '') {
    return numberToWeek(val)
  }else{
    return '无'
  }
}

// 时间戳转时分秒
export const dataToTime = (val, fromatStr = 'yyyy-MM-dd hh:mm:ss') => {
  var time = df.format(new Date(val), fromatStr)
  if(time != '' || time != NaN){
    var t = time.split(' ');
    return t[1];
  }
}
//  将毫秒转为天时分秒
export const formatDuring = (mss) => {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}
// //接口类型转换图标
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
  return df.format(new Date(value), fromatStr)
}
