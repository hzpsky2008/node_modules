/**
 * Created by Administrator on 2017/5/24.
 */
var DataFactory = require("./DataFactory");

var imgs = DataFactory("images");

console.log("start!");
for(var indexN in imgs){
    console.log(indexN,imgs[indexN]);
}