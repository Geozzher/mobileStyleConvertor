/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/9
 */

let getAPI = (
    () => {
        return {
            /**
             * 异步解析
             * @param url
             */
            get(url) {
                const http = require('http');
                const util = require('./utils');
                http.get(url, (res) => {

                    res.setEncoding('utf8');
                    var json = '';
                    res.on('data', function (d) {
                        json += d;
                    });
                    res.on('end', function () {
                        try {
                            json = JSON.parse(json);
                            util.write('icon-svg.json', json, '../../resources/assets/icon-json');
                        } catch (e) {
                            console.error(e.message);
                        }
                    });
                });

            }
        };
    }
)();

module.exports = getAPI;