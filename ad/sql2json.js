var helper = require("./sql");
var _ = {
        loadmore:function(owner, callback){
                
                helper.query("img", "owner=?", [owner],["url"], function(err, results){
                                if (!err) {
                                    callback(results);
                                }else{
                                        console.log("LOAD MORE:", err);
                                        callback([]);
                                }
                        });
        },
        find:function(position, typename, callback){
            var obj = {};
            var itemMap = {};
            var number;
            var counter = 0;
            var filter  = typename? "item.position=? and item.typename=?" : "item.position=?";
            var params = typename?[position, typename]:[position];
            helper.execute("select count(*) as counter "+
                           "from img, item where "+filter+" and img.owner = item.id and img.title is not null", params, function(err, result){
                number = result[0]["counter"];

                helper.query("item", filter, params,
                         ["id", "identifier","slidetime","phone","title", "address", "description", "typename", "position"]
                         ,function (_err, results){
                                if (_err || !results.length) {
                                    callback(null);
                                    return;
                                }
                                for(var index in results){
                                    //create item;
                                    var _r = results[index];
                                    var item = {};
                                    item["identifier"] = _r["identifier"];
                                    item["typename"] = _r["typename"];
                                    item["value"] = {};
                                    item.value["id"] = _r["id"];
                                    item.value["slides"] =[];
                                    item.value["slidetime"] = parseInt(_r["slidetime"]);
                                    item.value["detail"]={
                                            "title":_r["title"],
                                            "phone":_r["phone"],
                                            "address":_r["address"],
                                            "description":_r["description"]
                                        };
                                    itemMap[_r["id"]] = item;
                                    helper.query("img", "owner=? and title is not null", [_r["id"]],["id","owner", "url","title"], function(__err,imgs){
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