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

// 为空处理
export const isEmpty = (value, params) => {
    if (value != '') {
        return value
    } else {
        return params ? params : '全部'
    }
}


// //接口类型转换图标
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
    return df.format(new Date(value), fromatStr)
}