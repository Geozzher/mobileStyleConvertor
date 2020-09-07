/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/8
 */


// var base64Conversion = require('./cug/utils/base64-decode');
// let dataPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAABmJLR0QA/wD/AP+gvaeTAAAFZElEQVRogeWbW2xURRjHf3PO2e32Qi+hXNsaAQmkJQgSUGwwISpRKhcTihrAIEGIRnnABI2JLz6YGBFjJGCMIkVRUlHTRoEHNaZQDCGCIljTQBMtvWRb6Z3tbc/4cLic7V7O7O7pDX/JJntmvjPz/fPNzM5tBTbKqtvWGELfDHIhiEzGE5I2BBfMwWDZxmXZFUIICSAAyssvZfTnFRzWNLF6dL10B9OU3ze0Nj7z6pq5XRrAnSQOQNNESX7utCNSSiE+O9W2WteNitF2ajgwzWCpITR9c1iOlI0pXtE84h4lQd8Ak4F8e5pAPGcImB9qKpvXLUnP8uja9GQqNCV0BGDQhJ5+yPKF5nt0yEhJpoZQBoP0Hj3bXS+h4FaiEAsMJFnWUGPhNUSTR9emqhbcEYCTV+BcPZy7CnWt4O+Clm5LpBPZqTB5AkyZAHnZMGcyFE2DBfkwe5K6QEPH5/OIpsCAvCVQIrONoYZC4OjWpSao/ANO1MDpOitKidIesD61/vC8mbmwshAeK4THC0ET4TZ2BOG+hwmMRXcfbDkMX52P563EqWuFvVXW555JsG89PDo3vjK0eIw3Hho5cUO53AIr98PxP+N7TzmC/i747mLkvBkT4ddd8VUci1o/PPBuePqgCduPQO0b4POolaUs8OvfIBilr+ka5KSpluRMpi96Xn0bVF2BFYpNVbmJnqhRtRx+quvUbZUjeP5q9LzLLSBeVq80WWrimIIoCezqs5qGnelZ6v0gWVq7obP39rPrAhvaw9PKt0DxTPWKkuHFcth/8vZzrd8acAyFDqbUBy82Jera8NAfhLN/q9k6CnytEko/SdYl9yl+D3YcdbaLKbChHXb/6JZL7iKlNcNp7oxtF1NgU2f0376xgJRwNcL4YCeuqdpYRDosDca9QCf+3wI9+ki5kTip3tj5MQUWTYNFBbEsRpdV86DQYe8hpkBDg592QG6Gm265Q0kRVGxzXuU79sFMH6SN0JwzHnIzQDiIg3E8yChoA8azQEWFcW062Vl/YGSXS0NRjWDCAhs7En3THVQjeMc30fErUNFu/Ap0M4LGGJyyuRrBVIXRUnexLaiU5WoEYwl86SFofguu74HK7TA1iZP9WbnW1DCwB/55EzYujm7rqsC0KDP2VfPgg1Lr6MurW8+HNqlVPBQh4JutsHy2tYopyIGyTbB0RhR7xXKTiuDae8PTHpkDWamKtduYORHm54WmaQLWzo9s72oE06NEsCMQntYfhEC/WuV27Bu7KumuRjBaRD48ZR1P29lbZYmMl5ZuKDsTmnbtOhw8E9ne1bloNIG1flj8DuxcDlMy4dgl+KhareJIbP3COgN5eA40dcDbP0TeVQeX56KxjrNqmuH5LxVrc2DQhPd/tj5OuNoH87LUChtJXBVYuhAejDJcjwbpXniiSM1WqYnmpEH1TugdgH97YMnu8OXSvvXwwrLwd/uD0NOn5oydXRXw8enQtEUF8Msr8e32xbUe9Hmsuywqx1Y38ergTeB4O9IloTRv/FuZY3Y14Y0gJJEdhIQEDp1vaiL6lCpR7spxrleFhAQe2AD33219T/PCvqesq1dusq0Ynl1ye7RckA+vr4j9jozw8ygOn+68LISYZTNrXrc4PdOja449p7PXakrDufnUEQCv4bxku3EZr8V+GU9K2WhIuCDAJlBMPXq2pzHFI/4aLqeHgxvXKUMOGiTyd0OawYPoxpOh5mJ63wBJXaccCwi0TwXA59WdFXfSlWYAU5rHNyzNLNEAvA31G0xTVo62U24hTfPYtXb/00IIGTLq3PxbgUTeJxATRsvBhJCyWyLOmzJYtqk4+9ubfyv4D/AfdcmR2b7CAAAAAElFTkSuQmCC";
// base64Conversion.decode('gtttt', dataPng);
//
// let dataSvg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5NS45OTYgMjk1Ljk5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjk1Ljk5NiAyOTUuOTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBkPSJNMTQ3Ljk5OCwwQzY2LjM5MiwwLDAsNjYuMzkyLDAsMTQ3Ljk5OHM2Ni4zOTIsMTQ3Ljk5OCwxNDcuOTk4LDE0Ny45OThzMTQ3Ljk5OC02Ni4zOTIsMTQ3Ljk5OC0xNDcuOTk4ICAgUzIyOS42MDUsMCwxNDcuOTk4LDB6IE0xNDcuOTk4LDI3OS45OTZjLTM2LjI1NiwwLTY5LjE0My0xNC42OTYtOTMuMDIyLTM4LjQ0Yy05LjUzNi05LjQ4Mi0xNy42MzEtMjAuNDEtMjMuOTM0LTMyLjQyICAgQzIxLjQ0MiwxOTAuODQ3LDE2LDE3MC4wNDcsMTYsMTQ3Ljk5OEMxNiw3NS4yMTQsNzUuMjE0LDE2LDE0Ny45OTgsMTZjMzQuNTIzLDAsNjUuOTg3LDEzLjMyOCw4OS41MzMsMzUuMTAyICAgYzEyLjIwOCwxMS4yODgsMjIuMjg5LDI0Ljg0NCwyOS41NTgsMzkuOTk2YzguMjcsMTcuMjM5LDEyLjkwNywzNi41MzgsMTIuOTA3LDU2LjkgICBDMjc5Ljk5NiwyMjAuNzgyLDIyMC43ODIsMjc5Ljk5NiwxNDcuOTk4LDI3OS45OTZ6IiBmaWxsPSIjRkZEQTQ0Ii8+Cgk8Y2lyY2xlIGN4PSI5OS42NjYiIGN5PSIxMTQuOTk4IiByPSIxNiIgZmlsbD0iI0ZGREE0NCIvPgoJPGNpcmNsZSBjeD0iMTk4LjY2NiIgY3k9IjExNC45OTgiIHI9IjE2IiBmaWxsPSIjRkZEQTQ0Ii8+Cgk8cGF0aCBkPSJNMTQ3LjcxNSwyMjkuOTk1YzMwLjk1NCwwLDYwLjYxOS0xNS44Myw3Ny42MDQtNDIuMTEzbC0xMy40MzktOC42ODRjLTE1LjU5NywyNC4xMzUtNDQuMTI2LDM3LjYwNC03Mi42OTMsMzQuMzA4ICAgYy0yMi4yNjItMi41NjctNDIuODQ5LTE1LjM5My01NS4wNzItMzQuMzA4bC0xMy40MzgsOC42ODRjMTQuNzksMjIuODg5LDM5LjcxNiwzOC40MDksNjYuNjc2LDQxLjUxOSAgIEMxNDAuODE0LDIyOS44LDE0NC4yNywyMjkuOTk1LDE0Ny43MTUsMjI5Ljk5NXoiIGZpbGw9IiNGRkRBNDQiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
// base64Conversion.decode('gtgt', dataSvg);

// var getAPI = require('./cug/utils/getAPI');
// // 异步，未直接获取
// let data=getAPI.get("http://ditu.zjzwfw.gov.cn/mapserver/styleInfo/zjvmap/tdt_biaozhunyangshi_2017/label/texture.js?0.2614439576646459&x={x}&y={y}&l={z}&styleId=tdt_biaozhunyangshi_2017");
// console.log(data);console.log(data);

var tools = require('./cug/utils/utils');
var base64Decode = require('./cug/utils/base64-decode');

var base64Svg = tools.read('../resources/assets/icon-json/icons-svg.json');
const names = Object.keys(base64Svg);
names.forEach(value => {
    base64Decode.decode(value, base64Svg[value],"../resources/assets/svg/");
});