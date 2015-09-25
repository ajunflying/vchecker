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
