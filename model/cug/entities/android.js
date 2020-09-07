/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/24
 */
var tools = require('../utils/utils')

/**
 *
 * @param layerTexture
 * @param labelTexture
 * @param layerStyle
 * @param labelStyle
 * @param dataLayers
 * @constructor
 */

function Android() {

    this.layerTexture='';
    this.labelTexture='';
    this.layerStyle='';
    this.labelStyle='';
    this.dataLayers='';


}

Android.prototype.toAndroid = function(webObject) {
    // 提取图层数据源
    const webLayers = webObject.layers;
    // 提取图层样式
    const webStyles = webObject.styles;

    // 图标纹理
    var labelTextureId = [];
    // 图层纹理
    var layerTextureId = [];
    // 图标样式Array [{ }]
    var labelStyle = [];

    var labelStyles = {
        level: {}
    };
    // 图层样式Array [{ }]
    var layerStyle = [];

    // 图层样式Array [{ }]
    var layerStyles = {
        level: {}
    };

    // web样式中style的所有层级
    const levels = Object.keys(webStyles);

    levels.forEach((value) => {
        searchStyle(webStyles[value]);
        labelStyles.level[value] = labelStyle;
        layerStyles.level[value] = layerStyle;
        labelStyle = [];
        layerStyle = [];

        labelTextureId = [...new Set(labelTextureId)];
        layerTextureId = [...new Set(layerTextureId)];

        // var android = new Android(layerTextureId, labelTextureId, layerTextureId, labelStyles, webLayers);
        this.layerTexture = layerTextureId;
        this.labelTexture = labelTextureId;
        this.layerStyle = layerTextureId;
        this.labelStyle = labelStyles;
        this.dataLayers = webLayers;

    });

    labelTextureId = [...new Set(labelTextureId)];
    layerTextureId = [...new Set(layerTextureId)];


    function searchStyle(styleGroup) {
        styleGroup.forEach((item) => {
            //样式组
            if (item.type == "group" || item.type == "files") {
                searchStyle(item.children);
            }
            //item.type == "style",在此寻找
            else if (item.type == "style") {

                //标注labelType
                if ((item.hasOwnProperty('labelType') && (item.labelType == "point-label" || item.labelType == "line-label")) || (item.hasOwnProperty('iconType') && (item.iconType == "point-label" || item.iconType == "line-label"))) {

                    // if (item.hasOwnProperty('texture'))
                    //     labelTextureId.push(item.texture);
                    item.style.forEach((value) => {
                        if (value.hasOwnProperty('texture'))
                            labelTextureId.push(value.texture);
                    })
                    labelStyle.push({
                        dataId: item.data,
                        dataLayerId: item.layer,
                        filter: item.query,
                        style: item.style
                    });
                    return;
                }
                // layer
                else {

                    item.style.forEach((value) => {
                        if (value.hasOwnProperty('texture'))
                            layerTextureId.push(value.texture);
                    });
                    layerStyle.push({
                        dataId: item.data,
                        dataLayerId: item.layer,
                        filter: item.query,
                        style: item.style
                    });
                    return
                }
            } else
                // console.log(item);
                tools.write('test', item);
        });
    }

}


module.exports = Android;