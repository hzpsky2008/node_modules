/**
 * Created by Administrator on 2017/5/24.
 */

    
var srcD;
var DataF = {};

!function(){
    console.log("初始化 Data Factory!\n读取 data_factory_config.json");


    var rootPath = _dirname;
    var config = require(rootPath + "data_factory_config");
    var dataSrc = _dirname + "data_config";// 默认 data 数据文件配置目录
    var dataSrcF = "./";

    if(!config){
        console.info("没有 设置 data_factory_config，将使用默认配置！");
    }else{
        if(config["dataSrcFolder"] && config["dataSrcFolder"] != ""){
            dataSrcF = config["dataSrcFolder"];
        }
    }

    srcD = config["dataSrcs"];
    for(var indexName in srcD){
        var data = srcD[indexName];
        if(!data){
            continue;
        }
        if(!/\//g.test(data)){
            data = dataSrcF + data;
        }

        console.log("正在装载 " + indexName);
        var srcData = require(data);
        if(DataF[indexName]){
            throw new Error("存在相同key的数据模块：" + indexName);
            return false;
        }
        DataF[indexName] = srcData;
    }
    console.log("初始化 Data Factory 完毕!");
}();

function getDataSrc(dataName){
    return DataF[dataName];
}
module.exports = getDataSrc;
