/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/17
 */
var tools = require('../utils/utils');
var iOS = require('../entities/iOS');


let web2iOS = (() => {

    return {
        conversion(path) {

            //TODO 先把文件read进来
            const jsonData = tools.read(path);
            // let android = new Android();
            // android.prototype.toAndroid(jsonData);

            // 转换成Android格式
            let androidJson = AndroidF.toAndroid(jsonData);
            tools.write(path.split('\\')[path.split('\\').length - 1], androidJson);

            return androidJson;



        }
    }
})();

module.exports = web2iOS;