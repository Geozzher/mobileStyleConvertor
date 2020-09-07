/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/2
 */
let iOSStyles = (
    () => {
        return {
            symbol:
                {
                    paint: {
                        // "icon-color": "#000000",//Requires icon-image图标的颜色。这只能与sdf图标一起使用
                        // "icon-halo-blur": 0,//Requires icon-image将光晕向外消去
                        // "icon-halo-color": "rgba(0,0,0,0)",//Requires icon-image图标光晕的颜色。图标光环只能与SDF图标一起使用。
                        // "icon-halo-width": 0,//Requires icon-image光晕到图标轮廓的距离
                        // "icon-opacity": 1,//Requires icon-image,图标绘制的不透明度
                        // "icon-translate": [0, 0],//图标的锚点从其原始位置移动的距离。正值表示右和下，负值表示左和上
                        // "icon-translate-anchor": "map",//enum  "map","viewport"	控制icon-translate的参考框架。
                        "text-color": "#000000",//用于绘制文本的颜色
                        // "text-halo-blur": 0,//光晕向外逐渐消失的距离
                        "text-halo-color": "rgba(0, 0, 0, 0)",//文本的晕轮颜色
                        "text-halo-width": 0,//光晕到字体轮廓的距离
                        // "text-opacity": 1,//文本绘制时的不透明度
                        // "text-translate": [0, 0],//文本的锚点从其原始位置移动的距离
                        // "text-translate-anchor": "map",//enum	"map", "viewport",控制text-translate的参考框架

                    },
                    layout: {
                        // "icon-allow-overlap": false,//如果为真，即使与之前绘制的其他符号发生冲突，图标也将是可见的
                        // "icon-anchor": "center",//图标最靠近锚的部分,enum["center","left","right","top","bottom","top-left","top-right","bottom-left","bottom-right"]
                        // "icon-ignore-placement": false,//Requires icon-image如果为真，其他符号即使与图标发生碰撞也可以被看到
                        "icon-image": "",//用于绘制图像背景的sprite中图像的名称
                        // "icon-keep-upright": false,//Requires icon-image,Requires icon-rotation-alignment to be "map",Requires symbol-placement to be "line", or "line-center",如果是，图标可能会被翻转，以防止它被颠倒呈现。
                        "icon-offset": [0, 0],//图标到锚点的偏移距离
                        // "icon-optional": false,//如果为真，当图标与其他符号发生碰撞而文本不发生碰撞时，文本将不显示相应的图标
                        // "icon-padding": 2,//用于检测符号冲突的图标边框周围附加区域的大小
                        // "icon-pitch-alignment": "auto",//enum"map","viewport","auto",地图定位时图标的方向
                        // "icon-rotate": 0,//顺时针旋转图标
                        // "icon-rotation-alignment": "auto",//结合symbol-placement，决定了图标的旋转行为
                        "icon-size": 1,//按提供的因素调整图标的原始大小
                        // "icon-text-fit": "none",//缩放图标以适应相关文本,enum "none","width","height","both"
                        // "icon-text-fit-padding": [0, 0, 0, 0],//根据icon-text-fit的大小，按顺时针顺序添加的附加区域的大小:顶部、右侧、底部、左侧
                        // "symbol-avoid-edges": false,//如果为真，则符号不会交叉平铺边缘以避免相互碰撞
                        "symbol-placement": "point",//enum	"point","line","line-center"  标签的位置相对于其symbol
                        // "symbol-sort-key": 1,//根据此值按升序对特性进行排序
                        // "symbol-spacing": 250,//两个符号锚之间的距离
                        // "symbol-z-order": "auto",//enum "auto","viewport-y","source"  控件控制同一层中重叠符号的呈现顺序
                        // "text-allow-overlap": false,//如果为真，即使与之前绘制的其他符号发生冲突，文本也将是可见的
                        "text-anchor": "center",//enum	"center","left","right","top","bottom","top-left","top-right","bottom-left","bottom-right" 文本中最靠近锚的部分
                        "text-field": "",//用于文本标签的值。如果提供了纯字符串，它将被视为具有默认/继承格式选项的格式化字符串
                        "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],//用于显示文本的字体堆栈
                        // "text-ignore-placement": false,//如果是，其他符号即使与文本发生冲突也可以被看到
                        // "text-justify": "center",//enum	 "auto", "left", "center", "right" 文本证明选项
                        // "text-keep-upright": true,//如果为真，则可以垂直翻转文本，以防止其呈现颠倒
                        // "text-letter-spacing": 0,//文本跟踪
                        // "text-line-height": 1.2,//行文本的文本前导值
                        // "text-max-angle": 45,//相邻字符之间的最大角度变化
                        // "text-max-width": 10,//文本换行的最大行宽
                        "text-offset": [0, 0],//文本到其锚点的偏移距离
                        // "text-optional": false,//如果为真，当文本与其他符号发生冲突而图标没有冲突时，图标将不显示相应的文本
                        "text-padding": 2,//用于检测符号冲突的文本边框周围附加区域的大小
                        // "text-pitch-alignment": "auto",//enum	"map", "viewport", "auto"
                        "text-radial-offset": 0,//文本的径向偏移量
                        // "text-rotate": 0,//顺时针旋转文本
                        // "text-rotation-alignment": "auto",//enum	"map", "viewport", "auto"  与symbol-placement相结合，决定了构成文本的单个符号的旋转行为。
                        "text-size": 16,//字体大小
                        // "text-transform": "none",//enum	"none", "uppercase", "lowercase"  指定如何大写文本，类似于CSS文本转换属性
                        // "text-variable-anchor": "",//"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"
                        // "text-writing-mode": "",//"horizontal", "vertical"
                        "visibility": "visible",        //  enum  "visible"" none"
                    }
                },

            line:
                {
                    paint: {
                        // "line-blur": 0,                  //模糊应用于线条，以像素为单位。
                        "line-color": "#000000",       //线条颜色
                        "line-dasharray": 0,            //指定构成破折号图案的交替破折号和间隔的长度
                        // "line-gap-width": 0,           //在线的实际路径外画一个线框。值指示内部间隙的宽度
                        // "line-gradient": 0,             //
                        // "line-offset": 0,               //线的偏移量，
                        "line-opacity": 1,              //透明度
                        // "line-pattern": "",
                        // "line-translate": [0, 0],       //几何的偏移量
                        // "line-translate-anchor": "map", //enum "map", "viewport"
                        "line-width": 1,                //线宽
                    },
                    layout: {
                        // "line-round-limit": 1.05,        //Requires line-join to be "round"
                        // "line-miter-limit": 2,          //Requires line-join to be "miter"，用于自动转换斜角连接到斜角连接为锐利的角度
                        "line-join": "miter",           //线相交样式
                        "line-cap": "butt",             //线末端样式
                        // "line-sort-key": 1,             //根据此值按升序对特性进行排序
                        "visibility": "visible"         //  enum  "visible"" none"
                    }
                },

            fill:
                {
                    paint: {
                        // "fill-antialias": true,         //填充是否应该反锯齿
                        "fill-color": "#000000",        //Disabled by fill-pattern
                        "fill-opacity": 1,              //透明度
                        "fill-outline-color": "",       //填充的轮廓颜色
                        "fill-pattern": "",             //面纹理
                        // "fill-translate": [0, 0],       //几何的偏移量
                        // "fill-translate-anchor": "map",  //Requires fill-translate fill-translate的控制参考框架 enum "map", "viewport"
                    },
                    layout: {
                        // "fill-sort-key": 1,             //根据此值按升序对特性进行排序
                        // "visibility": "visible",        //  enum  "visible"" none"
                    }
                },

            background:
                {
                    paint: {
                        "background-color": "#000000",   //背景色
                        "background-opacity": 1,         //透明度
                        "background-pattern": "",       //填充图像
                    },
                    layout: {
                        "visibility": "visible",        //  enum  "visible"" none"
                    }
                }

        };
    }
)
();
module.exports = iOSStyles;
