/**
 * @Description:
 * @author zzh
 * @createTime 2020/2/24
 */
var tools = require('../utils/utils');

/**
 *
 * @param layerTexture
 * @param labelTexture
 * @param layerStyle
 * @param labelStyle
 * @param dataLayers
 * @constructor
 */

let AndroidF = (() => {

        // 图标纹理
        var labelTexture = {};
        var labelTextureId = [];
        // 图层纹理
        var layerTexture = {};
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

        let searchStyle = (styleGroup) => {
            styleGroup.forEach((item) => {
                //样式组
                if (item.type == "group" || item.type == "files") {
                    searchStyle(item.children);
                }
                //item.type == "style",在此寻找
                    //todo 递归条件
                else if (item.type == "style") {

                    // 标注labelType
                    // if ((item.hasOwnProperty('labelType') && (item.labelType == "point-label" || item.labelType == "line-label")) || (item.hasOwnProperty('iconType') && (item.iconType == "point-label" || item.iconType == "line-label"))) {
                    //     item.style.forEach((value) => {
                    //         if (value.hasOwnProperty('texture'))
                    //             labelTextureId.push(value.texture);
                    //     });
                    //     labelStyle.push({
                    //         dataId: item.data,
                    //         dataLayerId: item.layer,
                    //         filter: item.query,
                    //         style: item.style
                    //     });
                    //     return;
                    // }
                    // // 图层layer
                    // else {
                    //
                    //     item.style.forEach((value) => {
                    //         if (value.hasOwnProperty('texture'))
                    //             layerTextureId.push(value.texture);
                    //     });
                    //     layerStyle.push({
                    //         dataId: item.data,
                    //         dataLayerId: item.layer,
                    //         filter: item.query,
                    //         style: item.style
                    //     });
                    //     return
                    // }
                    if ((item.hasOwnProperty('iconType') && (item.iconType == "polygon" ))|| (item.hasOwnProperty('iconType') && (item.iconType == "line")))
                    {
                        item.style.forEach((value) => {
                            if (value.hasOwnProperty('texture'))
                                layerTextureId.push(value.texture);
                        });
                        //todo 汉字语言编码
                        layerStyle.push({
                            dataId: item.data,
                            dataLayerId: item.layer,
                            filter: item.query,
                            style: item.style
                        });
                        return


                    }
                    // 图层layer
                    else {
                        item.style.forEach((value) => {
                            if (value.hasOwnProperty('texture'))
                                labelTextureId.push(value.texture);
                        });
                        labelStyle.push({
                            dataId: item.data,
                            dataLayerId: item.layer,
                            filter: item.query,
                            style: item.style
                        });
                        return;
                    }
                } else
                    // console.log(item);
                    tools.write('test', item);
            });
        };

        let iconsMatch = (iconsPath) => {
            const icons = tools.read("resources/assets/icon-json/icons-svg.json");

        };

        return {
            toAndroid(webObject) {

                // 提取图层数据源
                const webLayers = webObject.layers;
                // 提取图层样式
                const webStyles = webObject.styles;

                // web样式中style的所有层级
                const levels = Object.keys(webStyles);

                levels.forEach((value) => {
                    labelStyle = [];
                    layerStyle = [];
                    // 提取纹理和样式
                    searchStyle(webStyles[value]);

                    if (labelStyle) {
                        labelStyles.level[value] = labelStyle;
                    }
                    if (layerStyle) {
                        layerStyles.level[value] = layerStyle;
                    }
                });

                labelTextureId = [...new Set(labelTextureId)];
                layerTextureId = [...new Set(layerTextureId)];

                // 匹配icons
                const icons = tools.read("resources/assets/icon-json/icons-svg.json");

                // 组装labelTexture
                labelTextureId.forEach(value => {
                    labelTexture[value] = icons[value];
                });
                // 组装layerTexture
                layerTextureId.forEach(value => {
                    layerTexture[value] = icons[value];
                });


                return {
                    layerTexture: layerTexture,
                    labelTexture: labelTexture,
                    layerStyle: layerStyles,
                    labelStyle: labelStyles,
                    dataLayers: webLayers,
                };


            }

        };

    }
)();

module.exports = AndroidF;