## [功能描述]

遵循commonJS规范；
实现一般的SQL表达式向Mapbox表达式的转换，用于适配基于Mapbox GL JS的数据过滤器filter；
通过转换后构建可视化界面时直接构建SQL语句即可，避免在前端与Mapbox表达式交互

## [开发环境]

VSCode;node v10.16.3;npm 6.9.0

## [项目使用]

```js
npm install sql-convert
```

```js
let convert = require('sql-convert');
res = convert(sql);
```

[项目结构简介]:用户可通过修改./convert/sql-caculator中的operators对象和matchOperators对象来修改映射规则


[联系方式]:shweh@foxmail.com