/**
 * @Description: toiOS，
 * @author zzh
 * @createTime 2020/5/2
 */

let iOS = (() => {

        /**
         *  require.Style specification version number. Must be 8
         * @type {number}
         */
        let version = 8;

        /**
         * Optional string.
         * @type {string}
         */
        let name = 'iOS-style';

        /**
         * Optional string.
         * @type {string}
         */
        let sprite = '';

        /**
         * Optional string.A URL template for loading signed-distance-field glyph sets in PBF format.
         * @type {string}
         */
        let glyphs = '';

        /**
         * Required object with source values.
         * @type {{}}
         */
        let sources = {};

        /**
         * Required array of layers.
         * @type {*[]}
         */
        let layers = [];

        /**
         * Optional light.The global light source.
         * @type {{}}
         */
        let light = {};

        /**
         * Optional array of numbers.
         * @type {*[]}
         */
        let center = [];

        /**
         * Optional number. Units in degrees. Defaults to 0.
         * @type {number}
         */
        let bearing = 0;

        /**
         * Optional.
         * @type {{}}
         */
        let metadata = {};

        /**
         * Optional transition.
         * @type {{}}
         */
        let transition = {};

        /**
         * Optional number.Default zoom level.
         * @type {number}
         */
        let zoom = 12.5;

        /**
         * temporary Data-Stack
         * @type {{}}
         */
        let layerStack = {};

        /**
         * 是否是复合层级
         * @param level
         * @returns {boolean}
         */
        let isComposeLevel = (level) => {
            if (level.indexOf('-') == -1)
                return false;
            else
                return true;
        };

        /**
         * 获取复合层级之间所有的层级
         * @param composeLevel
         * @returns {[]}
         */
        let getLevels = (level) => {
            let levels = [];
            if (isComposeLevel(level)) {
                let tem = level.split('-');
                let minLevel = Number(tem[0]);
                let maxLevel = Number(tem[1]);
                for (let i = minLevel; i <= maxLevel; i++) {
                    levels.push(i);
                }
            } else {
                levels.push(Number(level));
            }

            return levels.sort(function (a, b) {
                return a - b;

            });
        };

        /**
         * 创建临时样式
         * @param item
         * @param level
         * @returns {{}}
         */
        let createTem = (item, level) => {

            let tem = {};

            tem['id'] = item.name;
            tem['type'] = item.iconType;
            tem['data'] = item.data;
            tem['levels'] = [];
            tem['filters'] = {};
            tem['styles'] = {};
            // 是复合层级
            if (isComposeLevel(level)) {
                tem['levels'] = getLevels(level);
            }
            // 不是复合层级
            else {
                tem['levels'].push(level);
            }

            tem['levels'].forEach((level) => {
                tem['filters'][level] = item.filter;
                tem['styles'][level] = item.style;
            });
            return tem;
        };

        let createTemF = (item, level) => {

            let sqlConvert = require('../utils/sql-convert@1.0.0');
            let tem = {};

            tem['id'] = item.name + "_" + level;
            tem['type'] = item.iconType;
            tem['data'] = item.data;
            tem['levels'] = getLevels(level);
            // filter转换,首先看item中有没有filter
            if(item.hasOwnProperty("filter"))
            {
                try {
                    if ((item.filter !== ""))
                        tem['filters'] = sqlConvert(item.filter);
                }
                catch (e) {
                    console.log(tem['id']);
                    console.log(e.message)
                }
            }

            tem['styles'] = item.style;
            return tem;
        };


        /**
         * update  tem['levels'], tem['styles'] = {};
         * @param tem
         * @param item
         * @param value
         * @returns {*}
         */
        let updateTem = (tem, item, level) => {
            // 是复合层级，例如：7-15
            if (isComposeLevel(level)) {
                getLevels(level).forEach((level) => {
                    // 不在里边
                    if (tem['levels'].indexOf(level) == -1) {
                        tem['levels'].push(Number(level));
                        tem['filters'][level] = item.filter;
                        tem['styles'][level] = item.style;
                    }
                });
            }
            // 不是复合层级
            else {
                // 不在里边
                if (tem['levels'].indexOf(level) === -1) {
                    tem['levels'].push(Number(level));
                    tem['filters'][level] = item.filter;
                    tem['styles'][level] = item.style;
                }
            }
            return tem;
        };

        /**
         * 第一步转换web 样式，提取其中的样式和类型信息
         * @param webStyleGroup
         * @param level
         */
        let searchWebStyle = (webStyleGroup, level) => {
            webStyleGroup.forEach((item) => {
                //样式组
                if (item.type == "group" || item.type == "files") {
                    searchWebStyle(item.children, level);
                }
                //item.type == "style",在此寻找
                else if (item.type === "style") {
                    // 以下为style样式
                    //    先判断
                    //  判断是复合层级还是单层级
                    //  图层id的array

                    let tem = createTemF(item, level);
                    layerStack[item.name + "_" + level] = tem;

                    //    添加

                    // tem['id'] = item.name;
                    // tem['type'] = item.iconType;
                    // tem['metadata'] = item.iconType;
                    // //todo "source"属性，绑定的数据源
                    // tem['source'] = item.iconType;
                    // tem['source-layer'] = item.data;
                    // tem['filters'] = item.filter;
                    // tem['maxzoom'] = item.data;
                    // tem['minzoom'] = item.data;
                    // tem['layout'] = item.data;
                    // tem['paint'] = item.data;
                    // tem['interactive'] = true;


                } else
                    // console.log(item);
                    tools.write('test', item);
            });
        };

        /**
         * JsonObject深拷贝
         * @param JsonObject
         * @returns {any}
         */
        let deepCopy = (JsonObject) => {
            return JSON.parse(JSON.stringify(JsonObject));

        };

        let extractLine = (layerStack) => {
            // 存储改装后的style
            let styleStacks = [];

            // 存储改装前的style
            let layerStacks = [];
            Object.keys(layerStack).forEach((item) => {
                layerStacks.push(layerStack[item]);
            });

            let webStyles = require('./webStyles');

            layerStacks.forEach((item) => {


                if (item.type == "line") {

                    let lineTempStyle = {};
                    lineTempStyle = deepCopy(webStyles.line);
                    // 样式名称字符串数组
                    let lineKeys = Object.keys(lineTempStyle);


                    // 边线组合样式遍历
                    let maxCount = item.styles.length;


                    // todo 倒叙遍历，指针指向了同一个地址（如何解决？？？）
                    for (let i = maxCount; i > 0; i--) {
                        // item的副本拷贝
                        let tempItem = deepCopy(item);
                        lineTempStyle = deepCopy(webStyles.line);


                        if (i - (maxCount - item.styles.length) > 0) {
                            lineKeys.forEach((key) => {
                                lineTempStyle[key] = item.styles[item.styles.length - 1][key];
                            });
                        }

                        // 如果是边线
                        if (i !== maxCount) {
                            tempItem.id = item.id + "_边线_" + (maxCount - i);
                        }
                        // 线要素本身
                        tempItem.styles = deepCopy(lineTempStyle);
                        styleStacks.push(tempItem);
                    }

                } else {
                    styleStacks.push(item);
                }
            });

            return layerStack;

        };


        /**
         * 调整temp样式中的style的组织方式，将level→{styles}组织调整为style→{level:style}
         * @param layerStack
         * @returns {[]}
         */
        let adjustLayerStack = (layerStack) => {
            // 存储改装后的style
            let styleStacks = [];

            // 存储改装前的style
            let layerStacks = [];
            Object.keys(layerStack).forEach((item) => {
                layerStacks.push(layerStack[item]);
            });

            let webStyles = require('./webStyles');

            layerStacks.forEach((item) => {

                    // item是每一个图层样式
                    switch (item.type) {
                        case "icon-group":
                            break;
                        case "point-label" :
                            let pointLabelTempStyle = {};
                            pointLabelTempStyle = deepCopy(webStyles.pointLabel);
                            // 样式名称字符串数组
                            let pointLabelKeys = Object.keys(pointLabelTempStyle);
                            item.levels.forEach((level) => {
                                // itm是样式名称
                                pointLabelKeys.forEach((key) => {
                                    pointLabelTempStyle[key][level] = item.styles[level][0][key]
                                });
                            });

                            item.styles = deepCopy(pointLabelTempStyle);
                            styleStacks.push(item);
                            break;

                        case "line-label":
                            let lineLabelTempStyle = {};
                            lineLabelTempStyle = deepCopy(webStyles.lineLabel);
                            // 样式名称字符串数组
                            let lineLabelKeys = Object.keys(lineLabelTempStyle);
                            Object.keys(item.styles).forEach((level) => {
                                // itm是样式名称
                                lineLabelKeys.forEach((key) => {
                                    lineLabelTempStyle[key][level] = item.styles[level][0][key]
                                });
                            });
                            item.styles = deepCopy(lineLabelTempStyle);
                            styleStacks.push(item);
                            break;

                        case  "polygon":
                            let polygonTempStyle = {};
                            polygonTempStyle = deepCopy(webStyles.polygon);
                            // 样式名称字符串数组
                            let polygonKeys = Object.keys(polygonTempStyle);
                            Object.keys(item.styles).forEach((level) => {
                                // itm是样式名称
                                polygonKeys.forEach((key) => {
                                    polygonTempStyle[key][level] = item.styles[level][0][key]
                                });
                            });
                            item.styles = deepCopy(polygonTempStyle);
                            styleStacks.push(item);
                            break;

                        case  "line":

                            let lineTempStyle = {};
                            lineTempStyle = deepCopy(webStyles.line);
                            // 样式名称字符串数组
                            let lineKeys = Object.keys(lineTempStyle);


                            // 边线组合样式遍历
                            let counts = [];
                            item.levels.forEach((level) => {
                                counts.push(item.styles[level].length);
                            });
                            // 取边线最多的情况
                            let maxCount = counts.sort((a, b) => {
                                return b - a;
                            })[0];

                            // todo 倒叙遍历，指针指向了同一个地址（如何解决？？？）
                            for (let i = maxCount; i > 0; i--) {
                                // item的副本拷贝
                                let tempItem = deepCopy(item);
                                lineTempStyle = deepCopy(webStyles.line);
                                // 每一级
                                item.levels.forEach((level) => {
                                    if (i - (maxCount - item.styles[level].length) > 0) {
                                        lineKeys.forEach((key) => {
                                            lineTempStyle[key][level] = item.styles[level][item.styles[level].length - 1][key];
                                        });
                                    }
                                    // lineKeys.forEach((key) => {
                                    //     tempStyle[key][level] = item.styles[level][i][key];
                                    // });
                                });
                                // 如果是边线
                                if (i !== maxCount) {
                                    tempItem.id = item.id + "_边线_" + (maxCount - i);
                                }
                                // 线要素本身
                                tempItem.styles = deepCopy(lineTempStyle);
                                styleStacks.push(tempItem);
                            }
                            break;
                        default:
                            break;
                    }

                }
            );

            return styleStacks;
        };

        /**
         * 多层级样式转换mapbox-gl expression表达式
         * @param layerStack
         * @returns {[]}
         */
        let extractStyles = (layerStack) => {
            let layerStackCopy = [];

            layerStack.forEach((item) => {
                let tempLayer = {"styles": {}};
                let keys = Object.keys(item);
                keys.forEach((key) => {
                    // 处理styles
                    if (key === "styles") {
                        let styleNames = Object.keys(item[key]);
                        styleNames.forEach((styleName) => {
                            let levels = Object.keys(item[key][styleName]);
                            if (levels.length !== 0) {
                                // 首个样式
                                tempLayer["styles"][styleName] = item[key][styleName][levels[0]];
                            } else {
                                tempLayer["styles"][styleName] = "";
                            }

                        });
                    }
                    // 处理levels
                    else if (key === "levels") {
                        tempLayer["minZoom"] = item.levels[0];
                        tempLayer["maxZoom"] = item.levels[item.levels.length - 1];

                    }
                    // 处理filters
                    else if (key === "filters") {
                        let filterKeys = Object.keys(item.filters);
                        if (filterKeys.length !== 0) {
                            tempLayer["filter"] = item.filters[filterKeys[0]];
                        } else {
                            tempLayer["filter"] = "";
                        }

                    } else {
                        tempLayer[key] = item[key];
                    }
                });
                layerStackCopy.push(tempLayer);
            });

            return layerStackCopy;
        };

        /**
         * 组装iOS样式
         * @param layerStack
         * @returns {{metadata: {metadata: string}, sources: {testSource: string}, name: string, sprite: string, layers: [], glyphs: string, version: number, Tips: string}}
         */
        let getIOSStyle = (layerStack) => {
            let mapper = require('../mapper/mapper');
            let iOSStyles = require('./iOSStyles');
            let iOSStyle = {
                "Tips": "Test the style",
                "version": 8,
                "name": "styleName",
                "metadata": {"metadata": "metadata"},
                "sources": {"testSource": "none"},
                "sprite": "http://localhost:3000/resources/assets/sprites/sprite",
                "glyphs": "http://localhost:3000/resources/assets/fonts/{fontstack}/{range}.pbf",
                "layers": []
            };
            let layerStackIds = Object.keys(layerStack);
            let layerStackArray = [];
            layerStackIds.forEach((id) => {
                layerStackArray.push(layerStack[id]);

            });
            layerStackArray.forEach((item) => {
                let layer = {
                    "source": "testSource",
                    "id": item.id,
                    "source-layer": item.data,
                    "filter": item.filters,
                    "minzoom": item.levels[0],
                    "maxzoom": item.levels[item.levels.length - 1]
                };
                switch (item.type) {
                    case "point-label":
                        layer["type"] = "symbol";
                        // layer["id"] = item.id;
                        // layer["source"] = "testSource";
                        // layer["source-layer"] = item.data;
                        // layer["filter"] = item.filter;
                        // layer["minzoom"] = item.minZoom;
                        // layer["maxzoom"] = item.maxZoom;

                        let pointLabelSymbol = deepCopy(iOSStyles.symbol);
                        let pointLabelPaints = Object.keys(pointLabelSymbol.paint);
                        let pointLabelLayouts = Object.keys(pointLabelSymbol.layout);

                        pointLabelPaints.forEach((paintStyle) => {
                            let attr = mapper.getSymbolPointAttrValue(paintStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                pointLabelSymbol.paint[paintStyle] = attr;
                            }
                        });
                        layer["paint"] = pointLabelSymbol.paint;

                        pointLabelLayouts.forEach((layoutStyle) => {
                            let attr = mapper.getSymbolPointAttrValue(layoutStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                pointLabelSymbol.layout[layoutStyle] = attr;
                            }
                        });
                        pointLabelSymbol.layout["symbol-placement"] = "point";
                        layer["layout"] = pointLabelSymbol.layout;

                        iOSStyle["layers"].push(layer);
                        break;
                    case "line-label":
                        layer["type"] = "symbol";
                        // layer["id"] = item.id;
                        // layer["source"] = "testSource";
                        // layer["source-layer"] = item.data;
                        // layer["filter"] = item.filter;
                        // layer["minzoom"] = item.minZoom;
                        // layer["maxzoom"] = item.maxZoom;

                        let lineLabelSymbol = deepCopy(iOSStyles.symbol);
                        let lineLabelPaints = Object.keys(lineLabelSymbol.paint);
                        let lineLabelLayouts = Object.keys(lineLabelSymbol.layout);

                        lineLabelPaints.forEach((paintStyle) => {
                            let attr = mapper.getSymbolLineAttrValue(paintStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                lineLabelSymbol.paint[paintStyle] = attr;
                            }
                        });
                        layer["paint"] = lineLabelSymbol.paint;

                        lineLabelLayouts.forEach((layoutStyle) => {
                            let attr = mapper.getSymbolLineAttrValue(layoutStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                lineLabelSymbol.layout[layoutStyle] = attr;
                            }
                        });
                        lineLabelSymbol.layout["symbol-placement"] = "line";
                        layer["layout"] = lineLabelSymbol.layout;

                        iOSStyle["layers"].push(layer);
                        break;

                    case  "polygon":
                        layer["type"] = "fill";
                        // layer["id"] = item.id;
                        // layer["source"] = "testSource";
                        // layer["source-layer"] = item.data;
                        // layer["filter"] = item.filter;
                        // layer["minzoom"] = item.minZoom;
                        // layer["maxzoom"] = item.maxZoom;

                        let polygonSymbol = deepCopy(iOSStyles.fill);
                        let polygonPaints = Object.keys(polygonSymbol.paint);
                        let polygonLayouts = Object.keys(polygonSymbol.layout);

                        polygonPaints.forEach((paintStyle) => {
                            let attr = mapper.getFillAttrValue(paintStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                polygonSymbol.paint[paintStyle] = attr;
                            }
                        });
                        layer["paint"] = polygonSymbol.paint;

                        polygonLayouts.forEach((layoutStyle) => {
                            let attr = mapper.getFillAttrValue(layoutStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                polygonSymbol.layout[layoutStyle] = attr;
                            }
                        });

                        layer["layout"] = polygonSymbol.layout;

                        iOSStyle["layers"].push(layer);
                        break;

                    case "line":
                        layer["type"] = "line";
                        // layer["id"] = item.id;
                        // layer["source"] = "testSource";
                        // layer["source-layer"] = item.data;
                        // layer["filter"] = item.filter;
                        // layer["minzoom"] = item.minZoom;
                        // layer["maxzoom"] = item.maxZoom;

                        let lineSymbol = deepCopy(iOSStyles.line);
                        let linePaints = Object.keys(lineSymbol.paint);
                        let lineLayouts = Object.keys(lineSymbol.layout);

                        linePaints.forEach((paintStyle) => {
                            let attr = mapper.getLineAttrValue(paintStyle, item.styles[0]);
                            if (attr !== "noAttr") {
                                lineSymbol.paint[paintStyle] = attr;
                            }
                        });
                        layer["paint"] = lineSymbol.paint;

                        lineLayouts.forEach((layoutStyle) => {
                            let attr = mapper.getLineAttrValue(layoutStyle, item.styles);
                            if (attr !== "noAttr") {
                                lineSymbol.layout[layoutStyle] = attr;
                            }
                        });

                        layer["layout"] = lineSymbol.layout;

                        iOSStyle["layers"].push(layer);
                        break;

                    default:
                        break;

                }

            });

            return iOSStyle;
        };

        return {
            toiOS(webObject) {
                // 提取图层样式
                const webStyles = webObject.styles;

                // web样式中style的所有层级
                const levels = Object.keys(webStyles);

                levels.forEach((value) => {
                    searchWebStyle(webStyles[value], value);
                });

                // todo 针对layerStack做一些操作
                // layerStack = adjustLayerStack(layerStack);
                // layerStack = extractStyles(layerStack);
                layerStack = extractLine(layerStack);
                let iOSStyle = getIOSStyle(layerStack);


                // return {message: 'the iOS module is currently unavailable'}
                return iOSStyle
            }
        }
    }
)
();

module.exports = iOS;