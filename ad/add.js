var express= require("express");
var multiparty = require("multiparty");
var fs = require("fs");
var router = express.Router();
var uuid = require("node-uuid");
var helper = require("./sql");
router.get("/", function(req,res){
        res.render("add", {key:uuid.v4()});
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
                    console.log(file);
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