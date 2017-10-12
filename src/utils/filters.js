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



// //接口类型转换图标
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
    return df.format(new Date(value), fromatStr)
}