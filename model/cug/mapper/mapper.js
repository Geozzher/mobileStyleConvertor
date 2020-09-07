/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/7
 */

let mapper = (() => {

    return {
        getSymbolPointAttrValue(attr, webStyle) {
            // var field = symbol[attr]
            switch (attr) {
                // 注记字段名称
                case 'text-field':
                    return webStyle['labelfield'];
                // 字体颜色
                case 'text-color':
                    return webStyle['pointFillStyle'];
                // 字体样式
                case 'text-font':
                    return webStyle['pointFillFont'];
                // 字体大小
                case 'text-size':
                    return webStyle['pointFillFontSize'];
                // 字体偏移
                case 'text-offset':
                    return [webStyle['pointOffsetX'] || 0, webStyle['pointOffsetY'] || 0];
                // 文字锚点位置0.1.2.3
                case 'text-anchor':
                    return webStyle['direction'];
                // 边线宽度
                case 'text-halo-width':
                    return webStyle['pointLineWidth'];
                // 边线颜色
                case 'text-halo-color':
                    return webStyle['pointStrokeStyle'];
                // 图标
                case 'icon-image':
                    return webStyle['texture'];
                // 图标大小
                case 'icon-size':
                    return webStyle['graphicHeight'];
                // 图标偏移
                case 'icon-offset':
                    return [webStyle['graphicXOffset'] || 0, webStyle['graphicYOffset'] || 0];
                // 图标径向偏移
                case 'text-radial-offset':
                    return webStyle['graphicDistance'];
                case 'text-anchor':
                    return webStyle['direction'];
                case 'text-padding':
                    return webStyle['pointBoxDisance'];
                default:
                    return "noAttr";
            }
        },
        getSymbolLineAttrValue(attr, webStyle) {
            switch (attr) {
                // 注记字段名称
                case 'text-field':
                    return webStyle['labelfield'];
                // 字体颜色
                case 'text-color':
                    return webStyle['lineFillStyle'];
                // 字体样式
                case 'text-font':
                    return webStyle['lineFillFontS'];
                // 字体大小
                case 'text-size':
                    return webStyle['lineFillFontSize'];
                // 边线宽度
                case 'text-halo-width':
                    return webStyle['pointLineWidth'];
                // 边线颜色
                case 'text-halo-color':
                    return webStyle['pointStrokeStyle'];
                // 图标偏移
                // case 'line-offset':
                //     return webStyle['lineOffset'];
                case 'text-padding':
                    return webStyle['lineTextBoxDisance'];
                default:
                    return "noAttr";
            }
        },
        getLineAttrValue(attr, webStyle) {
            switch (attr) {
                case "line-width":
                    return webStyle["strokeWidth"];
                case "line-color":
                    return webStyle["strokeColor"];
                case "line-dasharray":
                    return webStyle["dash"];
                case "line-cap":
                    return webStyle["lineCap"];
                case "line-join":
                    return webStyle["lineJoin"];
                case "line-opacity":
                    return webStyle["strokeOpacity"];
                default:
                    return "noAttr";
            }

        },
        getFillAttrValue(attr, webStyle) {
            switch (attr) {
                case "fill-color":
                    return webStyle["fillColor"];
                case "fill-opacity":
                    return webStyle["fillOpacity"];
                case "fill-outline-color":
                    return webStyle["strokeColor"];
                case "fill-pattern":
                    return webStyle["texture"];
                default:
                    return "noAttr";
            }
        }

    };
})();

module.exports = mapper;