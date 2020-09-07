/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/26
 */

let base64decode = (
    () => {
        let MIME = {
            "application/x-zip-compressed": "zip",
            "application/javascript": "js",
            "text/css": "css",
            "text/plain": "txt",
            "text/html": "html",
            "text/xml": "xml",
            "image/jpeg": "jpeg",
            "image/png": "png",
            "image/gif": "gif",
            "image/svg+xml": "svg"
        };

        /**
         *
         * @param b64Data
         */
        let b64toBuffer = (b64Data) => {
            let atob = require('atob');
            return atob(b64Data);
        };

        /**
         * 获取base64中的数据
         * @param base64
         * @returns {string}
         */
        let getBase64 = (base64) => {
            return base64.substr(base64.indexOf("base64,") + 7, base64.length);
        };

        /**
         * 获取文件类型
         * @param base64
         * @returns {string}
         */
        let getContentType = (base64) => {
            return /data:([^;]*);/i.exec(base64)[1];
        };


        /**
         *
         * @param base64
         * @returns {Blob}
         */
        let getByteStr = (base64) => {
            return b64toBuffer(getBase64(base64));
        };

        return {
            decode(filename, base64text, savaPath) {
                let fs = require('fs');

                var blob;
                let fname = filename + "." + MIME[getContentType(base64text)];
                //TODO 路径问题
                if (MIME[getContentType(base64text)] == 'svg') {
                    savaPath = savaPath || '../../resources/assets/svg/';
                    savaPath = savaPath + fname;
                    blob = getByteStr(base64text);
                } else {
                    savaPath = savaPath || '../../resources/assets/icons/'
                    savaPath = savaPath + fname;
                    blob = new Buffer.from(getBase64(base64text), 'base64');
                }


                fs.writeFile(savaPath, blob, function (err) {//用fs写入文件
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(fname, '写入成功！');
                    }
                });
            }
        }
    }
)
();

module.exports = base64decode;
