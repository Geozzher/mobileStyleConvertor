/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/15
 */
fs = require('fs');
path = require('path');
iconv = require('iconv-lite');

/**
 * file operate
 * @type {{read(*=): {json object, write(*=, *=): void}}
 */
let tools = (() => {
    let mkdirs = (dirpath) => {
        if (fs.existsSync(dirpath)) {
            return true;
        } else {
            if (mkdirs(path.dirname(dirpath))) {
                fs.mkdirSync(dirpath);
                return true;
            }
        }
    };

    return {
        /**
         * @param read_path content root path
         * @returns {json object}
         */
        readUTF8(read_path) {
            console.info(read_path, "位置的文件读取成功！")
            // return JSON.parse(fs.readFileSync(path.relative('model/cug/utils', read_path)))
            return JSON.parse(fs.readFileSync(read_path));
            // var buffer = Buffer.from(fs.readFileSync('read_path', {encoding: 'binary'}), 'binary');
            // return buffer;
            },

        read(read_path) {
            console.info(read_path, "位置的文件读取成功！");
            let buffer = Buffer.from(fs.readFileSync(read_path, {encoding: 'binary'}), 'binary');
            return JSON.parse(iconv.decode(buffer, 'GBK'));
        },

        /**
         * 将json格式的数据写入
         * @param fileName
         * @param data
         * @param dirPath
         */
        write(fileName, data, dirPath) {

            const str = JSON.stringify(data);
            // const relative_path = path.relative('model/cug/utils', 'resources/style_files/downloads');
            const relative_path = 'resources/style_files/downloads';
            //指定路径
            const dt = new Date();
            dirPath = dirPath || (relative_path + '\\' + dt.toLocaleDateString());

            const write_path = dirPath + "//" + fileName;

            if (fs.existsSync(dirPath)) {
                fs.writeFileSync(write_path + ".json", str,'utf8');
                console.info("文件", fileName, "已经成功写入路径", dirPath, "下");
            } else {
                // fs.mkdirSync(dirPath);
                mkdirs(dirPath);
                fs.writeFileSync(write_path + ".json", str,'utf8');
                console.info("文件", fileName, "已经成功写入路径", dirPath, "下");
            }
        }
    };
})();
module.exports = tools;

