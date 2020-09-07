var express = require('express');
var router = express.Router();
var dt = new Date();
var multer = require('multer');
var upload = multer({dest: 'resources/style_files/uploads/' + dt.toLocaleDateString()});
// var upload = multer({dest: 'resources/style_files/uploads/' + Date.now()});
const tools = require('../model/cug/utils/utils');
var iconv = require('iconv-lite');
var fs = require('fs');

var webConversion = require('../model/cug/conversion/index');

/* GET upload listing. */
router.post('/', upload.single('inputFile'), function (req, res, next) {
    let file = req.file;
    let path = file.path;
    let type = req.body.type;
    let conversionJson = webConversion.conversion(path, type);
    // res.header(200,{'Content-Type':'text/html;charset=utf-8'});
    res.send(conversionJson);
});

// router.post('/', upload.single('inputFile'), function (req, res, next) {
//     let file = req.file;
//     let path = file.path;
//     let type = req.body.type;
//     var buffer = Buffer.from(fs.readFileSync(path, {encoding: 'binary'}), 'binary');
//     // var chaes = jsonData[0].data;
//     let text = iconv.decode(buffer, 'GBK');
//     var textJson=JSON.parse(text)
//     console.log(textJson);
//     fs.writeFileSync('utfFile.txt',iconv.encode(text, 'utf8'),'binary'); //按二进制方式写入
//     fs.writeFileSync('utfFile2.txt',text,'utf8'); //按UTF8写入
//     //
//     // tools.write('test1',ss );
//     //
//     // res.send(ss);
// });


router.post('/api', function (req, res, next) {
    let data = req.body.data;
    let type = req.body.type;

    let conversionJson = webConversion.conversion(data, type, "data");
    res.send(conversionJson);
});

module.exports = router;
