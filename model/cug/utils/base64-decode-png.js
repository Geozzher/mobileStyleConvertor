/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/26
 */


let base64DecodePng = (

    () => {

        return {
            /**
             * @Description: 适用于jpg/png的base64字符串转成图片格式并存储在本地
             * @param name 设置图片文件名
             * @param base64Data base64字符串
             * @constructor
             */
            decode(name, base64Data) {
                let fs = require('fs');
                //TODO 路径问题
                let savaPath = '../../resources/assets/icons/' + name + '.png';
                let base64 = base64Data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
                let dataBuffer = new Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
                fs.writeFile(savaPath, dataBuffer, function (err) {//用fs写入文件
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('写入成功！');
                    }
                });
            }
        }
    }
)();

module.exports = base64DecodePng;
