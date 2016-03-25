var helper = require("./sql");
var _ = {
        byPosition:function(position,callback){
            var obj = {};
            var itemMap = {};
            var number;
            var counter = 0;
            helper.execute("select count(*) as counter"+
                           "from img, item where item.position=? and img.owner = item.id", [position], function(err, result){
                console.log("1:", err);
                number = result[0]["counter"];
                helper.query("item", "position=?", [position],
                         ["id", "identifier","slidetime","phone", "address", "description", "typename", "position"]
                         ,function (_err, results){
                                if (_err || !results.length) {
                                    callback(null);
                                    return;
                                }
                                console.log("2:", results.length);
                                for(var index in results){
                                    //create item;
                                    var _r = results[index];
                                    var item = {};
                                    item["identifier"] = _r["identifier"];
                                    item["typename"] = _r["typename"];
                                    item["id"] = _r["id"];
                                    item["value"] = {};
                                    item.value["slides"] =[];
                                    item.value["slidetime"] = parseInt(_r["slidetime"]);
                                    item.value["detail"]={
                                            "title":_r["title"],
                                            "phone":_r["phone"],
                                            "address":_r["address"],
                                            "description":_r["description"]
                                        };
                                    itemMap[_r["id"]] = item;
                                    helper.query("img", "owner=?", [_r["id"]],["id","owner", "url","title"], function(__err,imgs){
                                            var _item;
                                            for(var index in imgs){
                                                _item = itemMap[imgs[index]["owner"]];
                                                _item.value["slides"][_item.value["slides"].length]={
                                                        "img": imgs[index]["url"],
                                                        "title": imgs[index]["title"]
                                                    };
                                                counter++;
                                            }
                                            if (obj[_item["typename"]]) {
                                                obj[_item["typename"]][_item["identifier"]] = _item.value;
                                            }else{
                                                obj[_item["typename"]] = {};
                                                obj[_item["typename"]][_item["identifier"]] = _item.value;
                                            }
                                            
                                            console.log("!"+counter+"#"+number);
                                            if (counter == number) {
                                                callback(obj);
                                            }
                                        });
                                }
                            });
                });
            
        }
    };
    
module.exports = _;