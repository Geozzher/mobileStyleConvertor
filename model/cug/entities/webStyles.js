/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/2
 */
let webStyles = (
    () => {
        return {
            pointLabel:
                {
                    "labelfield": {}, //要显示的要素的字段名
                    "avoidField": {},//避让的码表权值字
                    "pointFillStyle": {},//文字填充颜色
                    "pointFillFontS": {},//文字字体样式
                    "pointFillFontStyle": {},//字体
                    "pointFillFont": {},//组合字体
                    "pointFillFontSize": {},//字体大小
                    "pointFillFontWeight": {},//字体粗细
                    "pointLineWidth": {}, //点注记的填充线宽度
                    "pointStrokeStyle": {},//点注记的填充线颜色
                    "pointStrokeAlpha": {},//文字边线的透明度
                    "isImportant": {}, //是否重要性
                    "distance": {},//阈值
                    "avoidWeight": {},//避让的码表权值字
                    "isFourDirections": {}, //是否启用四宫格避让
                    "isEightDirections": {}, //是否启用八宫避让
                    "pointBoxDisance": {}, //注记外扩像素
                    "pointStrokeFont": {},
                    "labelFunction": {},//注记过滤函数
                    "pointBackgroundColor": {},//背景矩形填充色
                    "pointBackgroundGap": {},//背景底图边缘与里面文字的间距
                    "pointBackgroundRadius": {},//圆角
                    "pointBackgroundAlpha": {},//背景矩形透明度
                    "graphicHeight": {},//点图片的高度
                    "graphicWidth": {},//点图片的宽
                    "graphicYOffset": {}, //点图片往右偏移的长度
                    "graphicXOffset": {}, //点图片往下偏移的长度
                    "graphicDistance": {},//点图片与点注记的距离
                    "direction": {},//点图片相对注记的位置
                    "pointHashBackground": {},//是否有底部面填充
                    "texture": {},//注记图标
                    "show": {}, //是否绘制要素
                    "chinaLabelWidth": {},//汉字的宽度
                    "otherLabelWidth": {},//其它字符的宽度
                    "angle": {}, //线状注记中任意两个字之间，旋转角度差多少度时不显示
                    "pointHashOutline": {}, //注记是否有边线
                    "pointFillAlpha": {}, //文字填充的透明度
                    "pointHeight": {},//点注记文字宽度和高度（程序会据此高度来计算避让box的高度）
                    "pointBackgroundLineWidth": {}, //背景边框的宽度
                    "pointBackgroundLineColor": {}, //背景边框的颜色
                    "pointOffsetY": {},//图标高
                    "pointOffsetX": {}//图标宽
                },

            lineLabel:
                {
                    "show": {}, //是否绘制要素
                    "labelfield": {}, //要显示的要素的字段名
                    "avoidField": {},//避让的码表权值字
                    "avoidWeight": {},//避让权值
                    "chinaLabelWidth": {},//汉字的宽度
                    "otherLabelWidth": {},//其它字符的宽度
                    "gap": {},//线注记字间距
                    "angle": {},//线状注记中任意两个字之间，旋转角度差多少度时不显示
                    "angleSwitch": {},//线文字注记之间的角度值大于指定angle时，不显示
                    "angleColor": {},//angleSwitch为flase时,线文字注记显示且颜色值用angleColor
                    "lineHashOutline": {},//是否有边线
                    "lineHashBackground": {},//是否有底部面填充
                    "lineFillStyle": {}, //文字填充颜色
                    "lineFillFont": {},//字体大小，字体类型
                    "lineFillAlpha": {}, //文字填充的透明度
                    "lineLineWidth": {},//填充线宽度
                    "lineStrokeStyle": {},//填充线颜色
                    "lineStrokeFont": {},//边线字体大小，字体类型
                    "lineStrokeAlpha": {}, //文字边线的透明度
                    "backgroundColor": {}, //背景矩形填充色
                    "backgroundAlpha": {},//背景矩形透明度
                    "backgroundLineWidth": {}, //背景边框的宽度
                    "backgroundLineColor": {},//背景边框的颜色
                    "codeLineFillFontS": {},//编号字体样式
                    "codeLineFillFontSize": {}, //编号字体大小
                    "codeLineFillFontStyle": {},//编号字体
                    "codeLineFillFontWeight": {},//编号字体粗细
                    "lineFillFontS": {},//线注记字体样式
                    "lineFillFontStyle": {},
                    "lineFillFontSize": {}, //线注记字体大小
                    "lineFillFontWeight": {},//线注记字体粗细
                    "lineBackgroundRadius": {},//圆角
                    "lineBackgroundGap": {},//背景底图边缘与里面文字的间距
                    "lineHeight": {}, //线文字的高度
                    "lineTextRotate": {},//文字旋转角度，-180至180
                    "arrowDirectionValue": {},//箭头方向
                    "lineTextDistance": {}, //线文字注记之间的距离
                    "lineCodeBoxDisance": {},//注记外扩像素
                    "codeLineHashOutline": {},//是否有边线
                    "codeLineHashBackground": {}, //是否有底部面填充
                    "showRoadCode": {},//是否显示箭头
                    "showArrow": {},//箭头大小
                    "arrowLineWidth": {},//箭头边线的宽度，默认值为2
                    "arrowSize": {}, //箭头大小
                    "arrowFillStyle": {},//arrowFillStyle 箭头的填充颜色,默认值为'#666666'
                    "arrowDistance": {},//箭头体的长度
                    "roadCodeLabel": {},//道路编号的名称
                    "codeLineFillStyle": {},//文字填充颜色
                    "codeLineFillFont": {},//字体大小，字体类型
                    "codeLineFillAlpha": {},//文字填充的透明度
                    "codeLineLineWidth": {},//填充线宽度
                    "codeLineStrokeStyle": {}, //填充线颜色
                    "codeLineStrokeAlpha": {},//文字边线的透明度
                    "codeBackgroundColor": {},//背景边框的颜色
                    "codeBackgroundAlpha": {},//背景矩形透明度
                    "codeBackgroundLineWidth": {}, //背景边框的宽度
                    "codeBackgroundLineColor": {}, //背景边框的颜色
                    "codeLineBackgroundRadius": {},//圆角
                    "codeLineHeight": {},//线文字的高度
                    "codeGap": {}, //文字间距
                    "codeLineBackgroundGap": {}, //背景底图边缘与里面文字的间距
                    "lineCodeDistance": {}, //线编号注记之间的距离
                    "isImportant": {}, //是否重要性
                    "lineTextBoxDisance": {}, //注记外扩像素
                    "lineOffset": {},//注记偏移量
                    "isTransverse": {}, //是否横摆  如果线注记 只有一个的话
                    "extendedNum": {}//延长限制  线注记需要延长的字超过几个时，不显示。
                },

            line:
                {
                    "stroke": {},//开关
                    "strokeWidth": {},//填充宽度
                    "strokeOpacity": {},//透明度
                    "strokeColor": {},//填充颜色
                    "dash": {},//虚线
                    "lineCap": {},//线冒
                    "lineJoin": {},//线脚
                    "sparsity": {}//抽吸因子
                },

            polygon:
                {
                    "fillColor": {},//填充颜色
                    "fillOpacity": {},//填充透明度
                    "shadowColor": {},//阴影颜色
                    "sparsity": {},//平滑因子
                    "shadowHight": {},//阴影高度
                    "strokeWidth": {},//边框宽度
                    "strokeColor": {},//边框颜色
                    "strokeOpacity": {},//边框透明度
                    "textureratio": {},//纹理放大倍数
                    "dash": {},//边框虚线
                    "xspace": {},//横向间隔
                    "yspace": {},//纵向间隔
                    "cross": {},//交叉排序
                    "stroke": {},////边框是否绘制开关
                    "texture": {},//纹理
                    "fill": {},//开关
                },

            background:
                {
                    "backgroundColor": {},//背景颜色
                    "fillOpacity": {},//填充透明度
                    "watermark": {},//水印
                    "waterMarkOpacity": {},//水印透明度
                    "rule": {}//规则：across交叉|surround环绕|fill填充
                }

        };
    }
)
();

module.exports = webStyles;
