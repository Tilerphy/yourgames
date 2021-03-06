var express= require("express");
var multiparty = require("multiparty");
var fs = require("fs");
var router = express.Router();
var uuid = require("node-uuid");
var helper = require("./sql");
var autovalidate = require("./auth").autovalidate;
router.use(autovalidate("/add"));
router.get("/", function(req,res){
        res.render("add", {key:uuid.v4()});
    });
router.get("/more", function(req , res){
                res.render("addmore");
        });
router.post("/more", function(req, res){
                var form = new multiparty.Form();
                form.encoding="utf-8";
                form.uploadDir ="./static/data";
                form.maxFilesSize=2*1024*1024*1024;
                form.parse(req, function(err, fields, files){
                                var tmpFields = {};
                                if (fields.description && fields.description != "") {
                                    tmpFields.description = fields.description;
                                }
                                if (fields.willDelete) {
                                    deleteItem(fields.owner, function(err, result){
                                                console.log(err?err:("Deleted item: "+fields.owner));
                                                res.render("addmore");
                                        });
                                    return;
                                }
                                tmpFields.slidetime = fields.slidetime;
                                helper.update("item", tmpFields, "id=?", [fields.owner], function(err, result){
                                                if (!err) {
                                                       for(var i in files.files){
                                                        
                                                                var counter = uuid.v4();
                                                                var identifier = fields.owner + counter;
                                                                console.log("more files: "+ identifier);
                                                                var file = files.files[i];
                                                                if (file.originalFilename) {
                                                                        fs.renameSync(file.path, "./static/data/"+(identifier)+".jpg");
                                                                        var img ={};
                                                                        img.id= uuid.v4();
                                                                        img.owner = fields.owner;
                                                                        img.url = "/static/data/"+identifier+".jpg";
                                                                        img.title=fields.title;
                                                                        helper.insert("img", img, function(_err, _result){
                                                                                //do nothing here
                                                                        }); 
                                                                }else{
                                                                      fs.unlink(file.path);         
                                                                }
                                                        }         

                                                        //no wait
                                                        res.render("addmore");
                                                }else{
                                                        console.log(err);
                                                        res.render("addmore");
                                                }
                                        });
                                
                        });
        });
router.post("/", function(req,res){
        
        var imgs =[];
        var item = {};
        var form = new multiparty.Form();
        form.encoding="utf-8";
        form.uploadDir="./static/data";
        form.maxFilesSize=2*1024*1024*1024;
        form.parse(req, function(err, fields, files){
                var identifier = fields.identifier;
                console.log(fields);
                for(var i in files.files){
                    var file = files.files[i];
                    fs.renameSync(file.path, "./static/data/"+(identifier)+".jpg");
                    var img ={};
                    img.id= uuid.v4();
                    img.owner = identifier;
                    img.url = "/static/data/"+identifier+".jpg";
                    img.title=fields.title;
                    imgs[imgs.length] = img;
                }
                item.id= identifier;
                item.identifier = identifier;
                item.slidetime = fields.slidetime;
                item.title = fields.title;
                item.phone = fields.phone;
                item.address = fields.address;
                item.description = fields.description;
                item.typename = fields.typename;
                item.position = fields.position;
                insertItem(item, imgs[0], function(ok){
                                if (ok) {
                                    res.render("add", {key:uuid.v4()});
                                }else{
                                        res.render("add", {key:uuid.v4()});
                                }
                        });
            });

    });
function deleteItem(itemId, callback) {
        helper.remove("item", "id=?", [itemId], function(_err, _result){
                        if (_err) {
                            callback(_err);
                        }else{
                                helper.remove("img", "owner=?", [itemId], function(__err, __result){
                                                callback(__err);
                                        });
                        }
                });
}
function insertItem(item, img, callback) {
    helper.insert("item", item, function(err, result){
                if (err) {
                    callback(false);
                    return;
                }
                helper.insert("img", img, function(_err, _result){
                                if (!_err) {
                                    callback(true);
                                }
                                else{
                                        callback(false);
                                }
                        });
        });
}
module.exports = router;