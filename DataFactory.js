/**
 * Created by Administrator on 2017/5/24.
 */

    
var srcD;
var DataF = {};
var path = require("path");


!function(){
    console.log("初始化 Data Factory!\n读取 data_factory_config.json");


    var rootPath = path.resolve(__dirname,"../../");
    var config = require(rootPath + "/data_factory_config");
    var dataSrcF = "./";

    if(!config){
        console.info("没有 设置 data_factory_config，将使用默认配置！");
    }else{
        if(config["dataSrcFolder"] && config["dataSrcFolder"] != ""){
            dataSrcF = config["dataSrcFolder"];
        }
    }
    dataSrcF = path.resolve(rootPath,dataSrcF);
    srcD = config["dataSrcs"];
    for(var indexName in srcD){
        var data = srcD[indexName];
        if(!data){
            continue;
        }
        if(!/\//g.test(data)){
            data = dataSrcF + "/" + data;
        }

        console.log("正在装载 " + indexName);
        if(DataF[indexName]){
            throw new Error("存在相同key的数据模块：" + indexName);
            return false;
        }
        var srcData = undefined;
        try{
             srcData = require(data);
            DataF[indexName] = srcData;
        }catch(e){
            console.log("没有找到数据模块 " + indexName + " : " + data);
        }

    }
    console.log("初始化 Data Factory 完毕!");
}();

function getDataSrc(dataName){
    return DataF[dataName];
}
module.exports = {
    "get":getDataSrc
};
