var helper = require("./sql");
var uuid = require("node-uuid");
var fs = require("fs");
fs.readFile("./static/data/cc.json","utf-8", function(err, data){
        if (err) {
            console.log(err);
        }else{
            
            var obj = JSON.parse(data);
            
            for (var typename in obj) {
                var _t = obj[typename];
                for(var identifier in _t){
                    var item = _t[identifier];
                    var _insertItem = {};
                    _insertItem["id"] = uuid.v4();
                    _insertItem["identifier"] = identifier;
                    _insertItem["slidetime"] = item["slidetime"];
                    _insertItem["title"] = item.detail["title"];
                    _insertItem["phone"] = item.detail["phone"];
                    _insertItem["address"] = item.detail["address"];
                    _insertItem["description"] = item.detail["description"];
                    _insertItem["typename"] = typename;
                    _insertItem["position"] = "cc";
                    for(var slide in item.slides){
                        var imgUrl = item.slides[slide].img;
                        var imgTitle = item.slides[slide].title;
                        var _insertImg = {};
                        _insertImg["id"] = uuid.v4();
                        _insertImg["owner"] = _insertItem["id"];
                        _insertImg["url"] =imgUrl;
                        _insertImg["title"] = imgTitle;
                        helper.insert("img", _insertImg, function(err, result){
                                if (err) {
                                    console.log(err);
                                }
                            });
                        
                        
                    }
                    helper.insert("item", _insertItem, function(err,result){
                        if (err) {
                                    console.log(err);
                                }
                        });
                    
                }
            }
        }
    });