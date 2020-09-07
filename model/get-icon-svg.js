/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/8
 */

let getAPI = require('./cug/utils/getAPI');
let data=getAPI.get("http://ditu.zjzwfw.gov.cn/mapserver/styleInfo/zjvmap/tdt_biaozhunyangshi_2017/label/texture.js?0.2614439576646459&x={x}&y={y}&l={z}&styleId=tdt_biaozhunyangshi_2017");
console.log(data);
