var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: "Map style conversion"});
});
router.get('/base64-decode', function (req, res, next) {
    res.render('base64-decode', {title: "输入base64字符串"});
});
router.get('/test', function (req, res, next) {
    res.render('test');
});


module.exports = router;
