/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/17
 */
var tools = require('../utils/utils');
var Android = require('../entities/android');
var AndroidF = require('../entities/androidF');
var iOS = require('../entities/iOS');
var iOSF = require('../entities/iOSF');

let index = (() => {

    return {
        conversion(path, type, tag) {
            var jsonData;
            //TODO 先把文件read进来
            try
            {
                if (tag) {
                    jsonData = JSON.parse(path);

                } else {
                    jsonData = tools.read(path);
                }
                // const jsonData = tools.read(path);
                // let android = new Android();
                // android.prototype.toAndroid(jsonData);

                var resultJson;
                // 转换成Android格式
                if (type == 'android') {
                    resultJson = AndroidF.toAndroid(jsonData);
                } else {
                    resultJson = iOSF.toiOS(jsonData);
                }
                if (tag) {
                    tools.write(Date.now(), resultJson);
                } else {
                    tools.write(path.split('\\')[path.split('\\').length - 1], resultJson);
                }

                return resultJson;
            }catch (e) {
                return {message: "invalid json"}
            }


            // let _path = 'resources/style_files/downloads/' + path;
            // tools.write(path);
            // const jsonData = tools.read(path);
            // let android = new Android();
            // android.prototype.toAndroid(jsonData);

        }
    }
})();

module.exports = index;