##数据验证

$安装 npm install v_checker

$使用
```javascript
var VChecker = require("v_checker");
var vchecker = new VChecker({});

vchecker.requireExist(key);

if(vchecker.error){
    console.log(vchecker.error);
}
```

$方法
*requireExist 必选参数，且不能为空或0

*requireObjectId 必选参数，必须是一个ObjectId 24位的字符串

*requireString  必选字符串参数

*optionalString  可选字符串参数，[dv]默认值

*requireNumber   必选数值参数

*optionalNumber   可选数值参数，[dv]默认值

*requireInt   必选整数参数

*optionalInt   可选整数参数，[dv]默认值

*requireArray 必选的数组

*requireJsonObject  必选的对象，主要是JSON判断

*requireDate  必选日期
