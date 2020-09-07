/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/2
 */

var tools = require('./cug/mapper/mapper');
var poiStyle = {
    "pointBackgroundColor": "#EDD976",
    "graphicHeight": 12,
    "distance": 0,
    "show": true,
    "graphicDistance": 3,
    "labelFunction": "",
    "labelfield": "shortname",
    "graphicXOffset": 0,
    "pointStrokeAlpha": 1,
    "pointBackgroundGap": 3,
    "chinaLabelWidth": 16,
    "pointBackgroundLineWidth": 0,
    "isImportant": false,
    "graphicWidth": 0,
    "pointStrokeFont": "normal 11.3px DroidSansFallback_0",
    "angle": 30,
    "pointBoxDisance": 0,
    "pointBackgroundLineColor": "#FFFFFF",
    "direction": 0,
    "avoidWeight": 13.8,
    "avoidField": "avoidWeight",
    "texture": "8a94a4505df0d1c5015df2e8397a0004",
    "pointBackgroundAlpha": 1,
    "pointBackgroundRadius": 5,
    "pointLineWidth": 2,
    "pointFillAlpha": 1,
    "isFourDirections": true,
    "graphicYOffset": 0,
    "pointStrokeStyle": "#FFFFFF",
    "pointFillFont": "normal 11.3px DroidSansFallback_0",
    "otherLabelWidth": 16,
    "pointFillStyle": "#282828",
    "pointHashOutline": true,
    "pointHashBackground": false,
    "pointHeight": 11.3
};

console.log(tools.getSymbolAttrValue('icon-offset', poiStyle));
console.log(tools.getSymbolAttrValue('text-font', poiStyle));
console.log(tools.getSymbolAttrValue('text-halo-color', poiStyle));
console.log(tools.getSymbolAttrValue('icon-image', poiStyle));
console.log(tools.getSymbolAttrValue('text-anchor', poiStyle));
// console.log(typeof (tools.getSymbol('text-offset')(0, 1)));

